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
          <Sparkles className="w-8 h-8 text-[#0284C7] dark:text-[#0EA5E9] animate-spin mb-3" />
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
            Loading tuition details...
          </p>
        </div>
      }
    >
      <TuitionDetailClient id={resolvedParams.id} />
    </Suspense>
  );
}
