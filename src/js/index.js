goog.addDependency('../../../src/js/gallery.js', ['my.gallery.Gallery'], []);
goog.require('my.gallery.Gallery');

function showGallery() {

  var photos = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg', 'img/5.jpg', 'img/6.jpg', 'img/7.jpg'];
  var mainRegion = document.getElementById('main');

  var gallery = new my.gallery.Gallery(photos, mainRegion);

}