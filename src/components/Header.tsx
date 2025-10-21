'use client';

import * as React from 'react';
import { Bell, Menu, Search, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  onMenuClick?: () => void;
  collapsed?: boolean;
}

const Header = ({ onMenuClick, collapsed }: HeaderProps) => {
  const pathname = usePathname();
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  // Convert current path into readable page title
  const pageTitle = React.useMemo(() => {
    if (pathname === '/') return 'Dashboard';
    const segment = pathname.split('/').filter(Boolean).pop() || 'Dashboard';
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border/60 bg-background/95 px-6 h-[73px] backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Left: Page title + optional mobile menu */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="rounded-xl"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <h1 className="text-xl font-bold tracking-tight">
          {pageTitle}
        </h1>
      </div>

      

      {/* Right: Icons + Avatar */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-xl h-11 w-11"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-xl h-11 w-11"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-4">
              <h3 className="font-semibold">Notifications</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                No new notifications
              </p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clerk Authentication */}
        <SignedOut>
          <SignInButton mode="modal">
            <Button size="sm" className="font-medium rounded-xl">
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center">
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10"
                }
              }}
            />
          </div>
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;