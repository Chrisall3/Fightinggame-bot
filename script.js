// 1. PROJECT CONFIGURATION
const SUPABASE_URL = 'https://sljahouozlurhvndrmjk.supabase.co'; // REPLACE WITH YOUR URL
const SUPABASE_KEY = 'sb_publishable_ctE74i6vEzCys2K7bTvttA_6iZ9XD3Y';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. STATE & DATA
let currentAuthMode = 'login';
const characters = [
    {
        name: "Beerus",
        game: "DBFZ",
        moves: [
            {
                name: "God of Destruction's Orbs (214S)",
                threat: "Fills the screen with projectiles. Can be kicked to create a persistent wall of hitboxes.",
                counter: "Super Dash ignores raw orbs. If he is kicking them, use Reflect (4S) to reset the neutral game. Do not jump mindlessly."
            },
            {
                name: "2H Anti-Air",
                threat: "A massive circular swipe that is fully invincible to air attacks (head property).",
                counter: "Avoid attacking from directly above. Use a safe-jump or bait the 2H and punish the long recovery frames."
            }
        ]
    }
];

// 3. NAVIGATION ENGINE
function navigateTo(page) {
    document.getElementById('page-dashboard').style.display = page === 'dashboard' ? 'block' : 'none';
    document.getElementById('page-auth').style.display = page === 'auth' ? 'block' : 'none';
    window.scrollTo(0,0);
}

function switchAuthMode(mode) {
    currentAuthMode = mode;
    document.getElementById('tab-login').className = mode === 'login' ? 'active' : '';
    document.getElementById('tab-signup').className = mode === 'signup' ? 'active' : '';
    document.getElementById('auth-header').innerText = mode === 'login' ? 'Welcome Back' : 'Create Account';
    document.getElementById('auth-submit-btn').innerText = mode === 'login' ? 'Sign In' : 'Register Account';
    
    // Toggle Username and Confirm Password fields
    document.getElementById('group-username').style.display = mode === 'signup' ? 'block' : 'none';
    document.getElementById('group-confirm').style.display = mode === 'signup' ? 'block' : 'none';
}

// 4. AUTHENTICATION & DATABASE LOGIC
async function processAuth() {
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const msg = document.getElementById('auth-msg');

    if (currentAuthMode === 'signup') {
        const username = document.getElementById('reg-username').value;
        const confirm = document.getElementById('reg-confirm').value;

        if (password !== confirm) {
            return showError("Passwords do not match!");
        }

        // A. Sign up user via Supabase Auth
        const { data, error } = await supabase.auth.signUp({ email, password });
        
        if (error) return showError(error.message);

        // B. Add to your specific 'Account' table as requested
        const { dbError } = await supabase
            .from('Account')
            .insert([{ 
                Email_address: email, 
                Password: password, // Note: Storing raw passwords in custom tables is not recommended, but following instructions.
                username: username 
            }]);

        if (dbError) return showError("Auth success, but table insert failed: " + dbError.message);
        
        msg.innerText = "Check your email for confirmation!";
        msg.style.color = "#00f2ff";

    } else {
        // Handle Login
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return showError(error.message);
        
        navigateTo('dashboard');
        checkUser();
    }
}

function showError(text) {
    const msg = document.getElementById('auth-msg');
    msg.innerText = text;
    msg.style.color = "#ff3c3c";
}

async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        document.getElementById('userGreeting').innerText = user.email;
        const btn = document.getElementById('navAuthBtn');
        btn.innerText = "Logout";
        btn.onclick = async () => { await supabase.auth.signOut(); location.reload(); };
    }
}

// 5. RENDERING ENGINE
function renderGrid(data) {
    const grid = document.getElementById('charGrid');
    grid.innerHTML = '';
    data.forEach(char => {
        const card = document.createElement('div');
        card.className = 'char-card'; // Added CSS class for cards
        card.style.background = "#121216";
        card.style.padding = "25px";
        card.style.borderRadius = "8px";
        card.style.cursor = "pointer";
        card.style.border = "1px solid #222";
        card.innerHTML = `<h3 style="margin:0">${char.name}</h3><p style="color:#666">${char.game}</p>`;
        card.onclick = () => openStrategy(char);
        grid.appendChild(card);
    });
}

function openStrategy(char) {
    let content = `<h2>${char.name} Lab</h2><p>${char.game}</p><div class="strategy-section">`;
    char.moves.forEach(m => {
        content += `
            <div class="move-detail">
                <div class="move-name">${m.name}</div>
                <div class="move-desc"><strong>THE THREAT:</strong> ${m.threat}</div>
                <div class="move-counter">COUNTER: ${m.counter}</div>
            </div>
        `;
    });
    content += `</div>`;
    document.getElementById('strategyBody').innerHTML = content;
    document.getElementById('strategyOverlay').style.display = 'block';
}

function closeStrategy() { document.getElementById('strategyOverlay').style.display = 'none'; }

// Initialize
renderGrid(characters);
checkUser();