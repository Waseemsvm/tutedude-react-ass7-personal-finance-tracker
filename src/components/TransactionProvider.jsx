import { createContext, useContext, useState } from "react";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const showForm = (value) => {
    setShowTransactionForm(value);
  };

  <TransactionContext.Provider value={showForm}>
    {children}
  </TransactionContext.Provider>;
};

export const useTransaction = useContext(TransactionContext);
