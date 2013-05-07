var InputView = function() {		
	this.mouseX = 0
	this.mouseY = 0;
	this.currentWindowX = window.innerWidth / 2;
	this.currentWindowY = window.innerHeight / 2;

	var that = this;

	this.addMeshElement = function(domElement) {
		var demoSpace = document.getElementById('demoSpace');
		demoSpace.appendChild( domElement );
	};

	this.addMouseEventHandling = function(){
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	};

	this.addWindowResizing = function(){
		window.addEventListener( 'resize', onWindowResize, false );
	};

	function onWindowResize() {
		that.currentWindowX = window.innerWidth / 4;
		that.currentWindowY = window.innerHeight / 4;

		sceneWrapper.updateCameraOnWindowResize();
		sceneCube.updateCameraOnWindowResize();
		
		renderer.setSize( (window.innerWidth/2), (window.innerHeight/2) );
	}

	function onDocumentMouseMove(event) {
		that.mouseY = ( event.clientY - window.innerHeight );
	}
}