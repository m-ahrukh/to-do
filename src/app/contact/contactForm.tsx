'use client';
import { useState } from "react";

export function ContactForm() {

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form)

    try {
      await fetch('https://formspree.io/f/mpwavzga', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      form.reset();
      setSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };


  return (
    <form className="space-y-6 md:space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      {submitted ?
        (
          <p className="text-green-600 text-center font-semibold">Thank you! Your message has been sent.</p>
        ) : (
          <>
            <div>
              <label htmlFor="name" className="block text-lg md:text-xl font-medium mb-2 text-gray-800 dark:text-white">Name</label>
              <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="Your Name"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg md:text-xl font-medium mb-2 text-gray-800 dark:text-white">Email</label>
              <input type="email" id="email" name="email" placeholder="Your Email"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-lg md:text-xl font-medium mb-2 text-gray-800 dark:text-white">Message</label>
              <textarea id="message" name="message" rows={5} placeholder="Your Message"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              ></textarea>
            </div>

            <button type="submit"
              className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </>
        )}
    </form>
  );
}
