// Define the TransactionItem type
export interface Transaction {
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
  transaction_msg: string;
}

// Define the GroupedTransaction type
export interface GroupedTransaction {
  key: string;
  value: Transaction[];
}
