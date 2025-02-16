// /*
// /// Handling content to replace the blocked ads
// function adElement() {
//     // List of possble classname
//     const adClassNames = [
//         '[class*="ad-"]',
//         '[id*="ad-"]',
//         '[class*="advertisement"]',
//         '[class^="ad-"]',
//         '[id^="ad-"]',
//         '[id*="advertisement"]',
//         '.ad-container',
//         '#ad-container'
//     ]

//     // loop through each of the classname
//     adClassNames.foreach(function (items) {
//         const elements = document.querySelectorAll(items);

//         elements.foreach(function (elements) {
//             // setting up constants for the replacement of the blocked add
//             const height = document.offsetHeight;
//             const width = document.offsetwidth;
//             const div = document.createElement("div");
//             // setting up elements that replaces the ad contents on the webpage
//             div.className = "adContent";
//             div.style.width = width + "px";
//             div.style.height = height + "px";
//             div.style.boxSizing = "box-sizing";
//             div.style.padding = "10px";
//             div.innerHTML = customCont();

//             elements.parentNode = replaceChild(rep_cont, ads);
//         });
//     })
// };

// //// function that handles customizations
// function customCont() {
//     const media_content = [
//         {
//             "type": "quote",
//             "content": '"The best way to predict the future is to create it."- Peter Druker'
//         },
//         {
//             "type": "tip",
//             "content": "You can always take a 5-minute break to stretch out and stay healthy!"
//         },
//         {
//             "type": "fact",
//             "content": "Do you know that Dolphins use whistles to identify each other, and respond when they hear their own name?"
//         },
//         {
//             "type": "fact",
//             "content": "Did you know that Antartica is the worlds largest desert ?"
//         },
//         {
//             "type": "fact",
//             "content": "Did you know that slug has 4 noses ?"
//         }
//     ]

//     const randomize = contents[Math.floor(Math.random()) * contents.length];
//     return `
//         <div style="background: #f5f5f5 border-radius: 8px; padding: 15px; height: 100%;">
//         <h3 style="margin:0 0 10px 0; color:#333;">${media_content.type.toUpperCase()}
//         <p style="margin: 0; color: #666;">${media_content.content}</p> </div>
//     `;
// }

// adElement();
// */
// document.getElementById('changeColor').addEventListener('click', function() {
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//         chrome.scripting.executeScript({
//             target: { tabId: tabs[0].id },
//             func: changeColor
//         });
//     });
// });

// function changeColor() {
//     document.body.style.backgroundColor = "lightblue";
// }

document.addEventListener("DOMContentLoaded", function() {
    const toggleBtn = document.getElementById("toggle-btn");
    const statusText = document.getElementById("status-text");

    // Load the saved state (default is off)
    chrome.storage.local.get(["extensionActive"], function(result) {
      let active = result.extensionActive || false;
      updateUI(active);
    });

    // When the button is clicked, toggle the state.
    toggleBtn.addEventListener("click", function() {
      chrome.storage.local.get(["extensionActive"], function(result) {
        let active = result.extensionActive || false;
        let newState = !active;
        // Save the new state.
        chrome.storage.local.set({ extensionActive: newState }, function() {
          updateUI(newState);
          // Notify the active tab to update ad replacement.
          chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs.length) {
              chrome.tabs.sendMessage(tabs[0].id, { extensionActive: newState });
            }
          });
        });
      });
    });

    function updateUI(isActive) {
      if (isActive) {
        toggleBtn.textContent = "Deactivate Extension";
        statusText.textContent = "Extension is ON";
        statusText.style.color = "#4caf50";
      } else {
        toggleBtn.textContent = "Activate Extension";
        statusText.textContent = "Extension is OFF";
        statusText.style.color = "#d32f2f";
      }
    }
  });
