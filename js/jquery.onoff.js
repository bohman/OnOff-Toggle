(function($) {
  var cssClassPane = "nv-pane";
  
  var methods = {
    init: function(options) {

      var settings = $.extend({
        "bindClick": false
      }, options);

      this.find("input[type=checkbox]").each(function() {
        /* Create the toggle control in the document. */
        var toggle = $('<div class="nv-toggle"><div class="nv-pane nv-on-state"><div class="nv-on">on</div><div class="nv-handle">&nbsp;</div><div class="nv-off">off</div></div></div>');
        var pane = $(toggle.children("." + cssClassPane));
        $(this).before(toggle);
        /* Bind the state to the peer checkbox, respecting the default value. */
        if(! this.checked) pane.addClass("nv-off-state");
        var ckbox = this;
        $(ckbox).hide();
        pane.click(function(e) {
          ckbox.checked = $(this).hasClass("nv-off-state");
          $(this).toggleClass("nv-off-state");
        });
        /* If requested, bind to the click event of the peer (enables label clicks). */
        if(settings.bindClick)
          $(ckbox).click(function() {
            pane.toggleClass("nv-off-state");
          });
      });
    }
  };

  $.fn.onOff =
    function(method) {
      if(methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if ( typeof method === 'object' || ! method ) {
        return methods.init.apply(this, arguments);
      } else $.error("Method " + method + " does not exist!");
    };
})(jQuery);