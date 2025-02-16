// Function to inject custom styles
function injectStyles() {
    var style = document.createElement('style');
    style.textContent = `
        .adContent {
            background: #f5f5f5;
            border-radius: 8px;
            padding: 10px;
            margin: 5px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: all 3.3s ease;
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
            type: "Quote",
            content: '"The best way to predict the future is to create it." - Peter Drucker'
        },
        {
            type: "Tips",
            content: "Take a 5-minute break to stretch and stay healthy!"
        },
        {
            type: "Facts",
            content: "Did you know? Dolphins use whistles to identify each other!"
        },
        {
            type: "Tips",
            content: "Stay Hydrated: Drink plenty of water throughout the day. It helps with energy, focus, and overall health."
        },
        {
            type: "Tips",
            content: "Time Management: Break tasks into smaller, manageable chunks. Use techniques like Pomodoro (25-minute work sprints followed by a 5-minute break) for better focus."
        },
        {
            type: "Tips",
            content: "Exercise Regularly: Regular physical activity can boost your mood, improve focus, and help you stay healthy. Even a short walk can make a difference."
        },
        {
            type: "Tips",
            content: "Take Breaks: Step away from work every hour to refresh your mind and prevent burnout"
        },
        {
            type: "Hints",
            content: "Use Keyboard Shortcuts: Save time by learning keyboard shortcuts for the apps and programs you use the most. For example, Ctrl + C for copy, Ctrl + V for paste."
        },
        {
            type: "Hints",
            content: "Always Backup Your Work: Use cloud storage or external drives to keep backups of important documents, photos, and projects."
        },
        {
            type: "Hints",
            content: "Use Task Lists: Writing down tasks and prioritizing them can help you stay focused and organized throughout the day."
        },
        {
            type: "Hints",
            content: "Honey Never Spoils: Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible."
        },
        {
            type: "Facts",
            content: "Octopuses Have Three Hearts: Two pump blood to the gills, while one pumps it to the rest of the body. When they swim, the heart that delivers blood to the body stops beating!"
        },
        {
            type: "Facts",
            content: "The Eiffel Tower Can Grow Taller in Summer: Due to the expansion of iron in the heat, the Eiffel Tower can grow up to 6 inches (15 cm) taller during hot weather"
        }
    ];
    return content[Math.floor(Math.random() * content.length)];
}

// Main function to replace ads
function replaceAds() {
    var adSelectors = [
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

    adSelectors.forEach(function(selector) {
        try {
            var adElements = document.querySelectorAll(selector);
            adElements.forEach(function(adElement) {
                if (adElement && adElement.tagName !== 'BODY' && adElement.tagName !== 'HTML') {
                    var width = adElement.offsetWidth || 300;
                    var height = adElement.offsetHeight || 250;
                    var replacementDiv = document.createElement('div');
                    var customContent = getCustomContent();
                    replacementDiv.className = 'adContent';
                    replacementDiv.style.width = width + 'px';
                    replacementDiv.style.height = height + 'px';
                    replacementDiv.innerHTML = '<h3 style="margin:0 0 10px 0; color:#333;">' +
                        customContent.type.toUpperCase() + '</h3>' +
                        '<p style="margin:0; color:#666;">' + customContent.content + '</p>';
                    adElement.parentNode.replaceChild(replacementDiv, adElement);
                    console.log('Replaced ad element:', selector);
                }
            });
        } catch (error) {
            console.error('Error replacing ad for selector:', selector, error);
        }
    });

    // Handle iframe-based ads
    var iframes = document.getElementsByTagName("iframe");
    for (var i = 0; i < iframes.length; i++) {
        try {
            var iframeDoc = iframes[i].contentDocument || iframes[i].contentWindow.document;
            var iframeAds = iframeDoc.querySelectorAll(adSelectors.join(','));
            for (var j = 0; j < iframeAds.length; j++) {
                iframeAds[j].style.display = "none";
            }
        } catch (e) {
            console.warn("Blocked iframe: ", e);
        }
    }
}

// Initialize observer with debounce
var debounceTimeout;
var observer = new MutationObserver(function() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(replaceAds, 1000);
});

// Main initialization
function initialize() {
    console.log('Initializing ad replacement');
    injectStyles();
    replaceAds();
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'id']
    });
}

// Run when DOM / browser is fully ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

// Run again after window load to catch ads
window.addEventListener('load', replaceAds);
