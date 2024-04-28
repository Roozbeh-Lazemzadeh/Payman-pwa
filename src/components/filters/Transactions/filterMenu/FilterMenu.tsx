import { Layout, Menu, Badge } from 'antd';
import { ReactComponent as ActivityIcon } from '../../../../icons/activity.svg';
import { ReactComponent as WorkIcon } from '../../../../icons/work.svg';
import { ReactComponent as CalendarIcon } from '../../../../icons/calendar.svg';
import { ReactComponent as RemoveIcon } from '../../../../icons/delete.svg';
import { getItem } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import {
  selectTransactionFilter,
  selectTransactionSearchedFilter,
} from '../../../../store/filterMenu/transactionFilterMenuSlice';
import { selectAllFilter } from '../../../../store/filterPage/transactionFilterSlice';
import { useNavigate } from 'react-router-dom';
import '../../style.css';

const { Footer } = Layout;

const FilterMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isFilteredFooterShown = useAppSelector(selectTransactionFilter);
  const isSearchedFooterShown = useAppSelector(selectTransactionSearchedFilter);
  const allFilter = useAppSelector(selectAllFilter);

  const removeFilterItem =
    allFilter?.merchants?.length !== 0
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
      badge: 0,
      dispatch,
      navigate,
    }),
    getItem({
      key: '103',
      label: 'تاریخ',
      icon: <CalendarIcon />,
      badge: 0,
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
      {isFilteredFooterShown && (
        <div
          className='overlay'
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.1)',
            zIndex: 2,
          }}
        />
      )}
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
