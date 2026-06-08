import { ModuleManager } from "@/components/admin/module-manager";
import { adminModules } from "@/components/admin/module-config";

export default function AdminLocationsPage() {
  return <ModuleManager config={adminModules.locations} />;
}
