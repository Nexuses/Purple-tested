import { motion } from "framer-motion";
import splunkLogo from "@/assets/logos/splunk.png";
import awsLogo from "@/assets/logos/aws.png";
import crowdstrikeLogo from "@/assets/logos/crowdstrike.png";
import wiresharkLogo from "@/assets/logos/wireshark.png";
import metasploitLogo from "@/assets/logos/metasploit.png";

const TechStackSection = () => {
  const techStacks = [
    { logo: splunkLogo, label: "Splunk" },
    { logo: awsLogo, label: "AWS" },
    { logo: crowdstrikeLogo, label: "CrowdStrike" },
    { logo: wiresharkLogo, label: "Wireshark" },
    { logo: metasploitLogo, label: "Metasploit" },
  ];

  // Duplicate for seamless loop
  const duplicatedStacks = [...techStacks, ...techStacks];

  return (
    <section className="py-12 bg-gray-50/50 border-y border-border/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm sm:text-base text-muted-foreground uppercase tracking-[0.2em] text-center mb-10 font-bold"
        >
          Candidates Tested on Industry Standard Stacks
        </motion.p>
        
        {/* Conveyor belt container */}
        <div className="relative">
          {/* Left blur/fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-gray-50/50 to-transparent z-10 pointer-events-none" />
          
          {/* Right blur/fade */}
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-gray-50/50 to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling container */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-16 sm:gap-20 md:gap-24"
              animate={{
                x: [0, -50 * techStacks.length * 4],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {duplicatedStacks.map((tech, index) => (
                <div
                  key={`${tech.label}-${index}`}
                  className="flex items-center justify-center flex-shrink-0"
                >
                  <img 
                    src={tech.logo} 
                    alt={tech.label} 
                    className="h-8 sm:h-10 w-auto object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
