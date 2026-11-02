import { motion } from "framer-motion";
import pipelineFlow from "@/assets/pipeline-flow-v2.gif";
import pipelineFlowMobile from "@/assets/pipeline-flow-mobile.gif";

const PipelineSection = () => {
  return (
    <section id="process" className="py-24 bg-white relative overflow-hidden">
      <div className="w-full px-0 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            The <span className="text-brand-purple">Purple Pipeline</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From raw applicant to battle-tested expert. See how we filter the noise.
          </p>
        </motion.div>

        {/* Pipeline Flow GIF */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="w-full overflow-hidden px-[10px]"
        >
          {/* Desktop GIF */}
          <img src={pipelineFlow} alt="Purple Pipeline flow showing candidate filtering process" className="hidden sm:block w-full h-auto" />
          {/* Mobile GIF */}
          <img src={pipelineFlowMobile} alt="Purple Pipeline flow showing candidate filtering process" className="sm:hidden w-full h-auto" />
        </motion.div>
      </div>
    </section>
  );
};

export default PipelineSection;
