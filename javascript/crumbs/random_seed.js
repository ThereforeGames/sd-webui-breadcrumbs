/**
 * Description: This crumb moves the WebUI's "Random Seed" button to the breadcrumb trail.
 */

export var crumb_title = "Random_Seed";
export var crumb_type = "none";

var container = window[`breadcrumbs_container_${crumb_title.toLowerCase()}`];
var wrapper = "random-seed-wrapper";

// Append a `.random-seed-wrapper` to #breadcrumbs
$(container).append(`<section class='${wrapper}'></section>`);

// Move to #breadcrumbs
$("#txt2img_random_seed").appendTo(`${container} .${wrapper}`).attr("data-tab", "txt2img");
$("#img2img_random_seed").appendTo(`${container} .${wrapper}`).attr("data-tab", "img2img");

// Apply CSS fixes
export var $crumb = $(`${container} .${wrapper}`);