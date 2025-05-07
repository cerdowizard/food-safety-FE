import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Play, BookOpen, Clock, ChevronLeft, Users } from "lucide-react";
import { Link } from "react-router-dom";
import axiosInstance from "../../services/real/api";
import LoadingSpinner from "../../components/LoadingSpinner";

// Update interfaces to match API response
interface Module {
  id: string;
  course_id: string;
  course_title: string;
  course_description: string;
  module_id: string;
  module_title: string;
  module_description: string;
  module_content: string;
  module_file_content: string;
}

const CourseDetailPage = () => {
  const { id } = useParams();
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getModules = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axiosInstance.get(`/api/v1/modules/${id}`);
        console.log('Full module data:', {
          payload: response.data.payload,
          firstModule: response.data.payload[0]
        });

        if (!response.data?.payload) {
          throw new Error('No data received from server');
        }

        setModules(response.data.payload); // Store all modules from payload
      } catch (error) {
        console.error('Error:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch modules');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      getModules();
    }
  }, [id]);

  const handleEnroll = async (moduleId: string) => {
    try {
      const response = await axiosInstance.post(`/api/v1/enroll/${moduleId}`,{course_id: moduleId},{ headers:{
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
      }});
      console.log('Enrollment response:', response.data);
      // Handle successful enrollment (e.g., show a success message)
    } catch (error) {
      console.error('Error enrolling in module:', error);
      // Handle error (e.g., show an error message)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{error}</h2>
        <Link
          to="/training"
          className="text-green-600 hover:text-green-700 font-medium"
        >
          Back to courses
        </Link>
      </div>
    );
  }

  if (!modules.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Module not found</h2>
        <Link
          to="/training"
          className="text-green-600 hover:text-green-700 font-medium"
        >
          Back to courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          to="/training"
          className="group inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Courses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Map through all modules */}
            {modules.map((module) => {
              console.log('Module image URL:', module.module_file_content);
              return (
                <div
                  key={module.module_id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden mb-8"
                >
                  <div
                    className="relative h-48 sm:h-72 md:h-96"
                    style={{
                      backgroundImage: `url(${module.module_file_content})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <button className="bg-white/20 hover:bg-white/30 rounded-full p-4">
                        <Play className="w-8 h-8 text-white" fill="white" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-sm text-gray-500 mb-2 block">
                      {module.course_title}
                    </span>
                    <h1 className="text-2xl font-bold mb-4">{module.module_title}</h1>
                    <p className="text-gray-600 mb-6">{module.module_description}</p>

                    {/* Module Content Section */}
                    <div className="border-t pt-6">
                      <h2 className="text-lg font-semibold mb-4">Module Content</h2>
                      <div className="prose prose-sm max-w-none mb-6">
                        {module.module_content ? (
                          <div dangerouslySetInnerHTML={{ __html: module.module_content }} />
                        ) : (
                          <p className="text-gray-500 italic">No content available for this module</p>
                        )}
                      </div>

                      {/* Add Start Course button for each module */}
                      <button
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 mt-4"
                        onClick={() => {
                          // Add your course start logic here
                          handleEnroll(module.module_id);
                          console.log(`Starting module: ${module.module_id}`);
                        }}
                      >
                        Start Course
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar - using first module's course info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="font-medium mb-4">About this Course</h3>
              <p className="text-sm text-gray-600">
                {modules[0]?.course_description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
