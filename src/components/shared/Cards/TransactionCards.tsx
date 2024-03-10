import './style.css';
import IconSvg from './icon.svg';

interface TransactionCardProps {
  merchant: string;
  transDate: string;
  transStatus: string;
  transStatusIcon: React.ReactNode;
  price: number;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  merchant,
  transDate,
  transStatus,
  transStatusIcon,
  price,
}) => {
  return (
    <div className="transaction-card">
      <div className="card-merchant-wrapper">
        <img className="card-icon" src={IconSvg} />
        <span className="card-merchant-name">{merchant}</span>
      </div>
      <div className="card-content">
        <div className="transaction-titles">
          <div>
            <span className="transaction-title">مبلغ تراکنش ها: </span>
            <span className="card-price">{price}</span>
            <span className="card-price"> تومانءءء</span>
          </div>
          <div>
            <span className="card-status">{transStatus}</span>
            <span className="card-status-icon">{transStatusIcon}</span>
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className="transaction-title">تاریخ تراکنش:‌</span>
            <span className="card-date">{transDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
