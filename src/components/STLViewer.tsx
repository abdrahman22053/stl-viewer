import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Center } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Loader2, RotateCw, ZoomIn } from "lucide-react";

interface STLViewerProps {
  file: File;
}

const STLModel = ({ geometry }: { geometry: THREE.BufferGeometry }) => {
  return (
    <Center>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          color="#00d4ff"
          metalness={0.6}
          roughness={0.2}
          emissive="#00d4ff"
          emissiveIntensity={0.1}
        />
      </mesh>
    </Center>
  );
};

const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
    <div className="text-center">
      <Loader2 className="w-12 h-12 mx-auto mb-4 text-primary animate-spin" />
      <p className="text-lg font-display">Chargement du modèle 3D...</p>
    </div>
  </div>
);

export const STLViewer = ({ file }: STLViewerProps) => {
  const [dimensions, setDimensions] = useState<{ width: number; height: number; depth: number } | null>(null);

  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const loader = new STLLoader();
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        const loadedGeometry = loader.parse(arrayBuffer);
        loadedGeometry.computeVertexNormals();
        loadedGeometry.computeBoundingBox();
      const box = loadedGeometry.boundingBox;
      const width  = box.max.x - box.min.x;
      const height = box.max.y - box.min.y;
      const depth  = box.max.z - box.min.z;

      setDimensions({ width, height, depth });
        setGeometry(loadedGeometry);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement du fichier STL");
        setLoading(false);
      }
    };

    reader.onerror = () => {
      setError("Erreur lors de la lecture du fichier");
      setLoading(false);
    };

    reader.readAsArrayBuffer(file);

    return () => {
      if (geometry) {
        geometry.dispose();
      }
    };
  }, [file]);

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full flex items-center justify-center bg-destructive/10 rounded-lg border border-destructive"
      >
        <div className="text-center">
          <p className="text-destructive font-display">{error}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-full rounded-lg overflow-hidden border border-border glow-primary"
    >
      {loading && <LoadingSpinner />}
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 150], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {geometry && (
            <Stage environment="city" intensity={0.6} shadows="contact">
              <STLModel geometry={geometry} />
            </Stage>
          )}
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={50}
            maxDistance={500}
          />
        </Suspense>
      </Canvas>
      
      {/* Controls hint */}
      {/* Dimensions avec flèches */}
      {!loading && dimensions && (
        <>
          {/* Largeur (Width) - Bas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2"
          >
            <div className="w-8 h-0.5 bg-primary"></div>
            <div className="bg-primary/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary shadow-lg">
              <span className="text-xs font-semibold text-primary-foreground">
                ← {dimensions.width.toFixed(2)} mm →
              </span>
            </div>
            <div className="w-8 h-0.5 bg-primary"></div>
          </motion.div>

          {/* Hauteur (Height) - Droite */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
          >
            <div className="w-0.5 h-8 bg-primary"></div>
            <div className="bg-primary/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary shadow-lg writing-mode-vertical">
              <span className="text-xs font-semibold text-primary-foreground whitespace-nowrap">
                ↑ {dimensions.height.toFixed(2)} mm ↓
              </span>
            </div>
            <div className="w-0.5 h-8 bg-primary"></div>
          </motion.div>

          
        </>
      )}

      {/* Controls hint */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg p-3 border border-border"
        >
          <div className="flex flex-col gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <RotateCw className="w-3 h-3" />
              <span>Glisser pour tourner</span>
            </div>
            <div className="flex items-center gap-2">
              <ZoomIn className="w-3 h-3" />
              <span>Scroll pour zoomer</span>
            </div>
          </div>
        </motion.div>
      )}
      
    </motion.div>
  );
};