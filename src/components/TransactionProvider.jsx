import { createContext, useContext, useState } from "react";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const showForm = (value) => {
    setShowTransactionForm(value);
  };
  return (
    <TransactionContext.Provider value={{ showForm, showTransactionForm }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);
