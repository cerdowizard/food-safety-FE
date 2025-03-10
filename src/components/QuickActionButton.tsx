import { LucideIcon } from 'lucide-react';

interface QuickActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

const QuickActionButton = ({ icon: Icon, label, onClick }: QuickActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <Icon className="h-6 w-6 text-gray-600 mb-2" />
      <span className="text-sm text-gray-900">{label}</span>
    </button>
  );
};

export default QuickActionButton;
