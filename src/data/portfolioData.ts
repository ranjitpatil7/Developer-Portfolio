export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  challenge: string;
  tradeOffs: string;
  solution: string;
  metrics: CaseStudyMetric[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  categoryTags: string[];
  githubUrl: string;
  techStack: string[];
  architectureNodes: {
    label: string;
    sublabel?: string;
    type: 'client' | 'gateway' | 'service' | 'cache' | 'database' | 'queue' | 'ai';
  }[];
  architectureSummary: string;
  bullets: string[];
  caseStudy?: CaseStudy;
  featured?: boolean;
  lensPriority: {
    all: number;
    fullstack: number;
    java: number;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  issuer: string;
  category: 'Patent & Publication' | 'Certification' | 'Simulation';
  credentialBadge: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  score: string;
  period?: string;
  iconType: 'degree' | 'college' | 'school';
}

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export const PERSONAL_DETAILS = {
  name: "Ranjit Patil",
  headlineRoles: "Full Stack Developer | Java & Spring Boot Developer",
  phone: "+91 8767751737",
  email: "ranjitpatilsknscoecomp@gmail.com",
  github: "https://github.com/ranjitpatil7",
  linkedin: "https://www.linkedin.com/in/ranjit-patil-cse",
  fullStackResumeUrl: "/Ranjit_Patil_Full_Stack_Resume.pdf",
  javaResumeUrl: "/Ranjit_Patil_Java_Developer_Resume.pdf",
  scheduleMeetingUrl: "https://cal.com/ranjit-patil/15min",
  scheduleMeetingFallback: "mailto:ranjitpatilsknscoecomp@gmail.com?subject=15-Min%20Technical%20Intro%20-%20Ranjit%20Patil",
};

export const HERO_COPY = {
  statusBadge: "Open to Full-Time Software Roles",
  headline: "Building reliable backend systems and responsive real-time web applications.",
  summary: "Final-year Computer Science and Engineering student with hands-on experience building full-stack web applications using React.js, TypeScript, Node.js, Python FastAPI, and Java Spring Boot. Skilled in developing responsive user interfaces, REST APIs, real-time dashboards, and database-driven applications using PostgreSQL, MySQL, MongoDB, and Redis.",
};

export const ABOUT_COPY = {
  paragraph1: "I am a final-year Computer Science and Engineering undergraduate (Honors in AI & ML) at SKN Sinhgad College of Engineering, Pandharpur (2023–2027, CGPA: 7.52), currently working as a remote Full Stack Development Intern at Cognifyz IT Solutions Pvt. Ltd.",
  paragraph2: "I enjoy working across both frontend interfaces and backend systems—whether that involves preventing duplicate seat reservations under concurrent requests using Redis atomic locks and JPA optimistic locking, streaming live location updates from 1,000 simulated vehicles onto an interactive map, or building spatial health-monitoring dashboards. I have also co-authored a published research paper and registered a patent for EpiGuard AI.",
  internshipBadge: "Full Stack Development Intern @ Cognifyz IT Solutions Pvt. Ltd.",
};

export const INTERNSHIP_EXPERIENCE: ExperienceItem = {
  title: "Full Stack Development Intern",
  company: "Cognifyz IT Solutions Pvt. Ltd.",
  location: "Remote",
  period: "Oct 2026 – Present",
  bullets: [
    "Develop responsive frontend components using React and TypeScript and integrate them with backend REST APIs.",
    "Implement form validation, API data fetching, and authentication-related features while following the application's access-control requirements.",
    "Work with relational databases to design schemas, write SQL queries, and troubleshoot API and database integration issues.",
  ],
};

export const PROJECTS: Project[] = [
  {
    id: "ticket-reserve",
    title: "TicketReserve",
    subtitle: "Event Ticketing & Seat Reservation Platform",
    year: "2026",
    categoryTags: ["Java & Spring Boot", "Full-Stack & Real-Time"],
    githubUrl: "https://github.com/ranjitpatil7/Ticket-Reserve",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "React Query",
      "Java 17",
      "Spring Boot",
      "Spring Security",
      "JWT",
      "JPA/Hibernate",
      "MySQL",
      "Redis",
      "Flyway",
      "Docker"
    ],
    architectureSummary: "React + React Query (Vite) -> Spring Boot 3 REST API -> Redis (SET NX Atomic Holds) & MySQL 8 (JPA @Version Locking)",
    architectureNodes: [
      { label: "React + React Query (Vite)", sublabel: "Seat Matrix & Client State", type: "client" },
      { label: "Spring Boot 3 REST API", sublabel: "JWT Auth & Reservation Manager", type: "service" },
      { label: "Redis (SET NX)", sublabel: "Atomic 10m Distributed Lock", type: "cache" },
      { label: "MySQL 8 (JPA @Version)", sublabel: "Optimistic Locking & ACID Persistence", type: "database" }
    ],
    bullets: [
      "Built a full-stack ticket booking application with seat selection, booking management, and checkout features using React and Spring Boot.",
      "Prevented duplicate seat reservations through Redis atomic locks, JPA optimistic locking, and MySQL constraints.",
      "Implemented booking status transitions, idempotency checks for repeated requests, and automatic release of expired seat holds.",
      "Secured APIs using JWT authentication, role-based access control, and booking ownership checks."
    ],
    caseStudy: {
      challenge: "Preventing race-condition double-bookings during sudden ticket release spikes (500+ users selecting identical seats simultaneously).",
      tradeOffs: "Pessimistic database row locking (SELECT ... FOR UPDATE) eliminated double-bookings but choked the MySQL thread pool, spiking p99 latency beyond 1,400ms and risking deadlocks.",
      solution: "Engineered a dual-layer concurrency guard: Redis SET NX atomic lock with a 10-minute auto-expiry TTL for instant fast-path reservation holds, combined with MySQL 8 JPA @Version optimistic locking on final checkout commit.",
      metrics: [
        { label: "Double Bookings", value: "0 across 5,000 simulated requests" },
        { label: "p99 Latency Drop", value: "1,400ms → 42ms" },
        { label: "Hold Auto-Release", value: "10-minute TTL" },
        { label: "Database Load", value: "78% fewer lock waits" }
      ]
    },
    featured: true,
    lensPriority: { all: 1, fullstack: 1, java: 1 }
  },
  {
    id: "aegis-telemetry",
    title: "Aegis Cloud Telemetry",
    subtitle: "IoT Fleet Management Platform",
    year: "2026",
    categoryTags: ["Full-Stack & Real-Time"],
    githubUrl: "https://github.com/ranjitpatil7/IOT-Fleet-Management-Microservices.",
    techStack: [
      "React",
      "JavaScript",
      "MapLibre GL JS",
      "Turf.js",
      "Node.js",
      "Express",
      "Socket.io",
      "Redpanda (Kafka)",
      "Redis",
      "MongoDB Time-Series",
      "Docker"
    ],
    architectureSummary: "IoT Simulator (1,000 Trucks/s) -> Node.js + Socket.io Gateway -> Redpanda (Kafka) + DLQ Worker -> Redis Pub/Sub & MongoDB Time-Series -> React + MapLibre WebGL Map",
    architectureNodes: [
      { label: "IoT Simulator", sublabel: "1,000 Trucks/s Telemetry", type: "client" },
      { label: "Node.js + Socket.io Gateway", sublabel: "Real-time Ingestion", type: "gateway" },
      { label: "Redpanda (Kafka) + DLQ Worker", sublabel: "High-throughput Streaming & Retry Worker", type: "queue" },
      { label: "Redis Pub/Sub & MongoDB Time-Series", sublabel: "Geofence State & Route Playback", type: "database" },
      { label: "React + MapLibre WebGL Map", sublabel: "Live Fleet View & Turf.js Boundaries", type: "client" }
    ],
    bullets: [
      "Built a real-time fleet monitoring platform that simulates telemetry from 1,000 trucks per second and displays vehicle locations on an interactive map.",
      "Implemented live location updates and geofence alerts using Socket.io, Redis Pub/Sub, MapLibre GL JS, and Turf.js.",
      "Added historical route playback by retrieving vehicle location records from MongoDB and displaying routes on the map.",
      "Implemented Kafka-based error handling with a dead-letter queue and retry worker, along with temperature-trend monitoring to flag potential engine overheating."
    ],
    caseStudy: {
      challenge: "Ingesting and rendering high-velocity GPS telemetry from 1,000 trucks/sec without dropping packets or stalling the UI map thread.",
      tradeOffs: "Direct REST HTTP endpoints and continuous React state updates caused Node event-loop blockage, missed packets, and dropped client frame rates to below 18 FPS.",
      solution: "Implemented Node.js Socket.io ingestion backed by Kafka/Redpanda topic partitioning and Dead-Letter Queues (DLQ) with retry workers, rendering geofence polygons on the client using MapLibre GL JS GPU WebGL layers.",
      metrics: [
        { label: "Telemetry Throughput", value: "1,000 trucks/sec continuous" },
        { label: "Message Delivery Rate", value: "99.98% with DLQ retry" },
        { label: "Client Frame Rate", value: "Consistent 60 FPS WebGL" },
        { label: "Geofence Evaluation", value: "Turf.js in-memory spatial index" }
      ]
    },
    featured: true,
    lensPriority: { all: 2, fullstack: 2, java: 3 }
  },
  {
    id: "pulse-triage",
    title: "Pulse-Triage",
    subtitle: "Healthcare IoT Telemetry & Predictive Triage System",
    year: "2026",
    categoryTags: ["Java & Spring Boot", "Full-Stack & Real-Time", "AI & Geospatial"],
    githubUrl: "https://github.com/ranjitpatil7/Pulse-Triage",
    techStack: [
      "Java 17",
      "Spring Boot",
      "Spring Security",
      "JPA/Hibernate",
      "Apache Kafka",
      "Python",
      "FastAPI",
      "gRPC",
      "Java Stream API",
      "Flyway",
      "Next.js",
      "TypeScript"
    ],
    architectureSummary: "Simulated Hospital Sensors -> Kafka & Spring Boot (Java Stream API) -> gRPC Low-Latency Bridge -> Python FastAPI Anomaly Service -> Next.js Triage UI",
    architectureNodes: [
      { label: "Simulated Hospital Sensors", sublabel: "Continuous Patient Vitals", type: "client" },
      { label: "Kafka & Spring Boot (Java Stream API)", sublabel: "Rolling Statistical Windows & Ingestion", type: "service" },
      { label: "gRPC Low-Latency Bridge", sublabel: "Protobuf Remote Procedure Call", type: "gateway" },
      { label: "Python FastAPI Anomaly Service", sublabel: "Patient Triage Scoring Model", type: "ai" },
      { label: "Next.js Triage UI", sublabel: "Real-time Clinical Dashboard", type: "client" }
    ],
    bullets: [
      "Developed a real-time healthcare telemetry platform using Spring Boot, Kafka, and Next.js to stream and monitor continuous patient vital signs from simulated IoT devices.",
      "Used the Java Stream API to filter noisy sensor readings and calculate rolling statistical windows before persisting records to the database.",
      "Connected the Spring Boot backend with a Python service over gRPC for low-latency anomaly detection and patient triage scoring, managing database migrations with Flyway.",
      "Enforced Spring Security role-based access control and audit logging to protect patient records and track data access."
    ],
    caseStudy: {
      challenge: "Streaming real-time ICU sensor vitals and detecting anomalies without introducing database write bottlenecks or ML inference delays.",
      tradeOffs: "REST polling between microservices introduced unacceptable 300ms+ network serialization delays, while synchronous DB inserts choked under multi-bed sensor streaming.",
      solution: "Employed the Java Stream API in Spring Boot for rolling window calculations, streamed events through Kafka, and bridged to Python FastAPI anomaly detection via low-latency binary gRPC Protobuf channels.",
      metrics: [
        { label: "Interservice Latency", value: "< 12ms via gRPC Protobuf" },
        { label: "Stream Processing", value: "Java Stream rolling statistical windows" },
        { label: "Security & Auditing", value: "Spring Security RBAC + Flyway versioning" }
      ]
    },
    featured: true,
    lensPriority: { all: 3, fullstack: 4, java: 2 }
  },
  {
    id: "epiguard-ai",
    title: "EpiGuard AI",
    subtitle: "Community Health Monitoring & Early-Warning Platform",
    year: "2026",
    categoryTags: ["Full-Stack & Real-Time", "AI & Geospatial"],
    githubUrl: "https://github.com/ranjitpatil7/Epi-Guard",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "FastAPI",
      "Python",
      "SQLAlchemy",
      "PostgreSQL",
      "PostGIS",
      "Redis",
      "XGBoost",
      "Docker"
    ],
    architectureSummary: "React + TypeScript (shadcn/ui) -> Python FastAPI + Pydantic -> XGBoost / Random Forest Engine -> PostgreSQL (PostGIS Spatial DB) & Redis",
    architectureNodes: [
      { label: "React + TypeScript (shadcn/ui)", sublabel: "Role-Based Role Dashboards", type: "client" },
      { label: "Python FastAPI + Pydantic", sublabel: "Validation & Spatial Ingestion API", type: "service" },
      { label: "XGBoost / Random Forest Engine", sublabel: "Water-Borne Disease Outbreak Predictor", type: "ai" },
      { label: "PostgreSQL (PostGIS Spatial DB) & Redis", sublabel: "Geospatial Polygon Queries & Caching", type: "database" }
    ],
    bullets: [
      "Developed a public-health decision-support platform to help health officials monitor water-quality data and identify areas at risk of water-borne diseases.",
      "Built role-based dashboards for administrators, health officials, analysts, and community workers, with regional risk visualization using PostGIS.",
      "Integrated data validation, anomaly detection, and machine-learning workflows to support risk analysis across live, demo, and simulation modes.",
      "Co-authored a published research paper and registered a patent based on the platform's predictive community health monitoring workflow."
    ],
    caseStudy: {
      challenge: "Predicting community waterborne disease outbreaks across geographic zones with sparse rural telemetry.",
      tradeOffs: "Standard flat SQL queries were incapable of efficient spatial radius indexing, causing 2-second geographical boundary lookups.",
      solution: "Integrated PostgreSQL with PostGIS spatial indexing paired with Redis caching and XGBoost risk-scoring pipelines, co-authoring a published research paper and registered patent.",
      metrics: [
        { label: "Intellectual Property", value: "Patent & Paper (SIH25001)" },
        { label: "Spatial Query Latency", value: "< 25ms via PostGIS R-Tree" },
        { label: "Role Dashboards", value: "Admin, Official, Analyst, Community" }
      ]
    },
    featured: true,
    lensPriority: { all: 4, fullstack: 3, java: 5 }
  },
  {
    id: "enterprise-rag-engine",
    title: "Enterprise Agentic Knowledge Graph & Hybrid RAG Engine",
    subtitle: "Graph-Augmented Enterprise Intelligence",
    year: "2026",
    categoryTags: ["AI & Geospatial", "Full-Stack & Real-Time"],
    githubUrl: "https://github.com/ranjitpatil7/Enterprise-Agentic-Knowledge-Graph-And-Hybrid-RAG-Engine",
    techStack: [
      "Python",
      "FastAPI",
      "Neo4j",
      "Qdrant",
      "LangGraph",
      "Docling",
      "React",
      "TypeScript",
      "Docker"
    ],
    architectureSummary: "Document Ingestion (Docling) -> Neo4j Knowledge Graph + Qdrant Vector DB -> LangGraph Agent Router -> Groundedness Check & FastAPI Stream",
    architectureNodes: [
      { label: "Document Ingestion (Docling)", sublabel: "Multi-modal Chunking & Entity Extraction", type: "client" },
      { label: "Neo4j Knowledge Graph + Qdrant Vector DB", sublabel: "Hybrid Traversal & Dense Vector Index", type: "database" },
      { label: "LangGraph Agent Router", sublabel: "Multi-Step Subgraph Traversal & Routing", type: "ai" },
      { label: "Groundedness Check & FastAPI Stream", sublabel: "Hallucination Guardrails & Token Stream", type: "service" }
    ],
    bullets: [
      "Built an enterprise retrieval-augmented generation (RAG) system that combines Neo4j knowledge-graph traversal with Qdrant vector similarity search for context-aware document querying.",
      "Orchestrated multi-step retrieval and query routing using LangGraph agents to connect structured graph relationships with unstructured text chunks.",
      "Added response streaming and groundedness checks to verify that generated answers stay supported by the retrieved source documents.",
      "Exposed the retrieval and verification pipeline through FastAPI REST and streaming endpoints for interactive querying."
    ],
    featured: false,
    lensPriority: { all: 5, fullstack: 5, java: 6 }
  },
  {
    id: "cloud-ops-autopilot",
    title: "Cloud-Ops Auto-Pilot",
    subtitle: "AI Cloud Infrastructure Audit Platform",
    year: "2026",
    categoryTags: ["Full-Stack & Real-Time", "AI & Geospatial"],
    githubUrl: "https://github.com/ranjitpatil7/Cloud-Ops-Auto-Pilot",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Python",
      "FastAPI",
      "CrewAI",
      "Docker"
    ],
    architectureSummary: "Next.js Audit Dashboard -> Python FastAPI Backend -> CrewAI Multi-Agent Workflow -> Cost & Security Remediation Report",
    architectureNodes: [
      { label: "Next.js Audit Dashboard", sublabel: "Resource Breakdown & Policy Controls", type: "client" },
      { label: "Python FastAPI Backend", sublabel: "Async Audit Triggers & Job Dispatch", type: "service" },
      { label: "CrewAI Multi-Agent Workflow", sublabel: "Cost & Security Analyzer Agents", type: "ai" },
      { label: "Cost & Security Remediation Report", sublabel: "Actionable Step-by-Step Guidance", type: "database" }
    ],
    bullets: [
      "Developed a full-stack cloud infrastructure auditing web application using Next.js, TypeScript, and Python FastAPI to identify unused resources and security misconfigurations.",
      "Integrated CrewAI multi-agent workflows to analyze infrastructure configurations and suggest practical cost-optimization and security fixes.",
      "Built an interactive Next.js dashboard to display audit findings, resource breakdowns, and step-by-step remediation recommendations.",
      "Connected frontend audit triggers with asynchronous FastAPI endpoints for structured report generation."
    ],
    featured: false,
    lensPriority: { all: 6, fullstack: 6, java: 4 }
  }
];

export const TECHNICAL_SKILLS = {
  Languages: ["Java 17", "JavaScript (ES6+)", "TypeScript", "Python", "SQL", "HTML5", "CSS3"],
  Frontend: ["React.js", "Next.js", "React Query", "Redux Toolkit", "Tailwind CSS", "shadcn/ui", "Vite", "MapLibre GL JS", "Recharts"],
  Backend: ["Spring Boot", "Spring Security", "Node.js", "Express.js", "FastAPI", "REST APIs", "gRPC", "Socket.io", "JPA/Hibernate", "SQLAlchemy", "JWT", "Role-Based Access Control (RBAC)"],
  "Databases & Messaging": ["PostgreSQL", "PostGIS", "MySQL", "MongoDB", "Neo4j", "Redis", "Redpanda (Kafka)"],
  "DevOps, Testing & Tools": ["Docker", "Docker Compose", "Nginx", "Flyway", "Alembic", "Git", "GitHub Actions", "Pytest", "Vitest", "JUnit 5", "Mockito", "MockMvc", "Linux"],
  "Core CS": ["Data Structures & Algorithms", "Object-Oriented Programming (OOP)", "DBMS", "Operating Systems", "Computer Networks", "Concurrency Control"]
};

// Skill marquee tokens with icons/colors
export const MARQUEE_SKILLS_ROW1 = [
  { name: "Java 17", category: "Backend", color: "#f89820" },
  { name: "Spring Boot", category: "Backend", color: "#6db33f" },
  { name: "React.js", category: "Frontend", color: "#61dafb" },
  { name: "TypeScript", category: "Languages", color: "#3178c6" },
  { name: "Redis", category: "Databases", color: "#dc382d" },
  { name: "MySQL", category: "Databases", color: "#00758f" },
  { name: "PostgreSQL", category: "Databases", color: "#336791" },
  { name: "Docker", category: "DevOps", color: "#2496ed" },
  { name: "FastAPI", category: "Backend", color: "#05998b" },
  { name: "Kafka", category: "Messaging", color: "#e05344" },
];

export const MARQUEE_SKILLS_ROW2 = [
  { name: "Next.js", category: "Frontend", color: "#ffffff" },
  { name: "Tailwind CSS", category: "Frontend", color: "#38bdf8" },
  { name: "Neo4j", category: "Databases", color: "#008cc1" },
  { name: "Python", category: "Languages", color: "#3776ab" },
  { name: "Node.js", category: "Backend", color: "#68a063" },
  { name: "gRPC", category: "Backend", color: "#244c5a" },
  { name: "Socket.io", category: "Real-Time", color: "#010101" },
  { name: "PostGIS", category: "Databases", color: "#5b90b8" },
  { name: "Spring Security", category: "Backend", color: "#6db33f" },
  { name: "Git", category: "DevOps", color: "#f05032" },
];

export const EDUCATION_LIST: EducationItem[] = [
  {
    degree: "Bachelor of Engineering – Computer Science and Engineering (Honors - AI & ML)",
    institution: "SKN Sinhgad College of Engineering, Pandharpur",
    period: "2023–2027",
    score: "CGPA: 7.52",
    iconType: "degree"
  },
  {
    degree: "Higher Secondary Certificate (HSC – 12th)",
    institution: "Ligade Patil Junior College of Science, Karad",
    score: "Percentage: 75.67%",
    iconType: "college"
  },
  {
    degree: "Secondary School Certificate (SSC – 10th)",
    institution: "Shivanjali English Medium School, Navarasta",
    score: "Percentage: 81.40%",
    iconType: "school"
  }
];

export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: "patent-publication",
    title: "Patent & Publication",
    description: 'Published research paper and registered patent for "Smart Community Health Monitoring and Early Warning Platform" (EpiGuard AI, 2026).',
    date: "2026",
    issuer: "Intellectual Property India / Academic Journal",
    category: "Patent & Publication",
    credentialBadge: "SIH25001"
  },
  {
    id: "neo4j-certified",
    title: "Neo4j Certified Professional",
    description: "Certified in Graph Databases and Cypher by GraphAcademy (Oct 2026).",
    date: "Oct 2026",
    issuer: "Neo4j GraphAcademy",
    category: "Certification",
    credentialBadge: "Certified Professional"
  },
  {
    id: "oracle-agentic-ai",
    title: "Agentic AI Certified Foundations Associate",
    description: "Certified by Oracle University (October 2026).",
    date: "October 2026",
    issuer: "Oracle University",
    category: "Certification",
    credentialBadge: "Foundations Associate"
  },
  {
    id: "nptel-cloud",
    title: "NPTEL Cloud Computing (Elite Certificate)",
    description: "Certified by IIT Kharagpur (2026).",
    date: "2026",
    issuer: "IIT Kharagpur / NPTEL",
    category: "Certification",
    credentialBadge: "Elite Certificate"
  },
  {
    id: "tata-simulations",
    title: "TATA Group Virtual Job Simulations (Forage)",
    description: "Completed practical job simulations in GenAI Powered Data Analytics (Oct 2026) and Cybersecurity IAM Strategy (Oct 2026).",
    date: "Oct 2026",
    issuer: "TATA Group (via Forage)",
    category: "Simulation",
    credentialBadge: "Double Verified Simulation"
  }
];
