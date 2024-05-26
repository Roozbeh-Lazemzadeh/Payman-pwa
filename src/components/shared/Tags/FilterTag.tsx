import { Tag } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  dateHandler,
  dateQuickAccessHandler,
  transactionsFiltering,
  merchantHandler,
  priceHandler,
  selectAllFilter,
  paymansFiltering,
  endingDateHandler,
} from '../../../store/filterPage/filterSlice';
import { ReactComponent as CrossIcon } from '../../../icons/cross.svg';
import { filterConvertDate } from '../../helpers/transDate';
import { useLocation } from 'react-router-dom';

import './style.css';

const FilterTag: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const pathName = location.pathname;
  const { merchants, price, date, endingDate } =
    useAppSelector(selectAllFilter);

  const priceRange =
    price.length > 0
      ? getPriceRangeLabel(price[0], price[price.length - 1])
      : '';

  const dateRange =
    date.length > 0
      ? `از ${filterConvertDate(date[0])} تا ${filterConvertDate(
          date[date.length - 1]
        )}`
      : '';

  const endingDateRange =
    endingDate.length > 0
      ? `از ${filterConvertDate(endingDate[0])} تا ${filterConvertDate(
          endingDate[endingDate.length - 1]
        )}`
      : '';

  const onClick = (label: string) => {
    if (pathName === '/paymans/me') {
      switch (label) {
        case 'merchant':
          dispatch(merchantHandler([]));
          dispatch(paymansFiltering({ merchants: [] }));
          break;
        case 'date':
          dispatch(dateHandler([]));
          dispatch(paymansFiltering({ dates: [] }));
          break;
        case 'endingDate':
          dispatch(endingDateHandler([]));
          dispatch(paymansFiltering({ endingDate: [] }));
          break;
        case 'price':
          dispatch(priceHandler([]));
          dispatch(paymansFiltering({ prices: [] }));
          break;

        default:
          break;
      }
    } else {
      switch (label) {
        case 'merchant':
          dispatch(merchantHandler([]));
          dispatch(transactionsFiltering({ merchants: [] }));
          break;
        case 'date':
          dispatch(dateHandler([]));
          dispatch(transactionsFiltering({ dates: [] }));
          dispatch(dateQuickAccessHandler(''));
          break;
        case 'price':
          dispatch(priceHandler([]));
          dispatch(transactionsFiltering({ prices: [] }));
          break;
        case 'endingDate':
          dispatch(priceHandler([]));
          dispatch(transactionsFiltering({ prices: [] }));
          break;

        default:
          break;
      }
    }
  };

  return (
    <div className='filtered_tag'>
      {merchants.length > 0 && (
        <Tag
          icon={<CrossIcon style={{ marginLeft: 5 }} />}
          onClick={() => onClick('merchant')}
        >
          <span>فیلتر شده بر اساس نام کسب‌وکار : </span>
          {merchants.map((merchant, index) => (
            <span key={`merchant-${index}`}>
              {merchant}
              {index !== merchants.length - 1 ? '، ' : ''}
            </span>
          ))}
        </Tag>
      )}
      {date.length > 0 && (
        <Tag
          icon={<CrossIcon style={{ marginLeft: 5 }} />}
          onClick={() => onClick('date')}
        >
          <>
            <span>{`فیلتر شده بر اساس تاریخ ${
              pathName === '/paymans/me' ? 'شروع پیمان' : ''
            } : ${dateRange}`}</span>
          </>
        </Tag>
      )}
      {endingDate.length > 0 && (
        <Tag
          icon={<CrossIcon style={{ marginLeft: 5 }} />}
          onClick={() => onClick('endingDate')}
        >
          <>
            <span>{`فیلتر شده بر اساس تاریخ ${
              pathName === '/paymans/me' ? 'پایان پیمان' : ''
            } : ${endingDateRange}`}</span>
          </>
        </Tag>
      )}
      {price.length > 0 && (
        <Tag
          icon={<CrossIcon style={{ marginLeft: 5 }} />}
          onClick={() => onClick('price')}
        >
          <>
            <span>{`فیلتر شده بر اساس مبلغ: ${priceRange}`}</span>
          </>
        </Tag>
      )}
    </div>
  );
};

// Helper function to get the price range label with the correct unit
const getPriceRangeLabel = (minPrice: number, maxPrice: number): string => {
  const minPriceLabel = getPriceLabel(minPrice);
  const maxPriceLabel = getPriceLabel(maxPrice);
  return `از ${minPriceLabel} تا ${maxPriceLabel}`;
};

// Helper function to get the price label with the correct unit
const getPriceLabel = (price: number): string => {
  if (price >= 1000000) {
    const millionPrice = price / 1000000;
    return `${millionPrice} میلیون تومان`;
  } else if (price >= 1000) {
    const thousandPrice = price / 1000;
    return `${thousandPrice} هزار تومان`;
  } else {
    return `${price} تومان`;
  }
};

export default FilterTag;
