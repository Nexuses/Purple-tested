import { motion } from "framer-motion";

import paladionLogo from "@/assets/logos/paladion.png";
import fordLogo from "@/assets/logos/ford.png";
import boschLogo from "@/assets/logos/bosch.png";
import capgeminiLogo from "@/assets/logos/capgemini.png";
import wiproLogo from "@/assets/logos/wipro.png";
import bharatElectronicsLogo from "@/assets/logos/bharat-electronics.png";
import kpmgLogo from "@/assets/logos/kpmg.png";

const TrustedBySection = () => {
  const trustedByLogos = [
    { name: "Paladion", logo: paladionLogo },
    { name: "Ford", logo: fordLogo },
    { name: "Bosch", logo: boschLogo },
    { name: "Capgemini", logo: capgeminiLogo },
    { name: "Wipro", logo: wiproLogo },
    { name: "Bharat Electronics", logo: bharatElectronicsLogo },
    { name: "KPMG", logo: kpmgLogo },
  ];

  return (
    <section className="py-12 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-semibold text-muted-foreground mb-8 uppercase tracking-widest">
            Trusted by security teams at
          </p>
          <div className="relative overflow-hidden">
            {/* Gradient masks for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

            {/* Conveyor belt container */}
            <div className="flex animate-marquee">
              {/* First set of logos */}
              <div className="flex items-center gap-12 md:gap-16 px-8 shrink-0">
                {trustedByLogos.map((company) => (
                <div
                    key={company.name}
                    className="h-10 w-auto flex items-center justify-center"
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-8 md:h-10 w-auto object-contain transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
              {/* Duplicate set for seamless loop */}
              <div className="flex items-center gap-12 md:gap-16 px-8 shrink-0">
                {trustedByLogos.map((company) => (
                <div
                    key={`${company.name}-duplicate`}
                    className="h-10 w-auto flex items-center justify-center"
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-8 md:h-10 w-auto object-contain transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
