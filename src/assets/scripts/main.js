/**
 * Import dependencies from node_modules
 * see commented examples below
 */

import * as bootstrap from 'bootstrap';

// import 'some-node-module';
// import SomeModule from 'some-node-module';

/**
 * Write any other JavaScript below
 */

+(function () {
  const university = "UOC";
  console.log(`Hello, ${university}!`);

  /**
   * Detectar la pàgina activa a la navegació
   */
  const currentPath = window.location.pathname.replace(/index\.html$/, "").replace(/\/$/, "");
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPath = new URL(link.href, window.location.origin).pathname.replace(/index\.html$/, "").replace(/\/$/, "");
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

  /**
   * Joc de memòria
   */
  document.addEventListener("DOMContentLoaded", () => {
    const pairs = [
      ["Ampliar el cicle de vida", "Reaprofitar vida útil"],
      ["Economia circular", "Economia sostenible"],
      ["Model de producció", "Productivitat"],
      ["Consum responsable", "Consum respectuós"],
      ["Renovar", "Reparar"],
      ["Llogar", "Estalviar"],
      ["Reutilització", "Segona vida"],
      ["Reciclatge", "Reducció de residus"]
    ];
  
    // Paleta display-p3 (colors brillants)
    const colors = [
      "color(display-p3 0.9 0.1 0.1)", 
      "color(display-p3 0.1 0.9 0.1)", 
      "color(display-p3 0.1 0.1 0.9)", 
      "color(display-p3 0.9 0.9 0.1)", 
      "color(display-p3 0.9 0.1 0.9)", 
      "color(display-p3 0.1 0.9 0.9)", 
      "color(display-p3 0.7 0.4 0.1)", 
      "color(display-p3 0.5 0.5 0.5)"  
    ];
  
    let gameGrid = [];
    pairs.forEach((pair, index) => {
      pair.forEach(text => {
        gameGrid.push({ text, color: colors[index] });
      });
    });
  
    let firstCard = null;
    let secondCard = null;
    let matchedPairs = 0;
    let attempts = 0;
  
    const container = document.querySelector(".game-grid");
    const attemptsDisplay = document.querySelector("#attempts");
    const pairsDisplay = document.querySelector("#pairs");
  
    if (!container) return;
  
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  
    function isMatchingPair(text1, text2) {
      return pairs.some(pair => pair.includes(text1) && pair.includes(text2));
    }
  
    function initGame() {
      gameGrid = [];
      pairs.forEach((pair, index) => {
        pair.forEach(text => {
          gameGrid.push({ text, color: colors[index] });
        });
      });
  
      shuffle(gameGrid);
      container.innerHTML = "";
      gameGrid.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card", "p-3", "m-2", "text-center", "shadow", "bg-light");
        card.style.width = "clamp(60px, 10vw, 100px)";
        card.style.height = "clamp(60px, 10vw, 100px)";
        card.style.display = "flex";
        card.style.alignItems = "center";
        card.style.justifyContent = "center";
        card.style.fontWeight = "bold";
        card.style.cursor = "pointer";
        card.dataset.value = item.text;
        card.dataset.color = item.color;
        card.textContent = "?";
        container.appendChild(card);
      });
  
      matchedPairs = 0;
      attempts = 0;
      updateStats();
    }
  
    function updateStats() {
      attemptsDisplay.textContent = attempts;
      pairsDisplay.textContent = matchedPairs;
    }
  
    container.addEventListener("click", e => {
      if (!e.target.classList.contains("card") || e.target.classList.contains("matched")) return;
      if (firstCard && secondCard) return;
  
      e.target.textContent = e.target.dataset.value;
      e.target.style.color = e.target.dataset.color;
  
      if (!firstCard) {
        firstCard = e.target;
      } else if (!secondCard && e.target !== firstCard) {
        secondCard = e.target;
        attempts++;
  
        if (isMatchingPair(firstCard.dataset.value, secondCard.dataset.value)) {
          firstCard.classList.add("matched");
          secondCard.classList.add("matched");
          matchedPairs++;
          firstCard = null;
          secondCard = null;
          updateStats();
        } else {
          setTimeout(() => {
            firstCard.textContent = "?";
            secondCard.textContent = "?";
            firstCard.style.color = "";
            secondCard.style.color = "";
            firstCard = null;
            secondCard = null;
            updateStats();
          }, 800);
        }
      }
    });
  
    document.querySelector("#reset")?.addEventListener("click", initGame);
  
    initGame();
  });
})();