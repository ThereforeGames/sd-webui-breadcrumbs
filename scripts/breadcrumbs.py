from modules import shared, script_callbacks
import gradio as gr

print("[sd-webui-breadcrumbs] Loading settings UI...")


def on_ui_settings():
	def add_option(name, opt):
		prefix = "breadcrumbs"
		opt.section = (prefix, "Breadcrumbs")
		shared.opts.add_option(f"{prefix}_{name}", opt)

	add_option("explanation", shared.OptionHTML("""🍞 <a href='https://github.com/ThereforeGames/sd-webui-breadcrumbs'>sd-webui-breadcrumbs</a> v0.2.1 by Therefore Games adds a breadcrumb trail and makes improvements to the Quicksettings menu. <strong>You must reload the UI upon changing these settings!</strong>"""))

	add_option("show", shared.OptionInfo(True, "Show breadcrumbs", gr.Checkbox, {"interactive": True}))
	add_option("focus_panel", shared.OptionInfo(True, "Focus panel when clicking a breadcrumb", gr.Checkbox, {"interactive": True}))
	add_option("click_behavior", shared.OptionInfo("open", "Panel behavior when clicking a breadcrumb", gr.Radio, {"choices": ["open", "toggle", "none"]}))
	add_option("collapse_others", shared.OptionInfo(True, "Collapse other panels when clicking a breadcrumb", gr.Checkbox, {"interactive": True}))
	add_option("stylize_scrollbars", shared.OptionInfo(True, "Use custom CSS for scrollbars", gr.Checkbox, {"interactive": True}).info("May require a full restart or a hard refresh to take effect."))


print("[sd-webui-breadcrumbs] Finished.")

script_callbacks.on_ui_settings(on_ui_settings)
