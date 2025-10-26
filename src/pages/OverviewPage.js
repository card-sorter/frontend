import Panel from "../components/Panel"
import PlaceHolder from "../components/PlaceHolder"
import CurrentCard from "../components/CurrentCard";
import TerminalContent from "../components/TerminalContent";
import CardListTable from "../components/CardListTable";

export default function OverviewPage() {
    return (
        <>
            <Panel title="SORT TYPE" defaultOpen full>
                <PlaceHolder>Drag a sort type here or select one...</PlaceHolder>
            </Panel>


            <Panel title="CURRENT CARD">
                <CurrentCard />
            </Panel>

            <Panel title="CARD LIST" full>
                <CardListTable />
            </Panel>

            <Panel title="TERMINAL" full>
                <TerminalContent />
            </Panel>
        </>
    )
}