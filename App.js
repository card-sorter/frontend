import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layouts'
import OverviewPage from './pages/OverviewPage'
import CurrentCardPage from './pages/CurrentCard'
import CardListPage from './pages/CardList'
import TerminalPage from './pages/Terminal'
import SettingsPage from './pages/Settings'

export default function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<OverviewPage />} />
                <Route path="/card" element={<CurrentCardPage />} />
                <Route path="/list" element={<CardListPage />} />
                <Route path="/terminal" element={<TerminalPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<div className="p-4 text-zinc-300">Page not found</div>} />
            </Routes>
        </Layout>
    )
}
