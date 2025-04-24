'use client'
import {Task, useTasks} from "./hooks/useTasks";
import TaskList from "./components/TaskList";

export default function Home() {
    const {tasks, isLoading, createTask, updateTask, deleteTask} = useTasks();

    const handleCreate = (data: { title: string, description: string }) => {
        // @ts-ignore
        createTask.mutate(data)
    }

    const handleUpdate = (task: Task) => {
        updateTask.mutate(task)
    }

    const handleDelete = (id: number) => {
        deleteTask.mutate(id)
    }

    const handleToggleComplete = (task: Task) => {
        updateTask.mutate({...task, completed: !task.completed})
    }

    return (
        <main className={"min-h-screen bg-gray-100 py-8"}>
            <TaskList
                tasks={Array.isArray(tasks) ? tasks : []}
                isLoading={isLoading}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
            />
        </main>
    );
}
