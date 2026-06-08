import { ModuleManager } from "@/components/admin/module-manager";
import { adminModules } from "@/components/admin/module-config";

export default function AdminSubscribersPage() {
  return <ModuleManager config={adminModules.newsletter_subscribers} />;
}
