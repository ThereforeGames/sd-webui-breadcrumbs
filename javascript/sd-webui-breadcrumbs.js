(function()
{
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
	default_config = null;
	button_html = "";
	container_element = "#breadcrumbs-wrapper";
	main_app_element = "gradio-app > div";

	// WebUI listeners
	onUiLoaded(breadcrumbs_init);

	// TODO: See if there's a simpler way to determine the current tab
	function get_webui_tab()
	{
		return $("#tabs > .tab-nav > button.selected").text().trim();
	}

	function add_breadcrumb(text, index = -1, selector = `${container_element} #breadcrumbs`, tab_attr = null)
	{
		debug((`Adding breadcrumb: ${text} to ${selector} at position ${index}`));
		let element = $(button_html).text(text);
		insert_at(selector, index, element);
		if (index > -1) element.attr("position", index);
		if (tab_attr) element.attr("data-tab", tab_attr);
		return element;
	}

	function toggle_breadcrumbs()
	{
		let tab = get_webui_tab();
		// Show breadcrumbs for the active tab, as well as breadcrumbs without a data-tab attr:
		$(`${container_element} #breadcrumbs > *[data-tab=${tab}], ${container_element} #breadcrumbs > *:not([data-tab]), ${container_element} #breadcrumbs > section > *[data-tab=${tab}], ${container_element} #breadcrumbs > section > *:not([data-tab])`).show().each(function()
		{
			// Select descendent button elements with an `element` attr:
			$(this).find("button[element]").each(function()
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
		});
		// Hide breadcrumbs for the inactive tab:
		$(`${container_element} #breadcrumbs > *[data-tab]:not([data-tab=${tab}]) *, ${container_element} #breadcrumbs > section > *[data-tab]:not([data-tab=${tab}])`).hide();
	}

	// Global values, available in external modules
	window.breadcrumbs =
	{
		focus_animation: function(position, element = "html, body")
		{
			$(element).animate({ scrollTop: position }, config.breadcrumbs_animation_duration, config.breadcrumbs_animation_easing);
		},
	};

	function debug(message)
	{
		if (config.breadcrumbs_debug) console.debug(message);
	}

	function insert_at(element_string, index, new_element)
	{
		debug(`Inserting element at index ${index} in ${element_string}`);
		let parent = $(`${element_string}`);

		if (parent.children().length == 0 || index == -1)
		{
			parent.append(new_element);
		}
		else
		{
			parent.children().eq(index - 1).before(new_element);
		}
	}

	function breadcrumbs_init()
	{
		// Load defaults
		$.getJSON(`${current_folder}/../defaults.json`, function(data)
		{
			default_config = data;
			console.log(`Loading sd-webui-breadcrumbs v${default_config.breadcrumbs_version}...`);

			// Parse user settings now that the defaults are ready
			$.getJSON("file=config.json", function(data)
			{
				config = Object.assign({}, default_config, data);
				load_html();
			}).fail(function(jqxhr, textStatus, error)
			{
				var err = textStatus + ", " + error;
				console.error("Error trying to read `config.json` file: " + err);
			});
		}
		).fail(function(jqxhr, textStatus, error)
		{
			var err = textStatus + ", " + error;
			console.error("Error trying to read `default_config.json` file: " + err);
		});

		function load_html()
		{

			$("#quicksettings").wrap("<section id='breadcrumbs-wrapper'><section id='quicksettings-wrapper'></section></section>");
			if (config.breadcrumbs_sticky)
			{
				$(main_app_element).addClass("breadcrumbs-sticky");
			}
			if (config.breadcrumbs_stylize_scrollbars)
			{
				$(main_app_element).addClass("stylized-scrollbars");
			}
			if (config.breadcrumbs_screen_placement == "bottom")
			{
				$(main_app_element).addClass("bottom-breadcrumbs");
			}

			if (config.breadcrumbs_show)
			{
				// Initialize visual style
				$(main_app_element).addClass(`${config.breadcrumbs_visual_style}-breadcrumb-style`);
				if (config.breadcrumbs_visual_style == "small")
				{
					button_html = "<button class='sm secondary gradio-button svelte-cmf5ev'></button>";
				}
				else if (config.breadcrumbs_visual_style == "large")
				{
					button_html = "<button class='lg secondary gradio-button svelte-cmf5ev'></button>";
				}

				if (config.breadcrumbs_relative_placement == "after") $(container_element).append("<section id='breadcrumbs'></section>");
				else $(container_element).prepend("<section id='breadcrumbs'></section>");

				// Load the crumb layout files
				debug(`Loading crumb layout files... ${config.breadcrumbs_crumb_layout}`);
				var deferreds = [];
				$.each(config.breadcrumbs_crumb_layout, function(index, value)
				{
					var deferred = $.Deferred();
					deferreds.push(deferred);

					// Support hardcoded crumbs
					if (value == "extensions")
					{
						debug("Loading hardcoded `extensions` crumb...");
						var extensions_wrapper = `<section class='extensions-wrapper' position=${index}></section>`;
						// Append the wrapper to the breadcrumbs container
						insert_at(`${container_element} #breadcrumbs`, index, extensions_wrapper);

						var tabs = ["txt2img", "img2img"];
						for (let tab of tabs)
						{
							var tab_section = $(`<section id='breadcrumbs-${tab}-scripts' data-tab='${tab}'></section>`);
							$(".extensions-wrapper").append(tab_section);

							$(`#${tab}_script_container > .styler .block.gradio-accordion[id]:first-of-type`).each(function()
							{
								var script_header = this;
								var current_tab = tab;
								var title = $(this).find("> .label-wrap > span:first-child");
								var button = add_breadcrumb(title.text(), -1, `#breadcrumbs-${tab}-scripts`);
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
									var element = $(main_app_element);
									if (config.breadcrumbs_screen_placement == "bottom" || !config.breadcrumbs_sticky) var nav_height = 0;
									else var nav_height = parseInt(element.css("--stickynav-height"), 10);

									if (config.breadcrumbs_focus_panel)
									{
										setTimeout(function()
										{
											window.breadcrumbs.focus_animation($(script_header).offset().top - nav_height * parseFloat($("body").css("font-size")));
										}, 1);
									}
								});
							});
						}

						deferred.resolve();
					}
					else
					{
						debug(`Async loading \`${value}\` crumb...`);
						import(`${current_folder}/crumbs/${value}.js`).then(function(module)
						{
							debug(`Loaded ${value}`);
							// Add a button for each crumb
							var crumb_type = module.crumb_type ? module.crumb_type : "button";
							if (crumb_type == "button")
							{
								var crumb = add_breadcrumb(module.crumb_title, index);
								crumb.click(module.ev_click);
							}
							else
							{
								module.$crumb.attr("position", index);

								// Fix the visual style of the crumb
								if (config.breadcrumbs_visual_style == "small")
								{
									module.$crumb.find("button.lg").removeClass("lg").addClass("sm");
								}
							}
							deferred.resolve();
						}).catch(function(exception)
						{
							console.error(`Error loading crumb ${value}: ${exception}`);
							deferred.resolve();
						});
					}
				});

				$.when.apply($, deferreds).done(function()
				{
					debug("Done async loading crumbs.");

					var $breadcrumbs = $(`${container_element} #breadcrumbs > *`);

					// Sort the elements based on the `position` attribute
					$breadcrumbs.sort(function(a, b)
					{
						return +a.getAttribute('position') - +b.getAttribute('position');
					});

					// Remove all existing breadcrumb elements from the DOM (detach keeps the event listeners intact)
					$(`${container_element} #breadcrumbs > *`).detach();

					// Append the sorted breadcrumb elements back to the DOM
					$breadcrumbs.appendTo(`${container_element} #breadcrumbs`);

					toggle_breadcrumbs();
				});

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
				$(main_app_element).addClass("no-breadcrumbs");
			}

			console.log("Finished.");
		}
	}
})();