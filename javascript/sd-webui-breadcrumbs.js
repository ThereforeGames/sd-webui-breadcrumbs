(function()
{
	const version = "0.4.0";
	console.log(`Loading sd-webui-breadcrumbs v${version}...`);

	// Import jQuery
	const jquery = document.createElement("script");
	const current_script = document.currentScript.src;
	const current_folder = current_script.substring(0, current_script.lastIndexOf("/"));
	jquery.setAttribute("src", `${current_folder}/jquery-3.7.1.min.js`);
	jquery.addEventListener("error", function(event)
	{
		console.error("Error loading jQuery:", event);
	});
	document.head.appendChild(jquery);

	config = null;
	button_html = "";

	// WebUI listeners
	onUiLoaded(breadcrumbs_init);

	// TODO: See if there's a simpler way to determine the current tab
	function get_webui_tab()
	{
		return $("#tabs > .tab-nav > button.selected").text().trim();
	}

	function add_breadcrumb(text, selector = "#stickynav #breadcrumbs")
	{
		let element = $(button_html).text(text);
		$(selector).append(element);
		return element;
	}

	function toggle_breadcrumbs()
	{
		let tab = get_webui_tab();
		// Hide breadcrumbs for the inactive tab:
		$(`#stickynav #breadcrumbs > section:not(#breadcrumb-${tab}-scripts)`).hide();
		// Show breadcrumbs for the active tab:
		$(`#stickynav #breadcrumbs > section#breadcrumb-${tab}-scripts`).show();

		// Hide buttons that correspond to hidden panels
		$(`#stickynav #breadcrumbs > section#breadcrumb-${tab}-scripts button`).each(function()
		{
			if ($(`${$(this).attr("element")}`).is(":hidden"))
			{
				$(this).hide();
				debug(`Hiding breadcrumb button for panel #${$(this).attr("element")}`);
			}
			else
			{
				$(this).show();
			}
		});
	}

	function focus_animation(position, element = "html, body")
	{
		$(element).animate({ scrollTop: position }, config.breadcrumbs_animation_duration, config.breadcrumbs_animation_easing);
	}

	function debug(message)
	{
		if (config.breadcrumbs_debug) console.debug(message);
	}

	function breadcrumbs_init()
	{
		const default_config = {
			breadcrumbs_screen_placement: "top",
			breadcrumbs_visual_style: "small",
			breadcrumbs_show: true,
			breadcrumbs_focus_panel: true,
			breadcrumbs_animation_easing: "swing",
			breadcrumbs_animation_duration: 200,
			breadcrumbs_click_behavior: "open",
			breadcrumbs_collapse_others: true,
			breadcrumbs_stylize_scrollbars: true,
			breadcrumbs_debug: false
		};

		// Parse user settings
		$.getJSON("file=config.json", function(data)
		{
			config = Object.assign({}, default_config, data);
			load_html();
		}).fail(function(jqxhr, textStatus, error)
		{
			var err = textStatus + ", " + error;
			console.error("Error trying to read `config.json` file: " + err);
		});

		function load_html()
		{
			$("#quicksettings").wrap("<section id='stickynav'><section id='quicksettings-wrapper'></section></section>");
			if (config.breadcrumbs_stylize_scrollbars)
			{
				$("#stickynav").addClass("stylized-scrollbars");
			}
			if (config.breadcrumbs_screen_placement == "bottom")
			{
				$("gradio-app > div").addClass("bottom-breadcrumbs");
			}

			if (config.breadcrumbs_show)
			{
				// Initialize visual style
				$("gradio-app > div").addClass(`${config.breadcrumbs_visual_style}-breadcrumb-style`);
				if (config.breadcrumbs_visual_style == "small")
				{
					button_html = "<button class='sm secondary gradio-button svelte-cmf5ev'></button>";
				}
				else if (config.breadcrumbs_visual_style == "large")
				{
					button_html = "<button class='lg secondary gradio-button svelte-cmf5ev'></button>";
				}

				$("#stickynav").append("<section id='breadcrumbs'></section>");
				// Add a button to jump to the top of the page
				var top_button = add_breadcrumb("⬆️");
				top_button.click(function()
				{
					focus_animation(0);
				});
				// Add a button to jump to the bottom of the page
				var bottom_button = add_breadcrumb("⬇️");
				bottom_button.click(function()
				{
					focus_animation($(document).height());
				});

				var tab = "txt2img";
				for (let i = 0; i < 2; i++) // One for txt2img, one for img2img
				{
					$("#stickynav #breadcrumbs").append(`<section id='breadcrumb-${tab}-scripts'></section>`);
					$(`#${tab}_script_container > .styler .block.gradio-accordion[id]:first-of-type`).each(function()
					{
						var script_header = this;
						var current_tab = tab;
						var title = $(this).find("> .label-wrap > span:first-child");
						var button = add_breadcrumb(title.text(), `#breadcrumb-${tab}-scripts`);
						var panel_id = $(this).attr("id");
						button.attr("element", `#tab_${tab} #${panel_id}`);

						// Add an event listener to the button for click:
						button.click(function()
						{
							// First, click on any open accordions to close them:
							$(`#${current_tab}_script_container > .styler .block.gradio-accordion[id]:first-of-type > .label-wrap.open`).each(function()
							{
								if ($(this).parent().attr("id") != panel_id)
								{
									if (config.breadcrumbs_collapse_others) $(this).click();
								}
								else if (config.breadcrumbs_click_behavior == "open")
								{
									$(this).click();
								}
							});

							// Now, open the selected accordion:
							if (config.breadcrumbs_click_behavior != "none")
							{
								$(script_header).find("> .label-wrap").click();
							}

							// Finally, scroll to the position of `script_header`
							var element = $("gradio-app>div");
							if (config.breadcrumbs_screen_placement == "bottom") var nav_height = 0;
							else var nav_height = parseInt(element.css("--stickynav-height"), 10);

							if (config.breadcrumbs_focus_panel)
							{
								setTimeout(function()
								{
									focus_animation($(script_header).offset().top - nav_height * parseFloat($("body").css("font-size")));
								}, 1);
							}
						});
					});

					tab = "img2img";
				}

				// Hide breadcrumbs for the inactive tab:
				toggle_breadcrumbs();

				// TODO: The click event for "#tabs > .tab-nav > button" doesn't seem to fire, possibly due to the way Gradio 3.x tabs are handled.
				// It feels like this is an overengineered solution for tracking tab changes, but it works.
				var targetNode = $("#tabs > .tab-nav")[0]; // Using [0] to get the raw DOM element

				// Create a MutationObserver instance
				var observer = new MutationObserver(function(mutations)
				{
					toggle_breadcrumbs();
				});

				// Configuration of the MutationObserver
				var observer_config = {
					attributes: false,
					childList: true,
					subtree: true,
				};

				// Start observing the target node for configured mutations
				observer.observe(targetNode, observer_config);
			}
			else
			{
				$("gradio-app > div").addClass("no-breadcrumbs");
			}

			console.log("Finished.");
		}
	}
})();