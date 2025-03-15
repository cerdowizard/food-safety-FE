import { Book, BookmarkCheck, Clock, PlayCircle } from "lucide-react";
import { TrainingCourse, PurchasedCourse } from "../../constants";

type CourseCardProps = {
  course: TrainingCourse | PurchasedCourse;
};

const CourseCard = ({ course }: CourseCardProps) => {
  const isPurchased = "progress" in course;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        {isPurchased && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${(course as PurchasedCourse).progress}%` }}
            />
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span
            className={`px-2.5 py-0.5 text-xs font-medium rounded-full
              ${
                course.level === "Beginner"
                  ? "bg-green-100 text-green-800"
                  : course.level === "Intermediate"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
          >
            {course.level}
          </span>
          {isPurchased && (
            <span className="text-sm text-gray-500">
              {`${(course as PurchasedCourse).progress}% Complete`}
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {course.title}
        </h3>
        <div>
        <p className="text-sm text-gray-500 mb-4">{course.description}</p>

        <div className="flex items-center  justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            {course.duration}
          </div>

          <div className=" flex items-center gap-2">
            {(course as PurchasedCourse).completed && (
              <button className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-purple-100 text-purple-700 hover:bg-purple-200">
                {" "}
                <>
                  <Book className="w-4 h-4 mr-1" />
                  Quiz
                </>
              </button>
            )}
            <button
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium
              ${
                !isPurchased
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              {isPurchased && !(course as PurchasedCourse).completed ? (
                <>
                  <PlayCircle className="w-4 h-4 mr-1" />
                  Continue
                </>
              ) : !isPurchased ? (
                "Start Course"
              ) : isPurchased && (course as PurchasedCourse).completed ? (
                <>
                  <BookmarkCheck className="w-4 h-4 mr-1" />
                  Compeleted
                </>
              ) : (
                ""
              )}
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
