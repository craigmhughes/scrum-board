import { Droppable } from "@hello-pangea/dnd"
import type { TaskCardType } from "../TaskCard"
import TaskCard from "../TaskCard"
import { useTheme } from "../theme-provider"

interface SwimlaneInterface {
    title: string
    cards: TaskCardType[]
    laneColor: string
}

export default function Swimlane({
    title,
    cards,
    laneColor
}: SwimlaneInterface) {
    const id = title.toLowerCase().replace(/\ /g, "-")
    const {theme} = useTheme()

    const laneHover = theme === "dark" ? "#202020" : "#e3e3e3"

    return (
        <div className="lg:min-w-[380px]">
            <div className="py-1 my-2 px-2 flex gap-4 items-center">
                <h2 className="text-left text-lg font-normal">{title}</h2>
                {cards.length > 0 && (
                    <p className="scale-[0.9] text-xs px-4 py-2 border-0 border rounded-full text-white font-light" style={{backgroundColor: laneColor}}>{cards.length} Issues</p>
                )}
            </div>
            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <div
                        className="rounded-lg"
                        ref={provided.innerRef}
                        style={{ backgroundColor: snapshot.isDraggingOver ? laneHover : 'transparent' }}
                        {...provided.droppableProps}
                    >
                    {cards.length > 0 ? (
                        <div className="p-2.5 py-3.25 flex flex-col gap-3 mb-6 lg:mb-0 transition-all">
                            {cards.map((card, index) => <TaskCard {...card} index={index} />)}
                        </div>
                    ) : (
                        <div style={{borderColor: laneHover}} className="p-2.5 py-3.25 rounded-lg text-sm mt-6 border">
                            No issues to show
                        </div>
                    )}
                    {provided.placeholder}
                  </div>
                )}

            </Droppable>
            
        </div>
    )
}