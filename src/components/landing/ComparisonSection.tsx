import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import teamProfiles from "@/assets/team-profiles.png";
const ComparisonSection = () => {
  const comparisonData = [
    {
      feature: "Screening Method",
      standard: "Keyword Matching / CV",
      purple: "Live Cyber Range Simulation",
    },
    {
      feature: "Stress Testing",
      standard: null,
      purple: "High-Pressure Scenarios",
    },
    {
      feature: "Day 1 Readiness",
      standard: "Unknown Risk",
      purple: "Guaranteed",
    },
  ];
  return (
    <section id="comparison" className="relative overflow-hidden bg-background py-16">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Team Profiles */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-10">
            Why Hiring Managers Choose PurpleTested
          </h2>
          <motion.img
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.2,
            }}
            src={teamProfiles}
            alt="Cybersecurity professionals - Network Security Engineer, Cybersecurity Analyst, Cloud Security Engineer"
            className="w-full max-w-4xl mx-auto mb-[-50px]"
          />
        </motion.div>
        {/* Mobile Stacked Cards */}
        <div className="md:hidden space-y-4">
          {comparisonData.map((row, index) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl border border-border bg-card overflow-hidden shadow-lg"
            >
              <div className="bg-[#DFDFE2] p-4 border-b border-border">
                <h3 className="font-semibold text-foreground text-center">{row.feature}</h3>
              </div>
              <div className="divide-y divide-border">
                <div className="p-4 flex items-center justify-between">
                  <span className="text-[#F20000] font-medium text-sm">Standard Recruitment</span>
                  <span className="text-muted-foreground text-sm text-right">
                    {row.standard === null ? (
                      <span className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center inline-flex">
                        <X className="w-4 h-4 text-destructive" />
                      </span>
                    ) : (
                      row.standard
                    )}
                  </span>
                </div>
                <div className="p-4 flex items-center justify-between bg-primary/5">
                  <span className="text-primary font-medium text-sm flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    PurpleTested
                  </span>
                  <span className="text-primary font-semibold text-sm text-right">{row.purple}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop Comparison Table */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="hidden md:block overflow-hidden rounded-2xl border border-border shadow-2xl bg-card"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-6 bg-[#DFDFE2] text-foreground font-semibold border-b border-border border-r border-r-[#9CA3AF]">
                    Feature
                  </th>
                  <th className="p-6 bg-[#DFDFE2] font-semibold border-b border-border text-center text-[#F20000]">
                    Standard Recruitment
                  </th>
                  <th className="p-6 bg-primary text-primary-foreground font-bold border-b border-primary text-center">
                    <span className="flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" />
                      PurpleTested
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comparisonData.map((row, index) => (
                  <motion.tr
                    key={row.feature}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    className="hover:bg-secondary/30 transition-colors"
                  >
                    <td className="p-6 font-medium text-foreground border-r border-r-[#9CA3AF]">{row.feature}</td>
                    <td className="p-6 text-center text-muted-foreground">
                      {row.standard === null ? (
                        <div className="flex items-center justify-center">
                          <span className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center">
                            <X className="w-4 h-4 text-destructive" />
                          </span>
                        </div>
                      ) : (
                        row.standard
                      )}
                    </td>
                    <td className="p-6 text-center bg-primary/5">
                      <div className="flex items-center justify-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-accent" />
                        </span>
                        <span className="text-primary font-semibold">{row.purple}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default ComparisonSection;
