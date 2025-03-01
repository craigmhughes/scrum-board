import './App.css'
import { ThemeProvider } from '@/components/theme-provider'
import Swimlanes from './components/Swimlanes/Swimlanes'
import { EditCard } from './components/EditCard'
import { ActiveCardProvider } from './components/active-card'

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="task-manager-theme">
            <ActiveCardProvider>
                <div id="app-bg">
                    <div className="flex md:justify-between py-6 my-6 border-b flex-col md:flex-row gap-6 items-center">
                        <div className="flex flex-col text-left">
                            <p className="tracking-tight font-light mb-4">Task Manager</p>
                            <h1 className="tracking-tighter">Your Tasks</h1>
                        </div>
                        <EditCard />
                    </div>
                    <Swimlanes />
                </div>
            </ActiveCardProvider>
        </ThemeProvider>
    )
}

export default App
