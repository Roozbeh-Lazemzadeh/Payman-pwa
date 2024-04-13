import { useEffect, useState } from 'react';
import { Layout, Tabs } from 'antd';
import { ReactComponent as DefaultPaymanIcon } from '../../icons/defaultPayman.svg';
import { ReactComponent as DefaultPaperIcon } from '../../icons/defaultPaper.svg';
import { ReactComponent as DefaultHomeIcon } from '../../icons/defaultHome.svg';
import { ReactComponent as ActivePaperIcon } from '../../icons/activePaper.svg';
import { ReactComponent as ActivePaymanIcon } from '../../icons/activePayman.svg';
import { ReactComponent as ActiveHomeIcon } from '../../icons/activeHome.svg';
import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';
import { selectFilteredFooter } from '../../store/footer/footerSlice';

const { Footer } = Layout;
interface TabData {
  key: string;
  label: string;
  defaultIcon: JSX.Element;
  activeIcon: JSX.Element;
  path: string;
}

const PrimaryFooter: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isPrimaryFooterShown = !useAppSelector(selectFilteredFooter);
  const [activeTab, setActiveTab] = useState('2');

  useEffect(() => {
    // Get the path from the current location
    const pathSegments = location.pathname.split('/');

    // Get the first segment (excluding the empty string before the first '/')
    const firstSegment = pathSegments[1];

    // Map the path to the corresponding tab key
    const tabKeyMap: Record<string, string> = {
      transactions: '1',
      home: '2',
      paymans: '3',
    };

    if (
      firstSegment === 'contact-us' ||
      firstSegment === 'faq' ||
      firstSegment === 'profile'
    ) {
      setActiveTab('');
    } else {
      // Set the active tab based on the mapped key or default to '2'
      setActiveTab(tabKeyMap[firstSegment] || '2');
    }
  }, [location.pathname]); // Re-run the effect when the pathname changes
  const handleTabChange = (key: string): void => {
    setActiveTab(key);
  };

  const tabData: TabData[] = [
    {
      key: '1',
      label: 'تراکنش ها',
      defaultIcon: <DefaultPaperIcon />,
      activeIcon: <ActivePaperIcon />,
      path: 'transactions',
    },
    {
      key: '2',
      label: 'خانه',
      defaultIcon: <DefaultHomeIcon />,
      activeIcon: <ActiveHomeIcon />,
      path: 'home',
    },
    {
      key: '3',
      label: 'پیمان ها',
      defaultIcon: <DefaultPaymanIcon />,
      activeIcon: <ActivePaymanIcon />,
      path: 'paymans',
    },
  ];

  const handleTabClick = (key: string): null | void => {
    // find label by key
    if (key === activeTab) return null;
    const tab = tabData.filter((tab) => tab.key === key)[0];
    const { path } = tab;
    navigate(path);
  };
  return (
    <Footer
      className={`${
        isPrimaryFooterShown ? 'primary-footer-active' : 'primary-footer'
      }`}
    >
      <Tabs
        className={`${!activeTab ? 'unselected-tabs' : ''}`}
        defaultActiveKey='2'
        activeKey={activeTab}
        onChange={handleTabChange}
        onTabClick={(key) => handleTabClick(key)}
        items={tabData.map((tab) => {
          return {
            key: tab.key,
            label: tab.label,
            icon: tab.key === activeTab ? tab.activeIcon : tab.defaultIcon,
          };
        })}
      ></Tabs>
    </Footer>
  );
};

export default PrimaryFooter;
