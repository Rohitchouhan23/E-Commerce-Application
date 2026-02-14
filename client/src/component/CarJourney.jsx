import { motion } from "framer-motion";
import Step1 from "../assets/search.png";
import Step2 from "../assets/chat.png";
import Step3 from "../assets/deal.png";

function CarJourney() {
  const steps = [
    {
      title: "Search or List Your Car",
      image: Step1,
    },
    {
      title: "Connect with Verified Users",
      image: Step2,
    },
    {
      title: "Close the Deal Securely",
      image: Step3,
    },
  ];

  return (
    <section className="lg:py-36 sm:py-36 py-2 bg-gradient-to-b pb-50 from-blue-50 via-white to-white">

      {/* Heading */}
      <div className="text-center mb-20 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          Start Your Car Journey in 3 Easy Steps
        </motion.h2>

        <p className="text-gray-500 mt-4 text-lg">
          Simple, secure and fast process for buyers & sellers
        </p>
      </div>

      {/* Steps */}
      <div className="max-w-6xl mx-auto px-6 grid gap-16 md:grid-cols-3 text-center my-14">

        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -15 }}
            className="group cursor-pointer"
          >
            {/* Image */}
            <motion.img
              src={step.image}
              alt={step.title}
              className="mx-auto w-28 md:w-32 transition duration-500 group-hover:scale-110 group-hover:rotate-3"
            />

            {/* Title */}
            <h3 className="mt-6 text-xl md:text-2xl font-semibold text-gray-800 group-hover:text-blue-600 transition duration-300">
              {step.title}
            </h3>

            {/* Animated underline */}
            <div className="mt-3 h-1 w-0 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto group-hover:w-16 transition-all duration-500 rounded-full"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default CarJourney;