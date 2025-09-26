// Initial vote counts
const votes = {
    Javascript: 0,
    Python: 0,
    Java: 0
};

// Function to handle voting
function vote(language) {
    votes[language]++;
    updateVotes();
}

// Function to update vote counts in UI
function updateVotes() {
    for (const language in votes) {
        const span = document.getElementById(`${language}-count`);
        if (span) {
            span.textContent = votes[language];
        }
    }
}

// Attach event listeners to buttons after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            vote(button.textContent);
        });
    });

    // Create and insert result spans
    const indexDiv = document.querySelector(".index");
    const resultDiv = document.createElement("div");
    resultDiv.id = "results";
    for (const language in votes) {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${language}:</strong> <span id="${language}-count">0</span> votes`;
        resultDiv.appendChild(p);
    }
    indexDiv.appendChild(resultDiv);

    // Simulate real-time votes every 2 seconds
    setInterval(() => {
        const langs = Object.keys(votes);
        const randomLang = langs[Math.floor(Math.random() * langs.length)];
        votes[randomLang]++;
        updateVotes();
    }, 2000);
});