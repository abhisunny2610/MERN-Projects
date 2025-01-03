import React, { useState } from 'react';

const Task3 = () => {
    const [walletBalance, setWalletBalance] = useState(1000);
    const [stocks, setStocks] = useState([
        { name: 'Stock1', rate: 50 },
        { name: 'Stock2', rate: 75 },
        { name: 'Stock3', rate: 100 },
    ]);
    const [selectedStock, setSelectedStock] = useState(stocks[0]);
    const [numShares, setNumShares] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState('');

    const handlePurchase = () => {
        if (numShares && walletBalance >= numShares * selectedStock.rate) {
            const totalAmount = numShares * selectedStock.rate;
            const date = new Date().toLocaleString();
            const existingTransactionIndex = transactions.findIndex(
                (transaction) => transaction.stock.name === selectedStock.name
            );

            let newTransactions = [...transactions];

            if (existingTransactionIndex !== -1) {
                newTransactions[existingTransactionIndex] = {
                    ...newTransactions[existingTransactionIndex],
                    shares: numShares,
                    amount: totalAmount,
                    date,
                };
            } else {
                newTransactions = [
                    ...newTransactions,
                    {
                        id: transactions.length + 1,
                        stock: selectedStock,
                        shares: numShares,
                        amount: totalAmount,
                        date,
                    },
                ];
            }

            setWalletBalance(walletBalance - totalAmount);
            setTransactions(newTransactions);
            setNumShares(0);
            setError('');
        } else {
            setError('Insufficient wallet balance or invalid input.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Buy Shares</h2>
            <div className="mb-4">
                <p>Wallet Balance: <strong>${walletBalance.toFixed(2)}</strong></p>
                <p>Share Price: <strong>${selectedStock.rate}</strong></p>
            </div>

            <div className="mb-4">
                <label htmlFor="numShares" className="block text-sm font-medium text-gray-700">
                    Number of Shares:
                </label>
                <input
                    type="number"
                    id="numShares"
                    value={numShares || ''}
                    onChange={(e) => setNumShares(parseInt(e.target.value, 10))}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter number of shares"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="stockSelect" className="block text-sm font-medium text-gray-700">
                    Select Stock:
                </label>
                <select
                    id="stockSelect"
                    value={selectedStock.name}
                    onChange={(e) => {
                        const stock = stocks.find((s) => s.name === e.target.value);
                        setSelectedStock(stock);
                    }}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                >
                    {stocks.map((stock) => (
                        <option key={stock.name} value={stock.name}>
                            {stock.name} - ${stock.rate}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700">
                    Date and Time:
                </label>
                <input
                    type="text"
                    id="dateTime"
                    value={new Date().toLocaleString()}
                    readOnly
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <button
                onClick={handlePurchase}
                className="bg-green-500 text-white px-4 py-2 rounded"
            >
                Buy Shares
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <div className="mt-6">
                <h3 className="text-lg font-bold mb-2">Transaction History</h3>
                {transactions.length > 0 && (
                    <table className="mt-4 w-full border">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Stock</th>
                                <th className="border px-4 py-2">Shares</th>
                                <th className="border px-4 py-2">Amount</th>
                                <th className="border px-4 py-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td className="border px-4 py-2">{transaction.stock.name}</td>
                                    <td className="border px-4 py-2">{transaction.shares}</td>
                                    <td className="border px-4 py-2">${transaction.amount.toFixed(2)}</td>
                                    <td className="border px-4 py-2">{transaction.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Task3;
