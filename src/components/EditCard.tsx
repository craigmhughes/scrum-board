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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "./ui/textarea"
import { useActiveCard } from "./active-card"

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

function TaskForm({ className }: React.ComponentProps<"form">) {
    const {activeCard} = useActiveCard()
    return (
    <form className={cn("grid items-start gap-4", className)}>
        <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" defaultValue={activeCard?.title} />
        </div>
        <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" defaultValue={activeCard?.description} className="resize-y max-h-[350px] min-h-[180px]" />
        </div>
        <Button type="submit">Save changes</Button>
    </form>
    )
}

