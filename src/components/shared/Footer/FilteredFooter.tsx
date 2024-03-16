import { Layout, Menu } from 'antd';
import { ReactComponent as ActivityIcon } from '../../../icons/activity.svg';
import { ReactComponent as WorkIcon } from '../../../icons/work.svg';
import { ReactComponent as CalendarIcon } from '../../../icons/calendar.svg';
import { ReactComponent as TickSquareIcon } from '../../../icons/tickSquare.svg';
import { getItem } from '../../helpers';
import './style.css';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  searchedToggle,
  selectFilteredFooter,
  selectSearchedFooter,
} from '../../../store/footer/footerSlice';

const { Footer } = Layout;

const FilteredFooter: React.FC = () => {
  const isFilteredFooterShown = useAppSelector(selectFilteredFooter);
  const isSearchedFooterShown = useAppSelector(selectSearchedFooter);
  const dispatch = useAppDispatch();
  const items = [
    getItem({
      key: '101',
      label: 'اعمال',
      icon: <TickSquareIcon />,
    }),
    getItem({
      key: '102',
      label: 'مبلغ',
      icon: <ActivityIcon />,
    }),
    getItem({
      key: '103',
      label: 'تاریخ',
      icon: <CalendarIcon />,
    }),
    getItem({
      key: '104',
      label: 'کسب و کار',
      icon: <WorkIcon />,
    }),
  ];

  const handleTabClick = (e: any): void => {
    dispatch(searchedToggle());
  };

  return (
    <Footer
      className={`filtered-footer${isFilteredFooterShown ? ' active' : ''} ${
        isSearchedFooterShown ? 'invisible' : ''
      }`}
    >
      <Menu
        style={{ background: 'none' }}
        onClick={handleTabClick}
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
        className="footer-filtered-menu"
      />
    </Footer>
  );
};

export default FilteredFooter;
