'use client';
import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';

export function AddTaskForm({ onTaskAdded }: { onTaskAdded: () => void }) {
  const [task, setTask] = useState('');
   
  // Capitalize the first letter of the task
   const capitalizeFirstLetter = (task: string) => {
    return task.charAt(0).toUpperCase() + task.slice(1);
  };

  // Function to add a new task
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();

    // Capitalize the first letter before submitting
     const formattedTask = capitalizeFirstLetter(task);

    // Check if user is authenticated
    const { data: userResponse, error: userError } = await supabase.auth.getUser();
    console.log('User Response:', userResponse); // Debugging log for user response

    if (userError) {
      console.error('Error fetching user:', userError);
      alert('Error fetching user.');
      return;
    }

    if (!userResponse?.user) {
      alert('You must be logged in to add a task.');
      return;
    }

    const userId = userResponse.user.id;
    const randomString = crypto.randomUUID();

    const { data, error } = await supabase
      .from('todo_app')
      .insert([{ text: formattedTask, uuid: randomString, status: 'added', user_id: userId }]);

    if (error) {
      console.error('Error adding task:', error.message); // Log the error message
      alert(`Error adding task: ${error.message}`);
    } else {
      console.log('Task added successfully:', data);
      setTask(''); // Reset the task input
      onTaskAdded()
    }
  };

  return (
    <form onSubmit={addTask} className="flex flex-col space-y-3 p-4 sm:p-6 lg:p-8 w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
      <input
        type="text"
        placeholder="Enter your task..."
        value={task} name="note"
        onChange={(e) => setTask(e.target.value)}
        className="p-3 sm:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
      <button
        type="submit"
        className="p-3 sm:p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 w-full">
        Add Task
      </button>
    </form>
  );
};
