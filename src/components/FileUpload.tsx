import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileCheck, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
  isLoading: boolean;
  onUploadClick?: (open: () => void) => void;
}

export const FileUpload = ({ onFileSelect, selectedFile, onClear, isLoading, onUploadClick }: FileUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file.name.toLowerCase().endsWith(".stl")) {
          onFileSelect(file);
        }
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "model/stl": [".stl"],
      "application/sla": [".stl"],
    },
    maxFiles: 1,
    disabled: isLoading,
    noClick: false,
    noKeyboard: false,
  });

  // Expose the open function to parent
  useEffect(() => {
    if (onUploadClick) {
      onUploadClick(open);
    }
  }, [onUploadClick, open]);

  return (
    <Card className="card-modern p-4 md:p-5">
      <AnimatePresence mode="wait">
        {!selectedFile ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div
              {...getRootProps()}
              className={`
                relative border-2 border-dashed rounded-xl p-6 md:p-8 text-center cursor-pointer
                transition-all duration-500 overflow-hidden group
                ${
                  isDragActive
                    ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/20 scale-[1.02]"
                    : "border-border/60 hover:border-primary/40 hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent"
                }
              `}
            >
              <input {...getInputProps()} />
              {isDragActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 animate-shimmer"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              )}
              <div className="relative z-10">
                <motion.div
                  animate={isDragActive ? { scale: 1.15, rotate: [0, 5, -5, 0] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  <div className="relative inline-block">
                    <Upload className="w-14 h-14 md:w-16 md:h-16 mx-auto text-primary drop-shadow-lg" />
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                  </div>
                </motion.div>
                <h3 className="text-base md:text-lg font-display font-bold mb-2 gradient-text">
                  {isDragActive ? "Déposez le fichier ici" : "Uploadez votre fichier STL"}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-2 font-medium">
                  Glissez-déposez ou cliquez pour sélectionner
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mt-2">
                  <span className="text-xs font-semibold text-primary">Format accepté : .STL</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="selected"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between p-3 md:p-4 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-xl border border-primary/20 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-lg" />
                <FileCheck className="w-8 h-8 md:w-10 md:h-10 text-primary relative z-10" />
              </div>
              <div>
                <p className="text-sm md:text-base font-semibold text-foreground mb-0.5 truncate max-w-[200px]">{selectedFile.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs md:text-sm font-medium text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    STL
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClear}
              disabled={isLoading}
              className="hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};
