import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import campaignRoutes from './routes/CampaignRoutes'
import messageGenRoutes from './routes/MessageGenerationRoutes'
import profilesRoutes from './routes/ScrapedProfilesRoutes'
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('API is running 🚀');
});

const pingServer = () => {
  axios
    .get(process.env.SERVER_URL as string)
    .then((response) => {
      console.log("Ping successful:", response.status);
    })
    .catch((error) => {
      console.error("Ping failed:", error.message);
    });
};

// setInterval(pingServer, 300000); Removed because this cron job will exceed render's free tier limit

app.use('/api/campaign', campaignRoutes)
app.use('/api/generate-message', messageGenRoutes)
app.use('/api/leads', profilesRoutes)

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
  });
