import { Request, Response } from "express";
import mongoose from "mongoose";
import { getJson } from "serpapi";
import ScrapedProfilesModel from "../models/ScrapedProfilesSchema";

export const scrapeLeads = async (req: Request, res: Response): Promise<Response | void> => {
  console.log("Scraping leads...");

  const searchQuery = req.query.query as string;

  if (!searchQuery) {
    return res.status(400).json({ error: "Query parameter 'query' is required." });
  }

  try {
    getJson(
      {
        engine: "google",
        q: searchQuery,
        api_key: process.env.SERPAPI,
        num: 20,
      },
      async (json: any) => {
        try {
          const results = json.organic_results || [];

          const parsedProfiles = results.map((result: any) => {
            const [name, jobTitleRaw] = result.title?.split("-") ?? [];
            return {
              name: name?.trim() || "N/A",
              jobTitle: jobTitleRaw?.trim() || "",
              description: result.snippet || "",
              profileUrl: result.link || "",
            };
          });

          const savedProfiles = await ScrapedProfilesModel.insertMany(parsedProfiles);
          console.log("Profiles saved to MongoDB");

          return res.json(savedProfiles);
        } catch (innerErr) {
          console.error("Error during profile parsing/saving:", innerErr);
          return res.status(500).json({ error: "Failed to parse or save profiles." });
        }
      }
    );
  } catch (error) {
    console.error("Error scraping profiles:", error);
    return res.status(500).json({ error: "Error scraping profiles." });
  }
};
