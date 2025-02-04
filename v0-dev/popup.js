
        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

        function setTheme(isDark) {
            document.body.classList.toggle('dark', isDark);
        }

        // Initialize theme
        setTheme(prefersDark.matches);

        // Theme toggle button
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
        });

        // System theme change
        prefersDark.addEventListener('change', (e) => {
            setTheme(e.matches);
        });

        // Pomodoro Timer
        let timerInterval;
        let timeLeft = 25 * 60; // 25 minutes in seconds
        const timerDisplay = document.getElementById('timer');
        const startButton = document.getElementById('startTimer');
        const resetButton = document.getElementById('resetTimer');

        function updateTimer() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        startButton.addEventListener('click', () => {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
                startButton.textContent = 'Start';
            } else {
                timerInterval = setInterval(() => {
                    timeLeft--;
                    updateTimer();
                    if (timeLeft === 0) {
                        clearInterval(timerInterval);
                        timerInterval = null;
                        startButton.textContent = 'Start';
                        // Notification when timer ends
                        if ('Notification' in window) {
                            Notification.requestPermission().then(permission => {
                                if (permission === 'granted') {
                                    new Notification('Pomodoro Timer', {
                                        body: 'Time to take a break!',
                                    });
                                }
                            });
                        }
                    }
                }, 1000);
                startButton.textContent = 'Pause';
            }
        });

        resetButton.addEventListener('click', () => {
            clearInterval(timerInterval);
            timerInterval = null;
            timeLeft = 25 * 60;
            updateTimer();
            startButton.textContent = 'Start';
        });

        // Fetch and update quote
        async function updateQuote() {
            try {
                const response = await fetch('https://api.quotable.io/random');
                const data = await response.json();
                document.getElementById('quote').textContent = `"${data.content}"`;
                document.getElementById('author').textContent = `- ${data.author}`;
            } catch (error) {
                console.error('Error fetching quote:', error);
            }
        }

        // Update quote every 30 minutes
        updateQuote();
        setInterval(updateQuote, 30 * 60 * 1000);

        // Save goal to storage
        const goalInput = document.querySelector('.goal-input');
        goalInput.addEventListener('input', (e) => {
            chrome.storage.sync.set({ dailyGoal: e.target.value });
        });

        // Load saved goal
        chrome.storage.sync.get(['dailyGoal'], (result) => {
            if (result.dailyGoal) {
                goalInput.value = result.dailyGoal;
            }
        });
