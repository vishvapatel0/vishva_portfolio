
export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  imageUrl: string;
  imageHint?: string;
  technologies: string[];
  detailsLink?: string;
  liveDemoLink?: string;
  repoLink?: string;
}

export const projectsData: Project[] = [
  {
    id: "rag-pdf-01",
    slug: "rag-from-pdf",
    title: "RAG From PDF",
    summary: "Advanced document retrieval from PDFs using RAG for natural language queries.",
    description: "An advanced document retrieval system that extracts knowledge from PDF files using Retrieval-Augmented Generation (RAG) technology, enabling users to query document content through natural language and receive accurate, contextually relevant responses.",
    imageUrl: "https://images.unsplash.com/photo-1706466614149-5e04fd018a49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhaXxlbnwwfHx8fDE3NDczODcwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "document ai",
    technologies: ["Python", "Vector Databases", "FAISS", "Large Language Models", "Google Gemini", "Natural Language Processing", "PDF Parsing", "Information Retrieval", "Knowledge Management"],
    repoLink: "https://github.com/vishvapatel0",
  },
  {
    id: "ats-gemini-02",
    slug: "ats-using-google-gemini",
    title: "ATS Using Google Gemini",
    summary: "AI-powered ATS to evaluate resumes against job descriptions using Google Gemini.",
    description: "An intelligent web app that evaluates a candidate’s resume against a job description using Google Gemini Pro Vision API and Streamlit. This tool mimics both a Technical HR reviewer and an ATS (Applicant Tracking System) to give insightful feedback and a matching percentage.",
    imageUrl: "https://images.unsplash.com/photo-1600367163359-d51d40bcb5f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxnb29nbGUlMjBsb2dvfGVufDB8fHx8MTc0NzM4NzE4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "resume screening",
    technologies: ["Python", "Google Gemini Vision Pro", "Prompt Engineering", "Generative AI", "Streamlit"],
    repoLink: "https://github.com/vishvapatel0",
  },
  {
    id: "phishing-detection-03",
    slug: "url-phishing-detection",
    title: "URL Phishing Detection",
    summary: "DistilBERT-based model for URL phishing detection with 99.01% accuracy.",
    description: "Developed a URL phishing detection model using DistilBERT, leveraging NLP techniques to classify URLs as phishing or benign. The model was trained and evaluated on a large dataset, achieving a high accuracy of 99.01%.",
    imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxM3x8Y3liZXIlMjBzZWN1cml0eXxlbnwwfHx8fDE3NDczODcyNzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "cybersecurity ai",
    technologies: ["Python", "Machine Learning", "Deep Learning", "DistilBERT", "NLP"],
    repoLink: "https://github.com/vishvapatel0",
  },
  {
    id: "heart-attack-prediction-04",
    slug: "heart-attack-prediction-model",
    title: "Heart Attack Prediction Model",
    summary: "RandomForest model for heart attack prediction, optimized with GridSearchCV (97% precision).",
    description: "Developed a RandomForest-based heart attack prediction model using medical and lifestyle data. Optimized model performance using GridSearchCV and evaluated results with precision 97% and analysis of feature importance.",
    imageUrl: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxoZWFydCUyMGF0dGFja3xlbnwwfHx8fDE3NDczODczNTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "medical ai",
    technologies: ["Python", "Machine Learning", "RandomForest", "GridSearchCV", "Healthcare"],
    repoLink: "https://github.com/vishvapatel0",
  },
  {
    id: "ai-sql-agent-05",
    slug: "ai-sql-agent",
    title: "AI SQL Agent",
    summary: "AI assistant for natural language to SQL generation and explanation.",
    description: "An intelligent SQL assistant that interprets natural language queries, automatically generates optimized SQL code, and explains database operations in plain language, bridging the gap between business users and complex database structures.",
    imageUrl: "https://images.unsplash.com/photo-1662026911591-335639b11db6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxzcWx8ZW58MHx8fHwxNzQ3Mzg3NDA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "database ai",
    technologies: ["Python", "Large Language Models", "SQL", "Database Management", "Natural Language Processing", "Prompt Engineering", "Query Optimization"],
    repoLink: "https://github.com/vishvapatel0",
  },
  {
    id: "llm-from-scratch-06",
    slug: "llm-from-scratch",
    title: "LLM From Scratch",
    summary: "Custom LLM built from scratch with PyTorch, trained on F1 data.",
    description: "Developed a Large Language Model (LLM) from scratch using PyTorch, trained on Formula 1 (F1) data, including historical events. Built both bigram and transformer models to improve text generation quality.",
    imageUrl: "https://images.unsplash.com/photo-1645839072940-bb2a4f189ed3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxsbG1zfGVufDB8fHx8MTc0NzM4NzQ1MHww&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "custom llm",
    technologies: ["Python", "PyTorch", "Base LLM model", "Bigram Models", "Transformer Models", "F1 Data"],
    repoLink: "https://github.com/vishvapatel0",
  }
];

export interface Skill {
  name: string;
  level: number; // 1 (lowest) to 5 (highest) for prominence
}

// Updated skills based on user input
export const skillsData: Skill[] = [
  { name: "Python", level: 5 },
  { name: "CrewAI", level: 4 },
  { name: "Langchain", level: 5 },
  { name: "Hugging Face", level: 5 },
  { name: "TensorFlow", level: 4 },
  { name: "Keras", level: 4 },
  { name: "Scikit-learn", level: 5 },
  { name: "Pandas", level: 5 },
  { name: "NumPy", level: 5 },
  { name: "Matplotlib", level: 3 },
  { name: "PyTorch", level: 5 },
  { name: "Pinecone", level: 4 },
  { name: "ChromaDB", level: 4 }, // Corrected typo from chromeDB
  { name: "SQL", level: 4 },
  { name: "FAISS", level: 4 },
];
