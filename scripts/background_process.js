// background_process.js
chrome.runtime.onInstalled.addListener(() => {
    console.log('AdFriend extension installed');
});

// Optional: Handle tab updates to catch dynamic page loads
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: () => {
                // Trigger a refresh of ad replacement
                window.dispatchEvent(new Event('load'));
            }
        }).catch(err => console.error('Script injection error:', err));
    }
});
