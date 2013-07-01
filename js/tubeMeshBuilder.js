var hashend;

var TubeMeshBuilder = function(materialsLibrary) {
	var knot, geometry, stl, closed, figure, torusLoop, scale;
	var fIndex, intersects;
	this.m = materialsLibrary.getMaterial( "Brass gold plated polished" );
	this.m.name = 'Brass gold plated polished';
	
	
	//Scoping out of functions
	var segments = 600, radiusSegments = 6;

    this.build = function(tubeMeshParams) {
		updateHash(tubeMeshParams);
		var radius = tubeMeshParams['Thickness'];
		scale = tubeMeshParams['Scale'];
		this.m = materialsLibrary.getMaterial(tubeMeshParams['Material']);
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
		if (typeof screenShot !== 'undefined')
			this.m.opacity = 1;
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
	this.nameMaterial= function (material)
	{
		this.m.name = material;
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
		
		var torusRadius = 5;
		var torus = new THREE.TorusGeometry( torusRadius, 1.5, segments/10, 50 );
		fIndex = this.calculateFaceIndex();
		
		//Get face normal
		var faceNormal = geometry.faces[fIndex].normal;
		faceNormal.normalize();
		
		//Determine Face centroid position
		var faceCentroid = geometry.faces[fIndex].centroid;

		//Determine vertices a and b on the face - the "long side"of face4	
		var v1 = geometry.vertices[geometry.faces[fIndex].a];
		var v2 = geometry.vertices[geometry.faces[fIndex].b];

		//Determine midpoint of line AB
		var midX = (v1.x + v2.x) / 2;
		var midY = (v1.y + v2.y) / 2;
		var midZ = (v1.z + v2.z) / 2;
		
		var midpoint = new THREE.Vector3( midX, midY, midZ );
		
		//Don't use position, rotate, scale
		torus.matrixAutoUpdate = false;
		
		//use matrix.lookAt to align torus to create rotation matrix aligned to two orthogonal vectors
		//Rotate to align with face
		var alignMatrix = new THREE.Matrix4().lookAt( midpoint, faceCentroid, faceNormal );
		torus.applyMatrix(alignMatrix);

		// Create mesh and scale
		torusLoop = new THREE.Mesh(torus, this.m);
		torusLoop.scale.x = torusLoop.scale.y = torusLoop.scale.z = tubeMeshParams['Scale'];
		
		//Determine Face centroid positions
		var cenPosX = geometry.faces[fIndex].centroid.x;
		var cenPosY = geometry.faces[fIndex].centroid.y;
		var cenPosZ = geometry.faces[fIndex].centroid.z;

		//Move the rotated torus around the centroid
		torusLoop.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(cenPosX, cenPosY, cenPosZ));

		//Move the rotated torus around the centroid
		torusLoop.geometry.computeCentroids();
		torusLoop.geometry.computeFaceNormals();
		torusLoop.geometry.computeVertexNormals();
		
		return torusLoop;
	}
	
	
	this.calculateFaceIndex = function()
	{
		//Calculate the face furthest away from the origin. Trying to put loop on the "outside" of the spline
		
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
	
this.calculateDimensions = function(variables)
	{
		geometry.computeBoundingBox();
		var boundingBox = figure.geometry.boundingBox;
		var dimensions = [];
		var scale = 5 / figure.scale.x * 5;
		
		var xMin = boundingBox.min.x / scale;
		var yMin = boundingBox.min.y / scale;
		var zMin = boundingBox.min.z / scale;
		var xMax = boundingBox.max.x / scale;
		var yMax = boundingBox.max.y / scale;
		var zMax = boundingBox.max.z / scale;
	
		var xVal = (xMax - xMin) * 0.393701;
		xVal = Math.floor(xVal * 100) / 100;
		var yVal = (yMax - yMin) * 0.393701;
		yVal = Math.floor(yVal * 100) / 100;
		var zVal = (zMax - zMin) * 0.393701;
		zVal = Math.floor(zVal * 100) / 100;
		
		if (variables === 'xyz')
		{
			$( "#dimensions" ).val(xVal+''.concat(' by ').concat(yVal).concat(' by ').concat(zVal+'').concat(' inches'));
			$( "#xwidth" ).val(xVal+''.concat(' inches'));
			$( "#yheight" ).val(yVal+''.concat(' inches'));
		}
		else if (variables === 'xy')
		{
			$( "#xwidth" ).val(xVal+''.concat(' inches'));
			$( "#yheight" ).val(yVal+''.concat(' inches'));
		}
		
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
        try
        {
            var parseme = savedShape.split("|");
            var transformations = ['Scale', 'Modify', 'Depth', 'Stretch', 'Loops', 'Starting Shape', 'Thickness', 'Material', 'Rotation X', 'Rotation Y'];
            for (var x=0; x<transformations.length; x++)
            {
                if (transformations[x] == 'Material')
                    this[transformations[x]] = parseme[x];
                else
                    this[transformations[x]] = parseFloat(parseme[x]);
                
                if (parseme[x].indexOf("undefined") != -1)
                    throw "invalid";
            }

            if (parseme == "")
                throw "invalid";
            
            return;
        }
        catch(e)
        {
            
        }
        
		this['Scale'] = 5;
		this['Modify'] = 5;
		this['Depth'] = 1;
		this['Stretch'] = 1;
		this['Loops'] = 2;
		this['Starting Shape'] = 1;
		this['Thickness'] = 4;
		this['Material'] = 'Brass gold plated polished';
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