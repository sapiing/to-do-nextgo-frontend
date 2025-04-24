'use client'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import client from "../api/client";

export interface Task {
    id: number,
    title: string,
    description: string,
    completed: boolean,
    created_at: string,
    updated_at: string,
}

export const useTasks = () => {
    const queryClient = useQueryClient()

    const {data: tasks, isLoading, error} = useQuery<Task[]>({
        queryKey: ['tasks'],
        queryFn: async () => {
            const response = await client.get("/tasks")
            // Ensure we always return an array
            if (Array.isArray(response.data)) {
                return response.data;
            } else if (response.data && Array.isArray(response.data.data)) {
                return response.data.data;
            } else if (response.data && Array.isArray(response.data.tasks)) {
                return response.data.tasks;
            } else {
                return [];
            }
        }
    })

    const createTask = useMutation({
        mutationFn: (newTask: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'completed'>) => {
            return client.post('/tasks', newTask);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tasks']})
        }
    })

    const updateTask = useMutation({
        mutationFn: (updatedTask: Partial<Task> & {id: number}) => {
            console.log('Updating task:', updatedTask);
            return client.put(`/tasks/${updatedTask.id}`, updatedTask);
        },
        onSuccess: (data, variables) => {
            console.log('Update successful:', data);
            queryClient.invalidateQueries({queryKey: ['tasks']})
        },
        onError: (error, variables) => {
            console.error('Update failed:', error);
            console.log('Variables used:', variables);
        }
    })

    const deleteTask = useMutation({
        mutationFn: (id: number) => {
            console.log('Deleting task with ID:', id);
            return client.delete(`/tasks/${id}`);
        },
        onSuccess: (data, variables) => {
            console.log('Delete successful:', data);
            queryClient.invalidateQueries({queryKey: ['tasks']})
        },
        onError: (error, variables) => {
            console.error('Delete failed:', error);
            console.log('ID used:', variables);
        }
    })

    return {
        tasks,
        isLoading,
        error,
        createTask,
        updateTask,
        deleteTask,
    }
}
