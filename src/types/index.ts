// src/types/index.ts
export interface DashboardStat {
  label: string;
  value: number | string;
  trend: number;
  icon: string;
}

export interface SidebarItem {
  icon: any; // Lucide icon
  label: string;
  path: string;
}
