import React from 'react';
import {
  CheckCircle,
  Upload,
  Download,
  Edit3,
  PlusCircle,
  MinusCircle,
  FileText
} from 'lucide-react';

const features = [
  {
    icon: <CheckCircle className="text-green-400 w-6 h-6" />,
    title: "Real-Time Sentiment Analysis",
    description: "Predicts whether a customer review is Positive or Negative as the user types in real time.",
  },
  {
    icon: <Upload className="text-yellow-300 w-6 h-6" />,
    title: "Bulk Review Upload",
    description: "Upload entire review datasets using CSV or Excel files for batch processing.",
  },
  {
    icon: <CheckCircle className="text-cyan-300 w-6 h-6" />,
    title: "Batch Prediction",
    description: "Every uploaded review is can be analyzed and tagged with predicted sentiment.",
  },
  {
    icon: <Download className="text-pink-400 w-6 h-6" />,
    title: "Multi-Format Export",
    description: "Download your updated reviews in CSV, Excel, or PDF format after predictions.",
  },
  {
    icon: <Edit3 className="text-indigo-300 w-6 h-6" />,
    title: "Review Editing & Management",
    description: "Select and edit reviews, remove them with a minus button, or add new ones with a plus button.",
  },
  {
    icon: <FileText className="text-teal-300 w-6 h-6" />,
    title: "Smart TextArea Control",
    description: "Textarea remains disabled unless a review is selected. Ensures safe and intentional editing.",
  },
  {
    icon: <PlusCircle className="text-green-300 w-6 h-6" />,
    title: "Append New Reviews",
    description: "Easily add new reviews to the uploaded file, predict results, and export the updated file again.",
  },
];

const Features = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(/bg.png)' }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6 max-w-5xl w-full h-[90vh] overflow-hidden hover:translate-y-2 ease duration-500">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-300 mb-6">
            Key Features of FeedbackFilter
          </h1>

          <div className="overflow-y-scroll scrollbar-thin  scrollbar-thumb-slate-600 scrollbar-track-transparent pr-2 h-[70vh] space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div>{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-indigo-200">{feature.title}</h3>
                  <p className="text-gray-200">{feature.description}</p>
                </div>
              </div>
            ))}
          <p className="mt-6 text-center text-gray-300 text-base">
            These features make <span className="text-indigo-200 font-semibold">FeedbackFilter</span> a complete tool for real-time and bulk review analysis.
          </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Features;
