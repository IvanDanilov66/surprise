// Main Greeting Card - Full Page
let isCardFlipped = false;

// Initialize the main greeting card
function initMainGreetingCard() {
  const mainGreetingCard = document.getElementById("mainGreetingCard");

  // Reset state
  isCardFlipped = false;
  mainGreetingCard.classList.remove("flipped");

  // No need to add click event listener to the whole card anymore
}

// Handle main card click
function handleMainCardClick() {
  if (isCardFlipped) return;

  isCardFlipped = true;
  const mainGreetingCard = document.getElementById("mainGreetingCard");

  // Add click animation
  mainGreetingCard.style.transform = "scale(0.98)";
  setTimeout(() => {
    mainGreetingCard.style.transform = "scale(1)";
  }, 150);

  // Flip the card
  setTimeout(() => {
    mainGreetingCard.classList.add("flipped");

    // Create celebration effect
    setTimeout(() => {
      createCelebrationEffect();
    }, 500);
  }, 300);
}

// Create celebration effect
function createCelebrationEffect() {
  // Create confetti explosion
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.top = "-10px";
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.backgroundColor = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#f9ca24",
      "#f0932b",
      "#eb4d4b",
    ][Math.floor(Math.random() * 6)];
    confetti.style.borderRadius = "50%";
    confetti.style.pointerEvents = "none";
    confetti.style.zIndex = "9999";

    document.body.appendChild(confetti);

    // Animate confetti
    confetti.animate(
      [
        { transform: "translateY(0) rotate(0deg)", opacity: 1 },
        {
          transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 3000 + Math.random() * 2000,
        easing: "ease-out",
      }
    ).onfinish = () => {
      confetti.remove();
    };
  }
}

// Initialize everything when page loads
document.addEventListener("DOMContentLoaded", function () {
  initMainGreetingCard();
  addInteractiveEffects();
});

// Add interactive effects
function addInteractiveEffects() {
  // No hover effects needed anymore since only the instruction is clickable
}

// Add floating animation to baby icon
function addFloatingAnimation() {
  const babyIcon = document.querySelector(".baby-icon");
  if (babyIcon) {
    babyIcon.style.animation = "float 3s ease-in-out infinite";
  }
}

// Initialize floating animation
setTimeout(addFloatingAnimation, 1000);

// Add sound effects (optional - requires user interaction)
function playClickSound() {
  // Create a simple click sound using Web Audio API
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.1
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
}

// Add click sound to main greeting card (only after user interaction)
let soundEnabled = false;
document.addEventListener(
  "click",
  function () {
    if (!soundEnabled) {
      soundEnabled = true;
      // Enable sound effects for main greeting card
      const mainGreetingCard = document.getElementById("mainGreetingCard");
      mainGreetingCard.addEventListener("click", playClickSound);
    }
  },
  { once: true }
);
