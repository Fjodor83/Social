/**
 * UIActivityLoader.js
 */

var UIActivityLoader = {
  delta : 65,    
  hasMore: false,
  scrollBottom : function() {
  return $(document).height() - $(window).scrollTop() - $(window).height();  
  },
  init: function (parentId, hasMore) {
    UIActivityLoader.hasMore = hasMore;
    UIActivityLoader.initIndicator();

    $(document).ready(function() {
      // check onLoad page.
      if(UIActivityLoader.scrollBottom() <= UIActivityLoader.delta) {
        $(window).scrollTop($(document).height() - $(window).height() - (UIActivityLoader.delta+1));
      }
      $(window).scroll(function(e) {
        var distanceToBottom = UIActivityLoader.scrollBottom();
        var loadAnimation = $('#UIActivitiesLoader').find('div.ActivityIndicator'); 
        loadAnimation.stop();
        var isLoading = loadAnimation.css('display') != 'none';
        if (distanceToBottom <= UIActivityLoader.delta && !isLoading) {
          if (UIActivityLoader.hasMore) {
            loadAnimation
              .animate({'display': 'block'}, 
                500, function() {
                  $(this).show();
                  $('div.BottomContainer:last')[0].scrollIntoView(true);
                  $('#ActivitiesLoader').click();
                });
          }
        }
      });
    });

  },
  setStatus : function(hasMore) {
    if(UIActivityLoader.scrollBottom() <= UIActivityLoader.delta) {
      $(window).scrollTop($(window).scrollTop()-5);
    }
    UIActivityLoader.hasMore = hasMore;
    UIActivityLoader.initIndicator();
  },
  initIndicator : function() {
    $('#UIActivitiesLoader').find('div.ActivityIndicator').remove();
    var activityIndicator = $('<div class="ActivityIndicator" id="ActivityIndicator" style="display:none"></div>');
    for (var i=1; i < 9; i++) {
      activityIndicator.append($('<div id="rotateG_0' + i + '" class="blockG"></div>'));
    }
    activityIndicator.appendTo('#UIActivitiesLoader');
  }
}

_module.UIActivityLoader = UIActivityLoader;
