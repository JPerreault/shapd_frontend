// /* NOT CURRENTLY IN USE, LEAVING FOR NOW.
 // * A bunch of parametric curves
 // * @author zz85
 // *
 // * Formulas collected from various sources
 // *	http://mathworld.wolfram.com/HeartCurve.html
 // *	http://mathdl.maa.org/images/upload_library/23/stemkoski/knots/page6.html
 // *	http://en.wikipedia.org/wiki/Viviani%27s_curve
 // *	http://mathdl.maa.org/images/upload_library/23/stemkoski/knots/page4.html
 // *	http://www.mi.sanu.ac.rs/vismath/taylorapril2011/Taylor.pdf
 // *	http://prideout.net/blog/?p=44
 // */

// // Lets define some curves
// //To find initial values for any of the curves, go here: 
// //https://github.com/mrdoob/three.js/blob/master/examples/js/CurveExtras.js
// THREE.Curves = {};


	// THREE.Curves.CinquefoilKnot = THREE.Curve.create(

	// function(tubeMeshParams) {
		// this.tubeMeshParams = tubeMeshParams;
	// },

	// function(t) {
		// var q = this.tubeMeshParams['Modify'],
			// z = this.tubeMeshParams['Depth'],
			// m = this.tubeMeshParams['Stretch'],
			// l = this.tubeMeshParams['Loops'];

		// console.log(t);
		// t *= Math.PI * 2;
		// var tx = (2 + Math.cos(q * t)) * (Math.cos(l * t)),
			// ty = (2 + Math.cos(q * t)) * Math.sin(l * t),
			// tz = Math.sin(q * t);
			// ty *= m;
			// tz *= z;

		// return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.tubeMeshParams.scalar);

	// }

// );

 // THREE.Curves.GrannyKnot = THREE.Curve.create( 
 
	// function(tubeMeshParams) {
		// this.tubeMeshParams = tubeMeshParams;
	// },

	 // function(t) {
		// var q = this.tubeMeshParams['Modify'],
			// z = this.tubeMeshParams['Depth'],
			// m = this.tubeMeshParams['Stretch'],
			// l = this.tubeMeshParams['Loops'];
			
			
	    // t = 2 * Math.PI * t;

	    // var tx = -0.22 * Math.cos(t) - 1.28 * Math.sin(t) - 0.44 * Math.cos(3 * t) - 0.78 * Math.sin((l+1) * t),
			// ty = -0.1 * Math.cos(2 * t) - 0.27 * Math.sin(2 * t) + 0.38 * Math.cos(4 * t) + 0.46 * Math.sin((l+2) * t),
			// tz = 0.7 * Math.cos((q-2) * t) - 0.4 * Math.sin(3 * t);
		// ty *= m;
		// tz*= z;
	    // return new THREE.Vector3(tx, ty, tz).multiplyScalar(40);
	// }
// );

// THREE.Curves.HeartCurve = THREE.Curve.create(

	// function(tubeMeshParams) {
		// this.tubeMeshParams = tubeMeshParams;
	// },

	// //A lot of the code had this in, not sure why this was here, probably specific to their implementation. Commenting out in case needed later.
	// //Was in: Heart, Trefoil, Torus, TrefoilPolynomial, FigureEightPolynomial, DecoratedTorusKnots
	// //function(s) {

	// //	this.scale = (s === undefined) ? 5 : s;

	// //},

	// function(t) {
	
		// var q = this.tubeMeshParams['Modify'],
			// z = this.tubeMeshParams['Depth'],
			// m = this.tubeMeshParams['Stretch'],
			// l = this.tubeMeshParams['Loops'];

		// t = 2 * Math.PI * t;
	
		// var tx = 16 * Math.pow(Math.sin(t+(l-2)), 3),
			// ty = 13 * Math.cos(t*(1)) - 5 * Math.cos((2) * t) - 2 * Math.cos((q-2) * t)- Math.cos((q-1) * t),
			// tz = z;
		// ty *= m;

		// return new THREE.Vector3(tx, ty, tz).multiplyScalar(3.5); //3.5 comes from variable passed here for HeartCurve: https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_extrude_splines.html

	// }

// );



// // Viviani's Curve
// THREE.Curves.VivianiCurve = THREE.Curve.create(

	// function(tubeMeshParams) {
		// this.tubeMeshParams = tubeMeshParams;
	// },

	// //function(radius) {

	// //	this.radius = radius;
	// //},

	// function(t) {
	
		// var q = this.tubeMeshParams['Modify'],
			// z = this.tubeMeshParams['Depth'],
			// m = this.tubeMeshParams['Stretch'],
			// l = this.tubeMeshParams['Loops'];

		// this.radius = 70;
		// t = t * 4 * Math.PI; // Normalized to 0..1
		// var a = this.radius / 2;
		// var tx = a * (1 + Math.cos(t*(l-1))),
			// ty = a * Math.sin(t*(l-1)),
			// tz = 2 * a * Math.sin((t+(q-5)) / (2)) + z;
		// ty *= m;
		// tz *= z;

		// return new THREE.Vector3(tx, ty, tz);

	// }

// );


// THREE.Curves.KnotCurve = THREE.Curve.create(

	// function(tubeMeshParams) {
		// this.tubeMeshParams = tubeMeshParams;
	// },

	// function(t) {
		// var q = this.tubeMeshParams['Modify'],
			// z = this.tubeMeshParams['Depth'],
			// m = this.tubeMeshParams['Stretch'],
			// l = this.tubeMeshParams['Loops'];

		// t *= 2 * Math.PI;
		// var tx = 50 * Math.sin(t*(l-1)),
			// ty = Math.cos(t) * ((2*q) + (q+45) * Math.cos(t*(l-1))),
			// tz = Math.sin(t) * ((2*q) + (q+45) * Math.cos(t*(l-1)));
		// ty *= m;
		// tz *= z;

		// return new THREE.Vector3(tx, ty, tz);

	// }

// );

// THREE.Curves.TrefoilKnot = THREE.Curve.create(

	// function(tubeMeshParams) {
		// this.tubeMeshParams = tubeMeshParams;
	// },

	// function(t) {
		// var q = this.tubeMeshParams['Modify'],
			// z = this.tubeMeshParams['Depth'],
			// m = this.tubeMeshParams['Stretch'],
			// l = this.tubeMeshParams['Loops'];

		// t *= Math.PI * 2;
		// var tx = (2 + Math.cos((q-2) * t*3)) * Math.cos(l * t),//tx = (2 + Math.cos(3 * t)) * Math.cos(2 * t),
			// ty = (2 + Math.cos((q-2) * t*3)) * Math.sin(l * t),//(2 + Math.cos(3 * t)) * Math.sin(2 * t),
			// tz = Math.sin((q-2) * t);
		// ty *= m;
		// tz *= z;
		// return new THREE.Vector3(tx, ty, tz).multiplyScalar(15); //No parameter was passed, improvised

	// }

// );

// THREE.Curves.TorusKnot = THREE.Curve.create(

	// function(tubeMeshParams) {
		// this.tubeMeshParams = tubeMeshParams;
	// },

	// function(t) {
		// var q = this.tubeMeshParams['Modify'],
			// z = this.tubeMeshParams['Depth'],
			// m = this.tubeMeshParams['Stretch'],
			// l = this.tubeMeshParams['Loops'];

		// t *= Math.PI * 2;
		// var tx = (2 + Math.cos((q-1) * t)) * Math.cos((l+1) * t),
			// ty = (2 + Math.cos((q-1) * t)) * Math.sin((l+1) * t),
			// tz = Math.sin((q-1) * t);
		// ty *= m;
		// tz *= z;

		// return new THREE.Vector3(tx, ty, tz).multiplyScalar(20);

	// }

// );

// // var scaleTo = function(x, y) {
// //   var r = y - x;
// //   return function(t) {
// //     t * r + x;
// //   };
// // }
// var scaleTo = function(x, y, t) {

		// var r = y - x;
		// return t * r + x;

	// }

// THREE.Curves.DecoratedTorusKnot4a = THREE.Curve.create(

	// function(tubeMeshParams) {
		// this.tubeMeshParams = tubeMeshParams;
	// },

	// function(t) {
		// var q = this.tubeMeshParams['Modify'],
			// z = this.tubeMeshParams['Depth'],
			// m = this.tubeMeshParams['Stretch'],
			// l = this.tubeMeshParams['Loops'];

		// t *= Math.PI * 2;
		// var tx = Math.cos(l* t) * (1 + 0.6 * (Math.cos(5 * t) + 0.75 * Math.cos((q+5) * t))),
			// ty = Math.sin(l * t) * (1 + 0.6 * (Math.cos(5 * t) + 0.75 * Math.cos((q+5) * t))),
			// tz = 0.35 * Math.sin(5 * t);
		// ty *= m;
		// tz *= z;

		// return new THREE.Vector3(tx, ty, tz).multiplyScalar(35);

	// }

// );


// THREE.Curves.DecoratedTorusKnot4b = THREE.Curve.create(

	// function(tubeMeshParams) {
		// this.tubeMeshParams = tubeMeshParams;
	// },

	// function(t) {
		// var q = this.tubeMeshParams['Modify'],
			// z = this.tubeMeshParams['Depth'],
			// m = this.tubeMeshParams['Stretch'],
			// l = this.tubeMeshParams['Loops'];
		// var fi = t * Math.PI * 2;
		// var tx = Math.cos(l * fi) * (1 + 0.45 * Math.cos((q-2) * fi) + 0.4 * Math.cos(9 * fi)),
			// ty = Math.sin(l * fi) * (1 + 0.45 * Math.cos((q-2) * fi) + 0.4 * Math.cos(9 * fi)),
			// tz = 0.2 * Math.sin(9 * fi);
		// ty *= m;
		// tz *= z;
		

		// return new THREE.Vector3(tx, ty, tz).multiplyScalar(40);

	// }

// );


// THREE.Curves.DecoratedTorusKnot5a = THREE.Curve.create(

	// function(tubeMeshParams) {
		// this.tubeMeshParams = tubeMeshParams;
	// },

	// function(t) {
		// var q = this.tubeMeshParams['Modify'],
			// z = this.tubeMeshParams['Depth'],
			// m = this.tubeMeshParams['Stretch'],
			// l = this.tubeMeshParams['Loops'];

		// var fi = t * Math.PI * 2;
		// var tx = Math.cos((l+1) * fi) * (1 + 0.3 * Math.cos(5 * fi) + 0.5 * Math.cos((q+5) * fi)),
			// ty = Math.sin((l+1) * fi) * (1 + 0.3 * Math.cos(5 * fi) + 0.5 * Math.cos((q+5) * fi)),
			// tz = 0.2 * Math.sin((q+15) * fi);
		// ty *= m;
		// tz *= z;

		// return new THREE.Vector3(tx, ty, tz).multiplyScalar(40);

	// }

// );

// THREE.Curves.DecoratedTorusKnot5c = THREE.Curve.create(

	// function(tubeMeshParams) {
		// this.tubeMeshParams = tubeMeshParams;
	// },

	// function(t) {
		// var q = this.tubeMeshParams['Modify'],
			// z = this.tubeMeshParams['Depth'],
			// m = this.tubeMeshParams['Stretch'],
			// l = this.tubeMeshParams['Loops'];

		// var fi = t * Math.PI * 2;
		// var tx = Math.cos((l+2) * fi) * (1 + 0.5 * (Math.cos(5 * fi) + 0.4 * Math.cos((q+15) * fi))),
			// ty = Math.sin((l+2) * fi) * (1 + 0.5 * (Math.cos(5 * fi) + 0.4 * Math.cos((q+15)* fi))),
			// tz = 0.35 * Math.sin((q+10) * fi);
		// ty *= m;
		// tz *= z;

		// return new THREE.Vector3(tx, ty, tz).multiplyScalar(40);

	// }

// );

// //Had line connecting two points that should not have been connected.
// //THREE.Curves.HelixCurve = THREE.Curve.create(
// //
// //	function(tubeMeshParams) {
// //		this.tubeMeshParams = tubeMeshParams;
// //	},
// //	
// //	function(t) {
// //		var q = this.tubeMeshParams['Modify'],
// //			z = this.tubeMeshParams['Depth'],
// //			m = this.tubeMeshParams['Stretch'],
// //			l = this.tubeMeshParams['Loops'];
// //
// //		var t2 = 2 * Math.PI * t * q;
// //		var tx = Math.cos(t2) * (q+25),
// //			ty = Math.sin(t2) * (l+28),
// //			tz = (l+148) * t;
// //		ty *= m;
// //		tz *= z;
// //
// //		return new THREE.Vector3(tx, ty, tz).multiplyScalar(.80);
// //
// //	}
// //
// //);

// //Had line connecting two points that should not have been connected.
// //THREE.Curves.FigureEightPolynomialKnot = THREE.Curve.create(
// //
// //	function(tubeMeshParams) {
// //		this.tubeMeshParams = tubeMeshParams;
// //	},
// //
// //	function(t) {
// //		var q = this.tubeMeshParams['Modify'],
// //			z = this.tubeMeshParams['Depth'],
// //			m = this.tubeMeshParams['Stretch'],
// //			l = this.tubeMeshParams['Loops'];
// //
// //		t = scaleTo(-4, 4, t);
// //		var tx = 2 / 5 * t * (t * t - (q+2)) * (t * t - (l+8)),
// //			ty = Math.pow(t, 4) - (q+8) * t * t,
// //			tz = 1 / 10 * t * (t * t - 4) * (t * t - (q+4)) * (t * t - (l+10));
// //		ty *= m;
// //		tz *= z;
// //
// //		return new THREE.Vector3(tx, ty, tz);
// //
// //	}
// //);

// //Had line connecting two points that should not have been connected.
// //THREE.Curves.TrefoilPolynomialKnot = THREE.Curve.create(
// //
// //	function(tubeMeshParams) {
// //		this.tubeMeshParams = tubeMeshParams;
// //	},
// //
// //	function(t) {
// //		var q = this.tubeMeshParams['Modify'],
// //			z = this.tubeMeshParams['Depth'],
// //			m = this.tubeMeshParams['Stretch'],
// //			l = this.tubeMeshParams['Loops'];
// //
// //		t = t * 4 - 2;
// //		var tx = Math.pow(t, 3) - (q-2) * t,
// //			ty = Math.pow(t, 4) - (l+2) * t * t,
// //			tz = 1 / 5 * Math.pow(t, 5) - 2 * t;
// //		ty *= m;
// //		tz *= z;
// //
// //		return new THREE.Vector3(tx, ty, tz).multiplyScalar(20);
// //
// //	}
// //
/*
//Viviani's Curve - VERY good one for rings if depth is turned down
		else if (w == 14) {
			this.radius = 70;
			t = t * 4 * Math.PI;
		
			var a = this.radius / 2;
			tx = a * (1 + Math.cos(t* (l-1))),
			ty = a * Math.sin(t* (l-1)),
			tz = 2 * a * Math.sin((t*(q-4)) / (2)) + z;
			
			scalar = .63;
*/
// //);

/*
	//Helix
		else if (w == 15) {
			var t2 = 2 * Math.PI * t * q;
			
			tx = Math.cos(t2) * (q+25),
			ty = Math.sin(t2) * (q+25),
			tz = (l+148) * t;
	
			scalar = .7;

		}

*/
