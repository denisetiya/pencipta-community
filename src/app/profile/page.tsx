import type { Metadata } from "next";
import { ResponsiveShell } from "@/components/layout";
import { ProfileView } from "@/components/profile";

export const metadata: Metadata = {
  title: "Alex Rivera (@alexrivera) | pencipta-comunity",
  description: "Product Designer | Alumni DKV 2021 on pencipta-comunity.",
};

export default function ProfilePage() {
  return (
    <ResponsiveShell
      headerTitle="Profile"
      headerSubtitle="User profile, credentials & discussions"
      showMobileHeader={false}
    >
      <ProfileView />
    </ResponsiveShell>
  );
}
