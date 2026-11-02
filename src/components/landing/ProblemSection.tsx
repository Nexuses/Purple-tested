import { motion, useInView } from "framer-motion";
import { FileText, AlertTriangle } from "lucide-react";
import { useRef, useState, useEffect } from "react";

import moneyIcon from "@/assets/icons/money.png";
import productivityIcon from "@/assets/icons/productivity.png";
import turnoverIcon from "@/assets/icons/turnover.png";

const AnimatedCounter = ({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

const ProblemSection = () => {
  const comparisonData = [
    { resume: "20 years in SOC", reality: "Struggles with parsers" },
    { resume: "15 years  network Security", reality: "Struggles with ACL tuning" },
    { resume: "12 Years in Threat Hunting...", reality: "Struggles with Sigma rules" },
    { resume: "18 years in Incident Response...", reality: "Struggles with Memory Forensics" },
    { resume: "20 years in Pentesting...", reality: "Struggles with Privilege Escalation" },
    { resume: "15 years in as Security Engineer...", reality: "Struggles with Log Normalization" },
  ];

  const stats = [
    { value: 17000, prefix: "$", suffix: "", label: "AVERAGE COST OF MIS-HIRE", icon: moneyIcon },
    { value: 30, prefix: "", suffix: "%", label: "PRODUCTIVITY DROP", icon: productivityIcon },
    { value: 80, prefix: "", suffix: "%", label: "TURNOVER CAUSE", icon: turnoverIcon },
  ];

  return (
    <section className="py-12 lg:py-20 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 lg:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 lg:mb-3">The Gap Between CV and Reality</h2>
          <p className="text-muted-foreground text-sm lg:text-base px-4">
            Traditional hiring relies on keywords. We test for capability.
          </p>
        </motion.div>

        {/* Column Headers - Hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hidden md:grid grid-cols-2 gap-4 mb-4"
        >
          <div className="flex items-center justify-center gap-2 text-muted-foreground font-medium">
            <FileText className="w-5 h-5" />
            <span>On The Resume</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-destructive font-medium">
            <AlertTriangle className="w-5 h-5" />
            <span>The Reality</span>
          </div>
        </motion.div>

        {/* Comparison Rows */}
        <div className="space-y-3 lg:space-y-3">
          {comparisonData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative flex flex-col md:flex-row md:items-center gap-2 md:gap-0"
            >
              {/* Resume Side */}
              <div className="bg-slate-100 rounded-full py-2.5 md:py-3.5 px-4 md:px-6 text-foreground text-left text-sm md:text-base md:flex-1 md:pr-[45%]">
                {item.resume}
              </div>
              
              {/* Reality Side - Stacked on mobile, Overlapping on desktop */}
              <div className="md:absolute md:right-0 md:w-[55%] bg-gradient-to-r from-[#DC2626] via-[#B91C1C] to-[#7C3AED] rounded-full py-2.5 md:py-3.5 px-4 md:px-5 flex items-center gap-2 md:gap-3 shadow-lg">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <AlertTriangle className="w-3 h-3 md:w-4 md:h-4 text-destructive" />
                </div>
                <span className="text-white font-semibold text-sm md:text-base">{item.reality}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-10 lg:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="border-2 border-[#DC2626] rounded-xl lg:rounded-2xl py-3 lg:py-4 px-4 lg:px-5 flex flex-col items-center justify-center bg-white"
              >
                <img src={stat.icon} alt={stat.label} className="w-8 h-8 lg:w-10 lg:h-10 mb-2" />
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#DC2626] mb-1 lg:mb-2">
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] lg:text-xs text-muted-foreground uppercase tracking-wider text-center">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
