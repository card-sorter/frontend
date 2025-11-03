import Panel from '../components/Panel';
import LabeledInput from "../components/LabeledInput";

export default function Settings() {
    return (
        <Panel title="Settings" full>
            <div className="grid gap-3 sm:grid-cols-2">
                <LabeledInput label="Server URL" placeholder="http://localhost:8080" />
                <LabeledInput label="Camera Index" placeholder="0" />
                <LabeledInput label="Theme" placeholder="dark" />
                <button className="mt-2 inline-flex h-10 items-cemter justify-center rounded-xl border border-zinc-700 px-4 text-sm hover:bg-zinc-800">
                    Save
                </button>
            </div>
        </Panel>
    )
}