export type AdminFieldType = "text" | "textarea" | "select" | "number" | "datetime" | "checkbox" | "branches";
export type AdminFieldWidth = "half" | "full";

export type AdminFieldConfig = {
  key: string;
  label: string;
  type: AdminFieldType;
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
  width?: AdminFieldWidth;
  section?: string;
};

export type AdminModuleConfig = {
  title: string;
  table: string;
  primaryLabel: string;
  fields: AdminFieldConfig[];
  readOnly?: boolean;
  listColumns?: Array<{ key: string; label: string }>;
};

export type AdminRecord = {
  id?: string;
  [key: string]: unknown;
};
