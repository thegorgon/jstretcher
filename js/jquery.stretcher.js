(function($) {
  $.extend($.fn, {
    sizeToFit: function(container, options) {
      container = $(container);
      var resize = $(this),
        gravities = (options.gravity || '0.5x0.5').split('x'),
        rH = resize.height(), rW = resize.width(),
        cW = container.width(), cH = container.height(),
        cRatio = (cH / cW).toFixed(2), rRatio = ( rH / rW).toFixed(2),
        dims = {}, off = {},
        gravityTop = parseFloat(gravities[0], 10), 
        gravityLeft = parseFloat(gravities[1], 10);
      if (cRatio > rRatio) {
        dims.h = cH;
        dims.w = (cH/rRatio);
      } else {
        dims.w = cW;
        dims.h = (cW * rRatio);
      }
      
      if (dims.w > 0 && dims.h > 0) {
        resize.width(dims.w);
        resize.height(dims.h);
        off.top = Math.round(gravityTop * (cH - dims.h));
        off.left = Math.round(gravityLeft * (cW - dims.w));
        resize.css({width: dims.w, height: dims.h, top: off.top, left: off.left});
      }
      return this;
    },
    stretcher: function(options) {
      options = options || {};
      var resizeTo = $(options.container || window),
        width = resizeTo.width(),
        height = resizeTo.height();
      $(this).width(width).height(height).each(function(i) {
        var self = $(this);
        options.gravity = options.gravity || self.attr('data-gravity');
        self.find('img').sizeToFit(self, options).show().css('opacity', 1.0);
      });
      return this;
    }
  });
  $.stretcher = {
    init: function(selector) {
      selector = selector || '.stretcher';
      var $stretchers = $(selector);
      $stretchers.stretcher().load(function() { $(this).stretcher(); });
      $(window).unbind('.stretcher').bind('resize.stretcher, orientationchange.stretcher', function(e) {
        $(selector).stretcher();
      });
    }
  };
}(jQuery));