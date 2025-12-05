import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export const AnimatedBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient Orbs - More Subtle */}
      <motion.div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.15] blur-[100px]"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.15] blur-[100px]"
        style={{
          background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -20, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Additional subtle gradient */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.08] blur-[120px]"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.05, 0.12, 0.05],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated Grid - More Subtle */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.02] dark:opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating Particles - More Subtle */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `hsl(var(--primary))`,
            opacity: 0.15,
            filter: "blur(1px)",
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 15 - 7.5, 0],
            opacity: [0.08, 0.2, 0.08],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Scanning Line Effect - More Subtle */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] opacity-[0.08]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)",
          filter: "blur(1px)",
        }}
        animate={{
          top: ["0%", "100%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* 3D Wireframe Cubes - More Subtle */}
      <motion.div
        className="absolute top-[10%] right-[15%] w-32 h-32 opacity-[0.06] dark:opacity-[0.08]"
        style={{
          perspective: "1000px",
        }}
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Wireframe cube faces */}
          {[0, 90, 180, 270].map((rotation, i) => (
            <div
              key={i}
              className="absolute w-full h-full border-2 border-primary"
              style={{
                transform: `rotateY(${rotation}deg) translateZ(64px)`,
              }}
            />
          ))}
          <div
            className="absolute w-full h-full border-2 border-primary"
            style={{
              transform: "rotateX(90deg) translateZ(64px)",
            }}
          />
          <div
            className="absolute w-full h-full border-2 border-primary"
            style={{
              transform: "rotateX(-90deg) translateZ(64px)",
            }}
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[20%] left-[10%] w-24 h-24 opacity-[0.06] dark:opacity-[0.08]"
        style={{
          perspective: "1000px",
        }}
        animate={{
          rotateX: [360, 0],
          rotateZ: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Wireframe pyramid */}
          <div
            className="absolute w-full h-full border-2 border-accent"
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            }}
          />
          {[0, 120, 240].map((rotation, i) => (
            <div
              key={i}
              className="absolute w-full h-full border-2 border-accent"
              style={{
                transform: `rotateY(${rotation}deg) translateZ(48px)`,
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute top-[60%] right-[25%] w-20 h-20 opacity-[0.06] dark:opacity-[0.08]"
        style={{
          perspective: "1000px",
        }}
        animate={{
          rotateY: [0, 360],
          rotateZ: [360, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Wireframe octahedron */}
          <svg viewBox="0 0 100 100" className="absolute w-full h-full">
            <polygon
              points="50,10 90,50 50,90 10,50"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
            />
            <line x1="50" y1="10" x2="50" y2="90" stroke="hsl(var(--primary))" strokeWidth="2" />
            <line x1="10" y1="50" x2="90" y2="50" stroke="hsl(var(--primary))" strokeWidth="2" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};
