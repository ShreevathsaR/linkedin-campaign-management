import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Switch } from "../components/ui/switch";
import { api } from "@/lib/api";
import {
  Dialog,
  // DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Campaign = {
  _id: string;
  name: string;
  status: "active" | "inactive" | "deleted";
  description: string;
  accountIDs: string[];
  leads: string[];
  createdAt: string;
  updatedAt: string;
};

export function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[] | []>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    getAllCampaigns();
  }, []);

  const toggleStatus = async (id: string) => {
    const campaign = campaigns.find((c) => c._id === id);
    if (!campaign) return;

    const newStatus = campaign.status === "active" ? "inactive" : "active";

    try {
      await api.put(`/campaign/${id}`, {
        ...campaign,
        status: newStatus,
      });

      setCampaigns((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
    } catch (err) {
      console.error("Failed to update campaign status", err);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>;
      case "deleted":
        return <Badge variant="destructive">Deleted</Badge>;
      default:
        return null;
    }
  };

  const getAllCampaigns = async () => {
    try {
      const response = await api.get("/campaign");
      console.log("Campaigns fetched successfully", response.data);
      setCampaigns(response.data);
    } catch (error) {
      console.log("Error fetching campaigns", error);
    }
  };

  const deleteCampaign = async (id: string) => {
    try {
      await api.delete(`/campaign/${id}`);
      setCampaigns((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: "deleted" } : c))
      );
    } catch (err) {
      console.error("Failed to delete campaign", err);
    }
  };

  const openEditModal = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setIsDialogOpen(true);
  };

  const handleEditChange = (field: keyof Campaign, value: any) => {
    setEditingCampaign((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const submitEdit = async () => {
    if (!editingCampaign) return;
    try {
      const { _id, ...updatedData } = editingCampaign;
      await api.put(`/campaign/${_id}`, updatedData);
      setCampaigns((prev) =>
        prev.map((c) => (c._id === _id ? editingCampaign : c))
      );
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Error updating campaign", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Campaigns</h1>
        <Button>New Campaign</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
          <CardDescription>
            Manage your outreach campaigns and track their status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">
                  Description
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign._id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                  <TableCell className="hidden max-w-xs truncate md:table-cell">
                    {campaign.description}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="flex items-center gap-2"
                          onClick={() => openEditModal(campaign)}
                          disabled={campaign.status === "deleted"}
                        >
                          <Edit className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <Dialog
                          open={isDialogOpen}
                          onOpenChange={setIsDialogOpen}
                        >
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Campaign</DialogTitle>
                            </DialogHeader>
                            {editingCampaign && (
                              <div className="space-y-4">
                                <Input
                                  value={editingCampaign.name}
                                  onChange={(e) =>
                                    handleEditChange("name", e.target.value)
                                  }
                                  placeholder="Campaign Name"
                                />
                                <Textarea
                                  value={editingCampaign.description}
                                  onChange={(e) =>
                                    handleEditChange(
                                      "description",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Description"
                                />
                                <Select
                                  value={editingCampaign.status}
                                  onValueChange={(val) =>
                                    handleEditChange("status", val)
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="active">
                                      Active
                                    </SelectItem>
                                    <SelectItem value="inactive">
                                      Inactive
                                    </SelectItem>
                                    <SelectItem value="deleted">
                                      Deleted
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <Textarea
                                  value={editingCampaign.leads.join(",")}
                                  onChange={(e) =>
                                    handleEditChange(
                                      "leads",
                                      e.target.value.split(",")
                                    )
                                  }
                                  placeholder="LinkedIn URLs (comma-separated)"
                                />
                                <Textarea
                                  value={editingCampaign.accountIDs.join(",")}
                                  onChange={(e) =>
                                    handleEditChange(
                                      "accountIDs",
                                      e.target.value.split(",")
                                    )
                                  }
                                  placeholder="Account IDs (comma-separated)"
                                />
                                <DialogFooter>
                                  <Button onClick={submitEdit}>
                                    Save Changes
                                  </Button>
                                </DialogFooter>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <DropdownMenuItem
                          className="flex items-center gap-2"
                          onClick={() => toggleStatus(campaign._id)}
                          disabled={campaign.status === "deleted"}
                        >
                          <Switch
                            checked={campaign.status === "active"}
                            className="mr-2"
                          />
                          {campaign.status === "active"
                            ? "Deactivate"
                            : "Activate"}
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
  );
}
