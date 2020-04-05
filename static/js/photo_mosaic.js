// Slightly modified code from https://stackoverflow.com/a/36260195

$(function(){
	mosaicGrid('.container', 'img');
});

$(window).resize(function(){
    mosaicGrid('.container', 'img');
})

function mosaicGrid(selector,target) {
  var cols = [0,0,0];
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