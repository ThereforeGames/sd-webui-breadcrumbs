/**
 * Description: This crumb moves the WebUI's "Generate" button to the breadcrumb trail.
 */

export var crumb_title = "Generate";;
export var crumb_type = "none";

// Append a `.generate-wrapper` to #breadcrumbs
$("#breadcrumbs").append("<section class='generate-wrapper'></section>");

// Move #txt2img_generate_box to #breadcrumbs
$("#txt2img_generate_box").appendTo("#breadcrumbs .generate-wrapper").attr("data-tab", "txt2img");
$("#img2img_generate_box").appendTo("#breadcrumbs .generate-wrapper").attr("data-tab", "img2img");

// Apply CSS fixes
$("#txt2img_generate_box, #img2img_generate_box").css("display", "inline-block");
$("#txt2img_generate_box, #img2img_generate_box").css("width", "320px");
$("#txt2img_generate, #img2img_generate").css("min-height", 0);

export var $crumb = $("#breadcrumbs .generate-wrapper");