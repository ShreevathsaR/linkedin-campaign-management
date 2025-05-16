import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Sidebar2 } from "./sidebar2"

type Page = "campaigns" | "create-campaign" | "scraped-leads" | "generate-message"

interface MobileNavProps {
  currentPage: Page
  setCurrentPage: (page: Page) => void
}

export function MobileNav({ currentPage, setCurrentPage }: MobileNavProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-xs p-0 sm:max-w-sm">
        <Sidebar2 currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </DialogContent>
    </Dialog>
  )
}
