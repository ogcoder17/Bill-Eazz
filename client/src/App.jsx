import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import "./App.css";

function BillTable({ name, items, totalCost }) {
  return (
    <div className="bill-table">
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th colSpan="4">Bill Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="2"><strong>Customer Name:</strong></td>
            <td colSpan="2">{name}</td>
          </tr>
          <tr>
            <td><strong>Item</strong></td>
            <td><strong>Quantity</strong></td>
            <td><strong>Price</strong></td>
            <td><strong>Total</strong></td>
          </tr>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price.toFixed(2)}</td>
              <td>₹{item.totalCost.toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3"><strong>Total Cost:</strong></td>
            <td><strong>₹{totalCost.toFixed(2)}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({ name: "", price: 0, quantity: 0 });
  const printableRef = useRef();

  const handleNameChange = (e) => setName(e.target.value);
  const handleCurrentItemChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({
      ...currentItem,
      [name]: name === "price" || name === "quantity" ? parseFloat(value) || 0 : value,
    });
  };

  const addItem = () => {
    if (currentItem.name && currentItem.price > 0 && currentItem.quantity > 0) {
      setItems([
        ...items,
        {
          ...currentItem,
          totalCost: currentItem.price * currentItem.quantity,
        },
      ]);
      setCurrentItem({ name: "", price: 0, quantity: 0 });
    } else {
      alert("Please enter valid item details.");
    }
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const decreaseQuantity = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1, totalCost: item.price * (item.quantity > 1 ? item.quantity - 1 : 1) }
          : item
      )
    );
  };

  const calculateTotalCost = () => {
    return items.reduce((total, item) => total + item.totalCost, 0);
  };

  const handlePrint = () => {
    const printableContent = printableRef.current.innerHTML;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(printableContent);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
  };

  return (
    <div className="app-container">
      {/* Movable Bill Receipt Panel */}
      <Draggable>
        <div className="draggable-panel">
          <ResizableBox width={500} height={600} minConstraints={[300, 300]} maxConstraints={[800, 800]}>
            <div ref={printableRef} className="panel">
              <BillTable name={name} items={items} totalCost={calculateTotalCost()} />
            </div>
          </ResizableBox>
        </div>
      </Draggable>

      {/* Movable Item Selection Panel */}
      <Draggable>
        <div className="draggable-panel">
          <ResizableBox width={400} height={500} minConstraints={[300, 300]} maxConstraints={[700, 700]}>
            <div className="panel">
              <h3>Enter Your Name</h3>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={handleNameChange}
                className="input-field"
              />
              <h3>Item Selection</h3>
              <input
                type="text"
                name="name"
                placeholder="Item Name"
                value={currentItem.name}
                onChange={handleCurrentItemChange}
                className="input-field"
              />
              <h3>Price</h3>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={currentItem.price}
                onChange={handleCurrentItemChange}
                className="input-field"
              />
              <h3>Quantity</h3>
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={currentItem.quantity}
                onChange={handleCurrentItemChange}
                className="input-field"
              />
              <button onClick={addItem} className="btn">Add Item</button>
            </div>
          </ResizableBox>
        </div>
      </Draggable>

      {/* Movable Item List Panel */}
      <Draggable>
        <div className="draggable-panel">
          <ResizableBox width={400} height={500} minConstraints={[300, 300]} maxConstraints={[700, 700]}>
            <div className="panel">
              <h3>Items</h3>
              {items.map((item, index) => (
                <div key={index} className="item">
                  <span>{item.name} (Qty: {item.quantity})</span>
                  <button onClick={() => decreaseQuantity(index)} disabled={item.quantity <= 1}>-</button>
                  <button onClick={() => removeItem(index)}>Remove</button>
                </div>
              ))}
              <button onClick={handlePrint} className="btn">Print Receipt</button>
            </div>
          </ResizableBox>
        </div>
      </Draggable>
     
    </div>
  );
}

export default App;
