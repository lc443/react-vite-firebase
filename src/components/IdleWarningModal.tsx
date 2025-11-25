import "./IdleWarningModal.scss";

export default function IdleWarningModal({ open, onStay, secondsLeft }: any) {
  if (!open) return null;

  return (
    <div className="idle-backdrop">
      <div className="idle-modal shadow">
        <h4 className="mb-3 text-danger">You’re about to be logged out</h4>

        <p>You will be logged out in <strong>{secondsLeft}</strong> seconds due to inactivity.</p>
        
        <button className="btn btn-primary mt-3" onClick={onStay}>
          Stay Logged In
        </button>
      </div>
    </div>
  );
}