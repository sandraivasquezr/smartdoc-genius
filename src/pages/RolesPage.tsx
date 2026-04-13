import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Shield, Users, Eye, Pencil, Trash2, Plus } from "lucide-react";

const roles = [
  { name: "Administrador", description: "Acceso total al sistema", users: 2, permissions: { read: true, write: true, delete: true } },
  { name: "Editor", description: "Puede subir y editar documentos", users: 5, permissions: { read: true, write: true, delete: false } },
  { name: "Lector", description: "Solo puede ver y descargar documentos", users: 12, permissions: { read: true, write: false, delete: false } },
];

export default function RolesPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" /> Configuración de Roles
          </h2>
          <p className="text-muted-foreground text-sm">Define permisos de acceso para tu organización</p>
        </div>
        <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> Nuevo Rol</Button>
      </div>

      <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 text-sm text-warning flex items-start gap-2">
        <Shield className="h-4 w-4 mt-0.5 shrink-0" />
        <span>La gestión de roles estará disponible al conectar el sistema de autenticación. Esta es una vista previa de la interfaz.</span>
      </div>

      <div className="space-y-4">
        {roles.map((role) => (
          <div key={role.name} className="rounded-xl border bg-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{role.name}</h3>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </div>
              <Badge variant="secondary" className="gap-1"><Users className="h-3 w-3" /> {role.users} usuarios</Badge>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 text-sm"><Eye className="h-4 w-4 text-muted-foreground" /> Lectura</div>
                <Switch checked={role.permissions.read} disabled />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 text-sm"><Pencil className="h-4 w-4 text-muted-foreground" /> Escritura</div>
                <Switch checked={role.permissions.write} disabled />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 text-sm"><Trash2 className="h-4 w-4 text-muted-foreground" /> Eliminación</div>
                <Switch checked={role.permissions.delete} disabled />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
