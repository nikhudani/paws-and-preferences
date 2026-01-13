const container = document.getElementById("card-container");
const summary = document.getElementById("summary");
const likeCount = document.getElementById("like-count");
const likedCatsDiv = document.getElementById("liked-cats");

const TOTAL_CATS = 10;
let currentIndex = 0;
let likedCats = [];

const cats = Array.from({ length: TOTAL_CATS }, () =>
  `https://cataas.com/cat?${Math.random()}`
);

function createCard(imageUrl) {
  const card = document.createElement("div");
  card.className = "card";
  card.style.backgroundImage = `url(${imageUrl})`;

  let startX = 0;
  let currentX = 0;

  card.addEventListener("pointerdown", e => {
    startX = e.clientX;
    card.setPointerCapture(e.pointerId);
  });

  card.addEventListener("pointermove", e => {
    if (!startX) return;
    currentX = e.clientX - startX;
    card.style.transform = `translateX(${currentX}px) rotate(${currentX / 10}deg)`;
  });

  card.addEventListener("pointerup", () => {
    if (currentX > 100) likeCard(imageUrl);
    else if (currentX < -100) dislikeCard();
    else card.style.transform = "";
    startX = 0;
  });

  return card;
}

function likeCard(imageUrl) {
  likedCats.push(imageUrl);
  nextCard();
}

function dislikeCard() {
  nextCard();
}

function nextCard() {
  container.innerHTML = "";
  currentIndex++;

  if (currentIndex >= cats.length) {
    showSummary();
  } else {
    container.appendChild(createCard(cats[currentIndex]));
  }
}

function showSummary() {
  summary.classList.remove("hidden");
  likeCount.textContent = likedCats.length;

  likedCats.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    likedCatsDiv.appendChild(img);
  });
}

container.appendChild(createCard(cats[0]));
