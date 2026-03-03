// 1. PROJECT CREDENTIALS
// Find your Project URL in: Settings -> API -> Project URL
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co'; 
const SUPABASE_KEY = 'sb_publishable_ctE74i6vEzCys2K7bTvttA_6iZ9XD3Y';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. COUNTERPLAY DATA
const characters = [
    { id: 1, name: "Beerus", game: "DBFZ", strategy: "Super Dash ignores orbs. Punish orb-kick startup with fast assists." },
    { id: 2, name: "Ken", game: "SF6", strategy: "Medium Jinrai has a 6-frame gap. Jab out of the follow-up." },
    { id: 3, name: "Sol Badguy", game: "GGST", strategy: "6P beats Fafnir. Respect the DP on wake-up." }
];

// 3. AUTHENTICATION LOGIC (Sign In / Sign Up)
async function handleSignUp() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passInput').value;
    const status = document.getElementById('statusMsg');

    const { data, error } = await supabaseClient.auth.signUp({ email, password });

    if (error) {
        status.innerText = error.message;
        status.style.color = "#ff3c3c";
    } else {
        status.innerText = "Check email to confirm your account!";
        status.style.color = "#00f2ff";
    }
}

async function handleSignIn() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passInput').value;
    const status = document.getElementById('statusMsg');

    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) {
        status.innerText = error.message;
        status.style.color = "#ff3c3c";
    } else {
        closeAllModals();
        checkUser();
    }
}

async function checkUser() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    const triggerBtn = document.getElementById('authTriggerBtn');
    const userLabel = document.getElementById('userEmail');

    if (user) {
        triggerBtn.innerText = "Log Out";
        triggerBtn.onclick = handleSignOut;
        userLabel.innerText = user.email;
    }
}

async function handleSignOut() {
    await supabaseClient.auth.signOut();
    window.location.reload();
}

// 4. UI ENGINE logic
function renderGrid(list) {
    const grid = document.getElementById('charGrid');
    grid.innerHTML = '';
    list.forEach(char => {
        const card = document.createElement('div');
        card.className = 'char-card';
        card.innerHTML = `<h3>${char.name}</h3><p style="color:#666">${char.game}</p>`;
        card.onclick = () => openStrategy(char);
        grid.appendChild(card);
    });
}

function openStrategy(char) {
    document.getElementById('strategyContent').innerHTML = `
        <h2 style="color:#ff3c3c">${char.name} Counterplay</h2>
        <p style="line-height:1.6; font-size:1.1rem;">${char.strategy}</p>
    `;
    document.getElementById('strategyModal').style.display = 'block';
}

function openAuth() { document.getElementById('authModal').style.display = 'block'; }
function closeAllModals() { 
    document.getElementById('authModal').style.display = 'none'; 
    document.getElementById('strategyModal').style.display = 'none'; 
}

// 5. SEARCH ENGINE
document.getElementById('charSearch').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = characters.filter(c => c.name.toLowerCase().includes(term));
    renderGrid(filtered);
});

// INITIALIZE
renderGrid(characters);
checkUser();
