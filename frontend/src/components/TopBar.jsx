import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function TopBar() {
  const navigate = useNavigate();

  const handleQuickSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${encodeURIComponent(e.target.value)}`);
    }
  };

  return (
    <div className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Quick search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            onKeyPress={handleQuickSearch}
          />
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">Local Database</span>
        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
          <span className="text-sm font-medium text-primary-600">MV</span>
        </div>
      </div>
    </div>
  );
}

export default TopBar; 