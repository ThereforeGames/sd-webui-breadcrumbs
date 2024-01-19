/**
 * Description: This crumb moves the WebUI's "Generate" button to the breadcrumb trail.
 */

export var crumb_title = "Generate";
export var crumb_type = "none";
var container = window[`breadcrumbs_container_${crumb_title.toLowerCase()}`];

// Append a `.generate-wrapper` to #breadcrumbs
$(container).append("<section class='generate-wrapper'></section>");

// Move #txt2img_generate_box to #breadcrumbs
$("#txt2img_generate_box").appendTo(`${container} .generate-wrapper`).attr("data-tab", "txt2img");
$("#img2img_generate_box").appendTo(`${container} .generate-wrapper`).attr("data-tab", "img2img");

// Apply CSS fixes
$("#txt2img_generate_box, #img2img_generate_box").css("display", "inline-block");
$("#txt2img_generate_box, #img2img_generate_box").css("width", "320px");
$("#txt2img_generate, #img2img_generate").css("min-height", 0);

export var $crumb = $(`${container} .generate-wrapper`);