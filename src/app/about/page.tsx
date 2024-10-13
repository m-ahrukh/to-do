export default function About() {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center sm:text-left">About Us</h1>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 text-justify">
        Welcome to our todo application! We are a team of passionate
        developers dedicated to creating powerful and intuitive software
        solutions. Our mission is to provide users with tools that make
        their lives easier, more organized, and more productive.
      </p>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-center sm:text-left">Our Story</h2>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 text-justify">
        Our journey began with a simple idea: to build an application
        that combines functionality with ease of use. Over the years,
        we have grown into a team of talented individuals, each bringing
        unique skills and perspectives to the table. Together, we strive
        to push the boundaries of what&apos;s possible in software development.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 text-justify">
        We envision a future where technology seamlessly integrates
        into our daily lives, empowering people to achieve their
        goals effortlessly. Our goal is to continue innovating and
        improving, so our users can focus on what truly matters.
      </p>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-center sm:text-left">Contact Us</h2>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-justify">
        Have questions or feedback? We&apos;d love to hear from you!
        Feel free to reach out to us at
        <a href="mailto:mahbar690@gmail.com" className="text-blue-500 underline ml-1">mahbar690@gmail.com</a>.
      </p>
    </div>
  );
}
