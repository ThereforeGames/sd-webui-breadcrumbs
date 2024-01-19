/**
 * Description: This crumb moves the WebUI's "Reuse Seed" button to the breadcrumb trail.
 */

export var crumb_title = "Reuse_Seed";
export var crumb_type = "none";

var container = window[`breadcrumbs_container_${crumb_title.toLowerCase()}`];
var wrapper = "reuse-seed-wrapper";

// Append a `.reuse-seed-wrapper` to #breadcrumbs
$(container).append(`<section class='${wrapper}'></section>`);

// Move to #breadcrumbs
$("#txt2img_reuse_seed").appendTo(`${container} .${wrapper}`).attr("data-tab", "txt2img");
$("#img2img_reuse_seed").appendTo(`${container} .${wrapper}`).attr("data-tab", "img2img");

// Apply CSS fixes
export var $crumb = $(`${container} .${wrapper}`);