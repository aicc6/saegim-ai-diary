"use client";

import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import Sidebar from '@/components/layout/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useProtectedRoute();

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}
