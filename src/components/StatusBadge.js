// for card list table. pending is gray and if its complete, it turns green

export default function StatusBadge({ status = 'Pending' }) {
    const color = status === 'Done' ? 'bg-emerald-600/20 text-emerald-300' : 'bg-zinc-700/30 text-zinc-300'
    return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${color}`}>{status}</span>
}