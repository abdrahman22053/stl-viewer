import { useCallback } from "react";
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
}

export const FileUpload = ({ onFileSelect, selectedFile, onClear, isLoading }: FileUploadProps) => {
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "model/stl": [".stl"],
      "application/sla": [".stl"],
    },
    maxFiles: 1,
    disabled: isLoading,
  });

  return (
    <Card className="p-6 bg-card/80 backdrop-blur-glass border-border hover-lift">
      <AnimatePresence mode="wait">
        {!selectedFile ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div
              {...getRootProps()}
              className={`
                relative border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
                transition-all duration-300
                ${
                  isDragActive
                    ? "border-primary bg-primary/5 glow-primary"
                    : "border-border hover:border-primary/50 hover:bg-card/50"
                }
              `}
            >
              <input {...getInputProps()} />
              <motion.div
                animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Upload className="w-16 h-16 mx-auto mb-4 text-primary" />
              </motion.div>
              <h3 className="text-xl font-display font-semibold mb-2">
                {isDragActive ? "Déposez le fichier ici" : "Uploadez votre fichier STL"}
              </h3>
              <p className="text-muted-foreground mb-4">
                Glissez-déposez ou cliquez pour sélectionner
              </p>
              <p className="text-sm text-muted-foreground">Format accepté : .STL</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="selected"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between p-4 bg-secondary rounded-lg"
          >
            <div className="flex items-center gap-3">
              <FileCheck className="w-8 h-8 text-primary" />
              <div>
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClear}
              disabled={isLoading}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};
