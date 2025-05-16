import { Request, Response } from 'express';
import ScrapedLead from '../models/ScrapedProfilesSchema';

export const getScrapedLeads = async (req: Request, res: Response) => {
  try {
    const leads = await ScrapedLead.find().sort({ createdAt: -1 }).limit(20);
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch scraped leads' });
  }
};
