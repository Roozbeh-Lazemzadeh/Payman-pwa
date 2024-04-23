import { useEffect, useState } from 'react';
import { parse } from 'date-fns';

const useDateFilter = (transactionList: any, allFilter: { merchants?: string[]; date: any; price?: number[]; }) => {
  const [filteredTransactionList, setFilteredTransactionList] =
    useState(transactionList);

  useEffect(() => {
    const filterTransactionsByDate = () => {
      if (allFilter.date && allFilter.date.length === 2) {
        const parsedDates = allFilter.date.map((date: string) =>
          parse(date, 'yy-MMM-dd hh:mm:ss a', new Date())
        );

        const filteredList = transactionList.filter((transaction: { transaction_date: string; }) => {
          const transactionDate = parse(
            transaction.transaction_date,
            'yy-MMM-dd hh.mm.ss.SSSSSSSSS a',
            new Date()
          );
          return (
            transactionDate >= parsedDates[0] &&
            transactionDate <= parsedDates[1]
          );
        });

        setFilteredTransactionList(filteredList);
      } else {
        // If no date filter is applied, set the filtered list to the original transaction list
        setFilteredTransactionList(transactionList);
      }
    };

    filterTransactionsByDate();
  }, [transactionList, allFilter.date]);

  return filteredTransactionList;
};

export default useDateFilter;
