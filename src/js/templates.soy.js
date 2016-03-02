// This file was automatically generated from templates.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace my.gallery.templates.
 */

goog.provide('my.gallery.templates');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
my.gallery.templates.photoView = function(opt_data, opt_ignored) {
  return '<div class="gallery-photo"><div class="gallery-photo__img" style="background-image: url(\'' + soy.$$escapeHtml(opt_data.url) + '\');"></div></div>';
};
if (goog.DEBUG) {
  my.gallery.templates.photoView.soyTemplateName = 'my.gallery.templates.photoView';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
my.gallery.templates.mainView = function(opt_data, opt_ignored) {
  return '<div class="gallery-frame">\t</div>';
};
if (goog.DEBUG) {
  my.gallery.templates.mainView.soyTemplateName = 'my.gallery.templates.mainView';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
my.gallery.templates.sliderView = function(opt_data, opt_ignored) {
  return '<div class="gallery-slider"> </div>';
};
if (goog.DEBUG) {
  my.gallery.templates.sliderView.soyTemplateName = 'my.gallery.templates.sliderView';
}
