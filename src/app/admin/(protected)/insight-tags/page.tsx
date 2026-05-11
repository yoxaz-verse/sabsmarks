import { redirect } from "next/navigation";

export default function AdminModuleDisabled() {
  redirect("/admin");
}
