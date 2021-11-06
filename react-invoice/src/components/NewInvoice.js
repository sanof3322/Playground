import { useParams, useNavigate } from "react-router-dom";

const NewInvoice = () => {
  let navigate = useNavigate();

  return (
    <>
      <div class="row mt-4">
        <div class="col"><h1>Invoice</h1></div>
        <div class="col text-end">
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/");
            }}>
              Back to Invoices
          </button>
        </div>
      </div>
      <div class="card bg-light">
        <div class="card-header">Invoice Details</div>
        <div class="card-body">
          
        </div>
      </div>
    </>
  );
} 

export default NewInvoice;
