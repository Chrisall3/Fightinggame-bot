const characterLibrary = [
    {
        name: "Beerus",
        game: "DBFZ",
        moves: [
            {
                name: "Multi-Orb Summon (214S)",
                threat: "Fills the screen with projectiles. Can be kicked to track your position.",
                counter: "Super Dash ignores raw orbs. If he kicks them, use Reflect (4S) to clear the space."
            },
            {
                name: "2H Anti-Air",
                threat: "Massive circular hitbox that is head-invincible.",
                counter: "Avoid air-dashing directly at him. Stay grounded or use a projectile to force a block."
            }
        ]
    },
    {
        name: "Ken",
        game: "Street Fighter 6",
        moves: [
            {
                name: "Jinrai Kick Follow-ups",
                threat: "A multi-hit guessing game between a low, overhead, and mid.",
                counter: "The Medium version has a gap. You can interrupt with a 4-frame Light Punch before the follow-up hits."
            },
            {
                name: "Heavy Dragonlash Kick",
                threat: "+1 on block, meaning it is Ken's turn if you block it.",
                counter: "Long startup (25 frames). React by using a standing Light Punch to knock him out of the air."
            }
        ]
    },
    {
        name: "Kazuya Mishima",
        game: "Tekken 8",
        moves: [
            {
                name: "Electric Wind God Fist (EWGF)",
                threat: "Fast, high-damage launcher that is plus on block.",
                counter: "High execution move. Most effective counter is Sidestep Left (SSL). If you block it, you are in minor disadvantage; don't press a slow button."
            },
            {
                name: "Hellsweep (cd4,1)",
                threat: "An unseeable low that leads to huge damage or a knockdown.",
                counter: "Extremely linear. Sidestep Left (SSL) or Sidewalk Left beats it. If you block it, it's highly punishable; launch him for full damage."
            }
        ]
    },
    {
        name: "JP",
        game: "Street Fighter 6",
        moves: [
            {
                name: "Departure (Portals)",
                threat: "Sets up teleports or overhead/low projectiles from a distance.",
                counter: "Use Drive Parry to handle the projectiles. If he teleports, he is vulnerable to a throw or a fast jab upon landing."
            },
            {
                name: "OD Amnesia (Counter)",
                threat: "A reversal that catches strikes and throws, dealing massive damage.",
                counter: "On JP's wakeup, 'Shimmy' (walk backward) or jump to bait the counter. If he whiffs it, he loses two drive bars and is wide open."
            }
        ]
    },
    {
        name: "Happy Chaos",
        game: "Guilty Gear Strive",
        moves: [
            {
                name: "Steady Aim (Shooting)",
                threat: "High-accuracy full-screen shots that can guard-crush indefinitely.",
                counter: "Watch his Concentration (Blue bar). When it's low, he must reload or focus. That is your window to dash in and apply pressure."
            },
            {
                name: "Deus Ex Machina (Overdrive)",
                threat: "Full-screen cinematic super that catches movement.",
                counter: "Cannot be used if his gun is away. If you see the flash, block immediately. It is minus on block if you are close enough to punish."
            }
        ]
    }
];

function renderGrid(data) {
    const grid = document.getElementById('charGrid');
    grid.innerHTML = '';
    data.forEach(char => {
        const card = document.createElement('div');
        card.className = 'char-card';
        card.innerHTML = `
            <h3>${char.name}</h3>
            <div class="game-badge">${char.game}</div>
        `;
        card.onclick = () => openStrategy(char);
        grid.appendChild(card);
    });
}

function openStrategy(char) {
    let html = `<h2 style="color:var(--accent)">${char.name} Lab</h2><p style="color:var(--text-dim); margin-bottom:25px;">${char.game}</p>`;
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
    document.body.style.overflow = 'hidden';
}

function closeStrategy() {
    document.getElementById('strategyOverlay').style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.getElementById('charSearch').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = characterLibrary.filter(c => 
        c.name.toLowerCase().includes(term) || c.game.toLowerCase().includes(term)
    );
    renderGrid(filtered);
});

renderGrid(characterLibrary);