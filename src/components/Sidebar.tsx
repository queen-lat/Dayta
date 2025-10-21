'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CreditCard,
  ShoppingBag,
  Receipt,
  Users,
  BarChart3,
  Settings,
  LifeBuoy,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Sheet, SheetContent } from '@/components/ui/sheet';

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const NAV_PRIMARY: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Buy Data', href: '/buy', icon: ShoppingBag },
  { label: 'Transactions', href: '/transactions', icon: Receipt },
  { label: 'Cards', href: '/cards', icon: CreditCard },
  { label: 'Customers', href: '/customers', icon: Users },
  { label: 'Reports', href: '/reports', icon: BarChart3 },
];

const NAV_SECONDARY: NavItem[] = [
  { label: 'Support', href: '/support', icon: LifeBuoy },
];

function cx(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(' ');
}

export default function Sidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileOpenChange,
}: {
  collapsed?: boolean;
  onToggle?: () => void;
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(collapsed ?? false);

  const handleToggle = () => {
    setIsCollapsed((v) => !v);
    onToggle?.();
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href) === true;

  const EXPANDED_W = 'w-72';
  const COLLAPSED_W = 'w-20';

  return (
    <TooltipProvider delayDuration={200}>
      {/* Desktop sidebar only */}
      <aside
        className={cx(
          'hidden md:fixed md:inset-y-0 md:z-40 md:flex md:flex-col',
          'border-r border-border/60 bg-background',
          'transition-[width] duration-300 ease-in-out',
          isCollapsed ? COLLAPSED_W : EXPANDED_W
        )}
      >
        {/* Top: Logo + collapse button */}
        <div className="flex h-[73px] items-center justify-between px-4 border-b border-border/60">
          <Link href="/" className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary shadow-lg">
              <img
                src="/dayta.png"
                alt="Dayta"
                className="h-6 w-6 object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            {!isCollapsed && (
              <span className="truncate text-lg font-bold tracking-tight">
                Dayta
              </span>
            )}
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="ml-auto rounded-xl hover:bg-accent transition-colors"
            onClick={handleToggle}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Middle: nav items */}
        <nav className="flex-1 overflow-y-auto px-3 py-6">
          <ul className="space-y-2">
            {NAV_PRIMARY.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              const inner = (
                <div
                  className={cx(
                    'group flex items-center gap-4 rounded-2xl px-4 py-3.5 text-[15px] font-medium transition-all duration-200',
                    active
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'text-foreground/70 hover:bg-accent hover:text-foreground'
                  )}
                >
                  <Icon 
                    className={cx(
                      'h-5 w-5 shrink-0 transition-transform duration-200',
                      active ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground',
                      !isCollapsed && 'group-hover:scale-110'
                    )} 
                  />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </div>
              );

              return (
                <li key={item.href}>
                  {isCollapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={item.href} className="block">
                          {inner}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="font-medium">
                        {item.label}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Link href={item.href} className="block">
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Secondary nav items */}
          <div className="mt-6">
            <ul className="space-y-2">
              {NAV_SECONDARY.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                const inner = (
                  <div
                    className={cx(
                      'group flex items-center gap-4 rounded-2xl px-4 py-3.5 text-[15px] font-medium transition-all duration-200',
                      active
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'text-foreground/70 hover:bg-accent hover:text-foreground'
                    )}
                  >
                    <Icon 
                      className={cx(
                        'h-5 w-5 shrink-0 transition-transform duration-200',
                        active ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground',
                        !isCollapsed && 'group-hover:scale-110'
                      )} 
                    />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </div>
                );

                return (
                  <li key={item.href}>
                    {isCollapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={item.href} className="block">
                            {inner}
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="font-medium">
                          {item.label}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <Link href={item.href} className="block">
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Bottom: settings button */}
        <div className="p-3 pb-4 border-t border-border/60">
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/settings"
                  className="flex items-center justify-center gap-4 rounded-2xl px-4 py-3.5 text-foreground/70 hover:bg-accent hover:text-foreground transition-all duration-200"
                >
                  <Settings className="h-5 w-5 text-muted-foreground" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-medium">
                Settings
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              href="/settings"
              className="flex items-center gap-4 rounded-2xl px-4 py-3.5 text-[15px] font-medium text-foreground/70 hover:bg-accent hover:text-foreground transition-all duration-200"
            >
              <Settings className="h-5 w-5 text-muted-foreground" />
              <span>Settings</span>
            </Link>
          )}
        </div>
      </aside>

      {/* Mobile Drawer */}
      <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
        <SheetContent side="left" className="p-0 w-72">
          <div className="flex h-full flex-col bg-background">
            <div className="flex h-[73px] items-center gap-3 px-4 border-b border-border/60">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary shadow-lg">
                <img
                  src="/dayta.png"
                  alt="Dayta"
                  className="h-6 w-6 object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Dayta
              </span>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-6">
              <ul className="space-y-2">
                {NAV_PRIMARY.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => onMobileOpenChange?.(false)}
                        className={cx(
                          'flex items-center gap-4 rounded-2xl px-4 py-3.5 text-[15px] font-medium transition-all duration-200',
                          active
                            ? 'bg-primary text-primary-foreground shadow-lg'
                            : 'text-foreground/70 hover:bg-accent hover:text-foreground'
                        )}
                      >
                        <Icon className={cx('h-5 w-5', active ? 'text-primary-foreground' : 'text-muted-foreground')} />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6">
                <ul className="space-y-2">
                  {NAV_SECONDARY.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => onMobileOpenChange?.(false)}
                          className={cx(
                            'flex items-center gap-4 rounded-2xl px-4 py-3.5 text-[15px] font-medium transition-all duration-200',
                            active
                              ? 'bg-primary text-primary-foreground shadow-lg'
                              : 'text-foreground/70 hover:bg-accent hover:text-foreground'
                          )}
                        >
                          <Icon className={cx('h-5 w-5', active ? 'text-primary-foreground' : 'text-muted-foreground')} />
                          <span className="truncate">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>

            <div className="p-3 pb-4 border-t border-border/60">
              <Link
                href="/settings"
                onClick={() => onMobileOpenChange?.(false)}
                className="flex items-center gap-4 rounded-2xl px-4 py-3.5 text-[15px] font-medium text-foreground/70 hover:bg-accent hover:text-foreground transition-all duration-200"
              >
                <Settings className="h-5 w-5 text-muted-foreground" />
                <span>Settings</span>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Spacer for desktop layout */}
      <div className="hidden md:block" aria-hidden style={{ width: isCollapsed ? 80 : 288 }} />
    </TooltipProvider>
  );
}