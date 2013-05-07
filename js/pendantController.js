window.onload = function() {

	var tubeMeshBuilder, view;
	var renderer, sceneWrapper;

	init();
	animate();

	function init() {

		view = new InputView();

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
		// sceneWrapper.renderCamera(view.mouseY);
		sceneWrapper.rotateMesh(view.targetX, view.targetY);

		renderer.render( sceneWrapper.sceneCube.scene, sceneWrapper.sceneCube.camera );
		renderer.render( sceneWrapper.scene, sceneWrapper.camera );
	}

	function setupDatGui(sC) {
	    var scene = sC;
	    var gui = new dat.GUI({ autoPlace: false });

	    var radiusController = gui.add(scene.currentMesh, 'curviness', 3, 12).step(1);
	    radiusController.onChange(function(newVal){
	        var newParams = new TubeMeshParams();
        	newParams.curviness = newVal;
	        scene.redrawMesh(newParams);
	    });

	    var scaleController = gui.add(scene.currentMesh, 'scale', 1, 10);
	    scaleController.onChange(function(newVal){
	        scene.updateScale(newVal);
	    });

	    var designController = gui.add(scene.currentMesh, 'design', { 'very simple': 3, 'sorta simple': 8, 'cool': 5, 'that\'s crazy': 7, 'whoa': 9 } );
	    designController.onChange(function(newVal){
	        var newParams = new TubeMeshParams();
        	newParams.design = newVal;
	        scene.redrawMesh(newParams);
	    });
		
		var morph1Controller = gui.add(scene.currentMesh, 'morph1', -3,3);
	    morph1Controller.onChange(function(newVal){
	        var newParams = new TubeMeshParams();
        	newParams.morph1 = newVal;
	        scene.redrawMesh(newParams);
	    });

		var morph2Controller = gui.add(scene.currentMesh, 'morph2', -2,2);
	    morph2Controller.onChange(function(newVal){
	        var newParams = new TubeMeshParams();
        	newParams.morph2 = newVal;
	        scene.redrawMesh(newParams);
	    });

		var morph3Controller = gui.add(scene.currentMesh, 'morph3', -2,2);
	    morph3Controller.onChange(function(newVal){
	        var newParams = new TubeMeshParams();
        	newParams.morph3 = newVal;
	        scene.redrawMesh(newParams);
	    });

		var morph3Controller = gui.add(scene.currentMesh, 'morph4', -2,2);
	    morph3Controller.onChange(function(newVal){
	        var newParams = new TubeMeshParams();
        	newParams.morph4 = newVal;
	        scene.redrawMesh(newParams);
	    });


		
	    var customContainer = document.getElementById('controls');
		customContainer.appendChild(gui.domElement);
	};

}