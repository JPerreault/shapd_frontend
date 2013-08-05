var Loop = function(materialLib)
{
	this.type = '';
	this.loopMesh;
	this.torusDefined = false;
	
	this.faceIndexIncrementor = 0;
	this.torusRotation = 0;
	this.torusRotationNinety = 0;
	this.fIndex = -1;
	
	var that = this;
	
	var segments = 600;
	var radiusSegments = 8;
	var matLib = materialLib;
	
	this.update = function(newType){
		this.type = newType;
	}
	
	this.addLoop = function (rC)
	{
		var raycaster = rC;
		intersects = raycaster.intersectObject(currentMesh.figure);
		
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

		if (material.indexOf('Alumide') !== -1)
		{
			thickness = 1.6;
			scale = .5;
		}
		else if (material.indexOf('Stainless steel') !== -1)
		{
			thickness = 1.8;
			scale = .7;
		}
		else //Plastics, precious metals and brass
		{
			thickness = 1.4;
			scale = .5;
		}
		
		var torus = new THREE.TorusGeometry( 4, thickness, segments/10, 50 );
		this.fIndex = this.calculateFaceIndex();
		var faceNormal = currentMesh.figure.geometry.faces[this.fIndex].normal;
		faceNormal.normalize();
		
		var faceCentroid = currentMesh.figure.geometry.faces[this.fIndex].centroid;
		var v1 = currentMesh.figure.geometry.vertices[currentMesh.figure.geometry.faces[this.fIndex].a];
		var v2 = currentMesh.figure.geometry.vertices[currentMesh.figure.geometry.faces[this.fIndex].b];
		var v3 = currentMesh.figure.geometry.vertices[currentMesh.figure.geometry.faces[this.fIndex].c]; 
		
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
		torusLoop = new THREE.Mesh(torus, matLib.getMaterial(material));
		
		var centerScale = currentMesh.figure.scale.x/scale;
		var cenPosX = currentMesh.figure.geometry.faces[this.fIndex].centroid.x * centerScale;
		var cenPosY = currentMesh.figure.geometry.faces[this.fIndex].centroid.y * centerScale;
		var cenPosZ = currentMesh.figure.geometry.faces[this.fIndex].centroid.z * centerScale;

		this.torusX = cenPosX;
		this.torusY = cenPosY;
		this.torusZ = cenPosZ;

		torusLoop.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(cenPosX, cenPosY, cenPosZ));
		torusLoop.scale.set(scale, scale, scale);
		
		if (this.type === 'tubeMeshBuilder')
		{
			var upAmount = 3 - .5 * (currentMesh.figure.radius * currentMesh.figure.scale.x);
			var fromFace = faceNormal.setLength(upAmount);
			torusLoop.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(fromFace.x, fromFace.y, fromFace.z));
		}	
		
		torusLoop.geometry.computeCentroids();
		torusLoop.geometry.computeFaceNormals();
		torusLoop.geometry.computeVertexNormals();
		
		this.loopMesh = torusLoop;
		return torusLoop;
	}
	
	
	this.calculateFaceIndex = function()
	{
		var sectionNumber = Math.floor(this.fIndex / radiusSegments);
		var high = -1, fIndexHigh = -1;
		var newFace, newValue;
		for (var i = 0; i < radiusSegments; i++)
		{
			newFace = currentMesh.figure.geometry.faces[sectionNumber*radiusSegments + i];
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
	
	document.getElementById('idRemoveLoop').onmousedown = function()
	{
		sceneWrapper.scene.remove(loop.torusMesh);
		that.torusDefined = false;
		currentMesh['Face Index'] = -1;
		that.fIndex = -1;
		$('#idLoopRotContainer').fadeOut(0);
		that.torusRotation = 0;
		that.torusRotationNinety = 0;
		
		if (document.getElementById('idlockLoop').innerHTML === 'Unlock<br>Loop')
		{
			document.addEventListener( 'mousedown', onDocumentMouseDown, false );
			document.getElementById('idlockLoop').innerHTML = 'Lock<br>Loop';
		}
	}
	
	document.getElementById('idlockLoop').onmousedown = function()
	{
		var loopButton = document.getElementById('idlockLoop');
		if (loopButton.innerHTML === 'Lock<br>Loop')
		{
			document.removeEventListener( 'mousedown', onDocumentMouseDown, false );
			loopButton.innerHTML = 'Unlock<br>Loop'
		}
		else
		{
			document.addEventListener( 'mousedown', onDocumentMouseDown, false );
			loopButton.innerHTML = 'Lock<br>Loop'
		}
	}
	
	document.getElementById('idLoopAroundRightButton').onmousedown = function()
	{						
		that.faceIndexIncrementor += 1;
		sceneWrapper.redrawTorus();
	}
	
	document.getElementById('idLoopAroundLeftButton').onmousedown = function()
	{
		that.faceIndexIncrementor -= 1;
		sceneWrapper.redrawTorus();
	}
	
	document.getElementById('idLoopMoreAngleButton').onmousedown = function()
	{
		if (that.torusRotation < 0.7853981634)
			that.torusRotation += 0.0872664626;
		sceneWrapper.redrawTorus();
	}
	
	document.getElementById('idLoopLessAngleButton').onmousedown = function()
	{
		if (that.torusRotation > -0.7853981634)
			that.torusRotation -= 0.0872664626;
		sceneWrapper.redrawTorus();
	}
	
	document.getElementById('idSpinDiv').onmousedown = function()
	{
		if (that.torusRotationNinety === 0)
			that.torusRotationNinety = 1.57079633;
		else
			that.torusRotationNinety = 0;
		sceneWrapper.redrawTorus();
	}
}