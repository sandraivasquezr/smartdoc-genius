import { documents, folders } from "@/lib/mock-data";
import { FileText, FolderOpen, AlertTriangle, XCircle } from "lucide-react";

const stats = [
  { label: "Total Documentos", value: documents.length, icon: FileText, color: "text-primary" },
  { label: "Carpetas", value: folders.length, icon: FolderOpen, color: "text-primary" },
  { label: "Por Vencer", value: documents.filter(d => d.status === "expiring").length, icon: AlertTriangle, color: "text-warning" },
  { label: "Vencidos", value: documents.filter(d => d.status === "expired").length, icon: XCircle, color: "text-destructive" },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between mb-2">
            <s.icon className={`h-5 w-5 ${s.color}`} />
          </div>
          <p className="text-2xl font-bold">{s.value}</p>
          <p className="text-xs text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
