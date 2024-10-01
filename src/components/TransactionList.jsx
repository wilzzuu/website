import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Ensure the user is logged in before querying
        if (!auth.currentUser) {
          console.error('No user is currently logged in.');
          setError('User is not authenticated.');
          return;
        }

        // Create a query to get the user's transactions based on their UID
        const q = query(
          collection(db, 'transactions'),
          where('userId', '==', auth.currentUser.uid)
        );

        // Execute the query and fetch documents
        const querySnapshot = await getDocs(q);
        
        // Log the results for debugging
        if (querySnapshot.empty) {
          console.warn('No transactions found for this user.');
        }

        const fetchedTransactions = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setTransactions(fetchedTransactions);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError(err.message);
      }
    };

    // Call the function to fetch transactions
    fetchTransactions();
  }, []);

  // Display any errors encountered during the fetch
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Your Transactions</h2>
      <ul>
        {transactions.length > 0 ? (
          transactions.map((txn) => (
            <li key={txn.id}>
              {txn.type === 'income' ? '+' : '-'}${txn.amount} - {txn.category}
            </li>
          ))
        ) : (
          <p>No transactions found.</p>
        )}
      </ul>
    </div>
  );
};

export default TransactionList;
