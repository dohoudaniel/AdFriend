// Function to detect ads using common ad classes & IDs
function countAds() {
    const adSelectors = [
        ".ad", ".adsbox", ".advertisement", ".sponsored", ".ad-container", 
        "[id^=ad]", "[class^=ad]", "[aria-label*=ad]"
    ];
    let ads = document.querySelectorAll(adSelectors.join(", "));
    return ads.length;
}

// Send ad count to popup.js via Chrome storage
function updateAdCount() {
    let adCount = countAds();
    chrome.storage.local.set({ adCount });  // Store ad count
}

// Run ad count on page load
updateAdCount();

// Observe changes to detect ads loaded dynamically
const observer = new MutationObserver(updateAdCount);
observer.observe(document.body, { childList: true, subtree: true });
