// scripts/content.js

// Global flag for extension state
let extensionActive = false;
let observer;
let debounceTimeout;

// Listen for messages (e.g. toggle updates)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.hasOwnProperty("extensionActive")) {
    extensionActive = message.extensionActive;
    if (extensionActive) {
      startAdReplacement();
    } else {
      stopAdReplacement();
    }
  }
});

// On initial load, get stored toggle state
chrome.storage.local.get(["extensionActive"], function(result) {
  extensionActive = result.extensionActive || false;
  if (extensionActive) {
    startAdReplacement();
  }
});

// Inject custom CSS styles for replacement elements
function injectStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .adContent {
      background: #f5f5f5;
      border-radius: 8px;
      padding: 10px;
      margin: 5px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: all 0.5s ease;
    }
    .adContent:hover {
      transform: scale(1.02);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
  `;
  document.head.appendChild(style);
}

// Return a random positive message
function getCustomContent() {
  const content = [
    { type: "quote", content: '"The best way to predict the future is to create it." - Peter Drucker' },
    { type: "tip", content: "Take a 5-minute break to stretch and stay healthy!" },
    { type: "fact", content: "Did you know? Dolphins use whistles to identify each other!" }
  ];
  return content[Math.floor(Math.random() * content.length)];
}

// Replace ad elements with positive content
function replaceAds() {
  if (!extensionActive) return; // Only run if activated

  const adSelectors = [
    'div[id*="content"]', 'div[class*="content"]', 'ins.adsbygoogle', 'div[data-ad]',
    'div[aria-label*="advertisement"]', '.ad-container', '#ad-container',
    '[class*="sponsored"]', '[id*="sponsored"]'
  ];

  let adsReplaced = 0;
  adSelectors.forEach(selector => {
    try {
      const adElements = document.querySelectorAll(selector);
      adElements.forEach(adElement => {
        if (adElement && adElement.tagName !== 'BODY' && adElement.tagName !== 'HTML') {
          const width = adElement.offsetWidth || 300;
          const height = adElement.offsetHeight || 250;
          const replacementDiv = document.createElement('div');
          const customContent = getCustomContent();
          replacementDiv.className = 'adContent';
          replacementDiv.style.width = width + 'px';
          replacementDiv.style.height = height + 'px';
          replacementDiv.innerHTML = `<h3 style="margin:0 0 10px 0; color:#333;">${customContent.type.toUpperCase()}</h3>
            <p style="margin:0; color:#666;">${customContent.content}</p>`;
          adElement.parentNode.replaceChild(replacementDiv, adElement);
          adsReplaced++;
        }
      });
    } catch (error) {
      console.error('Error replacing ad for selector:', selector, error);
    }
  });

  // Update storage with total replaced ads count
  if (adsReplaced > 0) {
    chrome.storage.local.get(["adsReplaced"], function(data) {
      const totalAds = (data.adsReplaced || 0) + adsReplaced;
      chrome.storage.local.set({ adsReplaced: totalAds });
    });
  }
}

// Start the ad replacement process
function startAdReplacement() {
  injectStyles();
  replaceAds();
  observer = new MutationObserver(() => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(replaceAds, 1000);
  });
  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'id'] });
  window.addEventListener('load', replaceAds);
}

// Stop the ad replacement (disconnect observer)
function stopAdReplacement() {
  if (observer) {
    observer.disconnect();
  }
}
