// scripts/ui_interface.js

document.addEventListener("DOMContentLoaded", function () {
  const toggleCheckbox = document.getElementById("toggle-extension");
  const toggleStatus = document.getElementById("toggle-status");

  // Load the saved toggle state (default: OFF)
  chrome.storage.local.get(["extensionActive"], function (result) {
    let active = result.extensionActive || false;
    toggleCheckbox.checked = active;
    updateStatusText(active);
  });

  // Listen for toggle changes.
  toggleCheckbox.addEventListener("change", function () {
    let isActive = toggleCheckbox.checked;
    chrome.storage.local.set({ extensionActive: isActive }, function () {
      updateStatusText(isActive);
      // Send a message to the active tab to update the content script behavior.
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length) {
          chrome.tabs.sendMessage(tabs[0].id, { extensionActive: isActive });
        }
      });
    });
  });

  function updateStatusText(isActive) {
    toggleStatus.textContent = isActive ? "ON" : "OFF";
    toggleStatus.style.color = isActive ? "#4caf50" : "#d32f2f";
  }
});
