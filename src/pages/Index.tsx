import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { FileUpload } from "@/components/FileUpload";
import { STLViewer } from "@/components/STLViewer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (file: File) => {
    setIsLoading(true);
    setSelectedFile(file);
    toast.success("Fichier chargé avec succès !", {
      description: `${file.name} - ${(file.size / 1024 / 1024).toFixed(2)} MB`,
    });
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleClear = () => {
    setSelectedFile(null);
    toast.info("Fichier supprimé");
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedBackground />
      <Header />
      
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full"
        >
          {/* Left Panel - Upload & Info */}
          <div className="lg:col-span-1 space-y-6">
            <FileUpload
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              onClear={handleClear}
              isLoading={isLoading}
            />

            {/* Instructions Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card/80 backdrop-blur-glass border border-border rounded-lg p-6 hover-lift"
            >
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-primary" />
                <h3 className="font-display font-semibold">Instructions</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Uploadez un fichier STL pour le visualiser en 3D</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Utilisez la souris pour tourner et zoomer sur le modèle</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Le rendu est optimisé pour tous les appareils</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Design adaptable pour votre événement</span>
                </li>
              </ul>
            </motion.div>

            {/* Action Buttons */}
            {selectedFile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-3"
              >
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="flex-1 border-border hover:border-primary"
                >
                  Nouveau fichier
                </Button>
              </motion.div>
            )}
          </div>

          {/* Right Panel - 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 min-h-[600px] lg:min-h-[calc(100vh-200px)]"
          >
            {selectedFile ? (
              <STLViewer file={selectedFile} />
            ) : (
              <div className="h-full flex items-center justify-center bg-card/20 backdrop-blur-glass rounded-lg border-2 border-dashed border-border">
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center glow-primary"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/20"></div>
                  </motion.div>
                  <h2 className="text-2xl font-display font-semibold mb-2">
                    Prêt à visualiser
                  </h2>
                  <p className="text-muted-foreground">
                    Uploadez un fichier STL pour commencer
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full py-6 px-4 border-t border-border/50 backdrop-blur-glass bg-background/30 mt-8 relative z-10"
      >
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>Application moderne de visualisation 3D • Adaptable pour vos événements tech</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
