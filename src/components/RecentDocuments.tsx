import { documents } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { FileText, FileSpreadsheet, FileImage, File } from "lucide-react";

const typeIcon: Record<string, React.ElementType> = {
  pdf: FileText,
  docx: FileText,
  xlsx: FileSpreadsheet,
  image: FileImage,
  other: File,
};

export function RecentDocuments() {
  const recent = [...documents].sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt)).slice(0, 5);

  return (
    <div className="rounded-xl border bg-card p-5 space-y-4">
      <h3 className="font-semibold text-sm">Documentos Recientes</h3>
      <div className="space-y-1">
        {recent.map((doc) => {
          const Icon = typeIcon[doc.type] || File;
          return (
            <div key={doc.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{doc.name}</p>
                <p className="text-xs text-muted-foreground">{doc.uploadedBy} · {doc.size}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                {doc.tags.slice(0, 2).map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
