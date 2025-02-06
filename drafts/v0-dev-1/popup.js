document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('.material-icons');
        icon.textContent = body.classList.contains('dark-theme') ? 'light_mode' : 'dark_mode';
    });

    // Pomodoro Timer
    let timerInterval;
    let timeLeft = 25 * 60; // 25 minutes in seconds
    const timerDisplay = document.querySelector('.timer-display');
    const startBtn = document.querySelector('.timer-btn.start');
    const pauseBtn = document.querySelector('.timer-btn.pause');
    const resetBtn = document.querySelector('.timer-btn.reset');

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    startBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                // Could add notification here
            }
        }, 1000);
    });

    pauseBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
    });

    resetBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        timeLeft = 25 * 60;
        updateTimerDisplay();
    });

    // Daily Goal
    const dailyGoal = document.getElementById('dailyGoal');
    const saveGoalBtn = document.querySelector('.save-goal');

    saveGoalBtn.addEventListener('click', () => {
        if (dailyGoal.value.trim()) {
            // Save goal to storage
            chrome.storage.sync.set({ 'dailyGoal': dailyGoal.value }, function() {
                // Show success feedback
                saveGoalBtn.querySelector('.material-icons').textContent = 'done';
                setTimeout(() => {
                    saveGoalBtn.querySelector('.material-icons').textContent = 'check';
                }, 2000);
            });
        }
    });

    // Load saved goal
    chrome.storage.sync.get(['dailyGoal'], function(result) {
        if (result.dailyGoal) {
            dailyGoal.value = result.dailyGoal;
        }
    });

    // Quote Refresh
    const quoteText = document.getElementById('quote');
    const refreshQuoteBtn = document.querySelector('.refresh-quote');

    async function fetchQuote() {
        try {
            const response = await fetch('https://api.quotable.io/random');
            const data = await response.json();
            quoteText.textContent = `"${data.content}"`;
        } catch (error) {
            console.error('Error fetching quote:', error);
        }
    }

    refreshQuoteBtn.addEventListener('click', fetchQuote);

    // Initial quote fetch
    fetchQuote();

    // Challenge completion
    const completeChallenge = document.querySelector('.complete-challenge');
    
    completeChallenge.addEventListener('click', () => {
        completeChallenge.classList.toggle('completed');
        const icon = completeChallenge.querySelector('.material-icons');
        if (completeChallenge.classList.contains('completed')) {
            icon.textContent = 'done_all';
            completeChallenge.style.opacity = '0.7';
        } else {
            icon.textContent = 'task_alt';
            completeChallenge.style.opacity = '1';
        }
    });
});