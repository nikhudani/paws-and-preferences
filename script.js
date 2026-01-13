const container = document.getElementById("card-container");
const template = document.getElementById("card-template");
const summary = document.getElementById("summary");
const likeCount = document.getElementById("like-count");
const likedCatsDiv = document.getElementById("liked-cats");

const TOTAL_CATS = 10;
let index = 0;
let likedCats = [];

const cats = Array.from({ length: TOTAL_CATS }, () =>
  `https://cataas.com/cat?${Math.random()}`
);

function createCard(imageUrl) {
  const card = template.cloneNode(true);
  card.classList.remove("hidden");
  card.removeAttribute("id");
  card.style.backgroundImage = `url(${imageUrl})`;

  const likeLabel = card.querySelector(".like");
  const nopeLabel = card.querySelector(".nope");

  let startX = 0;
  let moveX = 0;

  card.addEventListener("pointerdown", e => {
    startX = e.clientX;
    card.setPointerCapture(e.pointerId);
  });

  card.addEventListener("pointermove", e => {
    if (!startX) return;

    moveX = e.clientX - startX;
    card.style.transform = `translateX(${moveX}px) rotate(${moveX / 15}deg)`;

    likeLabel.style.opacity = moveX > 0 ? Math.min(moveX / 100, 1) : 0;
    nopeLabel.style.opacity = moveX < 0 ? Math.min(-moveX / 100, 1) : 0;
  });

  card.addEventListener("pointerup", () => {
    if (moveX > 120) {
      likedCats.push(imageUrl);
      swipeOut(card, 1);
    } else if (moveX < -120) {
      swipeOut(card, -1);
    } else {
      resetCard(card, likeLabel, nopeLabel);
    }

    startX = 0;
  });

  return card;
}

function swipeOut(card, direction) {
  card.style.transform = `translateX(${direction * 500}px) rotate(${direction * 30}deg)`;
  setTimeout(showNext, 300);
}

function resetCard(card, likeLabel, nopeLabel) {
  card.style.transform = "";
  likeLabel.style.opacity = 0;
  nopeLabel.style.opacity = 0;
}

function showNext() {
  container.innerHTML = "";
  index++;

  if (index >= cats.length) {
    showSummary();
  } else {
    container.appendChild(createCard(cats[index]));
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
