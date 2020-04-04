// From https://stackoverflow.com/a/36260195

$(function(){
	mosaicGrid('.container', 'img');
});

$(window).resize(function(){
    mosaicGrid('.container', 'img');
})

function mosaicGrid(selector,target) {
  var cols = [0,0,0];
  var allTarget = $(selector).find(target);
  if (0 === allTarget.length)
    return;
  allTarget.one('load', function(e){
      var pos = minPos(cols);
      var x = pos * 100/cols.length;
      var y = cols[pos];
      $(this).css({left: x + "%", top: y + "px", width: Math.floor(100/cols.length)+"%"});
      cols[pos] = cols[pos] + $(this).height();
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