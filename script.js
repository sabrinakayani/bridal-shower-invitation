
const envelope = document.getElementById("envelope");
const card = document.getElementById("card");

// =========================
// LUXURY ENVELOPE OPEN
// =========================
envelope.addEventListener("click", () => {

  // prevent double clicking
  if (envelope.classList.contains("open")) return;

  // 1. add open state (triggers CSS animation)
  envelope.classList.add("open");

  // 2. subtle lift BEFORE opening completes
  envelope.style.transition = "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
  envelope.style.transform = "translateY(-8px) scale(1.03)";

  // 3. slow reveal timing (key luxury feel)
  setTimeout(() => {
    card.classList.remove("hidden");
  }, 950);

});

// =========================
// BUTTONS
// =========================

// Directions
function maps() {
  window.open(
    "https://www.google.com/maps/search/?api=1&query=Aya+Experience+Kirkland+Quebec",
    "_blank"
  );
}

// RSVP
function rsvp() {
  window.open(
    "sms:+15146592923?body=Hi! I would like to RSVP for Alvina's bridal shower",
    "_blank"
  );
}

// Calendar (.ics file)
function calendar() {

  const event = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Alvina's Bridal Shower
LOCATION:Aya Experience, Kirkland, QC
DESCRIPTION:Bridal Shower for Alvina Kayani
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([event], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "alvina-bridal-shower.ics";
  a.click();

}
