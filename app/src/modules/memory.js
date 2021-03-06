(function (window, document, $, _, Board, Status, Template, Clock) {

  window.Memory = (function () {

    var tilesTpl = Template.getTemplate('#tiles-tpl'),

        controls = $('#controls'),
        boardContainer = $('#board'),
        inGameControls = $('#in-game-controls'),
        timeout = null,
        timeoutEnabled = false,
        gameOver = false,

        images = ['assets/img/1.jpg', 'assets/img/2.jpg', 'assets/img/3.jpg', 'assets/img/4.jpg'],

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
          if (!timeoutEnabled && !gameOver) {
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

                  if (Board.allMatched()) {
                    alert('You won!');
                    Clock.stop();
                  }

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

        startGame = function () {
          Board.init(images);
          drawTiles();
          Clock.init(180000, '#clock').then(function () {
            gameOver = true;
            $('.tile').addClass('flipped');
            $('#clock').html('Prontito!');
          });
          inGameControls.find('button').removeClass('hide');
        },

        setImages = function (friends) {
          return _.chain(friends)
                    .filter(function (friend) {
                      return !friend.picture.data.is_silhouette;
                    })
                    .map(function (friend) {
                      return friend.picture.data.url;
                    })
                    .value();
        },

        handleFbResponse = function (fbResponse) {
          if (fbResponse.status === 'connected') {
            FB.api(
              '/' + fbResponse.authResponse.userID + '/taggable_friends',
              function (response) {
                if (response && !response.error) {
                  if (response.data && response.data.length > 0) {
                    images = setImages(response.data);
                  }

                  startGame();
                }
              }
            );
          } else {
            startGame();
          }
        },

        handleOption = function (e) {
          controls.hide();

          var clicked = $(e.target);

          if (clicked.data('action') === 'fb') {
            FB.login(handleFbResponse, {
              scope: 'user_friends, user_photos',
            });
          } else {
            startGame();
          }
        },

        restart = function () {
          startGame();
        },

        bindEvents = function () {
          controls.on('click', 'button', handleOption);
          boardContainer.on('click', '.tile', update);
          inGameControls.on('click', 'button[data-action="restart"]', restart);
        };

    return {
      init: function (fbResponse) {
        bindEvents();
      },

      timeoutEnabled: function () {
        return timeoutEnabled;
      },

    };

  })();

})(window, document, jQuery, _, window.Memory.Board, window.Memory.Status, window.Memory.Template, window.Memory.Clock);
