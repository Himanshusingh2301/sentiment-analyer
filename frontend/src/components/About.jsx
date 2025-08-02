import React from 'react';

const About = () => {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/bg.png)' }}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center px-4">
        <div className="bg-white/10 border border-white/20 rounded-2xl shadow-xl p-8 max-w-4xl text-white w-full h-[90vh] flex flex-col hover:translate-y-2 ease duration-500">
          
          {/* Fixed heading */}
          <h1 className="text-4xl font-bold mb-6 text-indigo-300 shrink-0">About FeedbackFilter</h1>
          
          {/* Scrollable content */}
          <div className="flex-1 min-h-0 overflow-y-auto pr-2.5 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            <p className="text-lg mb-4">
              Hi, I’m <span className="font-semibold text-indigo-200">Himanshu Singh</span>, the creator of <span className="font-semibold text-indigo-200">FeedbackFilter</span> — a powerful sentiment analysis web app designed to help businesses understand their customer reviews.
            </p>

            <p className="text-lg mb-4">
              This project combines <span className="font-semibold text-yellow-200">Machine Learning</span> and <span className="font-semibold text-yellow-200">Full Stack Development</span>. I used a publicly available dataset from
              <a href="https://www.kaggle.com/" className="text-blue-400 underline ml-1" target="_blank" rel="noopener noreferrer">Kaggle</a> to train a sentiment classification model.
            </p>

            <p className="text-lg mb-4">
              The ML model uses <span className="text-green-300 font-semibold">TF-IDF vectorization</span> to transform the textual data and <span className="text-green-300 font-semibold">Logistic Regression</span> to predict whether a customer review is <span className="text-green-400 font-semibold">positive</span> or <span className="text-red-400 font-semibold">negative</span>.
            </p>

            <p className="text-lg mb-4">
              I built the backend using <span className="text-orange-300 font-semibold">Python Flask</span>, and developed the frontend with <span className="text-cyan-300 font-semibold">Vite</span> and <span className="text-cyan-300 font-semibold">Tailwind CSS</span> for a responsive, modern UI.
            </p>

            <p className="text-lg mb-4">
              For secure and scalable user authentication, I integrated <span className="text-pink-300 font-semibold">Clerk</span>, which supports email login and modern auth methods.
            </p>

            <p className="text-lg">
              <span className="font-medium text-indigo-200">FeedbackFilter</span> represents my passion for building real-world AI solutions that are not only functional but user-friendly and visually appealing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
