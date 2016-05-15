(function (window, document, Status) {

  if (!window.Memory) {
    window.Memory = {};
  }

  window.Memory.Clock = (function () {

    var limit = null,
        clockContainer = null,

        promise = null,

        updateClock = function () {
          clockContainer.html(--limit);
        },

        countdown = function (resolve) {
          setTimeout(function () {
            updateClock();

            if (limit > 0) {
              countdown(resolve);
            } else {
              alert('Game over, loco!');
              resolve();
            }
          }, 1000);
        };

    return {
      init: function (time, selector) {
        promise = new Promise(function (resolve, reject) {
          limit = time / 1000;
          clockContainer = $(selector);

          clockContainer.html(limit);
          countdown(resolve);
        });

        return promise;
      }
    }

  })();

})(window, document, window.Memory.Status);
