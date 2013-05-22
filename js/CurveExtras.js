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
		
		var controller = gui.add(currentMesh, 'Starting Shape', 0,13).step(1);
        setUpController(controller, 'Starting Shape');

        var scaleController = gui.add(currentMesh, 'Scale', 1, 10);
        scaleController.onChange(function(newVal){
            scene.updateScale(newVal);
        });
		
		controller = gui.add(currentMesh, 'Thickness', .5, 20);
		setUpController(controller, 'Thickness');

		//Curviness slider, decided it didn't do enough to stay in
        //var controller = gui.add(currentMesh, 'Curviness', 3, 12).step(3);
        //setUpController(controller, 'Curviness');

		//Decided to not use MorphFolder, keeping for later reference
	    //var morphFolder = gui.addFolder('Morphing!');
        var controller = gui.add(currentMesh, 'Depth', 0.05,3.5);
		setUpController(controller, 'Depth');

		//controller = gui.add(currentMesh, 'Stretch Side', -2,2).step(1);
        //setUpController(controller, 'Stretch Side');

		controller = gui.add(currentMesh, 'Stretch', 0.05,1.75);
        setUpController(controller, 'Stretch');

		//Height slider, decided to not have implemented (redundant with scale)
		//controller = morphFolder.add(currentMesh, 'Height', 0,4);
        //setUpController(controller, 'Height');

		//Width slider, decided to not have implemented (redundant with scale)
		//controller = morphFolder.add(currentMesh, 'Width', 0,4);
        //setUpController(controller, 'Width');

	   	controller = gui.add(currentMesh, 'Design', 1, 12).step(1);
        setUpController(controller, 'Design');
		
		controller = gui.add(currentMesh, 'Loops', 1, 12).step(1);
        setUpController(controller, 'Loops');

        //morphFolder.open();

	    var customContainer = document.getElementById('container');
		gui.domElement.style.position = 'absolute';
		gui.domElement.style.top = '-1px';
		gui.domElement.style.left = '-15px';
		gui.domElement.style.zIndex = '1000';
		customContainer.appendChild(gui.domElement);
	};

}