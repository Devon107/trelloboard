'use client'
import { useState } from "react"
import { Plus } from "react-feather"
import { DragDropContext, DropResult } from "@hello-pangea/dnd"
import Board from "../components/Board"
import Button from "../components/Button"
import Header from "../components/Header"
import Task from "../components/Task"
import TaskList from "../components/TaskList"
import { TrelloListForm } from "../components/TrelloForm"
import Footer from "../components/Footer"
import useTrelloStore from "../utils/store"
import { AnimatePresence } from "framer-motion"
import { useEffect } from "react"

function Page() {
  const [showAddListForm, setShowAddListForm] = useState(false)
  const lists = useTrelloStore((state) => state.lists[state.currentProject])
  const tasks = useTrelloStore((state) => state.tasks)
  const shiftTask = useTrelloStore((state) => state.shiftTask)
  const darkModeStore = useTrelloStore((state) => state.darkMode)
  useEffect(() => {
    if(window.matchMedia("(prefers-color-scheme: dark)").matches)
      document.documentElement.classList.add("dark")
  },[])
  useEffect(() => {
    darkModeStore ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark")
  },[darkModeStore])

  const handleTaskDrag = ({ destination, source }: DropResult): void => {
    if (!destination) return
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return

    shiftTask(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index
    )
  }

  return (
      <div
      className={`App flex flex-col min-h-screen bg-slate-500 dark:bg-slate-950`}>
        <Header title="Trello Board"/>
        <DragDropContext onDragEnd={handleTaskDrag}>
          <Board>
              {lists.map((list) => (
                <TaskList
                  key={list.id}
                  list={list}
                  numTasks={tasks[list.id].length}
                >
                  {tasks[list.id].map((task, idx) => (
                    <Task
                      key={task.id}
                      task={task}
                      listId={list.id}
                      idx={idx}
                      className="mb-1.5"
                    />
                  ))}
                </TaskList>
              ))}
            {showAddListForm ? (
              <TrelloListForm
                onSubmit={() => setShowAddListForm(false)}
                onCancel={() => setShowAddListForm(false)}
                inputValue=""
              />
            ) : (
              <Button onClick={() => setShowAddListForm(true)}>
                <Plus className="mr-1" />
                <span>Add {lists.length ? "another" : "a"} list</span>
              </Button>
            )}
          </Board>
        </DragDropContext>
        <Footer />
      </div>
  )
}
export default Page
