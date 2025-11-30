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
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient Orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Animated Grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <motion.path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating Particles */}
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
            opacity: 0.2,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Scanning Line Effect */}
      <motion.div
        className="absolute left-0 right-0 h-px opacity-20"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)",
        }}
        animate={{
          top: ["0%", "100%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* 3D Wireframe Cubes */}
      <motion.div
        className="absolute top-[10%] right-[15%] w-32 h-32 opacity-10"
        style={{
          perspective: "1000px",
        }}
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
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
        className="absolute bottom-[20%] left-[10%] w-24 h-24 opacity-10"
        style={{
          perspective: "1000px",
        }}
        animate={{
          rotateX: [360, 0],
          rotateZ: [0, 360],
        }}
        transition={{
          duration: 15,
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
        className="absolute top-[60%] right-[25%] w-20 h-20 opacity-10"
        style={{
          perspective: "1000px",
        }}
        animate={{
          rotateY: [0, 360],
          rotateZ: [360, 0],
        }}
        transition={{
          duration: 18,
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
