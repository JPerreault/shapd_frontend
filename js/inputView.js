var InputView = function(sW, rend) {		
	var sceneWrapper = sW;
	var renderer = rend;
	//SceneWrapper.updateCameraOnWindowResize();

	this.targetY = 0;
	this.targetX = 0;

	var targetYRotationOnMouseDown = 0;
	var targetXRotationOnMouseDown = 0;

	var mouseX = 0, mouseY = 0;
	var mouseXOnMouseDown = 0, mouseYOnMouseDown =0;

	this.currentWindowX = window.innerWidth ;
	this.currentWindowY = window.innerHeight;

	var that = this;

	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );
	document.addEventListener( 'mousewheel', onDocumentMouseWheel, false);
	document.addEventListener( 'DOMMouseScroll', onDocumentMouseWheel, false);

	window.addEventListener( 'resize', onWindowResize, false );
	
	function onDocumentMouseWheel ( event ) {
		var fovMAX = 160;
		var fovMIN = 1;

		sceneWrapper.camera.fov -= event.wheelDeltaY * 0.05;
		sceneWrapper.camera.fov = Math.max( Math.min( sceneWrapper.camera.fov, fovMAX ), fovMIN );
		sceneWrapper.camera.projectionMatrix = new THREE.Matrix4().makePerspective(sceneWrapper.camera.fov, window.innerWidth / window.innerHeight, sceneWrapper.camera.near, sceneWrapper.camera.far);
	}
	
	function onWindowResize() {
		that.currentWindowX = window.innerWidth / 4;
		that.currentWindowY = window.innerHeight / 4;

		sceneWrapper.updateCameraOnWindowResize();
		
		renderer.setSize( (window.innerWidth), (window.innerHeight) ); //Was divided by 2 after Julie, changed because it resized seemingly incorrectly
	}

	function onDocumentMouseDown( event ) {
		event.preventDefault();

		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'mouseup', onDocumentMouseUp, false );
		document.addEventListener( 'mouseout', onDocumentMouseOut, false );

		mouseXOnMouseDown = event.clientX - that.currentWindowX;
		mouseYOnMouseDown = event.clientY - that.currentWindowY;
		targetYRotationOnMouseDown = that.targetY;
		targetXRotationOnMouseDown = that.targetX;

	}

	function onDocumentMouseMove( event ) {

		mouseX = event.clientX - that.currentWindowX;
		mouseY = event.clientY - that.currentWindowY;

		that.targetY = targetYRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
		that.targetX = targetXRotationOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.02;			
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

		this.addMeshElement = function(domElement) {
		var demoSpace = document.getElementById('container');
		domElement.style.zIndex = '100';
		demoSpace.appendChild( domElement );
	};
}