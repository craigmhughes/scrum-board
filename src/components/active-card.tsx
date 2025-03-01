import mockData from '@/mocks/data.json'
import React, { useCallback } from "react"
import { Task, TaskCardType } from "./TaskCard"

export type TaskData = {
    "Pending": Task[],
    "In Progress": Task[],
    "Completed": Task[],
}

interface ActiveCardInterface {
    children: React.ReactNode
}

type ActiveCardState = {
    open: boolean
    setActiveCard: (card?: TaskCardType) => void
    setOpen: (val: boolean) => void
    setData: (data: TaskData) => void
    activeCard?: TaskCardType
    data: TaskData
}


const initialState: ActiveCardState = {
    activeCard: undefined,
    open: false,
    data: {
        "Pending": [],
        "In Progress": [],
        "Completed": []
    },
    setActiveCard: () => null,
    setOpen: () => null,
    setData: () => null,
}

const ActiveCardProviderContext = React.createContext<ActiveCardState>(initialState)

export function ActiveCardProvider({
    children,
    ...props
}: ActiveCardInterface) {
    const [data, setData] = React.useState<TaskData>((
        JSON.parse(localStorage.getItem("taskData") || JSON.stringify(initialState.data))
    ))
    const [activeCard, setActiveCard] = React.useState<TaskCardType>()
    const [open, setOpen] = React.useState<boolean>(false)

    const updateData = useCallback((newData: TaskData) => {
        localStorage.setItem("taskData", JSON.stringify(newData))
        setData(newData)
    }, [setData])

    const value = {
        open,
        activeCard,
        data,
        setOpen,
        setActiveCard,
        setData: updateData
    }

    return (
        <ActiveCardProviderContext.Provider {...props} value={value}>
            {children}
        </ActiveCardProviderContext.Provider>
    )
}

export const useActiveCard = () => {
    const context = React.useContext(ActiveCardProviderContext)

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider")

    return context
}