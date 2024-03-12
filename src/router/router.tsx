import { Navigate, createBrowserRouter } from 'react-router-dom';
import PWALayout from '../components/layout';
import Onboarding from '../pages/Onboarding';
import LoginPage from '../pages/LoginPage';
// import HomeWithOutMandate from '../pages/HomeWithOutMandate';
import HomeWithMandate from '../pages/HomeWithMandate';
import { FAQPage } from '../pages/FAQ';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PWALayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="home" />,
      },
      {
        path: 'home',
        element: <HomeWithMandate />,
      },
      {
        path: 'transactions',
        element: <h1>تراکنش ها</h1>,
      },
      {
        path: 'paymans',
        element: (
          <>
            <h1>پیمان ها</h1>
          </>
        ),
      },
      {
        path: 'profile',
        element: <h1>profile</h1>,
      },
      {
        path: 'faq',
        element: <FAQPage />,
      },
    ],
  },
  {
    path: '/onboarding',
    element: <Onboarding />,
  },
  {
    path: '/login-page',
    element: <LoginPage />,
  },
]);
