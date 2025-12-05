import { motion } from "framer-motion";
import { Box } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Header = () => {
  return (
    <motion.header
      data-tutorial="header"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full py-3 px-4 md:px-6 border-b border-border/30 backdrop-blur-glass bg-background/40 relative z-10 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="relative p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 animate-pulse-glow"
          >
            <Box className="w-7 h-7 text-primary relative z-10" />
            <div className="absolute inset-0 rounded-xl bg-primary/10 blur-xl" />
          </motion.div>
          <div>
            <h1 className="text-xl md:text-2xl font-display font-bold gradient-text tracking-tight">
              STL Viewer 3D
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              Visualisez vos modèles 3D
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 md:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">Nuit de l'info 2025</span>
          </motion.div>
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
};    

