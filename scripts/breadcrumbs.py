from modules import shared, script_callbacks
import gradio as gr

print("[sd-webui-breadcrumbs] Loading settings UI...")


def on_ui_settings():
	def add_option(name, opt):
		prefix = "breadcrumbs"
		opt.section = (prefix, "Breadcrumbs")
		shared.opts.add_option(f"{prefix}_{name}", opt)

	add_option("explanation", shared.OptionHTML("""🍞 <a href='https://github.com/ThereforeGames/sd-webui-breadcrumbs'>sd-webui-breadcrumbs</a> v0.4.0 by Therefore Games adds a breadcrumb trail and makes improvements to the Quicksettings menu. <strong>Due to browser caching, you may need to hard refresh (CTRL+F5) or, in some cases, fully restart the WebUI upon changing these settings!</strong>"""))
	add_option("screen_placement", shared.OptionInfo("top", "Screen placement", gr.Radio, {"choices": ["top", "bottom"]}))
	add_option("visual_style", shared.OptionInfo("small", "Breadcrumbs visual style", gr.Radio, {"choices": ["small", "large"]}))
	add_option("show", shared.OptionInfo(True, "Show breadcrumbs", gr.Checkbox, {"interactive": True}))
	add_option("focus_panel", shared.OptionInfo(True, "Focus panel when clicking a breadcrumb", gr.Checkbox, {"interactive": True}))
	add_option("animation_easing", shared.OptionInfo("swing", "Focus animation easing type", gr.Radio, {"choices": ["swing", "linear"]}))
	add_option("animation_duration", shared.OptionInfo(200, "Focus animation duration in milliseconds", gr.Slider, {"minimum": 0, "maximum": 1000, "step": 10, "interactive": True}).info("Set to 0 for instant focus."))
	add_option("click_behavior", shared.OptionInfo("open", "Panel behavior when clicking a breadcrumb", gr.Radio, {"choices": ["open", "toggle", "none"]}))
	add_option("collapse_others", shared.OptionInfo(True, "Collapse other panels when clicking a breadcrumb", gr.Checkbox, {"interactive": True}))
	add_option("stylize_scrollbars", shared.OptionInfo(True, "Use custom CSS for scrollbars", gr.Checkbox, {"interactive": True}))
	add_option("debug", shared.OptionInfo(False, "Debug", gr.Checkbox, {"interactive": True}).info("Messages will be logged to the browser console."))


print("[sd-webui-breadcrumbs] Finished.")

script_callbacks.on_ui_settings(on_ui_settings)
