import { ModuleManager } from "@/components/admin/module-manager";
import { adminModules } from "@/components/admin/module-config";

export default function AdminInsightTagsPage() {
  return <ModuleManager config={adminModules.insight_tags} />;
}
