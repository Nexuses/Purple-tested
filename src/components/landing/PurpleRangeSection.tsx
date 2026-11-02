import { useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Users, Network, Play } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import dashboardGif from "@/assets/purple-dashboard.gif";

const VIDEO_URL = "https://22527425.fs1.hubspotusercontent-na2.net/hubfs/22527425/PurpleSynapz/Cyberrange%20Introductory%20video%20(3).mp4";

const PurpleRangeSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const features = [
    {
      icon: Monitor,
      title: "Realistic Simulations",
    },
    {
      icon: Users,
      title: "Customizable Training",
    },
    {
      icon: Network,
      title: "Scalable & Flexible",
    },
  ];

  return (
    <section className="pt-24 pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - GIF Thumbnail with Play Button */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div 
              className="relative overflow-hidden rounded-xl cursor-pointer group"
              onClick={() => setIsVideoOpen(true)}
            >
              {/* GIF Thumbnail */}
              <img
                src={dashboardGif}
                alt="Purple Range Dashboard"
                className="w-full h-auto"
              />
              
              
              {/* YouTube-style Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-14 bg-red-600 rounded-xl flex items-center justify-center group-hover:bg-red-700 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-6">
              Strengthen Your Cyber Defenses{" "}
              <br />
              with <span className="text-brand-purple">Purple Range™</span>
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              <span className="font-semibold text-brand-dark">Purple Range Platform</span> is a cutting-edge solution that empowers organizations to strengthen their cybersecurity defenses through realistic, hands-on simulations and training. By replicating real-world cyber threats and attack scenarios, it provides teams with the opportunity to hone their skills in both offensive and defensive strategies.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-4 lg:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex flex-col items-center text-center px-4 py-3 bg-brand-purple/5 rounded-xl border border-brand-purple/10"
                >
                  <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-3">
                    <feature.icon className="w-6 h-6 text-brand-purple" />
                  </div>
                  <span className="text-sm font-semibold text-brand-dark">{feature.title}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Popup Dialog */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black border-none overflow-hidden">
          <video
            src={VIDEO_URL}
            controls
            autoPlay
            className="w-full h-auto"
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PurpleRangeSection;
