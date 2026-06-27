import { ComingSoonOverlay } from "@/components/coming-soon-overlay";
import { Commissions } from "@/components/commissions";

export const metadata = {
  title: "Video Commissions — Sorrow Akoji",
  description: "Commission a custom animated video from VTuber Sorrow Akoji.",
};

export default function CommissionsPage() {
  return (
    <main className="min-h-screen pt-16">
      <Commissions />

      <ComingSoonOverlay />
    </main>
  );
}
