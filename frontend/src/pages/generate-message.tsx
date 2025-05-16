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
import { Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "react-toastify";

export function GenerateMessage() {
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    company: "",
    location: "",
    summary: "",
  });
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const response = await api.post("/generate-message", {
        name: formData.name,
        job_title: formData.jobTitle,
        company: formData.company,
        location: formData.location,
        summary: formData.summary,
      });
      console.log("Generated message:", response.data);
      setGeneratedMessage(response.data.message);
      setIsGenerating(false);
    } catch (error) {
      console.log("Error generating message", error);
      setGeneratedMessage("Error generating message");
      setIsGenerating(false);
    }
  };

  const copyMessage = () => {
    if (generatedMessage) {
      navigator.clipboard.writeText(generatedMessage);
    }
    toast.success("Message copied to clipboard", {
        theme: "dark",
        position: "bottom-right",
        autoClose: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Generate Message</h1>
        <p className="text-muted-foreground">
          Create personalized outreach messages based on lead information.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lead Information</CardTitle>
            <CardDescription>
              Enter the lead's details to generate a personalized message.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  placeholder="VP of Marketing"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Acme Inc."
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="San Francisco, CA"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Profile Summary</Label>
                <Textarea
                  id="summary"
                  name="summary"
                  placeholder="Experienced marketing executive with 10+ years in SaaS..."
                  value={formData.summary}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Message"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Generated Message</CardTitle>
            <CardDescription>
              Your AI-generated personalized outreach message.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border bg-muted/50 p-4">
              {generatedMessage ? (
                <pre className="whitespace-pre-wrap font-sans text-sm">
                  {generatedMessage}
                </pre>
              ) : (
                <p className="text-center text-muted-foreground">
                  Fill out the form and click "Generate Message" to create a
                  personalized outreach message.
                </p>
              )}
            </div>
          </CardContent>
          {generatedMessage && (
            <CardFooter className="flex justify-end gap-2">
              <Button onClick={() => copyMessage()}>Copy Message</Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
