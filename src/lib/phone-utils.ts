export function formatPhoneWithCountryCode(phone: string | null | undefined): string {
  if (!phone) return "";
  const trimmed = phone.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("+")) return trimmed;
  
  if (/^\d{10}$/.test(trimmed)) {
    return `+91 ${trimmed.slice(0, 3)}-${trimmed.slice(3, 6)}-${trimmed.slice(6)}`;
  }
  return `+91 ${trimmed}`;
}

export function sanitizePhone(phone: string | null | undefined): string {
  if (!phone) return "";
  return phone.replace(/[^\d+]/g, "");
}
