(function()
{
	// Import jQuery
	var jquery = document.createElement("script");
	var script = document.currentScript.src;
	var folder = script.substring(0, script.lastIndexOf("/"));
	jquery.setAttribute("src", `${folder}/jquery-3.7.1.min.js`);
	document.head.appendChild(jquery);

	var button_html = "<button class='lg secondary gradio-button svelte-cmf5ev'></button>";

	onUiLoaded(breadcrumbs_init);

	// TODO: See if there's a simpler way to determine the current tab
	function get_webui_tab()
	{
		return $("#tabs > .tab-nav > button.selected").text().trim();
	}

	function add_breadcrumb(text, selector = "#stickynav #breadcrumbs")
	{
		var element = $(button_html).text(text);
		$(selector).append(element);
		return element;
	}

	function toggle_breadcrumbs()
	{
		var tab = get_webui_tab();
		// Hide breadcrumbs for the inactive tab:
		$(`#stickynav #breadcrumbs > section:not(#breadcrumb-${tab}-scripts)`).hide();
		// Show breadcrumbs for the active tab:
		$(`#stickynav #breadcrumbs > section#breadcrumb-${tab}-scripts`).show();
	}

	function breadcrumbs_init()
	{
		console.log("Loading sd-webui-breadcrumbs v0.0.1");

		$("#quicksettings").wrap("<section id='stickynav'><section id='quicksettings-wrapper'></section></section>");

		$("#stickynav").append("<section id='breadcrumbs'></section>");
		// Add a button to jump to the top of the page
		var top_button = add_breadcrumb("⬆️");
		top_button.click(function()
		{
			$("html, body").animate({ scrollTop: 0 }, "fast");
		});
		// Add a button to jump to the bottom of the page
		var bottom_button = add_breadcrumb("⬇️");
		bottom_button.click(function()
		{
			$("html, body").animate({ scrollTop: $(document).height() }, "fast");
		});

		var tab = "txt2img";
		for (var i = 0; i < 2; i++) // One for txt2img, one for img2img
		{
			$("#stickynav #breadcrumbs").append(`<section id='breadcrumb-${tab}-scripts'></section>`);
			$(`#${tab}_script_container > .styler .block.gradio-accordion[id]:first-of-type`).each(function()
			{
				var script_header = this;
				var title = $(this).find("> .label-wrap > span:first-child");
				var button = add_breadcrumb(title.text(), `#breadcrumb-${tab}-scripts`);
				var current_tab = tab;

				// Add an event listener to the button for click:
				button.click(function()
				{
					console.log("what is tab? " + current_tab);
					// First, click on any open accordions to close them:
					$(`#${current_tab}_script_container > .styler .block.gradio-accordion[id]:first-of-type > .label-wrap.open`).click();

					// Now, open the selected accordion:
					$(script_header).find("> .label-wrap").click();

					// Finally, scroll to the position of `script_header` + 9em:
					setTimeout(function()
					{
						$("html, body").animate({ scrollTop: $(script_header).offset().top - 9 * parseFloat($("body").css("font-size")) }, "fast");
					}, 1);
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
		var config = {
			attributes: false,
			childList: true,
			subtree: true,
		};

		// Start observing the target node for configured mutations
		observer.observe(targetNode, config);

		// observer.disconnect();


		// Add a button to visit the GitHub repo
		var github_button = $("<a title='Running sd-webui-breadcrumbs v0.0.1 by Therefore Games&#013;Visit us on GitHub!' href='https://github.com/thereforegames/sd-webui-breadcrumbs'><button class='lg secondary gradio-button svelte-cmf5ev'>🏠</button></a>");
		$("#stickynav #breadcrumbs").append(github_button);

		console.log("Finished.");
	}
})();