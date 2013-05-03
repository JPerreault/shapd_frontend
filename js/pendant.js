window.onload = function() {
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

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

		container = document.createElement( 'div' );
		document.body.appendChild( container );

		// SCENE
		var materialsLibrary = new MaterialsLibrary();	
		tubeMeshBuilder = new TubeMeshBuilder(materialsLibrary);
		sceneWrapper = new SceneWrapper(tubeMeshBuilder);
		sceneCube = new SceneCubeWrapper(materialsLibrary.textureCube);

		renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setFaceCulling( THREE.CullFaceNone );
		renderer.autoClear = false;

		container.appendChild( renderer.domElement );

		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		createScene();
		window.addEventListener( 'resize', onWindowResize, false );
	}

	function onWindowResize() {

		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		sceneWrapper.updateCameraOnWindowResize();
		sceneCube.updateCameraOnWindowResize();
		
		renderer.setSize( window.innerWidth, window.innerHeight );

	}


	function $( id ) { return document.getElementById( id ) }
	function button_name( car, index ) { return "m_" + car  + "_" + index }

	function createScene() {
		var initialRadius = 3;
	    var initialScale = 5;
		var initialDesign = 5;

	    var tubeMesh = tubeMeshBuilder.build(initialRadius, initialScale, initialDesign);
		sceneWrapper.addMesh( tubeMesh );

	    setupDatGui(tubeMesh, sceneWrapper);  		
	}

	function onDocumentMouseMove(event) {
		mouseY = ( event.clientY - window.innerHeight );
	}

	function animate() {
		requestAnimationFrame( animate );
		render();
	}

	function render() {
		sceneWrapper.renderCamera(mouseY);
		sceneCube.renderCamera(sceneWrapper.camera.rotation);

		renderer.render( sceneCube.scene, sceneCube.camera );
		renderer.render( sceneWrapper.scene, sceneWrapper.camera );
	}

	function setupDatGui(tM, sC) {
	    var tubeMesh = tM;
	    var scene = sC;
	    var gui = new dat.GUI({ autoPlace: false });

	    var radiusController = gui.add(tubeMesh, 'radius', 3, 12).step(1);
	    radiusController.onFinishChange(function(val){
	        scene.updateRadius(val);
	    });

	    var scaleController = gui.add(tubeMesh, 'scale', 1, 10);
	    scaleController.onChange(function(val){
	        scene.updateScale(val);
	    });

	    var designController = gui.add(tubeMesh, 'design', { 'very simple': 3, 'sorta simple': 8, 'cool': 5, 'that\'s crazy': 7, 'whoa': 9 } );
	    designController.onFinishChange(function(val){
	        scene.updateDesign(val);
	    });


	    var customContainer = document.getElementById('controls');
		customContainer.appendChild(gui.domElement);
	};

}