function createTorus (tubeMeshParams)
	{
		//Function to create, rotate, and translate a torus to a given face
		
		
		//Find position that's clicked on by user with RayCasting
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
		
		
		
		var torusRadius = 5;
		var torus = new THREE.TorusGeometry( torusRadius, 1.5, segments/10, 50 );
		fIndex = this.calculateFaceIndex();
		
		//Get face normal
		var faceNormal = geometry.faces[fIndex].normal;
		faceNormal.normalize();
		
		//Determine Face centroid positions
		var faceCentroid = geometry.faces[fIndex].centroid;

		//Now determine vector between vertices a and b on the face - the "long side"		
		var v1 = geometry.vertices[geometry.faces[fIndex].a];
		var v2 = geometry.vertices[geometry.faces[fIndex].b];

		
		//Determine midpoint of one side of face
		var midX = (v1.x + v2.x) / 2;
		var midY = (v1.y + v2.y) / 2;
		var midZ = (v1.z + v2.z) / 2;
		
		var midpoint = new THREE.Vector3( midX, midY, midZ );
		
		
		//Don't use position, rotate, scale
		torus.matrixAutoUpdate = false;
		
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