import { SiDiscord, SiGithub } from "@icons-pack/react-simple-icons";
import { ArrowUpRight, Book, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import BrandIcon from "~/components/BrandIcon";
import { Button, buttonVariants } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={cn(
        "sticky top-0 z-10 flex items-center justify-between border-b bg-background/90 p-2 backdrop-blur-sm",
        open ? "bg-background" : "bg-background/70",
      )}
    >
      <Link
        to="/"
        className={buttonVariants({
          variant: "ghost",
          size: "lg",
          className: "z-20",
        })}
      >
        <BrandIcon className="size-8 rounded-lg" />
        <p className="text-lg md:text-xl">wbps</p>
      </Link>

      <Button
        onClick={() => setOpen(!open)}
        variant="ghost"
        size="icon-lg"
        className={cn("transition md:hidden", open ? "rotate-90" : "")}
        aria-expanded={open}
        aria-controls="navlink-container"
      >
        {open ? <X /> : <Menu />}
      </Button>

      <Separator
        className={cn(
          "absolute top-full left-1/2 z-20 w-screen -translate-x-1/2 transition-opacity duration-300 md:opacity-0",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div
        id="navlink-container"
        className={cn(
          "absolute top-full right-0 left-0 z-10 flex min-h-svh w-full flex-col items-end gap-2 bg-background px-12 pt-6 pb-6 transition-all duration-300 will-change-transform md:pointer-events-auto md:visible md:static md:ml-auto md:h-auto md:min-h-0 md:w-auto md:translate-y-0 md:flex-row md:justify-end md:bg-transparent md:p-0 md:opacity-100 md:transition-none",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-12 opacity-0",
        )}
      >
        <Link
          to="/docs"
          target="_blank"
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
          to="https://github.com/wbps-rs"
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
    </nav>
  );
}

export default NavBar;
