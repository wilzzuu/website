import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';

const fetchTransactions = async () => {
    try {
        if (!auth.currentUser) {
            console.error('No user is currently logged in.');
            setError('User is not authenticated.');
            return;
        }

        const q = query(collection(db, 'transactions'), where('userId', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id, }));
        } else {
            throw new Error('Transactions not found.');
        }

    } catch (error) {
        console.error('Error fetching transatcions: ', error);
        setError(error.message);
    };
};

const TransactionList = () => {
    const { currentUser } = useAuth();

    const { data: transactions, isLoading, error } = useQuery(
        ['transatcions', currentUser],
        () => fetchTransactions(),
        {
            enabled: !!currentUser || currentUser === null,
            cacheTime: 72000000, // 2h cache time
            staleTime: 36000000, // 1h stale time
            refetchOnWindowFocus: true,
            refetchOnReconnect: false,
            keepPreviousData: true,
        }
    );

    if (isLoading) return <div>Loading transactions...</div>;
    if (error) { return <div>Error: {error}</div>; }

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
