import { ModuleManager } from "@/components/admin/module-manager";
import type { AdminFieldConfig } from "@/types/admin";

type EntityManagerProps = {
  title: string;
  table: string;
  columns: Array<{ key: string; label: string; type?: string }>;
};

function mapType(type?: string): AdminFieldConfig["type"] {
  if (type === "number") return "number";
  if (type === "email") return "text";
  return "text";
}

export function EntityManager({ title, table, columns }: EntityManagerProps) {
  return (
    <ModuleManager
      config={{
        title,
        table,
        primaryLabel: columns.find((c) => c.key === "title") ? "title" : columns[0]?.key ?? "id",
        fields: columns.map((c) => ({ key: c.key, label: c.label, type: c.key === "status" ? "select" : mapType(c.type), options: c.key === "status" ? [{ label: "Draft", value: "draft" }, { label: "Review", value: "review" }, { label: "Published", value: "published" }] : undefined })),
      }}
    />
  );
}
