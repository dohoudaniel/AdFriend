// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');
const refreshQuoteBtn = document.getElementById('refreshQuote');
const timer = document.getElementById('timer');
const startTimerBtn = document.getElementById('startTimer');
const resetTimerBtn = document.getElementById('resetTimer');
const goalInput = document.getElementById('goalInput');
const saveGoalBtn = document.getElementById('saveGoal');
const currentGoal = document.getElementById('currentGoal');
const layoutSelect = document.getElementById('layoutSelect');
const greeting = document.getElementById('greeting');
const newChallengeBtn = document.getElementById('newChallenge');
const dailyChallenge = document.getElementById('dailyChallenge');
const saveChangesBtn = document.getElementById('saveChanges');
const resetDefaultsBtn = document.getElementById('resetDefaults');

// State
let timerInterval;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isTimerRunning = false;

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', document.body.dataset.theme);
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('.material-icons');
    icon.textContent = document.body.dataset.theme === 'dark' ? 'light_mode' : 'dark_mode';
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.dataset.theme = savedTheme;
    updateThemeIcon();
}

// Quotes
const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" }
];

async function fetchQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        quoteText.textContent = data.content;
        quoteAuthor.textContent = `— ${data.author}`;
    } catch (error) {
        // Fallback to local quotes if API fails
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteText.textContent = randomQuote.text;
        quoteAuthor.textContent = `— ${randomQuote.author}`;
    }
}

refreshQuoteBtn.addEventListener('click', fetchQuote);

// Timer
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateTimer() {
    timer.textContent = formatTime(timeLeft);
}

function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        startTimerBtn.textContent = 'Pause';
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimer();
            if (timeLeft === 0) {
                clearInterval(timerInterval);
                isTimerRunning = false;
                startTimerBtn.textContent = 'Start';
                // Play notification sound or show notification
                new Notification('Pomodoro Timer', {
                    body: 'Time to take a break!',
                    icon: '/icon.png'
                });
            }
        }, 1000);
    } else {
        clearInterval(timerInterval);
        isTimerRunning = false;
        startTimerBtn.textContent = 'Start';
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    timeLeft = 25 * 60;
    updateTimer();
    startTimerBtn.textContent = 'Start';
}

startTimerBtn.addEventListener('click', startTimer);
resetTimerBtn.addEventListener('click', resetTimer);

// Daily Goal
function saveGoal() {
    const goal = goalInput.value.trim();
    if (goal) {
        currentGoal.textContent = goal;
        localStorage.setItem('dailyGoal', goal);
        goalInput.value = '';
    }
}

saveGoalBtn.addEventListener('click', saveGoal);

// Load saved goal
const savedGoal = localStorage.getItem('dailyGoal');
if (savedGoal) {
    currentGoal.textContent = savedGoal;
}

// Layout
layoutSelect.addEventListener('change', (e) => {
    const widgetPreview = document.getElementById('widgetPreview');
    widgetPreview.className = `widget-preview layout-${e.target.value}`;
    localStorage.setItem('layout', e.target.value);
});

// Load saved layout
const savedLayout = localStorage.getItem('layout');
if (savedLayout) {
    layoutSelect.value = savedLayout;
    document.getElementById('widgetPreview').className = `widget-preview layout-${savedLayout}`;
}

// Time-based greeting
function updateGreeting() {
    const hour = new Date().getHours();
    let greetingText = 'Good evening';
    if (hour < 12) greetingText = 'Good morning';
    else if (hour < 18) greetingText = 'Good afternoon';
    greeting.textContent = greetingText;
}

// Daily Challenges
const challenges = [
    "Complete 10 minutes of mindful breathing",
    "Take a 5-minute walk",
    "Drink 8 glasses of water today",
    "Do 20 desk stretches",
    "Write down 3 things you're grateful for",
    "Take regular breaks using the Pomodoro technique",
    "Practice good posture for the entire day",
    "Reach out to a friend or colleague",
    "Learn something new for 15 minutes",
    "Organize your workspace"
];

function getNewChallenge() {
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    dailyChallenge.textContent = randomChallenge;
    localStorage.setItem('currentChallenge', randomChallenge);
}

newChallengeBtn.addEventListener('click', getNewChallenge);

// Load saved challenge
const savedChallenge = localStorage.getItem('currentChallenge');
if (savedChallenge) {
    dailyChallenge.textContent = savedChallenge;
}

// Save & Reset
saveChangesBtn.addEventListener('click', () => {
    // Save all current settings
    const settings = {
        theme: document.body.dataset.theme,
        layout: layoutSelect.value,
        goal: currentGoal.textContent,
        challenge: dailyChallenge.textContent
    };
    localStorage.setItem('adFriendSettings', JSON.stringify(settings));
    
    // Show success message
    const toast = document.createElement('div');
    toast.className = 'toast fade-in';
    toast.textContent = 'Settings saved successfully!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
});

resetDefaultsBtn.addEventListener('click', () => {
    // Clear all settings
    localStorage.clear();
    
    // Reset to defaults
    document.body.dataset.theme = 'light';
    layoutSelect.value = 'grid';
    currentGoal.textContent = 'No goal set yet';
    dailyChallenge.textContent = challenges[0];
    updateThemeIcon();
    
    // Show reset message
    const toast = document.createElement('div');
    toast.className = 'toast fade-in';
    toast.textContent = 'Settings reset to defaults!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateGreeting();
    fetchQuote();
    updateTimer();
    
    // Update greeting every minute
    setInterval(updateGreeting, 60000);
    
    // Request notification permission
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
});