import React from 'react';

export default function Contact() {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg mb-6">
                We’d love to hear from you! Whether you have a question, feedback, or just want to get in touch, feel free to reach out to us using the form below or by sending us an email. Our team is here to help and will get back to you as soon as possible.
            </p>

            <form className="space-y-4"
                action="https://formspree.io/f/mpwavzga"
                method="POST">
                <div>
                    <label htmlFor="name" className="block text-lg font-medium mb-2">Name</label>
                    <input type="text" id="name" name="name"  placeholder="Your Name"
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
            </form>

            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Other Ways to Reach Us</h2>
                <p className="text-lg mb-4">
                    Email: <a href="mailto:contcact@example.com" className="text-blue-500 underline">contact@example.com</a>
                </p>
                <p className="text-lg mb-4">
                    Phone: <a href="tel:+1234567890" className="text-blue-500 underline">+1 (234) 567-890</a>
                </p>
                <p className="text-lg">
                    Address: 1234 Example Street, Suite 100, City, Country
                </p>
            </div>
        </div>
    );
}
