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
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { ClipLoader } from "react-spinners";

type Lead = {
  _id: string;
  name: string;
  jobTitle: string;
  description: string;
  profileUrl: string;
  updatedAt: string;
  createdAt: string;
};

export function ScrapedLeads() {
  const [profiles, setProfiles] = useState<Lead[] | []>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/leads");
      console.log(response.data);
      setProfiles(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching profiles", error);
      setIsLoading(false);
    }
  };

  const searchForProfiles = async () => {
    if (!searchQuery) {
      return alert("Please enter a search query");
    }

    try {
      console.log(searchQuery);
      const response = await api.post(`leads?query=${searchQuery}`);
      setProfiles(response.data);
    } catch (error) {
      console.log("Error searching for profiles", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Scraped Leads</h1>
          <p className="text-muted-foreground">
            View and manage your scraped LinkedIn leads.
          </p>
        </div>
        <div className="flex w-full items-center space-x-2 sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads..."
              className="pl-8 sm:w-[300px]"
              required
            />
          </div>
          <Button onClick={() => searchForProfiles()}>Import Leads</Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
          <CardDescription>
            A list of all the leads you've scraped from LinkedIn.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead className="hidden md:table-cell">Desc</TableHead>
                <TableHead className="text-right">Profile</TableHead>
              </TableRow>
            </TableHeader>
            {profiles.length > 0 ? (
              <TableBody>
                {profiles.map((lead) => (
                  <TableRow key={lead._id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>{lead.jobTitle}</TableCell>
                    <TableCell className="hidden max-w-xs truncate md:table-cell">
                      {lead.description}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={lead.profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Profile
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
               !isLoading && <div className="text-l pt-5 text-center w-full">
                No leads found
              </div>
            )}
          </Table>
          <div className="py-5 text-l text-center">
            <ClipLoader loading={isLoading} size={20} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
