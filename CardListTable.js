// it shows a table listing scanned cards

import StatusBadge from './StatusBadge'

export default function CardListTable() {
    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50" >
            <table className="w-full text-left text-sm">
                <thead className="border-b border-zinc-800 text-zinc-400">
                <tr>
                    <th className="px-3 py-2">#</th>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Set</th>
                    <th className="px-3 py-2">Rarity</th>
                    <th className="px-3 py-2">Status</th>
                </tr>
                </thead>
                <tbody>
                    {[...Array(8)].map((_, i) => (
                            <tr key={i} className="border-b border-zinc-800/60 last:border-0">
                                <td className="px-3 py-2">{i + 1}</td>
                                <td className="px-3 py-2 text-zinc-300">-</td>
                                <td className="px-3 py-2">-</td>
                                <td className="px-3 py-2">-</td>
                                <td className="px-3 py-2"><StatusBadge /></td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}