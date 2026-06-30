const envelope = document.getElementById("envelope");
const card = document.getElementById("card");
const particlesContainer = document.getElementById("particles");

// =====================
// ENVELOPE OPEN
// =====================
envelope.addEventListener("click", () => {

  envelope.classList.add("open");

  setTimeout(() => {
    card.classList.remove("hidden");
  }, 900);

});

// =====================
// BUTTONS
// =====================
function maps() {
  window.open("https://www.google.com/maps/search/?api=1&query=Aya+Experience+Kirkland+Quebec", "_blank");
}

function rsvp() {
  window.open("sms:+15146592923?body=Hi! I would like to RSVP for Alvina's bridal shower", "_blank");
}

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

// =====================
// FLOATING PEARL PARTICLES
// =====================
function createParticles() {
  for (let i = 0; i < 35; i++) {
    const p = document.createElement("div");
    p.classList.add("particle");

    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDuration = 6 + Math.random() * 6 + "s";
    p.style.opacity = Math.random();

    particlesContainer.appendChild(p);
  }
}

createParticles();
