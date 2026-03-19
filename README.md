# AskTube — AI-Powered YouTube Q&A (RAG Pipeline)

AskTube is an AI-powered application that allows users to ask questions about any YouTube video and get intelligent, context-aware answers using a Retrieval-Augmented Generation (RAG) pipeline.

---

## Features

- Extracts transcripts from YouTube videos  
- Uses embeddings + vector search for relevant context retrieval  
- Generates answers using LLM (Gemini)  
- Fast and interactive UI built with React  
- Fully deployed (Frontend + Backend)

---

## Tech Stack

### 🔹 Frontend
- React (Vite)
- Axios
- Tailwind / CSS

### 🔹 Backend
- FastAPI
- LangChain
- FAISS (Vector Store)
- YouTube Transcript API
- Google Generative AI (Gemini)

### 🔹 Deployment
- Frontend: Vercel  
- Backend: Railway  

---

## How It Works (RAG Pipeline)

1. User inputs a YouTube video URL id  
2. Transcript is fetched using YouTube Transcript API  
3. Transcript is split into chunks  
4. Each chunk is converted into embeddings  
5. Stored in a vector database (FAISS)  
6. User query is embedded and matched against relevant chunks using semantic search  
7. Retrieved context is passed to LLM  
8. LLM generates a final answer  

---

##  Live Demo

 [Frontend Live Link](https://ask-tube.vercel.app/)  
 [Backend API Docs](https://asktube-production.up.railway.app/)

