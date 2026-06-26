import type { SiteSettings } from "@/types/cms";
import { formatPhoneWithCountryCode } from "./phone-utils";

const DEFAULT_BRAND_NAME = "Sabs Marks JVS & Co";
const DEFAULT_PHONE = "+91 894-311-5500";
const ADDITIONAL_PHONE = "+91 94470 35886";
const DEFAULT_EMAIL = "info@sabsmarksjvs.com";
const DEFAULT_HEAD_OFFICE_LABEL = "H.O";
const DEFAULT_HEAD_OFFICE_ADDRESS = "Oonukallel Arcade, M C Road, Ettumanoor, Kottayam, 686632, Kerala";
const DEFAULT_HEAD_OFFICE_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Sabs%20Marks%20JVS%20%26%20Co%2C%20Oonukallel%20Arcade%2C%20M%20C%20Road%2C%20Ettumanoor%2C%20Kottayam%2C%20Kerala";
const DEFAULT_SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/sabs-marks-jvs-co/",
  instagram: "https://www.instagram.com/sabsmarksjvs?igsh=MW5qeDBsbWN1dzhsaQ==",
  facebook: "https://www.facebook.com/share/1CzbCGG5kg/?mibextid=wwXIfr",
};
const DEFAULT_SERVICE_LOCATIONS = [
  "Kochi",
  "Angamaly",
  "Thrissur",
  "Bengaluru",
  "Chennai",
  "Tirupati",
  "Gurgaon",
  "Ettumanoor",
  "Kottayam",
  "Chengannur",
  "Hyderabad",
  "Dubai",
];

function isStringRecord(value: unknown): value is Record<string, string> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function normalizeServiceLocations(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [] as string[];
}

export function getSiteContact(settings?: SiteSettings | null) {
  const socialLinks = isStringRecord(settings?.social_links) ? settings.social_links : {};
  const serviceLocations = normalizeServiceLocations(settings?.service_locations);
  const primaryPhone = formatPhoneWithCountryCode(settings?.primary_phone ?? DEFAULT_PHONE);
  const phoneNumbers = Array.from(new Set([primaryPhone, ADDITIONAL_PHONE].filter(Boolean)));
  const configuredHeadOfficeMapUrl = settings?.head_office_map_url;
  const headOfficeMapUrl =
    configuredHeadOfficeMapUrl === undefined
      ? DEFAULT_HEAD_OFFICE_MAP_URL
      : typeof configuredHeadOfficeMapUrl === "string"
        ? configuredHeadOfficeMapUrl.trim()
        : null;

  return {
    brandName: settings?.brand_name ?? DEFAULT_BRAND_NAME,
    primaryEmail: settings?.primary_email ?? DEFAULT_EMAIL,
    primaryPhone,
    phoneNumbers,
    headOfficeLabel: settings?.head_office_label?.trim() || DEFAULT_HEAD_OFFICE_LABEL,
    headOfficeAddress: settings?.head_office_address?.trim() || DEFAULT_HEAD_OFFICE_ADDRESS,
    headOfficeMapUrl,
    socialLinks: {
      linkedin: socialLinks.linkedin?.trim() || DEFAULT_SOCIAL_LINKS.linkedin,
      instagram: socialLinks.instagram?.trim() || DEFAULT_SOCIAL_LINKS.instagram,
      facebook: socialLinks.facebook?.trim() || DEFAULT_SOCIAL_LINKS.facebook,
    },
    serviceLocations: serviceLocations.length > 0 ? serviceLocations : DEFAULT_SERVICE_LOCATIONS,
  };
}
