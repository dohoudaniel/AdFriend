// scripts/content.js

// Global flag to indicate whether the extension is active.
let extensionActive = false;
let observer;
let debounceTimeout;

// Inject custom styles for replacement elements.
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

// Return a random positive message.
function getCustomContent() {
  const content = [
    { type: "Quote", content: '"The best way to predict the future is to create it." - Peter Drucker' },
    { type: "Tip", content: "Take a 5-minute break to stretch and stay healthy!" },
    { type: "Fact", content: "Did you know? Dolphins use whistles to identify each other!" }
  ];
  return content[Math.floor(Math.random() * content.length)];
}

// Replace ad elements with our custom positive content.
function replaceAds() {
  if (!extensionActive) return; // Only run if activated.
  const adSelectors = [
    'ins.adsbygoogle',
    'div[data-ad]',
    'div[aria-label*="advertisement"]',
    '.ad-container',
    '#ad-container',
    '[class*="sponsored"]',
    '[id*="sponsored"]',
    'iframe[src*="ads"]',
    'iframe[src*="ad."]',
    'iframe[src*="doubleclick"]',
    'iframe[id*="google_ads"]',
    'iframe[data-ad]',
    '[class*="ad-iframe"]',
    '[id*="ad-iframe"]'
  ];

  adSelectors.forEach(selector => {
    try {
      const adElements = document.querySelectorAll(selector);
      adElements.forEach(adElement => {
        if (adElement && adElement.tagName !== "BODY" && adElement.tagName !== "HTML") {
          const width = adElement.offsetWidth || 300;
          const height = adElement.offsetHeight || 250;
          const replacementDiv = document.createElement("div");
          const customContent = getCustomContent();
          replacementDiv.className = "adContent";
          replacementDiv.style.width = width + "px";
          replacementDiv.style.height = height + "px";
          replacementDiv.innerHTML = `<h3 style="margin:0 0 10px 0; color:#333;">${customContent.type.toUpperCase()}</h3>
            <p style="margin:0; color:#666;">${customContent.content}</p>`;
          adElement.parentNode.replaceChild(replacementDiv, adElement);
          console.log('Replaced ad element:', selector);
        }
      });
    } catch (error) {
      console.error("Error replacing ads for selector:", selector, error);
    }
  });

  // (Optional) Update a counter in storage if you want to track replaced ads.
  // Example:
  chrome.storage.local.get(["adsReplaced"], (data) => {
    const total = (data.adsReplaced || 0) + replacedCount;
    chrome.storage.local.set({ adsReplaced: total });
  });
}

// Starts the ad replacement process.
function startAdReplacement() {
  if (extensionActive) return; // Already running.
  extensionActive = true;
  injectStyles();
  replaceAds();
  observer = new MutationObserver(() => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      if (extensionActive) {
        replaceAds();
      }
    }, 1000);
  });
  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "id"] });
  window.addEventListener("load", replaceAds);
  console.log("Ad replacement activated.");
}

// Stops the ad replacement process.
function stopAdReplacement() {
  extensionActive = false;
  if (observer) {
    observer.disconnect();
  }
  console.log("Ad replacement deactivated.");
}

// On initial load, check the saved state and start if needed.
chrome.storage.local.get(["extensionActive"], (result) => {
  extensionActive = result.extensionActive || false;
  if (extensionActive) {
    startAdReplacement();
  }
});

// Listen for messages from the popup to toggle the extension.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.hasOwnProperty("extensionActive")) {
    if (message.extensionActive) {
      startAdReplacement();
    } else {
      stopAdReplacement();
    }
  }
});
