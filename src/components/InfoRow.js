//used in current card

export default function InfoRow({ k, v }) {
    return (
        <div className="flex items-center gap-3 text-sm">
            <span className="w-28 shrink-0 text-zinc-400">{k}</span>
            <span className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-zinc-200">{v}</span>
        </div>
    )
}