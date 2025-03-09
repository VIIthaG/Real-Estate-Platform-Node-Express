import React from "react";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto p-5 text-amber-100 text-sm mt-8 ml-8">
      <div className="">
        <h1 className="font-bold text-amber-100 ">
          <span className="text-white text-4xl">Welcome!</span>{" "}
          <span className="text-3xl"> What brings you here?</span>
        </h1>
      </div>
      <br />

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-stone-600 mb-3">
          Our Mission
        </h2>
        <p>
          At <strong>Kohi Estate</strong>, we are committed to revolutionizing
          the real estate experience by making property search, listing, and
          management effortless and transparent. Our platform is designed to
          connect buyers, sellers, and agents in a seamless and efficient
          manner.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-stone-600 mb-3">
          Our Features
        </h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Easy Property Search:</strong> Explore a wide range of
            properties with advanced filters.
          </li>
          <li>
            <strong>Listing Management:</strong> Easily list and manage your
            properties with complete control.
          </li>
          <li>
            <strong>Secure Authentication:</strong> Fast and secure sign-in
            using Google OAuth.
          </li>
          <li>
            <strong>Real-Time Updates:</strong> Get instant updates without
            refreshing your page.
          </li>
          <li>
            <strong>Responsive Design:</strong> Access the platform from any
            device seamlessly.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-stone-600 mb-3">
          Meet the Developer
        </h2>
        <p>
          <strong>Kohi Estate</strong> was passionately developed and designed
          by <strong>VIIthaG</strong>, a dedicated full-stack developer focused
          on creating modern and user-friendly web applications.
        </p>
        <p className="mt-3">
          <strong>Developer Info:</strong>
        </p>
        <ul className="list-disc list-inside">
          <li>
            <strong>Name:</strong> VIIthaG
          </li>
          <li>
            <strong>Expertise:</strong> React.js, Node.js, MongoDB, Express.js,
            Firebase, Supabase, Redux, Tailwind CSS
          </li>
          <li>
            <strong>Goal:</strong> Build impactful and seamless platforms for
            real-world solutions.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-stone-600 mb-3">
          Contact Us
        </h2>
        <p>
          If you have any questions or feedback, feel free to reach out to us:
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:vllthag@gmail.com" className="text-amber-800 ">
            vllthag@gmail.com
          </a>
        </p>
        <p>
          <strong>GitHub:</strong>{" "}
          <a href="https://github.com/VIIthaG" className="text-amber-800 ">
            github.com/VIIthaG
          </a>
        </p>
      </section>
      <br />
      <br />
    </div>
  );
}
