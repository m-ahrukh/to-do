'use server'

export default async function MainPage() {
  return (
    <div className={`min-h-screen flex flex-col itmes-center justify-center`}>
      <header className='w-full p-4 mt-8 bg-teal-100 text-gray-800 text-center'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold'>Welcome to the To-Do Application</h1>
        <p className='text-md sm:text-lg lg:text-xl mt-2'>
          Your all-in-one solution to track, organize, and prioritize your daily tasks.
        </p>
      </header>

      <main className='flex flex-col items-center justify-center p-6 sm:p-10 text-center w-full'>
        
        <h2 className='text-2xl mb-4'>Organize your tasks and boost productivity</h2>
        <p className='text-lg mb-8 max-w-2xl'>
          Our To-Do application helps you manage your tasks efficiently with an easy-to-use interface. 
          You can switch between dark and light themes based on your preference, and stay productive 
          whether you&apos;re on the go or at your desk.
        </p>

        <div className='max-w-3xl mb-8'>
          <h3 className='text-lg sm:text-xl font-bold mb-4'>Key Features:</h3>
          <ul className='text-sm sm:text-lg list-disc list-inside'>
            <li className='mb-2'>💡 **Create, edit, and delete tasks**: Add new tasks, modify existing ones, or remove completed items.</li>
            <li className='mb-2'>📅 **Task prioritization and categorization**: Organize tasks by categories or priority levels to ensure you focus on what matters most.</li>
            <li className='mb-2'>🌗 **Dark and light theme support**: Choose between themes that suit your working environment and reduce eye strain.</li>
            <li className='mb-2'>🔍 **Search and filter options**: Quickly find specific tasks using the search and filter features.</li>
            <li className='mb-2'>📊 **Task completion tracking**: Visualize your progress and track task completion rates over time.</li>
            <li className='mb-2'>🔒 **Secure authentication**: Use secure sign-in and sign-up methods to protect your data.</li>
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a href="/signin" className='p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-4'>Sign In</a>
          <a href="/signup" className='p-3 bg-green-500 text-white rounded-md hover:bg-green-600 mr-4'>Sign Up</a>
        </div>
      </main>

    </div>
  );
}