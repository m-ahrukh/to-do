'use client';

// export function AddTaskForm({ onSubmit }: { onSubmit: (formData: FormData) => Promise<void> }) {
//   return (
//     <form
//       className="flex flex-col justify-center items-center"
//       onSubmit={async (e) => {
//         e.preventDefault();
//         const form = e.target as HTMLFormElement;
//         const formData = new FormData(form);
//         await onSubmit(formData);
//         form.reset(); 
//       }}
//     >
//       <input
//         type="text"
//         name="note"
//         id="note"
//         placeholder="Add Note"
//         className="shadow-lg rounded-md shadow-black h-10 p-3 mb-6"
//         required
//       />
//       <button type="submit" className="bg-orange-500 font-bold text-white hover:bg-red-600 p-3 rounded-md">
//         SUBMIT
//       </button>
//     </form>
//   );
// }

export function AddTaskForm({ onSubmit }: { onSubmit: (data: FormData) => Promise<void> }) {
  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      await onSubmit(formData);
      form.reset();
    }}
      action={onSubmit} className="flex flex-col items-center">
      <input
        type="text"
        name="note"
        placeholder="Add a task"
        className="shadow-lg rounded-md shadow-black h-10 p-3 w-[100%] mb-6"
        required
      />
      <button type="submit" className="bg-orange-500 font-bold text-white hover:bg-red-600 p-3 rounded-md">
        Submit
      </button>
    </form>
  );
}
