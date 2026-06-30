/* ============================================================
   Pearls & Prosecco — site script
   Edit the EVENT object below to customize the invitation.
   ============================================================ */
const EVENT = {
  brideName: "Olivia Jordan",
  dateLabel: "Saturday, August 15th \u00B7 2:00 PM",
  locationLabel: "The Garden Pavilion \u00B7 12 Rosewood Lane",

  // Used to build the "Add to Calendar" file — 24h UTC, format YYYYMMDDTHHMMSSZ
  startUTC: "20260815T180000Z",
  endUTC:   "20260815T200000Z",
  calendarSummary: "Pearls & Prosecco — Bridal Shower",
  calendarLocation: "The Garden Pavilion, 12 Rosewood Lane",

  // Used for the "Directions" link
  mapsQuery: "The Garden Pavilion, 12 Rosewood Lane",

  // Used for the "RSVP" link
  hostEmail: "rsvp@example.com",
  rsvpSubject: "RSVP — Pearls & Prosecco",
  rsvpBody: "I'd love to celebrate with you! Here's my RSVP:"
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("brideName").textContent = EVENT.brideName;
  document.getElementById("eventDate").textContent = EVENT.dateLabel;
  document.getElementById("eventLocation").textContent = EVENT.locationLabel;

  buildPearlStrands();
  wireDetailLinks();
  wireEnvelope();
});

/* ---------- pearl strands flanking the card ---------- */
function buildPearlStrands(){
  const counts = 9;
  document.querySelectorAll(".pearl-strand").forEach(strand => {
    for (let i = 0; i < counts; i++){
      const p = document.createElement("span");
      p.className = "pearl";
      strand.appendChild(p);
    }
  });
}

/* ---------- envelope open interaction ---------- */
function wireEnvelope(){
  const envelope   = document.getElementById("envelope");
  const waxSeal    = document.getElementById("waxSeal");
  const openPrompt = document.getElementById("openPrompt");
  const openText   = document.getElementById("openText");
  const detailsBar = document.getElementById("detailsBar");

  let opened = false;

  function openInvitation(originEl){
    if (opened) return;
    opened = true;

    // release the infinite pulse animation so the open-state transition
    // (driven by the .is-open class) is free to control transform/opacity
    waxSeal.style.animation = "none";
    void waxSeal.offsetWidth; // force reflow

    envelope.classList.add("is-open");
    openText.textContent = "see you there";
    openPrompt.setAttribute("disabled", "true");

    burstGoldDust(originEl || waxSeal);

    window.setTimeout(() => {
      detailsBar.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 650);
  }

  waxSeal.addEventListener("click", () => openInvitation(waxSeal));
  openPrompt.addEventListener("click", () => openInvitation(waxSeal));
}

/* ---------- small gold-dust burst from a given element ---------- */
function burstGoldDust(originEl){
  const layer = document.getElementById("confettiLayer");
  const rect = originEl.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const count = 22;
  for (let i = 0; i < count; i++){
    const bit = document.createElement("span");
    bit.className = "confetti-bit";

    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const distance = 60 + Math.random() * 90;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - 20;

    bit.style.left = `${originX}px`;
    bit.style.top = `${originY}px`;
    bit.style.setProperty("--dx", `${dx}px`);
    bit.style.setProperty("--dy", `${dy}px`);
    bit.style.animationDelay = `${Math.random() * 0.15}s`;

    layer.appendChild(bit);
    bit.addEventListener("animationend", () => bit.remove());
  }
}

/* ---------- directions / calendar / RSVP ---------- */
function wireDetailLinks(){
  const directionsLink = document.getElementById("directionsLink");
  const calendarBtn    = document.getElementById("calendarLink");
  const rsvpLink        = document.getElementById("rsvpLink");

  directionsLink.href =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(EVENT.mapsQuery);

  rsvpLink.href =
    `mailto:${EVENT.hostEmail}?subject=${encodeURIComponent(EVENT.rsvpSubject)}&body=${encodeURIComponent(EVENT.rsvpBody)}`;

  calendarBtn.addEventListener("click", downloadCalendarFile);
}

function downloadCalendarFile(){
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Pearls and Prosecco//Invitation//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@pearls-and-prosecco`,
    `DTSTAMP:${formatNowUTC()}`,
    `DTSTART:${EVENT.startUTC}`,
    `DTEND:${EVENT.endUTC}`,
    `SUMMARY:${EVENT.calendarSummary}`,
    `LOCATION:${EVENT.calendarLocation}`,
    "DESCRIPTION:Please join us as we celebrate the bride-to-be.",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pearls-and-prosecco.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function formatNowUTC(){
  return new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}
