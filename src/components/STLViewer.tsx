import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Loader2, RotateCw, ZoomIn, Ruler } from "lucide-react";

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

interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export const STLViewer = ({ file }: STLViewerProps) => {
  

  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);

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
        
        // Calculate bounding box to get dimensions
        loadedGeometry.computeBoundingBox();
        const box = loadedGeometry.boundingBox;
        if (box) {
          const width = box.max.x - box.min.x;
          const height = box.max.y - box.min.y;
          const depth = box.max.z - box.min.z;
          setDimensions({ width, height, depth });
        }
        
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
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <pointLight position={[0, 0, 10]} intensity={0.8} />
          
          {/* Model */}
          {geometry && <STLModel geometry={geometry} />}
          
          {/* Controls */}
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={50}
            maxDistance={500}
          />
        </Suspense>
      </Canvas>
      
      {/* Dimensions Info */}
      {!loading && dimensions && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <Ruler className="w-4 h-4 text-primary" />
            <span className="text-sm font-display font-semibold text-foreground">Dimensions</span>
          </div>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center justify-between gap-4">
              <span>Largeur (X):</span>
              <span className="font-medium text-foreground">{dimensions.width.toFixed(2)} mm</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Hauteur (Y):</span>
              <span className="font-medium text-foreground">{dimensions.height.toFixed(2)} mm</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Profondeur (Z):</span>
              <span className="font-medium text-foreground">{dimensions.depth.toFixed(2)} mm</span>
            </div>
          </div>
        </motion.div>
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