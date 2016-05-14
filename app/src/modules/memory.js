(function (window, document, $, _, Board, Status, Template) {

  window.Memory = (function () {

    var tilesTpl = Template.getTemplate('#tiles-tpl'),

        boardContainer = $('#board'),
        timeout = null,
        timeoutEnabled = false,

        drawTiles = function () {
          var tiles = Board.getTiles(),
              content = tilesTpl({
                tiles: tiles
              });

          boardContainer.html(content);
        },

        updateView = function (index, flip) {
          var tile = boardContainer.find('.tile[data-index="' + index + '"]');

          if (flip) {
            tile.addClass('flipped');
          } else {
            tile.removeClass('flipped');
          }
        },

        update = function (e) {
          if(!timeoutEnabled) {
            var tile = $(e.target),
                index = tile.data('index');

            if (tile.data('status') === Status.UNFLIPPED) {
              tile.data('status', Status.FLIPPED);
              updateView(index, true);
              Board.updateTile(index, Status.FLIPPED);

              var flipped = Board.getFlippedTiles();

              if (flipped.length === 2) {
                if (flipped[0].img === flipped[1].img) {
                  flipped[0].status = Status.MATCHED;
                  flipped[1].status = Status.MATCHED;
                } else {
                  timeoutEnabled = true;
                  timeout = setTimeout(function () {

                    flipped[0].status = Status.UNFLIPPED;
                    flipped[1].status = Status.UNFLIPPED;

                    $('.flipped[data-index="' + flipped[0].index + '"], .flipped[data-index="' + flipped[1].index + '"]').removeClass('flipped').data('status', Status.UNFLIPPED);
                    timeoutEnabled = false;
                  }, 3000);
                }
              }
            }
          }
        },

        bindEvents = function () {

          boardContainer.on('click', '.tile', update);

        };

    return {
      init: function () {
        Board.init();
        drawTiles();
        bindEvents();
      },

      timeoutEnabled () {
        return timeoutEnabled;
      }
    };

  })();

})(window, document, jQuery, _, window.Memory.Board, window.Memory.Status, window.Memory.Template);
