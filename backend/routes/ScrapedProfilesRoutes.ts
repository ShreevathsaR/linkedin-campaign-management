import express from "express";
import { getScrapedLeads } from "../controllers/ScrapedProfiles";
import { scrapeLeads } from "../controllers/googleScrape";
const router = express.Router();

router.get("/", getScrapedLeads);
router.post("/", scrapeLeads);

export default router;
