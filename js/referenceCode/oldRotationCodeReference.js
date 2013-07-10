/*
This was old code used in trying to figure out the way to rotate the torus to the face and I didn't want to get rid of it.
I'm sure the syntax or parts of it will be useful in the future.

Biggest takeaways:

1) .makeRotationAxis - creates rotation matrix given an axis and a degree value. Rotates it on that axis based on number of degrees
2) To rotate something from one place to another - have to calculate the rotation axis and the theta based on the code below. 




*/
		
	/*	
		var torusRadius = 5;
		var torus = new THREE.TorusGeometry( torusRadius, 1.5, segments/10, 50 );
		fIndex = this.calculateFaceIndex();
		
		//Get face normal
		var faceNormal = geometry.faces[fIndex].normal;
		faceNormal.normalize();
		
		//Direction vector of Torus (Y = 1)
		var torusAxis = new THREE.Vector3( 0, 1, 0);
		
		//Find the axis of rotation through Cross Product
		var rotationAxis = new THREE.Vector3();
		rotationAxis.crossVectors( faceNormal, torusAxis );
		if ( rotationAxis.length() == 0)  // Acounting for special case where the axis are aligned
		 {
			 rotationAxis.set( 1, 0, 0);
		 }
		rotationAxis.normalize();
		
		//Now that we have the needed data, determine angle of rotation
		var theta = Math.acos( faceNormal.dot( torusAxis ));
		theta = -theta;
		//console.log('theta',theta);
		
		//Don't use position, rotate, scale
		torus.matrixAutoUpdate = false;

		//Rotate it to be perpindicular to the face
		var axisMatrix = new THREE.Matrix4().makeRotationAxis( rotationAxis, theta );
		//torus.applyMatrix(axisMatrix);

		//Now determine vector between vertices b and c		
		var v1 = geometry.vertices[geometry.faces[fIndex].a];
		var v2 = geometry.vertices[geometry.faces[fIndex].b];
		var endTorusXAxis = new THREE.Vector3();
		endTorusXAxis.subVectors( v1, v2 );
		endTorusXAxis.normalize();
		
		//Determine current torus X rotation by taking angle 90 degrees of vertex normal
		var torusAxisX = new THREE.Vector3( -1, 0, 0);
		
		//Find the second axis of rotation through Cross Product
		var secondRotationAxis = new THREE.Vector3();
		secondRotationAxis.crossVectors( endTorusXAxis, torusAxisX  );
		if ( secondRotationAxis.length() == 0)  // Acounting for special case where the axis are aligned
		 {
			 secondRotationAxis.set( 1, 0, 0);
		 }
		secondRotationAxis.normalize();
		
		//Now that we have the needed data, determine angle of rotation
		var gamma = Math.acos( endTorusXAxis.dot( torusAxisX ));
		gamma = -gamma;
		
		//Rotate to align with face
		var axisMatrixAlign = new THREE.Matrix4().makeRotationAxis( secondRotationAxis, gamma );
		
		
		//Determine X Axis rotation angle
	
		var xAngle = Math.acos( endTorusXAxis.dot( torusXAxis ));
		//console.log('angle1',xAngle);
		
		xAngle = -xAngle;
		//console.log('angle2',xAngle);
		
		
			if (Math.abs(xAngle) > (90 * Math.PI/180)){
				xAngle =  Math.PI - xAngle;
				//xAngle += 90;
			}
			else {
				//xAngle = -xAngle;
				
			}
			console.log('angle2',xAngle);
		
		
		
		//console.log('axisMatrix',axisMatrix);
		//console.log('rotMatrix',rotMatrix);
		
		var comMatrix = new THREE.Matrix4();
		comMatrix.multiplyMatrices(axisMatrix, axisMatrixAlign );
		console.log('comM',comMatrix);
		torus.applyMatrix(comMatrix);
	
				
		
		// Create mesh and scale
		torusLoop = new THREE.Mesh(torus, this.m);
		torusLoop.scale.x = torusLoop.scale.y = torusLoop.scale.z = tubeMeshParams['Scale'];
		
		//Determine Face centroid positions
		var cenPosX = geometry.faces[fIndex].centroid.x;
		var cenPosY = geometry.faces[fIndex].centroid.y;
		var cenPosZ = geometry.faces[fIndex].centroid.z;

		//Move the rotated torus around the centroid
		
		torusLoop.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(cenPosX, cenPosY, cenPosZ));
		
		
		VOLUME OF RESIN THING AND STUFF
		function priceOfResin(figure)
		{
			var price = 0;
			var volume = calculateVolume (figure, figure.scale.x);
			volume *= 1000;
			
			if (volume < 20000)
				price = 4.5069 * Math.log(volume) + 30.805;
			else
				price = 0.0012 * volume + 62.55;
			
			return price * 1.28 * 1.3;
		}
		
		
	*/	