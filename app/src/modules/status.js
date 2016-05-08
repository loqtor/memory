(function () {

  if (!window.Memory) {
    window.Memory = {};
  }

  window.Memory.Status = (function () {

    return {
      UNFLIPPED: 'unflipped',
      FLIPPED: 'flipped',
      MATCHED: 'matched'
    }

  })();

})();
