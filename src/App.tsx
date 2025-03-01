import './App.css'
import { ThemeProvider } from '@/components/theme-provider'
import Swimlanes from './components/Swimlanes/Swimlanes'

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="task-manager-theme">
            <Swimlanes />
        </ThemeProvider>
    )
}

export default App
