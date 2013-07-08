var hashend;

var TubeMeshBuilder = function(materialsLibrary) {
	var knot, geometry, stl, closed, figure, scale, intersects, torusLoop;
	var xDim, yDim, zDim, xDimMm, yDimMm, zDimMm, radius;
	this.m = materialsLibrary.getMaterial( "Brass gold plated polished" );
	this.m.name = 'Brass gold plated polished';
	this.faceIndexIncrementor = 0;
	this.torusRotation = 0;
	this.torusRotationNinety = 0;
	this.fIndex = -1;
	
	//Scoping out of functions
	var segments = 600, radiusSegments = 8;

    this.build = function(tubeMeshParams) {
		updateHash(tubeMeshParams);
		radius = tubeMeshParams['Thickness'];
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
	this.saveSTL = function(torusDefined)
	{
		var stlFile = createSTL(torusDefined);
		var blob = new Blob ([stlFile], {type: 'text/plain'});
		saveAs (blob, 'test.stl');
	}
	
	//Generates an STL file using the shape currently on the screen.
	function createSTL(torusDefined)
	{
		var vertices = geometry.vertices;
		var faces = geometry.faces;
		
		stl = 'solid test \n';
		//Loop for all faces, adding each vertex to the stl file and making triangles from them.
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

		if (torusDefined)
		{
			faces = torusLoop.geometry.faces;
			vertices = torusLoop.geometry.vertices;
			
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
			return ''+ vector.x*.4 + ' '+ vector.y*.4 + ' '+ vector.z*.4;
		else
			return ''+ vector.x*figure.scale.x + ' '+ vector.y*figure.scale.y + ' '+ vector.z*figure.scale.z;
	}
	
	function convertVertexToString(vector, isTorus)
	{
		return 'vertex '+ convertVectorToString(vector, isTorus) + ' \n';
	}
	
	//Adding loops:
	this.addLoop = function (rC)
	{
		var raycaster = rC;
		intersects = raycaster.intersectObject(figure);
		
		if (intersects.length > 0)
		{
			this.fIndex = intersects[0].faceIndex;
			return true;
		}
		return false;
	}
	
	this.createTorus = function ()
	{
		var torus = new THREE.TorusGeometry( 5, 1, segments/10, 50 );
		this.fIndex = this.calculateFaceIndex();
		var faceNormal = geometry.faces[this.fIndex].normal;
		faceNormal.normalize();
		
		var faceCentroid = geometry.faces[this.fIndex].centroid;

		var v1 = geometry.vertices[geometry.faces[this.fIndex].a];
		var v2 = geometry.vertices[geometry.faces[this.fIndex].b];
		var v3 = geometry.vertices[geometry.faces[this.fIndex].c]; 
		var forwardVector = new THREE.Vector3();
		if (this.torusRotationNinety === 0)
			forwardVector.subVectors(v1, v2);
		else
			forwardVector.subVectors(v2, v3);
		forwardVector.normalize();

		var midX = (v1.x + v2.x) / 2;
		var midY = (v1.y + v2.y) / 2;
		var midZ = (v1.z + v2.z) / 2;
		
		var midpoint = new THREE.Vector3( midX, midY, midZ );
		
		torus.matrixAutoUpdate = false;
		
		var alignMatrix = new THREE.Matrix4().lookAt( midpoint, faceCentroid, faceNormal );
		torus.applyMatrix(alignMatrix);
		alignMatrix = new THREE.Matrix4().makeRotationAxis( faceNormal, this.torusRotationNinety );
		torus.applyMatrix(alignMatrix);
		alignMatrix = new THREE.Matrix4().makeRotationAxis( forwardVector, this.torusRotation );
		torus.applyMatrix(alignMatrix);

		torusLoop = new THREE.Mesh(torus, this.m);
		
		if (this.m.name.indexOf('Stainless steel') !== -1)
		{
			torusLoop.scale.x = torusLoop.scale.y = torusLoop.scale.z = .53;
			var scale = figure.scale.x / .53;
		}
		else
		{
			torusLoop.scale.x = torusLoop.scale.y = torusLoop.scale.z = .4;
			var scale = figure.scale.x / .4;
		}
		
		var cenPosX = geometry.faces[this.fIndex].centroid.x * scale;
		var cenPosY = geometry.faces[this.fIndex].centroid.y * scale;
		var cenPosZ = geometry.faces[this.fIndex].centroid.z * scale;

		this.torusX = cenPosX;
		this.torusY = cenPosY;
		this.torusZ = cenPosZ;

		torusLoop.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(cenPosX, cenPosY, cenPosZ));

		torusLoop.geometry.computeCentroids();
		torusLoop.geometry.computeFaceNormals();
		torusLoop.geometry.computeVertexNormals();
		torus = torusLoop;
		
		return torusLoop;
	}
	
	
	this.calculateFaceIndex = function()
	{
		var sectionNumber = Math.floor(this.fIndex / radiusSegments);
		var high = -1, fIndexHigh = -1;
		var newFace, newValue;
		for (var i = 0; i < radiusSegments; i++)
		{
			newFace = geometry.faces[sectionNumber*radiusSegments + i];
			newValue = Math.abs(newFace.centroid.x) + Math.abs(newFace.centroid.y);
			if (newValue > high)
			{
				high = newValue;
				fIndexHigh = sectionNumber*radiusSegments + i;
			}
		}
		
		var fIndexDiff = fIndexHigh - sectionNumber*radiusSegments;
		var incr = (this.faceIndexIncrementor+fIndexDiff)%radiusSegments;
		if (incr < 0)
			incr = radiusSegments + incr;
		fIndexHigh = sectionNumber*radiusSegments + incr;
		
		return fIndexHigh;
	}
	
	this.calculateDimensions = function(variables, torusDefined)
	{
		geometry.computeBoundingBox();
		var boundingBox = geometry.boundingBox;
		
		var dimensions = [];
		var scale = figure.scale.x;
		
		var xMin = boundingBox.min.x * scale;
		var yMin = boundingBox.min.y * scale;
		var zMin = boundingBox.min.z * scale;
		var xMax = boundingBox.max.x * scale;
		var yMax = boundingBox.max.y * scale;
		var zMax = boundingBox.max.z * scale;
		var xVal, yVal, zVal;
	
		xDim = (xMax - xMin) * 0.0393701;
		yDim = (yMax - yMin) * 0.0393701;
		zDim = (zMax - zMin) * 0.0393701;
		
		if (torusDefined)
		{
			torusLoop.geometry.computeBoundingBox();
			var torusBox = torusLoop.geometry.boundingBox;
			
			var torusxMin = torusBox.min.x * .4;
			var torusyMin = torusBox.min.y * .4;
			var toruszMin = torusBox.min.z * .4;
			var torusxMax = torusBox.max.x * .4;
			var torusyMax = torusBox.max.y * .4;
			var toruszMax = torusBox.max.z * .4;
			
			if (torusxMin < xMin)
				xMin = torusxMin;
			if (torusyMin < yMin)
				yMin = torusyMin;
			if (toruszMin < zMin)
				zMin = toruszMin;
			if (torusxMax > xMax)
				xMin = torusxMin;
			if (torusyMax > yMax)
				yMax = torusyMax;
			if (toruszMax > zMax)
				zMax = toruszMax;
		}
		
		if (variables === 'xyz')
		{
			xVal = Math.floor(xDim * 100) / 100;
			yVal = Math.floor(yDim * 100) / 100;
			zVal = Math.floor(zDim * 100) / 100;
			
			$( "#dimensions" ).val(xVal+' by '.concat(yVal+' by ').concat(zVal+' inches'));
			$( "#xwidth" ).val(xVal);
			$( "#yheight" ).val(yVal);
		}
		else if (variables === 'xy')
		{
			xVal = Math.floor(xDim * 100) / 100;
			yVal = Math.floor(yDim * 100) / 100;
			zVal = Math.floor(zDim * 100) / 100;
		
			$( "#xwidth" ).val(xVal);
			$( "#yheight" ).val(yVal);
		}
	}
	
	this.checkDimensions = function()
	{
		var dimensionsPrintable = 'success';
		xDimMm = xDim * 25.4;
		yDimMm = yDim * 25.4;
		zDimMm = zDim * 25.4;
		
		var thicknessOfWire = radius * figure.scale.x;
		console.log(thicknessOfWire);
	
		if (this.m.name.indexOf('Stainless steel') !== -1)
		{
			if (!(xDimMm > 3.5 && yDimMm > 3.5 && zDimMm > 3.5 && thicknessOfWire > 1.75))
				dimensionsPrintable = 'small';
			else if (!(this.checkUpperDimensions()))
				dimensionsPrintable = 'large';
		}
		else
		{
			if (!(xDimMm > 2 && yDimMm > 2 && zDimMm > 2 && thicknessOfWire > 1))
				dimensionsPrintable = 'small';
			else if (!(this.checkUpperDimensions()))
				dimensionsPrintable = 'large';
		}
		
		return dimensionsPrintable;
	}
	
	this.checkUpperDimensions = function()
	{
		var fitsBounds;
		
		if (this.m.name === 'Plastic regular white' || this.m.name === 'Plastic regular black')
			fitsBounds = (xDimMm < 220 && yDimMm < 170 && zDimMm < 300);
		else if (this.m.name.indexOf('Plastic regular' !== -1))
			fitsBounds = (xDimMm < 140 && yDimMm < 140 && zDimMm < 140);
		else if (this.m.name.indexOf('Plastic detail' !== -1))
			fitsBounds = (xDimMm < 240 && yDimMm < 240 && zDimMm < 190);
		else if (this.m.name.indexOf('Transparent resin' !== -1))
			fitsBounds = (xDimMm < 2090 && yDimMm < 690 && zDimMm < 790);
		else if (this.m.name.indexOf('Alumide' !== -1))
			fitsBounds = (xDimMm < 300 && yDimMm < 220 && zDimMm < 170);
		else if (this.m.name.indexOf('Brass' !== -1))
			fitsBounds = (xDimMm < 85 && yDimMm < 60 && zDimMm < 120);
		else if (this.m.name.indexOf('Stainless steel' !== -1))
			fitsBounds = (xDimMm < 990	 && yDimMm < 440 && zDimMm < 170);
		else if (this.m.name === 'Silver regular' || this.m.name === 'Silver glossy')
			fitsBounds = (xDimMm < 105	 && yDimMm < 105 && zDimMm < 28);
		else if (this.m.name === 'Silver premium')	
			fitsBounds = (xDimMm < 95	 && yDimMm < 95 && zDimMm < 28);
		else if (this.m.name.indexOf('Titanium' !== -1))
			fitsBounds = (xDimMm < 240 && yDimMm < 240 && zDimMm < 390);
		else if (this.m.name.indexOf('Gold' !== -1))
			fitsBounds = (xDimMm < 85 && yDimMm < 60 && zDimMm < 120);

		return fitsBounds;
	}
	
	function updateHash(tubeMesh)
	{
		var keys = Object.keys(tubeMesh);
		if (typeof tubeMesh.figure != 'undefined')
		{
			tubeMesh['Rotation X'] = tubeMesh.figure.rotation.x;
			tubeMesh['Rotation Y'] = tubeMesh.figure.rotation.y;
		}
		
		if (this.sceneWrapper.tubeMeshBuilder.fIndex >= 0)
			tubeMesh['Face Index'] = this.sceneWrapper.tubeMeshBuilder.fIndex;
		else
			tubeMesh['Face Index'] = -1;
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
        try
        {
            var parseme = savedShape.split("|");
            var transformations = ['Scale', 'Modify', 'Depth', 'Stretch', 'Loops', 'Starting Shape', 'Thickness', 'Material', 'Face Index', 'Face Index Incrementor', 'Torus Rotation', 'Torus 90 Rotations', 'Rotation X', 'Rotation Y'];
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
        
		this['Scale'] = 1;
		this['Modify'] = 5;
		this['Depth'] = 1;
		this['Stretch'] = 1;
		this['Loops'] = 2;
		this['Starting Shape'] = 1;
		this['Thickness'] = 1.75;
		this['Material'] = 'Brass gold plated polished';
		this['Face Index'] = -1;
		this['Face Index Incrementor'] = 0;
		this['Torus Rotation'] = 0;
		this['Torus 90 Rotations'] = 0;
		this['Rotation X'] = 0;
		this['Rotation Y'] = 0;
};