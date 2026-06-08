import { ModuleManager } from "@/components/admin/module-manager";
import { adminModules } from "@/components/admin/module-config";

export default function AdminInsightCategoriesPage() {
  return <ModuleManager config={adminModules.insight_categories} />;
}
