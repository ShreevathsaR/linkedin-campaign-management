# OutFlo.io - Campaign Management System 🚀

Deployed Link: https://campaign-management-system.netlify.app/

An AI-assisted, full-stack Campaign Management System built for the OutFlo.io Founding Tech Member internship assignment. This platform allows users to create targeted LinkedIn campaigns, generate personalized outreach messages using AI, and even scrape leads from public sources.

---

## ✨ Features

- 📋 **Campaign Management**  
  Create, edit, view, and soft-delete campaigns with ease.

- 🔗 **LinkedIn Lead Handling**  
  Add LinkedIn profile URLs (leads) to each campaign.

- 🧠 **AI Outreach Message Generator**  
  Generates short, personalized messages using an AI model (Groq + LLaMA3).

- 🕸️ **Google-based Lead Scraper**  
  Scrapes public LinkedIn profiles using Google Search API (`site:linkedin.com/in`) via SerpAPI.

- 🔍 **Search Functionality**  
  Filter scraped leads based on title, snippet, or name.

- ⚙️ **Built With a Modular Monorepo**  
  Organized structure using `backend/`, `frontend/`, and `scraper/`.

---

## 🛠️ Tech Stack

**Frontend**  
- React + TypeScript  
- TailwindCSS + shadcn/ui  
- Axios for API calls  
- React Router for navigation

**Backend**  
- Node.js + Express  
- TypeScript  
- MongoDB + Mongoose  
- OpenAI-compatible AI model via Groq  
- RESTful API design

**Scraper**  
- SerpAPI for safe LinkedIn profile scraping  
---


---

## 🔧 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/outflo-assignment.git
cd outflo-assignment
````

### 2. Environment Variables
Create a .env file in each of the following folders with these values:

at /backend/.env
```bash
PORT=5000
MONGODB_URI=your_mongodb_uri
GROQ_API_KEY=your_groq_api_key
```

### 3. Run Backend
```bash
cd backend
npm install
npm run dev
```

### 4. Run Frontend
```bash
cd ../frontend
npm install
npm run dev
```

#### For importing leads query in the following structure
```bash
#postion #industry #location #site:linkedin.com/in

Sample query: CEO Technology India site:linkedin.com/in
```

 📬 Contact
Made by Shreevathsa R
---
