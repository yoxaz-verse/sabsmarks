import { ModuleManager } from "@/components/admin/module-manager";
import { adminModules } from "@/components/admin/module-config";

export default function AdminAppointmentsPage() {
  return (
    <div className="space-y-6">
      <ModuleManager config={adminModules.appointment_availability_rules} />
      <ModuleManager config={adminModules.appointment_blocks} />
      <ModuleManager config={adminModules.appointment_requests} />
    </div>
  );
}
