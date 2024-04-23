import { useState } from 'react';

interface Transaction {
  id: number;
  phone_number: string;
  transaction_id: string;
  source_bank: string;
}

interface DetailedDrawerData {
  nameItem1: string;
  nameItem2: string;
}

const useDrawerTransaction = (sortedTransactionList: Transaction[]) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    number | null
  >(null);
  const [detailedDrawerData, setDetailedDrawerData] = useState<
    DetailedDrawerData[]
  >([]);

  const handleDrawerTransaction = (id: number) => {
    setSelectedTransactionId(id);
    setIsOpen(true);
    const selectedTransaction = sortedTransactionList.find(
      (transaction) => transaction.id === id
    );

    if (selectedTransaction) {
      const { phone_number, transaction_id, source_bank } = selectedTransaction;
      const detailedDrawerData = [
        { nameItem1: 'بانک', nameItem2: source_bank },
        { nameItem1: 'شماره موبایل', nameItem2: phone_number },
        { nameItem1: 'شناسه پیمان', nameItem2: transaction_id },
      ];
      setDetailedDrawerData(detailedDrawerData);
    }
  };

  const handleCloseDrawer = () => {
    setSelectedTransactionId(null);
    setIsOpen(false);
    setDetailedDrawerData([]);
  };

  return {
    isOpen,
    detailedDrawerData,
    handleDrawerTransaction,
    handleCloseDrawer,
    selectedTransactionId,
  };
};

export default useDrawerTransaction;
