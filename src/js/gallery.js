goog.addDependency('../../../src/js/slider.js', ['my.gallery.Slider'], []);

goog.provide('my');
goog.provide('my.gallery');
goog.provide('my.gallery.Gallery');

goog.require('goog.dom');
goog.require('my.gallery.Slider');

my.gallery.Gallery = function(photos, region) {
  this.photos = photos;
  this.region = region
  this.render();
}

my.gallery.Gallery.prototype.render = function() {
  var frame = goog.dom.createDom('div', {'class': 'gallery-frame'}); 
  goog.dom.appendChild(this.region, frame);

  this.slider = new my.gallery.Slider(this.photos, frame);
}