import { SiDiscord, SiGithub } from "@icons-pack/react-simple-icons";
import { ArrowUpRight, Book, Menu, X, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

import BrandIcon from "~/components/BrandIcon";
import { Button, buttonVariants } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

function NavBar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const openNavBar = (open: boolean) => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    setOpen(open);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        openNavBar(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close navbar on route change
  useEffect(() => {
    openNavBar(false);
  }, [location]);

  return (
    <nav
      className={cn(
        "sticky top-0 z-10 w-full border-b backdrop-blur-sm",
        open ? "bg-background" : "bg-background/70",
      )}
    >
      <div className="relative mx-auto flex items-center justify-between p-2 md:container">
        <Link
          to="/"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-1 px-2.5 text-lg md:text-xl"
        >
          <BrandIcon className="size-10" />
          wpbs
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <Button
            onClick={() => openNavBar(!open)}
            variant="ghost"
            size="icon-lg"
            className={cn(
              "transition md:hidden",
              open ? "rotate-90 aria-expanded:bg-transparent" : "",
            )}
            aria-expanded={open}
            aria-controls="navlink-container"
          >
            {open ? <X /> : <Menu />}
          </Button>

          <div
            id="navlink-container"
            className={cn(
              "absolute top-full right-0 left-0 z-20 flex min-h-screen w-full flex-col items-end gap-2 bg-background px-12 py-6 transition-all duration-300 md:static md:h-auto md:min-h-0 md:w-auto md:translate-y-0 md:flex-row md:justify-end md:bg-transparent md:p-0 md:opacity-100 md:transition-none",
              open
                ? "translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-4 opacity-0 md:pointer-events-auto",
            )}
          >
            <Link
              to="/dashboard"
              className={buttonVariants({
                variant: "ghost",
                size: "lg",
                className: "w-full justify-start md:w-auto md:justify-center",
              })}
            >
              <span className="flex items-center gap-2">
                <LayoutDashboard />
                Dashboard
              </span>
            </Link>

            <Link
              to="/docs"
              className={buttonVariants({
                variant: "ghost",
                size: "lg",
                className: "w-full justify-start md:w-auto md:justify-center",
              })}
            >
              <span className="flex items-center gap-2">
                <Book />
                Docs
              </span>
            </Link>

            <Link
              to="https://github.com/wpbs-rs"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "lg",
                className: "w-full justify-start md:w-auto md:justify-center",
              })}
            >
              <span className="flex items-center gap-2">
                <SiGithub />
                GitHub
              </span>
              <ArrowUpRight className="ml-auto md:ml-0" />
            </Link>

            <Link
              to="https://discord.gg/3bgCdYRupn"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "lg",
                className: "w-full justify-start md:w-auto md:justify-center",
              })}
            >
              <span className="flex items-center gap-2">
                <SiDiscord />
                Discord
              </span>
              <ArrowUpRight className="ml-auto md:ml-0" />
            </Link>
          </div>
        </div>
      </div>

      <Separator
        className={cn(
          "absolute top-full left-1/2 z-30 w-screen -translate-x-1/2 transition-opacity duration-300 md:opacity-0",
          open ? "opacity-100" : "opacity-0",
        )}
      />
    </nav>
  );
}

export default NavBar;
