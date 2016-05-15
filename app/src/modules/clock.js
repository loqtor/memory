(function (window, document, Status) {

  if (!window.Memory) {
    window.Memory = {};
  }

  window.Memory.Clock = (function () {

    var limit = null,
        clockContainer = null,

        promise = null,
        gameOver = false;

        updateClock = function () {
          clockContainer.html(--limit);
        },

        countdown = function (resolve) {
          setTimeout(function () {
            updateClock();

            if (limit > 0 && !gameOver) {
              countdown(resolve);
            } else {
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
      },

      stop: function () {
        gameOver = true;
      }
    }

  })();

})(window, document, window.Memory.Status);
