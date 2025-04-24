'use client'
import {Task} from "../hooks/useTasks";
import {FaEdit, FaTrash} from "react-icons/fa";

interface TaskItemProps {
    task: Task,
    onEdit: (task: Task) => void,
    onDelete: (id: number) => void,
    onToggleComplete: (task: Task) => void,
}

export default function TaskItem({task, onEdit, onDelete, onToggleComplete}: TaskItemProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleComplete(task)}
                    className={"h-4 w-4 text-blue-600 rounded"}
                />
                <div>
                    <h3 className={`font-medium ${task.completed ? 'line-through text-green-400' : 'text-gray-800'}`}>
                        {task.title}
                    </h3>
                    {task.description && (
                        <p className="text-gray-600 text-sm">{task.description}</p>
                    )}
                </div>
            </div>
            <div className={"flex space-x-2"}>
                <button
                    onClick={() => onEdit(task)}
                    className={"text-blue-500 hover:text-blue-700"}
                >
                    <FaEdit/>
                </button>
                <button onClick={() => onDelete(task.id)} className={"text-red-500 hover:text-red-700"}>
                    <FaTrash/>
                </button>
            </div>
        </div>
    )
}
