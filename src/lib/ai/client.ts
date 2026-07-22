// ─────────────────────────────────────────────────────────────
// IBIG DocPro — Client IA (Anthropic Messages API, fetch natif)
// L'IA est OPTIONNELLE : sans ANTHROPIC_API_KEY, aiAvailable()
// renvoie false et askClaude() renvoie null (fallback silencieux).
// Une panne IA ne doit JAMAIS bloquer la génération documentaire.
// ─────────────────────────────────────────────────────────────

const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5';
const TIMEOUT_MS = 30_000;

/** L'IA est-elle configurée ? (clé API présente) */
export function aiAvailable(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY.trim());
}

type AnthropicContentBlock = { type: string; text?: string };
type AnthropicResponse = { content?: AnthropicContentBlock[]; stop_reason?: string };

/**
 * Appelle Claude (system + message utilisateur) et renvoie le texte de la
 * réponse, ou null en cas d'indisponibilité, d'erreur ou de timeout (30 s).
 * Jamais d'exception : le fallback heuristique de l'appelant prend le relais.
 */
export async function askClaude(
  system: string,
  user: string,
  maxTokens = 2048
): Promise<string | null> {
  if (!aiAvailable()) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY as string,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: maxTokens,
        system,
        messages: [{ role: 'user', content: user }],
      }),
      signal: controller.signal,
    });
    if (!res.ok) return null;

    const data = (await res.json()) as AnthropicResponse;
    const text = (data.content ?? [])
      .filter((b) => b.type === 'text' && typeof b.text === 'string')
      .map((b) => b.text as string)
      .join('\n')
      .trim();
    return text || null;
  } catch {
    // Timeout, réseau, JSON invalide… → fallback silencieux.
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Extraction JSON robuste depuis une réponse LLM : tolère les blocs
 * ```json …``` et le texte parasite avant/après l'objet.
 */
export function extractJsonObject<T = Record<string, unknown>>(text: string | null): T | null {
  if (!text) return null;
  let cleaned = text.trim();
  const fence = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) cleaned = fence[1].trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    const parsed = JSON.parse(cleaned.slice(start, end + 1));
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed as T;
    return null;
  } catch {
    return null;
  }
}
