// for gray box with an icon and text.

import { Gauge } from 'lucide-react'

export default function PlaceHolder({ children, Icon = Gauge }) {
    return (
        <div className="grid min-h-28 place-items-center rounded-xl border border-dashed border-zinc-700 bg-zinc-900/40 p-6 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
                <Icon className="size-4 opacity-75" />
                <span>{children}</span>
            </div>
        </div>
    )
}
