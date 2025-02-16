<!-- # AdFriend
Is a Chrome extension that intercepts and replaces ads elements on web pages with positive contents or widgets.
A modification. -->

# AdFriend

AdFriend is a Chrome extension designed to transform your browsing experience by replacing traditional ad elements with positive, uplifting content. Whether it's motivational quotes, productivity tips, interesting facts, or quick activity reminders, AdFriend turns intrusive ads into opportunities for inspiration and well-being.

---

## Features

- **Ad Replacement:**
  Detects and replaces ad elements (e.g., banners, iframes, sponsored content) on web pages with custom, positive messages.

- **Dynamic Content:**
  Displays a variety of content types including motivational quotes, productivity tips, fun facts, and activity reminders to keep you energized and focused.

- **Customizable UI:**
  The replaced ad elements are styled with a glossy, bubble-like design inspired by the AdFriend logo, featuring dynamic gradients, subtle reflections, and smooth hover effects.

- **Toggle Activation:**
  A user-friendly popup provides a toggle button to easily activate or deactivate the ad replacement functionality without affecting your browsing experience.

- **Real-Time Updates:**
  Uses a MutationObserver to dynamically detect and replace ads as new content loads on the page.

- **Declarative Net Request:**
  Blocks common ad domains using Chrome’s Declarative Net Request API to reduce unwanted distractions.

---

## Installation

1. **Clone or Download the Repository:**

   ```bash
   git clone https://github.com/dohoudaniel/AdFriend.git
   cd AdFriend
   ```

2. **Load the Extension in Chrome:**

   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" using the toggle in the top-right corner.
   - Click on "Load unpacked" and select the root folder of the AdFriend extension.

3. **Verify Installation:**

   - The AdFriend icon should now appear in your Chrome toolbar.
   - Click on the icon to open the popup and toggle the extension ON or OFF.

---

## Usage

1. **Activating AdFriend:**

   - Click the AdFriend icon in the Chrome toolbar.
   - In the popup window, use the toggle button to activate the extension. When activated, the status will change to "ON", and AdFriend will begin replacing ad elements on web pages with positive content.

2. **Deactivating AdFriend:**

   - To disable the ad replacement functionality, simply toggle the switch in the popup to turn it off. The status will change to "OFF", and AdFriend will stop replacing ads.

3. **Enjoy a Positive Browsing Experience:**

   - With AdFriend activated, enjoy a refreshed browsing experience where ads are replaced with motivational and helpful content, designed to boost your productivity and well-being.

---

## File Structure

```
AdFriend/
├── manifest.json            # Chrome extension manifest
├── rules.json               # Blocking rules for common ad domains
├── scripts/
│   ├── content.js           # Content script for ad detection and replacement
│   ├── ui_interface.js      # Popup UI logic for toggle activation
│   └── background_process.js (optional) # Background service worker (if used)
├── ui/
│   ├── ui_interface.html    # Popup HTML interface
│   ├── css/
│   │   └── styles.css       # Styles for the popup and replaced ads
│   └── icons/
│       └── logo.png         # AdFriend logo used in the UI
└── README.md                # This file
```

---

## Contributing

Contributions are welcome! If you have ideas for new features, improvements, or bug fixes, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **Chrome Extensions Documentation:**
  [Chrome Developer Docs](https://developer.chrome.com/docs/extensions/mv3/)

- **Inspirational Content:**
  A big thank you to all the creators of motivational quotes, tips, and facts that inspire us every day.
<!--
---

Enjoy a more positive and productive browsing experience with AdFriend! -->