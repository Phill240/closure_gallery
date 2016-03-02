goog.addDependency('../../../src/js/slider.js', ['my.gallery.Slider'], []);
goog.addDependency('../../../src/js/templates.soy.js', ['my.gallery.templates'], []);

goog.provide('my');
goog.provide('my.gallery');
goog.provide('my.gallery.Gallery');

goog.require('goog.dom');
goog.require('my.gallery.Slider');
goog.require('my.gallery.templates');

my.gallery.Gallery = function(photos, region) {
  this.photos = photos;
  this.region = region
  this.render();
}

my.gallery.Gallery.prototype.render = function() {
  var frame = soy.renderAsFragment(my.gallery.templates.mainView);
  goog.dom.appendChild(this.region, frame);
  this.slider = new my.gallery.Slider(this.photos, frame);
}