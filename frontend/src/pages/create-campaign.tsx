import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "react-toastify";
import { api } from "@/lib/api";

export function CreateCampaign() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active",
    leads: "",
    accountIds: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      const leadsArray = formData.leads.split(',').map(ele => ele.trim());
      const accountIdsArray = formData.accountIds.split(',').map(ele => ele.trim());
      
      const response = await api.post("/campaign", {...formData, leads: leadsArray, accountIDs: accountIdsArray});
      console.log("Campaign created:", response.data);

      toast.success("Campaign created successfully", {
        theme: "dark",
        position: "bottom-right",
        autoClose: 3000,
      });
      setFormData({
        name: "",
        description: "",
        status: "active",
        leads: "",
        accountIds: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error creating campaign", {
        theme: "dark",
        position: "bottom-right",
        autoClose: 3000,
      });
    }

  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create Campaign</h1>
        <p className="text-muted-foreground">
          Set up a new outreach campaign with leads and accounts.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
            <CardDescription>
              Fill in the information below to create a new campaign.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter campaign name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter campaign description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="leads">
                Leads (LinkedIn URLs, comma-separated)
              </Label>
              <Textarea
                id="leads"
                name="leads"
                placeholder="https://linkedin.com/in/lead1, https://linkedin.com/in/lead2"
                value={formData.leads}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountIds">Account IDs (comma-separated)</Label>
              <Input
                id="accountIds"
                name="accountIds"
                placeholder="acc_123, acc_456, acc_789"
                value={formData.accountIds}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button type="submit">Create Campaign</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
