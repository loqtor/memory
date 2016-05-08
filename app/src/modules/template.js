(function (window, document, _, $) {

  if (!window.Memory) {
    window.Memory = {};
  }

  window.Memory.Template = (function () {

    return {
      getTemplate: function (selector) {
        return _.template($(selector).html());
      }
    }

  })();

})(window, document, _, jQuery);
