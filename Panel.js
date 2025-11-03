//card component
import { useState } from 'react'
import { ChevronUp, ChevronDown} from "lucide-react";

export default function Panel({ title, defaultOpen = true, children, full = false }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className={`rounded-2xl border border-zinc-800 bg-zinc-900/60 ${full ? 'md:col-span-2' : ''}`}>
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between gap-2 rounded-2xl px-4 py-2 text-sm tracking-wide text-zinc-300"
                >
                <span className="font-medium">{title}</span>
                {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
            </button>
            <div className={`${open ? 'block' : 'hidden'} p-3 md:p-4`}>{children}</div>
        </div>
    )
}