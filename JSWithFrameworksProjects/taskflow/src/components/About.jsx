import React from "react";

const About = () => {
  return (
    <div className="container my-5 p-4 shadow rounded-4 bg-theme text-theme">
      <h2 className="text-center mb-4">About This Project</h2>

      <p className="lead">
        <strong>TaskFlow</strong> is a minimal yet powerful Todo management app
        designed for productivity, prioritization, and clean user experience.
        Built with React.js, it offers a smooth interface, live edit, sorting,
        search, and theme toggle.
      </p>

      <hr className="my-4" />

      <h4 className="mt-4">About the Creator</h4>
      <p>
        Hi, I'm <strong>Aaditya</strong>, a passionate full-stack developer in
        the making. I enjoy building intuitive web applications and continually
        improving my skills in development, design, and modern tech stacks.
      </p>

      <h5 className="mt-4">Connect With Me</h5>
      <div className="d-flex flex-wrap gap-3 mt-3">
        <a
          href="https://github.com/aaditya-dubey09"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-dark rounded-5 d-flex align-items-center gap-2 text-theme"
        >
          <i className="bi bi-github text-theme"></i> GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/aadityadubey"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-primary rounded-5 d-flex align-items-center gap-2"
        >
          <i className="bi bi-linkedin"></i> LinkedIn
        </a>
        <a
          href="https://www.instagram.com/cosmophile946"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-danger rounded-5 d-flex align-items-center gap-2"
        >
          <i className="bi bi-instagram"></i> Instagram
        </a>
        <a
          href="https://twitter.com/itsaadi_09"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-info rounded-5 d-flex align-items-center gap-2"
        >
          <i className="bi bi-twitter-x"></i> Twitter/X
        </a>
      </div>
    </div>
  );
};

export default About;