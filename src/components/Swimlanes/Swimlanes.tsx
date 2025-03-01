import Swimlane from "./Swimlane";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useCallback, useMemo } from 'react';
import { Task, TaskCardType } from '../TaskCard';
import { TaskData, useActiveCard } from '../active-card';

type TaskCards = {
    "Pending": TaskCardType[],
    "In Progress": TaskCardType[],
    "Completed": TaskCardType[],
}

type DragAndDropTransfer = {
    source: Task[],
    destination: Task[]
}

const EmptyData = {
    "Pending": [],
    "In Progress": [],
    "Completed": [],
}

const findColumnById = (data: TaskData, id: string) => {
    const keys = Object.keys(data)
    const foundId = keys.map((i) => i.toLowerCase().replace(/ /g, "-")).findIndex((i) => i === id)
    return keys[foundId] as keyof typeof data
}

export default function Swimlanes() {
    const {data, setData} = useActiveCard()

    const draggableData = useMemo<TaskCards>(() => {
        if (!data) return EmptyData

        let newData = {...data}
        Object.keys(newData).forEach((key) => {
            let column = newData[key as keyof typeof newData]
            newData[key as keyof typeof newData] = column.map((task) => ({
                ...task,
                draggableId: new Date(task.dateCreated).getTime().toString()
            }))
        })

        return newData as TaskCards
    }, [data])

    const updateCardPlacement = useCallback((e: DropResult<string>) => {
        if (!e.destination || !data) return

        const { droppableId: destinationColumnId, index: toIndex } = e.destination;
        const { droppableId: sourceColumnId, index: sourceIndex } = e.source;
        
        const sourceKey = findColumnById(data, sourceColumnId);
        const destinationKey = findColumnById(data, destinationColumnId);

        if (!(sourceKey && destinationKey)) return;
        
        let updatedData: TaskData = { ...data };
        const columns: DragAndDropTransfer = {
            source: updatedData[sourceKey],
            destination: updatedData[destinationKey],
        };
        
        const movedCard = columns.source[sourceIndex];
        const refreshIndexes = (items: Task[]) => items.map((item, idx) => ({ ...item, index: idx + 1 }));
        
        columns.source = columns.source.filter((_, idx) => idx !== sourceIndex);
        
        if (sourceKey === destinationKey) {
            columns.source.splice(toIndex, 0, movedCard);
            updatedData[sourceKey] = refreshIndexes(columns.source);
        } else {
            columns.destination.splice(toIndex, 0, movedCard);
            updatedData[sourceKey] = refreshIndexes(columns.source);
            updatedData[destinationKey] = refreshIndexes(columns.destination);
        }
        
        setData(updatedData);   
    }, [data])

    return (
        <>
            <h1>Your Sprint</h1>
            <DragDropContext onDragEnd={(e) => updateCardPlacement(e)}>
                {draggableData && Object.keys(draggableData).map((key) => (
                    <Swimlane 
                        title={key} 
                        cards={draggableData[key as keyof typeof data]} 
                        key={key} 
                    />
                ))}
            </DragDropContext>
        </>
    )
}