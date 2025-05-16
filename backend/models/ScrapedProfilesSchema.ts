import mongoose from "mongoose";

const scrapedProfilesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
    },
    description: {
      type: String,
    },
    profileUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ScrapedProfilesModel = mongoose.model(
  "ScrapedProfiles",
  scrapedProfilesSchema
);

export default ScrapedProfilesModel;
