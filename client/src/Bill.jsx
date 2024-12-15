import React, { useState } from 'react';

function BillForm() {
  const [billNo, setBillNo] = useState('');
  const [date, setDate] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [type, setType] = useState('');
  const [reading, setReading] = useState('');
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    setItems([...items, { slNo: items.length + 1, particulars: '', rate: '', amount: '' }]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + parseFloat(item.amount || 0), 0);
  };

  return (
    <div>
      <h1>Bill/Cash Memo</h1>
      <div>
        <label>Bill No:</label>
        <input type="text" value={billNo} onChange={(e) => setBillNo(e.target.value)} />
      </div>
      <div>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <label>To:</label>
      </div>
      <div>
        <label>Vehicle No:</label>
        <input type="text" value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} />
      </div>
      <div>
        <label>Type:</label>
        <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
      </div>
      <div>
        <label>Reading:</label>
        <input type="text" value={reading} onChange={(e) => setReading(e.target.value)} />
      </div>
      <table border={1}>
        <thead>
          <tr>
            <th>SL No.</th>
            <th>PARTICULARS</th>
            <th>RATE</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.slNo}</td>
              <td>
                <input type="text" value={item.particulars} onChange={(e) => handleChange(index, 'particulars', e.target.value)} />
              </td>
              <td>
                <input type="number" value={item.rate} onChange={(e) => handleChange(index, 'rate', e.target.value)} />
              </td>
              <td>
                <input type="number" value={item.amount} onChange={(e) => handleChange(index, 'amount', e.target.value)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddItem}>Add Item</button>
      <div>
        <label>TOTAL AMOUNT:</label>
        <span>{calculateTotal()}</span>
      </div>
      <div>
        {/* ... other fields and components ... */}
      </div>
    </div>
  );
}

export default BillForm;