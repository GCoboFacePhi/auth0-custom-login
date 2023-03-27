import { createHashRouter } from 'react-router-dom';
import ForgotPassword from '../pages/ForgotPassword';
import Login from '../pages/Login';
import ResetPassword from '../pages/ResetPassword';
import { RoutesName } from '../state/constants';

export const Routes = createHashRouter([
  {
    path: RoutesName.forgotPassword,
    element: <ForgotPassword />,
  },
  {
    path: RoutesName.resetPassword,
    element: <ResetPassword />,
  },
  {
    path: RoutesName.home,
    element: <Login />,
  },
]);
