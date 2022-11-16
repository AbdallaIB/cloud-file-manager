import { PathRouteProps, Routes as Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';

import Dashboard from '@pages/Dashboard';
import Page404 from '@pages/Page404';
import Login from '@pages/Login';
import SignUp from '@pages/Signup';
import Files from '@pages/Files';

export enum RouteType {
  PUBLIC,
  PRIVATE,
  RESTRICTED,
}
interface AppRoute extends PathRouteProps {
  type?: RouteType;
}
export const AppRoutes: AppRoute[] = [
  // Private Routes
  {
    type: RouteType.PRIVATE,
    path: '',
    children: <Dashboard />,
  },
  {
    type: RouteType.PRIVATE,
    path: 'files',
    children: <Files />,
  },
  // Public Routes
  {
    type: RouteType.PUBLIC,
    path: 'signup',
    children: <SignUp />,
  },
  {
    type: RouteType.PUBLIC,
    path: 'login',
    children: <Login />,
  },
];

const Routes = () => {
  return (
    <Switch>
      {AppRoutes.map((r) => {
        const { type } = r;
        if (type === RouteType.PRIVATE) {
          return <Route key={`${r.path}`} path={`/${r.path}`} element={<PrivateRoute>{r.children}</PrivateRoute>} />;
        }
        if (type === RouteType.RESTRICTED) {
          return (
            <Route key={`${r.path}`} path={`/${r.path}`} element={<RestrictedRoute>{r.children}</RestrictedRoute>} />
          );
        }

        return <Route key={`${r.path}`} path={`/${r.path}`} element={r.children} />;
      })}
      <Route path="*" element={<Page404 />} />
    </Switch>
  );
};

export default Routes;
