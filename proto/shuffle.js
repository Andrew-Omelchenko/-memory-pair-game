function Shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

// Last elements of an array are bad sorted
function Shuffle2(o) {
	o.sort(function() { return 0.5 - Math.random() });
	return o;
}