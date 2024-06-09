import PropTypes from 'prop-types';
import { ReactComponent as ArrowLeft2Icon } from '../../../icons/arrowLeft2.svg';

import './style/style.css';

interface TransactionHomeCardProps {
  merchant: string;
  transDate: string;
  price: number;
  img: string;
}

export const TransactionHomeCard: React.FC<TransactionHomeCardProps> = ({
  merchant,
  transDate,
  price,
  img,
}) => {
  TransactionHomeCard.propTypes = {
    merchant: PropTypes.string.isRequired,
    transDate: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
  };
  return (
    <div className='transaction-home-card'>
      <div className='card-merchant-wrapper'>
        <div className='card-icon-wrapper'>
          {img.length ? (
            <div className='card-icon-style'>
              <img className='card-icon' src={img} />
              <span
                className='card-icon-filter'
                style={{
                  backgroundImage: `url(${img})`,
                }}
              ></span>
            </div>
          ) : (
            <img
              className='card-icon-default'
              src='/assets/pics/Icon-default.svg'
            />
          )}
        </div>
        <span className='card-merchant-name'>{merchant}</span>
      </div>
      <div className='card-content'>
        <div className='transaction-titles-wrapper'>
          <div>
            <span className='transaction-title'>مبلغ تراکنش : </span>
            <span className='card-price'>{price}</span>
            <span className='card-price'> تومانءءء</span>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className='transaction-title'>تاریخ تراکنش:‌</span>
              <span className='card-date'>{transDate}</span>
            </div>
          </div>
        </div>
      </div>
      <ArrowLeft2Icon />
    </div>
  );
};
