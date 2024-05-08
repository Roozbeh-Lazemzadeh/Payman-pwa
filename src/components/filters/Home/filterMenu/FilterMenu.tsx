import { Layout, Menu, Badge } from 'antd';
import { ReactComponent as ActivityIcon } from '../../../../icons/activity.svg';
import { ReactComponent as WorkIcon } from '../../../../icons/work.svg';
import { ReactComponent as CalendarIcon } from '../../../../icons/calendar.svg';
import { ReactComponent as RemoveIcon } from '../../../../icons/delete.svg';
import { getItem } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import {
  selectHomeFilter,
  selectHomeSearchedFilter,
} from '../../../../store/filterMenu/homeFilterMenuSlice';
import { selectAllFilter } from '../../../../store/filterPage/homeFilterSlice';
import { useNavigate } from 'react-router-dom';

import '../../style.css';
import './style.css';

const { Footer } = Layout;

const FilterMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isFilteredMenuShown = useAppSelector(selectHomeFilter);
  const isSearchedMenuShown = useAppSelector(selectHomeSearchedFilter);
  const allFilter = useAppSelector(selectAllFilter);

  const removeFilterItem =
    allFilter?.merchants?.length !== 0 ||
    allFilter?.date?.length !== 0 ||
    allFilter?.price?.length !== 0
      ? getItem({
          key: '101',
          label: 'حذف فیلترها',
          icon: <RemoveIcon />,
          badge: 0,
          className: 'remove-filter-item',
          dispatch,
          navigate,
        })
      : null;

  const items = [
    // Conditionally include the item based on a state
    removeFilterItem!,
    getItem({
      key: '102',
      label: 'مبلغ',
      icon: <ActivityIcon />,
      badge: allFilter.price.length === 2 ? 1 : 0,
      dispatch,
      navigate,
    }),
    getItem({
      key: '103',
      label: 'تاریخ',
      icon: <CalendarIcon />,
      badge: allFilter.date.length === 2 ? 1 : 0,
      dispatch,
      navigate,
    }),
    getItem({
      key: '104',
      label: 'کسب و کار',
      icon: <WorkIcon />,
      badge: allFilter.merchants.length || 0,
      dispatch,
      navigate,
    }),
  ].filter(Boolean);

  return (
    <>
      {/* Overlay */}
      {isFilteredMenuShown && <div className='filter-overlay' />}
      <Footer
        className={`filtered-footer${isFilteredMenuShown ? ' active' : ''} ${
          isSearchedMenuShown ? 'invisible' : ''
        }`}
      >
        <Menu
          style={{ background: 'none' }}
          // onClick={handleTabClick}
          mode='inline'
          selectedKeys={[location.pathname]}
          items={items.map((item) => ({
            ...item,
            className: item.className,
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
    </>
  );
};

export default FilterMenu;
