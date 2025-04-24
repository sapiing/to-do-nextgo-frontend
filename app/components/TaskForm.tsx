'use client'
import {useState, useEffect} from "react";

interface TaskFormProps {
    initialData?: {title: string; description: string}
    onSubmit: (data: {title: string; description: string}) => void;
    onCancel?: () => void;
    isEditing?: boolean
}

export default function TaskForm({
    initialData = {title: '', description: ''},
    onSubmit,
    onCancel,
    isEditing = false,
                                 }: TaskFormProps) {
    const [formData, setFormData] = useState(initialData)

    // Update formData when initialData changes
    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
        if (!isEditing) {
            setFormData({title: '', description: ''})
        }
    }

    return (
        <form onSubmit={handleSubmit} className={"bg-white p-4 rounded-lg shadow mb-4"}>
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                    Title
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                    Description (Option)
                </label>
                <textarea
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex justify-end space-x-2">
                {isEditing && onCancel && (
                    <button 
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    {isEditing ? 'Update Task' : 'Add Task'}
                </button>
            </div>
        </form>
    )
}
