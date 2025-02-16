// scripts/content.js

// Global flag indicating if ad replacement is active.
let extensionActive = false;
let observer;
let debounceTimeout;

// Listen for messages from the popup to toggle ad replacement.
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

// On initial load, read the saved toggle state.
chrome.storage.local.get(["extensionActive"], (result) => {
  extensionActive = result.extensionActive || false;
  if (extensionActive) {
    startAdReplacement();
  }
});

// Inject custom CSS styles for the replacement ads.
function injectStyles() {
  const style = document.createElement("style");
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

// Returns a random positive message.
function getCustomContent() {
  const messages = [
    { type: "quote", content: '"The best way to predict the future is to create it." - Peter Drucker' },
    { type: "tip", content: "Take a 5-minute break to stretch and stay healthy!" },
    { type: "fact", content: "Did you know? Dolphins use whistles to identify each other!" }
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

// Replaces detected ad elements with custom content.
function replaceAds() {
  if (!extensionActive) return; // Only run if activated.

  // CSS selectors to find ad elements.
  const adSelectors = [
    'div[id*="content"]', 'div[class*="content"]', 'ins.adsbygoogle', 'div[data-ad]',
    'div[aria-label*="advertisement"]', '.ad-container', '#ad-container',
    '[class*="sponsored"]', '[id*="sponsored"]'
  ];

  let adsReplaced = 0;
  adSelectors.forEach((selector) => {
    try {
      const adElements = document.querySelectorAll(selector);
      adElements.forEach((adElement) => {
        // Exclude the BODY and HTML elements.
        if (adElement && adElement.tagName !== "BODY" && adElement.tagName !== "HTML") {
          const width = adElement.offsetWidth || 300;
          const height = adElement.offsetHeight || 250;
          const replacementDiv = document.createElement("div");
          const customContent = getCustomContent();
          replacementDiv.className = "adContent";
          replacementDiv.style.width = width + "px";
          replacementDiv.style.height = height + "px";
          replacementDiv.innerHTML = `
            <h3 style="margin:0 0 10px 0; color:#333;">${customContent.type.toUpperCase()}</h3>
            <p style="margin:0; color:#666;">${customContent.content}</p>
          `;
          adElement.parentNode.replaceChild(replacementDiv, adElement);
          adsReplaced++;
        }
      });
    } catch (error) {
      console.error("Error replacing ads for selector:", selector, error);
    }
  });

  // Update the total count of replaced ads.
  if (adsReplaced > 0) {
    chrome.storage.local.get(["adsReplaced"], (data) => {
      const totalAds = (data.adsReplaced || 0) + adsReplaced;
      chrome.storage.local.set({ adsReplaced: totalAds });
    });
  }
}

// Start the ad replacement process.
function startAdReplacement() {
  // Inject styles and do an initial replacement.
  injectStyles();
  replaceAds();

  // Set up a MutationObserver to catch dynamically loaded ads.
  observer = new MutationObserver(() => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(replaceAds, 1000);
  });
  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "id"] });
  window.addEventListener("load", replaceAds);
}

// Stop ad replacement by disconnecting the MutationObserver.
function stopAdReplacement() {
  if (observer) {
    observer.disconnect();
  }
}
