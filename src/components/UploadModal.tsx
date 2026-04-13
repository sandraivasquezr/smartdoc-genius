import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Upload, Camera, Mail, HardDrive, Sparkles, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "source" | "analyzing" | "suggestions" | "done";

const aiSuggestions = {
  name: "Contrato-Servicio-CloudTech-2025.pdf",
  folder: "Contratos",
  tags: ["cliente-a", "renovación", "confidencial"],
};

export function UploadModal({ open, onOpenChange }: UploadModalProps) {
  const [step, setStep] = useState<Step>("source");
  const [fileName, setFileName] = useState("");

  const handleFileSelect = () => {
    setFileName("documento-escaneado.pdf");
    setStep("analyzing");
    setTimeout(() => setStep("suggestions"), 2500);
  };

  const handleConfirm = () => {
    setStep("done");
    setTimeout(() => {
      onOpenChange(false);
      setStep("source");
      setFileName("");
    }, 1500);
  };

  const handleClose = (v: boolean) => {
    onOpenChange(v);
    if (!v) { setStep("source"); setFileName(""); }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Cargar Documento
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === "source" && (
            <motion.div key="source" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <div
                onClick={handleFileSelect}
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm font-medium">Arrastra archivos aquí o haz clic para seleccionar</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, XLSX, imágenes hasta 50MB</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" className="gap-2 h-auto py-3" onClick={handleFileSelect}>
                  <Camera className="h-4 w-4" /> Cámara / OCR
                </Button>
                <Button variant="outline" size="sm" className="gap-2 h-auto py-3" onClick={handleFileSelect}>
                  <Mail className="h-4 w-4" /> Gmail
                </Button>
                <Button variant="outline" size="sm" className="gap-2 h-auto py-3" onClick={handleFileSelect}>
                  <HardDrive className="h-4 w-4" /> Google Drive
                </Button>
              </div>
            </motion.div>
          )}

          {step === "analyzing" && (
            <motion.div key="analyzing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="py-12 text-center space-y-4">
              <div className="relative mx-auto w-16 h-16">
                <Loader2 className="h-16 w-16 text-primary animate-spin" />
                <Sparkles className="h-6 w-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div>
                <p className="font-medium">Analizando documento con IA...</p>
                <p className="text-sm text-muted-foreground mt-1">Extrayendo contenido, clasificando y sugiriendo metadatos</p>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground max-w-xs mx-auto">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>✓ OCR completado</motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>✓ Clasificación de documento detectada</motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="animate-pulse-soft">⟳ Generando sugerencias...</motion.p>
              </div>
            </motion.div>
          )}

          {step === "suggestions" && (
            <motion.div key="suggestions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                <p className="text-sm">La IA ha analizado el contenido y sugiere los siguientes metadatos:</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Nombre sugerido</label>
                  <Input defaultValue={aiSuggestions.name} />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Carpeta sugerida</label>
                  <Input defaultValue={aiSuggestions.folder} />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Etiquetas sugeridas</label>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {aiSuggestions.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Fecha de vencimiento (opcional)</label>
                  <Input type="date" />
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => handleClose(false)}>Cancelar</Button>
                <Button onClick={handleConfirm} className="gap-2"><Check className="h-4 w-4" /> Confirmar y Guardar</Button>
              </div>
            </motion.div>
          )}

          {step === "done" && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center space-y-3">
              <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                <Check className="h-8 w-8 text-success" />
              </div>
              <p className="font-medium">¡Documento guardado exitosamente!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
