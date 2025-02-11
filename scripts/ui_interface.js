/// Handling content to replace the blocked ads
function adElement() {
    // List of possble classname
    const adClassNames = [
        '[class*="ad-"]',
        '[id*="ad-"]',
        '[class*="advertisement"]',
        '[class^="ad-"]',
        '[id^="ad-"]',
        '[id*="advertisement"]',
        '.ad-container',
        '#ad-container'
    ]

    // loop through each of the classname
    adClassNames.foreach(function (items) {
        const elements = document.querySelectorAll(items);

        elements.foreach(function (elements) {
            // setting up constants for the replacement of the blocked add
            const height = document.offsetHeight;
            const width = document.offsetwidth;
            const div = document.createElement("div");
            // setting up elements that replaces the ad contents on the webpage 
            div.className = "adContent";
            div.style.width = width + "px";
            div.style.height = height + "px";
            div.style.boxSizing = "box-sizing";
            div.style.padding = "10px";
            div.innerHTML = customCont();

            elements.parentNode = replaceChild(rep_cont, ads);
        });
    })
};

//// function that handles customizations
function customCont() {
    const media_content = [
        {
            "type": "quote",
            "content": '"The best way to predict the future is to create it."- Peter Druker'
        },
        {
            "type": "tip",
            "content": "You can always take a 5-minute break to stretch out and stay healthy!"
        },
        {
            "type": "fact",
            "content": "Do you know that Dolphins use whistles to identify each other, and respond when they hear their own name?"
        },
        {
            "type": "fact",
            "content": "Did you know that Antartica is the worlds largest desert ?"
        },
        {
            "type": "fact",
            "content": "Did you know that slug has 4 noses ?"
        }
    ]

    const randomize = contents[Math.floor(Math.random()) * contents.length];
    return `
        <div style="background: #f5f5f5 border-radius: 8px; padding: 15px; height: 100%;">
        <h3 style="margin:0 0 10px 0; color:#333;">${media_content.type.toUpperCase()}
        <p style="margin: 0; color: #666;">${media_content.content}</p> </div>
    `;
}

adElement();

document.getElementById('changeColor').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: changeColor
        });
    });
});

function changeColor() {
    document.body.style.backgroundColor = "lightblue";
}
