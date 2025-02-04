// This script runs in the context of web pages
// It will identify ad spaces and replace them with our widgets

function findAdElements() {
    // Common ad selectors - this list should be expanded based on requirements
    const adSelectors = [
      '[class*="ad"]',
      '[class*="advertisement"]',
      '[id*="ad-"]',
      '[id*="advertisement"]',
      '[aria-label*="advertisement"]'
    ];
  
    // Find potential ad elements
    const adElements = [];
    adSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        // Verify if it's actually an ad (you might want to add more sophisticated detection)
        if (isLikelyAd(element)) {
          adElements.push(element);
        }
      });
    });
  
    return adElements;
  }
  
  function isLikelyAd(element) {
    // Basic ad detection heuristics
    const style = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    
    // Common ad sizes
    const adSizes = [
      [300, 250],  // Medium Rectangle
      [728, 90],   // Leaderboard
      [160, 600],  // Wide Skyscraper
      [320, 50]    // Mobile Banner
    ];
  
    // Check if element size matches common ad sizes
    const matchesAdSize = adSizes.some(([width, height]) => {
      return Math.abs(rect.width - width) < 10 && Math.abs(rect.height - height) < 10;
    });
  
    return matchesAdSize || element.tagName === 'IFRAME';
  }
  
  function createWidget(adElement) {
    // Create a container for our widget
    const widget = document.createElement('div');
    widget.className = 'adfriend-widget';
    widget.style.width = adElement.offsetWidth + 'px';
    widget.style.height = adElement.offsetHeight + 'px';
  
    // Add widget content (this will be customized based on user preferences)
    widget.innerHTML = `
      <div class="adfriend-content">
        <p class="quote">Loading...</p>
        <div class="controls">
          <button class="refresh">↻</button>
        </div>
      </div>
    `;
  
    return widget;
  }
  
  function replaceAds() {
    const adElements = findAdElements();
    
    adElements.forEach(adElement => {
      // Create and insert our widget
      const widget = createWidget(adElement);
      adElement.parentNode.replaceChild(widget, adElement);
      
      // Notify background script about the replacement
      chrome.runtime.sendMessage({
        type: 'AD_REPLACED',
        data: {
          url: window.location.href,
          timestamp: new Date().toISOString()
        }
      });
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceAds);
  } else {
    replaceAds();
  }
  
  // Listen for dynamic content changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        replaceAds();
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });