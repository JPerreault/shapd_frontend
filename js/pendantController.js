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

        var currentMesh = scene.currentMesh;

        var setUpController = function(controller, fieldName){
            controller.onChange(function(newVal){
                currentMesh[fieldName] = newVal;
                scene.redrawMesh(currentMesh);
            });
        };

        var scaleController = gui.add(currentMesh, 'scale', 1, 10);
        scaleController.onChange(function(newVal){
            scene.updateScale(newVal);
        });

        var controller = gui.add(currentMesh, 'curviness', 3, 12).step(1);
        setUpController(controller, 'curviness');

	    var morphFolder = gui.addFolder('Morphing!');

        controller = morphFolder.add(currentMesh, 'depth', -3,3);
        setUpController(controller, 'depth');

		controller = morphFolder.add(currentMesh, 'slice', -2,2).step(1);
        setUpController(controller, 'slice');

		controller = morphFolder.add(currentMesh, 'stretch', -2,2);
        setUpController(controller, 'stretch');

		controller = morphFolder.add(currentMesh, 'inversion', -2,2);
        setUpController(controller, 'inversion');

		controller = morphFolder.add(currentMesh, 'height', 0,2);
        setUpController(controller, 'height');

		controller = morphFolder.add(currentMesh, 'width', 0,2);
        setUpController(controller, 'width');

	   	controller = gui.add(currentMesh, 'design', 1, 9).step(1);
        setUpController(controller, 'design');

        morphFolder.open();

	    var customContainer = document.getElementById('controls');
		customContainer.appendChild(gui.domElement);
	};

}