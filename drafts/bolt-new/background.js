// Background service worker for AdFriend

// Handle installation
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
      // Set default settings
      chrome.storage.sync.set({
        theme: 'light',
        layout: 'grid',
        reminderIntervals: {
          water: 30,
          stretch: 45,
          posture: 20
        },
        notifications: true
      });
    }
  });
  
  // Handle messages from content script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'AD_REPLACED') {
      // Log ad replacement for insights
      updateInsights(message.data);
    }
  });
  
  // Handle alarms for reminders
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name.startsWith('reminder_')) {
      const reminderType = alarm.name.split('_')[1];
      showReminder(reminderType);
    }
  });
  
  async function updateInsights(data) {
    try {
      const insights = await chrome.storage.local.get('insights') || {};
      const today = new Date().toISOString().split('T')[0];
      
      if (!insights[today]) {
        insights[today] = {
          adsReplaced: 0,
          sitesVisited: new Set(),
          interactionsCount: 0
        };
      }
      
      insights[today].adsReplaced++;
      insights[today].sitesVisited.add(new URL(data.url).hostname);
      
      await chrome.storage.local.set({ insights });
    } catch (error) {
      console.error('Error updating insights:', error);
    }
  }
  
  function showReminder(type) {
    const messages = {
      water: 'Time to drink some water! 💧',
      stretch: 'Take a moment to stretch! 🧘‍♂️',
      posture: 'Check your posture! 🪑'
    };
  
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'logo.png',
      title: 'AdFriend Reminder',
      message: messages[type] || 'Time for a break!',
      priority: 1
    });
  }
  
  // Set up periodic alarms for reminders
  async function setupReminders() {
    const settings = await chrome.storage.sync.get('reminderIntervals');
    
    Object.entries(settings.reminderIntervals).forEach(([type, interval]) => {
      chrome.alarms.create(`reminder_${type}`, {
        periodInMinutes: interval
      });
    });
  }
  
  setupReminders();