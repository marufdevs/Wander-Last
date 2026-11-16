export function DestinationsSkeleton() {
  return (
    <div className="mt-8 animate-pulse">
      <div className="h-[46px] border border-zinc-200 bg-zinc-50" />
      <div className="mt-4 h-4 w-44 bg-zinc-100" />

      <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index}>
            <div className="aspect-[2.2/1] w-full bg-zinc-100" />
            <div className="mt-3 h-3 w-20 bg-zinc-100" />
            <div className="mt-2 h-4 w-3/4 bg-zinc-100" />
            <div className="mt-2 h-3 w-28 bg-zinc-100" />
            <div className="mt-3 h-3 w-24 bg-zinc-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
