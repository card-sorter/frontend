export default function Progress ({ value, label }) {
    const clamped = Math.min(Math.max(value ?? 0, 0), 100)
    return (
        <div className="relative h-6 w-full overflow-hidden rounded-full border border-zinc-800 bg-zinc-950">
            <div className="h-full bg-emerald-600/90 transition-all" style= {{width: `${clamped}%`}} />
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-[11px] tracking-wide text-zinc-200">
                {label}
            </div>
        </div>
    )
}