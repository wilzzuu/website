import React, { useEffect, useState, useRef } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { collection, query, where, getDocs, updateDoc, doc, limit, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/firebase';
import Notification from '../components/Notification';
import FinanceTable from '../components/FinanceTable';
import AddTransactionForm from '../components/AddTransactionForm';
import '../styles/Global.css';
import '../styles/FinanceTracker.css';

function FinanceTracker() {
    const { currentUser } = useAuth();
    const [notification, setNotification] = useState(null);
    const queryClient = useQueryClient();
    const prevTransactionRef = useRef([]);

    const { data: transactions, isLoading, error } = useQuery(
        ['transactions', currentUser],
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
            enabled: !!currentUser,
            cacheTime: 1000 * 60 * 60 * 24, // 2h cache time
            staleTime: 1000 * 60 * 30, // 1h stale time
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
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
    }, [queryClient, currentUser]);

    if (isLoading) return <div>Loading transactions...</div>;
    if (error) { return <div>Error: {error}</div>; }

    return (
        <div className='finance-tracker-container'>
            {notification && <Notification message={notification}/>}
            <h1 className='finance-tracker-header'>Finance Tracker</h1>
            <AddTransactionForm />
            {transactions && <FinanceTable transactions={transactions} />}
        </div>
    );
}

export default FinanceTracker;
