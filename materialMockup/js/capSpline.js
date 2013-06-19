// Copied from core/geometries/TubeGeometry.js
var capSpline = function(path, segments, radius, radiusSegments, closed, debug) {

	THREE.Geometry.call( this );

	this.path = path;
	this.segments = segments || 64;
	this.radius = radius || 1;
	this.radiusSegments = radiusSegments || 8;
	this.closed = closed || false;

	if ( debug ) this.debug = new THREE.Object3D();

	this.grid = [];

	var tangent, normal, binormal,
		numpoints = this.segments + 1,
		u, v, q, w, e, r, cx, cy, i, j,
		pos, pos2 = new THREE.Vector3();

	var frames = new THREE.TubeGeometry.FrenetFrames( this.path, this.segments, this.closed ),
		tangents = frames.tangents,
		normals = frames.normals,
		binormals = frames.binormals;

	// Create internals
	this.tangents = tangents;
	this.normals = normals;
	this.binormals = binormals;
	var xPoints = new Array();
	var yPoints = new Array();
	var zPoints = new Array();
	
	// Get the ponts
	for ( i = 0; i < numpoints; i++ ) {
		u = i / ( numpoints - 1 );

		pos = path.getPointAt( u );

		tangent = tangents[ i ];
		normal = normals[ i ];
		binormal = binormals[ i ];

		for ( j = 0; j < this.radiusSegments; j++ ) {

			v = j / this.radiusSegments * 2 * Math.PI;

			cx = -this.radius * Math.cos( v ); //Negating it so it faces outside.
			cy = this.radius * Math.sin( v );

			pos2.copy( pos );
			if (i == 0) {
				pos2.x += cx * normal.x + cy * -1 * binormal.x;
				pos2.y += cx * normal.y + cy * -1 * binormal.y;
				pos2.z += cx * normal.z + cy * -1 * binormal.z;
			}
			else {
				pos2.x += cx * normal.x + cy * binormal.x;
				pos2.y += cx * normal.y + cy * binormal.y;
				pos2.z += cx * normal.z + cy * binormal.z;
			}
		
			if(i == 0 || i == numpoints - 1){
				xPoints.push(pos2.x);
				yPoints.push(pos2.y);
				zPoints.push(pos2.z);
			}
		}
	}
	
	var triangleGeometry = new THREE.Geometry();
	var triangleGeometryTest = new THREE.Geometry();
	
	//Start cap
	for (var q = 0; q < radiusSegments - 2; q++) {
		triangleGeometryTest = makeCap(q);
		THREE.GeometryUtils.merge (triangleGeometry, triangleGeometryTest);	
	}
	
	//End cap
	for (var q = 0; q < radiusSegments - 2; q++) {
		triangleGeometryTest = makeCap(q+radiusSegments);
		THREE.GeometryUtils.merge (triangleGeometry, triangleGeometryTest);	
	}
		
		//Makes as many triangles as necessary to cap the open end.
	function makeCap (q) {
		var triangleGeometry2 = new THREE.Geometry();
		var origin;
		if (q >= radiusSegments)
			origin = radiusSegments;
		else
			origin = 0;
				
		//Starts at either the start of the start cap or the start of the end cap.
		w = xPoints[ origin ];
		e = yPoints[ origin ];
		r = zPoints[ origin ];
		var v1 = new THREE.Vector3( w, e, r );

		w = xPoints[ q + 1 ];
		e = yPoints[ q + 1 ];
		r = zPoints[ q + 1 ];
		var v2 = new THREE.Vector3( w, e, r );
				
		w = xPoints[ q + 2 ];
		e = yPoints[ q + 2 ];
		r = zPoints[ q + 2 ];
		var v3 = new THREE.Vector3( w, e, r );

		//Pushes vectors made from points.
		triangleGeometry2.vertices.push( v1 );
		triangleGeometry2.vertices.push( v2 );
		triangleGeometry2.vertices.push( v3 );				
	
		//Creates a face, making the actual cap from the vectors.
		triangleGeometry2.faces.push( new THREE.Face3( 0, 2, 1));
		triangleGeometry2.computeCentroids();
		triangleGeometry2.computeFaceNormals();
		triangleGeometry2.computeVertexNormals();
				
		return triangleGeometry2;
	}
	
	return triangleGeometry;
};
