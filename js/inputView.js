var InputView = function(sW, rend, tMP) {		
	var sceneWrapper = sW;
	var renderer = rend;

	if (typeof tMP === 'undefined')
	{
		this.targetX = 0;
		this.targetY = 0;
	}
	else
	{
		this.targetX = tMP['Rotation X'];
		this.targetY = tMP['Rotation Y'];
	}

	var targetYRotationOnMouseDown = 0;
	var targetXRotationOnMouseDown = 0;

	var mouseX = 0, mouseY = 0;
	var mouseXOnMouseDown = 0, mouseYOnMouseDown =0;

	this.currentWindowX = window.innerWidth ;
	this.currentWindowY = window.innerHeight;

	var that = this;

	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'touchstart', onDocumentMouseDown, false );
	document.addEventListener( 'mousewheel', onDocumentMouseWheel, false);
	document.addEventListener( 'DOMMouseScroll', onDocumentMouseWheel, false);
	window.addEventListener( 'resize', onWindowResize, false );
	
	function onDocumentMouseWheel ( event ) {
        
        if (typeof freeze !== 'undefined' && freeze)
            return;
			
		if (event.target.parentElement.id == 'idShapeLibrary' || event.target.id == 'idShapeLibrary')
        {
            var wheelMovement;
            
            if (event.wheelDelta)
                wheelMovement = -.75*event.wheelDelta;
            else
                wheelMovement = 30*event.detail;
            
            document.getElementById('idShapeLibrary').scrollTop += wheelMovement;
            return;
        }
        
        if (event.target.parentElement.parentElement.id == "idSavedShapeLibrary")
        {
            var wheelMovement;
            
            if (event.wheelDelta)
                wheelMovement = -.75*event.wheelDelta;
            else
                wheelMovement = 30*event.detail;
            
            document.getElementById('idSavedShapeLibrary').scrollTop += wheelMovement;
            return;
        }
		var fovMAX = 80;
		var fovMIN = 1.05;

		if (event.wheelDelta)
                sceneWrapper.camera.fov -= event.wheelDeltaY * 0.014;
            else
                sceneWrapper.camera.fov += event.detail * .7;
		
		sceneWrapper.camera.fov = Math.max( Math.min( sceneWrapper.camera.fov, fovMAX ), fovMIN );
		sceneWrapper.camera.projectionMatrix = new THREE.Matrix4().makePerspective(sceneWrapper.camera.fov, window.innerWidth / window.innerHeight, sceneWrapper.camera.near, sceneWrapper.camera.far);
	}
	
	function onWindowResize() {
		that.currentWindowX = window.innerWidth / 4;
		that.currentWindowY = window.innerHeight / 4;

		sceneWrapper.updateCameraOnWindowResize();
		
		renderer.setSize( (window.innerWidth), (window.innerHeight) );
	}

	function onDocumentMouseDown( event ) {
		
		if (typeof freeze !== 'undefined' && freeze)
            return;
        
        if ( typeof(event.touches) !== 'undefined' && event.touches.length == 1 )
        {
            event.clientX = event.touches[0].pageX;
            event.clientY = event.touches[0].pageY;
        }
        
//        else if ( event.touches )
//            return true;
        
        
//        event.preventDefault();

		if (event.target.id.indexOf('slider') === -1 && event.target.parentElement.id.indexOf('slider') === -1 && event.target.className.indexOf('slider') === -1 && event.target.className.indexOf('scrollbar') === -1)
		{
			document.addEventListener( 'mousemove', onDocumentMouseMove, false );
			document.addEventListener( 'mouseup', onDocumentMouseUp, false );
            document.addEventListener( 'touchmove', onDocumentMouseMove, false );
			document.addEventListener( 'touchend', onDocumentMouseUp, false );

			mouseXOnMouseDown = event.clientX - that.currentWindowX;
			mouseYOnMouseDown = event.clientY - that.currentWindowY;
			targetYRotationOnMouseDown = that.targetY;
			targetXRotationOnMouseDown = that.targetX;
		}
        
        return false;
        
	}

	function onDocumentMouseMove( event ) {

        var sensitivity = 0.025;
        
        if ( typeof(event.touches) !== 'undefined' && event.touches.length == 1 )
        {
            event.clientX = event.touches[0].pageX;
            event.clientY = event.touches[0].pageY;
            sensitivity = 0.0125;
        }
        
        else if ( event.touches )
            return true;
        
        event.preventDefault();
        
        
		mouseX = event.clientX - that.currentWindowX;
		mouseY = event.clientY - that.currentWindowY;

        that.targetY = targetYRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * sensitivity;
        that.targetX = targetXRotationOnMouseDown + ( mouseY - mouseYOnMouseDown ) * sensitivity; 	
        
	}

	function onDocumentMouseUp( event ) {

		document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
		document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	}

	
	this.resetRotation = function()
	{
		this.targetX = 0;
		this.targetY = 0;
	}
	
	this.addMeshElement = function(domElement) {
		var demoSpace = document.getElementById('container');
		domElement.style.zIndex = '100';
		demoSpace.appendChild( domElement );
	};
}