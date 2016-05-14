(function (window, document, Status) {

  if (!window.Memory) {
    window.Memory = {};
  }

  window.Memory.Clock = (function () {

    var limit = null,
        clockContainer = null,

        updateClock = function () {
          clockContainer.html(--limit);
        },

        countdown = function () {
          setTimeout(function () {
            updateClock();

            if (limit > 0) {
              countdown();
            } else {
              alert('Game over, loco!');
            }
          }, 1000);
        };

    return {
      init: function (time, selector) {
        limit = time / 1000;
        clockContainer = $(selector);

        clockContainer.html(limit);
        countdown();
      }
    }

  })();

})(window, document, window.Memory.Status);
