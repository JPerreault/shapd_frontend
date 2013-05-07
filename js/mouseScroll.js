var targetYRotation = targetXRotation = 0;
var targetYRotationOnMouseDown = targetXRotationOnMouseDown = 0;

var mouseX = 0, mouseY = 0;
var mouseXOnMouseDown = 0;
var controls;


		// Mouse Trackball Controls - Perhaps split out into separate function later?
		// Uses controls var above, and controls.update() in animate() function below.
		
	function initializeMouseTrackball() {	
		
		controls = new THREE.TrackballControls( camera );

		controls.rotateSpeed = 1.0;
		controls.zoomSpeed = 1.2;
		controls.panSpeed = 0.8;

		controls.noZoom = false;
		controls.noPan = false;

		controls.staticMoving = true;
		controls.dynamicDampingFactor = 0.3;

		controls.keys = [ 65, 83, 68 ];

		controls.addEventListener( 'change', render );
	}

	// Mouse and Interaction Functionality 
	
	function onDocumentMouseDown( event ) {

				event.preventDefault();

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'mouseup', onDocumentMouseUp, false );
				document.addEventListener( 'mouseout', onDocumentMouseOut, false );

				mouseXOnMouseDown = event.clientX - windowHalfX;
				mouseYOnMouseDown = event.clientY - windowHalfY;
				targetYRotationOnMouseDown = targetYRotation;
				targetXRotationOnMouseDown = targetXRotation;

			}

	function onDocumentMouseMove( event ) {

				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;

				targetYRotation = targetYRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
				targetXRotation = targetXRotationOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.02;

			}

	function onDocumentMouseUp( event ) {

				document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
				document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
				document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
			}

	function onDocumentMouseOut( event ) {

				document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
				document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
				document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
			}

	function onDocumentTouchStart( event ) {

				if ( event.touches.length == 1 ) {

					event.preventDefault();

					mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
					targetRotationOnMouseDown = targetRotation;

				}
			}

	function onDocumentTouchMove( event ) {

				if ( event.touches.length == 1 ) {

					event.preventDefault();

					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

				}
			}
	
	
	
	function renderMouse() {
		
				group.rotation.x = cube.rotation.x += ( targetXRotation - cube.rotation.x ) * 0.05;
				group.rotation.y = cube.rotation.y += ( targetYRotation - cube.rotation.y ) * 0.05;

					
	}



