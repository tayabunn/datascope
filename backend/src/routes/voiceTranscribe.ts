import { Router, Request, Response } from "express";
import { z } from "zod";
import { parseWithSemanticEngine, checkInputGuardrails } from "./aiSearch.js";

const router = Router();

const TranscribeRequestSchema = z.object({
  audioBase64: z.string().min(1, "Audio data is required"),
  mimeType: z.string().default("audio/webm"),
  language: z.string().optional(),
  prompt: z.string().optional(),
});

/**
 * POST /api/voice-transcribe
 * Transcribes audio recording using OpenAI Whisper (whisper-1 model),
 * validates security guardrails, and extracts dataset query filters.
 */
router.post("/", async (req: Request, res: Response) => {
  const startTime = performance.now();

  try {
    const parseResult = TranscribeRequestSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: parseResult.error.errors[0]?.message || "Invalid payload",
        },
      });
    }

    const { audioBase64, mimeType, language, prompt } = parseResult.data;

    // Convert base64 audio to binary Buffer
    const cleanBase64 = audioBase64.replace(/^data:[^;]+;base64,/, "");
    const audioBuffer = Buffer.from(cleanBase64, "base64");

    if (audioBuffer.length < 500) {
      return res.status(400).json({
        success: false,
        error: {
          code: "AUDIO_TOO_SHORT",
          message: "Recorded audio is too short or empty. Please speak clearly into your microphone.",
        },
      });
    }

    let transcribedText = "";
    const provider = "openai-whisper-1";

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      // Determine file extension from mimeType
      let ext = "webm";
      if (mimeType.includes("mp4")) ext = "mp4";
      else if (mimeType.includes("wav")) ext = "wav";
      else if (mimeType.includes("ogg")) ext = "ogg";
      else if (mimeType.includes("mp3")) ext = "mp3";

      // Native Node 20 FormData & Blob
      const formData = new FormData();
      const fileBlob = new Blob([audioBuffer], { type: mimeType });
      formData.append("file", fileBlob, `speech.${ext}`);
      formData.append("model", "whisper-1");
      if (language) formData.append("language", language);
      if (prompt) formData.append("prompt", prompt);

      try {
        const whisperRes = await fetch("https://api.openai.com/v1/audio/transcriptions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          body: formData,
        });

        if (!whisperRes.ok) {
          const errData = await whisperRes.json().catch(() => ({}));
          console.warn("OpenAI Whisper API error response:", errData);
          throw new Error(
            errData?.error?.message || `Whisper API failed with status ${whisperRes.status}`
          );
        }

        const whisperData = (await whisperRes.json()) as { text?: string };
        transcribedText = whisperData.text?.trim() || "";
      } catch (whisperError: any) {
        console.warn("Whisper API call failed, evaluating fallback:", whisperError.message);
        return res.status(502).json({
          success: false,
          error: {
            code: "WHISPER_API_ERROR",
            message: `Whisper Transcription Error: ${whisperError.message || "Failed to transcribe audio"}`,
          },
        });
      }
    } else {
      return res.status(500).json({
        success: false,
        error: {
          code: "MISSING_OPENAI_KEY",
          message: "OPENAI_API_KEY is not configured on the server.",
        },
      });
    }

    if (!transcribedText) {
      return res.status(422).json({
        success: false,
        error: {
          code: "NO_SPEECH_DETECTED",
          message: "No recognizable speech was detected in the audio. Please try again.",
        },
      });
    }

    // Security guardrail check on transcribed query
    const guardrailCheck = checkInputGuardrails(transcribedText);
    if (!guardrailCheck.passed) {
      return res.status(403).json({
        success: false,
        error: {
          code: "GUARDRAIL_VIOLATION",
          message: guardrailCheck.reason,
        },
        transcription: transcribedText,
      });
    }

    // Extract structured dataset query filters
    const filterConfig = parseWithSemanticEngine(transcribedText);
    const latencyMs = Math.round(performance.now() - startTime);

    return res.json({
      success: true,
      provider,
      transcription: transcribedText,
      filterConfig,
      executionTimeMs: latencyMs,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Unhandled error in /api/voice-transcribe:", error);
    return res.status(500).json({
      success: false,
      error: {
        code: "SERVER_ERROR",
        message: error?.message || "Internal server error during speech transcription.",
      },
    });
  }
});

export default router;
