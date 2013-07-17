var hashend;

var TubeMeshBuilder = function(materialsLibrary) {
	var knot, geometry, stl, figure, closed, scale, intersects, torusLoop, radius;
	var inchConversion = 0.0393701;
	this.m = materialsLibrary.getMaterial( "Brass gold plated polished" );
	this.m.name = 'Brass gold plated polished';
	this.officialName = 'Gold-Plated Solid Brass';
	this.faceIndexIncrementor = 0;
	this.torusRotation = 0;
	this.torusRotationNinety = 0;
	this.fIndex = -1;
	this.xDim = 0; 
	this.yDim = 0; 
	this.zDim = 0; 
	this.matLib = materialsLibrary;
	
	//Scoping out of functions
	var segments = 600, radiusSegments = 8;

    this.build = function(tubeMeshParams) {
		updateHash(tubeMeshParams, this);
		radius = tubeMeshParams['Thickness'];
		scale = tubeMeshParams['Scale'];
		this.m = materialsLibrary.getMaterial(tubeMeshParams['Material']);
		closed = this.isClosed (tubeMeshParams);
		knot = new curveMaker(tubeMeshParams);
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
		
        figure.rotation.x = tubeMeshParams['Rotation X'];
        figure.rotation.y = tubeMeshParams['Rotation Y'];
        figure.rotation.z = 0;	

		if (typeof screenShot === 'undefined')
			figure.scale.x = figure.scale.y = figure.scale.z = tubeMeshParams['Scale'];
		else
			figure.scale.x = figure.scale.y = figure.scale.z = .66;
        tubeMeshParams.figure = figure;
		
        return tubeMeshParams;
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
	
	//Saves the shape (currently to your computer) as an STL file.
	this.saveSTL = function(torusDefined)
	{
		var stlFile = createSTL(torusDefined);
		var blob = new Blob ([stlFile], {type: 'text/plain'});
		saveAs (blob, 'test.stl');
	}
	
	this.removeFaces = function()
	{
		// Testing new functionality - does not work currently
		var oldGeometry = geometry;
		var oldFaces = oldGeometry.faces;
		var oldVertices = oldGeometry.vertices;
		var oldNormals = oldGeometry.normals;
		var intersects;
		var intersectedFaces;
		var oneInter, twoInter;
		
		//Construct new geometry
		var testBox = new THREE.CubeGeometry( 50, 50, 50);
		console.log('oldFaces',oldFaces.length);
		
		var newGeometry = new THREE.Geometry();
		var tempFacesGeometry = new THREE.Geometry();
		figure.geometry.computeFaceNormals();
		
		for (var q = 0; q < oldFaces.length; q++) {
			THREE.GeometryUtils.merge (newGeometry, tempFacesGeometry);	
		}
		
		var unaffectedFaces = [];

		for (var i = 0; i < oldFaces.length; i++){
			var vectAB = new THREE.Vector3();
			var vectCD = new THREE.Vector3();
			vectAB.subVectors(oldVertices[oldFaces[i].a], oldVertices[oldFaces[i].b]);
			console.log('hmm ', vectAB);
			vectCD.subVectors(oldVertices[oldFaces[i].c], oldVertices[oldFaces[i].d]);
			
			var raycasterAB = new THREE.Raycaster ( oldVertices[oldFaces[i].a], vectAB );
			var lengthAB = vectAB.length();
			intersectsAB = raycasterAB.intersectObject( figure );
			
			var raycasterCD = new THREE.Raycaster ( oldVertices[oldFaces[i].c], vectCD );
			var lengthCD = vectCD.length();
			intersectsCD = raycasterCD.intersectObject( sceneWrapper.currentMesh.figure );
			
			//console.log('AB Length: ', lengthAB);
			//console.log('CD Length: ', lengthCD);
			console.log('Current face: ', i);
			console.log('AB Intersects: ',intersectsAB);
			console.log('CD Intersects: ',intersectsCD);

			if (intersectsAB.length === 0 && intersectsCD.length === 0)
					unaffectedFaces.push(oldFaces[i]);
			else if (intersectsAB.length > 0 && intersectsCD.length > 0)
			{
				if (intersectsAB[0].distance > lengthAB && intersectsCD[0].distance > lengthCD)
					unaffectedFaces.push(oldFaces[i]);
			}
			else if (intersectsAB.length > 0)
			{
				if (intersectsAB[0].distance > lengthAB && intersectsCD.length === 0)
					unaffectedFaces.push(oldFaces[i]);
			}
			else if(intersectsCD.length > 0)
			{
				if (intersectsAB.length === 0 && intersectsCD[0].distance > lengthCD)
					unaffectedFaces.push(oldFaces[i]);
			}
			else
				;//unaffectedFaces.push(oldFaces[i]);
		}
		
		console.log('faces',unaffectedFaces.length);
		
		
		var modFaces = 	oldGeometry.faces.splice(0,300);
		
		for (var i = 0; i < oldVertices.length; i++){
			newGeometry.vertices.push(oldVertices[i]);
		}
		for (var i = 0; i < unaffectedFaces.length; i++){
			newGeometry.faces.push(unaffectedFaces[i]);
		}
		
		newGeometry.computeCentroids();
		newGeometry.computeFaceNormals();
		newGeometry.computeVertexNormals();
		
		//merge and return new mesh
		THREE.GeometryUtils.merge (newGeometry, testBox );
		
		var newMesh = new THREE.Mesh(newGeometry, this.m)
		return newMesh;
		
		//Adding to arrays: newGeometry.vertices.push(vertex);
		//Remove from array (say, at position 4): newGeometry.vertices.splice(4, 1);
			//The second parameter allows you to remove multiple things, so if you made that a two, it would delete what is in positions 4 and 5, etc.
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

		if (material.indexOf('Plastic') !== -1 || material.indexOf('Transparent resin') !== -1 || material.indexOf('Prime gray') !== -1)
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
	
		
		this.xDim = (xMax - xMin);
		this.yDim = (yMax - yMin);
		this.zDim = (zMax - zMin);
		
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
		
		xDimSize = (xMax - xMin) * inchConversion;
		yDimSize = (yMax - yMin) * inchConversion;
		zDimSize = (zMax - zMin) * inchConversion;
		
		xVal = xDimSize.toFixed(2);
		yVal = yDimSize.toFixed(2);
		zVal = zDimSize.toFixed(2);
		
		if (variables === 'xyz')
		{
			document.getElementById('idCostDim').innerHTML = xVal + ' (w) x '  + yVal + ' (h) x ' + zVal + ' (d)<br><br>Dimensions in Inches';
			document.getElementById('idVShapeDiv').innerHTML = '<span style="font-size: 24px"><b>' + yVal + '</b></span><br><span style="font-size: 14px">(Inches high)<span>';
			document.getElementById('idHShapeDiv').innerHTML = '<span style="font-size: 24px"><b>' + xVal + '</b></span><br><span style="font-size: 14px">(Inches wide)<span>';		
		}
		else if (variables === 'xy')
		{
			document.getElementById('idHShapeDiv').innerHTML = '<span style="font-size: 24px"><b>' + xVal + '</b></span><br><span style="font-size: 14px">(Inches wide)<span>';	
			document.getElementById('idVShapeDiv').innerHTML = '<span style="font-size: 24px"><b>' + yVal + '</b></span><br><span style="font-size: 14px">(Inches high)<span>';
		}
	}
	
	this.checkDimensions = function()
	{
		var dimensionsPrintable = 'success';
		var material = this.m.name;
		var thicknessOfWire = radius * figure.scale.x;

		if (material.indexOf('Plastic') !== -1 || material.indexOf('Transparent resin') !== -1 || material.indexOf('Prime gray') !== -1 || material === 'Alumide regular')
		{
			if (!(thicknessOfWire > .675))
				dimensionsPrintable = 'small';
			else if (!(this.checkUpperDimensions()))
				dimensionsPrintable = 'large';
		}
		else if (material === 'Alumide polished')
		{
			if (!(thicknessOfWire > .875))
				dimensionsPrintable = 'small';
			else if (!(this.checkUpperDimensions()))
				dimensionsPrintable = 'large';
		}
		else if (material.indexOf('Stainless steel') !== -1)
		{
			if (!(thicknessOfWire > 1.5))
				dimensionsPrintable = 'small';
			else if (!(this.checkUpperDimensions()))
				dimensionsPrintable = 'large';
		}
		else //Precious metals and brass
		{
			if (!(thicknessOfWire > .65))
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
			fitsBounds = (this.xDim < 220 && this.yDim < 170 && this.zDim < 300);
		else if (material.indexOf('Plastic regular' !== -1))
			fitsBounds = (this.xDim < 140 && this.yDim < 140 && this.zDim < 140);
		else if (material.indexOf('Plastic detail' !== -1))
			fitsBounds = (this.xDim < 240 && this.yDim < 240 && this.zDim < 190);
		else if (material.indexOf('Prime gray' !== -1))
			fitsBounds = (this.xDim < 240 && this.yDim < 240 && this.zDim < 225);
		else if (material.indexOf('Transparent resin' !== -1))
			fitsBounds = (this.xDim < 2090 && this.yDim < 690 && this.zDim < 790);
		else if (material.indexOf('Alumide' !== -1))
			fitsBounds = (this.xDim < 300 && this.yDim < 220 && this.zDim < 170);
		else if (material.indexOf('Brass' !== -1))
			fitsBounds = (this.xDim < 85 && this.yDim < 60 && this.zDim < 120);
		else if (material.indexOf('Stainless steel' !== -1))
			fitsBounds = (this.xDim < 990	 && this.yDim < 440 && this.zDim < 170);
		else if (material === 'Silver regular' || material === 'Silver glossy')
			fitsBounds = (this.xDim < 105	 && this.yDim < 105 && this.zDim < 28);
		else if (material === 'Silver premium')	
			fitsBounds = (this.xDim < 95	 && this.yDim < 95 && this.zDim < 28);
		else if (material.indexOf('Titanium' !== -1))
			fitsBounds = (this.xDim < 240 && this.yDim < 240 && this.zDim < 390);
		else if (material.indexOf('Gold' !== -1))
			fitsBounds = (this.xDim < 85 && this.yDim < 60 && this.zDim < 120);

		return fitsBounds;
	}
	
	function updateHash(tubeMesh, tubeMeshBuilder)
	{
		var xInches = (tubeMeshBuilder.xDim*inchConversion).toFixed(2);
		var yInches = (tubeMeshBuilder.yDim*inchConversion).toFixed(2);
		var zInches = (tubeMeshBuilder.zDim*inchConversion).toFixed(2);
		
		tubeMesh['Description'] = xInches +' by '+ yInches +' by '+ zInches +' inch piece in ' +tubeMeshBuilder.officialName +'.';
		
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
			if (keys[x] == 'Description')
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
            var transformations = ['Scale', 'Modify', 'Depth', 'Stretch', 'Loops', 'Starting Shape', 'Thickness', 'Material', 'Face Index', 'Face Index Incrementor', 'Torus Rotation', 'Torus 90 Rotations', 'Rotation X', 'Rotation Y', 'Description'];
            for (var x=0; x<transformations.length; x++)
            {
                if (transformations[x] == 'Material' || transformations[x] == 'Description')
                    this[transformations[x]] = parseme[x];
                else
                    this[transformations[x]] = parseFloat(parseme[x]);
                
                if (parseme[x].indexOf("undefined") != -1)
                    throw "invalid";
            }

            if (parseme == "")
                throw "invalid";
				$( "#slider" ).slider( "value", this['Scale'] * 100 );
            return;
        }
        catch(e)
        {
            
        }
        
		this['Scale'] = .66;
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
		this['Description'] = '';
};