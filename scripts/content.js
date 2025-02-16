// Function to inject custom styles
function injectStyles() {
    var style = document.createElement('style');
    style.textContent = `
    /*
      Enhanced "Glossy Bubble" style reminiscent of your AdFriend logo.
      This overrides any inline styling on the replaced elements.
    */
    .adContent {
      position: relative;
      overflow: hidden;
      /* Bubble-like radial gradient background */
      background: radial-gradient(
        circle at 30% 20%,
        #49c5f0 0%,   /* Light, bright blue highlight */
        #2178b8 40%,  /* Mid-tone */
        #1a5e8f 100%  /* Deeper blue at the edges */
      );

      /* Rounded corners for a bubble effect */
      border-radius: 16px;
      margin: 6px;
      padding: 12px;

      /* Subtle outer and inner shadows for dimension */
      box-shadow:
        0 3px 8px rgba(0, 0, 0, 0.2),           /* Outer shadow */
        inset 0 0 15px rgba(255, 255, 255, 0.15); /* Inner glow */

      /* Smooth transitions on hover effects */
      transition: transform 0.4s ease, box-shadow 0.4s ease;

      /* Light text for contrast against the darker blues */
      color: #f0faff;
      font-family: Arial, sans-serif;
    }

    /* Add a soft highlight reflection using a pseudo-element */
    .adContent::before {
      content: "";
      position: absolute;
      pointer-events: none;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: inherit;

      /* A second radial gradient for the "reflection" highlight */
      background: radial-gradient(
        circle at 25% 20%,
        rgba(255,255,255,0.3) 0%,
        rgba(255,255,255,0) 60%
      );
    }

    /* Slight hover scaling and intensification of the glow */
    .adContent:hover {
      transform: scale(1.05);
      box-shadow:
        0 6px 12px rgba(0, 0, 0, 0.25),
        inset 0 0 18px rgba(255, 255, 255, 0.25);
    }

    /* Override any inline color on headings */
    .adContent h3 {
      margin: 0 0 10px 0 !important;
      color: #ffffff !important;
    }

    /* Override any inline color on paragraphs */
    .adContent p {
      margin: 0 !important;
      color: #eef8ff !important;
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
            content: "Take Breaks: Step away from work every hour to refresh your mind and prevent burnout."
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
            content: "The Eiffel Tower Can Grow Taller in Summer: Due to the expansion of iron in the heat, the Eiffel Tower can grow up to 6 inches (15 cm) taller during hot weather."
          },
          {
            type: "Quote",
            content: '"Believe you can and you\'re halfway there." - Theodore Roosevelt'
          },
          {
            type: "Quote",
            content: '"Your limitation—it\'s only your imagination."'
          },
          {
            type: "Quote",
            content: '"Push yourself, because no one else is going to do it for you."'
          },
          {
            type: "Quote",
            content: '"Great things never come from comfort zones."'
          },
          {
            type: "Quote",
            content: '"Dream it. Wish it. Do it."'
          },
          {
            type: "Quote",
            content: '"Success doesn’t just find you. You have to go out and get it."'
          },
          {
            type: "Quote",
            content: '"The harder you work for something, the greater you\'ll feel when you achieve it."'
          },
          {
            type: "Quote",
            content: '"Don\'t stop when you\'re tired. Stop when you\'re done."'
          },
          {
            type: "Quote",
            content: '"Do something today that your future self will thank you for."'
          },
          {
            type: "Quote",
            content: '"Little things make big days."'
          },
          {
            type: "Quote",
            content: '"It\'s going to be hard, but hard does not mean impossible."'
          },
          {
            type: "Quote",
            content: '"Don\'t wait for opportunity. Create it."'
          },
          {
            type: "Tips",
            content: "Organize your workspace to boost productivity."
          },
          {
            type: "Tips",
            content: "Plan your day the night before for a head start."
          },
          {
            type: "Tips",
            content: "Set clear goals for each day to stay on track."
          },
          {
            type: "Tips",
            content: "Break your work into small, manageable tasks."
          },
          {
            type: "Tips",
            content: "Use a timer to focus on tasks for 25-minute intervals."
          },
          {
            type: "Tips",
            content: "Take a quick walk to recharge your energy."
          },
          {
            type: "Tips",
            content: "Practice deep breathing for a few minutes to reduce stress."
          },
          {
            type: "Tips",
            content: "Keep a water bottle at your desk and sip regularly."
          },
          {
            type: "Tips",
            content: "Stand up and stretch every 30 minutes."
          },
          {
            type: "Tips",
            content: "Switch tasks periodically to keep your mind fresh."
          },
          {
            type: "Hints",
            content: "Try the Pomodoro technique: 25 minutes of work followed by a 5-minute break."
          },
          {
            type: "Hints",
            content: "Reward yourself after completing challenging tasks."
          },
          {
            type: "Hints",
            content: "Maintain a prioritized to-do list to organize your day."
          },
          {
            type: "Hints",
            content: "Declutter your digital workspace to minimize distractions."
          },
          {
            type: "Hints",
            content: "Limit your social media breaks to improve focus."
          },
          {
            type: "Hints",
            content: "Practice mindfulness exercises to enhance concentration."
          },
          {
            type: "Activity",
            content: "Do 10 push-ups to energize your body."
          },
          {
            type: "Activity",
            content: "Take a brisk 5-minute walk outside."
          },
          {
            type: "Activity",
            content: "Perform a quick 3-minute stretching routine."
          },
          {
            type: "Activity",
            content: "Meditate for 5 minutes to clear your mind."
          },
          {
            type: "Activity",
            content: "Dance to your favorite upbeat song for a mood boost."
          },
          {
            type: "Activity",
            content: "Do light yoga stretches for 5 minutes."
          },
          {
            type: "Activity",
            content: "Step outside and get some fresh air for 5 minutes."
          },
          {
            type: "Activity",
            content: "Perform 15 squats to get your blood flowing."
          },
          {
            type: "Activity",
            content: "Take a power nap for 10 minutes if you're feeling drained."
          },
          {
            type: "Activity",
            content: "Stand up and do some leg stretches for 3 minutes."
          },
          {
            type: "Activity",
            content: "Drink a glass of water and practice deep breathing for 2 minutes."
          },
          {
            type: "Quote",
            content: '"Don\'t count the days, make the days count." - Muhammad Ali'
          },
          {
            type: "Quote",
            content: '"Every moment is a fresh beginning." - T.S. Eliot'
          },
          {
            type: "Quote",
            content: '"The future depends on what you do today." - Mahatma Gandhi'
          },
          {
            type: "Facts",
            content: "A single tree can absorb as much carbon in a year as a car produces while driving 26,000 miles."
          },
          {
            type: "Facts",
            content: "The average person walks the equivalent of three times around the world in a lifetime."
          },
          {
            type: "Facts",
            content: "Smiling can boost your immune system and reduce stress."
          },
          {
            type: "Facts",
            content: "Listening to music can enhance your performance on cognitive tasks."
          }
        // {
        //     type: "Quote",
        //     content: '"The best way to predict the future is to create it." - Peter Drucker'
        // },
        // {
        //     type: "Tips",
        //     content: "Take a 5-minute break to stretch and stay healthy!"
        // },
        // {
        //     type: "Facts",
        //     content: "Did you know? Dolphins use whistles to identify each other!"
        // },
        // {
        //     type: "Tips",
        //     content: "Stay Hydrated: Drink plenty of water throughout the day. It helps with energy, focus, and overall health."
        // },
        // {
        //     type: "Tips",
        //     content: "Time Management: Break tasks into smaller, manageable chunks. Use techniques like Pomodoro (25-minute work sprints followed by a 5-minute break) for better focus."
        // },
        // {
        //     type: "Tips",
        //     content: "Exercise Regularly: Regular physical activity can boost your mood, improve focus, and help you stay healthy. Even a short walk can make a difference."
        // },
        // {
        //     type: "Tips",
        //     content: "Take Breaks: Step away from work every hour to refresh your mind and prevent burnout"
        // },
        // {
        //     type: "Hints",
        //     content: "Use Keyboard Shortcuts: Save time by learning keyboard shortcuts for the apps and programs you use the most. For example, Ctrl + C for copy, Ctrl + V for paste."
        // },
        // {
        //     type: "Hints",
        //     content: "Always Backup Your Work: Use cloud storage or external drives to keep backups of important documents, photos, and projects."
        // },
        // {
        //     type: "Hints",
        //     content: "Use Task Lists: Writing down tasks and prioritizing them can help you stay focused and organized throughout the day."
        // },
        // {
        //     type: "Hints",
        //     content: "Honey Never Spoils: Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible."
        // },
        // {
        //     type: "Facts",
        //     content: "Octopuses Have Three Hearts: Two pump blood to the gills, while one pumps it to the rest of the body. When they swim, the heart that delivers blood to the body stops beating!"
        // },
        // {
        //     type: "Facts",
        //     content: "The Eiffel Tower Can Grow Taller in Summer: Due to the expansion of iron in the heat, the Eiffel Tower can grow up to 6 inches (15 cm) taller during hot weather"
        // }
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
                    // We won't rely on inline color styles, since we override them in injectStyles()
                    replacementDiv.innerHTML = '<h3>' +
                        customContent.type.toUpperCase() + '</h3>' +
                        '<p>' + customContent.content + '</p>';
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
