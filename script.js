// ===== ELEMENTS =====
const envelope = document.getElementById("envelope");
const card = document.getElementById("card");
const flap = document.querySelector(".flap");
const seal = document.querySelector(".seal");

// ===== OPEN ENVELOPE =====
envelope.addEventListener("click", () => {
  
  // animate flap opening
  flap.style.transform = "rotateX(180deg)";

  // fade out seal
  seal.style.transition = "0.6s ease";
  seal.style.opacity = "0";

  // slight envelope lift
  envelope.style.transform = "translateY(-10px) scale(1.02)";

  // reveal invitation after delay
  setTimeout(() => {
    card.classList.remove("hidden");
  }, 700);

});

// ===== BUTTON ACTIONS =====

// Google Maps
function maps() {
  window.open(
    "https://www.google.com/maps/search/?api=1&query=Aya+Experience+Kirkland+Quebec",
    "_blank"
  );
}

// RSVP (opens SMS)
function rsvp() {
  window.open("sms:+15146592923?body=Hi! I would like to RSVP for Alvina's bridal shower", "_blank");
}

// Add to Calendar (.ics download)
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
  a.download = "bridal-shower.ics";
  a.click();
}
