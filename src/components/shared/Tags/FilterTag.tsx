import { Tag } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  dateHandler,
  dateQuickAccessHandler,
  handleListFiltering,
  merchantHandler,
  priceHandler,
  selectAllFilter,
} from '../../../store/filterPage/filterSlice';
import { ReactComponent as CrossIcon } from '../../../icons/cross.svg';
import { filterConvertDate } from '../../helpers/transDate';

import './style.css';

const FilterTag: React.FC = () => {
  const dispatch = useAppDispatch();
  const { merchants, price, date } = useAppSelector(selectAllFilter);

  const priceRange =
    price.length > 0
      ? getPriceRangeLabel(price[0], price[price.length - 1])
      : '';

  const dateRange =
    date.length > 0
      ? `از ${filterConvertDate(date[0])} - تا ${filterConvertDate(
          date[date.length - 1]
        )}`
      : '';

  const onClick = (label: string) => {
    switch (label) {
      case 'merchant':
        dispatch(merchantHandler([]));
        dispatch(handleListFiltering({ merchants: [] }));
        break;
      case 'date':
        dispatch(dateHandler([]));
        dispatch(handleListFiltering({ dates: [] }));
        dispatch(dateQuickAccessHandler(''));
        break;
      case 'price':
        dispatch(priceHandler([]));
        dispatch(handleListFiltering({ prices: [] }));
        break;

      default:
        break;
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
            <span>{`فیلتر شده بر اساس تاریخ : ${dateRange}`}</span>
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
  return `از ${minPriceLabel} - تا ${maxPriceLabel}`;
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
