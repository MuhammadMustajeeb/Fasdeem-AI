import { motion } from "framer-motion";
import { Star, Users, Share2, MessageCircle } from "lucide-react";

const enhancements = [
  {
    icon: <Star className="h-6 w-6 text-yellow-500" />,
    title: "🚀 Irresistible Offer",
    desc: "Launch-ready listings in seconds. Free Forever for Early Users — no catch, just speed.",
    color: "bg-yellow-50 border-yellow-200 text-yellow-900",
  },
  {
    icon: <MessageCircle className="h-6 w-6 text-indigo-500" />,
    title: "💬 Feedback = Fuel",
    desc: "We build with you — tell us what you need, and we’ll deliver it.",
    link: "https://forms.gle/your-feedback-form", // replace with real
    color: "bg-indigo-50 border-indigo-200 text-indigo-900",
  },
  {
    icon: <Users className="h-6 w-6 text-pink-500" />,
    title: "🧠 Built by Sellers, for Sellers",
    desc: "We’ve been in your shoes. Fasdeem is the tool we wish we had.",
    color: "bg-pink-50 border-pink-200 text-pink-900",
  },
  {
    icon: <Share2 className="h-6 w-6 text-green-500" />,
    title: "📤 Viral Sharing",
    desc: "Love Fasdeem? Share with friends and grow with us.",
    action: () => navigator.share?.({ title: "Fasdeem AI", url: window.location.href }),
    color: "bg-green-50 border-green-200 text-green-900",
  },
];

export default function EnhancementCards() {
  return (
    <section className="relative overflow-hidden py-24 px-4 sm:px-8 lg:px-16">
      {/* Gradient Glow */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-40 pointer-events-none">
        <div className="w-[800px] h-[800px] bg-gradient-to-br from-purple-500 via-indigo-500 to-transparent rounded-full mx-auto mt-[-200px]" />
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-center mb-14  drop-shadow">
        🚀 Why Fasdeem Will Keep You Coming Back
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto z-10 relative">
        {enhancements.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className={`rounded-2xl border p-6 shadow-lg backdrop-blur-md ${item.color}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-full bg-white shadow">{item.icon}</div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
            <p className="text-sm mb-4">{item.desc}</p>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                className="inline-block text-sm text-indigo-600 font-semibold hover:underline"
              >
                ✍️ Give Feedback
              </a>
            )}
            {item.action && (
              <button
                onClick={item.action}
                className="inline-block text-sm font-semibold text-green-600 hover:underline"
              >
                🔁 Share Now
              </button>
            )}
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12 text-sm text-gray-600">
        Want to save your best listings?{" "}
        <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">
          Sign in to save history
        </span>
      </div>
    </section>
  );
}
