Handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

Handlebars.registerHelper("each_with_index", function(array, fn) {
	var buffer = "";
    if (! (array instanceof Array))
      array = array.fetch();

	for (var i = 0, j = array.length; i < j; i++) {
		var item = array[i];
 
		item.index = i;
 
		// show the inside of the block
		buffer += fn(item);
	}
 
	return buffer;
 
});
