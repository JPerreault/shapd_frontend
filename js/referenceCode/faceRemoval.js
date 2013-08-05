//Stuff for button click:

// var newFigure = tubeMeshBuilder.removeFaces();
// sceneWrapper.scene.add(newFigure );
// sceneWrapper.scene.remove(sceneWrapper.currentMesh.figure);
// sceneWrapper.currentMesh.figure = newFigure;

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