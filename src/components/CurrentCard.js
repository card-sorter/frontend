// it shows the current card details

import InfoRow from "./InfoRow"

export default function CurrentCard() {
    return (
        <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1 rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
                <div className="text-sm text-zinc-400">Thumbnail</div>
                <div className="mt-2 axpect-[3/4] rounded-lg border border-dashed border-zinc-700" />
            </div>
            <div className="col-span-2 space-y-2 rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
                <InfoRow k="Name" v="(none)" />
                <InfoRow k="Set" v="-" />
                <InfoRow k="Rarity" v="-" />
                <InfoRow k="Detected ID" v="#000000" />
            </div>
        </div>
    )
}