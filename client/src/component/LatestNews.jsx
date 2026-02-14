import { motion } from "framer-motion";

function LatestNews() {
  return (
    <section className="relative overflow-hidden lg:py-24 lg:pt-64  sm:py-24 sm:pt-64 py-2 pt-0 bg-gradient-to-b from-white via-blue-50 to-white">

      {/* Background Decorative Blur */}
      <div className="absolute top-0  left-0 w-72 h-72 bg-blue-200 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-200 opacity-30 rounded-full blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto px-6 pt-16 text-center">

        {/* Small Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-blue-600 font-semibold tracking-wider uppercase text-sm"
        >
          News & Blogs
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-4 text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          Latest from Our Auto World
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-6 text-gray-600 text-lg md:text-xl leading-relaxed"
        >
          Explore Industry News, Pricing Trends & Expert Car Guides
          to stay ahead in your buying & selling journey.
        </motion.p>

        {/* Optional Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            Explore Articles
          </button>
        </motion.div>

      </div>
    </section>
  );
}

export default LatestNews;