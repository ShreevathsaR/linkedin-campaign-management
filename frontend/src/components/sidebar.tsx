import { LayoutDashboard, Plus, Users, MessageSquare } from "lucide-react"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"

type Page = "campaigns" | "create-campaign" | "scraped-leads" | "generate-message"

interface SidebarProps {
  currentPage: Page
  setCurrentPage: (page: Page) => void
}

export function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  const navItems = [
    {
      id: "campaigns" as Page,
      label: "Campaigns",
      icon: LayoutDashboard,
    },
    {
      id: "create-campaign" as Page,
      label: "Create Campaign",
      icon: Plus,
    },
    {
      id: "scraped-leads" as Page,
      label: "Scraped Leads",
      icon: Users,
    },
    {
      id: "generate-message" as Page,
      label: "Generate Message",
      icon: MessageSquare,
    },
  ]

  return (
    <div className="hidden border-r bg-card md:block md:w-64">
      <div className="flex h-16 items-center border-b px-6">
        <img src="/vite.png" alt="Logo" className="h-8 w-8" />
        <h1 className="text-lg font-semibold">Campaign Manager</h1>
      </div>
      <nav className="space-y-1 p-4">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-left",
              currentPage === item.id && "bg-accent text-accent-foreground",
            )}
            onClick={() => setCurrentPage(item.id)}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </nav>
    </div>
  )
}
