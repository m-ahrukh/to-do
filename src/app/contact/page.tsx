import React from 'react';
import { ContactForm } from './contactForm';

export default function Contact() {
  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800 dark:text-white">Contact Us</h1>
      <p className="text-base sm:text-lg mb-6 text-gray-600 dark:text-gray-300">
        We&apos;d love to hear from you! Whether you have a question,
        feedback, or just want to get in touch, feel free to reach out
        to us using the form below or by sending us an email. Our team
        is here to help and will get back to you as soon as possible.
      </p>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <ContactForm />
      </div>

      <div className="mt-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Other Ways to Reach Us</h2>
        <p className="text-base sm:text-lg mb-4 text-gray-600 dark:text-gray-300">
          Email: <a href="mailto:mahbar690@gmail.com" className="text-blue-500 underline">mahbar690@gmail.com</a>
        </p>
        <p className="text-base sm:text-lg mb-4 text-gray-600 dark:text-gray-300">
          Phone: <a href="tel:+1234567890" className="text-blue-500 underline">+92 3221234567</a>
        </p>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
          Address: Chiniot, Punjab, Pakistan
        </p>
      </div>
    </div>
  );
}
