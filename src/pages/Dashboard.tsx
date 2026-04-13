import { StatsCards } from "@/components/StatsCards";
import { ExpiryWidget } from "@/components/ExpiryWidget";
import { RecentDocuments } from "@/components/RecentDocuments";

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground text-sm">Resumen de tu gestión documental</p>
      </div>
      <StatsCards />
      <div className="grid lg:grid-cols-2 gap-6">
        <ExpiryWidget />
        <RecentDocuments />
      </div>
    </div>
  );
}
