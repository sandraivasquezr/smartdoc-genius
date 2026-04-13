import { useState } from "react";
import { documents, folders, tags as allTags } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileText, FileSpreadsheet, File, X, SlidersHorizontal } from "lucide-react";

const typeIcon: Record<string, React.ElementType> = {
  pdf: FileText, docx: FileText, xlsx: FileSpreadsheet, image: FileText, other: File,
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = documents.filter((d) => {
    const matchQuery = !query || d.name.toLowerCase().includes(query.toLowerCase()) || d.tags.some(t => t.includes(query.toLowerCase()));
    const matchTags = selectedTags.length === 0 || selectedTags.some(t => d.tags.includes(t));
    const matchType = !selectedType || d.type === selectedType;
    return matchQuery && matchTags && matchType;
  });

  const toggleTag = (tag: string) => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Búsqueda Global</h2>
        <p className="text-muted-foreground text-sm">Encuentra cualquier documento con filtros avanzados</p>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar documentos..." className="pl-9 h-11" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Button variant="outline" className="gap-2" onClick={() => setShowFilters(!showFilters)}>
          <SlidersHorizontal className="h-4 w-4" /> Filtros
        </Button>
      </div>

      {showFilters && (
        <div className="rounded-xl border bg-card p-4 space-y-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Tipo de archivo</p>
            <div className="flex gap-2">
              {["pdf", "docx", "xlsx"].map((t) => (
                <Button key={t} variant={selectedType === t ? "default" : "outline"} size="sm" onClick={() => setSelectedType(selectedType === t ? null : t)}>
                  {t.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Etiquetas</p>
            <div className="flex flex-wrap gap-1.5">
              {allTags.map((t) => (
                <Badge key={t} variant={selectedTags.includes(t) ? "default" : "outline"} className="cursor-pointer" onClick={() => toggleTag(t)}>
                  {t}
                </Badge>
              ))}
            </div>
          </div>
          {(selectedTags.length > 0 || selectedType) && (
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => { setSelectedTags([]); setSelectedType(null); }}>
              <X className="h-3 w-3 mr-1" /> Limpiar filtros
            </Button>
          )}
        </div>
      )}

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">{filtered.length} resultados</p>
        {filtered.map((doc) => {
          const Icon = typeIcon[doc.type] || File;
          return (
            <div key={doc.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{doc.name}</p>
                <p className="text-xs text-muted-foreground">
                  {folders.find(f => f.id === doc.folder)?.name} · {doc.size} · {doc.uploadedAt}
                </p>
              </div>
              <div className="flex gap-1 shrink-0">
                {doc.tags.slice(0, 2).map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
