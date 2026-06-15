import { Link } from "@tanstack/react-router";
import { Bell, Search, Globe, Menu, ChevronDown, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AppHeader({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const [dark, setDark] = useState(false);
  const [rtl, setRtl] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  useEffect(() => {
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }, [rtl]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur-md md:px-6">
      <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="md:hidden">
        <Menu className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="hidden md:inline-flex">
        <Menu className="h-5 w-5" />
      </Button>

      <div className="relative hidden flex-1 max-w-xl md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search signs, addresses, tasks, incidents…"
          className="h-10 rounded-lg border-border/70 bg-background pl-10 pr-16"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground md:inline">⌘K</kbd>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <Button variant="ghost" size="sm" onClick={() => setRtl((r) => !r)} className="hidden gap-1.5 md:inline-flex">
          <Globe className="h-4 w-4" />
          <span className="text-xs font-medium">{rtl ? "EN" : "العربية"}</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setDark((d) => !d)}>
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-card" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              { t: "Approval pending", d: "Sign batch BTH-2284 awaiting review" },
              { t: "Integration alert", d: "Amalak latency above threshold (312ms)" },
              { t: "Quality flag", d: "18 duplicate addresses in Ad Dakhiliyah" },
            ].map((n, i) => (
              <DropdownMenuItem key={i} className="flex-col items-start gap-0.5 py-2">
                <span className="text-sm font-medium">{n.t}</span>
                <span className="text-xs text-muted-foreground">{n.d}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="mx-2 hidden h-6 w-px bg-border md:block" />

        <div className="hidden items-center gap-2 md:flex">
          <Badge variant="outline" className="border-primary/30 bg-primary/5 text-[10px] font-medium text-primary">
            Director
          </Badge>
          <Badge variant="outline" className="border-info/30 bg-info/5 text-[10px] font-medium text-info">
            Muscat
          </Badge>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-1 flex items-center gap-2 rounded-full p-1 pr-2 transition hover:bg-accent">
              <div className="grid h-8 w-8 place-items-center rounded-full gradient-brand text-[11px] font-semibold text-primary-foreground">
                SA
              </div>
              <span className="hidden text-sm font-medium md:inline">Salim Al Hinai</span>
              <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground md:inline" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="text-sm font-medium">Salim Al Hinai</div>
              <div className="text-xs text-muted-foreground">salim.alhinai@mohup.gov.om</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Audit log</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/login">Sign out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
