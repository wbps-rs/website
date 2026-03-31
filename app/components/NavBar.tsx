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
      className={cn("relative flex items-center justify-between p-4", open ? "bg-background" : "")}
    >
      <Link
        to="/"
        className={buttonVariants({
          variant: "link",
          size: "lg",
        })}
      >
        <BrandIcon className="rounded-lg" />
        wbps
      </Link>

      <Button
        onClick={() => setOpen(!open)}
        variant="ghost"
        size="icon-lg"
        className={cn("z-50 transition md:hidden", open ? "rotate-90" : "")}
      >
        {open ? <X /> : <Menu />}
      </Button>

      {open && (
        <Separator className="absolute top-full left-1/2 z-50 w-screen -translate-x-1/2 md:hidden" />
      )}

      <div
        className={cn(
          "absolute top-full right-0 left-0 z-40 flex min-h-svh w-full flex-col items-end gap-2 bg-background px-12 pt-6 pb-6 transition-all duration-300 md:static md:ml-auto md:h-auto md:min-h-0 md:w-auto md:translate-y-0 md:flex-row md:justify-end md:bg-transparent md:p-0 md:opacity-100",
          open ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0",
        )}
      >
        <Link
          to="/docs"
          target="_blank"
          className={buttonVariants({
            variant: "link",
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
            variant: "link",
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
            variant: "link",
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
