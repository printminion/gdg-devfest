chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('window.html', {
    id: "btWinID",
    bounds: {
      left: 100,
      top: 100,
      width: 800,
      height: 500
    },
    maxWidth: 400,
    minWidth: 300,
    minHeight: 400,
    maxHeight: 800,
  });
});