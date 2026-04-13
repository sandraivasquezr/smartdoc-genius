export interface Document {
  id: string;
  name: string;
  type: "pdf" | "docx" | "xlsx" | "image" | "other";
  folder: string;
  tags: string[];
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  expiryDate?: string;
  status: "active" | "expiring" | "expired";
  preview?: string;
}

export interface Folder {
  id: string;
  name: string;
  icon: string;
  count: number;
  children?: Folder[];
}

export interface AuditEntry {
  id: string;
  user: string;
  action: "upload" | "view" | "edit" | "delete" | "download" | "share";
  target: string;
  timestamp: string;
  details?: string;
}

export const folders: Folder[] = [
  { id: "contracts", name: "Contratos", icon: "FileText", count: 12 },
  { id: "invoices", name: "Facturas", icon: "Receipt", count: 34 },
  { id: "policies", name: "Pólizas", icon: "Shield", count: 8 },
  { id: "hr", name: "Recursos Humanos", icon: "Users", count: 21 },
  { id: "legal", name: "Legal", icon: "Scale", count: 15 },
  { id: "reports", name: "Informes", icon: "BarChart3", count: 9 },
];

export const tags = [
  "urgente", "revisión", "aprobado", "pendiente", "confidencial",
  "fiscal-2024", "fiscal-2023", "renovación", "cliente-a", "cliente-b",
];

const today = new Date();
const addDays = (d: Date, n: number) => {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r.toISOString().split("T")[0];
};

export const documents: Document[] = [
  { id: "1", name: "Contrato-Proveedor-ABC.pdf", type: "pdf", folder: "contracts", tags: ["aprobado", "cliente-a"], size: "2.4 MB", uploadedBy: "Ana García", uploadedAt: "2024-12-01", expiryDate: addDays(today, -5), status: "expired" },
  { id: "2", name: "Póliza-Seguro-2024.pdf", type: "pdf", folder: "policies", tags: ["renovación", "urgente"], size: "1.8 MB", uploadedBy: "Carlos López", uploadedAt: "2024-11-15", expiryDate: addDays(today, 12), status: "expiring" },
  { id: "3", name: "Factura-0042-Enero.xlsx", type: "xlsx", folder: "invoices", tags: ["fiscal-2024", "cliente-b"], size: "340 KB", uploadedBy: "María Ruiz", uploadedAt: "2025-01-10", status: "active" },
  { id: "4", name: "Informe-Trimestral-Q4.docx", type: "docx", folder: "reports", tags: ["revisión"], size: "5.1 MB", uploadedBy: "Pedro Sánchez", uploadedAt: "2025-01-05", status: "active" },
  { id: "5", name: "Contrato-Alquiler-Oficina.pdf", type: "pdf", folder: "contracts", tags: ["confidencial", "renovación"], size: "3.2 MB", uploadedBy: "Ana García", uploadedAt: "2024-10-20", expiryDate: addDays(today, 25), status: "expiring" },
  { id: "6", name: "Nóminas-Diciembre-2024.xlsx", type: "xlsx", folder: "hr", tags: ["fiscal-2024", "confidencial"], size: "890 KB", uploadedBy: "Laura Martín", uploadedAt: "2025-01-02", status: "active" },
  { id: "7", name: "Acuerdo-NDA-ClienteX.pdf", type: "pdf", folder: "legal", tags: ["confidencial", "aprobado"], size: "1.1 MB", uploadedBy: "Carlos López", uploadedAt: "2024-09-15", expiryDate: addDays(today, -15), status: "expired" },
  { id: "8", name: "Presupuesto-Proyecto-2025.xlsx", type: "xlsx", folder: "reports", tags: ["pendiente", "cliente-a"], size: "2.0 MB", uploadedBy: "María Ruiz", uploadedAt: "2025-01-12", expiryDate: addDays(today, 45), status: "active" },
  { id: "9", name: "Manual-Empleado-v3.pdf", type: "pdf", folder: "hr", tags: ["aprobado"], size: "4.5 MB", uploadedBy: "Laura Martín", uploadedAt: "2024-08-01", status: "active" },
  { id: "10", name: "Certificado-ISO-9001.pdf", type: "pdf", folder: "legal", tags: ["aprobado", "renovación"], size: "780 KB", uploadedBy: "Pedro Sánchez", uploadedAt: "2024-06-01", expiryDate: addDays(today, 8), status: "expiring" },
];

export const auditLog: AuditEntry[] = [
  { id: "a1", user: "Ana García", action: "upload", target: "Contrato-Proveedor-ABC.pdf", timestamp: "2025-01-13 09:15", details: "Carpeta: Contratos" },
  { id: "a2", user: "Carlos López", action: "view", target: "Póliza-Seguro-2024.pdf", timestamp: "2025-01-13 10:30" },
  { id: "a3", user: "María Ruiz", action: "edit", target: "Factura-0042-Enero.xlsx", timestamp: "2025-01-13 11:00", details: "Etiqueta añadida: fiscal-2024" },
  { id: "a4", user: "Pedro Sánchez", action: "download", target: "Informe-Trimestral-Q4.docx", timestamp: "2025-01-12 16:45" },
  { id: "a5", user: "Laura Martín", action: "share", target: "Nóminas-Diciembre-2024.xlsx", timestamp: "2025-01-12 14:20", details: "Compartido con: RRHH" },
  { id: "a6", user: "Ana García", action: "delete", target: "Borrador-Contrato-v1.pdf", timestamp: "2025-01-12 09:00" },
  { id: "a7", user: "Carlos López", action: "upload", target: "Certificado-ISO-9001.pdf", timestamp: "2025-01-11 15:30", details: "Carpeta: Legal" },
  { id: "a8", user: "María Ruiz", action: "view", target: "Manual-Empleado-v3.pdf", timestamp: "2025-01-11 11:15" },
];
