var hashend;

var TubeMeshBuilder = function(materialsLibrary) {
	var knot, geometry, stl, closed, figure, torusLoop, scale;
	var fIndex, intersects;
	this.m = materialsLibrary.getMaterial( "Pure chrome" ) ;
	
	
	//Scoping out of functions
	var segments = 600, radiusSegments = 6;

    this.build = function(tubeMeshParams) {
		updateHash(tubeMeshParams);
		var radius = tubeMeshParams['Thickness'];
		scale = tubeMeshParams['Scale'];
		closed = this.isClosed (tubeMeshParams);
		knot = new curveMaker(tubeMeshParams);
        geometry = new THREE.TubeGeometry(knot, segments, radius, radiusSegments, closed, false); //6 is default 'curviness', or how rounded the lines are
		var vertices = geometry.vertices;
		
		//Check if caps are needed on open ends.
		if (!closed) {				
			var cap = new capSpline(knot, segments, radius, radiusSegments, closed, false);
			THREE.GeometryUtils.merge(geometry, cap);
		}
		
		geometry.mergeVertices();
		geometry.computeCentroids();
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();
		
		//this.m = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } ); //Makes the frame wirey.
        figure = new THREE.Mesh(geometry, this.m);
		
        figure.rotation.x = tubeMeshParams['Rotation X'];
        figure.rotation.y = tubeMeshParams['Rotation Y'];
        figure.rotation.z = 0;	

        figure.scale.x = figure.scale.y = figure.scale.z = tubeMeshParams['Scale'];
        tubeMeshParams.figure = figure;

        return tubeMeshParams;
    }
	
	//Sees if the lines should be attempted to be closed or not
	this.isClosed = function(tubeMeshParams)
	{
		if (tubeMeshParams['Starting Shape'] < 10)
			return true;
		else
			return false;
	}
	this.setMaterial= function (material)
	{
		this.m = materialsLibrary.getMaterial(material)
	}
	
	//Saves the shape (currently to your computer) as an STL file.
	this.saveSTL = function()
	{
		var stlFile = createSTL();
		var blob = new Blob ([stlFile], {type: 'text/plain'});
		saveAs (blob, 'test.stl');
	}
	
	//Generates an STL file using the shape currently on the screen.
	function createSTL()
	{
		var vertices = geometry.vertices;
		var faces = geometry.faces;
		
		stl = 'solid test \n';
		//Loop for all faces, adding each vertex to the stl file and making triangles from them.
		for (var i = 0; i < faces.length; i++)
		{
			stl += 'facet normal ' + convertVectorToString(faces[i].normal, figure.scale.x) + ' \n';
			stl += 'outer loop \n';
			stl += convertVertexToString(vertices[faces[i].a], figure.scale.x);
			stl += convertVertexToString(vertices[faces[i].b], figure.scale.x);
			stl += convertVertexToString(vertices[faces[i].c], figure.scale.x);
			stl += 'endloop \n';
			stl += 'endfacet \n';
			//Make the corresponding triangle unless the face in question is the cap.
			if ((i < faces.length - (2 * (radiusSegments - 2)) && closed == false) || closed == true)
			{
				stl += 'facet normal ' + convertVectorToString(faces[i].normal, figure.scale.x) + ' \n';
				stl += 'outer loop \n';
				stl += convertVertexToString(vertices[faces[i].a], figure.scale.x);
				stl += convertVertexToString(vertices[faces[i].c], figure.scale.x);
				stl += convertVertexToString(vertices[faces[i].d], figure.scale.x);
				stl += 'endloop \n';
				stl += 'endfacet \n';
			}
		}
		if (typeof torusLoop != 'undefined')
		{
			faces = torusLoop.geometry.faces;
			vertices = torusLoop.geometry.vertices;
			console.log(torusLoop.geometry);
			
			for (var i = 0; i < faces.length; i++)
			{
				stl += 'facet normal ' + convertVectorToString(faces[i].normal, figure.scale.x) + ' \n';
				stl += 'outer loop \n';
				stl += convertVertexToString(vertices[faces[i].a], figure.scale.x);
				stl += convertVertexToString(vertices[faces[i].b], figure.scale.x);
				stl += convertVertexToString(vertices[faces[i].c], figure.scale.x);
				stl += 'endloop \n';
				stl += 'endfacet \n';
				
				stl += 'facet normal ' + convertVectorToString(faces[i].normal, figure.scale.x) + ' \n';
				stl += 'outer loop \n';
				stl += convertVertexToString(vertices[faces[i].a]);
				stl += convertVertexToString(vertices[faces[i].c]);
				stl += convertVertexToString(vertices[faces[i].d]);
				stl += 'endloop \n';
				stl += 'endfacet \n';
			}
		}
		stl += 'endsolid';
		
		return stl;
	}
	
	function convertVectorToString(vector)
	{
		return ''+ vector.x/scale + ' '+ vector.y/scale + ' '+ vector.z/scale;
	}
	
	function convertVertexToString(vector)
	{
		return 'vertex '+ convertVectorToString(vector) + ' \n';
	}
	
	//Adding loops:
	this.addLoop = function (rC)
	{
		var raycaster = rC;
		intersects = raycaster.intersectObject(figure);
		
		if (intersects.length > 0)
		{
			fIndex = intersects[0].faceIndex;
			return true;
		}
		return false;
	}
	
	this.createTorus = function (tubeMeshParams)
	{
		var torus = new THREE.TorusGeometry(5, 1.5, segments/10, 50);
		fIndex = this.calculateFaceIndex();
		var xRadian = this.toRadians(geometry.faces[fIndex], true);
		var yRadian = this.toRadians(geometry.faces[fIndex], false);
		//torus.applyMatrix(new THREE.Matrix4().makeRotationX(xRadian));
		//torus.applyMatrix(new THREE.Matrix4().makeRotationY(yRadian));
		torusLoop = new THREE.Mesh(torus, this.m);
		
		torusLoop.scale.x = torusLoop.scale.y = torusLoop.scale.z = tubeMeshParams['Scale'];

		posx = geometry.faces[fIndex].centroid.x;
		posy = geometry.faces[fIndex].centroid.y;
		posz = geometry.faces[fIndex].centroid.z;
		
		torusLoop.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(posx, posy, posz));
		torusLoop.geometry.computeCentroids();
		torusLoop.geometry.computeFaceNormals();
		torusLoop.geometry.computeVertexNormals();
		
		return torusLoop;
	}
	
	this.calculateFaceIndex = function()
	{
		var sectionNumber = Math.floor(fIndex / radiusSegments);
		var high = -1, fIndexHigh = -1;
		var newFace, newValue;
		for (var i = 0; i < radiusSegments; i++)
		{
			newFace = geometry.faces[sectionNumber*radiusSegments + i];
			newValue = Math.abs(newFace.centroid.x) + Math.abs(newFace.centroid.y);
			if (newValue > high)
			{
				high = Math.max(high, newValue);
				fIndexHigh = sectionNumber*radiusSegments + i;
			}
		}
		
		return fIndexHigh;
	}
	
	this.toRadians = function (face, isX)
	{
		var n1 = face.normal;
		
		//Normal of the vertical plane
		if (isX)
			var n2 = new THREE.Vector3(1, 0, 0);
		else
			var n2 = new THREE.Vector3(0, 1, 0);
		//Equation to find the cosin of the angle. (n1)(n2) = ||n1|| * ||n2|| (cos theta)
	
		//Find the dot product of n1 and n2.
		var d = (n1.x * n2.x) + (n1.y * n2.y) + (n1.z * n2.z);
		console.log('d ', d);
		var l1 = Math.pow ((Math.pow(n1.x, 2) + Math.pow(n1.y, 2) + Math.pow(n1.z, 2)), .5);
		console.log('l1 ', l1);
		var l2 = Math.pow ((Math.pow(n2.x, 2) + Math.pow(n2.y, 2) + Math.pow(n2.z, 2)), .5);
		console.log('l2 ', l2);
		
		var a = (d)/(l1*l2);
		console.log('a ', a);
		var result = Math.acos(a);
		//var result = - result;
		//result = Math.PI - result;
		console.log(result);
		console.log('-------------');
		return result;
	}

	//Calculate dimensions of Mesh. Being fed currentMesh as a param, defined above. 
	function calculateMeshSize(figure)
	{
		figure.geometry.computeBoundingBox();
		var boundingBox = figure.geometry.boundingBox;
		
		var xMin = boundingBox.min.x;
		var xMax = boundingBox.max.x;
		var yMin = boundingBox.min.y;
		var yMax = boundingBox.max.y;
		var zMin = boundingBox.min.z;
		var zMax = boundingBox.max.z;
		
		var xWidth = xMax - xMin;
		var yHeight = yMax - yMin;
		var zDepth = zMax - zMin;
	}
	
	this.calculateVolume = function()
	{
		var vertices = geometry.vertices;
		var faces = geometry.faces;
		var totalVolume = 0;
		var partVol;
		var px, py, pz,
			qx, qy, qz,
			rx, ry, rz;
		for (i = 0; i < faces.length; i++)
		{
			px = vertices[faces[i].a].x;
			py = vertices[faces[i].a].y;
			pz = vertices[faces[i].a].z;
			
			qx = vertices[faces[i].b].x;
			qy = vertices[faces[i].b].y;
			qz = vertices[faces[i].b].z;
			
			rx = vertices[faces[i].c].x;
			ry = vertices[faces[i].c].y;
			rz = vertices[faces[i].c].z;
			
			partVol = (px*qy*rz) + (py*qz*rx) + (pz*qx*ry) - (px*qz*ry) - (py*qx*rz) - (pz*qy*rx);
			totalVolume += partVol;
			
			
			px = vertices[faces[i].c].x;
			py = vertices[faces[i].c].y;
			pz = vertices[faces[i].c].z;
			
			qx = vertices[faces[i].d].x;
			qy = vertices[faces[i].d].y;
			qz = vertices[faces[i].d].z;
			
			rx = vertices[faces[i].a].x;
			ry = vertices[faces[i].a].y;
			rz = vertices[faces[i].a].z;
			
			partVol = (px*qy*rz) + (py*qz*rx) + (pz*qx*ry) - (px*qz*ry) - (py*qx*rz) - (pz*qy*rx);
			totalVolume += partVol;
		}
		
		totalVolume /= 6;
		totalVolume /= (Math.pow(figure.scale.x, 3));
		console.log('Volume: ', totalVolume);
	}
	
	this.volumeCalc = function(face4)
	{
	var volume = 0;
	var object = figure;
	var Pxlist = [];
	var Pylist = [];
	var Pzlist = [];
	var pvlist = [];
	var Qxlist = [];
	var Qylist = [];
	var Qzlist = [];
	var Rxlist = [];
	var Rylist = [];
	var Rzlist = [];
	
    if (face4 == false) 
	{
		for (var i=0; i<object.geometry.faces.length; i++) 
		{
			var pA = (object.geometry.faces[i].a);
			var qA = (object.geometry.faces[i].b);
			var rA = (object.geometry.faces[i].c);

			var Px = object.geometry.vertices[pA].x;
			var Py = object.geometry.vertices[pA].y;
			var Pz = object.geometry.vertices[pA].z;

			Pxlist.push(Px);
			Pylist.push(Py);
			Pzlist.push(Pz);
		
			var Qx = object.geometry.vertices[qA].x;
			var Qy = object.geometry.vertices[qA].y;
			var Qz = object.geometry.vertices[qA].z;

			Qxlist.push(Qx);
			Qylist.push(Qy);
			Qzlist.push(Qz);

			var Rx = object.geometry.vertices[rA].x;
			var Ry = object.geometry.vertices[rA].y;
			var Rz = object.geometry.vertices[rA].z;

			Rxlist.push(Rx);
			Rxlist.push(Ry);
			Rzlist.push(Rz);
		}
    }   
	else
	{
        for (var i=0; i<object.geometry.faces.length; i++) 
		{
			var pA = (object.geometry.faces[i].b);
			var qA = (object.geometry.faces[i].c);
			var rA = (object.geometry.faces[i].d);

			var Px = object.geometry.vertices[pA].x;
			var Py = object.geometry.vertices[pA].y;
			var Pz = object.geometry.vertices[pA].z;

			Pxlist.push(Px);
			Pylist.push(Py);
			Pzlist.push(Pz);

			var Qx = object.geometry.vertices[qA].x;
			var Qy = object.geometry.vertices[qA].y;
			var Qz = object.geometry.vertices[qA].z;

			Qxlist.push(Qx);
			Qylist.push(Qy);
			Qzlist.push(Qz);

			var Rx = object.geometry.vertices[rA].x;
			var Ry = object.geometry.vertices[rA].y;
			var Rz = object.geometry.vertices[rA].z;

			Rxlist.push(Rx);
			Rxlist.push(Ry);
			Rzlist.push(Rz);
		
		
		
			var pA = (object.geometry.faces[i].d);
			var qA = (object.geometry.faces[i].a);
			var rA = (object.geometry.faces[i].b);

			var Px = object.geometry.vertices[pA].x;
			var Py = object.geometry.vertices[pA].y;
			var Pz = object.geometry.vertices[pA].z;

			//Pxlist.push(Px);
			//Pylist.push(Py);
			//Pzlist.push(Pz);

			var Qx = object.geometry.vertices[qA].x;
			var Qy = object.geometry.vertices[qA].y;
			var Qz = object.geometry.vertices[qA].z;

			//Qxlist.push(Qx);
			//Qylist.push(Qy);
			//Qzlist.push(Qz);

			var Rx = object.geometry.vertices[rA].x;
			var Ry = object.geometry.vertices[rA].y;
			var Rz = object.geometry.vertices[rA].z;

			//Rxlist.push(Rx);
			//Rxlist.push(Ry);
			//Rzlist.push(Rz);
		}
	}
    for (i=0;i < Pxlist.length; i++)
	{
		pv = Pxlist[i]*Qylist[i]*Rzlist[i]; + Pylist[i]*Qzlist[i]*Rxlist[i]; + Pzlist[i]*Qxlist[i]*Rylist[i]; - Pxlist[i]*Qzlist[i]*Rylist[i]; - Pylist[i]*Qxlist[i]*Rzlist[i]; -Pzlist[i]*Qylist[i]*Rxlist[i];
		pvlist.push(pv);
	}

	for (i = 0; i < pvlist.length; i++)
	{
		volume += pvlist[i];
	}
	volume /= 6;
	console.log('Volume: ', volume);
}
	
	this.calculateSurfaceArea = function()
	{
		var surfaceArea = 0;
		var faces = geometry.faces;
		var vertices = geometry.vertices;
		var a, b, c, d, ab, ad;
		
		a = vertices[faces[0].a];
		b = vertices[faces[0].b];
		d = vertices[faces[0].d];
		
		//The surface area is ||ab|| * ||ad|| * faces number
		
		ab = Math.sqrt(Math.pow(a.x - b.x, 2)+Math.pow(a.y - b.y, 2)+Math.pow(a.z - b.z, 2));
		ad = Math.sqrt(Math.pow(a.x - d.x, 2)+Math.pow(a.y - d.y, 2)+Math.pow(a.z - d.z, 2));
		surfaceArea = ab*ab*faces.length;
		
		console.log('Surface area: ', surfaceArea);
	}
	
	function updateHash(tubeMesh)
	{
		var keys = Object.keys(tubeMesh);
		if (typeof tubeMesh.figure != 'undefined')
		{
			tubeMesh['Rotation X'] = tubeMesh.figure.rotation.x;
			tubeMesh['Rotation Y'] = tubeMesh.figure.rotation.y;
		}

		hashend = "";
		for (var x=0; x<keys.length; x++)
		{
			if (keys[x] == 'Rotation Y')
			{
				hashend += tubeMesh[keys[x]];
				break;
			}
			hashend += tubeMesh[keys[x]]+"|";
		}
	}
};

var TubeMeshParams = function(){
    if (typeof savedShape == 'undefined')
	{
        
		this['Scale'] = 5;
		this['Modify'] = 5;
		this['Depth'] = 1;
		this['Stretch'] = 1;
		this['Loops'] = 2;
		this['Starting Shape'] = 1;
		this['Thickness'] = 4;
		this['Rotation X'] = 0;
		this['Rotation Y'] = 0;
	}
	else
	{
		var parseme = savedShape.split("|");
		var transformations = ['Scale', 'Modify', 'Depth', 'Stretch', 'Loops', 'Starting Shape', 'Thickness', 'Rotation X', 'Rotation Y'];
		for (var x=0; x<transformations.length; x++)
		{
			this[transformations[x]] = parseFloat(parseme[x]);
		}
	}
};