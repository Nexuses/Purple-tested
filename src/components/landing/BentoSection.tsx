import { motion } from "framer-motion";
import { GitBranch, BarChart3, Check, Shield, Monitor, Lightbulb } from "lucide-react";
import participantsChart from "@/assets/participants-performance-chart.png";
import purpleRangeLabDashboard from "@/assets/purple-range-lab-dashboard.png";
import purpleTestedBadge from "@/assets/purple-tested-badge.png";
import hiringVisionPerson from "@/assets/hiring-vision-person.png";
const GlowingBulb = () => <div className="relative inline-flex items-center justify-center mr-2">
    <div className="absolute inset-0 bg-[#FFD700] rounded-full blur-md opacity-60 animate-pulse" />
    <Lightbulb className="w-5 h-5 text-[#FFD700] relative z-10" fill="#FFD700" />
  </div>;
const BentoSection = () => {
  return <section id="standard" className="py-12 lg:py-24 bg-[#1a1033]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center mb-8 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 lg:mb-4">
            The <span className="text-brand-green">PurpleTested</span> Standard
          </h2>
          <p className="text-white/80 text-sm lg:text-lg px-4">
            Validated under hostile conditions. Approved for your environment.
          </p>
        </motion.div>

        {/* Bento Grid - Proper 3x2 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 md:auto-rows-fr">
          {/* Card 1 - Rigorous Standards */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.1
        }} className="group glass-card-dark rounded-2xl hover:border-[#FFD700] transition-all duration-300 flex flex-col overflow-hidden">
            <div className="flex flex-col h-full p-5 lg:p-8 pb-0">
              
              <h3 className="text-lg lg:text-xl font-bold text-white mb-2 flex items-center"><GlowingBulb />Rigorous Standards</h3>
              <p className="text-white/80 text-xs lg:text-sm mb-4 lg:mb-6">Only the top performers make it through</p>
              <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-4 lg:mb-6">
                <div className="text-center p-3 lg:p-4 bg-brand-dark/50 rounded-xl">
                  <div className="text-2xl lg:text-3xl font-bold text-brand-green mb-1">15%</div>
                  <div className="text-xs text-white/80">Pass Rate</div>
                </div>
                <div className="text-center p-3 lg:p-4 bg-brand-dark/50 rounded-xl">
                  <div className="text-2xl lg:text-3xl font-bold text-brand-purple-light mb-1">4hr</div>
                  <div className="text-xs text-white/80">Avg. Test</div>
                </div>
              </div>
            </div>
            <div className="mt-auto flex justify-center">
              <img src={purpleRangeLabDashboard} alt="PurpleRangeLab Dashboard" className="w-2/3 h-auto" />
            </div>
          </motion.div>

          {/* Card 2 - Performance Metrics */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.2
        }} className="group glass-card-dark p-5 lg:p-8 rounded-2xl hover:border-[#FFD700] transition-all duration-300">
            
            <h3 className="text-lg lg:text-xl font-bold text-white mb-3 lg:mb-4 flex items-center"><GlowingBulb />Performance Metrics</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between items-center border-b border-border/30 pb-3">
                <span className="text-white/80">Time to Detect</span>
                <span className="text-brand-green font-semibold">Top 10%</span>
              </li>
              <li className="flex justify-between items-center border-b border-border/30 pb-3">
                <span className="text-white/80">False Positives</span>
                <span className="text-brand-green font-semibold">&lt; 2%</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-white/80">Report Accuracy</span>
                <span className="text-brand-green font-semibold">High</span>
              </li>
            </ul>
            <div className="mt-4">
              <img src={participantsChart} alt="Participants Performance Chart" className="w-full rounded-lg" />
            </div>
          </motion.div>

          {/* Card 3 - Capability Report (Larger, spans 1 col on lg, full on md) */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.3
        }} className="md:col-span-2 lg:col-span-1 lg:row-span-2 group glass-card-dark rounded-2xl hover:border-[#FFD700] transition-all duration-300 flex flex-col overflow-hidden">
            <div className="p-5 lg:p-8 pb-0">
              
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 lg:mb-3 flex items-center"><GlowingBulb />Hiring with 20/20 Vision</h3>
              <p className="text-white/80 text-xs lg:text-sm mb-4 lg:mb-6">
                Instead of a resume, you get a capability report detailing exactly how they solved the problem.
              </p>
              <ul className="space-y-2 lg:space-y-3 text-xs lg:text-sm mb-4 lg:mb-6">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <span className="text-white/80">Proof of technical depth</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <span className="text-white/80">Evidence of stress resilience</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <span className="text-white/80">Real incident timeline</span>
                </li>
              </ul>
            </div>

            {/* Person Image - touching bottom */}
            <div className="mt-auto flex justify-center">
              <img src={hiringVisionPerson} alt="Purple Tested Professional" className="w-2/3 h-auto -mb-[25px]" />
            </div>

            {/* Report Preview Card */}
            <div className="mt-auto glass-card-dark rounded-xl p-4 lg:p-5 border border-border/50 group-hover:border-brand-green/30 transition-colors">
              <div className="flex justify-between items-center mb-4 border-b border-border/30 pb-3">
                <span className="text-xs text-white/80">Candidate ID: #9942</span>
                <span className="text-brand-green font-bold text-sm px-2 py-1 bg-brand-green/10 rounded">PASSED</span>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-white/80">Detection</span>
                  <span className="text-white">92%</span>
                </div>
                <div className="h-2 bg-border/30 rounded-full overflow-hidden">
                  <motion.div initial={{
                  width: 0
                }} whileInView={{
                  width: "92%"
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 1,
                  delay: 0.5
                }} className="h-full bg-brand-purple-light rounded-full" />
                </div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-white/80">Analysis</span>
                  <span className="text-white">88%</span>
                </div>
                <div className="h-2 bg-border/30 rounded-full overflow-hidden">
                  <motion.div initial={{
                  width: 0
                }} whileInView={{
                  width: "88%"
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 1,
                  delay: 0.6
                }} className="h-full bg-brand-purple-light rounded-full" />
                </div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-white/80">Response</span>
                  <span className="text-white">95%</span>
                </div>
                <div className="h-2 bg-border/30 rounded-full overflow-hidden">
                  <motion.div initial={{
                  width: 0
                }} whileInView={{
                  width: "95%"
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 1,
                  delay: 0.7
                }} className="h-full bg-brand-green rounded-full" />
                </div>
              </div>
              <div className="p-3 bg-brand-dark/50 rounded-lg border border-border/30">
                <code className="text-[10px] font-mono text-brand-green">
                  &gt; Investigating IP 192.168.1.5
                  <br />
                  <span className="text-white/80">&gt; Malware payload identified...</span>
                </code>
              </div>
            </div>
          </motion.div>

          {/* Card 4 - Verified Credentials */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.4
        }} className="group glass-card-dark p-5 lg:p-8 rounded-2xl hover:border-[#FFD700] transition-all duration-300 flex flex-col">
            
            <h3 className="text-lg lg:text-xl font-bold text-white mb-2 lg:mb-3 flex items-center"><GlowingBulb />Verified Credentials</h3>
            <p className="text-white/80 text-xs lg:text-sm leading-relaxed mb-4 lg:mb-6">
              Each candidate receives a verifiable badge showing their tested capabilities, tool proficiency, and
              response times.
            </p>

            {/* Badge Image */}
            <div className="mt-auto flex items-center justify-center">
              <img src={purpleTestedBadge} alt="Purple Tested verification badge" className="w-full max-w-[200px] h-auto" />
            </div>
          </motion.div>

          {/* Card 5 - Full-Fidelity Simulation */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.5
        }} className="group glass-card-dark p-5 lg:p-8 rounded-2xl hover:border-[#FFD700] bg-gradient-to-br from-brand-purple/10 to-transparent transition-all duration-300">
            <div className="flex flex-col h-full">
              
              <h3 className="text-lg lg:text-xl font-bold text-white mb-3 lg:mb-4 flex items-center"><GlowingBulb />Full-Fidelity Simulation</h3>
              <p className="text-white/80 text-xs lg:text-sm mb-4 lg:mb-6 leading-relaxed">
                Candidates enter a virtualized corporate network under active attack. They must navigate real logs,
                identify IOCs, and contain threats using standard industry tools (Splunk, CrowdStrike).
              </p>
              <div className="mt-auto bg-brand-dark rounded-xl p-4 border border-border/30">
                <code className="text-xs font-mono block space-y-1">
                  <div>
                    <span className="text-brand-green">user@range:~$</span>
                    <span className="text-white"> grep -r "malware" /var/log/syslog</span>
                  </div>
                  <div className="text-white/80">Scanning directories...</div>
                  <div className="text-brand-green">[ALERT] Suspicious beaconing detected on Port 443</div>
                  <div className="text-white animate-pulse">_</div>
                </code>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default BentoSection;