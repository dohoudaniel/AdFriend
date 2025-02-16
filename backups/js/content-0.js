// // scripts/content.js

// // Global flag to indicate whether the extension is active.
// let extensionActive = false;
// let observer;
// let debounceTimeout;

// // Inject custom styles for replacement elements.
// function injectStyles() {
//   const style = document.createElement('style');
//   style.textContent = `
//     .adContent {
//       background: #f5f5f5;
//       border-radius: 8px;
//       padding: 10px;
//       margin: 5px;
//       box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//       transition: all 0.5s ease;
//     }
//     .adContent:hover {
//       transform: scale(1.02);
//       box-shadow: 0 4px 8px rgba(0,0,0,0.15);
//     }
//   `;
//   document.head.appendChild(style);
// }

// // Return a random positive message.
// function getCustomContent() {
//   const content = [
//     { type: "Quote", content: '"The best way to predict the future is to create it." - Peter Drucker' },
//     { type: "Tip", content: "Take a 5-minute break to stretch and stay healthy!" },
//     { type: "Fact", content: "Did you know? Dolphins use whistles to identify each other!" }
//   ];
//   return content[Math.floor(Math.random() * content.length)];
// }

// // Replace ad elements with our custom positive content.
// function replaceAds() {
//   if (!extensionActive) return; // Only run if activated.
//   const adSelectors = [
//     'ins.adsbygoogle',
//     'div[data-ad]',
//     'div[aria-label*="advertisement"]',
//     '.ad-container',
//     '#ad-container',
//     '[class*="sponsored"]',
//     '[id*="sponsored"]',
//     'iframe[src*="ads"]',
//     'iframe[src*="ad."]',
//     'iframe[src*="doubleclick"]',
//     'iframe[id*="google_ads"]',
//     'iframe[data-ad]',
//     '[class*="ad-iframe"]',
//     '[id*="ad-iframe"]'
//   ];

//   adSelectors.forEach(selector => {
//     try {
//       const adElements = document.querySelectorAll(selector);
//       adElements.forEach(adElement => {
//         if (adElement && adElement.tagName !== "BODY" && adElement.tagName !== "HTML") {
//           const width = adElement.offsetWidth || 300;
//           const height = adElement.offsetHeight || 250;
//           const replacementDiv = document.createElement("div");
//           const customContent = getCustomContent();
//           replacementDiv.className = "adContent";
//           replacementDiv.style.width = width + "px";
//           replacementDiv.style.height = height + "px";
//           replacementDiv.innerHTML = `<h3 style="margin:0 0 10px 0; color:#333;">${customContent.type.toUpperCase()}</h3>
//             <p style="margin:0; color:#666;">${customContent.content}</p>`;
//           adElement.parentNode.replaceChild(replacementDiv, adElement);
//           console.log('Replaced ad element:', selector);
//         }
//       });
//     } catch (error) {
//       console.error("Error replacing ads for selector:", selector, error);
//     }
//   });

//   // (Optional) Update a counter in storage if you want to track replaced ads.
//   // Example:
//   chrome.storage.local.get(["adsReplaced"], (data) => {
//     const total = (data.adsReplaced || 0) + replacedCount;
//     chrome.storage.local.set({ adsReplaced: total });
//   });
// }

// // Starts the ad replacement process.
// function startAdReplacement() {
//   if (extensionActive) return; // Already running.
//   extensionActive = true;
//   injectStyles();
//   replaceAds();
//   observer = new MutationObserver(() => {
//     clearTimeout(debounceTimeout);
//     debounceTimeout = setTimeout(() => {
//       if (extensionActive) {
//         replaceAds();
//       }
//     }, 1000);
//   });
//   observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "id"] });
//   window.addEventListener("load", replaceAds);
//   console.log("Ad replacement activated.");
// }

// // Stops the ad replacement process.
// function stopAdReplacement() {
//   extensionActive = false;
//   if (observer) {
//     observer.disconnect();
//   }
//   console.log("Ad replacement deactivated.");
// }

// // On initial load, check the saved state and start if needed.
// chrome.storage.local.get(["extensionActive"], (result) => {
//   extensionActive = result.extensionActive || false;
//   if (extensionActive) {
//     startAdReplacement();
//   }
// });

// // Listen for messages from the popup to toggle the extension.
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.hasOwnProperty("extensionActive")) {
//     if (message.extensionActive) {
//       startAdReplacement();
//     } else {
//       stopAdReplacement();
//     }
//   }
// });


// // scripts/content.js

// // Global flag to indicate whether the extension is active.
// let extensionActive = false;
// let observer;
// let debounceTimeout;

// // Inject custom styles for replacement elements.
// function injectStyles() {
//   const style = document.createElement('style');
//   style.textContent = `
//     .adContent {
//       background: linear-gradient(135deg, #ff9a9e, #fad0c4);
//       border-radius: 8px;
//       padding: 10px;
//       margin: 5px;
//       box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//       transition: transform 0.5s ease, box-shadow 0.5s ease;
//       color: #333;
//     }
//     .adContent:hover {
//       transform: scale(1.05);
//       box-shadow: 0 4px 12px rgba(0,0,0,0.2);
//     }
//   `;
//   document.head.appendChild(style);
// }

// // Return a random positive message.
// function getCustomContent() {
//   const content = [
//     { type: "Quote", content: '"The best way to predict the future is to create it." - Peter Drucker' },
//     { type: "Tip", content: "Take a 5-minute break to stretch and stay healthy!" },
//     { type: "Fact", content: "Did you know? Dolphins use whistles to identify each other!" }
//   ];
//   return content[Math.floor(Math.random() * content.length)];
// }

// // Replace ad elements with our custom positive content.
// function replaceAds() {
//   if (!extensionActive) return; // Only run if activated.
//   const adSelectors = [
//     'ins.adsbygoogle',
//     'div[data-ad]',
//     'div[aria-label*="advertisement"]',
//     '.ad-container',
//     '#ad-container',
//     '[class*="sponsored"]',
//     '[id*="sponsored"]',
//     'iframe[src*="ads"]',
//     'iframe[src*="ad."]',
//     'iframe[src*="doubleclick"]',
//     'iframe[id*="google_ads"]',
//     'iframe[data-ad]',
//     '[class*="ad-iframe"]',
//     '[id*="ad-iframe"]'
//   ];

//   adSelectors.forEach(selector => {
//     try {
//       const adElements = document.querySelectorAll(selector);
//       adElements.forEach(adElement => {
//         if (adElement && adElement.tagName !== "BODY" && adElement.tagName !== "HTML") {
//           const width = adElement.offsetWidth || 300;
//           const height = adElement.offsetHeight || 250;
//           const replacementDiv = document.createElement("div");
//           const customContent = getCustomContent();
//           replacementDiv.className = "adContent";
//           replacementDiv.style.width = width + "px";
//           replacementDiv.style.height = height + "px";
//           replacementDiv.innerHTML = `<h3 style="margin:0 0 10px 0;">${customContent.type.toUpperCase()}</h3>
//             <p style="margin:0;">${customContent.content}</p>`;
//           adElement.parentNode.replaceChild(replacementDiv, adElement);
//           console.log('Replaced ad element:', selector);
//         }
//       });
//     } catch (error) {
//       console.error("Error replacing ads for selector:", selector, error);
//     }
//   });

//   // (Optional) Update a counter in storage if you want to track replaced ads.
//   chrome.storage.local.get(["adsReplaced"], (data) => {
//     const replacedCount = 0; // Adjust as needed if you count individually.
//     const total = (data.adsReplaced || 0) + replacedCount;
//     chrome.storage.local.set({ adsReplaced: total });
//   });
// }

// // Starts the ad replacement process.
// function startAdReplacement() {
//   if (extensionActive) return; // Already running.
//   extensionActive = true;
//   injectStyles();
//   replaceAds();
//   observer = new MutationObserver(() => {
//     clearTimeout(debounceTimeout);
//     debounceTimeout = setTimeout(() => {
//       if (extensionActive) {
//         replaceAds();
//       }
//     }, 1000);
//   });
//   observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "id"] });
//   window.addEventListener("load", replaceAds);
//   console.log("Ad replacement activated.");
// }

// // Stops the ad replacement process.
// function stopAdReplacement() {
//   extensionActive = false;
//   if (observer) {
//     observer.disconnect();
//   }
//   console.log("Ad replacement deactivated.");
// }

// // On initial load, check the saved state and start if needed.
// chrome.storage.local.get(["extensionActive"], (result) => {
//   extensionActive = result.extensionActive || false;
//   if (extensionActive) {
//     startAdReplacement();
//   }
// });

// // Listen for messages from the popup to toggle the extension.
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.hasOwnProperty("extensionActive")) {
//     if (message.extensionActive) {
//       startAdReplacement();
//     } else {
//       stopAdReplacement();
//     }
//   }
// });


// // scripts/content.js

// // Global flag to indicate whether the extension is active.
// let extensionActive = false;
// let observer;
// let debounceTimeout;

// // Inject custom styles for replacement elements.
// function injectStyles() {
//   const style = document.createElement('style');
//   style.textContent = `
//     .adContent {
//       /* Make the container positioned so the pseudo-element can overlay */
//       position: relative;
//       overflow: hidden;

//       /* Main radial gradient (bottom/center is darker) */
//       background: radial-gradient(
//         circle at 30% 20%,
//         #6ed6fc 0%,
//         #3d8ec9 50%,
//         #1b4e72 100%
//       );

//       /* Rounder corners to mimic a bubble shape */
//       border-radius: 16px;
//       padding: 14px;
//       margin: 6px;

//       /* Outer and inner shadow for depth */
//       box-shadow:
//         0 2px 6px rgba(0,0,0,0.25),         /* Outer shadow */
//         inset 0 0 15px rgba(255,255,255,0.15); /* Inner glow */

//       /* Smooth transition on hover */
//       transition: transform 0.5s ease, box-shadow 0.5s ease;

//       /* Text color and font */
//       color: #f0faff;
//       font-family: Arial, sans-serif;
//     }

//     /* Add a subtle "highlight reflection" overlay */
//     .adContent::before {
//       content: "";
//       position: absolute;
//       top: 0;
//       left: 0;
//       right: 0;
//       bottom: 0;
//       pointer-events: none;
//       border-radius: inherit;
//       /* Second radial for the highlight effect (top-left corner) */
//       background: radial-gradient(
//         circle at 25% 20%,
//         rgba(255,255,255,0.3) 0%,
//         rgba(255,255,255,0) 70%
//       );
//     }

//     /* Slight scale and stronger shadow on hover */
//     .adContent:hover {
//       transform: scale(1.05);
//       box-shadow:
//         0 6px 12px rgba(0,0,0,0.3),
//         inset 0 0 18px rgba(255,255,255,0.25);
//     }

//     .adContent h3 {
//       color: #ffffff;
//       margin-bottom: 8px;
//     }

//     .adContent p {
//       color: #eef8ff;
//       margin: 0;
//     }
//   `;
//   document.head.appendChild(style);
// }

// // Return a random positive message.
// function getCustomContent() {
//   const content = [
//     { type: "Quote", content: '"The best way to predict the future is to create it." - Peter Drucker' },
//     { type: "Tip", content: "Take a 5-minute break to stretch and stay healthy!" },
//     { type: "Fact", content: "Did you know? Dolphins use whistles to identify each other!" }
//   ];
//   return content[Math.floor(Math.random() * content.length)];
// }

// // Replace ad elements with our custom positive content.
// function replaceAds() {
//   if (!extensionActive) return; // Only run if activated.

//   const adSelectors = [
//     'ins.adsbygoogle',
//     'div[data-ad]',
//     'div[aria-label*="advertisement"]',
//     '.ad-container',
//     '#ad-container',
//     '[class*="sponsored"]',
//     '[id*="sponsored"]',
//     'iframe[src*="ads"]',
//     'iframe[src*="ad."]',
//     'iframe[src*="doubleclick"]',
//     'iframe[id*="google_ads"]',
//     'iframe[data-ad]',
//     '[class*="ad-iframe"]',
//     '[id*="ad-iframe"]'
//   ];

//   adSelectors.forEach(selector => {
//     try {
//       const adElements = document.querySelectorAll(selector);
//       adElements.forEach(adElement => {
//         if (adElement && adElement.tagName !== "BODY" && adElement.tagName !== "HTML") {
//           const width = adElement.offsetWidth || 300;
//           const height = adElement.offsetHeight || 250;
//           const replacementDiv = document.createElement("div");
//           const customContent = getCustomContent();
//           replacementDiv.className = "adContent";
//           replacementDiv.style.width = width + "px";
//           replacementDiv.style.height = height + "px";
//           replacementDiv.innerHTML = `
//             <h3>${customContent.type.toUpperCase()}</h3>
//             <p>${customContent.content}</p>
//           `;
//           adElement.parentNode.replaceChild(replacementDiv, adElement);
//           console.log('Replaced ad element:', selector);
//         }
//       });
//     } catch (error) {
//       console.error("Error replacing ads for selector:", selector, error);
//     }
//   });

//   // (Optional) track replaced ads
//   chrome.storage.local.get(["adsReplaced"], (data) => {
//     const replacedCount = 0; // If you want to increment, do so here.
//     const total = (data.adsReplaced || 0) + replacedCount;
//     chrome.storage.local.set({ adsReplaced: total });
//   });
// }

// // Starts the ad replacement process.
// function startAdReplacement() {
//   if (extensionActive) return; // Already running.
//   extensionActive = true;
//   injectStyles();
//   replaceAds();
//   observer = new MutationObserver(() => {
//     clearTimeout(debounceTimeout);
//     debounceTimeout = setTimeout(() => {
//       if (extensionActive) {
//         replaceAds();
//       }
//     }, 1000);
//   });
//   observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "id"] });
//   window.addEventListener("load", replaceAds);
//   console.log("Ad replacement activated.");
// }

// // Stops the ad replacement process.
// function stopAdReplacement() {
//   extensionActive = false;
//   if (observer) {
//     observer.disconnect();
//   }
//   console.log("Ad replacement deactivated.");
// }

// // On initial load, check the saved state and start if needed.
// chrome.storage.local.get(["extensionActive"], (result) => {
//   extensionActive = result.extensionActive || false;
//   if (extensionActive) {
//     startAdReplacement();
//   }
// });

// // Listen for messages from the popup to toggle the extension.
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.hasOwnProperty("extensionActive")) {
//     if (message.extensionActive) {
//       startAdReplacement();
//     } else {
//       stopAdReplacement();
//     }
//   }
// });


// scripts/content.js

// Global flag to indicate whether the extension is active.
let extensionActive = false;
let observer;
let debounceTimeout;

// Inject custom styles for replacement elements.
function injectStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /*
      "Glossy" style reminiscent of a bubble or sphere,
      similar to your uploaded AdFriend logo.
    */
    .adContent {
      /* A radial gradient for a soft, spherical feel */
      background: radial-gradient(
        circle at 30% 20%,
        #49c5f0 0%,    /* Light, bright blue highlight */
        #2178b8 40%,   /* Mid-tone */
        #1a5e8f 100%   /* Deeper blue at the edges */
      );

      /* Slight border & radius to enhance the bubble effect */
      border-radius: 12px;
      padding: 12px;
      margin: 6px;

      /* Subtle "outer" and "inner" shadows for dimension */
      box-shadow:
        0 2px 4px rgba(0, 0, 0, 0.2),          /* Outer shadow */
        inset 0 0 10px rgba(255, 255, 255, 0.15); /* Inner glow */

      /* Smooth transitions on hover effects */
      transition: transform 0.5s ease, box-shadow 0.5s ease;

      /* Light text for contrast against the darker blues */
      color: #f0faff;
      font-family: Arial, sans-serif;
    }

    /* Slight hover scaling and intensification of the glow */
    .adContent:hover {
      transform: scale(1.05);
      box-shadow:
        0 6px 12px rgba(0, 0, 0, 0.25),
        inset 0 0 12px rgba(255, 255, 255, 0.25);
    }

    /* Headings can be slightly brighter */
    .adContent h3 {
      color: #ffffff;
      margin-bottom: 8px;
    }

    /* Paragraph text remains a lighter shade */
    .adContent p {
      color: #eef8ff;
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
          replacementDiv.innerHTML = `
            <h3>${customContent.type.toUpperCase()}</h3>
            <p>${customContent.content}</p>
          `;
          adElement.parentNode.replaceChild(replacementDiv, adElement);
          console.log('Replaced ad element:', selector);
        }
      });
    } catch (error) {
      console.error("Error replacing ads for selector:", selector, error);
    }
  });

  // (Optional) track replaced ads
  chrome.storage.local.get(["adsReplaced"], (data) => {
    const replacedCount = 0; // If you want to count individually, increment here.
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
