import React from 'react';
import { Footer } from 'antd/es/layout/layout';
import { useAppSelector } from '../../hooks/reduxHooks';
import {
  selectCloseSearchFooter,
  selectSearchedFooter,
} from '../../../store/footer/footerSlice';
import { ReactComponent as TickSquareIcon } from '../../../icons/tickSquare.svg';
import { ReactComponent as CalendarIcon } from '../../../icons/calendar.svg';

import './style.css';

import { Input } from 'antd';

export const SearchedFooter: React.FC = () => {
  const isSearchedFooterShown = useAppSelector(selectSearchedFooter);
  const closeSearchFooter = useAppSelector(selectCloseSearchFooter);

  return (
    <Footer
      className={`searched-footer${isSearchedFooterShown ? ' active' : ''} ${
        closeSearchFooter ? 'close' : ''
      }`}
    >
      <div className="searched-footer-wrapper">
        <div className="implement-button">
          <TickSquareIcon />
          <span>اعمال</span>
        </div>
        <div className="searched-footer-content">
          <div className="quick-access-section">
            <span>هفتگی</span>
            <span>ماهانه</span>
            <span>3 ماهه</span>
          </div>
          <div className="search-section">
            <Input
              className="search-input"
              addonBefore={<CalendarIcon />}
              placeholder="تا تاریخ"
            />
            <Input
              className="search-input"
              addonBefore={<CalendarIcon />}
              placeholder="از تاریخ"
            />
          </div>
        </div>
      </div>
    </Footer>
  );
};
