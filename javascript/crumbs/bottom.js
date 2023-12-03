export var crumb_title = "⬇️";

console.log('bottom.js loaded');

export function ev_click()
{
	window.breadcrumbs.focus_animation($(document).height());
}