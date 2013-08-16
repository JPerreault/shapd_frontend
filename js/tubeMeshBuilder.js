var hashend;

var TubeMeshBuilder = function(materialsLibrary) {
	var knot, geometry, stl, figure, closed, scale, intersects, radius;
	this.m = materialsLibrary.getMaterial( "Brass gold plated polished" );
	this.m.name = 'Brass gold plated polished';
	this.officialName = 'Gold-Plated Solid Brass';
	this.xDim = 0; 
	this.yDim = 0; 
	this.zDim = 0; 
	this.matLib = materialsLibrary;

    this.build = function() {
		updateHash(this);
		radius = currentMesh['Thickness'];
		scale = currentMesh['Scale'];
		this.m = materialsLibrary.getMaterial(currentMesh['Material']);
		closed = this.isClosed (currentMesh);
		knot = new curveMaker(currentMesh);
        geometry = new THREE.TubeGeometry(knot, segments, radius, radiusSegments, closed, false);
		var vertices = geometry.vertices;
				
		if (!closed) {
			var cap = new capSpline(knot, segments, radius, radiusSegments, closed, false);
			THREE.GeometryUtils.merge(geometry, cap);
		}
				
		geometry.mergeVertices();
		geometry.computeCentroids();
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();
		
		//this.m = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } ); //Makes the frame wirey.
		//this.m = new THREE.MeshLambertMaterial( { color: 0x6F6F6F } );
		if (typeof screenShot !== 'undefined')
		{
			this.m.opacity = 1;
		}
		
        figure = new THREE.Mesh(geometry, this.m);
		
        figure.rotation.x = currentMesh['Rotation X'];
        figure.rotation.y = currentMesh['Rotation Y'];
        figure.rotation.z = 0;	

		if (typeof screenShot === 'undefined')
			figure.scale.x = figure.scale.y = figure.scale.z = currentMesh['Scale'];
		else
			figure.scale.x = figure.scale.y = figure.scale.z = .66;
        currentMesh.figure = figure;
		
		figure.radius = radius;
		loop.update(figure, 'tubeMeshBuilder');
		currentMesh.figure.startingShape = currentMesh['Starting Shape'];
        return currentMesh;
    }
	
	this.isClosed = function(tubeMeshParams)
	{
		var a = tubeMeshParams['Starting Shape'];
		if (a === 1 || a === 7 || a === 8 || a === 9 || a === 10 || a === 11 || a === 12 || a === 13 || a === 14 || a === 15 || a === 16  )
		{
			return true;
		}
		else
			return false;
	}
	
	this.nameMaterial= function (material)
	{
		this.m.name = material;
	}
	
	function updateHash(tubeMeshBuilder)
	{
		var inchConversion = 0.0393701;
		var xInches = (currentMesh.xDim*inchConversion).toFixed(2);
		var yInches = (currentMesh.yDim*inchConversion).toFixed(2);
		var zInches = (currentMesh.zDim*inchConversion).toFixed(2);
		
		currentMesh['Description'] = xInches +' by '+ yInches +' by '+ zInches +' inch piece in ' +currentMesh.officialName +'.';
		
		var keys = Object.keys(currentMesh);
		if (typeof currentMesh.figure != 'undefined')
		{
			currentMesh['Rotation X'] = currentMesh.figure.rotation.x;
			currentMesh['Rotation Y'] = currentMesh.figure.rotation.y;
		}
		
		if (loop.fIndex >= 0)
		{
			currentMesh['Face Index'] = loop.fIndex;
			currentMesh['Face Index Incrementor'] = loop.faceIndexIncrementor;
			currentMesh['Torus Rotation'] = loop.torusRotation;
			currentMesh['Torus 90 Rotations'] = loop.torusRotationNinety;
		}
		else
			currentMesh['Face Index'] = -1;
		hashend = "";
		for (var x=0; x<keys.length; x++)
		{
			if (keys[x] == 'Description')
			{
				hashend += currentMesh[keys[x]];
				break;
			}
			hashend += currentMesh[keys[x]]+"|"; 
		}

	}
};