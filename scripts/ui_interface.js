// // /// Handling content to replace the blocked ads
// // function adElement() {
// //     // List of possble classname
// //     const adClassNames = [
// //         '[class*="ad-"]',
// //         '[id*="ad-"]',
// //         '[class*="advertisement"]',
// //         '[class^="ad-"]',
// //         '[id^="ad-"]',
// //         '[id*="advertisement"]',
// //         '.ad-container',
// //         '#ad-container'
// //     ]

// //     // loop through each of the classname
// //     adClassNames.foreach(function (items) {
// //         const elements = document.querySelectorAll(items);

// //         elements.foreach(function (elements) {
// //             // setting up constants for the replacement of the blocked add
// //             const height = document.offsetHeight;
// //             const width = document.offsetwidth;
// //             const div = document.createElement("div");
// //             // setting up elements that replaces the ad contents on the webpage
// //             div.className = "adContent";
// //             div.style.width = width + "px";
// //             div.style.height = height + "px";
// //             div.style.boxSizing = "box-sizing";
// //             div.style.padding = "10px";
// //             div.innerHTML = customCont();

// //             elements.parentNode = replaceChild(rep_cont, ads);
// //         });
// //     })
// // };

// // //// function that handles customizations
// // function customCont() {
// //     const media_content = [
// //         {
// //             "type": "quote",
// //             "content": '"The best way to predict the future is to create it."- Peter Druker'
// //         },
// //         {
// //             "type": "tip",
// //             "content": "You can always take a 5-minute break to stretch out and stay healthy!"
// //         },
// //         {
// //             "type": "fact",
// //             "content": "Do you know that Dolphins use whistles to identify each other, and respond when they hear their own name?"
// //         },
// //         {
// //             "type": "fact",
// //             "content": "Did you know that Antartica is the worlds largest desert ?"
// //         },
// //         {
// //             "type": "fact",
// //             "content": "Did you know that slug has 4 noses ?"
// //         }
// //     ]

// //     const randomize = contents[Math.floor(Math.random()) * contents.length];
// //     return `
// //         <div style="background: #f5f5f5 border-radius: 8px; padding: 15px; height: 100%;">
// //         <h3 style="margin:0 0 10px 0; color:#333;">${media_content.type.toUpperCase()}
// //         <p style="margin: 0; color: #666;">${media_content.content}</p> </div>
// //     `;
// // }

// // adElement();

// // document.getElementById('changeColor').addEventListener('click', function() {
// //     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
// //         chrome.scripting.executeScript({
// //             target: { tabId: tabs[0].id },
// //             func: changeColor
// //         });
// //     });
// // });

// // function changeColor() {
// //     document.body.style.backgroundColor = "lightblue";
// // }

// // // Function to update UI with ad replacement count
// // function updateAdCount() {
// //     chrome.storage.local.get(["adsReplaced"], function (data) {
// //         document.getElementById("ad-count").textContent = data.adsReplaced || 0;
// //     });
// // }

// // // Update UI when the popup is opened
// // document.addEventListener("DOMContentLoaded", updateAdCount);


// // document.addEventListener("DOMContentLoaded", function() {
// //     const toggleCheckbox = document.getElementById("toggle-extension");
// //     const toggleStatus = document.getElementById("toggle-status");

// //     // Retrieve the saved toggle state (default to false/off)
// //     chrome.storage.local.get(["extensionActive"], function(result) {
// //       let active = result.extensionActive;
// //       if (active === undefined) {
// //         active = false;
// //       }
// //       toggleCheckbox.checked = active;
// //       toggleStatus.textContent = active ? "ON" : "OFF";
// //     });

// //     // Listen for toggle changes
// //     toggleCheckbox.addEventListener("change", function() {
// //       let isActive = toggleCheckbox.checked;
// //       // Save the new state
// //       chrome.storage.local.set({ extensionActive: isActive }, function() {
// //         toggleStatus.textContent = isActive ? "ON" : "OFF";
// //         // Optionally, send a message to the content script to enable/disable ad replacement
// //         chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
// //           chrome.tabs.sendMessage(tabs[0].id, { extensionActive: isActive });
// //         });
// //       });
// //     });
// //   });
// document.addEventListener("DOMContentLoaded", function () {
//   const toggleCheckbox = document.getElementById("toggle-extension");
//   const toggleStatus = document.getElementById("toggle-status");

//   // Load the saved state, defaulting to off (false)
//   chrome.storage.local.get(["extensionActive"], function (result) {
//     let active = result.extensionActive || false;
//     toggleCheckbox.checked = active;
//     updateStatusText(active);
//   });

//   // Listen for changes to the toggle button
//   toggleCheckbox.addEventListener("change", function () {
//     let isActive = toggleCheckbox.checked;
//     // Save state to chrome.storage
//     chrome.storage.local.set({ extensionActive: isActive }, function () {
//       updateStatusText(isActive);
//       // Send a message to content scripts if needed
//       chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         if (tabs.length) {
//           chrome.tabs.sendMessage(tabs[0].id, { extensionActive: isActive });
//         }
//       });
//     });
//   });

//   function updateStatusText(isActive) {
//     toggleStatus.textContent = isActive ? "ON" : "OFF";
//     toggleStatus.style.color = isActive ? "#4caf50" : "#d32f2f";
//   }
// });


// scripts/ui_interface.js

document.addEventListener("DOMContentLoaded", function () {
    const toggleCheckbox = document.getElementById("toggle-extension");
    const toggleStatus = document.getElementById("toggle-status");

    // Load the saved state (defaults to off)
    chrome.storage.local.get(["extensionActive"], function (result) {
      let active = result.extensionActive || false;
      toggleCheckbox.checked = active;
      updateStatusText(active);
    });

    // Listen for toggle changes
    toggleCheckbox.addEventListener("change", function () {
      let isActive = toggleCheckbox.checked;
      chrome.storage.local.set({ extensionActive: isActive }, function () {
        updateStatusText(isActive);
        // Send a message to the active tab to update content script behavior
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
