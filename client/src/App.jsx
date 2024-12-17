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
          ? { ...item, quantity: item.quantity > 1 ? item.quantity + 1 : 1, totalCost: item.price * (item.quantity > 1 ? item.quantity + 1 : 1) }
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

  const increasePrice = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? { ...item, price: item.price >= 1 ? item.price + 1 : 1, totalCost: item.quantity * (item.price >= 1 ? item.price + 1 : 1) }
          : item
      )
    );
  };

  const decreasePrice = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? { ...item, price: item.price > 1 ? item.price - 1 : 1, totalCost: item.quantity * (item.price >= 1 ? item.price - 1 : 1) }
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
            <span>{item.name} <br/> (Qty: {item.quantity}) (Pr: {item.price})</span>
            <button onClick={() => increaseQuantity(index)} disabled={item.quantity <= 1}>Quantity<br/>(+)</button>
            <button onClick={() => decreaseQuantity(index)} disabled={item.quantity <= 1}>Quantity<br />(-)</button>
            <button onClick={() => increasePrice(index)} disabled={item.quantity <= 1}>Price<br />(+)</button>
            <button onClick={() => decreasePrice(index)} disabled={item.quantity <= 1}>Price<br />(-)</button>
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
            <div className="panel">
            <center><h3>Saved Items</h3></center>
            </div>
          </ResizableBox>
        </div>
      </Draggable>
     
    </div>
    </body>
  );
}

export default App;
