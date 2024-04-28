// Define the TransactionItem type
export interface TransactionItem {
  id: number;
  creditor: string;
  currency: string;
  source_bank: string;
  status: string;
  transaction_amount: number;
  transaction_date: string;
  transaction_id: string;
  phone_number: string;
  img: string;
  transaction_mag: string;
}

// Define the GroupedTransaction type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface GroupedTransaction {
  key: string;
  value: TransactionItem[];
}
