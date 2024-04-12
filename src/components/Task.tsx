import { useEffect, useState } from "react"
import { Check, X } from "react-feather"
import useTrelloStore, { ListItem, TaskItem } from "../utils/store"
import Button from "./Button"
import { motion } from "framer-motion"
import DropIndicator from "./DropIndicator"
import Modal from "./Modal"
import TrelloForm, { TrelloTextArea } from "./TrelloForm"

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
  const [showInfo, setShowInfo] = useState(false)
  const editTask = useTrelloStore((state) => state.editTask)
  const [editContent, seteditContent] = useState(task.content)

  useEffect(() => {
    seteditContent(task.content)
  }, [])
  const deleteTask = (e: React.MouseEvent<HTMLButtonElement>, listId: string, taskId: string) => { 
    e.stopPropagation();
    useTrelloStore.getState().deleteTask(listId, taskId)
  }
  const SaveTask = (e: React.MouseEvent<HTMLButtonElement>, listId: string, taskId: string) => {
    e.preventDefault()
    editTask(listId, taskId, { content:  editContent })
    setShowInfo(false)
  }

  return (
    <>
      <DropIndicator beforeId={task.id} column={listId}/>
      <motion.div
        layout
        layoutId={task.id}
        draggable="true"
        onClick={() => setShowInfo(!showInfo)}
        onDragStart={(e : any) => handleDragStart(e, task.id)}
        className={`cursor-grab active:cursor-grabbing relative group bg-gray-200 text-sm p-2 shadow rounded list-none dark:bg-slate-600
              ${className}
              `}
        >
            <p className="text-gray-800 dark:text-gray-200">{task.title}</p>
            <Button
              onClick={(e) => deleteTask(e,listId, task.id)}
              className="w-6 h-6 absolute top-1 right-1 hidden group-hover:block"
              floating
            >
              <X className="w-5 h-5" />
            <span className="ml-2 hidden">Delete</span>
            </Button>
      </motion.div>
        {showInfo && (
          <Modal
            title={task.title}
            body=""
            danger={false}
            children={
              <div className="w-full grid grid-cols-2 gap-2">
                <TrelloForm
                  onSubmit={e => {}}
                  className="w-full flex flex-col gap-2 grid-cols-subgrid col-span-2"
                >
                  <p className="font-bold text-gray-800 dark:text-gray-200">Content</p>
                  <TrelloTextArea
                    className="text-gray-700 bg-gray-200/50 dark:text-gray-200 focus:outline-none w-full dark:bg-slate-700 rezise-none rounded p-2"
                    value={editContent}
                    onChange={(e) => seteditContent(e.target.value)}
                    autoFocus
                  />
                </TrelloForm>
                <Button
                  onClick={(e) => {SaveTask(e, listId, task.id)} }
                  className="!bg-green-600"
                >
                  <Check className="w-4 h-4 mr-2" />
                  <span>Save</span>
                </Button>
                <Button
                  onClick={() => setShowInfo(false)}
                  className="!bg-slate-600"
                >
                  <X className="mr-2 w-5 h-5" />
                  <span>Cancel</span>
                </Button>
              </div>
            }
          />
        )}
    </>
  )
}

export default Task