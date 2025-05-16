import { useState } from "react"
import { ThemeProvider } from "./components/theme-provider"
import { Sidebar } from "./components/sidebar"
import { MobileNav } from "./components/mobile-nav"
import { Campaigns } from "./pages/campaigns"
import { CreateCampaign } from "./pages/create-campaign"
import { ScrapedLeads } from "./pages/scraped-leads"
import { GenerateMessage } from "./pages/generate-message"
import { ToastContainer } from 'react-toastify'

type Page = "campaigns" | "create-campaign" | "scraped-leads" | "generate-message"

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("campaigns")

  const renderPage = () => {
    switch (currentPage) {
      case "campaigns":
        return <Campaigns />
      case "create-campaign":
        return <CreateCampaign />
      case "scraped-leads":
        return <ScrapedLeads />
      case "generate-message":
        return <GenerateMessage />
      default:
        return <Campaigns />
    }
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="campaign-dashboard-theme">
      <div className="flex min-h-screen bg-background">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="flex-1 flex flex-col">
          <header className="border-b p-4 flex items-center md:hidden">
            <MobileNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <h1 className="text-lg font-semibold ml-2">Campaign Manager</h1>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{renderPage()}</main>
        </div>
        <div>
          <ToastContainer />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
