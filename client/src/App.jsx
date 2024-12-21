import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import "./App.css";
import styled from 'styled-components';


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
            <td colSpan="2"><strong>Customer Number:</strong></td>
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

  const [savedItems, setSavedItems] = useState([
    { name: "Manchuria", price: 100, quantity: 1 },
    { name: "Fried Rice", price: 120, quantity: 1 },
    { name: "Noodles", price: 90, quantity: 1 },
    { name: "Burger", price: 150, quantity: 1 },
    { name: "Pizza", price:180, quantity:1 },
    { name: "Pasta", price:200, quantity:1 }
  ]);

  const addSavedItem = (savedItem) => {
    const existingItemIndex = items.findIndex((item) => item.name === savedItem.name);
  
    if (existingItemIndex > -1) {
      // If the item already exists, update its quantity and total cost
      setItems((prevItems) =>
        prevItems.map((item, index) =>
          index === existingItemIndex
            ? {
                ...item,
                quantity: item.quantity + savedItem.quantity,
                totalCost: (item.quantity + savedItem.quantity) * item.price,
              }
            : item
        )
      );
    } else {
      // Add the saved item as a new entry
      setItems([
        ...items,
        {
          ...savedItem,
          totalCost: savedItem.price * savedItem.quantity,
        },
      ]);
    }
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

  const increaseQuantity = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? { ...item, quantity: item.quantity >= 1 ? item.quantity + 1 : 1, totalCost: item.price * (item.quantity >= 1 ? item.quantity + 1 : 1) }
          : item
      )
    );
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

  const handlePriceEdit = (index, value) => {
    const newPrice = parseFloat(value) || 0; // Ensure valid number
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? { ...item, price: newPrice, totalCost: newPrice * item.quantity }
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
    <body className="app-body">
    <div className="app-container">
      {/* Movable Bill Receipt Panel */}
      <Draggable>
        <div className="draggable-panel">
          <ResizableBox width={500} height={600} minConstraints={[300, 300]} maxConstraints={[800, 800]}>
            <div ref={printableRef} className="panel">
              <BillTable name={name} items={items} totalCost={calculateTotalCost()} />
            </div>
            <br />
            <center>
            <button onClick={handlePrint} className="btn">Generate Receipt</button>
            </center>
          </ResizableBox>
        </div>
      </Draggable>

      {/* Movable Item Selection Panel */}
      <Draggable>
  <div className="draggable-panel">
    <ResizableBox
      width={600} /* Initial width */
      height={500} /* Initial height */
      minConstraints={[300, 300]} /* Minimum size constraints */
      maxConstraints={[window.innerWidth - 100, window.innerHeight - 100]} /* Maximum constraints based on viewport */
    >
      <div className="panel">
        <center><h3><header>Item Selection</header></h3></center>
        <table border="1" cellPadding="3" className="dynamic-table">
          <thead>
            <tr>
              <th>Enter Your Number</th>
              <td>
                <input
                  type="tel"
                  placeholder="Number"
                  value={name}
                  onChange={handleNameChange}
                  className="input-field"
                  pattern="[0-9]{10}"
                  maxLength="10"
                />
              </td>
            </tr>
            <tr>
              <th>Item Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="name"
                  placeholder="Item Name"
                  value={currentItem.name}
                  onChange={handleCurrentItemChange}
                  className="input-field"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={currentItem.price}
                  onChange={handleCurrentItemChange}
                  className="input-field"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={currentItem.quantity}
                  onChange={handleCurrentItemChange}
                  className="input-field"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <center><button onClick={addItem} className="btn">Add Item</button></center>
        <br />
        <center><h3>Items</h3></center>
        {items.map((item, index) => (
          <div key={index} className="item">
            <span>{item.name} <br/> (Qty: {item.quantity})</span>
            Quantity:
            <button onClick={() => increaseQuantity(index)} disabled={item.quantity <= 0}>(+)</button>
            <button onClick={() => decreaseQuantity(index)} disabled={item.quantity <= 1}>(-)</button>
            <span>Price:</span>
            <input
              type="number"
              value={item.price}
              onChange={(e) => handlePriceEdit(index, e.target.value)}
              className="price-input"
            />
            <button className="btn btn-info" onClick={() => removeItem(index)}>Remove</button>
          </div>
        ))}
      </div>
    </ResizableBox>
  </div>
</Draggable>

      {/* Movable Item List Panel */}
      <Draggable>
        <div className="draggable-panel">
          <ResizableBox width={400} height={500} minConstraints={[300, 300]} maxConstraints={[700, 700]}>
            <center><h3>Saved Items</h3></center>
            <div className="panel">
            <div className="saved-items-row">
              {savedItems.map((savedItem, index) => (
            <button
               key={index}
               onClick={() => addSavedItem(savedItem)}
               className="saved-item-btn"
            >
              {savedItem.name}
            </button>
            ))}
              </div>
          </div>

          </ResizableBox>
        </div>
      </Draggable>
     
    </div>
    </body>
  );
}

export default App;
