import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import {Typeahead} from 'react-bootstrap-typeahead'
import customers from '../data/customers'
import invoiceItems from "../data/invoice-items";

import "react-datepicker/dist/react-datepicker.css";

const NewInvoice = () => {
  let navigate = useNavigate(); 

  const uniqueId = (length=16) => {
    return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
  }

  const blankInvoiceItem = () => {
    return {
      Id: uniqueId(8),
      Name: "",
      Price:  0,
      Quantity: 1,
      ItemTotal: 0
    }
  }  

const  [invoice, setInvoice] = useState({
  InvoiceNumber: "",
  DueDate: "",
  Customer: null,
  SubTotal: 0.00,
  Shipping: 0.00,
  Discount: 0.00,
  Adjustment: 0.00,
  Tax: 0.00,
  Total: 0.00,
  InvoiceItems: [blankInvoiceItem()]
})

const calcTotal = () => {
  let SubTotal = 0, Total = 0;
  
  invoice.InvoiceItems.forEach(i => {
    SubTotal += i.Price * i.Quantity
  });
  
  try{
    Total = SubTotal + ((SubTotal / 100) * invoice.Tax) 
      + parseFloat(invoice.Shipping) 
      - parseFloat( invoice.Discount) 
      + parseFloat(invoice.Adjustment);
    Total = Total.toFixed(2);
    SubTotal = SubTotal.toFixed(2)

    

    if(!isNaN(Total)){
      setInvoice({
        ...invoice,
        SubTotal,
        Total
      })
    }
  }catch(ex){
    //do nothing
  }
};
 
useEffect(() => {
  calcTotal();  
}, [invoice.InvoiceItems, invoice.Discount, invoice.Shipping, invoice.Adjustment, invoice.Tax])// eslint-disable-line react-hooks/exhaustive-deps

  

  return (
    <>
      <div className="row mt-4">
        <div className="col">
          <h1>Invoice {invoice.InvoiceNumber && <small className="text-muted">#{invoice.InvoiceNumber}</small>}</h1>
        </div>
        <div className="col text-end">
          <button
            className="btn btn-outline-primary"
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

          <div className="row">
            <div className="col text-end">
              <button className="btn btn-light" onClick={() => setInvoice({
                ...invoice,
                InvoiceItems:[
                  ...invoice.InvoiceItems,
                  blankInvoiceItem()
                ]
              })}>
                <i className="bi bi-plus-lg"></i>
                Add Item
              </button>
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
              {invoice.InvoiceItems.map((i, index) => (
                <tr key={index}>
                  <td width="40%">
                    <div className="form-group">
                      <label htmlFor={`invoice-item-id-${i.Id}`} className="visually-hidden">Invoice Item</label>
                      <Typeahead
                        id={`invoice-item-id-${i.Id}`}                        
                        labelKey={option => `${option.Name}`}
                        IsInvalid={true} 
                        onChange={(selected) => {
                          const items = [...invoice.InvoiceItems];

                          items.forEach(item => {
                            if(item.Id === i.Id){
                              if(selected.length > 0){
                                item.Id = selected[0].Id;
                                item.Name = selected[0].Name;
                                item.Price = selected[0].Price;
                              }else{
                                item.Id = uniqueId();
                                item.Name = ""
                                item.IsInvalid = true;
                              }
                            }
                          });
                          
                          return setInvoice({
                            ...invoice,
                            InvoiceItems: items 
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
                          const items = [...invoice.InvoiceItems];

                          items.forEach(item => {
                            if(item.Id === i.Id){
                              //change its properties
                              item.Quantity = e.target.value;
                            }
                          });
                          
                          return setInvoice({
                            ...invoice,
                            InvoiceItems: items
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
                          const items = [...invoice.InvoiceItems];

                          items.forEach(item => {
                            if(item.Id === i.Id){
                              //change its properties
                              item.Price = e.target.value;
                            }
                          });
                          
                          return setInvoice({
                            ...invoice,
                            InvoiceItems: items
                          })
                        }}
                      />
                    </div>
                  </td>
                  <td className="align-middle">
                    {`$${i.Quantity * i.Price}`}
                  </td>
                  <td className="align-middle">
                    <button 
                      title="Remove"
                      className="btn btn-outline-primary btn-sm" 
                      disabled={invoice.InvoiceItems.length === 1 ? true : false} 
                      onClick={() => setInvoice({
                        ...invoice,
                        InvoiceItems: invoice.InvoiceItems.filter(x => x.Id !== i.Id)
                    })}>
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan="3" className="text-end">
                    Sub Total:
                </th>
                <td colSpan="2" >
                  {`$${invoice.SubTotal}`}
                </td>
              </tr>
              <tr>
                <th colSpan="3" className="text-end">
                    Tax (%):
                </th>
                <td colSpan="2" >
                  <div className="form-group">
                    <label className="visually-hidden">Tax</label>
                    <input type="text" 
                      className="form-control"
                      value={invoice.Tax} onChange={(e) => setInvoice({
                      ...invoice,
                      Tax: e.target.value
                    })} />                    
                  </div>
                </td>
              </tr>
              <tr>
                <th colSpan="3" className="text-end">
                    Discount ($):
                </th>
                <td colSpan="2" >
                  <div className="form-group">
                    <label className="visually-hidden">Discount in $</label>
                    <input type="text" 
                      className="form-control"
                      value={invoice.Discount} onChange={(e) => setInvoice({
                      ...invoice,
                      Discount: e.target.value
                    })} />                    
                  </div>
                </td>
              </tr>
              <tr>
                <th colSpan="3" className="text-end">
                    Shipping ($):
                </th>
                <td colSpan="2" >
                  <div className="form-group">
                    <label className="visually-hidden">Shipping</label>
                    <input type="text" 
                      className="form-control"
                      value={invoice.Shipping} onChange={(e) => setInvoice({
                      ...invoice,
                      Shipping: e.target.value
                    })} />                    
                  </div>
                </td>
              </tr>
              <tr>
                <th colSpan="3" className="text-end">
                    Adjustment (+/-):
                </th>
                <td colSpan="2" >
                  <div className="form-group">
                    <label className="visually-hidden">Adjustment</label>
                    <input type="text" 
                      className="form-control"
                      value={invoice.Adjustment} onChange={(e) => setInvoice({
                      ...invoice,
                      Adjustment: e.target.value
                    })} />                    
                  </div>
                </td>
              </tr>
              <tr>
                <th colSpan="3" className="text-end">
                    Total:
                </th>
                <td colSpan="2" >
                  {`$${invoice.Total}`}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>{/* end of card-body */}        
      </div>
      <div className="row mt-4">
        <div className="col text-end">
          {invoice.IsSaving ? (
            <button className="btn btn-primary">
              <div className="spinner-border spinner-border-sm text-light" role="status">
                <span className="visually-hidden">Saving</span>              
              </div>&nbsp;
              Saving...
            </button>
          ) : (
            <button className="btn btn-primary" onClick={async () => {
              setInvoice({...invoice, IsSaving: true});
  
              const savedInvoices = localStorage.getItem("invoices");
              if(savedInvoices == null){
                localStorage.setItem("invoices", JSON.stringify([invoice]))
              }else{
                const invoices = JSON.parse(savedInvoices);
                localStorage.setItem("invoices", JSON.stringify([
                  ...invoices,
                  invoice
                ]))
              }
  
              await setTimeout(() => setInvoice({...invoice, IsSaving: false}), 2000)
            }}>
              <i className="bi bi-save"></i>&nbsp;
              Save
            </button>
          )}          
        </div>
      </div>
    </>
  );
} 

export default NewInvoice;
