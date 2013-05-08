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

        var scaleController = gui.add(currentMesh, 'Scale', 1, 10);
        scaleController.onChange(function(newVal){
            scene.updateScale(newVal);
        });

        var controller = gui.add(currentMesh, 'Curviness', 3, 12).step(3);
        setUpController(controller, 'Curviness');

	    var morphFolder = gui.addFolder('Morphing!');

        controller = morphFolder.add(currentMesh, 'Depth', 0,4);
        setUpController(controller, 'Depth');

		controller = morphFolder.add(currentMesh, 'Stretch Side', -2,2);
        setUpController(controller, 'Stretch Side');

		controller = morphFolder.add(currentMesh, 'Stretch Up', -2,2);
        setUpController(controller, 'Stretch Up');

		controller = morphFolder.add(currentMesh, 'Height', 0,4);
        setUpController(controller, 'Height');

		controller = morphFolder.add(currentMesh, 'Width', 0,4);
        setUpController(controller, 'Width');

	   	controller = gui.add(currentMesh, 'Design', 1, 12).step(1);
        setUpController(controller, 'Design');

        morphFolder.open();

	    var customContainer = document.getElementById('controls');
		customContainer.appendChild(gui.domElement);
	};

}