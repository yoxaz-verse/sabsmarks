import { CareersLandingEditor } from "@/components/admin/careers-landing-editor";
import { ModuleManager } from "@/components/admin/module-manager";
import { adminModules } from "@/components/admin/module-config";

export default function AdminCareersPage() {
  return (
    <div className="space-y-6">
      <CareersLandingEditor />
      <ModuleManager config={adminModules.careers} />
    </div>
  );
}
