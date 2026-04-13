import { auditLog } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { ScrollText, Upload, Eye, Pencil, Trash2, Download, Share } from "lucide-react";

const actionConfig: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  upload: { icon: Upload, label: "Subió", color: "bg-primary/10 text-primary" },
  view: { icon: Eye, label: "Vio", color: "bg-blue-500/10 text-blue-600" },
  edit: { icon: Pencil, label: "Editó", color: "bg-warning/10 text-warning" },
  delete: { icon: Trash2, label: "Eliminó", color: "bg-destructive/10 text-destructive" },
  download: { icon: Download, label: "Descargó", color: "bg-success/10 text-success" },
  share: { icon: Share, label: "Compartió", color: "bg-purple-500/10 text-purple-600" },
};

export default function AuditPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <ScrollText className="h-6 w-6 text-primary" /> Historial de Actividad
        </h2>
        <p className="text-muted-foreground text-sm">Registro detallado de todas las acciones realizadas</p>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        {auditLog.map((entry, i) => {
          const config = actionConfig[entry.action];
          const Icon = config.icon;
          return (
            <div key={entry.id} className={`flex items-start gap-3 px-4 py-3.5 ${i < auditLog.length - 1 ? "border-b" : ""}`}>
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${config.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{entry.user}</span>
                  {" "}<span className="text-muted-foreground">{config.label}</span>{" "}
                  <span className="font-medium">{entry.target}</span>
                </p>
                {entry.details && <p className="text-xs text-muted-foreground mt-0.5">{entry.details}</p>}
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{entry.timestamp}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
