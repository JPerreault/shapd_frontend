var curveMaker = function (tMP) {

	var tubeMeshParams = tMP;
	var q = tubeMeshParams['Modify'],
		z = tubeMeshParams['Depth'],
		m = tubeMeshParams['Stretch'],
		l = tubeMeshParams['Loops'];
		w = tubeMeshParams['Starting Shape'];
		var o;
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
		
			scalar = 8.5;
		}
		
		//DecoratedTorusKnot4c
		else if (w == 2) {
			var fi = t * Math.PI * 2;
			o = q * 0.4;
		
			tx = Math.cos((l+2) * fi) * (1 + (0.5 + o - 2) * (Math.cos(5 * fi) + 0.4 * Math.cos(20 * fi))),
			ty = Math.sin((l+2) * fi) * (1 + (0.5 + o - 2) * (Math.cos(5 * fi) + 0.4 * Math.cos(20 * fi))),
			tz = 0.35 * Math.sin(15 * fi);
		
			scalar = 13;
		}
		
		//SphericalCardioid **Start of open by default curves**
		else if (w == 3) {
			
			t = 4 * Math.PI * t;
			
			tx = 2 * Math.cos(t*(q-4)) - Math.cos(l*t),
			ty = 2 * Math.sin(t*(q-4)) - Math.sin(l*t),
			tz = Math.sqrt(8) * Math.cos(t*(l-2) / 2);

			scalar = 9;
		}
		
		//Basebeall Seam
		else if (w == 4) {
			
			t = 4 * Math.PI * t;
			a = 0.4;
			
			tx = Math.sin(( l - 1 ) * Math.PI / 2 - (Math.PI / 2 - a) * Math.cos(t)) * Math.cos((q-4) * t / 2 + ( (l-1)*a * Math.sin( 2 * t ))),
			ty = Math.sin(( l - 1 ) * Math.PI / 2 - (Math.PI / 2 - a) * Math.cos(t)) * Math.sin((q-4) * t / 2 + ( (l-1)*a * Math.sin( 2 * t ))),
			tz = Math.cos(Math.PI / 2 - (Math.PI / 2 - a) * Math.cos(t));

			scalar = 30;
		}
		
		//Modified Baseball Seam
		else if (w == 5) {
			
			t = 4 * Math.PI * t;
			a = l-5;
			
			tx = Math.sin(( l - 1 ) * Math.PI / 2 - (Math.PI / 2 - a) * Math.cos(t)) * Math.cos((q-4) * t / 2 + ( a * Math.sin( 2 * t ))),
			ty = Math.sin(( l - 1 ) * Math.PI / 2 - (Math.PI / 2 - a) * Math.cos(t)) * Math.sin((q-4) * t / 2 + ( a * Math.sin( 2 * t ))),
			tz = Math.cos(Math.PI / 2 - (Math.PI / 2 - a) * Math.cos(t));

			scalar = 25;
		}
		
		//Heart Curve
		else if (w == 6) {
			t = 2 * Math.PI * t;
			o = l * 0.1;
		
			tx = 16 * Math.pow(Math.sin(t + ( o - 0.2 )), 3),
			ty = 13 * Math.cos(t*(1)) - 5 * Math.cos((2) * t) - 2 * Math.cos(3 * t)- Math.cos(( q - 1 ) * t),
			tz = 1;

			scalar = 1.5;
		}
	
		//Modified Trefoil Knot
		else if (w == 7) {
			t *= Math.PI * 2;
			
			tx = (2 + (q-4)*Math.cos(1* t*3)) * Math.cos(l * t),//tx = (2 + Math.cos(3 * t)) * Math.cos(2 * t),
			ty = (2 + (q-4)*Math.cos(1*  t*3)) * Math.sin(l * t),//(2 + Math.cos(3 * t)) * Math.sin(2 * t),
			tz = Math.sin(3 * t);
		
			scalar = 8.5;
		}
		
		//Torus Knot
		else if (w == 8) {
			t *= Math.PI * 2;
		
			var tx = (2 + Math.cos( (q-1) * t) ) * Math.cos( (l+3) * t),
				ty = (2 + Math.cos( (q-1) * t) ) * Math.sin( (l+3) * t),
				tz = Math.sin((q-1) * t);
		
			scalar = 8.5;
		}
		
		//Knot Curve
		else if (w == 9) {
			t *= 2 * Math.PI;
		
			tx = 50 * Math.sin(t*(l)),
			ty = Math.cos(t) * ((4*q) + (q+45) * Math.cos(t*l)),
			tz = Math.sin(t) * ((4*q) + (q+45) * Math.cos(t*l));
		
			scalar = .41;
		}
	
		//DecoratedTorusKnot4a
		else if (w == 10) {
			t *= Math.PI * 2;
		
			tx = Math.cos(l * t) * (1 + 0.6 * ( Math.cos(q * t) + 0.75 * Math.cos(10* t))),
			ty = Math.sin(l * t) * (1 + 0.6 * ( Math.cos(q * t) + 0.75 * Math.cos(10* t))),
			tz = 0.35 * Math.sin(q * t);
		
			scalar = 14;
		}
	
	//DecoratedTorusKnot4b
		else if (w == 11) {
			var fi = t * Math.PI * 2;
		
			tx = Math.cos(l * fi) * (1 + 0.45 * Math.cos((q-2) * fi) + 0.4 * Math.cos(9 * fi)),
			ty = Math.sin(l * fi) * (1 + 0.45 * Math.cos((q-2) * fi) + 0.4 * Math.cos(9 * fi)),
			tz = 0.2 * Math.sin(9 * fi);
		
			scalar = 14;
		}
	
		//DecoratedTorusKnot5a
		else if (w == 12) {
			var fi = t * Math.PI * 2;
			o = q * 0.15;
		
			tx = Math.cos((l+1) * fi) * (1 + (0.3 + o - 0.75) * Math.cos(5 * fi) + (0.5 + o - 0.75) * Math.cos(10 * fi)),
			ty = Math.sin((l+1) * fi) * (1 + (0.3 + o - 0.75) * Math.cos(5 * fi) + (0.5 + o - 0.75) * Math.cos(10 * fi)),
			tz = 0.2 * Math.sin(20 * fi);
		
			scalar = 12;
		}
	
		//Modified Trefoil Knot
		else if (w == 13) {
			t *= Math.PI * 2;
			
			tx = (2 + (q-4)*Math.cos(3* t*3)) * Math.cos(l * t),//tx = (2 + Math.cos(3 * t)) * Math.cos(2 * t),
			ty = (2 + (q-4)*Math.cos(3*  t*3)) * Math.sin(l * t),//(2 + Math.cos(3 * t)) * Math.sin(2 * t),
			tz = Math.sin(3 * t);
		
			scalar = 8.5;
		}
		
		//Modified Trefoil Knot
		else if (w == 14) {
			t *= Math.PI * 2;
			a = q + 1;
			
			tx = (2 + (a-4)*Math.cos(2* t*3)) * Math.cos(l * t),//tx = (2 + Math.cos(3 * t)) * Math.cos(2 * t),
			ty = (2 + (a-4)*Math.cos(2*  t*3)) * Math.sin(l * t),//(2 + Math.cos(3 * t)) * Math.sin(2 * t),
			tz = Math.sin(3 * t);
		
			scalar = 8.5;
		}
		
		//Granny Knot
		else if (w == 15) {
			t = 2 * Math.PI * t;

			tx = -0.22 * Math.cos(t) - 1.28 * Math.sin(t) - 0.44 * Math.cos((q-2) * t) - 0.78 * Math.sin((l+1) * t),
			ty = -0.1 * Math.cos(2 * t) - 0.27 * Math.sin(2 * t) + 0.38 * Math.cos((q-1) * t) + 0.46 * Math.sin((l+2) * t),
			tz = 0.7 * Math.cos(3 * t) - 0.4 * Math.sin(3 * t);
		
			scalar = 25;
		}
	
		//Modified Torus Knot
		else if (w == 16) {
			t *= Math.PI * 2;
		
			var tx = (2 + (q-4) * Math.cos(4 * t)) * Math.cos((l+1) * t),
				ty = (2 + (q-4) * Math.cos(4 * t)) * Math.sin((l+1) * t),
				tz = Math.sin(4 * t);
		
			scalar = 8.5;
		}
	
		ty *= m;
		tz *= z;
		
		return new THREE.Vector3(tx, ty, tz).multiplyScalar(scalar);
	});
	
	//Actual curve once done
	var shape = new shapeMaker();
	return shape;
}

/*
		// Wasn't interesting enough to keep as a stancalone shape. Perhaps put back in later. 
		//Figure Eight Polynomial Knot
		else if (w == 15) {
			t = t * 8 - 4;
			
			tx = 2 / 5 * t * (t * t - (q+2)) * (t * t - (l+8)),
			ty = Math.pow(t, 4) - (q+8) * t * t,
			tz = 1 / 10 * t * (t * t - 4) * (t * t - (q+4)) * (t * t - (l+10));
			
			scalar = 1;
		}
		*/
		
		/*
		// Wasn't interesting enough to keep as a stancalone shape. Perhaps put back in later. 
		//Treofil Polynomial Knot
		else if (w == 16) {
			t = t * 4 - 2;
			
			tx = Math.pow(t, 3) - (q-2) * t,
			ty = Math.pow(t, 4) - (l+2) * t * t,
			tz = 1 / 5 * Math.pow(t, 5) - 2 * t;
			
			scalar = 20;
		}
		*/