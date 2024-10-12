//responsiveness pending
'use client';
import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';

export function AddTaskForm({ onTaskAdded }: { onTaskAdded: () => void }) {
  const [task, setTask] = useState('');

  // Function to add a new task
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();

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
      .insert([{ text: task, uuid: randomString, status: 'added', user_id: userId }]);

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
    <form onSubmit={addTask} className="flex flex-col space-y-3">
      <input type="text" placeholder="Enter your task..." value={task} name="note" onChange={(e) => setTask(e.target.value)} className="p-2 border rounded" />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Add Task
      </button>
    </form>
  );
};
