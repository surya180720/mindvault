import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  PlusCircleIcon, 
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';

function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: HomeIcon, label: 'View Notes' },
    { path: '/create', icon: PlusCircleIcon, label: 'Create Note' },
    { path: '/search', icon: MagnifyingGlassIcon, label: 'Smart Search' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary-600">MindVault</h1>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 ${
                isActive ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600' : ''
              }`}
            >
              <Icon className="w-6 h-6 mr-3" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar; 