//Global variable for toggle clouds/bridges
var n = 0;

window.onload = function() {

	var tubeMeshBuilder, view, gui, scene, tubeMP;
	var renderer, sceneWrapper, materialsLibrary;

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

		//e = "#ff8800";
		//this. color = "#ffae23";
		//var text = 'hi';
		//gui.addColor (colors, 'color');
		//gui.addColor (controller, 'color');
	   	controller = gui.add(currentMesh, 'Modify', 1, 12).step(1);
		//gui.addColor (controller, 'e');
		//controller.color = this.color;
		//color = new THREE.Color( 0xff0000 );
		//controller.color = color;
		//gui.addColor(controller, e).name('Test');
        setUpController(controller, 'Modify');
		
		controller = gui.add(currentMesh, 'Loops', 1, 12).step(1);
        setUpController(controller, 'Loops');

		//Decided to not use MorphFolder, keeping for later reference
	    //var morphFolder = gui.addFolder('Morphing!');
		//controller = morphFolder.add(currentMesh, 'Width', 0,4);
        //setUpController(controller, 'Width');
        //morphFolder.open();
		
	    var customContainer = document.getElementById('container');
		gui.domElement.style.position = 'absolute';
		gui.domElement.style.top = '-1px';
		gui.domElement.style.left = '-15px';
		gui.domElement.style.zIndex = '1000';
		customContainer.appendChild(gui.domElement);
		
		var cloudToggle = document.createElement('div');
		cloudToggle.style.position = 'absolute';
		cloudToggle.style.top = '97%';
		cloudToggle.style.left = '92%';
		cloudToggle.style.zIndex = '1000';
		cloudToggle.style.background = '#999';
		cloudToggle.innerHTML += '<input id="toggle" type="button" value="Swap Background"/>';
		customContainer.appendChild(cloudToggle);
	};

}