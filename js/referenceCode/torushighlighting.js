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