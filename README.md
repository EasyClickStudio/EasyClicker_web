# EasyClicker Web

EasyClicker Web is a lightweight and reliable browser extension designed for click automation. It allows you to automate clicks on any webpage or web application with customizable intervals, random delays, and hotkey support.

---

## Features

- Fast and Lightweight: Operates locally within your browser without slowing down your system.
- Custom Click Intervals: Set your preferred delay between clicks in milliseconds.
- Random Time Offset: Adds a random delay to simulate natural human clicking behavior.
- Global Hotkey Control: Quickly start and stop clicking using a single key (default is F8).
- Multi-Layout Support: Hotkeys work reliably regardless of your active keyboard layout (e.g., English or any other).
- Clean Dark Interface: Simple UI designed for fast setup.

---

## Installation Guide

1. Download or clone this repository to your computer.
2. Extract the ZIP file to a folder of your choice.
3. Open your browser and navigate to the extensions page:
   - Google Chrome: `chrome://extensions/`
   - Microsoft Edge: `edge://extensions/`
   - Brave: `brave://extensions/`
4. Turn on **Developer mode** in the top right corner of the page.
5. Click the **Load unpacked** button.
6. Select the folder containing the extension files.

---

## How to Use

1. Click the EasyClicker icon in your browser toolbar to open the control panel.
2. Enter your desired **Click Interval** (in milliseconds).
3. Set a **Random Offset** if you want to randomize click timing.
4. Keep the default hotkey (`F8`) or click the button to set a new key.
5. Hover your mouse over the element you want to click on the webpage.
6. Press the hotkey to start clicking.
7. Press the hotkey again to stop.

---

## Project Structure

- `manifest.json` — Extension configuration file (Manifest V3).
- `popup.html` — Layout for the extension popup menu.
- `popup.js` — Logic for managing user settings and hotkey binding.
- `content.js` — Script that simulates clicks on the target webpage.
- `icon.png` — Extension icon.

---

## License

Copyright (c) 2026. All Rights Reserved. See the LICENSE file for details.
