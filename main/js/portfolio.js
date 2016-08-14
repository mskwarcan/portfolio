'use strict';

var Shuffle = require('shufflejs');
require('imagesLoaded');

// Convert an array-like object to a real array.
function toArray(thing) {
  return Array.prototype.slice.call(thing);
}

// ES7 will have Array.prototype.includes.
function arrayIncludes(array, value) {
  return array.indexOf(value) !== -1;
}

var Portfolio = function (element) {
  this.element = element;
  this.tags = toArray(document.querySelectorAll('.tags button'));
  
  this.filters = {
    groups: [],
  }
  
  this.initShuffle();
  this.setupEvents();
};

// Column width and gutter width options can be functions
Portfolio.prototype.initShuffle = function () {  
  this.shuffle = new Shuffle(this.element, {
    itemSelector: '.project',
    speed: 250,
    easing: 'ease',
    delimter: ',',
  });
};

Portfolio.prototype.setupEvents = function () {
  this._onGroupChange = this._handleGroupChange.bind(this);
  
  this.tags.forEach(function (input) {
    
      //input.addEventListener('click', this.sortItems.bind(this, input.dataset.group));
      this.tags.forEach(function (input) {
        input.addEventListener('click', this._onGroupChange);
      }, this);
    }, this);
};

Portfolio.prototype._getCurrentGroupFilters = function () {
  return this.tags.filter(function (button) {
    return button.classList.contains('active');
  }).map(function (button) {
    return button.getAttribute('data-group');
  });
};

Portfolio.prototype._handleGroupChange = function (evt) {
  var button = evt.currentTarget;
  // Treat these buttons like radio buttons where only 1 can be selected.
  if (button.classList.contains('active')) {
    button.classList.remove('active');
  } else {
    this.tags.forEach(function (btn) {
      btn.classList.remove('active');
    });

    button.classList.add('active');
  }

  this.filters.groups = this._getCurrentGroupFilters();
  this.filter();
};

Portfolio.prototype.filter = function () {
  if (this.hasActiveFilters()) {
    this.shuffle.filter(this.itemPassesFilters.bind(this));
  } else {
    this.shuffle.filter(Shuffle.ALL_ITEMS);
  }
};

Portfolio.prototype.hasActiveFilters = function () {
  return Object.keys(this.filters).some(function (key) {
    return this.filters[key].length > 0;
  }, this);
};

/**
 * Determine whether an element passes the current filters.
 * @param {Element} element Element to test.
 * @return {boolean} Whether it satisfies all current filters.
 */
Portfolio.prototype.itemPassesFilters = function (element) {
  var groups = this.filters.groups[0];
  var group = element.getAttribute('data-groups').split(",");

  // If there are active color filters and this color is not in that array.
  if (groups.length > 0 && !arrayIncludes(group, groups)) {
    return false;
  }

  return true;
};

document.addEventListener('DOMContentLoaded', function () {
  $('#grid').imagesLoaded( function() {
    window.portfolio = new Portfolio(document.getElementById('grid'));
  });
});

$(document).ready(function() {
  $('.project').click(function(e) {
    
    $.ajax({
  		url: "/get_project/" + $(this).data("id"),
  		type: 'get',
  		success: function( result ) {
        generateHtml(JSON.parse(result));
  		}
    });
    
    $(".portfolio").animate({
      left: 0,
    }, 500, function() {

  });

    e.preventDefault();
  });

  $('.close').click(function(e) {
    $(".portfolio").animate({
      left: '-100%',
    }, 500, function() {
      $('.loading').css('display', 'block');
  });

    e.preventDefault();
  });
});

function generateHtml(data) {
  var project_name = data.name;
  var description = data.description;
  var images = data.images;
  var tags = data.tags;
  
  var text = "<h2>" + project_name + "</h2>";
  text += "<p class='tags'>" + tags.join(", ") +"</p>";
  text += "</ul>";
  text += "<p>" + description +"</p>";
  
  $('.portfolio .text').html(text);
  
  var image_html = "<div class='feature'><img src='" + images[0] + "' /></div><div class='thumbs'>";
  for (var i = 0; i < images.length; i++) { 
    if(i === 0) {
      image_html += "<a class='active' href='#'><img src='" + images[i] + "' /></a>"
    } else {
      image_html += "<a href='#'><img src='" + images[i] + "' /></a>"
    }
  }
  image_html += "</div>";
  
  $('.portfolio .images .image-content').html(image_html);
  
  $('.portfolio .images .image-content').imagesLoaded( function() {
    $('.loading').fadeOut();
  });
  
  $('.thumbs a').click(function(e) {
    if(!$(this).hasClass('active')) {
      $('.thumbs a').removeClass('active');
      $(this).addClass('active');
      $('.feature img').attr('src', $(this).children('img').attr('src'));
    }
    
    e.preventDefault();
  });
}