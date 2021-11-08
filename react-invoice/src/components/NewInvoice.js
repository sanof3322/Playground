import React, {useState, useContext} from "react"
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import {Typeahead} from 'react-bootstrap-typeahead'
import customers from '../data/customers'
import invoiceItems from "../data/invoice-items";

import "react-datepicker/dist/react-datepicker.css";

const NewInvoice = () => {
  let navigate = useNavigate(); 

  const blankInvoiceItem = {
    Id: 0,
    Name: "",
    Price:  0,
    Quantity: 1,
    ItemTotal: 0
  }

  const  [invoice, setInvoice] = useState({
    InvoiceNumber: "",
    DueDate: "",
    Customer: null,
    InvoiceItems: [blankInvoiceItem]
  })

  return (
    <>
      <div className="row mt-4">
        <div className="col">
          <h1>Invoice {invoice.InvoiceNumber && <small className="text-muted">#{invoice.InvoiceNumber}</small>}</h1>
        </div>
        <div className="col text-end">
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/");
            }}>
              Back to Invoices
          </button>
        </div>
      </div>
      <div className="card bg-light">
        <div className="card-body">

          <div className="form-group mb-2">
            <label htmlFor="invoiceNumber" className="form-label">Invoice Number</label>
            <div className="col-md-4">
              <input type="text" 
                className="form-control" 
                id="invoiceNumber" 
                value={invoice.InvoiceNumber} 
                onChange={(e) => setInvoice({
                  ...invoice,
                  InvoiceNumber: e.target.value
                })}
                />
            </div>
          </div>

          <div className="form-group mb-2">
            <label htmlFor="dueDate" className="form-label">Due Date</label>
            <div className="col-md-4">              
              <DatePicker
                  selected={ invoice.DueDate }
                  onChange={ date => setInvoice({
                    ...invoice,
                    DueDate: date
                  }) }
                  className="form-control"
                  id="dueDate"
                  dateFormat="MM/dd/yyyy"
              />
            </div>
          </div>

          <div className="form-group mb-2">
            <label htmlFor="customer" className="form-label">Customer</label>
            <div className="col-md-4">
              <Typeahead
                id="customer"
                labelKey={option => `${option.FirstName} ${option.LastName}`}
                onChange={(selected) => setInvoice({
                  ...invoice,
                  Customer: selected[0]
                })}
                options={customers}
                placeholder="Choose a customer..."
                selected={customers.filter(x => x === invoice.Customer)}
              />              
            </div>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Item Details</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {invoice.InvoiceItems.map((i) => (
                <tr key={i.Id}>
                  <td>
                    <div className="form-group">
                      <label htmlFor={`invoice-item-id-${i.Id}`} className="visually-hidden">Invoice Item</label>
                      <Typeahead
                        id={`invoice-item-id-${i.Id}`}
                        labelKey={option => `${option.Name}`}
                        onChange={(selected) => {
                          //find invoice item to edit;
                          let invoiceItem =  invoice.InvoiceItems.filter(x => x.Id === i.Id)[0];
                          
                          //change its properties
                          invoiceItem.Id = selected[0].Id;
                          invoiceItem.Name = selected[0].Name;

                          const filteredItems = invoice.InvoiceItems.filter(x => x.Id !== i.Id);

                          return setInvoice({
                            ...invoice,
                            InvoiceItems:[
                              ...filteredItems, //filter out editing element
                              invoiceItem //pushing just edited element
                            ]
                          })
                        }}
                        options={invoiceItems}
                        placeholder="Choose an item..."
                        selected={invoiceItems.filter(x => x.Id === i.Id)}
                      />  
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <label htmlFor={`invoice-item-quantity-id-${i.Id}`} className="visually-hidden">Item Quantity</label>
                      <input type="text" 
                        className="form-control" 
                        id={`invoice-item-quantity-id-${i.Id}`}
                        value={i.Quantity} 
                        onChange={(e) => {
                          //find invoice item to edit;
                          let invoiceItem =  invoice.InvoiceItems.filter(x => x.Id === i.Id)[0];
                          
                          //change its properties
                          invoiceItem.Quantity = e.target.value;

                          return setInvoice({
                            ...invoice,
                            InvoiceItems:[
                              ...invoice.InvoiceItems.filter(x => x.Id !== i.Id), //filter out editing element
                              invoiceItem //pushing just edited element
                            ]
                          })
                        }}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <label htmlFor={`invoice-item-price-id-${i.Id}`} className="visually-hidden">Item Price</label>
                      <input type="text" 
                        className="form-control" 
                        id={`invoice-item-price-id-${i.Id}`}
                        value={i.Price} 
                        onChange={(e) => {
                          //find invoice item to edit;
                          let invoiceItem =  invoice.InvoiceItems.filter(x => x.Id === i.Id)[0];
                          
                          //change its properties
                          invoiceItem.Price = e.target.value;

                          return setInvoice({
                            ...invoice,
                            InvoiceItems:[
                              ...invoice.InvoiceItems.filter(x => x.Id !== i.Id), //filter out editing element
                              invoiceItem //pushing just edited element
                            ]
                          })
                        }}
                      />
                    </div>
                  </td>
                  <td>
                    {`$${i.Quantity * i.Price}`}
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn btn-primary" onClick={() => console.log(invoice)}>Print</button>

        </div>{/* end of card-body */}
      </div>
    </>
  );
} 

export default NewInvoice;
