import './App.css'
import { ThemeProvider } from '@/components/theme-provider'
import Swimlanes from './components/Swimlanes/Swimlanes'
import { EditCard } from './components/EditCard'
import { ActiveCardProvider } from './components/active-card'

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="task-manager-theme">
            <ActiveCardProvider>
                <EditCard />
                <Swimlanes />
            </ActiveCardProvider>
        </ThemeProvider>
    )
}

export default App
