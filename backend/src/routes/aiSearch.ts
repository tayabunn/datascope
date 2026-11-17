import { Router, Request, Response } from "express";
import { z } from "zod";

const router = Router();

// ============================================================================
// 1. AI GUARDRAILS (SECURITY & INPUT SANITIZATION)
// ============================================================================

const PROMPT_INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior)\s+instructions/i,
  /system\s+prompt/i,
  /you\s+are\s+now\s+(in\s+)?(dan|developer)\s+mode/i,
  /bypass\s+(security|auth|restrictions)/i,
  /\bdrop\s+table\b/i,
  /\bselect\s+\*\s+from\b/i,
  /\bunion\s+select\b/i,
  /\bdelete\s+from\b/i,
  /<script\b[^>]*>/i,
  /--\s*$/m,
  /;\s*drop\b/i,
];

export function checkInputGuardrails(input: string): { passed: boolean; reason?: string } {
  if (input.length > 500) {
    return { passed: false, reason: "Query exceeds maximum allowed length of 500 characters." };
  }

  for (const pattern of PROMPT_INJECTION_PATTERNS) {
    if (pattern.test(input)) {
      return {
        passed: false,
        reason: "Security Guardrail Triggered: Potential prompt injection, system override, or unauthorized SQL pattern detected.",
      };
    }
  }

  return { passed: true };
}

// ============================================================================
// 2. TOOL CALLING DEFINITION (JSON SCHEMA SPECIFICATION)
// ============================================================================

export const DATA_EXPLORER_TOOLS = [
  {
    type: "function",
    function: {
      name: "query_dataset_records",
      description:
        "Execute structured search, filtering, and sorting over 100,000 enterprise dataset records.",
      parameters: {
        type: "object",
        properties: {
          search: {
            type: "string",
            description: "Free-text search across title, company name, and record code.",
          },
          status: {
            type: "string",
            enum: ["Active", "Pending", "Inactive", "Archived"],
            description: "Record lifecycle status.",
          },
          country: {
            type: "string",
            enum: [
              "Germany",
              "United States",
              "United Kingdom",
              "France",
              "Japan",
              "Canada",
              "Australia",
              "Singapore",
              "Netherlands",
              "Switzerland",
            ],
            description: "Operating country.",
          },
          category: {
            type: "string",
            enum: ["Enterprise", "Mid-Market", "SMB", "Public Sector", "Financial Services"],
            description: "Target enterprise category tier.",
          },
          minRevenue: {
            type: "number",
            minimum: 0,
            description: "Minimum annual revenue threshold in USD.",
          },
          maxRevenue: {
            type: "number",
            minimum: 0,
            description: "Maximum annual revenue threshold in USD.",
          },
          priority: {
            type: "string",
            enum: ["Urgent", "High", "Medium", "Low"],
            description: "Operational deal priority.",
          },
          sortField: {
            type: "string",
            enum: ["revenue", "profit", "rating", "createdAt", "companyName"],
            description: "Field to sort the dataset by.",
          },
          sortOrder: {
            type: "string",
            enum: ["asc", "desc"],
            description: "Sort direction.",
          },
        },
      },
    },
  },
];

// Output Guardrail Schema
const ToolArgumentsSchema = z.object({
  search: z.string().max(100).optional(),
  status: z.enum(["Active", "Pending", "Inactive", "Archived"]).optional(),
  country: z.string().max(50).optional(),
  category: z.string().max(50).optional(),
  minRevenue: z.number().min(0).max(1000000000).optional(),
  maxRevenue: z.number().min(0).max(1000000000).optional(),
  priority: z.enum(["Urgent", "High", "Medium", "Low"]).optional(),
  sortField: z.enum(["revenue", "profit", "rating", "createdAt", "companyName"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

// ============================================================================
// 3. PROMPT ENGINEERING (SYSTEM PROMPT & FEW-SHOT DEMONSTRATIONS)
// ============================================================================

export const SYSTEM_PROMPT = `You are DataScope AI, an enterprise intelligence assistant.
Your responsibility is to analyze natural language user instructions and return a JSON object with query parameters.
Only output JSON matching:
{
  "status"?: "Active" | "Pending" | "Inactive" | "Archived",
  "country"?: "Germany" | "United States" | "United Kingdom" | "France" | "Japan" | "Canada" | "Australia" | "Singapore" | "Netherlands" | "Switzerland",
  "category"?: "Enterprise" | "Mid-Market" | "SMB" | "Public Sector" | "Financial Services",
  "minRevenue"?: number,
  "maxRevenue"?: number,
  "priority"?: "Urgent" | "High" | "Medium" | "Low",
  "sortField"?: "revenue" | "profit" | "rating" | "createdAt" | "companyName",
  "sortOrder"?: "asc" | "desc",
  "search"?: string
}

Few-Shot Examples:
User: "Find active customers from Germany with revenue greater than $50,000"
Output: {"status": "Active", "country": "Germany", "minRevenue": 50000}

User: "Show top enterprise accounts in Japan sorted by profit"
Output: {"category": "Enterprise", "country": "Japan", "sortField": "profit", "sortOrder": "desc"}

User: "Show urgent deals in United States with revenue over 100k"
Output: {"priority": "Urgent", "country": "United States", "minRevenue": 100000}`;

// ============================================================================
// 4. DETERMINISTIC TOOL-CALLING PARSER & PLANNER (ZERO-DEPENDENCY ENGINE)
// ============================================================================

export function parseWithSemanticEngine(prompt: string): Record<string, unknown> {
  const lower = prompt.toLowerCase();
  const args: Record<string, unknown> = {};

  // Status mapping
  if (lower.includes("active")) args.status = "Active";
  else if (lower.includes("pending")) args.status = "Pending";
  else if (lower.includes("inactive")) args.status = "Inactive";
  else if (lower.includes("archived")) args.status = "Archived";

  // Priority mapping
  if (lower.includes("urgent")) args.priority = "Urgent";
  else if (lower.includes("high priority")) args.priority = "High";
  else if (lower.includes("medium priority")) args.priority = "Medium";
  else if (lower.includes("low priority")) args.priority = "Low";

  // Country mapping
  const countries = [
    "Germany",
    "United States",
    "United Kingdom",
    "France",
    "Japan",
    "Canada",
    "Australia",
    "Singapore",
    "Netherlands",
    "Switzerland",
  ];
  for (const c of countries) {
    if (lower.includes(c.toLowerCase())) {
      args.country = c;
      break;
    }
  }

  // Category mapping
  if (lower.includes("enterprise")) args.category = "Enterprise";
  else if (lower.includes("mid-market") || lower.includes("midmarket")) args.category = "Mid-Market";
  else if (lower.includes("smb")) args.category = "SMB";
  else if (lower.includes("public sector")) args.category = "Public Sector";
  else if (lower.includes("financial")) args.category = "Financial Services";

  // Numeric Revenue threshold extraction
  const revMatch = lower.match(/(?:greater than|more than|over|>|above)\s*\$?([0-9]+(?:,[0-9]+)*(?:\.[0-9]+)?k?)/);
  if (revMatch) {
    let rawVal = revMatch[1].replace(/,/g, "");
    let multiplier = 1;
    if (rawVal.endsWith("k")) {
      multiplier = 1000;
      rawVal = rawVal.slice(0, -1);
    }
    const num = parseFloat(rawVal) * multiplier;
    if (!isNaN(num)) args.minRevenue = num;
  }

  // Sorting directives
  if (lower.includes("highest revenue") || lower.includes("top revenue")) {
    args.sortField = "revenue";
    args.sortOrder = "desc";
  } else if (lower.includes("most profitable") || lower.includes("highest profit")) {
    args.sortField = "profit";
    args.sortOrder = "desc";
  } else if (lower.includes("highest rated") || lower.includes("top rating")) {
    args.sortField = "rating";
    args.sortOrder = "desc";
  }

  return args;
}

// ============================================================================
// 5. MULTI-PROVIDER LLM CALLER (GROQ, MISTRAL, OPENAI, GEMINI, FALLBACK)
// ============================================================================

async function executeMultiProviderLLM(prompt: string): Promise<{
  arguments: Record<string, unknown>;
  provider: string;
}> {
  // Provider 1: Groq (Ultra-fast, high limits)
  if (process.env.GROQ_API_KEY) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: prompt },
          ],
          response_format: { type: "json_object" },
          temperature: 0.1,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        const rawContent = json.choices?.[0]?.message?.content;
        if (rawContent) {
          const parsed = JSON.parse(rawContent);
          // Capitalize status if needed
          if (parsed.status) {
            parsed.status = parsed.status.charAt(0).toUpperCase() + parsed.status.slice(1);
          }
          return { arguments: parsed, provider: `Groq (${json.model || "gpt-oss-120b"})` };
        }
      }
    } catch (e) {
      console.warn("Groq provider call error, falling to next provider:", e);
    }
  }

  // Provider 2: Mistral AI
  if (process.env.MISTRAL_API_KEY) {
    try {
      const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
        },
        body: JSON.stringify({
          model: process.env.MISTRAL_MODEL || "mistral-small-latest",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: prompt },
          ],
          response_format: { type: "json_object" },
          temperature: 0.1,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        const rawContent = json.choices?.[0]?.message?.content;
        if (rawContent) {
          const parsed = JSON.parse(rawContent);
          return { arguments: parsed, provider: `Mistral AI (${json.model || "mistral-small"})` };
        }
      }
    } catch (e) {
      console.warn("Mistral AI provider error:", e);
    }
  }

  // Provider 3: OpenAI (if credits available)
  if (process.env.OPENAI_API_KEY) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: prompt },
          ],
          response_format: { type: "json_object" },
          temperature: 0.1,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        const rawContent = json.choices?.[0]?.message?.content;
        if (rawContent) {
          const parsed = JSON.parse(rawContent);
          return { arguments: parsed, provider: `OpenAI (${json.model || "gpt-4o-mini"})` };
        }
      }
    } catch (e) {
      console.warn("OpenAI provider error:", e);
    }
  }

  // Provider 4: Fallback Deterministic Semantic Engine
  return {
    arguments: parseWithSemanticEngine(prompt),
    provider: "DataScope-Semantic-Engine-v2 (Zero-Downtime Fallback)",
  };
}

// ============================================================================
// 6. REST API ROUTE WITH LLM + TOOL CALLING + GUARDRAILS
// ============================================================================

const AiSearchInputSchema = z.object({
  prompt: z.string().min(2),
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { prompt } = AiSearchInputSchema.parse(req.body);

    // 1. Execute Input Security Guardrails
    const guardrailCheck = checkInputGuardrails(prompt);
    if (!guardrailCheck.passed) {
      return res.status(400).json({
        success: false,
        error: {
          code: "AI_GUARDRAIL_VIOLATION",
          message: guardrailCheck.reason,
        },
      });
    }

    // 2. Call Multi-Provider LLM Router with automatic fallbacks
    const { arguments: rawArgs, provider: modelProvider } = await executeMultiProviderLLM(prompt);

    // 3. Execute Output Guardrail (Schema Bounds Validation with Zod)
    const validatedArguments = ToolArgumentsSchema.parse(rawArgs);

    // Format human-friendly interpretation summary
    const parts: string[] = [];
    if (validatedArguments.status) parts.push(`Status: ${validatedArguments.status}`);
    if (validatedArguments.country) parts.push(`Country: ${validatedArguments.country}`);
    if (validatedArguments.category) parts.push(`Category: ${validatedArguments.category}`);
    if (validatedArguments.minRevenue != null) parts.push(`Min Revenue: $${validatedArguments.minRevenue.toLocaleString()}`);
    if (validatedArguments.priority) parts.push(`Priority: ${validatedArguments.priority}`);
    if (validatedArguments.sortField) parts.push(`Sort: ${validatedArguments.sortField} (${validatedArguments.sortOrder || "desc"})`);

    const summary = parts.length > 0 ? parts.join(" | ") : "Global dataset query";

    res.json({
      success: true,
      data: {
        interpretation: `Converted natural language prompt "${prompt}" into validated parameters.`,
        filterConfig: validatedArguments,
        toolCall: {
          name: "query_dataset_records",
          arguments: validatedArguments,
        },
        guardrails: {
          passed: true,
          checksPerformed: [
            "PromptInjectionCheck",
            "SqlKeywordSanitization",
            "OutputSchemaBoundsCheck",
          ],
        },
        metadata: {
          provider: modelProvider,
          processedAt: new Date().toISOString(),
          summary,
        },
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: {
        code: "QUERY_CONVERSION_ERROR",
        message: error.message || "Failed to process natural language search query.",
      },
    });
  }
});

export default router;
