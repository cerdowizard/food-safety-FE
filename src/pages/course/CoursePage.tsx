// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { mockTrainingCourses } from "../home/TrainingPage";

// interface Module {
//   id: number;
//   title: string;
//   content: string;
//   completed: boolean;
//   hasQuiz: boolean;
// }

// interface QuizQuestion {
//   id: number;
//   question: string;
//   options: string[];
//   correctAnswer: number;
// }

// interface Quiz {
//   moduleId: number;
//   questions: QuizQuestion[];
// }

// // Move mockModules outside the component
// const mockModules = {
//   1: [
//     {
//       id: 1,
//       title: "Module 1: Food Safety Fundamentals",
//       content:
//         "Learn about basic food safety principles, including temperature control, cross-contamination prevention, and personal hygiene.",
//       completed: false,
//       hasQuiz: true,
//     },
//     {
//       id: 2,
//       title: "Module 2: Foodborne Illnesses",
//       content:
//         "Understanding common foodborne pathogens, symptoms of food poisoning, and prevention methods.",
//       completed: false,
//       hasQuiz: true,
//     },
//     {
//       id: 3,
//       title: "Module 3: Safe Food Handling",
//       content:
//         "Proper techniques for handling, preparing, and storing food safely.",
//       completed: false,
//       hasQuiz: true,
//     },
//   ],
//   2: [
//     {
//       id: 1,
//       title: "Module 1: Advanced Sanitation",
//       content: "Professional sanitation techniques and HACCP principles.",
//       completed: false,
//       hasQuiz: true,
//     },
//     {
//       id: 2,
//       title: "Module 2: Temperature Management",
//       content: "Advanced temperature control methods and monitoring systems.",
//       completed: false,
//       hasQuiz: true,
//     },
//     {
//       id: 3,
//       title: "Module 3: Quality Control",
//       content: "Implementation of quality control measures and documentation.",
//       completed: false,
//       hasQuiz: true,
//     },
//   ],
//   3: [
//     {
//       id: 1,
//       title: "Module 1: Personal Hygiene",
//       content: "Essential personal hygiene practices in the kitchen.",
//       completed: false,
//       hasQuiz: true,
//     },
//     {
//       id: 2,
//       title: "Module 2: Kitchen Sanitization",
//       content:
//         "Proper cleaning and sanitization of kitchen equipment and surfaces.",
//       completed: false,
//       hasQuiz: true,
//     },
//     {
//       id: 3,
//       title: "Module 3: Pest Control",
//       content:
//         "Prevention and management of pest issues in kitchen environments.",
//       completed: false,
//       hasQuiz: true,
//     },
//   ],
// };

// const mockQuizzes: Record<number, Quiz> = {
//   1: {
//     moduleId: 1,
//     questions: [
//       {
//         id: 1,
//         question: "What is the safe temperature range for storing cold food?",
//         options: [
//           "0°F to 32°F",
//           "33°F to 40°F",
//           "41°F to 50°F",
//           "51°F to 60°F"
//         ],
//         correctAnswer: 1
//       },
//       {
//         id: 2,
//         question: "Which practice helps prevent cross-contamination?",
//         options: [
//           "Using the same cutting board for raw meat and vegetables",
//           "Washing hands between handling different foods",
//           "Storing cooked meat below raw meat",
//           "Using the same utensils for all foods"
//         ],
//         correctAnswer: 1
//       },
//       {
//         id: 3,
//         question: "How often should you wash your hands while handling food?",
//         options: [
//           "Only at the start of your shift",
//           "Every hour",
//           "After using the restroom only",
//           "After any activity that could contaminate hands"
//         ],
//         correctAnswer: 3
//       }
//     ]
//   }
// };

// const CoursePage = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const [activeModule, setActiveModule] = useState(0);
//   const [showQuiz, setShowQuiz] = useState(false);
//   const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
//   const [quizSubmitted, setQuizSubmitted] = useState(false);
//   const [quizScore, setQuizScore] = useState(0);

//   // Get course info
//   const course = mockTrainingCourses.find((c) => c.id === Number(courseId));

//   // Get modules for this course
//   const modules = mockModules[Number(courseId)] || [];

//   // Get current module
//   const currentModule = modules[activeModule];

//   // Get quiz for current module
//   const currentQuiz = mockQuizzes[currentModule?.id];

//   const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
//     const newAnswers = [...quizAnswers];
//     newAnswers[questionIndex] = answerIndex;
//     setQuizAnswers(newAnswers);
//   };

//   const handleQuizSubmit = () => {
//     if (!currentQuiz) return;

//     const score = currentQuiz.questions.reduce((acc, question, index) => {
//       return acc + (quizAnswers[index] === question.correctAnswer ? 1 : 0);
//     }, 0);

//     const percentage = (score / currentQuiz.questions.length) * 100;
//     setQuizScore(percentage);
//     setQuizSubmitted(true);

//     if (percentage >= 70) {
//       // Mark module as completed if score is 70% or higher
//       modules[activeModule].completed = true;
//     }
//   };

//   const renderQuiz = () => (
//     <div className="quiz-container">
//       <h2 className="text-2xl font-bold mb-6">Quiz: {currentModule.title}</h2>
      
//       {!quizSubmitted ? (
//         <>
//           <div className="space-y-6">
//             {currentQuiz?.questions.map((question, qIndex) => (
//               <div key={question.id} className="p-4 border rounded-lg">
//                 <h3 className="font-medium mb-4">{question.question}</h3>
//                 <div className="space-y-2">
//                   {question.options.map((option, oIndex) => (
//                     <label key={oIndex} className="flex items-center space-x-2">
//                       <input
//                         type="radio"
//                         name={`question-${question.id}`}
//                         checked={quizAnswers[qIndex] === oIndex}
//                         onChange={() => handleAnswerSelect(qIndex, oIndex)}
//                         className="mr-2"
//                       />
//                       <span>{option}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-between mt-6">
//             <button
//               onClick={() => setShowQuiz(false)}
//               className="px-4 py-2 bg-gray-500 text-white rounded-lg"
//             >
//               Back to Module
//             </button>
//             <button
//               onClick={handleQuizSubmit}
//               disabled={quizAnswers.length !== currentQuiz?.questions.length}
//               className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
//             >
//               Submit Quiz
//             </button>
//           </div>
//         </>
//       ) : (
//         <div className="text-center">
//           <h3 className="text-xl font-bold mb-4">Quiz Results</h3>
//           <div className="text-4xl font-bold mb-6">
//             {quizScore}%
//           </div>
//           <p className="mb-6">
//             {quizScore >= 70 
//               ? "Congratulations! You've passed the quiz!" 
//               : "Try again to achieve a passing score of 70% or higher."}
//           </p>
//           <div className="flex justify-center space-x-4">
//             <button
//               onClick={() => {
//                 setQuizSubmitted(false);
//                 setQuizAnswers([]);
//                 if (quizScore < 70) {
//                   setShowQuiz(false);
//                 }
//               }}
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//             >
//               {quizScore >= 70 ? "Continue" : "Review Module"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   if (!course || !modules.length) {
//     return (
//       <div className="text-center py-8">
//         <h2 className="text-xl font-bold mb-4">Course not found</h2>
//         <button
//           onClick={() => navigate("/training")}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//         >
//           Back to Courses
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold">{course.title}</h1>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Modules Sidebar */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-lg shadow-lg p-4">
//             <h2 className="font-semibold text-lg mb-4">Course Modules</h2>
//             <div className="space-y-2">
//               {modules.map((module, index) => (
//                 <button
//                   key={module.id}
//                   onClick={() => {
//                     setActiveModule(index);
//                     setShowQuiz(false);
//                   }}
//                   className={`w-full text-left p-3 rounded-lg ${
//                     activeModule === index ? "bg-blue-50" : "hover:bg-gray-50"
//                   }`}
//                 >
//                   {module.title}
//                   {module.completed && (
//                     <span className="ml-2 text-green-500">✓</span>
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Content Area */}
//         <div className="lg:col-span-3">
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             {showQuiz ? renderQuiz() : (
//               <>
//                 <h2 className="text-2xl font-bold mb-4">{currentModule.title}</h2>
//                 <div className="prose max-w-none mb-8">{currentModule.content}</div>
//                 <div className="flex justify-between">
//                   <button
//                     onClick={() => setActiveModule(Math.max(0, activeModule - 1))}
//                     disabled={activeModule === 0}
//                     className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50"
//                   >
//                     Previous
//                   </button>
//                   <button
//                     onClick={() => setShowQuiz(true)}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//                   >
//                     Take Quiz
//                   </button>
//                   <button
//                     onClick={() =>
//                       setActiveModule(Math.min(modules.length - 1, activeModule + 1))
//                     }
//                     disabled={activeModule === modules.length - 1}
//                     className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CoursePage;

const CoursePage = () => {
  return (
    <div>CoursePage</div>
  )
}
export default CoursePage