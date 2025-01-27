import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import withAuth from "./withauth";

const Invoice = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{
      width: "210mm",
      minHeight: "297mm",
      padding: "20mm",
      background: "#fff",
      border: "1px solid #ddd",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <h1 style={{ textAlign: "center" }}>Fattura</h1>
    <hr style={{ margin: "20px 0" }} />
    <div style={{ marginBottom: "20px" }}>
      <p><strong>Cliente:</strong> {props.customerName || "Nome Cliente"}</p>
      <p><strong>Indirizzo:</strong> {props.customerAddress || "Indirizzo Cliente"}</p>
      <p><strong>Data:</strong> {new Date().toLocaleDateString()}</p>
    </div>
    <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Descrizione</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Quantità</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Prezzo Unitario (€)</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Totale (€)</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((item, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.description}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
              {item.quantity}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>
              {item.unitPrice.toFixed(2)}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>
              {(item.quantity * item.unitPrice).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div style={{ textAlign: "right", marginTop: "20px" }}>
      <p><strong>Totale Fattura:</strong> {props.total.toFixed(2)} €</p>
    </div>
  </div>
));

const InvoicePrint = () => {
  const invoiceRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  // Dati di esempio
  const invoiceData = {
    customerName: "Mario Rossi",
    customerAddress: "Via Roma, 10, Milano",
    items: [
      { description: "Lavaggio auto", quantity: 1, unitPrice: 30 },
      { description: "Pulizia interni", quantity: 1, unitPrice: 20 },
    ],
    total: 50,
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button
        onClick={handlePrint}
        style={{
          padding: "10px 20px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Print
      </button>
      <Invoice
        ref={invoiceRef}
        customerName={invoiceData.customerName}
        customerAddress={invoiceData.customerAddress}
        items={invoiceData.items}
        total={invoiceData.total}
      />
    </div>
  );
};

export default InvoicePrint;
