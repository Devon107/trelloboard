import clsx from "clsx"
import { X } from "react-feather"
import useTrelloStore, { ListItem, TaskItem } from "../utils/store"
import Button from "./Button"
import { motion } from "framer-motion"
import DropIndicator from "./DropIndicator"

export interface ITaskProps {
  task: TaskItem
  listId: ListItem["id"]
  idx: number
  className?: string
}

const handleDragStart = (event: any, cardId: string) => {
  event.dataTransfer.setData("cardId", cardId);
}

function Task({ task, listId, idx, className }: ITaskProps) {
  const deleteTask = useTrelloStore((state) => state.deleteTask)

  return (
    <>
      <DropIndicator beforeId={task.id} column={listId}/>
      <motion.div
        layout
        layoutId={task.id}
        draggable="true"
        onDragStart={(e : any) => handleDragStart(e, task.id)}
        className={`cursor-grab active:cursor-grabbing relative group bg-gray-200 text-sm p-2 shadow rounded list-none dark:bg-slate-600
              ${className}
              `}
        >
            <p className="text-gray-800 dark:text-gray-200">{task.content}</p>
            <Button
              onClick={() => deleteTask(listId, task.id)}
              className="w-6 h-6 absolute top-1 right-1 hidden group-hover:block"
              floating
            >
              <X className="w-5 h-5" />
            </Button>
      </motion.div>
    </>
  )
}

export default Task