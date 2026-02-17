// Náhodné odkrývání mostu
(function () {
  const overlay = document.getElementById("most-overlay");
  const totalTiles = 10 * 6; // 10 sloupců x 6 řádků
  const tiles = [];

  for (let i = 0; i < totalTiles; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    overlay.appendChild(tile);
    tiles.push(tile);
  }

  // Zamícháme pořadí dílků
  const shuffled = tiles.slice().sort(() => Math.random() - 0.5);

  // Postupně odstraňujeme dílky
  shuffled.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add("hidden");
    }, 80 * index);
  });
})();

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Zabráníme klasickému odeslání formuláře

    emailjs
      .send("service_6fgyxon", "template_dlzejzp", {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
      })
      .then(
        function (response) {
          alert("Zpráva byla úspěšně odeslána! 📩");
          console.log("Úspěch!", response);
        },
        function (error) {
          alert("Chyba při odesílání zprávy. ❌");
          console.error("Chyba:", error);
        }
      );
  });
