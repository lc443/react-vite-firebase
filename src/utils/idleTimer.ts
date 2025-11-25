let idleTimeout: number | null = null;
let warningTimeout: number | null = null;

const IDLE_LIMIT = 15 * 60 * 1000; // 15 minutes
const WARNING_TIME = 14 * 60 * 1000; // 14 minutes
const WARNING_DURATION = 60 * 1000; // 60 seconds

let onLogoutCallback: () => void;
let onWarningCallback: () => void;

function resetTimer() {
  // Clear timers
  if (idleTimeout) clearTimeout(idleTimeout);
  if (warningTimeout) clearTimeout(warningTimeout);

  // Schedule warning at 14 minutes
  warningTimeout = window.setTimeout(() => {
    console.log("⚠️ Showing 1-minute warning modal");
    if (onWarningCallback) onWarningCallback();
  }, WARNING_TIME);

  // Schedule logout at 15 minutes
  idleTimeout = window.setTimeout(() => {
    console.log("User idle for full 15 minutes → logging out");
    if (onLogoutCallback) onLogoutCallback();
  }, IDLE_LIMIT);
}

export function startIdleTimer(onWarning: () => void, onLogout: () => void) {
  onLogoutCallback = onLogout;
  onWarningCallback = onWarning;

  const activityEvents = [
    "mousemove",
    "mousedown",
    "keydown",
    "scroll",
    "touchstart",
  ];

  activityEvents.forEach((event) => window.addEventListener(event, resetTimer));

  resetTimer();
}

export function stopIdleTimer() {
  if (idleTimeout) clearTimeout(idleTimeout);
  if (warningTimeout) clearTimeout(warningTimeout);
}
