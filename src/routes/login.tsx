import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, ShieldCheck, KeyRound, FileLock2, ArrowRight, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import logo from "@/assets/logo.svg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — NAS | Sultanate of Oman" },
      { name: "description", content: "Sign in to the National Addressing System — Ministry of Housing and Urban Planning." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  const [rtl, setRtl] = useState(false);
  const navigate = useNavigate();

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="relative min-h-dvh overflow-hidden bg-background">
      {/* Background */}
      <div className="map-bg absolute inset-0" />
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />

      <div className="relative flex min-h-dvh flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-5 md:px-12">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Ministry of Housing and Urban Planning"
              className="h-12 w-auto max-w-full object-contain dark:brightness-0 dark:invert"
            />
          </div>
          <button
            onClick={() => setRtl((r) => !r)}
            className="rounded-md border border-border bg-card/80 px-3 py-1.5 text-xs font-medium backdrop-blur transition hover:bg-card"
          >
            {rtl ? "English" : "العربية"}
          </button>
        </header>

        {/* Main */}
        <div className="grid flex-1 grid-cols-1 gap-10 px-6 pb-12 md:grid-cols-2 md:px-12 lg:px-20">
          {/* Hero */}
          <div className="hidden flex-col justify-center md:flex">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> National Addressing System (NAS)
            </div>
            <h1 className="mt-5 font-display text-5xl font-semibold tracking-tight">
              National <span className="text-gradient-brand">Addressing</span> System
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              The unified platform for sign management, address registry, GIS operations, and integrations across the Sultanate of Oman.
            </p>

            <div className="mt-8 grid max-w-md grid-cols-3 gap-3">
              {[
                { v: "96K+", l: "Signs Managed" },
                { v: "11", l: "Governorates" },
                { v: "18", l: "Integrations" },
              ].map((s) => (
                <div key={s.l} className="glass rounded-xl p-3 shadow-elev-1">
                  <div className="font-display text-xl font-semibold text-gradient-brand">{s.v}</div>
                  <div className="text-[11px] text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {[
                { i: ShieldCheck, t: "OIDC Enabled" },
                { i: KeyRound, t: "RBAC Secured" },
                { i: FileLock2, t: "Audit Logging" },
              ].map((b) => (
                <span key={b.t} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-2.5 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur">
                  <b.i className="h-3 w-3 text-success" />{b.t}
                </span>
              ))}
            </div>
          </div>

          {/* Login card */}
          <div className="flex items-center justify-center">
            <div className="glass w-full max-w-md rounded-2xl p-7 shadow-elev-3 md:p-8">
              <h2 className="text-xl font-semibold">Sign in to NAS</h2>
              <p className="mt-1 text-sm text-muted-foreground">Use your ministry credentials or single sign-on.</p>

              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate({ to: "/dashboard" });
                }}
              >
                <div className="space-y-1.5">
                  <Label htmlFor="user">Username</Label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="user" defaultValue="s.alhinai" className="h-11 pl-9" placeholder="firstname.lastname" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pw">Password</Label>
                    <button type="button" className="text-xs font-medium text-primary hover:underline">Forgot password?</button>
                  </div>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="pw" type={showPw ? "text" : "password"} defaultValue="••••••••••" className="h-11 pl-9 pr-10" />
                    <button type="button" onClick={() => setShowPw((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label="Toggle password visibility">
                      {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox id="remember" defaultChecked />
                  <Label htmlFor="remember" className="text-sm font-normal">Remember me on this device</Label>
                </div>

                <Button type="submit" className="h-11 w-full gradient-brand text-primary-foreground shadow-elev-2 hover:opacity-95">
                  Sign In <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>

                <div className="relative py-1">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-[11px] uppercase tracking-wider text-muted-foreground">or</span>
                </div>

                <Button type="button" variant="outline" className="h-11 w-full gap-2" onClick={() => navigate({ to: "/dashboard" })}>
                  <ShieldCheck className="h-4 w-4 text-primary" /> Sign In with MoHUP SSO
                </Button>
              </form>

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-muted-foreground">
                <Link to="/login" className="hover:text-foreground">Privacy notice</Link>
                <span className="h-1 w-1 rounded-full bg-border" />
                <Link to="/login" className="hover:text-foreground">Terms of use</Link>
                <span className="h-1 w-1 rounded-full bg-border" />
                <Link to="/login" className="hover:text-foreground">Help desk</Link>
              </div>
            </div>
          </div>
        </div>

        <footer className="border-t border-border/60 bg-card/40 px-6 py-4 text-[11px] text-muted-foreground backdrop-blur md:px-12">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>© {new Date().getFullYear()} Ministry of Housing and Urban Planning · Sultanate of Oman</div>
            <div>v4.2.1 · Build 20260612</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
