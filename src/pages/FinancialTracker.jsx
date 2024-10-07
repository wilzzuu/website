import React, { useEffect, useState, useRef } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { collection, query, where, getDocs, updateDoc, doc, limit, onSnapshot } from 'firebase/firestore';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { db } from '../firebase/firebase';
import Notification from '../components/Notification';
import '../styles/Global.css';
import '../styles/FinancialTracker.css';

function FinancialTracker() {
    const { currentUser } = useAuth();
    const [notification, setNotification] = useState(null);
    const queryClient = useQueryClient();
    const prevTransactionRef = useRef([]);

    const { data: transactions, isLoading, error } = useQuery(
        ['transatcions', currentUser],
        async () => {
            const transactionRef = collection(db, 'transactions');
            let q;
            if (currentUser) {
                q = query(transactionRef, where('userId', '==', currentUser.uid));
            }

            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        },
        {
            enabled: !!currentUser || currentUser === null,
            cacheTime: 72000000, // 2h cache time
            staleTime: 36000000, // 1h stale time
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            keepPreviousData: false,
        }
    );

    useEffect(() => {
        if (transactions) {
            const transactionRef = collection(db, 'transactions');
            let q;
            if (currentUser) {
                q = query(transactionRef, where('userId', '==', currentUser.uid));
            }

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const newTransactions = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                if (prevTransactionRef.current.length && prevTransactionRef.current.length !== newTransactions.length) {
                    setNotification('Transactions added or updated');
                    setTimeout(() => setNotification(null), 5000);
                }

                queryClient.setQueryData(['transactions', currentUser], newTransactions);

                prevTransactionRef.current = newTransactions;
            });
            return () => unsubscribe();
        }
    }, [queryClient]);

    if (isLoading) return <div>Loading transactions...</div>;
    if (error) { return <div>Error: {error}</div>; }

    return (
        <div>
            {notification && <Notification message={notification}/>}
            <h1>Financial Tracker</h1>
            <p>Track your finances here!</p>
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
}

export default FinancialTracker;
