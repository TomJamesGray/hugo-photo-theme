// Slightly modified code from https://stackoverflow.com/a/36260195

$(document).ready(function () {
    $(function(){
        mosaicGrid('.container', 'img');
    });

    $(window).resize(function(){
        mosaicGrid('.container', 'img');
    });

    $(".menu-toggle").click(function () {
        if ($(".menu-toggle").attr("id") == "open-menu") {
            $("nav ul, nav hr").css("display", "block");

            //Animate height increase of menu
            var curHeight = $("nav").css("height");
            var newHeight = $("nav").css("height", "auto").css("height");
            ;
            $("nav").css("height", curHeight);
            $("nav").animate({
                height: newHeight
            }, 500)
            $(".menu-toggle").attr("old-height", curHeight)
            $(".menu-toggle").attr("id", "#close-menu");
        }
        else{
            $("nav").animate({
                height: $(".menu-toggle").attr("old-height")
            }, 500,function () {
                // Hide the other elements of the menu when the animation is done
                $("nav ul, nav hr").css("display", "none");
            });
            $(".menu-toggle").attr("id", "open-menu");
        }
    });
});



function mosaicGrid(selector,target) {
    if (($(window).width() < 1000) && ($(window).width() > 750)){
        columns = 2;
    }
    else if($(window).width() <= 750){
        columns = 1;
    }
    else{
        columns = 3;
    }
    var cols = Array(columns).fill(0);
    var allTarget = $(selector).find(target);
    var padding = 20;
    var imgWidth = Math.floor((($(selector).width() - padding * (cols.length -1)))/ cols.length)
    if (0 === allTarget.length)
        return;
    allTarget.one('load', function(e){
        var pos = minPos(cols);
        var x = pos * (imgWidth + padding);
        var y = cols[pos];
        $(this).css({left: x + "px", top: y + "px", width: imgWidth +"px"});
        cols[pos] = cols[pos] + $(this).height() + padding;
        $(selector).height(Math.max.apply(null, cols) );
        $(this).off(e);
    }).each(function(){
    if(this.complete)
      $(this).trigger('load');
  });
}
function minPos(arr) {
  var min = Math.min.apply(null, arr);
  for(var i = 0; i < arr.length; i++) {
    if (min === arr[i])
      return i;
  }
}