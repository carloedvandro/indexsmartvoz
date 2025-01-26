import { Outlet } from 'react-router-dom';

export const ClientLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Outlet />
    </div>
  );
};