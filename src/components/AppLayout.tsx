import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UploadModal } from "@/components/UploadModal";

export function AppLayout() {
  const [uploadOpen, setUploadOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b px-4 bg-card">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
            </div>
            <Button size="sm" onClick={() => setUploadOpen(true)} className="gap-2">
              <Upload className="h-4 w-4" />
              Subir Archivo
            </Button>
          </header>
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
      <UploadModal open={uploadOpen} onOpenChange={setUploadOpen} />
    </SidebarProvider>
  );
}
