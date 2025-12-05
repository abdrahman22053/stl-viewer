import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TutorialStep {
  id: string;
  selector: string;
  title: string;
  description: string;
  position?: "top" | "bottom" | "left" | "right" | "center";
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: "header",
    selector: "[data-tutorial='header']",
    title: "Bienvenue !",
    description: "Voici l'en-tête de l'application. Vous pouvez changer le thème avec le bouton en haut à droite.",
    position: "bottom",
  },
  {
    id: "upload",
    selector: "[data-tutorial='upload']",
    title: "Upload de fichier",
    description: "Glissez-déposez ou cliquez ici pour uploader un fichier STL à visualiser en 3D.",
    position: "right",
  },
  {
    id: "upload-button",
    selector: "[data-tutorial='upload-button']",
    title: "Bouton d'upload",
    description: "Vous pouvez également utiliser ce bouton pour uploader un fichier STL rapidement.",
    position: "right",
  },
  {
    id: "viewer",
    selector: "[data-tutorial='viewer']",
    title: "Visualiseur 3D",
    description: "Une fois un fichier uploadé, il apparaîtra ici. Utilisez la souris pour tourner et zoomer sur le modèle.",
    position: "left",
  },
];

const TUTORIAL_STORAGE_KEY = "stl-viewer-tutorial-completed";

export const Tutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLElement | null>(null);

  const updateHighlight = useCallback(() => {
    if (!isActive || currentStep >= TUTORIAL_STEPS.length) return;

    const step = TUTORIAL_STEPS[currentStep];
    const element = document.querySelector(step.selector) as HTMLElement;

    if (element) {
      stepRef.current = element;
      const rect = element.getBoundingClientRect();
      setHighlightRect(rect);
    } else {
      setHighlightRect(null);
    }
  }, [isActive, currentStep]);

  useEffect(() => {
    // Check if tutorial was already completed
    const completed = false
    if (!completed) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        setIsActive(true);
      }, 500);
    }
  }, []);

  // Update highlight when active state changes
  useEffect(() => {
    if (isActive) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        updateHighlight();
      }, 100);
    }
  }, [isActive, updateHighlight]);

  // Block interactions and scrolling when tutorial is active
  useEffect(() => {
    if (isActive) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";
      // Add class to prevent interactions
      document.body.classList.add("tutorial-active");
      
      // Block all pointer events except tutorial elements
      const style = document.createElement("style");
      style.id = "tutorial-block-style";
      style.textContent = `
        body.tutorial-active * {
          pointer-events: none !important;
        }
        body.tutorial-active [data-tutorial-tooltip],
        body.tutorial-active [data-tutorial-controls] {
          pointer-events: auto !important;
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.body.style.overflow = "";
        document.body.classList.remove("tutorial-active");
        const styleElement = document.getElementById("tutorial-block-style");
        if (styleElement) {
          styleElement.remove();
        }
      };
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      updateHighlight();
      const handleResize = () => updateHighlight();
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", updateHighlight, true);

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", updateHighlight, true);
      };
    }
  }, [isActive, currentStep, updateHighlight]);

  const nextStep = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTutorial();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTutorial = () => {
    completeTutorial();
  };

  const completeTutorial = () => {
    setIsActive(false);
    localStorage.setItem(TUTORIAL_STORAGE_KEY, "true");
    setHighlightRect(null);
  };

  if (!isActive) return null;

  const currentStepData = TUTORIAL_STEPS[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === TUTORIAL_STEPS.length - 1;

  // Calculate tooltip position
  const getTooltipPosition = () => {
    if (!highlightRect) return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    const spacing = 20;
    const tooltipWidth = 320;
    const tooltipHeight = 150;

    switch (currentStepData.position) {
      case "top":
        return {
          top: `${highlightRect.top - tooltipHeight - spacing}px`,
          left: `${highlightRect.left + highlightRect.width / 2}px`,
          transform: "translateX(-50%)",
        };
      case "bottom":
        return {
          top: `${highlightRect.bottom + spacing}px`,
          left: `${highlightRect.left + highlightRect.width / 2}px`,
          transform: "translateX(-50%)",
        };
      case "left":
        return {
          top: `${highlightRect.top + highlightRect.height / 2}px`,
          left: `${highlightRect.left - tooltipWidth - spacing}px`,
          transform: "translateY(-50%)",
        };
      case "right":
        // For instructions or upload-button step, position higher
        const isInstructions = currentStepData.id === "instructions";
        const isUploadButton = currentStepData.id === "upload-button";
        return {
          top: (isInstructions || isUploadButton)
            ? `${Math.max(highlightRect.top - 300, 20)}px`
            : `${highlightRect.top + highlightRect.height / 2}px`,
          left: `${highlightRect.right + spacing}px`,
          transform: (isInstructions || isUploadButton) ? "translateY(0)" : "translateY(-50%)",
        };
      default:
        return {
          top: `${highlightRect.top + highlightRect.height / 2}px`,
          left: `${highlightRect.left + highlightRect.width / 2}px`,
          transform: "translate(-50%, -50%)",
        };
    }
  };

  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Overlay with blur - using multiple divs for spotlight effect */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] pointer-events-auto"
            onClick={(e) => {
              // Prevent clicks on overlay
              e.stopPropagation();
            }}
            onContextMenu={(e) => e.preventDefault()}
          >
            {highlightRect ? (
              <>
                {/* Top overlay */}
                <div
                  className="absolute bg-black/60 backdrop-blur-md"
                  style={{
                    top: 0,
                    left: 0,
                    right: 0,
                    height: `${highlightRect.top - 10}px`,
                  }}
                />
                {/* Bottom overlay */}
                <div
                  className="absolute bg-black/60 backdrop-blur-md"
                  style={{
                    bottom: 0,
                    left: 0,
                    right: 0,
                    top: `${highlightRect.bottom + 10}px`,
                  }}
                />
                {/* Left overlay */}
                <div
                  className="absolute bg-black/60 backdrop-blur-md"
                  style={{
                    top: `${highlightRect.top - 10}px`,
                    left: 0,
                    width: `${highlightRect.left - 10}px`,
                    height: `${highlightRect.height + 20}px`,
                  }}
                />
                {/* Right overlay */}
                <div
                  className="absolute bg-black/60 backdrop-blur-md"
                  style={{
                    top: `${highlightRect.top - 10}px`,
                    right: 0,
                    left: `${highlightRect.right + 10}px`,
                    height: `${highlightRect.height + 20}px`,
                  }}
                />
                {/* Highlight border */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${highlightRect.left - 10}px`,
                    top: `${highlightRect.top - 10}px`,
                    width: `${highlightRect.width + 20}px`,
                    height: `${highlightRect.height + 20}px`,
                    zIndex: 2,
                  }}
                >
                  <div className="w-full h-full border-4 border-primary rounded-lg shadow-lg shadow-primary/50 glow-primary" />
                </motion.div>
              </>
            ) : (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            )}
          </motion.div>

          {/* Tooltip */}
          {highlightRect && (
            <motion.div
              data-tutorial-tooltip
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="fixed z-[9999] pointer-events-auto"
              style={getTooltipPosition()}
            >
              <Card className="p-6 bg-card border-2 border-primary shadow-xl min-w-[320px] max-w-[400px]">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-display font-semibold mb-1">
                      {currentStepData.title}
                    </h3>
                    <div className="text-xs text-muted-foreground">
                      Étape {currentStep + 1} sur {TUTORIAL_STEPS.length}
                    </div>
                  </div>
                  <Button
                    data-tutorial-controls
                    variant="ghost"
                    size="icon"
                    onClick={skipTutorial}
                    className="h-6 w-6"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  {currentStepData.description}
                </p>
                <div className="flex items-center justify-between gap-3">
                  <Button
                    data-tutorial-controls
                    variant="outline"
                    onClick={prevStep}
                    disabled={isFirstStep}
                    className="flex-1"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Précédent
                  </Button>
                  <Button
                    data-tutorial-controls
                    onClick={nextStep}
                    className="flex-1"
                  >
                    {isLastStep ? "Terminer" : "Suivant"}
                    {!isLastStep && <ChevronRight className="h-4 w-4 ml-1" />}
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

