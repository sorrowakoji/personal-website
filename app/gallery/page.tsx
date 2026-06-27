import { FanartGallery } from "@/components/fanart-gallery";

export const metadata = {
  title: "Fanart Gallery — Sorrow Akoji",
  description:
    "Fan art submissions and community artwork for VTuber Sorrow Akoji.",
};

export default function FanartPage() {
  return (
    <main className="graph-papermin-h-screen pt-16">
      <FanartGallery />
    </main>
  );
}
