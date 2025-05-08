import { TrainingCourse } from "../../pages/home/TrainingPage";
import { Link } from "react-router-dom";

interface CourseCardProps {
  course: TrainingCourse;
  onEnroll: () => void;
}

const CourseCard = ({ course, onEnroll }: CourseCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img 
        loading="lazy"
        src={course.file_content} 
        alt={course.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            course.level === "Beginner" ? "bg-green-100 text-green-800" :
            course.level === "Intermediate" ? "bg-yellow-100 text-yellow-800" :
            "bg-red-100 text-red-800"
          }`}>
            {course.level}
          </span>
        </div>
        <p className="mt-2 text-gray-600">{course.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">Duration: {course.duration}</span>
          {course.enrolled ? (
            <Link
              to={`/course/${course.id}`}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Start Course
            </Link>
          ) : (
            <button
              onClick={onEnroll}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
