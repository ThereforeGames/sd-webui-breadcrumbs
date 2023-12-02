# 🍞 sd-webui-breadcrumbs

<p><strong>Links:</strong> ⏱ <a href="./docs/CHANGELOG.md">Changelog</a></p>

https://github.com/ThereforeGames/sd-webui-breadcrumbs/assets/95403634/f323dd91-3f22-4ba9-8ab7-044b22b40ba5

## 👋 Introduction

**sd-webui-breadcrumbs** is a simple extension for the [Stable Diffusion WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui) that adds a breadcrumb trail to the Quicksettings menu.

It also improves the usability of Quicksettings by **1)** fixing it to the top of the screen and **2)** compressing it to a single row with a horizontal scrollbar.

If you find "menu diving" between extensions to be a tedious experience, **sd-webui-breadcrumbs** is for you.

## 📦 Features

- [x] ⬆️ Top and ⬇️ Bottom buttons for quickly jumping to the top or bottom of the UI
- [x] Buttons for scrolling to individual extension panels - it also opens the extension's accordion menu for you
- [x] Tab-aware: the breadcrumb trail will update itself when you switch between txt2img and img2img
- [x] Customize the appearance and behavior of the breadcrumbs through the WebUI settings page

## 🔧 Installation

1. Visit the **Extensions** tab of Automatic's WebUI.
2. Visit the **Install from URL** subtab.
3. Paste this repo's URL into the first field: `https://github.com/ThereforeGames/sd-webui-breadcrumbs`
4. Click **Install**.

## 📝 Notes

This is an early release and there is certainly room for improvement. Please feel free to open an issue if you have any suggestions. Thank you!

At the time of writing, this extension is:

- Compatible with webkit browsers (Brave, Chrome, probably Edge)
- Compatible with WebUI dev branch
- Likely incompatible with custom themes or forks that modify the WebUI's HTML structure
- Likely incompatible with extensions that modify the Quicksettings HTML structure