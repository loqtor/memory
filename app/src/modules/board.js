(function (window, document, _, Tile, Status) {

  if (!window.Memory) {
    window.Memory = {};
  }

  window.Memory.Board = (function () {
    var MAX_TILES = 20,
        PATH = 'assets/img/',
        IMAGES = ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],

        tiles = [],

        setTiles = function () {
          for (var i = 0; i < MAX_TILES; i += 2) {
            var img = IMAGES[Math.ceil(Math.random() * (IMAGES.length - 1))];
            tiles[i] = Tile.create(PATH + img, i);
            tiles[i + 1] = Tile.create(PATH + img, i + 1);
          }

          tiles = _.shuffle(tiles);
        };

    return {
      init: function () {
        setTiles();
      },

      getTiles: function () {
        return tiles;
      },

      getFlippedTiles: function () {
        return _.filter(tiles, function (tile) {
          return tile.status === Status.FLIPPED;
        });
      },

      updateTile: function (index, status) {
        tiles = _.map(tiles, function (tile) {
          if (index === tile.index) {
            tile.status = status;
          }

          return tile;
        });
      },

      allMatched: function () {
        return _.filter(tiles, function (tile) {
          return tile.status === Status.UNFLIPPED;
        }).length === 0;
      }
    }

  })();

})(window, document, _, window.Memory.Tile, window.Memory.Status);
