import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useUserData } from "../../contexts/UserDataContext";
import { Link } from "react-router-dom";
import CourseCard from "../../components/training/CourseCard";

export interface TrainingCourse {
  id: number;
  title: string;
  description: string;
  duration: string; // Format: "X.X hours"
  level: "Beginner" | "Intermediate" | "Advanced";
  file_content: string;
  active: boolean;
  enrolled: boolean;
}

export const mockTrainingCourses: TrainingCourse[] = [
  {
    id: 1,
    title: "Food Safety Basics",
    description: "Learn the fundamental principles of food safety and handling",
    duration: "2.5 hours",
    level: "Beginner",
    file_content: "https://images.unsplash.com/photo-1635321593217-40050ad13c74",
    active: true,
    enrolled: false
  },
  {
    id: 2,
    title: "Advanced Food Handling",
    description: "Master advanced techniques in food handling and storage",
    duration: "3.0 hours",
    level: "Advanced",
    file_content: "https://images.unsplash.com/photo-1499125562588-29fb8a56b5d5", // Updated image URL
    active: true,
    enrolled: false
  },
  {
    id: 3,
    title: "Kitchen Hygiene",
    description: "Essential practices for maintaining kitchen hygiene",
    duration: "1.5 hours",
    level: "Beginner",
    file_content: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4",
    active: true,
    enrolled: false
  },
  {
    id: 4,
    title: "Food Storage Guidelines",
    description: "Learn proper food storage techniques and temperature control",
    duration: "2.0 hours",
    level: "Intermediate",
    file_content: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9",
    active: true,
    enrolled: false
  },
  {
    id: 5,
    title: "Contamination Prevention",
    description: "Strategies to prevent food contamination in professional settings",
    duration: "2.5 hours",
    level: "Intermediate",
    file_content: "https://images.unsplash.com/photo-1585338107529-13afc5f02586", // Updated image URL
    active: true,
    enrolled: false
  }
];

const getInitialCourses = () => {
  const storedCourses = localStorage.getItem('trainingCourses');
  if (storedCourses) {
    return JSON.parse(storedCourses);
  }
  // If no stored courses, use the mock data
  localStorage.setItem('trainingCourses', JSON.stringify(mockTrainingCourses));
  return mockTrainingCourses;
};

const TrainingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useUserData(); // Use the custom hook to get user data
  const [activeTab, setActiveTab] = useState("all");
  const [trainingCourses, setTrainingCourses] = useState<TrainingCourse[]>(getInitialCourses());

  const handleEnroll = (courseId: number) => {
    setTrainingCourses(prevCourses => {
      const updatedCourses = prevCourses.map(course =>
        course.id === courseId ? { ...course, enrolled: true } : course
      );
      // Save to localStorage whenever courses are updated
      localStorage.setItem('trainingCourses', JSON.stringify(updatedCourses));
      return updatedCourses;
    });
  };

  const getEnrolledCount = (courses: TrainingCourse[]): number => {
    return courses.filter(course => course.enrolled).length;
  };

  const getAvailableCount = (courses: TrainingCourse[]): number => {
    return courses.filter(course => !course.enrolled).length;
  };

  // Reset courses function (optional - for testing)
  // const resetCourses = () => {
  //   localStorage.setItem('trainingCourses', JSON.stringify(mockTrainingCourses));
  //   setTrainingCourses(mockTrainingCourses);
  // };

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % trainingCourses.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [trainingCourses.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % trainingCourses.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev =>
      prev === 0 ? trainingCourses.length - 1 : prev - 1
    );
  };

  return (
    <>
      {/* Welcoming message */}
      <div className="flex items-center lg:mx-[3rem] gap-3 mt-[1.5rem]">
        <div className="lg:h-20 lg:w-20 w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
          <span className="text-white text-lg font-semibold">
            {user?.first_name?.[0]}
            {user?.last_name?.[0]}
          </span>
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl lg:text-4xl font-bold text-gray-800">
            Welcome back, {user?.first_name}!
          </h1>
          <Link className="underline text-green-500 font-medium" to="/interests">
            Add interests
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative lg:h-[600px] h-[400px] rounded-2xl mt-[1.5rem] shadow-2xl lg:mt-[3rem] lg:mx-[3rem] overflow-hidden">
        {/* Carousel */}
        <div className="relative  h-full">
          {trainingCourses.map((course, index) => (
            <div
              key={course.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
                ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${course.file_content})` }}
              >
                <div className="absolute inset-0 bg-black/50" />
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl text-white">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4
                      ${
                        course.level === "Beginner"
                          ? "bg-green-500"
                          : course.level === "Intermediate"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {course.level}
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                      {course.title}
                    </h1>
                    <p className="text-lg mb-6 text-gray-200">
                      {course.description}
                    </p>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                        Duration: {course.duration}
                      </span>
                      <button className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-medium transition-colors">
                        Start Course
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {trainingCourses.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all
                ${index === currentSlide ? "bg-white w-4" : "bg-white/50"}`}
            />
          ))}
        </div>
      </section>

      {/* Learning lists */}
      <section className="mt-16 lg:mx-[3rem]">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("all")}
              className={`py-4 px-1 relative font-medium text-sm ${
                activeTab === "all"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              All Courses
              <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                {getAvailableCount(trainingCourses)}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("enrolled")}
              className={`py-4 px-1 relative font-medium text-sm ${
                activeTab === "enrolled"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Enrolled
              <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                {getEnrolledCount(trainingCourses)}
              </span>
            </button>
          </div>
        </div>

        {/* Course Grid */}
        <div className="mt-8">
          {trainingCourses.filter(course => 
            activeTab === "all" 
              ? !course.enrolled 
              : course.enrolled
          ).length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
                <svg 
                  className="w-8 h-8 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 100-16 8 8 0 000 16z" 
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                {activeTab === "all" ? "No courses available" : "No enrolled courses"}
              </h3>
              <p className="text-gray-500">
                {activeTab === "all" 
                  ? "Check back later for new courses" 
                  : "Start learning by enrolling in a course"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {trainingCourses
                .filter(course => 
                  activeTab === "all" 
                    ? !course.enrolled 
                    : course.enrolled
                )
                .map(course => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    onEnroll={() => handleEnroll(course.id)}
                  />
                ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default TrainingPage;
