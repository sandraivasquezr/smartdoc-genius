import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Settings className="h-6 w-6 text-primary" /> Configuración
        </h2>
        <p className="text-muted-foreground text-sm">Preferencias generales del sistema</p>
      </div>
      <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
        <p className="text-sm">Módulo de configuración disponible próximamente.</p>
      </div>
    </div>
  );
}
