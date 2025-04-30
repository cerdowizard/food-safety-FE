import { useParams } from "react-router-dom";
import { trainingCourses, purchasedCourses } from "../../constants";
import { Play, BookOpen, Clock, ChevronLeft, Users } from "lucide-react";
import { Link } from "react-router-dom";

const CourseDetailPage = () => {
  const { id } = useParams();
  const course = [...trainingCourses, ...purchasedCourses].find(
    c => c.id === Number(id)
  );

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-4 sm:py-8">
      <div className="max-w-7xl -mx-4 px-4 sm:px-6 lg:px-8">
        {/* Back button - responsive padding and size */}
        <Link
          to="/training"
          className="group inline-flex items-center text-xs sm:text-sm text-gray-600 hover:text-gray-900 mb-4 sm:mb-8 transition-all"
        >
          <span className="bg-white p-1.5 sm:p-2 rounded-full shadow-sm group-hover:-translate-x-1 transition-transform">
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          </span>
          <span className="ml-2">Back to Courses</span>
        </Link>

        {/* Main grid - stack on mobile, side-by-side on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden mb-4 sm:mb-8 transform transition-all hover:shadow-lg">
              {/* Video section - adjust height for different screens */}
              <div className="relative h-48 sm:h-72 md:h-96">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all rounded-full p-4 sm:p-6 transform hover:scale-110">
                    <Play className="w-8 h-8 sm:w-12 sm:h-12 text-white" fill="white" />
                  </button>
                </div>
              </div>

              {/* Content section */}
              <div className="p-4 sm:p-6 md:p-8">
                {/* Course metadata - wrap on small screens */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <span
                    className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors
                    ${
                      course.level === "Beginner"
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : course.level === "Intermediate"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        : "bg-red-100 text-red-800 hover:bg-red-200"
                    }`}
                  >
                    {course.level}
                  </span>
                  <div className="flex items-center text-gray-500 bg-gray-100 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-gray-500 bg-gray-100 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    2,345 students
                  </div>
                </div>

                {/* Course title and description */}
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
                  {course.title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  {course.description}
                </p>

                {/* Course content section */}
                <div className="border-t border-gray-100 pt-6 sm:pt-8">
                  <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center">
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-green-600" />
                    Course Content
                  </h2>
                  <div className="space-y-3 sm:space-y-4">
                    {[1, 2, 3].map(module => (
                      <div
                        key={module}
                        className="flex items-center justify-between p-3 sm:p-5 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center">
                          <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm mr-3 sm:mr-4">
                            <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-base sm:text-lg">
                              Module {module}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500">15 minutes</p>
                          </div>
                        </div>
                        <button className="bg-green-500 text-white p-2 sm:p-3 rounded-lg hover:bg-green-600 transition-colors">
                          <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Full width on mobile, side column on larger screens */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 sticky top-4 sm:top-8">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold">Course Progress</h3>
                <span className="text-xl sm:text-2xl font-bold text-green-600">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5 mb-4 sm:mb-6">
                <div className="bg-green-600 h-2 sm:h-2.5 rounded-full w-[65%]"></div>
              </div>
              <div className="space-y-3">
                <button className="w-full bg-green-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium hover:bg-green-700 transition-colors">
                  Continue Learning
                </button>
                <button className="w-full bg-purple-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium hover:bg-purple-700 transition-colors">
                  Take Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
