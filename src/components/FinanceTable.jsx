import React from 'react';
import '../styles/FinanceTable.css';

const FinanceTable = ({ transactions }) => {
    return (
        <div className="table-container">
            <table className="finance-table">
                <thead>
                    <tr>
                        <th className='finance-table-date'>Date</th>
                        <th className='finance-table-type'>Payment Type</th>
                        <th className='finance-table-amount'>Amount</th>
                        <th className='finance-table-category'>Category</th>
                        <th className='finance-table-description'>Description</th>
                        <th className='finance-table-remove'></th>
                        <th className='finance-table-edit'></th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.date ? transaction.date.toDate().toLocaleDateString() : ''}</td>
                            <td>{transaction.type}</td>
                            <td>${transaction.amount.toFixed(2)}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.description}</td>
                            <td><button className='finance-table-remove-button'>Remove</button></td>
                            <td><button className='finance-table-edit-button'>Edit</button></td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="4">No transactions available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FinanceTable;
