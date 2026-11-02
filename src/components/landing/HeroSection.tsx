import { motion } from "framer-motion";
import { Lightbulb, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import heroAnimation from "@/assets/hero-animation.json";
const HeroSection = () => {
  const bulletPoints = [
    "Validates reaction time under live fire.",
    "Measures forensic accuracy, not just memory.",
    "Guarantees Day-1 operational readiness.",
  ];
  return (
    <header className="relative min-h-[100vh] lg:min-h-[90vh] bg-[#1a1033] overflow-hidden">
      {/* Background Effects - Dark purple gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[400px] lg:w-[800px] h-[400px] lg:h-[800px] bg-brand-purple/20 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-brand-purple/10 rounded-full blur-[150px]" />
        {/* Subtle vertical lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(134,89,238,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-8 lg:pb-0 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center h-full">
          {/* Left Content */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="pt-8 lg:pt-12"
          >
            {/* Badge */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.2,
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8559EE]/20 border border-[#8559EE]/40 mb-8"
            >
              <span className="text-xs font-semibold text-[#8559EE] uppercase tracking-wider">The New Standard</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-8xl font-black text-white leading-[1.1] mb-4 lg:mb-6">
              <motion.span
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.3,
                  duration: 0.6,
                }}
              >
                What is
              </motion.span>
              <br />
              <motion.span
                className="bg-gradient-to-r from-[#FF6BF5] via-[#C77DFF] to-[#9D4EDD] bg-clip-text text-transparent"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.4,
                  duration: 0.6,
                }}
              >
                PurpleTested
              </motion.span>
              <motion.span
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.5,
                  duration: 0.6,
                }}
              >
                ?
              </motion.span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl text-white/70 mb-6 lg:mb-8 max-w-xl leading-relaxed">
              <span className="text-white font-semibold">PurpleTested</span> is the benchmark when it comes to hiring
              cybersecurity professionals. It is the proof of performance, not just experience.
            </p>

            {/* Bullet Points with Lightbulb */}
            <ul className="space-y-2 lg:space-y-3 mb-6 lg:mb-10">
              {bulletPoints.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.6 + index * 0.1,
                    duration: 0.5,
                  }}
                  className="flex items-center gap-2 lg:gap-3 text-sm lg:text-base text-white/80"
                >
                  <div className="relative">
                    <Lightbulb className="w-5 h-5 text-[#FFD700] flex-shrink-0 relative z-10" fill="#FFD700" />
                    <div className="absolute inset-0 bg-[#FFD700] rounded-full blur-md opacity-60 animate-pulse" />
                  </div>
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="accent" size="xl" className="group" asChild>
                <a href="#contact">Get PurpleTested Talent</a>
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-white/30 text-white bg-transparent hover:bg-white/10 gap-2"
                asChild
              >
                <a href="#process">
                  <Play className="w-4 h-4" fill="currentColor" />
                  <span>See The Benchmark</span>
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.3,
            }}
            className="relative lg:absolute lg:bottom-0 lg:right-[-10%] xl:right-[-5%] flex justify-center lg:justify-end"
          >
            <Lottie animationData={heroAnimation} loop={true} className="w-auto h-[40vh] lg:h-[75vh] object-contain lg:mb-[-120px]" />
          </motion.div>
        </div>
      </div>
    </header>
  );
};
export default HeroSection;
