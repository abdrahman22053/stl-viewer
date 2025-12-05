import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { FileUpload } from "@/components/FileUpload";
import { STLViewer } from "@/components/STLViewer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Tutorial } from "@/components/Tutorial";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Info, Upload, Loader2, WifiOff } from "lucide-react";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const fileUploadOpenRef = useRef<(() => void) | null>(null);

  // Fonction pour détecter la qualité de la connexion
  const checkConnectionSpeed = async (): Promise<boolean> => {
    try {
      // Vérifier l'API NetworkInformation si disponible
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      
      if (connection) {
        // Si l'API est disponible, vérifier la vitesse effective
        const effectiveType = connection.effectiveType;
        const downlink = connection.downlink;
        
        // Considérer comme lent si: 2g, slow-2g, ou downlink < 1 Mbps
        if (effectiveType === '2g' || effectiveType === 'slow-2g' || (downlink && downlink < 1)) {
          return true;
        }
      }
      
      // Test de vitesse simple: mesurer le temps de réponse
      const startTime = performance.now();
      const testUrl = "/knitted_cat_singlecolor.stl";
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // Timeout de 2 secondes
      
      try {
        const response = await fetch(testUrl, {
          method: 'HEAD',
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        const endTime = performance.now();
        const responseTime = endTime - startTime;
        
        // Si la réponse prend plus de 1.5 secondes, considérer comme lent
        return responseTime > 1500;
      } catch (error) {
        clearTimeout(timeoutId);
        // Si timeout ou erreur, considérer comme lent
        return true;
      }
    } catch (error) {
      // En cas d'erreur, supposer une connexion normale
      return false;
    }
  };

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

  const handleDownloadSample = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    setIsSlowConnection(false);
    
    try {
      // Vérifier la qualité de la connexion
      const slowConnection = await checkConnectionSpeed();
      setIsSlowConnection(slowConnection);
      
      if (slowConnection) {
        toast.info("Connexion lente détectée. Le téléchargement peut prendre du temps...", {
          duration: 3000,
        });
      }
      
      // In Vite, files in public folder are served from root
      const sampleUrl = "/knitted_cat_singlecolor.stl";
      
      // Fetch the file with progress tracking
      const response = await fetch(sampleUrl);
      if (!response.ok) {
        throw new Error("Fichier non trouvé");
      }
      
      const contentLength = response.headers.get("content-length");
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      
      if (!response.body) {
        throw new Error("Corps de la réponse non disponible");
      }
      
      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let receivedLength = 0;
      
      // Lire les données avec suivi de progression
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        chunks.push(value);
        receivedLength += value.length;
        
        // Mettre à jour la progression si on connaît la taille totale
        if (total > 0) {
          const progress = Math.min(100, Math.round((receivedLength / total) * 100));
          setDownloadProgress(progress);
        } else {
          // Estimation basée sur le nombre de chunks (max 95% jusqu'à la fin)
          setDownloadProgress(Math.min(95, chunks.length * 5));
        }
      }
      
      // Combiner tous les chunks en un seul blob
      const allChunks = new Uint8Array(receivedLength);
      let position = 0;
      for (const chunk of chunks) {
        allChunks.set(chunk, position);
        position += chunk.length;
      }
      
      const blob = new Blob([allChunks]);
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = "knitted_cat_singlecolor.stl";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the object URL
      window.URL.revokeObjectURL(url);
      
      // S'assurer que la progression est à 100% à la fin
      setDownloadProgress(100);
      
      // Petit délai pour afficher 100% avant de masquer
      await new Promise(resolve => setTimeout(resolve, 300));
      
      toast.success("Fichier test téléchargé !");
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
      toast.error("Erreur lors du téléchargement du fichier");
    } finally {
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadProgress(0);
        setIsSlowConnection(false);
      }, 500);
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedBackground />
      <Tutorial />
      <Header />
      
      {/* Loading Overlay pour connexion lente */}
      <AnimatePresence>
        {isDownloading && isSlowConnection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card-modern p-6 md:p-8 max-w-md mx-4 text-center"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Loader2 className="w-12 h-12 text-primary animate-spin" />
                  <WifiOff className="w-6 h-6 text-accent absolute -bottom-1 -right-1" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold mb-2 gradient-text">
                    Connexion lente détectée
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Le téléchargement est en cours. Veuillez patienter...
                  </p>
                  {downloadProgress > 0 && (
                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                      <motion.div
                        className="bg-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${downloadProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {downloadProgress > 0 ? `${downloadProgress}%` : "Chargement..."}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 w-full max-w-7xl mx-auto p-3 md:p-4 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 h-full min-h-0"
        >
          {/* Left Panel - Upload & Info */}
          <div className="lg:col-span-1 space-y-3 md:space-y-4 flex flex-col">
            <div data-tutorial="upload">
              <FileUpload
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                onClear={handleClear}
                isLoading={isLoading}
                onUploadClick={(open) => {
                  fileUploadOpenRef.current = open;
                }}
              />
            </div>

            {/* Instructions Card */}
            <motion.div
              data-tutorial="instructions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card-modern p-4 md:p-5 p-1.5 rounded-lg bg-primary/10 border border-primary/20"
            >
              <div className="flex items-center gap-2 mb-3 ">
                <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20">
                  <Info className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-base font-display font-bold gradient-text">Instructions</h3>
              </div>
              <ul className="space-y-1.5 text-xs md:text-sm">
                <li className="flex items-start gap-3 group">
                  <div className="mt-1 w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    Uploadez un fichier STL pour le visualiser en 3D
                  </span>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="mt-1 w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    Utilisez la souris pour tourner et zoomer sur le modèle
                  </span>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="mt-1 w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    Le rendu est optimisé pour tous les appareils
                  </span>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="mt-1 w-2 h-2 rounded-full bg-accent group-hover:scale-125 transition-transform" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    Design adaptable pour votre événement
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Upload Button - Only when no file is selected */}
            {!selectedFile && (
              <motion.div
                data-tutorial="upload-button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-3"
              >
                <Button
                  onClick={handleDownloadSample}
                  disabled={isDownloading}
                  className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white border-0 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Téléchargement... {downloadProgress > 0 && `${downloadProgress}%`}
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Télécharger un fichier test
                    </>
                  )}
                </Button>
              </motion.div>
            )}

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
                  
                  className="flex-1 border-border hover:border-primar"
                >
                  Nouveau fichier
                </Button>
              </motion.div>
            )}
          </div>

          {/* Right Panel - 3D Viewer */}
          <motion.div
            data-tutorial="viewer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 h-full min-h-0"
          >
            {selectedFile ? (
              <STLViewer file={selectedFile} />
            ) : (
              <div className="h-full flex items-center justify-center card-modern rounded-xl border-2 border-dashed border-border/50">
                <div className="text-center px-4">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-4"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 blur-2xl animate-pulse-glow" />
                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary/40 to-primary/20 flex items-center justify-center">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/30" />
                      </div>
                    </div>
                  </motion.div>
                  <h2 className="text-xl md:text-2xl font-display font-bold mb-2 gradient-text">
                    Prêt à visualiser
                  </h2>
                  <p className="text-sm text-muted-foreground font-medium">
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
        className="w-full py-2 px-4 border-t border-border/30 backdrop-blur-glass bg-background/40 relative z-10"
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs text-muted-foreground">
            Application moderne de visualisation 3D • Adaptable pour vos événements tech
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
