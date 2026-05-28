const SCRIPT_TAG_PATTERN = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

function sanitizeString(value: string) {
  return value.replace(SCRIPT_TAG_PATTERN, "");
}

export function sanitizeCmsPayload<T>(value: T): T {
  if (typeof value === "string") {
    return sanitizeString(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeCmsPayload(item)) as T;
  }

  if (value && typeof value === "object") {
    const result: Record<string, unknown> = {};
    Object.entries(value as Record<string, unknown>).forEach(([key, item]) => {
      result[key] = sanitizeCmsPayload(item);
    });
    return result as T;
  }

  return value;
}
