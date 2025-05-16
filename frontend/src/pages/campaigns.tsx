import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { Switch } from "../components/ui/switch"
import { api } from "@/lib/api"

type Campaign = {
  _id: string
  name: string
  status: "active" | "inactive" | "deleted"
  description: string
  accountIDs: string[]
  leads: string[]
  createdAt: string
  updatedAt: string
}

export function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[] | []>([])

  useEffect(() => {
    getAllCampaigns()
  },[])

  const toggleStatus = (id: string) => {
    setCampaigns(
      campaigns.map((campaign) => {
        if (campaign._id === id) {
          const newStatus = campaign.status === "active" ? "inactive" : "active"
          return { ...campaign, status: newStatus }
        }
        return campaign
      }),
    )
  }

  const deleteCampaign = (id: string) => {
    setCampaigns(
      campaigns.map((campaign) => {
        if (campaign._id === id) {
          return { ...campaign, status: "deleted" }
        }
        return campaign
      }),
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>
      case "deleted":
        return <Badge variant="destructive">Deleted</Badge>
      default:
        return null
    }
  }

  const getAllCampaigns = async () => {
    try {
        const response = await api.get('/campaign')
        console.log('Campaigns fetched successfully', response.data)
        setCampaigns(response.data)
    } catch (error) {
        console.log('Error fetching campaigns',error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Campaigns</h1>
        <Button>New Campaign</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
          <CardDescription>Manage your outreach campaigns and track their status.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign._id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                  <TableCell className="hidden max-w-xs truncate md:table-cell">{campaign.description}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center gap-2" disabled={campaign.status === "deleted"}>
                          <Edit className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-2"
                          onClick={() => toggleStatus(campaign._id)}
                          disabled={campaign.status === "deleted"}
                        >
                          <Switch checked={campaign.status === "active"} className="mr-2" />
                          {campaign.status === "active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-2 text-destructive focus:text-destructive"
                          onClick={() => deleteCampaign(campaign._id)}
                          disabled={campaign.status === "deleted"}
                        >
                          <Trash className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
