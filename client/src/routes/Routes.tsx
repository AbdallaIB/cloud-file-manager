import { PathRouteProps, Routes as Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';

import Dashboard from '@pages/Dashboard/Dashboard';
import Page404 from '@pages/Page404/Page404';
import Login from '@pages/Login/Login';
import Storage from '@pages/Storage/Storage';
import SignUp from '@pages/SignUp/SignUp';
import ForgotPassword from '@pages/ForgotPassword/ForgotPassword';
import Home from '@pages/Files/Files';
import Settings from '@pages/Settings/Settings';
import Files from '@pages/Files/Files';

export enum RouteType {
  PUBLIC,
  PRIVATE,
  RESTRICTED,
}
interface AppRoute extends PathRouteProps {
  type?: RouteType;
}
export const AppRoutes: AppRoute[] = [
  // Restricted Routes
  //   {
  //     type: RouteType.PRIVATE,
  //     path: 'dashboard',
  //     children: <Dashboard />,
  //   },
  // Private Routes
  {
    type: RouteType.PUBLIC,
    path: 'dashboard',
    children: <Dashboard />,
  },
  {
    type: RouteType.PRIVATE,
    path: 'storage',
    children: <Storage />,
  },
  {
    type: RouteType.PRIVATE,
    path: 'profile',
    children: <Settings />,
  },
  // Public Routes
  {
    type: RouteType.PUBLIC,
    path: 'reset',
    children: <ForgotPassword />,
  },
  {
    type: RouteType.PUBLIC,
    path: 'signUp',
    children: <SignUp />,
  },
  {
    type: RouteType.PUBLIC,
    path: 'login',
    children: <Login />,
  },
  {
    type: RouteType.PUBLIC,
    path: 'files',
    children: <Files />,
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
