// Database of Counterplay
const characters = [
    {
        id: "beerus",
        name: "Beerus",
        game: "DBFZ",
        strategies: [
            { move: "Multi-Orb Summon", counter: "Super Dash immediately. Orbs have high startup and Super Dash ignores them." },
            { move: "2H Anti-Air", counter: "Wait and bait. His 2H has a massive hitbox but long recovery. Empty jump to force the whiff." }
        ]
    },
    {
        id: "sol-badguy",
        name: "Sol Badguy",
        game: "Guilty Gear",
        strategies: [
            { move: "Nightmare Wheel", counter: "This is a DP (invincible on startup). Block and punish heavily on landing." },
            { move: "Gunflame", counter: "Instant air dash over it for a full combo punish." }
        ]
    },
    {
        id: "ken",
        name: "Ken Masters",
        game: "Street Fighter 6",
        strategies: [
            { move: "Jinrai Kick", counter: "The overhead follow-up has a gap. You can interrupt with a 4-frame light attack." }
        ]
    }
];

const grid = document.getElementById('characterGrid');
const searchInput = document.getElementById('charSearch');
const modal = document.getElementById('counterModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close-btn');

// Initialize Grid
function renderGrid(data) {
    grid.innerHTML = '';
    data.forEach(char => {
        const card = document.createElement('div');
        card.className = 'char-card';
        card.innerHTML = `<h3>${char.name}</h3><p style="color: #888">${char.game}</p>`;
        card.onclick = () => showCounterplay(char);
        grid.appendChild(card);
    });
}

// Show Counterplay in Modal
function showCounterplay(char) {
    let content = `<h2>How to Beat ${char.name}</h2><br>`;
    char.strategies.forEach(s => {
        content += `
            <div class="strategy-item">
                <h3>The Problem: ${s.move}</h3>
                <p>${s.counter}</p>
            </div>
        `;
    });
    modalBody.innerHTML = content;
    modal.style.display = "block";
}

// Search Logic (Frontend Filter)
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = characters.filter(c => 
        c.name.toLowerCase().includes(term) || c.game.toLowerCase().includes(term)
    );
    renderGrid(filtered);
});

// Close Modal
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; }

// Initial Load
renderGrid(characters);
