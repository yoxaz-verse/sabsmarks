export type AdminFieldType = "text" | "textarea" | "select" | "number" | "datetime" | "checkbox" | "locationPicker" | "relation" | "weekdays";
export type AdminFieldWidth = "half" | "full";

export type AdminFieldConfig = {
  key: string;
  label: string;
  type: AdminFieldType;
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
  relation?: {
    table: string;
    valueKey: string;
    labelKey: string;
    secondaryLabelKey?: string;
  };
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
  disableCreate?: boolean;
  listColumns?: Array<{ key: string; label: string }>;
};

export type AdminRecord = {
  id?: string;
  [key: string]: unknown;
};
