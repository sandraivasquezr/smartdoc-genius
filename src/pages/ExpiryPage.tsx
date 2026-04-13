import { documents } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, XCircle, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ExpiryPage() {
  const expired = documents.filter(d => d.status === "expired");
  const expiring = documents.filter(d => d.status === "expiring");
  const withExpiry = documents.filter(d => d.expiryDate);

  const renderList = (docs: typeof documents) => (
    <div className="space-y-1">
      {docs.map(doc => (
        <div key={doc.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer border">
          {doc.status === "expired" ? <XCircle className="h-4 w-4 text-destructive shrink-0" /> :
           doc.status === "expiring" ? <AlertTriangle className="h-4 w-4 text-warning shrink-0" /> :
           <CheckCircle className="h-4 w-4 text-success shrink-0" />}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{doc.name}</p>
            <p className="text-xs text-muted-foreground">Vencimiento: {doc.expiryDate}</p>
          </div>
          <Badge variant="outline" className={`text-xs ${doc.status === "expired" ? "badge-expired" : doc.status === "expiring" ? "badge-expiring" : "badge-active"}`}>
            {doc.status === "expired" ? "Vencido" : doc.status === "expiring" ? "Por vencer" : "Activo"}
          </Badge>
        </div>
      ))}
      {docs.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">Sin documentos en esta categoría</p>}
    </div>
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Clock className="h-6 w-6 text-primary" /> Control de Vencimientos
        </h2>
        <p className="text-muted-foreground text-sm">Monitorea documentos con fecha de caducidad</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border bg-card p-4 text-center">
          <XCircle className="h-6 w-6 text-destructive mx-auto mb-1" />
          <p className="text-2xl font-bold">{expired.length}</p>
          <p className="text-xs text-muted-foreground">Vencidos</p>
        </div>
        <div className="rounded-xl border bg-card p-4 text-center">
          <AlertTriangle className="h-6 w-6 text-warning mx-auto mb-1" />
          <p className="text-2xl font-bold">{expiring.length}</p>
          <p className="text-xs text-muted-foreground">Por vencer (30 días)</p>
        </div>
        <div className="rounded-xl border bg-card p-4 text-center">
          <CheckCircle className="h-6 w-6 text-success mx-auto mb-1" />
          <p className="text-2xl font-bold">{withExpiry.length}</p>
          <p className="text-xs text-muted-foreground">Con fecha asignada</p>
        </div>
      </div>

      <Tabs defaultValue="expired">
        <TabsList>
          <TabsTrigger value="expired" className="gap-1">Vencidos <Badge variant="destructive" className="text-xs ml-1">{expired.length}</Badge></TabsTrigger>
          <TabsTrigger value="expiring" className="gap-1">Por vencer <Badge className="text-xs ml-1 bg-warning text-warning-foreground">{expiring.length}</Badge></TabsTrigger>
          <TabsTrigger value="all">Todos</TabsTrigger>
        </TabsList>
        <TabsContent value="expired" className="mt-4">{renderList(expired)}</TabsContent>
        <TabsContent value="expiring" className="mt-4">{renderList(expiring)}</TabsContent>
        <TabsContent value="all" className="mt-4">{renderList(withExpiry)}</TabsContent>
      </Tabs>
    </div>
  );
}
