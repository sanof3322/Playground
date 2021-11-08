import React from 'react';
import ReactDOM from 'react-dom';
import NewInvoice from './components/NewInvoice'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes, Outlet} from 'react-router-dom' 
import Invoices from './components/Invoices';

//routing tutorial https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md
const Router = (
  <BrowserRouter basename='/'>
    <Routes>
      <Route path="/" element={<Invoices />} />
      <Route path="invoice" element={<Outlet />}>
        <Route path="new" element={<NewInvoice />}/>
        <Route path=":id" element={<NewInvoice />}/>
      </Route>
      <Route
        path="*"
        element={
          <main class="alert alert-warning text-center mt-4">
            <h3>404</h3>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  </BrowserRouter>
)



ReactDOM.render(
  Router,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
