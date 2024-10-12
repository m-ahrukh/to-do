//responsiveness pending
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
    <form className="space-y-4"
      onSubmit={handleSubmit}
    >
      {submitted ?
        (<p className="text-green-600">Thank you! Your message has been sent.</p>) :
        (<>
          <div>
            <label htmlFor="name" className="block text-lg font-medium mb-2">Name</label>
            <input type="text" id="name" name="name" placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
            <input type="email" id="email" name="email" placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-medium mb-2">Message</label>
            <textarea id="message" name="message" rows={5} placeholder="Your Message"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Message
          </button>
        </>
        )}
    </form>

  );
}
