// import { useNavigate } from 'react-router-dom';
import { toggleSidebar } from '../../store/sidebar/sidebarSlice';
// import { useDispatch } from 'react-redux';
import { filteredToggle, searchedToggle } from '../../store/footer/footerSlice';
import { NavigateFunction } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { removeAllFiltersHandler } from '../../store/filter/filterSlice';

interface ItemProps {
  label: string;
  key: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  badge?: number;
  className?: string;
  dispatch: Dispatch<any>;
  navigate: NavigateFunction;
}

export function getItem({
  label,
  key,
  icon,
  children,
  badge,
  dispatch,
  navigate,
  className,
}: ItemProps) {
  const handleClick = () => {
    // for closing sidebar
    if (key.length === 1) {
      dispatch(toggleSidebar());
    }

    // for navigating the page
    if (key === '4') {
      navigate('/faq');
    } else if (key === '2') {
      navigate('/contact-us');
    } else if (key === '1') {
      navigate('/home');
    } else if (key === '3') {
      navigate('/profile');
    }

    // for filtering price , date, merchants
    if (key.length === 3) {
      if (key === '101') {
        dispatch(removeAllFiltersHandler());
        dispatch(searchedToggle(''));
        dispatch(filteredToggle());
      }

      dispatch(searchedToggle(key));
    }

    // Deselect the active tab for "/profile", "/faq", "/contact-us"
    // const deselectedRoutes = ["/profile", "/faq", "/contact-us"];
    if (key === '4' || key === '2' || key === '3') {
      return {
        key: '',
        icon,
        children,
        label,
        badge,
        className,
        onClick: handleClick,
      };
    }

    return {
      key,
      icon,
      children,
      label,
      badge,
      className,
      onClick: handleClick,
    };
  };

  return {
    key,
    icon,
    children,
    label,
    badge,
    className,
    onClick: handleClick,
  };
}
