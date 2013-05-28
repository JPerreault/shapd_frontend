//Arrays for points
var xCoords = [],
	yCoords = [],
	zCoords = [];

var curveMaker = function (tMP) {

	var tubeMeshParams = tMP;
	var q = tubeMeshParams['Modify'],
		z = tubeMeshParams['Depth'],
		m = tubeMeshParams['Stretch'],
		l = tubeMeshParams['Loops'];
		w = tubeMeshParams['Starting Shape'];
	var tx = 0,
		ty = 0,
		tz = 0,
	scalar = 0;
		
	//All logic for curves
	var shapeMaker = THREE.Curve.create (function(){}, function(t) {
	
		//Cinquefoil Knot
		if (w == 1) {
			t *= Math.PI * 2;
			tx = (2 + Math.cos(q * t)) * (Math.cos(l * t)),
			ty = (2 + Math.cos(q * t)) * Math.sin(l * t),
			tz = Math.sin(q * t);
		
			scalar = tubeMeshParams.scalar;
		}
	
		//Granny Knot
		else if (w == 2) {
			t = 2 * Math.PI * t;

			tx = -0.22 * Math.cos(t) - 1.28 * Math.sin(t) - 0.44 * Math.cos(3 * t) - 0.78 * Math.sin((l+1) * t),
			ty = -0.1 * Math.cos(2 * t) - 0.27 * Math.sin(2 * t) + 0.38 * Math.cos(4 * t) + 0.46 * Math.sin((l+2) * t),
			tz = 0.7 * Math.cos((q-2) * t) - 0.4 * Math.sin(3 * t);
		
			scalar = 40;
		}
	
		//Heart Curve
		else if (w == 3) {
			t = 2 * Math.PI * t;
		
			tx = 16 * Math.pow(Math.sin(t+(l-2)), 3),
			ty = 13 * Math.cos(t*(1)) - 5 * Math.cos((2) * t) - 2 * Math.cos((q-2) * t)- Math.cos((q-1) * t),
			tz = 1;
			//console.log(m);
			//if (m === 1.2708011600338698);
			//	console.log('y ', ty);

			scalar = 3.5;
		}
	
		//Viviani's Curve
		else if (w == 4) {
			this.radius = 70;
			t = t * 4 * Math.PI;
		
			var a = this.radius / 2;
			tx = a * (1 + Math.cos(t*(l-1))),
			ty = a * Math.sin(t*(l-1)),
			tz = 2 * a * Math.sin((t+(q-5)) / (2)) + z;
			console.log('y: ', ty);
		
			scalar = 1;
		}
	
		//Knot Curve
		else if (w == 5) {
			t *= 2 * Math.PI;
		
			tx = 50 * Math.sin(t*(l-1)),
			ty = Math.cos(t) * ((2*q) + (q+45) * Math.cos(t*(l-1))),
			tz = Math.sin(t) * ((2*q) + (q+45) * Math.cos(t*(l-1)));
		
			scalar = 1;
		}
	
		//Trefoil Knot
		else if (w == 6) {
			t *= Math.PI * 2;
			
			tx = (2 + Math.cos((q-2) * t*3)) * Math.cos(l * t),//tx = (2 + Math.cos(3 * t)) * Math.cos(2 * t),
			ty = (2 + Math.cos((q-2) * t*3)) * Math.sin(l * t),//(2 + Math.cos(3 * t)) * Math.sin(2 * t),
			tz = Math.sin((q-2) * t);
		
			scalar = 15;
		}
		
		//Torus Knot
		else if (w == 7) {
			t *= Math.PI * 2;
		
			var tx = (2 + Math.cos((q-1) * t)) * Math.cos((l+1) * t),
				ty = (2 + Math.cos((q-1) * t)) * Math.sin((l+1) * t),
				tz = Math.sin((q-1) * t);
		
			scalar = 20;
		}
	
		//DecoratedTorusKnot4a
		else if (w == 8) {
			t *= Math.PI * 2;
		
			tx = Math.cos(l* t) * (1 + 0.6 * (Math.cos(5 * t) + 0.75 * Math.cos((q+5) * t))),
			ty = Math.sin(l * t) * (1 + 0.6 * (Math.cos(5 * t) + 0.75 * Math.cos((q+5) * t))),
			tz = 0.35 * Math.sin(5 * t);
		
			scalar = 35;
		}
	
	//DecoratedTorusKnot4b
		else if (w == 9) {
			var fi = t * Math.PI * 2;
		
			tx = Math.cos(l * fi) * (1 + 0.45 * Math.cos((q-2) * fi) + 0.4 * Math.cos(9 * fi)),
			ty = Math.sin(l * fi) * (1 + 0.45 * Math.cos((q-2) * fi) + 0.4 * Math.cos(9 * fi)),
			tz = 0.2 * Math.sin(9 * fi);
		
			scalar = 40;
		}
	
		//DecoratedTorusKnot5a
		else if (w == 10) {
			var fi = t * Math.PI * 2;
		
			tx = Math.cos((l+1) * fi) * (1 + 0.3 * Math.cos(5 * fi) + 0.5 * Math.cos((q+5) * fi)),
			ty = Math.sin((l+1) * fi) * (1 + 0.3 * Math.cos(5 * fi) + 0.5 * Math.cos((q+5) * fi)),
			tz = 0.2 * Math.sin((q+15) * fi);
		
			scalar = 40;
		}
	
		//DecoratedTorusKnot4c
		else if (w == 11) {
			var fi = t * Math.PI * 2;
		
			tx = Math.cos((l+2) * fi) * (1 + 0.5 * (Math.cos(5 * fi) + 0.4 * Math.cos((q+15) * fi))),
			ty = Math.sin((l+2) * fi) * (1 + 0.5 * (Math.cos(5 * fi) + 0.4 * Math.cos((q+15)* fi))),
			tz = 0.35 * Math.sin((q+10) * fi);
		
			scalar = 40;
		}
	
		ty *= m;
		tz *= z;
	
		xCoords.push(tx);
		//console.log(xCoords);
		yCoords.push(ty);
		zCoords.push(tz);
		
		//tx = checkDiscon(tx);
		//ty = checkDiscon(ty);
		//tz = checkDiscon(tz);
		//console.log('x: ',tx);
		//console.log('y: ', ty);
		//console.log('z: ', tz);
		
		return new THREE.Vector3(tx, ty, tz).multiplyScalar(scalar);
	});
	
	//Actual curve once done
	var shape = new shapeMaker();
	var isDiscon = checkDiscon();
	//console.log(xCoords.length);
	//console.log(isDiscon);
	return shape;
	
	function checkDiscon ()
	{
		return (checkArray(xCoords) && checkArray(yCoords) && checkArray(zCoords));
	}
	
	function checkArray (array)
	{
		var test = true;
		
		for (var i = 0, j = array.length; i < j; i++)
		{
			if (array[i] != array[0])
			{
				test = false;
				console.log('array i: ', array[i]);
				console.log('array 0: ', array[0]);
				console.log(i);
				break;
			}
		}
		return test;
	}
}