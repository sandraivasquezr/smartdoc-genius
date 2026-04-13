import { useState } from "react";
import { documents, folders, tags as allTags } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileText, FileSpreadsheet, File, Search, Grid3X3, List, Eye, Download, MoreHorizontal,
  FolderOpen, Tag, Filter,
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const typeIcon: Record<string, React.ElementType> = {
  pdf: FileText, docx: FileText, xlsx: FileSpreadsheet, image: FileText, other: File,
};

export default function Documents() {
  const [search, setSearch] = useState("");
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("list");
  const [previewDoc, setPreviewDoc] = useState<typeof documents[0] | null>(null);

  const filtered = documents.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchFolder = !activeFolder || d.folder === activeFolder;
    const matchTag = !activeTag || d.tags.includes(activeTag);
    return matchSearch && matchFolder && matchTag;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Documentos</h2>
        <p className="text-muted-foreground text-sm">Explora y gestiona tus archivos</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por nombre o etiqueta..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <FolderOpen className="h-4 w-4" />
                {activeFolder ? folders.find(f => f.id === activeFolder)?.name : "Carpeta"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setActiveFolder(null)}>Todas</DropdownMenuItem>
              {folders.map((f) => (
                <DropdownMenuItem key={f.id} onClick={() => setActiveFolder(f.id)}>{f.name}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Tag className="h-4 w-4" />
                {activeTag || "Etiqueta"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setActiveTag(null)}>Todas</DropdownMenuItem>
              {allTags.map((t) => (
                <DropdownMenuItem key={t} onClick={() => setActiveTag(t)}>{t}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex border rounded-md">
            <Button variant={view === "list" ? "secondary" : "ghost"} size="icon" className="h-8 w-8 rounded-r-none" onClick={() => setView("list")}><List className="h-4 w-4" /></Button>
            <Button variant={view === "grid" ? "secondary" : "ghost"} size="icon" className="h-8 w-8 rounded-l-none" onClick={() => setView("grid")}><Grid3X3 className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>

      {/* Document List */}
      {view === "list" ? (
        <div className="rounded-xl border bg-card overflow-hidden">
          <div className="grid grid-cols-[1fr_120px_100px_120px_40px] gap-4 px-4 py-2.5 text-xs font-medium text-muted-foreground border-b bg-muted/30">
            <span>Nombre</span><span>Carpeta</span><span>Tamaño</span><span>Fecha</span><span></span>
          </div>
          {filtered.map((doc) => {
            const Icon = typeIcon[doc.type] || File;
            return (
              <div key={doc.id} className="grid grid-cols-[1fr_120px_100px_120px_40px] gap-4 px-4 py-3 items-center hover:bg-accent/30 transition-colors border-b last:border-0 cursor-pointer" onClick={() => setPreviewDoc(doc)}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{doc.name}</p>
                    <div className="flex gap-1 mt-0.5">
                      {doc.tags.slice(0, 2).map((t) => (
                        <Badge key={t} variant="secondary" className="text-[10px] px-1.5 py-0">{t}</Badge>
                      ))}
                      {doc.status !== "active" && (
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${doc.status === "expired" ? "badge-expired" : "badge-expiring"}`}>
                          {doc.status === "expired" ? "Vencido" : "Por vencer"}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{folders.find(f => f.id === doc.folder)?.name}</span>
                <span className="text-xs text-muted-foreground">{doc.size}</span>
                <span className="text-xs text-muted-foreground">{doc.uploadedAt}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setPreviewDoc(doc)}><Eye className="h-4 w-4 mr-2" /> Vista previa</DropdownMenuItem>
                    <DropdownMenuItem><Download className="h-4 w-4 mr-2" /> Descargar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="p-8 text-center text-sm text-muted-foreground">No se encontraron documentos</div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((doc) => {
            const Icon = typeIcon[doc.type] || File;
            return (
              <div key={doc.id} className="rounded-xl border bg-card p-4 hover:shadow-md transition-shadow cursor-pointer space-y-3" onClick={() => setPreviewDoc(doc)}>
                <div className="h-24 rounded-lg bg-muted/50 flex items-center justify-center">
                  <Icon className="h-10 w-10 text-muted-foreground/50" />
                </div>
                <div>
                  <p className="text-sm font-medium truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.size} · {doc.uploadedAt}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {doc.tags.slice(0, 2).map((t) => (
                    <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Preview Dialog */}
      <Dialog open={!!previewDoc} onOpenChange={() => setPreviewDoc(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base">{previewDoc?.name}</DialogTitle>
          </DialogHeader>
          {previewDoc && (
            <div className="space-y-4">
              <div className="h-48 rounded-lg bg-muted/50 flex items-center justify-center">
                <FileText className="h-16 w-16 text-muted-foreground/30" />
                <span className="ml-2 text-sm text-muted-foreground">Vista previa no disponible</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Tipo:</span> <span className="font-medium">{previewDoc.type.toUpperCase()}</span></div>
                <div><span className="text-muted-foreground">Tamaño:</span> <span className="font-medium">{previewDoc.size}</span></div>
                <div><span className="text-muted-foreground">Subido por:</span> <span className="font-medium">{previewDoc.uploadedBy}</span></div>
                <div><span className="text-muted-foreground">Fecha:</span> <span className="font-medium">{previewDoc.uploadedAt}</span></div>
                {previewDoc.expiryDate && (
                  <div className="col-span-2"><span className="text-muted-foreground">Vencimiento:</span> <span className="font-medium">{previewDoc.expiryDate}</span>
                    <Badge variant="outline" className={`ml-2 text-xs ${previewDoc.status === "expired" ? "badge-expired" : previewDoc.status === "expiring" ? "badge-expiring" : "badge-active"}`}>
                      {previewDoc.status === "expired" ? "Vencido" : previewDoc.status === "expiring" ? "Por vencer" : "Activo"}
                    </Badge>
                  </div>
                )}
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Etiquetas:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {previewDoc.tags.map((t) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Descargar</Button>
                <Button size="sm" className="gap-2"><Eye className="h-4 w-4" /> Abrir</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
