import heroCourse1 from "../assets/heroCourse1.jpg";
import heroCourse2 from "../assets/heroCourse2.jpg";
import heroCourse3 from "../assets/heroCourse3.jpg";
import heroCourse4 from "../assets/heroCourse4.jpg";

// Base interface for content sections
interface ContentData {
  title: string;
  description: string;
}

// Landing page content for non-authenticated users
export const contentData: ContentData[] = [
  {
    title: "Welcome to Food Safety",
    description: "Join us in making food safety a priority",
  },
  {
    title: "Food Quality Matters",
    description: "Ensuring the highest standards in food handling",
  },
  {
    title: "Safe Food, Healthy Life",
    description: "Learn best practices for food safety management",
  },
  {
    title: "Together for Safety",
    description: "Building a community of food safety professionals",
  },
];

// Landing page content for authenticated users
export const contentDataLogin: ContentData[] = [
  {
    title: "Welcome Back",
    description: "Continue your journey in food safety",
  },
  {
    title: "Safe Food Practices",
    description: "Access your food safety management tools",
  },
  {
    title: "Quality Control",
    description: "Monitor and maintain food safety standards",
  },
  {
    title: "Professional Network",
    description: "Connect with food safety experts",
  },
];

// Interface defining the structure of a training course
export interface TrainingCourse {
  id: number;
  title: string;
  description: string;
  duration: string; // Format: "X.X hours" 
  level: "Beginner" | "Intermediate" | "Advanced";
  image: string;
}

// Collection of all available training courses
export const trainingCourses: TrainingCourse[] = [
  {
    id: 1,
    title: "Food Safety Fundamentals",
    description:
      "Learn the essential principles of food safety and hygiene in commercial kitchens",
    duration: "2 hours",
    level: "Beginner", // Perfect for new staff members
    image: heroCourse1,
  },
  {
    id: 2,
    title: "Temperature Control & Monitoring",
    description:
      "Master the critical aspects of temperature control in food storage and preparation",
    duration: "1.5 hours",
    level: "Intermediate", // For staff with basic knowledge
    image: heroCourse2,
  },
  {
    id: 3,
    title: "Cross-Contamination Prevention",
    description:
      "Advanced techniques to prevent cross-contamination in food handling",
    duration: "2.5 hours",
    level: "Advanced", // For experienced food handlers
    image: heroCourse3,
  },
  {
    id: 4,
    title: "Cleaning & Sanitization",
    description:
      "Comprehensive guide to cleaning and sanitizing food preparation areas",
    duration: "2 hours",
    level: "Intermediate", // Builds on basic knowledge
    image: heroCourse4,
  },
];

// Interface extending TrainingCourse with user-specific data
export interface PurchasedCourse extends TrainingCourse {
  progress: number; // Percentage of course completion (0-100)
  lastAccessed: string; // ISO 8601 datetime format
  completed?: boolean;
}

// Mock data for user's purchased courses with progress tracking
export const purchasedCourses: PurchasedCourse[] = [
  {
    ...trainingCourses[0], // Food Safety Fundamentals
    progress: 100, // 60% completed
    lastAccessed: "2024-03-10T09:00:00Z",
    completed: true,
  },
  {
    ...trainingCourses[2], // Cross-Contamination Prevention
    progress: 25, // 25% completed
    lastAccessed: "2024-03-09T14:30:00Z",
  },
];
