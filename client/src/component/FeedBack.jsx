// FeedbackSection.jsx
import React from "react";

const feedbacks = [
  { name: "John Doe", role: "Buyer", comment: "Great experience!", rating: 5 },
  { name: "Jane Smith", role: "Seller", comment: "Smooth transaction.", rating: 4 },
  { name: "Alice Johnson", role: "Buyer", comment: "Very helpful seller.", rating: 5 },
  { name: "Bob Brown", role: "Seller", comment: "Fast payment!", rating: 4 },
  { name: "John Doe", role: "Buyer", comment: "Great experience!", rating: 5 },
  { name: "Jane Smith", role: "Seller", comment: "Smooth transaction.", rating: 4 },
  { name: "Alice Johnson", role: "Buyer", comment: "Very helpful seller.", rating: 5 },
  { name: "Bob Brown", role: "Seller", comment: "Fast payment!", rating: 4 },
];

export default function FeedbackSection() {
  const scrollingCards = [...feedbacks, ...feedbacks]; // double for infinite scroll

  return (
    <section className="py-12 bg-gray-100">
      <div className="w-full">
        <h2 className="text-3xl font-bold text-center mb-8">User Feedback</h2>

        <div className="overflow-hidden w-full">
          <div className="flex animate-scroll w-max gap-6"> {/* gap between cards */}
            {scrollingCards.map((fb, idx) => (
              <div
                key={idx}
                className="min-w-[250px] bg-white p-6 rounded-xl shadow-md flex-shrink-0"
              >
                <h3 className="text-xl font-semibold">{fb.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{fb.role}</p>
                <p className="text-gray-700 mb-4">{fb.comment}</p>
                <div className="flex">
                  {Array(fb.rating)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); } /* half because we doubled cards */
          }

          .animate-scroll {
            display: flex;
            animation: scroll 30s linear infinite;
          }
        `}
      </style>
    </section>
  );
}
