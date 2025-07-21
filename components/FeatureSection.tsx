import { CheckCircle, Sparkles, Share2 } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-purple-500" />,
      title: "Instant Clarity",
      description: "No fluff — just copy that sells in your tone & language.",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      title: "Ready to Share",
      description: "Export to WhatsApp, Etsy, Shopify, or save as CSV.",
    },
    {
      icon: <Share2 className="w-6 h-6 text-blue-500" />,
      title: "Grows With You",
      description: "Save, rephrase, and share anytime. No logins needed.",
    },
  ];

  return (
    <section className="py-20 bg-[#0f0f0f] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Built to Sell, Not Just Write
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
