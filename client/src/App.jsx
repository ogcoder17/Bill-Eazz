import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import "./App.css";
import styled from 'styled-components';

function BillTable({ name, items, totalCost }) {
  const companyName = sessionStorage.getItem("companyName");
  const logo = sessionStorage.getItem("logo");

  const styles = {
    container: {
      padding: "20px",
      textAlign: "center",
      fontFamily: "'Arial', sans-serif",
      backgroundColor: "#f8f9fa",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    logo: {
      maxWidth: "100px",
      marginBottom: "10px",
    },
    companyName: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#333",
      textAlign: "right",
    },
    table: {
      margin: "0 auto",
      width: "80%",
      borderCollapse: "collapse",
    },
    th: {
      padding: "10px",
      textAlign: "left",
      border: "1px solid #ddd",
      backgroundColor: "#007bff",
      color: "white",
      fontSize: "1.1rem",
    },
    td: {
      padding: "10px",
      textAlign: "left",
      border: "1px solid #ddd",
      fontSize: "1rem",
    },
    rowEven: {
      backgroundColor: "#f2f2f2",
    },
    strongText: {
      fontWeight: "bold",
      color: "#333",
    },
    lastCol: {
      textAlign: "right",
    },
    totalRow: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      backgroundColor: "#f8f9fa",
    },
    totalCost: {
      borderTop: "2px solid #007bff",
    },
  };

  return (
    <div style={styles.container}>
      {/* Logo and Company Name */}
      <div style={styles.header}>
        {logo && <img src={logo} alt="Company Logo" style={styles.logo} />}
        <h1 style={styles.companyName}>{companyName}</h1>
      </div>

      {/* Bill Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th colSpan="4" style={styles.th}>
              Bill Details
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="2" style={styles.td}>
              <strong style={styles.strongText}>Customer Name:</strong>
            </td>
            <td colSpan="2" style={styles.td}>
              {name}
            </td>
          </tr>
          <tr>
            <td style={styles.th}>
              <strong style={styles.strongText}>Item</strong>
            </td>
            <td style={styles.th}>
              <strong style={styles.strongText}>Quantity</strong>
            </td>
            <td style={styles.th}>
              <strong style={styles.strongText}>Price</strong>
            </td>
            <td style={styles.th}>
              <strong style={styles.strongText}>Total</strong>
            </td>
          </tr>
          {items.map((item, index) => (
            <tr key={index} style={index % 2 === 0 ? styles.rowEven : {}}>
              <td style={styles.td}>{item.name}</td>
              <td style={styles.td}>{item.quantity}</td>
              <td style={styles.td}>₹{item.price.toFixed(2)}</td>
              <td style={styles.td}>₹{item.totalCost.toFixed(2)}</td>
            </tr>
          ))}
          <tr style={styles.totalRow}>
            <td colSpan="3" style={styles.td}>
              <strong style={styles.strongText}>Total Cost:</strong>
            </td>
            <td style={{ ...styles.td, ...styles.lastCol }}>
              <strong>₹{totalCost.toFixed(2)}</strong>
            </td>
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
  
    // Create a <style> element and inject styles
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Arial:wght@400;700&display=swap'); /* If you are using external font */
      body {
        font-family: 'Arial', sans-serif;
        padding: 20px;
        background-color: #f8f9fa;
      }
      .panel {
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        padding: 10px;
        text-align: left;
        border: 1px solid #ddd;
      }
      th {
        background-color: #007bff;
        color: white;
      }
      td {
        font-size: 1rem;
      }
      .totalRow {
        font-weight: bold;
        background-color: #f8f9fa;
      }
      .totalCost {
        border-top: 2px solid #007bff;
      }
    `;
    newWindow.document.head.appendChild(styleTag);
    
    // Inject the HTML content
    newWindow.document.write(printableContent);
    newWindow.document.close();
  
    // Trigger the print dialog
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
