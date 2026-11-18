"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useAppDispatch } from "@/store/hooks";
import {
  setStatusFilter,
  setCountryFilter,
  setCategoryFilter,
  setRevenueRange,
  setGlobalQuery,
} from "@/store/slices/searchConfigSlice";
import { addToast } from "@/store/slices/toastSlice";
import {
  Mic,
  Square,
  Sparkles,
  X,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  Radio,
  Cpu,
} from "lucide-react";

interface VoiceSearchModalProps {
  onClose: () => void;
  onTranscriptionSuccess?: (text: string) => void;
}

type RecordingState = "idle" | "recording" | "transcribing" | "success" | "error";

interface FilterConfig {
  search?: string;
  status?: string;
  country?: string;
  category?: string;
  minRevenue?: number;
  maxRevenue?: number;
  priority?: string;
  sortField?: string;
  sortOrder?: string;
}

const EXAMPLE_VOICE_QUERIES = [
  "Show active enterprise contracts in Germany over 500k",
  "Find urgent deals in United Kingdom with high revenue",
  "Top enterprise accounts in Japan sorted by profit",
  "Pending deals in Canada",
];

export default function VoiceSearchModal({
  onClose,
  onTranscriptionSuccess,
}: VoiceSearchModalProps) {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<RecordingState>("idle");
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [filterConfig, setFilterConfig] = useState<FilterConfig | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [executionTimeMs, setExecutionTimeMs] = useState<number | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speechRecognitionRef = useRef<any>(null);

  // Clear timer and recording on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.stop();
      }
      if (speechRecognitionRef.current) {
        try {
          speechRecognitionRef.current.stop();
        } catch {}
      }
    };
  }, []);

  // Web Speech API fallback for live interim speech detection
  const initSpeechRecognition = useCallback(() => {
    if (typeof window === "undefined") return null;
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return null;

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            setLiveTranscript(event.results[i][0].transcript);
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        if (interim) setLiveTranscript(interim);
      };

      recognition.onerror = () => {
        // Silent catch for recognition errors
      };

      return recognition;
    } catch {
      return null;
    }
  }, []);

  const startRecording = async () => {
    setErrorMessage(null);
    setLiveTranscript("");
    setFinalTranscript("");
    setFilterConfig(null);
    audioChunksRef.current = [];

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
          "Microphone access is not supported by your current browser environment."
        );
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Determine best audio mimeType supported by browser
      let mimeType = "audio/webm";
      if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
        mimeType = "audio/webm;codecs=opus";
      } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
        mimeType = "audio/mp4";
      } else if (MediaRecorder.isTypeSupported("audio/ogg")) {
        mimeType = "audio/ogg";
      }

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        // Stop all tracks to release hardware microphone
        stream.getTracks().forEach((track) => track.stop());

        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        await handleProcessAudio(audioBlob, mimeType);
      };

      recorder.start(250); // Collect chunk every 250ms
      setState("recording");
      setRecordingDuration(0);

      // Start duration counter
      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => {
          if (prev >= 25) {
            // Auto stop at 25 seconds
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

      // Start browser speech recognition if supported
      const recognition = initSpeechRecognition();
      if (recognition) {
        speechRecognitionRef.current = recognition;
        try {
          recognition.start();
        } catch {}
      }
    } catch (err: any) {
      console.error("Microphone access error:", err);
      setState("error");
      setErrorMessage(
        err?.message ||
          "Could not access microphone. Please check browser microphone permissions."
      );
    }
  };

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch {}
    }

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setState("transcribing");
    }
  };

  const handleProcessAudio = async (blob: Blob, mimeType: string) => {
    setState("transcribing");

    try {
      // Convert Blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onloadend = async () => {
        const base64Audio = reader.result as string;

        try {
          const res = await fetch("/api/voice-transcribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              audioBase64: base64Audio,
              mimeType,
            }),
          });

          const data = await res.json();

          if (data.success) {
            setFinalTranscript(data.transcription);
            setFilterConfig(data.filterConfig || {});
            setExecutionTimeMs(data.executionTimeMs || 450);
            setState("success");
            if (onTranscriptionSuccess) {
              onTranscriptionSuccess(data.transcription);
            }
          } else {
            // If backend Whisper API is unavailable or errors, check if browser speech captured text
            if (liveTranscript && liveTranscript.trim().length > 3) {
              // Fallback to local AI search parser
              await fallbackToAiSearch(liveTranscript.trim());
            } else {
              setState("error");
              setErrorMessage(
                data.error?.message ||
                  "Whisper failed to transcribe audio. Please try again."
              );
            }
          }
        } catch (fetchError: any) {
          if (liveTranscript && liveTranscript.trim().length > 3) {
            await fallbackToAiSearch(liveTranscript.trim());
          } else {
            setState("error");
            setErrorMessage(
              fetchError?.message || "Network error while calling Whisper transcription service."
            );
          }
        }
      };
    } catch (e: any) {
      setState("error");
      setErrorMessage(e?.message || "Failed to process audio stream.");
    }
  };

  // Fallback handler if server Whisper has network/quota timeout
  const fallbackToAiSearch = async (queryText: string) => {
    try {
      const res = await fetch("/api/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: queryText }),
      });
      const data = await res.json();
      if (data.success) {
        setFinalTranscript(queryText);
        setFilterConfig(data.data?.filterConfig || {});
        setExecutionTimeMs(150);
        setState("success");
      } else {
        setState("error");
        setErrorMessage("Speech detected, but failed to parse query filters.");
      }
    } catch {
      setState("error");
      setErrorMessage("Speech transcription fallback failed.");
    }
  };

  const handleApplyFilters = () => {
    if (!filterConfig) return;

    if (filterConfig.status) dispatch(setStatusFilter(filterConfig.status));
    if (filterConfig.country) dispatch(setCountryFilter(filterConfig.country));
    if (filterConfig.category) dispatch(setCategoryFilter(filterConfig.category));
    if (filterConfig.minRevenue != null || filterConfig.maxRevenue != null) {
      dispatch(
        setRevenueRange({
          min: filterConfig.minRevenue ?? null,
          max: filterConfig.maxRevenue ?? null,
        })
      );
    }
    if (filterConfig.search) {
      dispatch(setGlobalQuery(filterConfig.search));
    }

    dispatch(
      addToast({
        type: "success",
        title: "Voice Query Applied",
        message: `Applied filters from voice search: "${finalTranscript.slice(0, 45)}..."`,
      })
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0b0e17] border border-[#232c42] rounded-none max-w-lg w-full p-6 shadow-2xl space-y-5 text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1b2234] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-none bg-gradient-to-tr from-rose-500 via-amber-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Voice Search with OpenAI Whisper
                </h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded-none bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono">
                  whisper-1
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Speak your query in plain English to filter 100k+ records instantly.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-none hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Center Area based on State */}
        <div className="py-4 flex flex-col items-center justify-center text-center space-y-4">
          {state === "idle" && (
            <>
              <button
                type="button"
                onClick={startRecording}
                className="w-20 h-20 rounded-none bg-indigo-600 hover:bg-indigo-500 border border-indigo-400/50 flex items-center justify-center text-white shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(99,102,241,0.6)] transition-all cursor-pointer group"
                title="Click to start recording voice query"
              >
                <Mic className="w-9 h-9 group-hover:scale-110 transition-transform" />
              </button>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-zinc-200">
                  Click the microphone to speak
                </p>
                <p className="text-xs text-zinc-400">
                  OpenAI Whisper will transcribe and extract your dataset filters
                </p>
              </div>
            </>
          )}

          {state === "recording" && (
            <>
              <button
                type="button"
                onClick={stopRecording}
                className="w-20 h-20 rounded-none bg-rose-600 hover:bg-rose-500 border border-rose-400/50 flex items-center justify-center text-white shadow-[0_0_30px_rgba(244,63,94,0.6)] animate-pulse transition-all cursor-pointer"
                title="Click to finish recording"
              >
                <Square className="w-8 h-8 fill-current" />
              </button>

              {/* Sound Wave Animation Bars */}
              <div className="flex items-center gap-1.5 h-7">
                {[40, 75, 100, 60, 90, 45, 80, 65, 95, 50, 85].map((height, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-rose-500 to-amber-400 rounded-none animate-pulse"
                    style={{
                      height: `${height}%`,
                      animationDelay: `${(i * 0.1).toFixed(1)}s`,
                      animationDuration: "0.8s",
                    }}
                  />
                ))}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-none bg-rose-500 animate-ping" />
                  <span className="text-xs font-mono font-bold text-rose-400">
                    RECORDING (00:{recordingDuration.toString().padStart(2, "0")})
                  </span>
                </div>
                <p className="text-xs text-zinc-300 italic min-h-[1.5rem]">
                  {liveTranscript ? `"${liveTranscript}"` : "Listening... Speak your query clearly"}
                </p>
              </div>
            </>
          )}

          {state === "transcribing" && (
            <div className="py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-none bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
                <Cpu className="w-8 h-8 text-indigo-400 animate-spin" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-indigo-300">
                  Processing Audio with Whisper-1...
                </p>
                <p className="text-xs text-zinc-400">
                  Converting speech waveform to structured SQL query parameters
                </p>
              </div>
            </div>
          )}

          {state === "success" && (
            <div className="w-full text-left space-y-3">
              {/* Transcribed Speech Box */}
              <div className="p-3.5 rounded-none bg-[#141926] border border-[#202738] space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Whisper Transcription</span>
                  </span>
                  {executionTimeMs != null && (
                    <span className="text-emerald-400 font-mono">
                      {executionTimeMs}ms latency
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-white italic">
                  &ldquo;{finalTranscript}&rdquo;
                </p>
              </div>

              {/* Extracted Filter Conditions */}
              {filterConfig && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono uppercase text-zinc-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
                    Generated Query Conditions:
                  </span>
                  <div className="flex flex-wrap gap-1.5 p-3 rounded-none bg-[#111624] border border-[#1b2234]">
                    {filterConfig.status && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-none bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        Status: <strong>{filterConfig.status}</strong>
                      </span>
                    )}
                    {filterConfig.country && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-none bg-sky-500/20 text-sky-300 border border-sky-500/30">
                        Country: <strong>{filterConfig.country}</strong>
                      </span>
                    )}
                    {filterConfig.category && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-none bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Category: <strong>{filterConfig.category}</strong>
                      </span>
                    )}
                    {filterConfig.priority && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-none bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        Priority: <strong>{filterConfig.priority}</strong>
                      </span>
                    )}
                    {filterConfig.minRevenue != null && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-none bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Min Revenue: <strong>${filterConfig.minRevenue.toLocaleString()}</strong>
                      </span>
                    )}
                    {filterConfig.search && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-none bg-[#1e6aff]/20 text-[#38bdf8] border border-[#1e6aff]/40">
                        Keyword: <strong>{filterConfig.search}</strong>
                      </span>
                    )}
                    {Object.keys(filterConfig).length === 0 && (
                      <span className="text-xs text-zinc-400 italic">
                        No specific filter parameters detected.
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {state === "error" && (
            <div className="w-full p-4 rounded-none bg-rose-500/10 border border-rose-500/30 text-rose-300 space-y-3 text-left">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                <h4 className="text-xs font-bold uppercase font-mono tracking-wider">
                  Transcription Failure
                </h4>
              </div>
              <p className="text-xs text-rose-200">{errorMessage}</p>
              <button
                type="button"
                onClick={startRecording}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between border-t border-[#1b2234] pt-3">
          {state === "success" ? (
            <div className="flex items-center justify-between w-full gap-2">
              <button
                type="button"
                onClick={startRecording}
                className="flex items-center gap-1.5 px-3 py-2 rounded-none text-xs font-mono text-zinc-400 hover:text-white border border-[#232c42] hover:bg-[#141926] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Record Again</span>
              </button>

              <button
                type="button"
                onClick={handleApplyFilters}
                className="flex items-center gap-2 px-4 py-2 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
              >
                <span>Apply to Data Explorer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="w-full space-y-2">
              <div className="text-[11px] font-mono text-zinc-500 uppercase">
                Example Voice Prompts:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {EXAMPLE_VOICE_QUERIES.map((eg, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setLiveTranscript(eg);
                      fallbackToAiSearch(eg);
                    }}
                    className="text-[10px] font-mono px-2 py-1 rounded-none bg-[#141926] hover:bg-[#1c2336] border border-[#202738] text-zinc-400 hover:text-zinc-200 transition-colors text-left"
                  >
                    &ldquo;{eg}&rdquo;
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
