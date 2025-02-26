import './App.css'
import { ThemeProvider } from '@/components/theme-provider'
import TestUI from './components/TestUI'

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="task-manager-theme">
            <TestUI />
        </ThemeProvider>
    )
}

export default App
