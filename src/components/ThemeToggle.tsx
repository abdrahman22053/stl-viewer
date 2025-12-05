import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="relative rounded-xl border-border/60 hover:border-primary/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
      >
        <motion.div
          animate={theme === "dark" ? { rotate: 0, scale: 1 } : { rotate: 90, scale: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Moon className="h-[1.2rem] w-[1.2rem] text-primary" />
        </motion.div>
        <motion.div
          animate={theme === "dark" ? { rotate: -90, scale: 0 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] text-primary" />
        </motion.div>
        <span className="sr-only">Changer le thème</span>
      </Button>
    </motion.div>
  );
};
