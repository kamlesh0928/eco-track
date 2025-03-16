import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const SmallActionsSection = () => {
  const actions = [
    { title: "Plant a Tree", desc: "Each tree absorbs up to 22 kg of CO₂ annually, improving air quality.", icon: "🌳" },
    { title: "Use Public Transport", desc: "Cuts individual CO₂ emissions by 50% per trip compared to driving.", icon: "🚆" },
    { title: "Reusable Bottle", desc: "Prevents 83g of plastic waste per use, reducing landfill impact.", icon: "🚰" },
    { title: "Compost Food Scraps", desc: "Lowers methane emissions by diverting waste from landfills.", icon: "🍃" },
    { title: "Switch to LED Bulbs", desc: "Consumes 80% less energy than traditional bulbs, saving power.", icon: "💡" },
    { title: "Cloth Bags", desc: "Prevents over 150 plastic bags from polluting the environment yearly.", icon: "🛍️" },
    { title: "Reduce Meat Consumption", desc: "Lowers your carbon footprint by up to 2.5 tons annually.", icon: "🥗" },
    { title: "Unplug Devices", desc: "Saves up to 10% of household energy by avoiding phantom power.", icon: "🔌" },
    { title: "Cycle Short Distances", desc: "Eliminates emissions entirely for trips under 5 km.", icon: "🚲" },
  ];

  return (
    <section id="impact" className="py-24 px-6 text-center">
      <div className="container mx-auto px-6 text-center">
        <motion.h2 {...fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
          Small Actions, Big Impact
        </motion.h2>
        <motion.p {...fadeInUp} className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Simple changes in your daily routine can lead to massive environmental benefits.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {actions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-card/50 dark:bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <span className="text-4xl">{action.icon}</span>
              <h3 className="text-xl font-semibold mt-2">{action.title}</h3>
              <p className="mt-2 text-muted-foreground dark:text-gray-300">{action.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmallActionsSection;
