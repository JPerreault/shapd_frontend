//Global variable for toggle clouds/bridges
var n = 0;

window.onload = function() {

	var tubeMeshBuilder, view, gui, scene, tubeMP;
	var renderer, sceneWrapper, materialsLibrary, cloudToggle;

	init();
	animate();

	function init() {

		materialsLibrary = new MaterialsLibrary();
		tubeMeshBuilder = new TubeMeshBuilder(materialsLibrary);
		sceneWrapper = new SceneWrapper(tubeMeshBuilder, materialsLibrary.textureCube);

		renderer = new THREE.WebGLRenderer();
		view = new InputView(sceneWrapper, renderer);
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
		sceneWrapper.rotateMesh(view.targetX, view.targetY);

		renderer.render( sceneWrapper.sceneCube.scene, sceneWrapper.sceneCube.camera );
		renderer.render( sceneWrapper.scene, sceneWrapper.camera );
	}
	
	//For background toggling
	document.getElementById('toggle').onclick = function()
	{
		n++;

		materialsLibrary = new MaterialsLibrary();
		tubeMeshBuilder = new TubeMeshBuilder(materialsLibrary);
		sceneWrapper = new SceneWrapper(tubeMeshBuilder, materialsLibrary.textureCube, scene.currentMesh);
		
		view = new InputView(sceneWrapper, renderer);
		sceneWrapper.init();
		
		view.addMeshElement(renderer.domElement)
		
		currentMesh = sceneWrapper.currentMesh;
		scene = sceneWrapper;
		sceneWrapper.redrawMesh(currentMesh);
		
	}

	function setupDatGui(sC) {
	    scene = sC;
	    gui = new dat.GUI({ autoPlace: false });

        var currentMesh = scene.currentMesh;

        var setUpController = function(controller, fieldName){
            controller.onChange(function(newVal){
                currentMesh[fieldName] = newVal;
				this.color = [ 0, 128, 225];
                scene.redrawMesh(currentMesh);
            });
        };
		
		//For coloring the Modify and Loops sliders:
		var FresnelControls = function() {
			this.movingParticles = 5000;
			this.seedColor = "#ff0098";
		};
		
		
		var controller = gui.add(currentMesh, 'Starting Shape', 1, 14).step(1);
        setUpController(controller, 'Starting Shape');

        var scaleController = gui.add(currentMesh, 'Scale', 1, 10);
        scaleController.onChange(function(newVal){
            scene.updateScale(newVal);
        });
		
		controller = gui.add(currentMesh, 'Thickness', .5, 20);
		setUpController(controller, 'Thickness');

        controller = gui.add(currentMesh, 'Depth', 0.05,3.5);
		setUpController(controller, 'Depth');

		controller = gui.add(currentMesh, 'Stretch', 0.00005,1.75);
        setUpController(controller, 'Stretch');
		
		
		var morphFolder = gui.addFolder ('Shape Alteration');
	   	controller = morphFolder.add(currentMesh, 'Modify', 1, 12).step(1);
        setUpController(controller, 'Modify');
		
		controller = morphFolder.add(currentMesh, 'Loops', 1, 12, 0x000000).step(1);
        setUpController(controller, 'Loops');

        morphFolder.open();
		
	    var customContainer = document.getElementById('container');
		gui.domElement.style.position = 'absolute';
		gui.domElement.style.top = '-1px';
		gui.domElement.style.left = '-15px';
		gui.domElement.style.zIndex = '1000';
		customContainer.appendChild(gui.domElement);
		
		cloudToggle = document.createElement('div');
		cloudToggle.style.position = 'absolute';
		cloudToggle.style.top = '-1px';
		cloudToggle.style.left = '228px';
		cloudToggle.style.zIndex = '1000';
		cloudToggle.innerHTML += '<input id="toggle" type="button" value="Swap Background"/>';
		customContainer.appendChild(cloudToggle);
	};

}