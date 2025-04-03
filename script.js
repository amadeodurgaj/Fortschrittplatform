// DOM-Elemente
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const forgotPassword = document.getElementById('forgotPassword');
const ctaButton = document.querySelector('.cta-button');
const userMenu = document.querySelector('.user-menu');

// Hartcodierte Benutzer für den Login
const mockUsers = [
    { email: 'test@example.com', password: '123456', username: 'Max' },
    { email: 'admin@example.com', password: 'adminpass', username: 'Admin' }
];

// Event-Listener für Modals
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'flex';
});

registerBtn.addEventListener('click', () => {
    registerModal.style.display = 'flex';
});

ctaButton.addEventListener('click', () => {
    registerModal.style.display = 'flex';
});

closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
    });
});

// Klick außerhalb des Modals schließt das Modal
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (e.target === registerModal) {
        registerModal.style.display = 'none';
    }
});

// Formular-Handling
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Benutzer prüfen (Mock-Login)
    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (user) {
        alert(`Willkommen, ${user.username}!`);
        sessionStorage.setItem('loggedInUser', user.username);
        loginModal.style.display = 'none';
        updateUserDisplay(); // Benutzeranzeige aktualisieren nach erfolgreichem Login
    } else {
        alert('Ungültige E-Mail oder Passwort!');
    }
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('registerPasswordConfirm').value;

    // Passwort-Validierung
    if (password !== passwordConfirm) {
        alert('Die Passwörter stimmen nicht überein!');
        return;
    }

    // Mock-Registrierung: Benutzer zu mockUsers hinzufügen
    mockUsers.push({ username, email, password });

    // Benutzer wurde erfolgreich registriert (temporär, nur im RAM)
    alert('Registrierung erfolgreich! Diese Funktion wird später implementiert.');
    registerModal.style.display = 'none';
});

forgotPassword.addEventListener('click', (e) => {
    e.preventDefault();
    // Hier später die Passwort-Wiederherstellungslogik einbauen
    alert('Passwort-Wiederherstellung wird später implementiert.');
});

// Beispiel für eine Funktion zur Aufgabenerstellung (für spätere Implementierung)
function createTask(title, description, dueDate, priority) {
    return {
        id: Date.now(), // Einfache ID-Generierung
        title,
        description,
        dueDate,
        priority,
        completed: false,
        createdAt: new Date(),
        xpReward: calculateXpReward(priority)
    };
}

// Beispiel für eine Funktion zur XP-Berechnung
function calculateXpReward(priority) {
    const baseXp = 10;
    switch (priority) {
        case 'low':
            return baseXp;
        case 'medium':
            return baseXp * 2;
        case 'high':
            return baseXp * 3;
        default:
            return baseXp;
    }
}

// Beispiel für eine Funktion zum Abschließen einer Aufgabe
function completeTask(taskId, userXp) {
    // Aufgabe finden und als abgeschlossen markieren
    // XP dem Nutzer gutschreiben
    // Level-Berechnung durchführen

    // Beispielhafte Implementierung (später ersetzen)
    const task = { id: taskId, xpReward: 20 }; // Mock-Aufgabe
    const newXp = userXp + task.xpReward;
    const newLevel = calculateLevel(newXp);

    return {
        newXp,
        newLevel,
        xpGained: task.xpReward
    };
}

// Beispiel für eine Funktion zur Level-Berechnung
function calculateLevel(xp) {
    // Formel: Jedes Level benötigt level * 100 XP
    // z.B. Level 1: 0-99 XP, Level 2: 100-299 XP, usw.
    return Math.floor(Math.sqrt(xp / 100)) + 1;
}

// Beispiel für LocalStorage-Funktionen
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Benutzeranzeige im Header
const userDisplay = document.getElementById('userDisplay');
const userGreeting = document.getElementById('userGreeting');
const logoutBtn = document.getElementById('logoutBtn');

function updateUserDisplay() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
        // Benutzer ist eingeloggt
        userGreeting.textContent = `Eingeloggt als: ${loggedInUser}`;
        userDisplay.style.display = 'block';
        userMenu.style.display = 'none'; // Login- und Registrierungsbuttons ausblenden

        // Willkommensnachricht anzeigen
        const welcomeSection = document.getElementById('welcomeSection');
        const welcomeMessage = document.getElementById('welcomeMessage');
        welcomeMessage.textContent = `Willkommen zurück, ${loggedInUser}!`;
        welcomeSection.style.display = 'block';
    } else {
        // Benutzer ist nicht eingeloggt
        userDisplay.style.display = 'none';
        userMenu.style.display = 'flex'; // Login- und Registrierungsbuttons anzeigen

        // Willkommensnachricht ausblenden
        const welcomeSection = document.getElementById('welcomeSection');
        welcomeSection.style.display = 'none';
    }
}

logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('loggedInUser');
    updateUserDisplay();
    alert('Erfolgreich ausgeloggt.');
});

// Beim Laden der Seite Benutzeranzeige aktualisieren
updateUserDisplay();