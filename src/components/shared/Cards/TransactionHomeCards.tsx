import './style.css';
import IconSvg from './icon.svg';
import { ReactComponent as ArrowLeft2Icon } from '../../../icons/arrowLeft2.svg';

interface TransactionHomeCardProps {
  merchant: string;
  transDate: string;
  price: number;
}

export const TransactionHomeCard: React.FC<TransactionHomeCardProps> = ({
  merchant,
  transDate,
  price,
}) => {
  return (
    <div className="transaction-home-card">
      <div className="card-merchant-wrapper">
        <img className="card-icon" src={IconSvg} />
        <span className="card-merchant-name">{merchant}</span>
      </div>
      <div className="card-home-content">
        <div className="transaction-titles">
          <div>
            <span className="transaction-title">مبلغ تراکنش ها: </span>
            <span className="card-price">{price}</span>
            <span className="card-price"> تومانءءء</span>
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className="transaction-title">تاریخ تراکنش:‌</span>
            <span className="card-date">{transDate}</span>
          </div>
        </div>
      </div>
      <div className="card-home-arrow-left">
        <ArrowLeft2Icon />
      </div>
    </div>
  );
};
