import { Link } from "react-router"
import BrandIcon from "~/components/BrandIcon"
import { buttonVariants } from "~/components/ui/button"

function Footer() {
  return (
    <footer className="flex w-full items-center justify-between bg-accent p-8">
      <div>
        <BrandIcon className="rounded-lg" />
        <p>© 2026 - 2026 The Wbps Project</p>
      </div>
      <div>
        <p>
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
