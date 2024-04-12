'use client'
import { useState } from "react"
import { Plus } from "react-feather"
import Board from "../components/Board"
import Button from "../components/Button"
import Header from "../components/Header"
import Task from "../components/Task"
import TaskList from "../components/TaskList"
import { TrelloListForm } from "../components/TrelloForm"
import Footer from "../components/Footer"
import useTrelloStore from "../utils/store"
import { useEffect } from "react"
import DropIndicator from "@/components/DropIndicator"

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

  return (
      <main className={`App flex flex-col min-h-screen bg-slate-500 dark:bg-slate-950`}>
        <Header title="Trello Board"/>
        <h2 className="hidden">Subtitle</h2>
        <Board>
            {lists.map((list) => (
              <TaskList
                key={list.id}
                list={list}
                allTasks={tasks}
                tasks={tasks[list.id]}
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
                <DropIndicator beforeId={null} column={list.id} />
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
        <Footer />
      </main>
  )
}
export default Page
