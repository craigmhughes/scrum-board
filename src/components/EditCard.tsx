import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea"
import { TaskData, useActiveCard } from "./active-card"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TaskCardType } from "./TaskCard"

export function EditCard() {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const {open, setOpen, activeCard, setActiveCard} = useActiveCard()

  const newTask = React.useCallback((toggle: boolean) => {
    setActiveCard(undefined)
    setOpen(toggle)
  }, [setOpen, setActiveCard])

  const actionType = activeCard ? "Edit" : "Create"
  const title = `${actionType} Task`

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={newTask}>
        <DialogTrigger asChild>
          <Button variant="outline">Create Task</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <TaskForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Create Task</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <TaskForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const findColumnContainingActiveCard = (data: TaskData, activeCard: TaskCardType) => (
    Object.keys(data).map((i) => (
        data[i as keyof typeof data].findIndex((i) => i.title === activeCard.title)
    )).map((j) => j >= 0).indexOf(true)
)

const findActiveCardLocation = (data: TaskData, activeCard: TaskCardType) => {
    const matchedColumnIdx = findColumnContainingActiveCard(data, activeCard)
    const matchedColumn = Object.keys(data)[matchedColumnIdx] as keyof typeof data
    return {
        key: matchedColumn,
        index: data[matchedColumn]?.findIndex((i) => i.title === activeCard.title)
    }
}

function TaskForm({ className }: React.ComponentProps<"form">) {
    const {activeCard, data, setActiveCard, setData, setOpen} = useActiveCard()
    
    const FormSchema = z.object({
        title: z.string().min(1, {message: "A title is required for a ticket"}).default(activeCard?.title || ''),
        description: z.string().default(activeCard?.description || ''),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit = React.useCallback((submission: z.infer<typeof FormSchema>) => {
        const isNew = !activeCard
        const overwrittenData = {...data}

        if (!overwrittenData) return
        
        if (isNew) {
            overwrittenData.Pending?.push({
                ...submission,
                dateCreated: new Date().toDateString(),
                index: overwrittenData.Pending.length,
            })
        } else {
            const {key, index} = findActiveCardLocation(overwrittenData, activeCard)
            overwrittenData[key][index] = {
                ...activeCard,
                ...submission
            }
        }

        setData(overwrittenData)
        setOpen(false)
    }, [FormSchema, activeCard])

    const deleteTask = React.useCallback(() => {
        if (!activeCard) return

        const updatedData = {...data}
        const {key, index} = findActiveCardLocation(updatedData, activeCard)
        updatedData[key].splice(index, 1)

        setData(updatedData)
        setOpen(false)
        setActiveCard(undefined)
    }, [setData, activeCard])
    
    return (
        <Form {...form}>
            <form className={cn("grid items-start gap-4", className)} onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="grid gap-2">
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} defaultValue={activeCard?.title} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} 
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="grid gap-2">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea 
                                    {...field} 
                                    defaultValue={activeCard?.description} 
                                    className="resize-y max-h-[350px] min-h-[180px]"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} 
                />        
                <Button type="submit">Submit</Button>
                <Button type="button" variant="secondary" onClick={() => deleteTask()}>Delete</Button>
            </form>
        </Form>
    )
}

