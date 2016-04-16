$(document).on("ready", function() {
  var wsUri = "ws://127.0.0.1:5555/";

  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) { onOpen(evt) };
  websocket.onclose = function(evt) { onClose(evt) };
  websocket.onmessage = function(evt) { onMessage(evt) };
  websocket.onerror = function(evt) { onError(evt) };

  function onOpen(evt)
  {
    $("#loading").addClass("hide-container");

    refreshStatistics();
    setInterval(refreshStatistics, 1000);

    showContent();
  }

  function onClose(evt)
  {
  }

  function onMessage(evt)
  {
    data = JSON.parse(evt.data);
    if (data.id == 1)
    {
      $(".runningBuilds").html(data.running_builds);
    }
  }

  function onError(evt)
  {
    showConnectionError();
  }

  function refreshStatistics()
  {
    data = {}
    data.id = 1

    websocket.send(JSON.stringify(data));
  }

  function showContent()
  {
    $("#loading").addClass("hide-container");
    $("#content").removeClass("hide-container");
  }

  function showConnectionError()
  {
    $("#loading").addClass("hide-container");
    $("#content").addClass("hide-container");
    $("#connectionError").removeClass("hide-container");
  }
});
