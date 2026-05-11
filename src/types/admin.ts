export type AdminFieldType = "text" | "textarea" | "select" | "number" | "datetime" | "checkbox";

export type AdminFieldConfig = {
  key: string;
  label: string;
  type: AdminFieldType;
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
};

export type AdminModuleConfig = {
  title: string;
  table: string;
  primaryLabel: string;
  fields: AdminFieldConfig[];
};

export type AdminRecord = {
  id?: string;
  [key: string]: unknown;
};
