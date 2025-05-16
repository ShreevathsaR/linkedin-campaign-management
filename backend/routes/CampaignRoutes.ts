import express from 'express';
import {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  softDeleteCampaign,
} from '../controllers/Campaign';

const router = express.Router();

router.get('/', getAllCampaigns);
router.get('/:id', getCampaignById);
router.post('/', createCampaign);
router.put('/:id', updateCampaign);
router.delete('/:id', softDeleteCampaign);

export default router;
