import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useUserData } from "../../contexts/UserDataContext";
import { Link } from "react-router-dom";
import CourseCard from "../../components/training/CourseCard";
import axiosInstance from "../../services/real/api";

export interface TrainingCourse {
  id: number;
  title: string;
  description: string;
  duration: string; // Format: "X.X hours"
  level: "Beginner" | "Intermediate" | "Advanced";
  file_content: string;
}

const TrainingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useUserData(); // Use the custom hook to get user data
  // const [activeTab, setActiveTab] = useState("all");
  const [trainingCourses, setTrainingCourses] = useState<TrainingCourse[]>([]);

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

  useEffect(()=> {
    const getAllCourses = async() =>{
      try {
        const response = await axiosInstance.get('/api/v1/course')
        console.log(response.data)
        setTrainingCourses(response.data?.payload)
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }
    getAllCourses()
  },[])

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
        {/* Tabs - Remove the My Learning tab */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              className="py-4 px-1 relative font-medium text-sm text-green-600 border-b-2 border-green-600"
            >
              Courses
            </button>
          </div>
        </div>

        {/* Course Grid - Simplify to only show trainingCourses */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {trainingCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </>
  );
};

export default TrainingPage;
