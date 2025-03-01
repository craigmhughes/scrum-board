import { Draggable } from "@hello-pangea/dnd"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

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

export default function TaskCard({
    index,
    title,
    description,
    draggableId,
    dateCreated
}: TaskCardType) {
    const descriptionExcerpt = excerpt(description)

    return (
        <Draggable draggableId={draggableId} index={index ?? 0} key={draggableId}>
            {(provided) => (
                <Card 
                    className="text-left"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <CardHeader>
                        <CardTitle className="text-lg font-normal">{title}</CardTitle>
                        {descriptionExcerpt && (
                            <CardDescription className="text-xs">
                                {descriptionExcerpt}
                            </CardDescription>
                        )}
                    </CardHeader>
                    <CardFooter>
                        <p className="text-xs">
                            {new Date(dateCreated).toDateString()}
                        </p>
                    </CardFooter>
                </Card>
            )}
        </Draggable>
    )
}