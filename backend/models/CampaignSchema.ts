import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "deleted"],
      default: "active",
    },
    leads: {
      type: [String],
      default: [],
    },
    accountIDs: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const CampaignModel = mongoose.model("Campaign", CampaignSchema)

export default CampaignModel