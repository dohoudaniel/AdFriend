// Function to inject custom styles
function injectStyles() {
    var style = document.createElement('style');
    style.textContent = `
        .adContent {
            background: #f5f5f5;
            border-radius: 8px;
            padding: 15px;
            margin: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }
        .adContent:hover {
            transform: scale(1.02);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
    `;
    document.head.appendChild(style);
}

// Function to get random content
function getCustomContent() {
    var content = [
        {
            type: "quote",
            content: '"The best way to predict the future is to create it." - Peter Drucker'
        },
        {
            type: "tip",
            content: "Take a 5-minute break to stretch and stay healthy!"
        },
        {
            type: "fact",
            content: "Did you know? Dolphins use whistles to identify each other!"
        }
    ];

    return content[Math.floor(Math.random() * content.length)];
}

// Main function to replace ads
function replaceAds() {
    // Common ad selectors - expanded list
    var adSelectors = [
        'div[class*="ad-"]',
        'div[id*="ad-"]',
        'div[class*="ads"]',
        'div[id*="ads"]',
        'div[class*="advertisement"]',
        'div[id*="advertisement"]',
        'div[class*="ad"]',
        'div[id*="ad"]',
        'ins.adsbygoogle',
        'div[data-ad]',
        'div[aria-label*="advertisement"]',
        '.ad-container',
        '#ad-container',
        '[class*="sponsored"]',
        '[id*="sponsored"]'
    ];

    // Try to find ad elements
    for (var i = 0; i < adSelectors.length; i++) {
        try {
            var selector = adSelectors[i];
            var adElements = document.querySelectorAll(selector);

            for (var j = 0; j < adElements.length; j++) {
                var adElement = adElements[j];

                // Only replace if element exists and is visible
                var rect = adElement.getBoundingClientRect();
                if (adElement && rect.width > 0 && rect.height > 0) {
                    // Get original dimensions
                    var width = rect.width || 300;
                    var height = rect.height || 250;

                    // Create replacement content
                    var replacementDiv = document.createElement('div');
                    var customContent = getCustomContent();

                    replacementDiv.className = 'adContent';
                    replacementDiv.style.width = width + 'px';
                    replacementDiv.style.height = height + 'px';
                    replacementDiv.innerHTML = 
                        '<h3 style="margin:0 0 10px 0; color:#333;">' + customContent.type.toUpperCase() + '</h3>' +
                        '<p style="margin:0; color:#666;">' + customContent.content + '</p>';

                    // Replace the ad
                    if (adElement.parentNode) {
                        adElement.parentNode.replaceChild(replacementDiv, adElement);
                        console.log('Replaced ad element:', selector);
                    }
                }
            }
        } catch (error) {
            console.error('Error replacing ad for selector:', selector, error);
        }
    }
}

// Initialize observer with debounce
var debounceTimeout;
var observer = new MutationObserver(function() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(replaceAds, 500);
});

// Main initialization
function initialize() {
    console.log('Initializing ad replacement...');
    injectStyles();
    replaceAds();

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

// Run again after window load to catch lazy-loaded ads
window.addEventListener('load', replaceAds);
