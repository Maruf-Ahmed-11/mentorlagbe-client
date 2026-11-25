export default function DashboardLoading() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2.5">
        <div className="h-6 w-44 rounded-full bg-[#E2E8F0] dark:bg-[#0D1D38]" />
        <div className="h-8 w-64 rounded-xl bg-[#E2E8F0] dark:bg-[#0D1D38]" />
        <div className="h-4 w-80 rounded-lg bg-[#E2E8F0]/70 dark:bg-[#0D1D38]/70" />
      </div>

      {/* 4 Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-32 rounded-2xl bg-white dark:bg-[#0B1930]/80 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-5 space-y-3"
          >
            <div className="h-3.5 w-24 rounded bg-[#E2E8F0] dark:bg-[#0D1D38]" />
            <div className="h-8 w-16 rounded-lg bg-[#E2E8F0] dark:bg-[#0D1D38]" />
            <div className="h-3 w-32 rounded bg-[#E2E8F0]/70 dark:bg-[#0D1D38]/70" />
          </div>
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="h-72 rounded-2xl bg-white dark:bg-[#0B1930]/80 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-6 space-y-4">
        <div className="h-5 w-48 rounded bg-[#E2E8F0] dark:bg-[#0D1D38]" />
        <div className="h-14 rounded-xl bg-[#F8FAFC] dark:bg-[#07101E]" />
        <div className="h-14 rounded-xl bg-[#F8FAFC] dark:bg-[#07101E]" />
        <div className="h-14 rounded-xl bg-[#F8FAFC] dark:bg-[#07101E]" />
      </div>
    </div>
  );
}
