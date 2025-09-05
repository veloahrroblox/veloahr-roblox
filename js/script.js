// Scroll Animation
const elements = document.querySelectorAll('.animate-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));

// Shift Countdown + Status
function updateShiftStatus() {
  const now = new Date();
  const shifts = [
    { day: 5, time: "10:00", id: "fri-morning" },
    { day: 5, time: "20:00", id: "fri-evening" },
    { day: 6, time: "10:00", id: "sat-morning" },
    { day: 6, time: "20:00", id: "sat-evening" },
    { day: 0, time: "10:00", id: "sun-morning" },
    { day: 0, time: "20:00", id: "sun-evening" }
  ];

  let nextShiftTime = null;

  shifts.forEach(shift => {
    const [hours, minutes] = shift.time.split(":").map(Number);
    const shiftDate = new Date();
    shiftDate.setDate(shiftDate.getDate() + ((shift.day + 7 - now.getDay()) % 7));
    shiftDate.setHours(hours, minutes, 0, 0);

    const diff = shiftDate - now;
    const statusEl = document.getElementById(shift.id);

    if (diff > 0) {
      statusEl.className = "shift-status soon";
      statusEl.textContent = "Soon";
      if (!nextShiftTime || diff < nextShiftTime.diff) {
        nextShiftTime = { date: shiftDate, diff: diff };
      }
    } else if (diff > -3600000) { // within 1 hour after start
      statusEl.className = "shift-status progress";
      statusEl.textContent = "In Progress";
    } else {
      statusEl.className = "shift-status ended";
      statusEl.textContent = "Ended";
    }
  });

  if (nextShiftTime) {
    const countdownEl = document.getElementById("countdown");
    const hours = Math.floor(nextShiftTime.diff / (1000 * 60 * 60));
    const mins = Math.floor((nextShiftTime.diff % (1000 * 60 * 60)) / (1000 * 60));
    countdownEl.textContent = `${hours}h ${mins}m`;
  }
}

setInterval(updateShiftStatus, 60000);
updateShiftStatus();





