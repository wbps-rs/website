import { Link } from "react-router"
import BrandIcon from "~/components/BrandIcon"
import { buttonVariants } from "~/components/ui/button"

function Footer() {
  return (
    <footer className="w-full bg-accent p-8 md:flex md:items-center md:justify-between">
      <div>
        <BrandIcon className="mx-auto rounded-lg md:mx-0" />
        <p className="text-center md:text-left">
          © 2026 - 2026 The Wbps Project
        </p>
      </div>
      <div>
        <p className="text-center md:text-right">
          Licensed under
          <Link
            to="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            className={buttonVariants({ variant: "link", className: "ps-1" })}
          >
            CC BY-SA 4.0.
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer
