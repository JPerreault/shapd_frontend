	/*
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	function onDocumentMouseMove(event)
	{
		if (loops)
		{
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			//updateSelected(mouse);
		}
	};
	
	function updateSelected(mouse)
	{
		if ( sceneWrapper.torusDefined )
		{
			var projector = new THREE.Projector();
			var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
			//sceneWrapper.torusMesh.name = 'torusMeshName';
			projector.unprojectVector( vector, sceneWrapper.camera );
			var ray = new THREE.Raycaster( sceneWrapper.camera.position, vector.sub( sceneWrapper.camera.position ).normalize() );
			// create an array containing all objects in the scene with which the ray intersects
			var intersects = ray.intersectObjects( sceneWrapper.scene.children );


		// INTERSECTED = the object in the scene currently closest to the camera 
		//		and intersected by the Ray projected from the mouse position 	
	
			// if there is one (or more) intersections
			if ( intersects.length > 0 )
			{
				console.log(intersects);
			// if the closest object intersected is not the currently stored intersection object
				if ( intersects[ 0 ].object != intersected ) 
				{  			//console.log(intersects[ 0 ]);
			    // restore previous intersection object (if it exists) to its original color
					if ( intersected ) 
						intersected.material.color.setHex( intersected.currentHex );
				// store reference to closest object as current intersection object
					intersected = intersects[ 0 ].object;
					//console.log(intersected);
				// store color of closest object (for later restoration)
					intersected.currentHex = intersected.material.color.getHex();
				// set a new color for closest object
					intersected.material.color.setHex( 0xffff00 );
				}
			} 
			else // there are no intersections
			{
			// restore previous intersection object (if it exists) to its original color
				if ( intersected ) 
					intersected.material.color.setHex( intersected.currentHex );
			// remove previous intersection object reference
			//     by setting current intersection object to "nothing"
				intersected = null;
			}
		
		}
	}

		}
	};
*/

//****Stuff from jsonmaker for volume related thing
// var cube_geometry = new THREE.CubeGeometry( 3, 3, 3 );
		// var cube_mesh = new THREE.Mesh( cube_geometry );
		// cube_mesh.position.x = -7;
		// var cube_bsp = new ThreeBSP( cube_mesh );

		// var sphere_geometry = new THREE.SphereGeometry( 1.8, 32, 32 );
		// var sphere_mesh = new THREE.Mesh( sphere_geometry );
		// sphere_mesh.position.x = -7;
		// var sphere_bsp = new ThreeBSP( sphere_mesh );

		// var subtract_bsp = cube_bsp.subtract( sphere_bsp );
		// var result = subtract_bsp.toMesh( figure.material );
		// result.geometry.computeVertexNormals();
		// sw.scene.add( result );
		// var xDim = sw.tubeMeshBuilder.xDim;
		// var yDim = sw.tubeMeshBuilder.yDim;
		// var zDim = sw.tubeMeshBuilder.zDim;
		// console.log('xdim: ', xDim, ' ydim: ', yDim, ' zdim: ', zDim);
		// var cube_geometry = new THREE.CubeGeometry( xDim, yDim/2, zDim );
		// var cube_mesh = new THREE.Mesh( cube_geometry, figure.material );
		// var cube_bsp = new ThreeBSP( cube_mesh );
		// var test = figure.geometry;

		// try{
		//console.log(test);
		//var figureBSP = new ThreeBSP(test);
		// }
		// catch (e)
		// {
		//	console.log('Error: ', e, ' Figure: ', figureBSP);
		//}

		//var subtract_bsp = cube_bsp.subtract( figureBSP );
		//var subtract_bsp = figureBSP.subtract( cube_bsp );
		// var result = subtract_bsp.toMesh( figure.material );
		
		// result.geometry.mergeVertices();
		// result.geometry.computeCentroids();
		// result.geometry.computeFaceNormals();
		// result.geometry.computeVertexNormals();
		
		// sw.scene.add( result );
		// sw.scene.remove(sceneWrapper.currentMesh.figure);
		// sceneWrapper.currentMesh.figure = result;