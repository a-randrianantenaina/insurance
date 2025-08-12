"use client";

import { NotificationCenter } from "@/components/notifications/notification-center";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Menu, Shield, User, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function Navigation() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const linkItems = [
    { href: "/offres", label: "Nos Offres" },
    { href: "/simulation", label: "Simulation" },
    { href: "/about", label: "À Propos" },
    { href: "/contact", label: "Contact" },
  ];
  const navRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  // Nouvelle logique pour empêcher la ré-exécution des animations d'entrée après le premier rendu
  const hasPlayedEntranceRef = useRef(false);
  const playEntranceAnimations = !hasPlayedEntranceRef.current;
  useEffect(() => {
    hasPlayedEntranceRef.current = true;
  }, []);
  const initialAnim = (v: any) => (playEntranceAnimations ? v : false);

  // Debug logging
  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);
  }, [session, status]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  useEffect(() => {
    const activeIndex = linkItems.findIndex((i) => i.href === pathname);
    if (activeIndex === -1) {
      setIndicator({ left: 0, width: 0 });
      return;
    }
    const el = linkRefs.current[activeIndex];
    const navEl = navRef.current;
    if (el && navEl) {
      const elRect = el.getBoundingClientRect();
      const navRect = navEl.getBoundingClientRect();
      setIndicator({
        left: elRect.left - navRect.left,
        width: elRect.width,
      });
    }
  }, [pathname]);

  useEffect(() => {
    const handle = () => {
      const activeIndex = linkItems.findIndex((i) => i.href === pathname);
      const el = linkRefs.current[activeIndex];
      const navEl = navRef.current;
      if (el && navEl) {
        const elRect = el.getBoundingClientRect();
        const navRect = navEl.getBoundingClientRect();
        setIndicator({
          left: elRect.left - navRect.left,
          width: elRect.width,
        });
      }
    };
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, [pathname, linkItems]);

  // Affichage du statut de chargement
  if (status === "loading") {
    return (
      <motion.nav
        className="border-b bg-background/80 backdrop-blur-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="h-6 w-6" />
              </motion.div>
              <span className="font-bold">AssuranceConnect</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            {/* loading spinner color */}
            <motion.div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-[hsl(var(--primary))]" />
          </div>
        </div>
      </motion.nav>
    );
  }

  return (
    <motion.nav
      ref={navRef}
      className="relative sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md"
      initial={initialAnim({ y: -100 })}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto flex h-16 items-center px-4">
        <motion.div
          className="flex items-center"
          initial={initialAnim({ opacity: 0, x: -20 })}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/" className="flex items-center space-x-2">
            <motion.span
              className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent"
              whileHover={{
                scale: 1.05,
                textShadow: "0px 0px 8px hsl(var(--primary) / 0.4)",
              }}
              transition={{ duration: 0.2 }}
            >
              Assuréo
            </motion.span>
          </Link>
        </motion.div>

        <motion.div
          className="flex flex-1 items-center justify-center space-x-4"
          initial={initialAnim({ opacity: 0 })}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            className="hidden items-center space-x-8 md:flex"
            initial={initialAnim({ opacity: 0 })}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {linkItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.href}
                  initial={initialAnim({ opacity: 0, y: -10 })}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    ref={(el) => {
                      linkRefs.current[index] = el;
                    }}
                    className={`relative inline-flex justify-center text-sm font-medium transition-colors min-w-[90px] px-1 ${
                      isActive
                        ? "text-[hsl(var(--primary))]"
                        : "text-muted-foreground hover:text-[hsl(var(--primary))]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          className="flex items-center space-x-4"
          initial={initialAnim({ opacity: 0, x: 20 })}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {session?.user ? (
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <NotificationCenter />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={session.user.image || ""}
                          alt={session.user.name || ""}
                        />
                        <AvatarFallback>
                          {getInitials(session.user.name || "U")}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{session.user.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    {(session.user as any).role === "ADMIN" ? (
                      <Link href="/admin" className="flex items-center">
                        <Shield className="mr-2 h-4 w-4" />
                        Administration
                      </Link>
                    ) : (
                      <Link href="/client" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Espace Client
                      </Link>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          ) : (
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild>
                  <Link href="/register">Inscription</Link>
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Menu mobile */}
          <motion.div
            className="md:hidden"
            initial={initialAnim({ opacity: 0 })}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Menu mobile ouvert */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="border-t md:hidden"
            initial={{ opacity: 0, height: 0 }} // conserve animations d'ouverture du menu (interaction volontaire)
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div
              className="space-y-1 px-4 pb-3 pt-2"
              initial={initialAnim({ opacity: 0 })}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              {linkItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={initialAnim({ opacity: 0, x: -20 })}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                        isActive
                          ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"
                          : "text-foreground/80 hover:bg-[hsl(var(--accent)/0.6)] hover:text-foreground"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              {session?.user && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                >
                  <Link
                    href={
                      (session.user as any).role === "ADMIN"
                        ? "/admin"
                        : "/client"
                    }
                  >
                    <Button className="w-full justify-start" variant="ghost">
                      <User className="mr-2 h-4 w-4" />
                      {(session.user as any).role === "ADMIN"
                        ? "Administration"
                        : "Espace Client"}
                    </Button>
                  </Link>
                </motion.div>
              )}

              {session?.user && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, delay: 0.25 }}
                >
                  <Button
                    className="w-full justify-start"
                    variant="ghost"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </Button>
                </motion.div>
              )}

              {!session && (
                <motion.div
                  className="space-y-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                >
                  <Link href="/register">
                    <Button className="w-full">Inscription</Button>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicateur global (desktop uniquement) */}
      {indicator.width > 0 && (
        <motion.div
          key={pathname}
          className="pointer-events-none absolute bottom-0 h-[3px] rounded-t bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] md:block hidden"
          initial={{ opacity: 0, scaleX: 0, transformOrigin: "left" }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.25 }}
          style={{ left: indicator.left, width: indicator.width }}
        />
      )}
    </motion.nav>
  );
}
