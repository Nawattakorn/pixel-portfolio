export const MOCK_PROJECTS = [
  {
    id: "proj-1",
    title: "Thai Sign Language Translator",
    category: "Deep Learning",
    description: "Real-time Thai Sign Language (TSL) recognition and translation into Thai text.",
    fullDescription:
      "ThaiSignLaTranslator is a Thai Sign Language (TSL) translation system that takes video/image input and outputs Thai text using machine learning and deep learning. It is built on a dataset of Thai sign videos/images curated by Arucha Khematharonon. The goal is to support communication for deaf and hard-of-hearing users by providing an accessible, real-time translation interface.",
    features: [
      "Video processing: supports webcam streaming",
      "Hand detection: MediaPipe Hand Tracking for per-frame landmarks",
      "Gesture classification: LSTM-based sequence model",
      "Text translation: converts model predictions into Thai text output",
      "Web interface: HTML/CSS/JavaScript UI for real-time testing",
    ],
    tech: ["Flask", "OpenCV", "MediaPipe", "TensorFlow", "LSTM"],
    thumbnail: "/project/ThaiSignLaTranslator-Icon.png",
    images: ["/project/ThaiSignLaTranslator-Demo.png", "/project/ThaiSignLaTranslator-Architecture.png"],
    links: [
      { label: "GitHub Repo", url: "https://github.com/Nawattakorn/ThaiSignLaTranslator" },
      { label: "Live Demo", url: "https://huggingface.co/spaces/Nawattsan/ThaiSignLanguage-Translator" }
    ]
  },
  {
    id: "proj-2",
    title: "Smartbin",
    category: "Computer Vision",
    description: "A real-time smart waste classification system powered by YOLO object detection.",
    fullDescription:
      "Smartbin is a real-time waste classification system built with YOLO and computer vision. It detects and classifies waste items directly from a live webcam stream, making it easier to demonstrate automated sorting and recycling use cases. The project also focuses on building an accessible web app that can be used from anywhere via a browser.",
    features: [
      "Real-time detection from a webcam feed",
      "Web-based interface powered by Streamlit",
      "Object counting per frame for detected classes",
    ],
    tech: ["YOLO", "Streamlit", "OpenCV"],
    thumbnail: "/project/SmartBin-Icon.png",
    images: ["/project/Smartbin-Demo.png", "/project/Smartbin-Diagram.png"],
    links: [
      { label: "GitHub Repo", url: "https://github.com/Nawattakorn/Smartbin" },
      { label: "Live Demo", url: "https://smartbin-dgfkrmzfvw7ewpqsabi8as.streamlit.app/" }
    ]
  },
  {
    id: "proj-3",
    title: "Emotion Detect Chatbot",
    category: "NLP",
    description: "An emotion-aware chatbot that detects a user's emotion and responds empathetically.",
    fullDescription:
      "Emotion Chatbot is an NLP course project that detects the emotion expressed in user text and generates an appropriate, empathetic reply. It demonstrates a practical NLP pipeline including text cleaning, feature extraction, and deep learning-based emotion classification.",
    features: [
      "Emotion detection for Joy, Sadness, Anger, Fear, Love, and Surprise",
      "Empathetic response generation aligned with the detected emotion",
      "Interactive chat interface for real-time conversation",
    ],
    tech: ["Flask", "TensorFlow", "CNN"],
    thumbnail: "/project/Emotionchatbot-Icon.png",
    images: ["/project/Emotionchatbot-Demo.png", "/project/Emotionchatbot-Diagram.png"],
    links: [
      { label: "GitHub Repo", url: "https://github.com/Nawattakorn/emotionchatbot" }
    ]
  },
  {
    id: "proj-4",
    title: "ChatBuddy AI",
    category: "Automation",
    description: "An AI-powered LINE assistant for Thai SMEs that automates sales chat, order handling, and reporting.",
    fullDescription:
      "ChatBuddy AI is an intelligent LINE chatbot designed for Thai online sellers and SME teams. It automates customer conversations end-to-end: receiving orders, answering product questions, checking shipping/payment status, handling complaints, and logging data for dashboard insights. The system combines workflow automation, LLM reasoning, and structured data storage to reduce repetitive support work while improving response speed.",
    features: [
      "Automatic order capture and structured logging from chat messages",
      "Real-time product Q&A using product, price, and stock data",
      "Order and payment status checks, including transfer-slip validation",
      "Complaint detection with immediate admin alerts",
      "Analytics dashboard for intent, sentiment, and sales monitoring",
      "Conversation memory buffer per user for contextual replies",
    ],
    tech: ["LINE API", "n8n", "OpenRouter LLM", "Google Sheets", "Docker", "Nginx"],
    thumbnail: "/project/ChatBuddy-Icon.png",
    images: [
      "/project/ChatBuddy-BlockDiagram.png",
      "/project/ChatBuddy-Usecase.png",
      "/project/ChatBuddy-Dashboard-Demo.png",
      "/project/Chatbuddy-n8n-workflow.png"
    ],
    links: [
      { label: "GitHub Repo", url: "https://github.com/GiftNuttamon/ProjectAI-Business/tree/main" }
    ]
  },
  {
    id: "proj-5",
    title: "ChatX Backend",
    category: "Backend & API",
    description: "Secure, high-performance API backend for an omni-channel customer support platform.",
    fullDescription:
      "ChatX is an omni-channel platform designed to consolidate customer chats from multiple services (like LINE and Facebook Messenger) into a unified inbox. Developed as part of my Software Developer internship at Cyberpay Technology Co., Ltd., I designed and implemented secure RESTful APIs, optimized SQL queries for dashboard reporting, and created reliable third-party webhook integrations.",
    features: [
      "Authentication: Developed secure Login APIs using JWT and database-level encryption",
      "Real-time Dashboard: Built reporting API endpoints leveraging complex SQL queries and indexing",
      "Webhook Integration: Created LINE Webhook handlers with signature validation to guarantee payload integrity",
      "Database Architecture: Structured scalable tables and migrations on PostgreSQL"
    ],
    tech: ["NestJS", "PostgreSQL", "TypeScript", "JWT", "LINE API", "Docker"],
    thumbnail: "/project/ChatX.png",
    images: [
      "/project/ChatX.png",
      "/project/chatx/UILogin.png",
      "/project/chatx/Dashboard.png",
      "/project/chatx/ChatTransferUI.png",
      "/project/chatx/LineWebHook.png",
      "/project/chatx/EmailResetPass.png",
      "/project/chatx/ForgotPassUI.png",
      "/project/chatx/SetPasswordUI.png"
    ],
    links: []
  },
  {
    id: "proj-6",
    title: "SmartFactoryTwinOps",
    category: "Industrial IoT",
    description: "A real-time Digital Twin operations platform monitoring factory efficiency (OEE) and device telemetry.",
    fullDescription:
      "SmartFactoryTwinOps is an industrial dashboard combining Digital Twin principles and IoT operation controls. It visualizes live device telemetry, aggregates operational metrics (OEE, uptime, anomalies), and provides simulated controls for manufacturing environments to enable predictive maintenance and efficient factory management.",
    features: [
      "OEE Analytics: Visualizes Overall Equipment Effectiveness metrics with charts",
      "Sensor Telemetry: Real-time sensor reading displays using live data feeds",
      "Anomaly Detection: Automated threshold monitoring for preventive machine alerts",
      "Interactive Twin Control: Toggle simulated operational variables and monitor state feedback"
    ],
    tech: ["React", "TypeScript", "Node.js", "Tailwind CSS", "IoT", "MQTT"],
    thumbnail: "/project/smartfactory/dashboard.png",
    images: [
      "/project/smartfactory/dashboard.png",
      "/project/smartfactory/Digital-Twin.png",
      "/project/smartfactory/Agents.png",
      "/project/smartfactory/Recommendations.png",
      "/project/smartfactory/smartfactory-architecture.png"
    ],
    links: [
      { label: "GitHub Repo", url: "https://github.com/nathirad/smart-factory-TwinOpsAI-Demo" },
      { label: "Live Demo", url: "https://smart-factory-alpha.vercel.app/" }
    ]
  },
  {
    id: "proj-7",
    title: "JobFlow AI",
    category: "AI & Automation",
    description: "An AI-powered job application tracker integrating a Chrome Extension, Google Sheets, and Gemini AI.",
    fullDescription:
      "JobFlow AI is an automated suite designed to simplify job application tracking. It features a custom Chrome Extension that extracts job details from popular platforms (like LinkedIn, JobsDB, JobThai) and logs them directly to a Google Sheet via a Google Apps Script web app backend. It also utilizes Gemini AI to draft customized cover letters matching job descriptions directly inside the sheet.",
    features: [
      "Chrome Extension: Extracts job information (title, company, salary, description) directly from job board web pages",
      "Google Apps Script Backend: Automatically parses incoming payloads and appends them to Google Sheets",
      "Cozy Cream Design: Custom styled Google Sheets layout for clean visual application tracking",
      "Gemini AI Integration: Generates customized cover letters customized to specific job descriptions with one click"
    ],
    tech: ["Chrome Extension", "Google Apps Script", "Gemini API", "JavaScript"],
    thumbnail: "/project/jobflow/Jobflow-Thumnail.png",
    images: [
      "/project/jobflow/Jobflow-Thumnail.png",
      "/project/jobflow/Jobflow-Preview-1.png",
      "/project/jobflow/Jobflow-Preview-2.png",
      "/project/jobflow/Jobflow-Preview-3.png"
    ],
    links: [
      { label: "Google Sheets Template", url: "https://docs.google.com/spreadsheets/d/1uTRsEehhDBqwlQvSfTwpb1O7BjqO6qdSrvQxO2VwD6U/copy" }
    ]
  },
  {
    id: "proj-8",
    title: "Homework Checker OCR",
    category: "Computer Vision & AI",
    description: "An automated grading application using OpenCV and OCR engines to grade worksheets.",
    fullDescription:
      "Homework Checker OCR is a Python-based Flask web application designed to automate student homework grading. It takes scanned or photographed worksheet images, detects answer box contours using OpenCV, extracts written answers using three selectable OCR engines (Template Matching for digits, Tesseract for text, and TrOCR for handwriting), and compares them against user-defined answer keys.",
    features: [
      "Multi-Engine OCR: Custom Template Matching (digits), Tesseract (text), and TrOCR (handwritten AI model)",
      "Computer Vision Pipeline: Box detection, Otsu thresholding, line morphology, and character segmentation via OpenCV",
      "Batch Comparison: Side-by-side engine benchmarking interface to compare accuracy, latency, and success rates",
      "Interactive Web Portal: Flask-based UI supporting single-engine runs, parameter adjustments, and grading dashboards"
    ],
    tech: ["Python", "Flask", "OpenCV", "PyTorch", "TrOCR", "Tesseract"],
    thumbnail: "/project/homeworkchecker/homeworkchecker-demo.png",
    images: [
      "/project/homeworkchecker/homeworkchecker-demo.png",
      "/project/homeworkchecker/Homeworkchecker-workflow.png",
      "/project/homeworkchecker/preprocessing_steps.png"
    ],
    links: [
      { label: "GitHub Repo", url: "https://github.com/Nawattakorn/DIP-Project-HomeworkChecker-OCR" }
    ]
  }
];

export const MOCK_STATS = [
  { name: "Python / JS / C++", level: "Advanced" },
  { name: "Data & AI (TensorFlow/OpenCV)", level: "Advanced" },
  { name: "Backend (Node.js/NestJS/Flask)", level: "Proficient" },
  { name: "SQL & Databases", level: "Proficient" },
  { name: "DevOps (Docker/Git/n8n)", level: "Intermediate" },
];

export const MOCK_EXPERIENCE = [
  {
    id: "exp-1",
    role: "Software Developer (Coop)",
    company: "Cyberpay Technology Co., Ltd.",
    period: "July 2025 - Oct 2025",
    description: "Developed the Backend for 'Chat X' (Omni-channel Platform) using NestJS and PostgreSQL.\n• Developed secure Login APIs using JWT and data encryption.\n• Built Real-time Dashboard APIs using complex SQL queries.\n• Implemented LINE Webhook integration with signature validation."
  },
  {
    id: "exp-2",
    role: "B.Eng. Computer Engineer & AI",
    company: "Thai-Nichi Institute of Technology",
    period: "June 2022 - Mar 2026",
    description: "Cumulative GPA: 3.57/4.00.\nRigorous study focusing on Computer Engineering principles, Artificial Intelligence, and scalable Software Architecture."
  }
];

export const MOCK_CERTIFICATES = [
  { id: "cert-1", name: "Data Scientist Course (Daydev)", date: "Nov 2025" },
  { id: "cert-2", name: "AIRA & AIFUL Hackathon Innovative App", date: "Oct 2024" },
  { id: "cert-3", name: "Huawei ASEAN Academy - HCIA-AI", date: "Aug 2023" }
];

export const MOCK_ACHIEVEMENTS = [
  { id: "ach-1", name: "Top 10 Finalist", issuer: "AIRA & AIFUL Hackathon", date: "Oct 2024", icon: "🏅" },
  { id: "ach-2", name: "Bronze Medal IT", issuer: "TNI Academic Contest", date: "Jan 2024", icon: "🥉" },
  { id: "ach-3", name: "Certified Data Scientist", issuer: "Daydev Academy", date: "Nov 2025", icon: "📜" }
];

export type ProofItem = {
  id: string;
  name: string;
  issuer?: string;
  date: string;
  icon: string;
  proofUrl?: string; // place files under /public so they can be served as /...
  badgeUrl?: string; // image shown on cards (e.g. certificate image)
};

export const MOCK_CERTIFICATIONS: ProofItem[] = [
  {
    id: "cert-1",
    name: "Certified Data Scientist",
    issuer: "Daydev Academy",
    date: "Nov 2025",
    icon: "📜",
    proofUrl: "https://drive.google.com/file/d/1CsYAJOW-PPSz5zzlPolS5Xa3wgDBMAaN/view?usp=drive_link",
    badgeUrl: "/png_port/Datascience-1.png",
  },
  {
    id: "cert-2",
    name: "HCIA-AI",
    issuer: "Huawei ASEAN Academy",
    date: "Aug 2023",
    icon: "🎓",
    proofUrl: "https://drive.google.com/file/d/11XsoXzirMT3aShjjdt8uTBPDAvwQPlAj/view?usp=sharing",
    badgeUrl: "/png_port/HCIA-AI%20V3.0%20Certificated.png",
  },
  {
    id: "cert-3",
    name: "GitHub for Developer",
    issuer: "borntodev Academy",
    date: "Jun 2025",
    icon: "🧩",
    proofUrl: "https://drive.google.com/file/d/1bJq5jtHOu8_dvd-T0puakjFF8I_zrG8M/view?usp=sharing",
    badgeUrl: "/png_port/borntodev-academy_GitHub%20for%20Developer%20_certificate.png",
  },
  {
    id: "cert-4",
    name: "Python",
    issuer: "Kaggle / Course",
    date: "Dec 2025",
    icon: "🐍",
    proofUrl: "https://drive.google.com/file/d/1jBHW_Z8ps_ooJg__oMzF7wUrxqoArGyW/view?usp=sharing",
    badgeUrl: "/png_port/Nawattakorn%20Namburin%20-%20Python.png",
  },
  {
    id: "cert-5",
    name: "Data Analytics",
    issuer: "IT Specialist",
    date: "Dec 2025",
    icon: "📊",
    proofUrl: "https://drive.google.com/file/d/1NLx31EZVvL8HG-2sju175U7xaVgD17zQ/view?usp=sharing",
    badgeUrl: "/png_port/%5BCertificate%5D_DataAnalytics-1.png",
  },

  {
    id: "cert-6",
    name: "Application Programming Interfaces",
    issuer: "AIRA & AIFUL Hackathon",
    date: "Oct 2024",
    icon: "🏅",
    proofUrl: "https://drive.google.com/file/d/1zDWArh9QKeletK19Fr-TqnL3IIFccOpZ/view?usp=sharing",
    badgeUrl: "/png_port/Cert-API-10.png",
  },

  {
    id: "cert-7",
    name: "Data Collect Techniques",
    issuer: "AIRA & AIFUL Hackathon",
    date: "Oct 2024",
    icon: "🏅",
    proofUrl: "https://drive.google.com/file/d/1mcoNJLrh9xHzS9evXQmkPtDho4dR2Ef3/view?usp=sharing",
    badgeUrl: "/png_port/Cert-DATA Collect-10.png",
  },

  {
    id: "cert-8",
    name: "Low-code Development",
    issuer: "AIRA & AIFUL Hackathon",
    date: "Oct 2024",
    icon: "🏅",
    proofUrl: "https://drive.google.com/file/d/1F6jLCR15Pj1exKcXDQoI2M_Uj_gye-jX/view?usp=sharing",
    badgeUrl: "/png_port/Cert-Lowcode-10.png",
  },
];

export const MOCK_ACTIVITIES: ProofItem[] = [
  {
    id: "act-1",
    name: "AIRA & AIFUL Hackathon (Group Activity)",
    issuer: "AIRA & AIFUL",
    date: "Oct 2024",
    icon: "🏆",
    badgeUrl: "/project/AIRA-AiFulHackathon-Activity.jpg"
  },
  {
    id: "act-2",
    name: "Microsoft AI Hackathon (Group Activity)",
    issuer: "Microsoft & AIAT",
    date: "Feb 2026",
    icon: "💻",
    badgeUrl: "/project/AI-Engineering-Skills-and-Hackathon-for-Employment-2026-Group-Activity.jpg"
  }
];

export const MOCK_TECH_STACK = [
  { category: "Web Frontend", icon: "🎨", skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"] },
  { category: "Backend & API", icon: "⚙️", skills: ["Node.js", "NestJS", "Python", "Flask", "FastAPI"] },
  { category: "Data & ML", icon: "🧠", skills: ["TensorFlow", "Keras", "OpenCV", "MediaPipe"] },
  { category: "DevOps & Cloud", icon: "☁️", skills: ["Docker", "Git", "Google Cloud", "n8n"] }
];

export const MOCK_CONTACT = {
  email: "na.nawattakorn@gmail.com",
  github: "github.com/Nawattakorn",
  linkedin: "linkedin.com/in/nawattakorn"
};

