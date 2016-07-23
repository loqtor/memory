(function (window, document, Status) {

  if (!window.Memory) {
    window.Memory = {};
  }

  window.Memory.Clock = (function () {

    var limit = null,
        clockContainer = null,
        t = null,

        promise = null,
        gameOver = false,

        updateClock = function () {
          clockContainer.html(--limit);
        },

        countdown = function (resolve) {
          if (t !== null) {
            clearInterval(t);
          }

          t = setInterval(function () {
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
