from modules import shared, script_callbacks, scripts, ui_components
import gradio as gr

base_dir = scripts.basedir()

# Load default settings
import json
with open(f"{base_dir}/defaults.json", "r") as f:
	defaults = json.load(f)

# TODO: Consider replacing print statements with Python logging module if we end up printing a lot of stuff.
log_prefix = f"[sd-webui-breadcrumbs v{defaults['breadcrumbs_version']}]"

print(f"{log_prefix} Loading settings UI...")


def on_ui_settings():
	def add_option(name, label, component=None, kwargs={}, info="", opt=shared.OptionInfo):
		prefix = "breadcrumbs"
		name = f"{prefix}_{name}"
		if opt == shared.OptionInfo:
			opt = opt(defaults[name], label, component, kwargs)
		else:
			opt = opt(label)
		if info:
			opt.info(info)
		opt.section = (prefix, "Breadcrumbs")
		shared.opts.add_option(name, opt)

	# Load a list of files in the `sd-webui-breadcrumbs/javascript/crumbs` directory.
	import os
	crumb_files = ["extensions"]
	for file in os.listdir(f"{base_dir}/javascript/crumbs"):
		if file.endswith(".js"):
			crumb_files.append(file[:-3])

	add_option("explanation", f"🍞 <a href='https://github.com/ThereforeGames/sd-webui-breadcrumbs'>sd-webui-breadcrumbs</a> v{defaults['breadcrumbs_version']} by Therefore Games adds a breadcrumb trail and makes improvements to the Quicksettings menu. <strong>Due to browser caching, you may need to hard refresh (CTRL+F5) or, in some cases, fully restart the WebUI upon changing these settings!</strong>", opt=shared.OptionHTML)
	add_option("crumb_layout", "Crumb layout", ui_components.DropdownMulti, {"choices": crumb_files}, "Breadcrumb files are located in the `sd-webui-breadcrumbs/javascript/crumbs` directory.")
	add_option("favorite_crumbs", "Favorite crumbs", ui_components.DropdownMulti, {"choices": crumb_files}, "Pin your favorite crumbs to the side of the breadcrumbs bar.")
	add_option("screen_placement", "Screen placement", gr.Radio, {"choices": ["top", "bottom"]}, "Only works when sticky.")
	add_option("relative_placement", "Breadcrumbs placement relative to Quicksettings", gr.Radio, {"choices": ["before", "after"]})
	add_option("visual_style", "Breadcrumbs visual style", gr.Radio, {"choices": ["small", "large"]})
	add_option("show", "Show breadcrumbs", gr.Checkbox, {"interactive": True})
	add_option("sticky", "Make it sticky", gr.Checkbox, {"interactive": True})
	add_option("focus_panel", "Focus panel when clicking a breadcrumb", gr.Checkbox, {"interactive": True})
	add_option("animation_easing", "Focus animation easing type", gr.Radio, {"choices": ["swing", "linear"]})
	add_option("animation_duration", "Focus animation duration in milliseconds", gr.Slider, {"minimum": 0, "maximum": 1000, "step": 10, "interactive": True}, "Set to 0 for instant focus.")
	add_option("click_behavior", "Panel behavior when clicking a breadcrumb", gr.Radio, {"choices": ["open", "toggle", "none"]})
	add_option("collapse_others", "Collapse other panels when clicking a breadcrumb", gr.Checkbox, {"interactive": True})
	add_option("stylize_scrollbars", "Use custom CSS for scrollbars", gr.Checkbox, {"interactive": True})
	add_option("debug", "Debug", gr.Checkbox, {"interactive": True}, "Messages will be logged to the browser console.")


print(f"{log_prefix} Finished.")

script_callbacks.on_ui_settings(on_ui_settings)
