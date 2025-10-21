'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Sidebar collapse state for desktop
  const [collapsed, setCollapsed] = React.useState(false);
  
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Auto-close mobile menu when route changes
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(v => !v)}
        mobileOpen={mobileMenuOpen}
        onMobileOpenChange={setMobileMenuOpen}
      />
      
      {/* Main content area with responsive margin */}
      <div 
        className={`min-h-screen transition-all duration-300 ease-in-out ${
          collapsed ? 'md:ml-20' : 'md:ml-72'
        }`}
      >
        <Header 
          collapsed={collapsed}
          onMenuClick={() => setMobileMenuOpen(true)}
        />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}