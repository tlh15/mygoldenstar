let currentKid = null;
const kids = JSON.parse(localStorage.getItem("kids")) || {};

document.addEventListener("DOMContentLoaded", function() {
    if (Object.keys(kids).length > 0) {
        loadKids();
    } else {
        goToPage('kidListPage');
    }
});

function addKid() {
    currentKid = null;
    goToPage('namePage');
}

function selectKid(kidName) {
    currentKid = kidName;
    if (kids[currentKid] && kids[currentKid].stars.length > 0) {
        initializeMainPage();
        goToPage('mainPage');
    } else {
        goToPage('starsPage');
    }
}

function goToPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'flex';
}

function setupStarsPage() {
    if (!document.getElementById("nameInput").value.trim()) {
        alert("Please enter a name.");
        return;
    }
    currentKid = document.getElementById("nameInput").value.trim();
    goToPage('starsPage');
}

function setupMainPage() {
    const numStars = parseInt(document.getElementById("numStars").value, 10);
    const reward = document.getElementById("reward").value.trim();
    if (!numStars || numStars <= 0) {
        alert("Please enter a valid number of stars.");
        return;
    }
    if (!reward) {
        alert("Please enter a reward.");
        return;
    }
    kids[currentKid] = { numStars, reward, stars: Array(numStars).fill(false) };
    saveKids();
    initializeMainPage();
    goToPage('mainPage');
}

function initializeMainPage() {
    const kidData = kids[currentKid];
    const mainStarsContainer = document.getElementById("mainStars");
    document.getElementById("displayName").innerText = `Name: ${currentKid}`;
    mainStarsContainer.innerHTML = '';
    for (let i = 0; i < kidData.numStars; i++) {
        const star = document.createElement("img");
        star.classList.add("star");
        star.src = kidData.stars[i] ? "star_yellow.png" : "star_grey.png";
        star.addEventListener("click", () => toggleStar(i));
        mainStarsContainer.appendChild(star);
    }
    checkAllStars();
}

function toggleStar(index) {
    const kidData = kids[currentKid];
    kidData.stars[index] = !kidData.stars[index];
    saveKids();
    initializeMainPage();
}

function checkAllStars() {
    const kidData = kids[currentKid];
    const allYellow = kidData.stars.every(status => status);
    const rewardMessage = document.getElementById("rewardMessage");
    rewardMessage.style.display = allYellow ? 'block' : 'none';
    rewardMessage.innerText = allYellow ? `Congratulations! You've earned: ${kidData.reward}` : '';
}

function saveKids() {
    localStorage.setItem("kids", JSON.stringify(kids));
}

function loadKids() {
    const kidList = document.getElementById("kidList");
    kidList.innerHTML = '';
    Object.keys(kids).forEach(kidName => {
        const li = document.createElement('li');
        li.innerText = kidName;
        li.addEventListener("click", () => selectKid(kidName));
        kidList.appendChild(li);
    });
}
