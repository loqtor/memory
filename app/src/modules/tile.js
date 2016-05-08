(function (window, document, Status) {

  if (!window.Memory) {
    window.Memory = {};
  }

  window.Memory.Tile = (function () {

    var status = Status.UNFLIPPED,
        image = null;

    return {
      create: function (img) {
        return {
          status: status,
          img: img
        }
      }
    }

  })();

})(window, document, window.Memory.Status);
