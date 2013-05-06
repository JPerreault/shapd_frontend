window.onload = function() {

	var tubeMeshBuilder;
	var container;
	var renderer, sceneWrapper;
	var sceneCube;
	var m, mi;
	var directionalLight, pointLight;
	var mouseX = 0, mouseY = 0;
	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;

	init();
	animate();

	function init() {

		container = document.getElementById('demoSpace');

		// SCENE
		var materialsLibrary = new MaterialsLibrary();	
		tubeMeshBuilder = new TubeMeshBuilder(materialsLibrary);
		sceneWrapper = new SceneWrapper(tubeMeshBuilder);
		sceneCube = new SceneCubeWrapper(materialsLibrary.textureCube);

		renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth / 1.5, window.innerHeight / 1.5 );
		renderer.setFaceCulling( THREE.CullFaceNone );
		renderer.autoClear = false;

		container.appendChild( renderer.domElement );

		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		createScene();
		window.addEventListener( 'resize', onWindowResize, false );
	}

	function onWindowResize() {

		windowHalfX = window.innerWidth / 4;
		windowHalfY = window.innerHeight / 4;

		sceneWrapper.updateCameraOnWindowResize();
		sceneCube.updateCameraOnWindowResize();
		
		renderer.setSize( (window.innerWidth/2), (window.innerHeight/2) );

	}


	function $( id ) { return document.getElementById( id ) }
	function button_name( car, index ) { return "m_" + car  + "_" + index }

	function createScene() {
		var initialRadius = 6;
	    var initialScale = 8;
		var initialDesign = 5;
		var initialMorph1 = 1;
		var initialMorph2 = 2;
		var initialMorph3 = 0;
		var initialMorph4 = 0;
		var initialHeight = 1;
		var initialWidth = 1;

	    var tubeMesh = tubeMeshBuilder.build(initialRadius, initialScale, initialDesign, initialMorph1, initialMorph2, initialMorph3, initialMorph4, initialHeight, initialWidth);
		sceneWrapper.addMesh( tubeMesh );

	    setupDatGui(tubeMesh, sceneWrapper);  		
	}

	function onDocumentMouseMove(event) {
		//mouseY = ( event.clientY - window.innerHeight );
	}

	function animate() {
		requestAnimationFrame( animate );
		render();
	}

	function render() {
		sceneWrapper.renderCamera(mouseY);
		//sceneCube.renderCamera(sceneWrapper.camera.rotation);

		renderer.render( sceneCube.scene, sceneCube.camera );
		renderer.render( sceneWrapper.scene, sceneWrapper.camera );
	}

	function setupDatGui(tM, sC) {
	    var tubeMesh = tM;
	    var scene = sC;
	    var gui = new dat.GUI({ autoPlace: false });

	    var radiusController = gui.add(tubeMesh, 'curviness', 3, 12).step(1);
	    radiusController.onChange(function(val){
	        scene.updateRadius(val);
	    });

	    var scaleController = gui.add(tubeMesh, 'scale', 1, 10);
	    scaleController.onChange(function(val){
	        scene.updateScale(val);
	    });

	    var designController = gui.add(tubeMesh, 'design', { 'very simple': 3, 'sorta simple': 8, 'cool': 5, 'that\'s crazy': 7, 'whoa': 9 } );
	    designController.onChange(function(val){
	        scene.updateDesign(val);
	    });
		
		var heightController = gui.add(tubeMesh, 'height', -5,5);
	    heightController.onChange(function(val){
	        scene.updateHeight(val);
	    });
		
		var widthController = gui.add(tubeMesh, 'width', -5,5);
	    widthController.onChange(function(val){
	        scene.updateWidth(val);
	    });
		
		var morph1Controller = gui.add(tubeMesh, 'morph1', -5,5);
	    morph1Controller.onChange(function(val){
	        scene.updateMorph1(val);
	    });

		var morph2Controller = gui.add(tubeMesh, 'morph2', -2,2);
	    morph2Controller.onChange(function(val){
	        scene.updateMorph2(val);
	    });
		
		var morph3Controller = gui.add(tubeMesh, 'morph3', -5,5);
	    morph3Controller.onChange(function(val){
	        scene.updateMorph3(val);
	    });
		
		var morph4Controller = gui.add(tubeMesh, 'morph4', -5,5);
	    morph4Controller.onChange(function(val){
	        scene.updateMorph4(val);
	    });
		
	    var customContainer = document.getElementById('controls');
		customContainer.appendChild(gui.domElement);
	};

}