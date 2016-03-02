goog.addDependency('../../../src/js/templates.soy.js', ['my.gallery.templates'], []);

goog.provide('my.gallery.Photo');
goog.require('goog.style');
goog.require('my.gallery.templates');

my.gallery.Photo = function(url, index, region, width, prepend) {
  this.url = url;
  this.index = index;
  this.region = region;
  this.width = width;

  if (typeof prepend === "undefined") {
    this.prepend = false;
  }
  else {
    this.prepend = prepend;
  }

  this.render();
}

my.gallery.Photo.prototype.render = function() {
  this.container = soy.renderAsFragment(my.gallery.templates.photoView, { url: this.url });
  this.insert();
  this.updateWidth();
}

my.gallery.Photo.prototype.insert = function() {
  if (this.prepend) {
    goog.dom.insertChildAt(this.region, this.container, 0);
  }
  else {
    goog.dom.appendChild(this.region, this.container);
  }
}

my.gallery.Photo.prototype.remove = function() {
  goog.dom.removeNode(this.container);
}

my.gallery.Photo.prototype.setWidth = function(width) {
  this.width = width;
  this.updateWidth();
}

my.gallery.Photo.prototype.updateWidth = function() {
  goog.style.setStyle(this.container, {'width': this.width + 'px'});
}