import { ModuleManager } from "@/components/admin/module-manager";
import { adminModules } from "@/components/admin/module-config";

export default function AdminTeamPage() {
  return <ModuleManager config={adminModules.team_members} />;
}
