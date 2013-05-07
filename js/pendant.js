window.onload = function() {

	var tubeMeshBuilder, eventListening;
	var container;
	var renderer, sceneWrapper;
	var sceneCube;
	var m, mi;
	var directionalLight, pointLight;

	init();
	animate();

	function init() {

		container = document.getElementById('demoSpace');

		// SCENE
		var materialsLibrary = new MaterialsLibrary();	
		tubeMeshBuilder = new TubeMeshBuilder(materialsLibrary);
		sceneWrapper = new SceneWrapper(tubeMeshBuilder);
		sceneCube = new SceneCubeWrapper(materialsLibrary.textureCube);

		eventListening = new EventListening(window, document);
		eventListening.addMouseEventHandling();
		eventListening.addWindowResizing();

		renderer = new THREE.WebGLRenderer();
		renderer.setSize( eventListening.currentWindowX, eventListening.currentWindowY );
		renderer.setFaceCulling( THREE.CullFaceNone );
		renderer.autoClear = false;

		container.appendChild( renderer.domElement );
		createScene();
	}


	function $( id ) { return document.getElementById( id ) }
	function button_name( car, index ) { return "m_" + car  + "_" + index }

	function createScene() {
		var initialRadius = 6;
	    var initialScale = 8;
		var initialDesign = 5;
		var initialMorph1 = 1;

	    var tubeMesh = tubeMeshBuilder.build(initialRadius, initialScale, initialDesign, initialMorph1);
		sceneWrapper.addMesh( tubeMesh );

	    setupDatGui(tubeMesh, sceneWrapper);  		
	}

	function animate() {
		requestAnimationFrame( animate );
		render();
	}

	function render() {
		sceneWrapper.renderCamera(eventListening.mouseY);
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
		
		var morph1Controller = gui.add(tubeMesh, 'morph1', -3,3);
	    morph1Controller.onChange(function(val){
	        scene.updateMorph1(val);
	    });

		
	    var customContainer = document.getElementById('controls');
		customContainer.appendChild(gui.domElement);
	};

}