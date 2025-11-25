import "./Dashboard.scss";

export default function Dashboard() {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>

      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card p-3 shadow-sm">
            <h5>Users</h5>
            <p>Total: 20</p>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card p-3 shadow-sm">
            <h5>Books</h5>
            <p>Total: 125</p>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card p-3 shadow-sm">
            <h5>Sales</h5>
            <p>$4,500</p>
          </div>
        </div>
      </div>
    </div>
  );
}