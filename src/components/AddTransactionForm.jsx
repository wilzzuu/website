import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore'; // Firebase Firestore functions
import { db } from '../firebase/firebase'; // Import the database and authentication from Firebase config
import { useAuth } from '../context/AuthContext'; // Import the context to get the current user

export default function AddTransactionForm() {
  // Set up state variables to handle the form inputs
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const { currentUser } = useAuth();

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const documentData = {
      type,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date(),
      userId: String(currentUser.uid), // Ensure `userId` is a string
    };
  
    try {
      await addDoc(collection(db, 'transactions'), documentData);
      alert('Transaction added successfully!');
      setAmount('');
      setCategory('');
      setDescription('');
    } catch (err) {
      console.error('Error adding document:', err);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <h2>Add a New Transaction</h2>
      {/* Select for type (Income or Expense) */}
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* Input for amount */}
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />

      {/* Input for category */}
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        required
      />

      {/* Input for description */}
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      {/* Submit button */}
      <button type="submit">Add Transaction</button>
    </form>
  );
}
