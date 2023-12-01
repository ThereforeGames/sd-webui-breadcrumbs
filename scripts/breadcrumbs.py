from modules import shared, script_callbacks
import gradio as gr

print("[sd-webui-breadcrumbs] Loading settings UI...")


def on_ui_settings():
	def add_option(name, opt):
		opt.section = ("breadcrumbs", "Breadcrumbs")
		shared.opts.add_option(name, opt)

	add_option("breadcrumbs_explanation", shared.OptionHTML("""🍞 The <a href='https://github.com/ThereforeGames/sd-webui-breadcrumbs'>sd-webui-breadcrumbs</a> extension by <a href='https://therefore.games'>Therefore Games</a> adds a breadcrumb trail and makes improvements to the Quicksettings menu. <strong>You must reload the UI upon changing these settings!</strong>"""))
	add_option("breadcrumbs_click_behavior", shared.OptionInfo("open", "Panel behavior when clicking a breadcrumb", gr.Radio, {"choices": ["open", "toggle", "none"]}))
	add_option("breadcrumbs_collapse_others", shared.OptionInfo(True, "Collapse other panels when clicking a breadcrumb", gr.Checkbox, {"interactive": True}))
	add_option("breadcrumbs_stylize_scrollbars", shared.OptionInfo(True, "Use custom CSS for scrollbars", gr.Checkbox, {"interactive": True}).info("May require a full restart or a hard refresh to take effect."))


print("[sd-webui-breadcrumbs] Finished.")

script_callbacks.on_ui_settings(on_ui_settings)
