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
            return ''+ vector.x*torusLoop.scale.x + ' '+ vector.y*torusLoop.scale.x + ' '+ vector.z*torusLoop.scale.x;
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
	
	this.createTorus = function (material)
	{
		var thickness, scale;
		if (material.indexOf('Plastic') !== -1 || material.indexOf('Transparent resin') !== -1)
		{
			thickness = 1.5;
			scale = .5;
		}
		else if (material === 'Alumide regular')
		{
			thickness = 1.6;
			scale = .55;
		}
		else if (material === 'Alumide polished')
		{
			thickness = 1.65;
			scale = .6;
		}
		else if (material.indexOf('Stainless steel') !== -1)
		{
			thickness = 2.0;
			scale = .7;
		}
		else //Precious metals and brass
		{
			thickness = 1.5;
			scale = .42;
		}
		
		var torus = new THREE.TorusGeometry( 5, thickness, segments/10, 50 );
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
		
		var centerScale = figure.scale.x/scale;
		var cenPosX = geometry.faces[this.fIndex].centroid.x * centerScale;
		var cenPosY = geometry.faces[this.fIndex].centroid.y * centerScale;
		var cenPosZ = geometry.faces[this.fIndex].centroid.z * centerScale;

		this.torusX = cenPosX;
		this.torusY = cenPosY;
		this.torusZ = cenPosZ;

		torusLoop.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(cenPosX, cenPosY, cenPosZ));
		torusLoop.scale.set(scale, scale, scale);
		
		//Now translate from centroid up an amount along normal vector
		var upAmount = 1.25;
		var fromFace = faceNormal.setLength(upAmount);
		torusLoop.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(fromFace.x, fromFace.y, fromFace.z));
		
		
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
	
		
		xDim = (xMax - xMin);
		yDim = (yMax - yMin);
		zDim = (zMax - zMin);
		
		if (torusDefined)
		{
			torusLoop.geometry.computeBoundingBox();
			var torusBox = torusLoop.geometry.boundingBox;
			var torusScale = torusLoop.scale.x;
			
			var torusxMin = torusBox.min.x * torusScale;
			var torusyMin = torusBox.min.y * torusScale;
			var toruszMin = torusBox.min.z * torusScale;
			var torusxMax = torusBox.max.x * torusScale;
			var torusyMax = torusBox.max.y * torusScale;
			var toruszMax = torusBox.max.z * torusScale;
			
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
		
		var inchConversion = 0.0393701;
		xDimSize = (xMax - xMin) * inchConversion;
		yDimSize = (yMax - yMin) * inchConversion;
		zDimSize = (zMax - zMin) * inchConversion;
		
		if (variables === 'xyz')
		{
			xVal = Math.floor(xDimSize * 100) / 100;
			yVal = Math.floor(yDimSize * 100) / 100;
			zVal = Math.floor(zDimSize * 100) / 100;
			
			document.getElementById('idCostDim').innerHTML = xVal + ' (w) x '  + yVal + ' (h) x ' + zVal + ' (d)<br><br>Dimensions in Inches';
			document.getElementById('idVShapeDiv').innerHTML = '<span style="font-size: 24px"><b>' + yVal + '</b></span><br><span style="font-size: 14px">(Inches high)<span>';
			document.getElementById('idHShapeDiv').innerHTML = '<span style="font-size: 24px"><b>' + xVal + '</b></span><br><span style="font-size: 14px">(Inches wide)<span>';		
			
		}
		else if (variables === 'xy')
		{
			xVal = Math.floor(xDimSize * 100) / 100;
			yVal = Math.floor(yDimSize * 100) / 100;
			zVal = Math.floor(zDimSize * 100) / 100;
		
			$( "#xwidth" ).val(xVal);
			$( "#yheight" ).val(yVal);
		}
	}
	
	this.checkDimensions = function()
	{
		var dimensionsPrintable = 'success';
		var material = this.m.name;
		var thicknessOfWire = radius * figure.scale.x;

		if (material.indexOf('Plastic') !== -1 || material.indexOf('Transparent resin') !== -1)
		{
			if (!(thicknessOfWire > .75))
				dimensionsPrintable = 'small';
			else if (!(this.checkUpperDimensions()))
				dimensionsPrintable = 'large';
		}
		else if (material === 'Alumide regular')
		{
			if (!(thicknessOfWire > .875))
				dimensionsPrintable = 'small';
			else if (!(this.checkUpperDimensions()))
				dimensionsPrintable = 'large';
		}
		else if (material === 'Alumide polished')
		{
			if (!(thicknessOfWire > 1))
				dimensionsPrintable = 'small';
			else if (!(this.checkUpperDimensions()))
				dimensionsPrintable = 'large';
		}
		else if (material.indexOf('Stainless steel') !== -1)
		{
			if (!(thicknessOfWire > 1.625))
				dimensionsPrintable = 'small';
			else if (!(this.checkUpperDimensions()))
				dimensionsPrintable = 'large';
		}
		else //Precious metals and brass
		{
			if (!(thicknessOfWire > .625))
				dimensionsPrintable = 'small';
			else if (!(this.checkUpperDimensions()))
				dimensionsPrintable = 'large';
		}
		
		return dimensionsPrintable;
	}
	
	this.checkUpperDimensions = function()
	{
		var fitsBounds;
		var material = this.m.name;
		
		if (material === 'Plastic regular white' || material === 'Plastic regular black')
			fitsBounds = (xDim < 220 && yDim < 170 && zDim < 300);
		else if (material.indexOf('Plastic regular' !== -1))
			fitsBounds = (xDim < 140 && yDim < 140 && zDim < 140);
		else if (material.indexOf('Plastic detail' !== -1))
			fitsBounds = (xDim < 240 && yDim < 240 && zDim < 190);
		else if (material.indexOf('Transparent resin' !== -1))
			fitsBounds = (xDim < 2090 && yDim < 690 && zDim < 790);
		else if (material.indexOf('Alumide' !== -1))
			fitsBounds = (xDim < 300 && yDim < 220 && zDim < 170);
		else if (material.indexOf('Brass' !== -1))
			fitsBounds = (xDim < 85 && yDim < 60 && zDim < 120);
		else if (material.indexOf('Stainless steel' !== -1))
			fitsBounds = (xDim < 990	 && yDim < 440 && zDim < 170);
		else if (material === 'Silver regular' || material === 'Silver glossy')
			fitsBounds = (xDim < 105	 && yDim < 105 && zDim < 28);
		else if (material === 'Silver premium')	
			fitsBounds = (xDim < 95	 && yDim < 95 && zDim < 28);
		else if (material.indexOf('Titanium' !== -1))
			fitsBounds = (xDim < 240 && yDim < 240 && zDim < 390);
		else if (material.indexOf('Gold' !== -1))
			fitsBounds = (xDim < 85 && yDim < 60 && zDim < 120);

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
		{
			tubeMesh['Face Index'] = this.sceneWrapper.tubeMeshBuilder.fIndex;
			tubeMesh['Face Index Incrementor'] = this.sceneWrapper.tubeMeshBuilder.faceIndexIncrementor;
			tubeMesh['Torus Rotation'] = this.sceneWrapper.tubeMeshBuilder.torusRotation;
			tubeMesh['Torus 90 Rotations'] = this.sceneWrapper.tubeMeshBuilder.torusRotationNinety;
		}
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