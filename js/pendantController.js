window.onload = function() {

	var tubeMeshBuilder, view;
	var renderer, sceneWrapper;

	init();
	animate();

	function init() {

		view = new InputView();
		view.addMouseEventHandling();
		view.addWindowResizing();

		var materialsLibrary = new MaterialsLibrary();	
		tubeMeshBuilder = new TubeMeshBuilder(materialsLibrary);
		sceneWrapper = new SceneWrapper(tubeMeshBuilder, materialsLibrary.textureCube);

		renderer = new THREE.WebGLRenderer();
		renderer.setSize( view.currentWindowX, view.currentWindowY );
		renderer.setFaceCulling( THREE.CullFaceNone );
		renderer.autoClear = false;

		view.addMeshElement(renderer.domElement)

		sceneWrapper.init();
	    setupDatGui(sceneWrapper);  		
	}

	function animate() {
		requestAnimationFrame( animate );
		render();
	}

	function render() {
		sceneWrapper.renderCamera(view.mouseY);

		renderer.render( sceneWrapper.sceneCube.scene, sceneWrapper.sceneCube.camera );
		renderer.render( sceneWrapper.scene, sceneWrapper.camera );
	}

	function setupDatGui(sC) {
	    var scene = sC;
	    var gui = new dat.GUI({ autoPlace: false });

	    var radiusController = gui.add(scene.currentMesh, 'curviness', 3, 12).step(1);
	    radiusController.onChange(function(val){
	        scene.updateRadius(val);
	    });

	    var scaleController = gui.add(scene.currentMesh, 'scale', 1, 10);
	    scaleController.onChange(function(val){
	        scene.updateScale(val);
	    });

	    var designController = gui.add(scene.currentMesh, 'design', { 'very simple': 3, 'sorta simple': 8, 'cool': 5, 'that\'s crazy': 7, 'whoa': 9 } );
	    designController.onChange(function(val){
	        scene.updateDesign(val);
	    });
		
		var morph1Controller = gui.add(scene.currentMesh, 'morph1', -3,3);
	    morph1Controller.onChange(function(val){
	        scene.updateMorph1(val);
	    });

		
	    var customContainer = document.getElementById('controls');
		customContainer.appendChild(gui.domElement);
	};

}