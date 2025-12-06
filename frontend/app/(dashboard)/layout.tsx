
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// We need to implement AppSidebar component later
import { AppSidebar } from "@/components/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full flex">
         {/* Sidebar Trigger for mobile */}
        <SidebarTrigger className="md:hidden" />
        <div className="flex-1 p-4">
            {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
