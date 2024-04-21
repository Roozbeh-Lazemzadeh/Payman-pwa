import { Navigate, createBrowserRouter } from 'react-router-dom';
import PWALayout from '../components/layout';
import Onboarding from '../pages/Onboarding';
import LoginPage from '../pages/LoginPage';
import HomeWithMandate from '../pages/HomeWithMandate';
import { FAQPage } from '../pages/FAQPage';
import HomeWithOutMandate from '../pages/HomeWithOutMandate';
import PaymansLayout from '../pages/PaymansPage';
import { MyPaymans } from '../components/Paymans/myPaymans/MyPaymans';
import { OtherPaymans } from '../components/Paymans/otherPaymans/OtherPaymans';
import AccountPage from '../pages/AccountPage';
import TransactionsPage from '../pages/TransactionsPage';
import ContactPage from '../pages/ContactPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PWALayout />,
    children: [
      {
        path: '/',
        element: <Navigate to='onboarding' />,
      },
      {
        path: 'home',
        children: [
          { path: '', element: <Navigate to='without-mandate' /> },
          { path: 'without-mandate', element: <HomeWithOutMandate /> },
          { path: 'with-mandate', element: <HomeWithMandate /> },
        ],
      },

      {
        path: 'transactions',
        element: <TransactionsPage />,
      },
      {
        path: 'paymans',
        element: <PaymansLayout />,
        children: [
          { path: '', element: <Navigate to='me' /> },
          { path: 'me', element: <MyPaymans /> },
          { path: 'others', element: <OtherPaymans /> },
        ],
      },
      {
        path: 'profile',
        element: <AccountPage />,
      },
      {
        path: 'faq',
        element: <FAQPage />,
      },
      {
        path: '/contact-us',
        element: <ContactPage />,
      },
    ],
  },
  {
    path: '/onboarding',
    element: <Onboarding />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);
