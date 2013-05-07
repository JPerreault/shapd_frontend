var EventListening = function(wind, doc) {	
	var wind = wind;
	var doc = doc;
	
	this.mouseX = 0
	this.mouseY = 0;
	this.currentWindowX = wind.innerWidth / 2;
	this.currentWindowY = wind.innerHeight / 2;

	this.addMouseEventHandling = function(){
		doc.addEventListener( 'mousemove', onDocumentMouseMove, false );
	};

	this.addWindowResizing = function(){
		wind.addEventListener( 'resize', onWindowResize, false );
	};

	function onWindowResize() {
		this.currentWindowX = wind.innerWidth / 4;
		this.currentWindowY = wind.innerHeight / 4;

		sceneWrapper.updateCameraOnWindowResize();
		sceneCube.updateCameraOnWindowResize();
		
		renderer.setSize( (wind.innerWidth/2), (wind.innerHeight/2) );
	}

	function onDocumentMouseMove(event) {
		this.mouseY = ( event.clientY - wind.innerHeight );
	}
}