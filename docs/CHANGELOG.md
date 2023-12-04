# Changelog
All notable changes to this project will be documented in this file.

## 0.7.0 - 4 December 2023
### Added
- New crumb `generate`: Moves the WebUI's "Generate" button to the breadcrumb trail
- Improved robustness of `toggle_breadcrumbs()` method: any crumb can now specify a `data-tab` attribute to only show up on a certain tab

### Changed
- Adjusted padding around output panel for better visibility
- General code cleanup

## 0.6.1 - 3 December 2023
### Fixed
- Fixed `extensions` crumb not adhering to its given position

## 0.6.0 - 3 December 2023
### Added
- New setting `breadcrumbs_crumb_layout`: Breadcrumbs are now loaded as individual modules from the `javascript/crumbs` folder, and you can choose which ones to load as well as their order
- More debug messages
- New crumb `github`: Opens the sd-webui-breadcrumbs GitHub repo (this button is disabled by default)

### Fixed
- Minor improvements to margins and padding
- Fixed `breadcrumbs_screen_placement` bottom mode
- Fixed horizontal scrollbar appearing before breadcrumbs are loaded

## 0.5.0 - 2 December 2023
### Added
- New setting `breadcrumbs_relative_placement`: Whether to place the breadcrumbs before or after the Quicksettings menu
- New setting `breadcrumbs_sticky`: Whether to fix the breadcrumbs to the screen

### Changed
- Default settings are now loaded from `defaults.json`

## 0.4.0 - 2 December 2023
### Added
- New setting `breadcrumbs_visual_style`: Whether to render the breadcrumbs as `small` or `large` buttons
- New setting `breadcrumbs_debug`: Whether to log debug messages to the browser console

### Changed
- Accordions that are completely hidden on page load or tab switch will no longer be included in the breadcrumb trail
- The default `breadcrumb_visual_style` is now `small`

## 0.3.0 - 2 December 2023
### Added
- New setting `breadcrumbs_screen_placement`: Where to place the quicksettings menu, either top or bottom of the screen
- New setting `breadcrumbs_animation_duration`: How long it takes for the focus animation to complete, in milliseconds
- New setting `breadcrumbs_animation_easing`: Name of the easing function to use with the focus animation

### Changed
- Adapted stylesheet to SASS

### Fixed
- `breadcrumbs_show`: Reduced vertical padding when breadcrumbs are hidden

## 0.2.1 - 1 December 2023
### Removed
- GitHub button removed per requirements here: https://github.com/AUTOMATIC1111/stable-diffusion-webui-extensions/pull/240

## 0.2.0 - 1 December 2023
### Added
- New setting `breadcrumbs_show`: Show or hide the breadcrumb trail
- New setting `breadcrumbs_focus_panel`: Whether to focus the panel when clicking a breadcrumb

### Fixed
- Ensure that `sd-webui-breadcrumbs.js` loads the correct default settings on first use

## 0.1.0 - 1 December 2023
### Added
- WebUI settings page; more options to come soon
- New setting `breadcrumbs_click_behavior`: How panels behave when clicking a breadcrumb (open, toggle, none)
- New setting `breadcrumbs_collapse_others`: Whether to collapse other panels when clicking a breadcrumb
- New setting `breadcrumbs_stylize_scrollbars`: Whether to use custom CSS for scrollbars

### Changed
- General code cleanup
- Changed the 🏠 to a 🍞 for obvious reasons

## 0.0.1 - 1 December 2023
### Added
- Initial release