goog.addDependency('../../../src/js/photo.js', ['my.gallery.Photo'], []);

goog.provide('my.gallery.Slider');

goog.require('goog.style');
goog.require('goog.dom');
goog.require('goog.fx.Dragger');
goog.require('goog.fx.dom');
goog.require('goog.dom.ViewportSizeMonitor');
goog.require('goog.async.Throttle');
goog.require('my.gallery.Photo');

my.gallery.Slider = function(urls, region) {
  this.sensitivity = 200;  
  this.speed = 100;
  this.resizeThrottling = 500;

  this.width = 0;
  this.urls = urls;
  this.lastPhotoIndex = this.urls.length - 1;
  this.region = region;
  this.position = 0;
  this.photos = [];

  this.setSlider();
  this.setWidth(goog.dom.getViewportSize().width);
  this.setEvents();
  this.setPhotos();
}

my.gallery.Slider.prototype.setSlider = function() {
  this.slider = soy.renderAsFragment(my.gallery.templates.sliderView);
  goog.dom.appendChild(this.region, this.slider);

  this.dragger = new goog.fx.Dragger(this.slider);
}

my.gallery.Slider.prototype.setPhotos = function() {
  this.appendPhoto(this.lastPhotoIndex);
  this.appendPhoto(0);
  if (this.lastPhotoIndex > 0) {
    this.appendPhoto(1);
  }
  else {
    this.appendPhoto(0);
  }
}

my.gallery.Slider.prototype.setEvents = function() {
  var self = this;
  this.dragger.addEventListener(goog.fx.Dragger.EventType.END, function(e){
    return function(){self.dragEnd(e)}.call(self);
  });

  var vsm = new goog.dom.ViewportSizeMonitor();
  var resizeCallback = function(e) {
    this.setWidth(vsm.getSize().width);
  }

  var throttle = new goog.async.Throttle(resizeCallback, this.resizeThrottling, this);
  goog.events.listen(vsm, goog.events.EventType.RESIZE, function(){
    throttle.fire();
  });  
}

my.gallery.Slider.prototype.setWidth = function(width) {
  this.width = width;
  goog.style.setStyle(this.slider, 'width', this.width * 3 + 'px');  
  this.setPosition(-this.width);

  for (var i = 0, len = this.photos.length; i < len; i++) {   
    this.photos[i].setWidth(width);
  }       
}

my.gallery.Slider.prototype.dragEnd = function(e) {
  var shift = Math.abs(this.position - e.left);

  var direction = 1;
  if (this.position - e.left > 0) {
    direction = -1;
  }

  if (shift < this.sensitivity) {
    this.slidePosition(0);
  }
  else {
    this.slidePosition(direction);
  }
}

my.gallery.Slider.prototype.slidePosition = function(direction) {
  if (direction !== 0) {
    this.switchPhotos(direction);
  }
  var currentPos = parseInt(goog.style.getStyle(this.slider, 'left'));
  var newPosition = -this.width;

  slide = new goog.fx.dom.Slide(this.slider, [currentPos, 0], [newPosition, 0], this.speed);
  slide.play()
  this.position = newPosition;
}

my.gallery.Slider.prototype.setPosition = function(position) {
  goog.style.setStyle(this.slider, 'left', position + 'px');
  this.position = position;
}

my.gallery.Slider.prototype.movePosition = function(shift) {
  var currentPos = parseInt(goog.style.getStyle(this.slider, 'left'));
  goog.style.setStyle(this.slider, 'left', currentPos + shift + 'px');
}

my.gallery.Slider.prototype.switchPhotos = function(direction) {
  if (direction < 0) {
    this.switchPhotosForward();
  }
  else {
    this.switchPhotosBackward();
  }
}

my.gallery.Slider.prototype.switchPhotosForward = function() {
  var photoIndex = 0;
  if (this.photos[this.photos.length - 1].index !== this.lastPhotoIndex) {
    photoIndex = this.photos[this.photos.length - 1].index + 1;
  }

  this.removePhoto(0);
  this.appendPhoto(photoIndex);  
  this.movePosition(this.width);
}

my.gallery.Slider.prototype.switchPhotosBackward = function() {
  var photoIndex = this.lastPhotoIndex;
  if (this.photos[0].index !== 0) {
    photoIndex = this.photos[0].index - 1;
  }

  this.removePhoto(2);
  this.prependPhoto(photoIndex);  
  this.movePosition(-this.width);
}

my.gallery.Slider.prototype.appendPhoto = function(photoIndex) {
  this.photos.push(new my.gallery.Photo(this.urls[photoIndex], photoIndex, this.slider, this.width));
}

my.gallery.Slider.prototype.prependPhoto = function(photoIndex) {
  this.photos.unshift(new my.gallery.Photo(this.urls[photoIndex], photoIndex, this.slider, this.width, true));
}

my.gallery.Slider.prototype.removePhoto = function(index) {
  this.photos[index].remove();
  this.photos.splice(index, 1);
}

