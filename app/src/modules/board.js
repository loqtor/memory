(function (window, document, _, Tile, Status) {

  if (!window.Memory) {
    window.Memory = {};
  }

  window.Memory.Board = (function () {
    var MAX_TILES = 20,
        tiles = [],

        setTiles = function (images) {
          for (var i = 0; i < MAX_TILES; i += 2) {
            var img = images[Math.ceil(Math.random() * (images.length - 1))];
            tiles[i] = Tile.create(img, i);
            tiles[i + 1] = Tile.create(img, i + 1);
          }

          tiles = _.shuffle(tiles);
        };

    return {
      init: function (images) {
        setTiles(images);
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
