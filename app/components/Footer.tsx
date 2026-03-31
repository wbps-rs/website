import { Link } from "react-router";
import BrandIcon from "~/components/BrandIcon";
import { buttonVariants } from "~/components/ui/button";

function Footer() {
  return (
    <footer className="w-full border-t border-border/50 p-8 md:flex md:items-center md:justify-between">
      <div className="flex flex-col items-center gap-4 md:items-start">
        <BrandIcon className="h-8 w-auto rounded-lg" />
        <p className="text-center text-sm text-muted-foreground md:text-left">
          © 2026 - 2026 The Wbps Project
        </p>
      </div>
      <div className="mt-6 md:mt-0">
        <p className="text-center text-sm text-muted-foreground md:text-right">
          Licensed under
          <Link
            to="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            className={buttonVariants({
              variant: "link",
              className: "h-auto p-0 ps-1 text-muted-foreground hover:text-foreground",
            })}
          >
            CC BY-SA 4.0.
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
