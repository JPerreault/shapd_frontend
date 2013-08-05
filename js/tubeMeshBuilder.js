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
	
	//Scoping out of functions
	var segments = 600, radiusSegments = 6;

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
	
	this.saveSTL = function(torusDefined)
	{
		var stlFile = createSTL(torusDefined);
		var blob = new Blob ([stlFile], {type: 'text/plain'});
		saveAs (blob, 'test.stl');
	}
	
	function createSTL(torusDefined)
	{
		var vertices = geometry.vertices;
		var faces = geometry.faces;
		
		stl = 'solid test \n';
		for (var i = 0; i < faces.length; i++)
		{
			stl += 'facet normal ' + convertVectorToString(faces[i].normal) + ' \n';
			stl += 'outer loop \n';
			stl += convertVertexToString(vertices[faces[i].a]);
			stl += convertVertexToString(vertices[faces[i].b]);
			stl += convertVertexToString(vertices[faces[i].c]);
			stl += 'endloop \n';
			stl += 'endfacet \n';
			//Make the corresponding triangle unless the face in question is the cap.
			if ((i < faces.length - (2 * (radiusSegments - 2)) && closed == false) || closed == true)
			{
				stl += 'facet normal ' + convertVectorToString(faces[i].normal) + ' \n';
				stl += 'outer loop \n';
				stl += convertVertexToString(vertices[faces[i].a]);
				stl += convertVertexToString(vertices[faces[i].c]);
				stl += convertVertexToString(vertices[faces[i].d]);
				stl += 'endloop \n';
				stl += 'endfacet \n';
			}
		}

		if (loop.torusDefined)
		{
			faces = loop.loopMesh.geometry.faces;
			vertices = loop.loopMesh.geometry.vertices;
			
			for (var i = 0; i < faces.length; i++)
			{
				stl += 'facet normal ' + convertVectorToString(faces[i].normal, true) + ' \n';
				stl += 'outer loop \n';
				stl += convertVertexToString(vertices[faces[i].a], true);
				stl += convertVertexToString(vertices[faces[i].b], true);
				stl += convertVertexToString(vertices[faces[i].c], true);
				stl += 'endloop \n';
				stl += 'endfacet \n';
				
				stl += 'facet normal ' + convertVectorToString(faces[i].normal, true) + ' \n';
				stl += 'outer loop \n';
				stl += convertVertexToString(vertices[faces[i].a], true);
				stl += convertVertexToString(vertices[faces[i].c], true);
				stl += convertVertexToString(vertices[faces[i].d], true);
				stl += 'endloop \n';
				stl += 'endfacet \n';
			}
		}
		stl += 'endsolid';
		
		return stl;
	}
	
	function convertVectorToString(vector, isTorus)
	{
		if (isTorus)
            return ''+ vector.x*loop.loopMesh.scale.x + ' '+ vector.y*loop.loopMesh.scale.x + ' '+ vector.z*loop.loopMesh.scale.x;
        else
            return ''+ vector.x*figure.scale.x + ' '+ vector.y*figure.scale.y + ' '+ vector.z*figure.scale.z;
	}
	
	function convertVertexToString(vector, isTorus)
	{
		return 'vertex '+ convertVectorToString(vector, isTorus) + ' \n';
	}
	
	function updateHash(tubeMeshBuilder)
	{
		var inchConversion = 0.0393701;
		var xInches = (currentMesh.xDim*inchConversion).toFixed(2);
		var yInches = (currentMesh.yDim*inchConversion).toFixed(2);
		var zInches = (currentMesh.zDim*inchConversion).toFixed(2);
		
		currentMesh['Description'] = xInches +' by '+ yInches +' by '+ zInches +' inch piece in ' +tubeMeshBuilder.officialName +'.';
		
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