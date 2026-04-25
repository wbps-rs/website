import { Link } from "react-router";

import { buttonVariants } from "~/components/ui/button";

function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="container mx-auto p-8 md:flex md:items-center md:justify-between">
        <p className="text-muted-foreground text-center text-sm md:text-left">
          © 2026 The wpbs Project
        </p>
        <div className="mt-6 text-center md:mt-0 md:text-right">
          <p className="text-muted-foreground text-sm">
            Licensed under
            <Link
              to="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              className={buttonVariants({
                variant: "link",
                className: "ps-1 pe-0 text-muted-foreground hover:text-foreground",
              })}
            >
              CC BY-SA 4.0
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
