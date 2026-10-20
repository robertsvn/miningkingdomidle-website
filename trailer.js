(() => {
  const opener = document.querySelector('[data-open-trailer]');
  const dialog = document.getElementById('gameplay-trailer-dialog');
  if (!opener || !dialog || typeof dialog.showModal !== 'function') return;

  const video = dialog.querySelector('video');
  const closeButton = dialog.querySelector('[data-close-trailer]');

  opener.addEventListener('click', event => {
    event.preventDefault();
    dialog.showModal();
    video.play().catch(() => {
      // Native controls remain available if playback requires another gesture.
    });
  });

  const closeTrailer = () => {
    video.pause();
    dialog.close();
  };

  closeButton.addEventListener('click', closeTrailer);
  dialog.addEventListener('click', event => {
    if (event.target === dialog) closeTrailer();
  });
  dialog.addEventListener('cancel', () => video.pause());
  dialog.addEventListener('close', () => {
    video.pause();
    opener.focus({ preventScroll: true });
  });
})();
