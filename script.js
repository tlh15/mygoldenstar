let currentKid = null;
let kids = JSON.parse(localStorage.getItem("kids")) || {};

document.addEventListener("DOMContentLoaded", function() {
    if (Object.keys(kids).length > 0) {
        loadKids();
        goToPage('kidListPage');
    } else {
        goToPage('welcomePage');
        animateWelcomeStar();
    }
});

function goToPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'flex';
}

function addKid() {
    currentKid = null;
    goToPage('namePage');
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
    let affiliateLink = document.getElementById("affiliateLink").value.trim();

    kids[currentKid] = {
        numStars,
        reward,
        stars: Array(numStars).fill(false),
        rewards: [] // Assuming rewards are an array of strings
    };
    saveKids();
    initializeMainPage();
    goToPage('mainPage');
}

function initializeMainPage() {
    const kidData = kids[currentKid];
    document.getElementById("displayName").innerText = currentKid;
    const mainStarsContainer = document.getElementById("mainStars");
    mainStarsContainer.innerHTML = '';

    for (let i = 0; i < kidData.numStars; i++) {
        const star = document.createElement("img");
        star.classList.add("star");
        star.src = kidData.stars[i] ? "star_yellow.png" : "star_grey.png";
        star.alt = "Star";  // Accessibility improvement
        star.addEventListener("click", () => toggleStar(i));
        mainStarsContainer.appendChild(star);
    }
}

function toggleStar(index) {
    const kidData = kids[currentKid];
    kidData.stars[index] = !kidData.stars[index];
    saveKids();
    initializeMainPage();
}

function loadKids() {
    const kidList = document.getElementById("kidList");
    kidList.innerHTML = '';
    Object.keys(kids).forEach(kidName => {
        const li = document.createElement('li');
        li.textContent = kidName;
        li.addEventListener("click", () => selectKid(kidName));
        kidList.appendChild(li);
    });
}

function selectKid(kidName) {
    currentKid = kidName;
    if (kids[currentKid] && kids[currentKid].stars.length > 0) {
        initializeMainPage();
        goToPage('mainPage');
    } else {
        goToPage('starsPage'); // Redirect to setup if data incomplete
    }
}

function saveKids() {
    localStorage.setItem("kids", JSON.stringify(kids));
}

function loadRewards() {
    const rewardsList = document.getElementById("rewardsList");
    rewardsList.innerHTML = '';
    Object.keys(kids).forEach(kidName => {
        const kidData = kids[kidName];
        const li = document.createElement('li');
        li.textContent = `${kidName}: `;

        // Create a list of rewards for each kid
        const rewardsUl = document.createElement('ul');
        kidData.rewards.forEach(reward => {
            const rewardLi = document.createElement('li');
            rewardLi.textContent = reward;
            rewardsUl.appendChild(rewardLi);
        });

        li.appendChild(rewardsUl);
        rewardsList.appendChild(li);
    });
}

function animateWelcomeStar() {
    const star = document.getElementById('welcomeStar');
    setTimeout(() => {
        star.src = 'star_yellow.png';
    }, 1000); // Adjust timing to match when the star is mid-air
}
function addReward() {
    const description = document.getElementById('descriptionInput').value;
    const link = document.getElementById('linkInput').value;

    if (!description || !link) {
        alert('Please fill in both fields.');
        return;
    }

    const rewardsContainer = document.getElementById('rewardsContainer');
    const tile = document.createElement('div');
    tile.className = 'reward-tile';
    tile.innerHTML = `
        <img src="${link}" alt="${description}">
        <p>${description}</p>
    `;
    rewardsContainer.appendChild(tile);

    // Optionally clear inputs after adding
    document.getElementById('descriptionInput').value = '';
    document.getElementById('linkInput').value = '';
}

document.addEventListener('DOMContentLoaded', function() {
    goToPage('welcomePage');
    animateWelcomeStar();
});
