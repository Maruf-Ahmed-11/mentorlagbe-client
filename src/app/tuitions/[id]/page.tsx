import { Suspense } from "react";
import TuitionDetailClient from "./TuitionDetailClient";
import { Sparkles } from "lucide-react";

export const instant = false;

export default async function TuitionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
          <Sparkles className="w-8 h-8 text-[#D91E48] dark:text-[#FF1E40] animate-spin mb-3" />
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
            Loading tuition details...
          </p>
        </div>
      }
    >
      <TuitionDetailClient id={resolvedParams.id} />
    </Suspense>
  );
}
