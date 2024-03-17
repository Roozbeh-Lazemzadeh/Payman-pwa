import { Navigate, createBrowserRouter } from 'react-router-dom';
import PWALayout from '../components/layout';
import Onboarding from '../pages/Onboarding';
import LoginPage from '../pages/LoginPage';
import HomeWithMandate from '../pages/HomeWithMandate';
import { FAQPage } from '../pages/FAQ';
import HomeWithOutMandate from '../pages/HomeWithOutMandate';
import ContactUs from '../pages/ContactUs';
import PaymansLayout from '../pages/PaymansPage';
import { MyPaymans } from '../components/Paymans/myPaymans/MyPaymans';
import { OtherPaymans } from '../components/Paymans/otherPaymans/OtherPaymans';

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
        children: [
          { path: 'with-mandate', element: <HomeWithMandate /> },
          { path: '', element: <Navigate to="without-mandate" /> },
          { path: 'without-mandate', element: <HomeWithOutMandate /> },
        ],
      },

      {
        path: 'transactions',
        element: <h1>تراکنش ها</h1>,
      },
      {
        path: 'paymans',
        element: <PaymansLayout />,
        children: [
          { path: '', element: <Navigate to="me" /> },
          { path: 'me', element: <MyPaymans /> },
          { path: 'others', element: <OtherPaymans /> },
        ],
      },
      {
        path: 'profile',
        element: <h1>profile</h1>,
      },
      {
        path: 'faq',
        element: <FAQPage />,
      },
      {
        path: '/contact-us',
        element: <ContactUs />,
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
