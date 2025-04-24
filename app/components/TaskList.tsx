'use client'
import {Task} from "../hooks/useTasks";
import {useEffect, useState, useMemo} from "react";
import TaskForm from "./TaskForm";
import LoadingSpinner from "./LoadingSpinner";
import TaskItem from "./TaskItem";

interface TaskListProps {
    tasks: Task[],
    isLoading: boolean,
    onCreate: (data: { title: string, description: string }) => void,
    onUpdate: (task: Task) => void,
    onDelete: (id: number) => void,
    onToggleComplete: (task: Task) => void,
}

export default function TaskList({tasks, isLoading, onCreate, onUpdate, onDelete, onToggleComplete}: TaskListProps) {
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const handleEdit = (task: Task) => {
        setEditingTask(task);
    }



    const handleUpdate = (data: { title: string, description: string }) => {
        if (editingTask) {
            onUpdate({...editingTask, ...data})
            setEditingTask(null);
        }
    }

    const handleCancelEdit = () => {
        setEditingTask(null);
    }

    // Memoize initialData to prevent it from changing on every render
    const memoizedInitialData = useMemo(() => {
        return editingTask ? {
            title: editingTask.title,
            description: editingTask.description
        } : {title: '', description: ''};
    }, [editingTask]);

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">To-Do List</h1>

            {editingTask ? (
                <TaskForm
                    initialData={memoizedInitialData}
                    onSubmit={handleUpdate}
                    onCancel={handleCancelEdit}
                    isEditing
                />
            ) : (
                <TaskForm onSubmit={onCreate} initialData={memoizedInitialData} />
            )}

            {isLoading ? (
                <LoadingSpinner/>
            ) : (
                <div className="mt-6">
                    {!Array.isArray(tasks) || tasks.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No tasks found.</p>
                    ) : (
                        tasks.map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onEdit={handleEdit}
                                onDelete={onDelete}
                                onToggleComplete={onToggleComplete}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    )
}
