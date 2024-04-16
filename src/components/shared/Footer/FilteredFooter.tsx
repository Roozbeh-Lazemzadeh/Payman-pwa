import { Layout, Menu, Badge } from 'antd';
import { ReactComponent as ActivityIcon } from '../../../icons/activity.svg';
import { ReactComponent as WorkIcon } from '../../../icons/work.svg';
import { ReactComponent as CalendarIcon } from '../../../icons/calendar.svg';
import { ReactComponent as TickSquareIcon } from '../../../icons/tickSquare.svg';
import { getItem } from '../../helpers';
import './style.css';
import { useAppSelector } from '../../hooks/reduxHooks';
import {
  selectFilteredFooter,
  selectSearchedFooter,
} from '../../../store/footer/footerSlice';
import { selectAllFilter } from '../../../store/filter/filterSlice';

const { Footer } = Layout;

const FilteredFooter: React.FC = () => {
  const isFilteredFooterShown = useAppSelector(selectFilteredFooter);
  const isSearchedFooterShown = useAppSelector(selectSearchedFooter);
  const filteredNumber = useAppSelector(selectAllFilter);
  // const dispatch = useAppDispatch();
  const items = [
    getItem({
      key: '101',
      label: 'اعمال',
      icon: <TickSquareIcon />,
      badge: 0, // Initialize badge count
    }),
    getItem({
      key: '102',
      label: 'مبلغ',
      icon: <ActivityIcon />,
      badge: 0, // Initialize badge count
    }),
    getItem({
      key: '103',
      label: 'تاریخ',
      icon: <CalendarIcon />,
      badge: 0, // Initialize badge count
    }),
    getItem({
      key: '104',
      label: 'کسب و کار',
      icon: <WorkIcon />,
      badge: filteredNumber.merchants.length || 0, // Initialize badge count
    }),
  ];

  return (
    <Footer
      className={`filtered-footer${isFilteredFooterShown ? ' active' : ''} ${
        isSearchedFooterShown ? 'invisible' : ''
      }`}
    >
      <Menu
        style={{ background: 'none' }}
        // onClick={handleTabClick}
        mode='inline'
        selectedKeys={[location.pathname]}
        items={items.map((item) => ({
          ...item,
          icon:
            item.badge !== 0 ? (
              <Badge count={item.badge}>{item.icon}</Badge>
            ) : (
              item.icon
            ),
        }))}
        className='footer-filtered-menu'
      />
    </Footer>
  );
};

export default FilteredFooter;
