import type { Location } from "@/types/cms";

function normalizeLocationToken(value: string | null | undefined) {
  return (value ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function isHeadOfficeLocation(location: Pick<Location, "city" | "slug">) {
  return normalizeLocationToken(location.city).includes("ettumanoor") || normalizeLocationToken(location.slug).includes("ettumanoor");
}

export function locationRoleLabel(location: Pick<Location, "city" | "slug">) {
  return isHeadOfficeLocation(location) ? "Head Office" : "Branch";
}
