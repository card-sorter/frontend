export default function TerminalContent() {
    return (
        <div className="h-64 overflow-auto rounded-xl border border-zinc-800 bg-zinc-950 p-3 font-mono text-xs text-zinc-300">
            $ npm run tobor <br />
            <span className="text-emerald-400">ok</span> ready - server started on http://localhost:8000
        </div>
    )
}