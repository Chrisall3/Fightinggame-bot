// 1. CHARACTER DATABASE
// Detailed descriptions covering Threat and Counter for adept players.
const characterLibrary = [
    {
        name: "Beerus",
        game: "Dragon Ball FighterZ",
        moves: [
            {
                name: "Multi-Orb Summon (214S)",
                threat: "Beerus fills the screen with orbs. If you touch them, you take damage and hitstun. He uses these to hide his approach or trap you in the corner.",
                counter: "Super Dash ignores raw orbs entirely. If Beerus tries to kick an orb at you, use Reflect (4S) to clear the projectile and reset to neutral."
            },
            {
                name: "God of Destruction's Judgment (Level 3)",
                threat: "A command grab super that can be used to punish you for blocking too much on your own wakeup.",
                counter: "This is a grab, not a strike. You cannot block it. React by jumping or backdashing the moment the cinematic flash occurs."
            }
        ]
    },
    {
        name: "Ken",
        game: "Street Fighter 6",
        moves: [
            {
                name: "Jinrai Kick Follow-ups",
                threat: "The 'Mental Stack' move. Ken can end the kick with a low, a high overhead, or a safe-on-block mid.",
                counter: "The Medium Jinrai version has a gap. You can interrupt with a 4-frame Light Punch (Jab) before the overhead follow-up hits you."
            },
            {
                name: "Heavy Dragonlash Kick",
                threat: "Ken flies through the air and hits you. On block, he is +1, meaning it is still his turn to attack.",
                counter: "It is slow (25 frames). React by using a standing Light Punch to knock him out of the air before he lands."
            }
        ]
    },
    {
        name: "Sol Badguy",
        game: "Guilty Gear Strive",
        moves: [
            {
                name: "Fafnir",
                threat: "A massive flaming punch that causes Guard Crush and is plus on block.",
                counter: "Sol is vulnerable to '6P' (Forward + Punch) during the lunge. Use the upper-body invincibility of your 6P to counter-hit him."
            },
            {
                name: "Nightmare Wheel",
                threat: "An invincible reversal (DP) Sol uses to beat your pressure when he is waking up.",
                counter: "Don't press buttons on his wakeup if he has meter. Do a 'Safe Jump' or just block. If he whiffs, you get a massive Counter-Hit punish."
            }
        ]
    }
];

// 2. RENDERING ENGINE
function renderGrid(data) {
    const grid = document.getElementById('charGrid');
    grid.innerHTML = '';
    
    data.forEach(char => {
        const card = document.createElement('div');
        card.className = 'char-card';
        card.innerHTML = `
            <h3>${char.name}</h3>
            <p style="color:var(--text-dim); font-size:0.85rem;">${char.game}</p>
        `;
        card.onclick = () => openStrategy(char);
        grid.appendChild(card);
    });
}

// 3. DETAIL MODAL LOGIC
function openStrategy(char) {
    let html = `
        <h2 style="color:var(--accent); margin-bottom:5px;">${char.name} Lab</h2>
        <p style="color:var(--text-dim); margin-bottom:30px;">${char.game}</p>
    `;
    
    char.moves.forEach(m => {
        html += `
            <div class="move-block">
                <div class="move-name">${m.name}</div>
                <div class="move-threat"><strong>THE THREAT:</strong> ${m.threat}</div>
                <div class="move-counter"><strong>THE COUNTER:</strong> ${m.counter}</div>
            </div>
        `;
    });

    document.getElementById('strategyBody').innerHTML = html;
    document.getElementById('strategyOverlay').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Stop scrolling background
}

function closeStrategy() {
    document.getElementById('strategyOverlay').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 4. SEARCH LOGIC
document.getElementById('charSearch').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = characterLibrary.filter(c => 
        c.name.toLowerCase().includes(term) || 
        c.game.toLowerCase().includes(term)
    );
    renderGrid(filtered);
});

// INITIALIZE
renderGrid(characterLibrary);