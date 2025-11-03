export default function LabeledInput({label, placeholder}) {
    return (
        <label className="grid gap-1 text-sm">
            <span className="text-zinc-400">{label}</span>
            <input
                className="h-10 rounded-xl border border-zinc-700 bg-zinc-900 px-3 outline-none focus:border-zinc-500"
                placeholder={placeholder}
            />
        </label>
    )
}