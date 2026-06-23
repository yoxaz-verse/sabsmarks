import { ModuleManager } from "@/components/admin/module-manager";
import { adminModules } from "@/components/admin/module-config";

export default function AdminSeniorManagementTeamPage() {
  return <ModuleManager config={adminModules.senior_management_team} />;
}
