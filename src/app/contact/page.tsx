import React from 'react';
import { ContactForm } from './contactForm';

export default function Contact() {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg mb-6">
                We&apos;d love to hear from you! Whether you have a question, 
                feedback, or just want to get in touch, feel free to reach out 
                to us using the form below or by sending us an email. Our team 
                is here to help and will get back to you as soon as possible.
            </p>
            <ContactForm />

            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Other Ways to Reach Us</h2>
                <p className="text-lg mb-4">
                    Email: <a href="mailto:mahbar690@gmail.com" className="text-blue-500 underline">mahbar690@gmail.com</a>
                </p>
                <p className="text-lg mb-4">
                    Phone: <a href="tel:+1234567890" className="text-blue-500 underline">+92 3221234567</a>
                </p>
                <p className="text-lg">
                    Address: Chiniot, Punjab, Pakistan
                </p>
            </div>
        </div>
    );
}
