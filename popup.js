// Fetch ad count from Chrome storage
chrome.storage.local.get(["adCount"], function(data) {
    document.getElementById("ad-count").textContent = data.adCount || 0;
});
