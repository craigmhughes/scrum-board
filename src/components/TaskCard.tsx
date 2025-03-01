import { Draggable } from "@hello-pangea/dnd"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { useActiveCard } from "./active-card"

const EXCERPT_LIMIT = 80

export type Task = {
    index: number,
    title: string,
    dateCreated: string,
    description?: string,
}

export type TaskCardType = Task & {
    draggableId: string
}

const excerpt = (stringToLimit: string | undefined) => {
    const shouldLimit = stringToLimit && stringToLimit.length > EXCERPT_LIMIT
    return shouldLimit ? `${stringToLimit?.substring(0, EXCERPT_LIMIT)}...` : stringToLimit
}

export default function TaskCard({...props}: TaskCardType) {
    const descriptionExcerpt = excerpt(props.description)
    const {setActiveCard, setOpen} = useActiveCard();

    return (
        <Draggable draggableId={props.draggableId} index={props.index ?? 0} key={props.draggableId}>
            {(provided) => (
                <Card 
                    className="text-left"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => {
                        setActiveCard({...props})
                        setOpen(true);
                    }}
                    onKeyUp={(e) => {
                        // TODO: look into more possible interaction values to capture. 
                        // Using "space" on cards allows us to use the drag and drop feature.
                        if (e.key === "Enter") {
                            setActiveCard({...props})
                            setOpen(true);
                        }
                    }}
                >
                    <CardHeader>
                        <CardTitle className="text-lg font-normal">{props.title}</CardTitle>
                        {descriptionExcerpt && (
                            <CardDescription className="text-xs">
                                {descriptionExcerpt}
                            </CardDescription>
                        )}
                    </CardHeader>
                    <CardFooter>
                        <p className="text-xs">
                            {new Date(props.dateCreated).toDateString()}
                        </p>
                    </CardFooter>
                </Card>
            )}
        </Draggable>
    )
}