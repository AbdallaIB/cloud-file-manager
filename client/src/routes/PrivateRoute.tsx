import { Navigate, RouteProps, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import authStore from '@lib/stores/auth.store';

const PrivateRoute = ({ children }: RouteProps) => {
  const location = useLocation();

  if (!authStore.isAuthenticated) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} />;
  }

  return children as JSX.Element;
};

export default observer(PrivateRoute);
