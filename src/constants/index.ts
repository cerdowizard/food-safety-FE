import heroCourse1 from "../assets/heroCourse1.jpg";
import heroCourse2 from "../assets/heroCourse2.jpg";
import heroCourse3 from "../assets/heroCourse3.jpg";
import heroCourse4 from "../assets/heroCourse4.jpg";

interface ContentData {
  title: string;
  description: string;
}

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

export interface TrainingCourse {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  image: string;
}

export const trainingCourses: TrainingCourse[] = [
  {
    id: 1,
    title: "Food Safety Fundamentals",
    description:
      "Learn the essential principles of food safety and hygiene in commercial kitchens",
    duration: "2 hours",
    level: "Beginner",
    image: heroCourse1,
  },
  {
    id: 2,
    title: "Temperature Control & Monitoring",
    description:
      "Master the critical aspects of temperature control in food storage and preparation",
    duration: "1.5 hours",
    level: "Intermediate",
    image: heroCourse2,
  },
  {
    id: 3,
    title: "Cross-Contamination Prevention",
    description:
      "Advanced techniques to prevent cross-contamination in food handling",
    duration: "2.5 hours",
    level: "Advanced",
    image: heroCourse3,
  },
  {
    id: 4,
    title: "Cleaning & Sanitization",
    description:
      "Comprehensive guide to cleaning and sanitizing food preparation areas",
    duration: "2 hours",
    level: "Intermediate",
    image: heroCourse4,
  },
];

// Add this to your existing types
export interface PurchasedCourse extends TrainingCourse {
  progress: number;
  lastAccessed: string;
}

// Add this to your constants
export const purchasedCourses: PurchasedCourse[] = [
  {
    ...trainingCourses[0],
    progress: 60,
    lastAccessed: "2024-03-10T09:00:00Z",
  },
  {
    ...trainingCourses[2],
    progress: 25,
    lastAccessed: "2024-03-09T14:30:00Z",
  },
];
