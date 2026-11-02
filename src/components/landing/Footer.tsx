import { motion } from "framer-motion";
import purpleSynapzLogo from "@/assets/purplesynapz-logo.png";
const Footer = () => {
  return (
    <footer className="py-10 bg-brand-dark border-t border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <a href="#" className="flex items-center group">
              <img
                alt="PurpleSynapz"
                className="h-14 w-auto brightness-0 invert"
                src={purpleSynapzLogo}
              />
            </a>
            <span className="text-xs text-muted-foreground"><span className="text-xs text-muted-foreground">© 2026 PurpleSynapz. All rights reserved.</span></span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
export default Footer;
