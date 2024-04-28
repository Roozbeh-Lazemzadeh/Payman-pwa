import PropTypes from 'prop-types';
import { ReactComponent as ArrowLeft2Icon } from '../../../icons/arrowLeft2.svg';
import './style.css';

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
        <img
          className='card-icon'
          src={img.length ? img : '/assets/pics/icon-default.png'}
        />
        <span className='card-merchant-name'>{merchant}</span>
      </div>
      <div className='card-home-content'>
        <div className='transaction-titles'>
          <div>
            <span className='transaction-title'>مبلغ تراکنش ها: </span>
            <span className='card-price'>{price}</span>
            <span className='card-price'> تومانءءء</span>
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className='transaction-title'>تاریخ تراکنش:‌</span>
            <span className='card-date'>{transDate}</span>
          </div>
        </div>
      </div>
      <div className='card-home-arrow-left'>
        <ArrowLeft2Icon />
      </div>
    </div>
  );
};
