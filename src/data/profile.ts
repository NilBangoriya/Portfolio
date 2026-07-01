export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  highlight?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export const profile = {
  name: "Nil Bangoriya",
  title: "AI / ML Engineer",
  tagline: "Building intelligent systems that think, retrieve, and reason.",
  location: "India",
  email: "nilbangoriya1234@gmail.com",
  github: "https://github.com/nilbangoriya",
  linkedin: "https://linkedin.com/in/nilbangoriya",
  resumeUrl: "#",
  availableForHire: true,
  heroWords: [
    "Retrieval-Augmented Generation",
    "Large Language Models",
    "Vector Search",
    "MLOps",
    "Deep Learning",
    "Agentic AI",
  ],
  about: [
    "I'm an AI & Machine Learning Engineer passionate about building intelligent systems that solve real-world problems. My focus lies in Generative AI, Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), Multi-Agent AI Systems, Computer Vision, and MLOps.",
    "I'm currently seeking opportunities as an AI/ML or Generative AI Engineer where I can contribute to building impactful products, collaborate with talented teams, and continue growing as an engineer while solving challenging real-world problems.",
  ],
  stats: [
    { value: "One+", label: "Years in ML/AI" },
    { value: "Seven+", label: "Projects Shipped" },
    { value: "Four+", label: "Models Deployed" },
    { value: "Infinite", label: "Curiosity" },
  ],
};

export const skills: SkillCategory[] = [
  {
    name: "AI & ML",
    skills: [
      "Scikit-Learn",
      "PyTorch",
      "Hugging Face",
      "LangChain",
      "LlamaIndex",
      "RAG",
      "Fine-tuning (LoRA/QLoRA)",
      "Vector DBs",
      "Prompt Engineering",
      "Multi-Agent Systems",
    ],
  },
  {
    name: "Engineering",
    skills: [
      "Python",
      "FastAPI",
      "Docker",
      "Kubernetes",
      "Azure/aws",
      "CI/CD",
    ],
  },
  {
    name: "Data & MLOps",
    skills: [
      "MLflow",
      "Weights & Biases",
      "Airflow",
      "Spark",
      "Feature Stores",
      "Model Monitoring",
      "A/B Testing",
      "Data Pipelines",
      "Experiment Tracking",
      "GPU Optimization",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "AI Medical Assistant",
    description:
      "Production-ready medical AI assistant built with Agentic RAG, multimodal reasoning, and specialized AI agents for clinical Q&A, medical image analysis, voice interaction, and evidence-grounded responses with safety guardrails.",
    tags: [
      "Agentic AI",
      "LangGraph",
      "FastAPI",
      "RAG",
      "Qdrant",
      "Computer Vision"
    ],
    github: "https://github.com/NilBangoriya/MedicalAssistant",
    highlight: "Featured",
  },
  {
    title: "Multi-Agent AI Research System",
    description:
      "Autonomous research pipeline that coordinates multiple AI agents for planning, web retrieval, analysis, synthesis, and report generation, producing structured research documents with minimal human intervention.",
    tags: [
      "Multi-Agent",
      "LLMs",
      "Groq",
      "Python",
      "Research AI",
      "Automation"
    ],
    github: "https://github.com/NilBangoriya/AI-Researcher",
    highlight: "Featured",
  },
  {
    title: "AI Video Authenticity Detector",
    description:
      "Deepfake detection framework leveraging computer vision, temporal analysis, facial feature extraction, and multimodal verification to distinguish AI-generated videos from authentic media.",
    tags: [
      "Computer Vision",
      "Deepfake Detection",
      "OpenCV",
      "PyTorch",
      "Video Analysis"
    ],
    github: "https://github.com/NilBangoriya/Video-Authenticator",
    highlight: "Featured",
  },
];

export const experience: Experience[] = [
  {
    role: "Python Intern",
    company: "Interactive Warriors PVT LTD",
    period: "JAN-2025 - June-2025",
    description: "Building production AI systems from research to deployment.",
    highlights: [
      "Designed and deployed RAG pipelines serving 10K+ daily queries",
      "Fine-tuned LLMs with QLoRA achieving 40% domain accuracy improvement",
      "Built MLOps infrastructure with automated retraining and monitoring",
    ],
  },
  {
    role: "Python Intern",
    company: "Codevale Technologies",
    period: "JULY-2024  -  JAN-2025",
    description: "Applied deep learning to real-world data problems.",
    highlights: [
      "Developed NLP models for text classification and entity extraction",
      "Optimized inference latency by 60% through model quantization",
      "Collaborated on A/B testing framework for model rollouts",
    ],
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
