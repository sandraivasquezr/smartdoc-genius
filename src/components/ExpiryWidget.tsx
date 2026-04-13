import { documents } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, XCircle } from "lucide-react";

export function ExpiryWidget() {
  const expiring = documents.filter((d) => d.status === "expiring");
  const expired = documents.filter((d) => d.status === "expired");

  const all = [...expired, ...expiring];

  return (
    <div className="rounded-xl border bg-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Vencimientos próximos
        </h3>
        <Badge variant="outline" className="text-xs">{all.length} alertas</Badge>
      </div>

      {all.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">No hay documentos por vencer</p>
      ) : (
        <div className="space-y-2">
          {all.map((doc) => (
            <div key={doc.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-accent/50 transition-colors group cursor-pointer">
              {doc.status === "expired" ? (
                <XCircle className="h-4 w-4 text-destructive shrink-0" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-warning shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{doc.name}</p>
                <p className="text-xs text-muted-foreground">
                  {doc.expiryDate && (
                    doc.status === "expired"
                      ? `Venció: ${doc.expiryDate}`
                      : `Vence: ${doc.expiryDate}`
                  )}
                </p>
              </div>
              <Badge variant="outline" className={`text-xs shrink-0 ${doc.status === "expired" ? "badge-expired" : "badge-expiring"}`}>
                {doc.status === "expired" ? "Vencido" : "Por vencer"}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
