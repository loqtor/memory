(function (window, document, $, _, Board, Status, Template) {

  window.Memory = (function () {

    var tilesTpl = Template.getTemplate('#tiles-tpl'),

        boardContainer = $('#board'),

        drawTiles = function () {
          var tiles = Board.getTiles(),
              content = tilesTpl({
                tiles: tiles
              });

          boardContainer.html(content);
        },

        updateBoard = function (index, flip) {
          var tile = boardContainer.find('.tile:eq(' + index + ')');

          if (flip) {
            tile.addClass('flipped');
          } else {
            tile.removeClass('flipped');
          }
        },

        update = function (e) {
          var tile = $(e.target),
              index = tile.data('index');

          if (tile.data('status') === Status.UNFLIPPED) {
            tile.data('status', Status.FLIPPED);
            updateBoard(index, true);

            var flipped = Board.getFlippedTiles();

            if (flipped.length === 2) {
              if (flipped[0].img === flipped[1].img) {
                flipped[0].status = Status.MATCHED;
                flipped[1].status = Status.MATCHED;
              } else {
                /**
                 * Unflip and update board
                 */
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
      }
    };

  })();

})(window, document, jQuery, _, window.Memory.Board, window.Memory.Status, window.Memory.Template);
