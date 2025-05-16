import { Request, Response } from 'express';
import CampaignModel from '../models/CampaignSchema';


export const getAllCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await CampaignModel.find({ status: { $ne: 'deleted' } });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
};

export const getCampaignById = async (req: Request, res: Response)=> {
  try {
    const campaign = await CampaignModel.findById(req.params.id);
    if (!campaign || campaign.status === 'deleted') {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch campaign' });
  }
};

export const createCampaign = async (req: Request, res: Response) => {
  try {
    const newCampaign = new CampaignModel(req.body);
    const saved = await newCampaign.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create campaign' });
  }
};

export const updateCampaign = async (req: Request, res: Response) => {
  try {
    const updated = await CampaignModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update campaign' });
  }
};

export const softDeleteCampaign = async (req: Request, res: Response) => {
  try {
    const deleted = await CampaignModel.findByIdAndUpdate(
      req.params.id,
      { status: 'deleted' },
      { new: true }
    );
    if (!deleted) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json({ message: 'Campaign soft deleted', campaign: deleted });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete campaign' });
  }
};
