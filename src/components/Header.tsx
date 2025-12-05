import { motion } from "framer-motion";
import { Box } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Header = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full py-6 px-4 border-b border-border/50 backdrop-blur-glass bg-background/30 relative z-10"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="p-2 rounded-lg bg-primary/10 glow-primary"
          >
    
  <Box className="w-8 h-8 text-primary" />
</motion.div>
             
           
          <div>
            <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              STL Viewer 3D
            </h1>
            <p className="text-sm text-muted-foreground">Visualisez vos modèles 3D</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden md:block text-sm text-muted-foreground"
          >
            Événement Tech 2025
          </motion.div>
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
};    

