// List of urls to block ads from
const list = [
    '*://*.youtube.com/*",
    "*://*.canyoublockit.com/*",
    "*://*.doubleclick.net/*",
    "*://*.googlesyndication.com/*",
    "*://*.adnxs.com/*",
    "*://*.criteo.com/*",
    "*://*.ads.twitter.com/*",
    "*://*.facebook.com/ads/*"
];

// Create a network trigger for the page
chrome.webRequest.onBeforeRequest.addListener(
    function(data) {
        return { cancel: true };
    },
    { urls: list },
    ["blocking"]
);

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed successfully!");
});
