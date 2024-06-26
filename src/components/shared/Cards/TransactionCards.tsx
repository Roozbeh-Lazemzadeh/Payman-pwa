import PropTypes from 'prop-types';
import './style/style.css';

interface TransactionCardProps {
  merchant: string;
  transDate: string;
  transStatus: string;
  transStatusIcon: React.ReactNode;
  price: number;
  img: string;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  merchant,
  transDate,
  transStatus,
  transStatusIcon,
  price,
  img,
}) => {
  TransactionCard.propTypes = {
    merchant: PropTypes.string.isRequired,
    transDate: PropTypes.string.isRequired,
    transStatus: PropTypes.string.isRequired,
    transStatusIcon: PropTypes.node.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired, // Add img to propTypes
  };

  let color;
  switch (transStatus) {
    case 'موفق':
      color = 'green';
      break;
    case 'ناموفق':
      color = 'red';
      break;
    case 'نامشخص':
      color = 'yellow';
      break;

    default:
      break;
  }

  return (
    <div className='transaction-card'>
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
        <div className='transaction-titles'>
          <div>
            <span className='transaction-title'>مبلغ تراکنش : </span>
            <span className='card-price'>{price}</span>
            <span className='card-price'> تومانءءء</span>
          </div>
          <div className='card-status-wrapper'>
            <span className={`card-status ${color}`}>{transStatus}</span>
            <span className='card-status-icon'>{transStatusIcon}</span>
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className='transaction-title'>تاریخ تراکنش:‌</span>
            <span className='card-date'>{transDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
