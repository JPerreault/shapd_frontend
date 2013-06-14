//Global variable for toggle clouds/bridges
var n = 0;
//Global variable for loops
var loops = false;

window.onload = function() {

	var tubeMeshBuilder, view, gui, scene, tubeMP;
	var renderer, sceneWrapper, materialsLibrary, projector;

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
		
		var currentMesh = sceneWrapper.currentMesh;
		scene = sceneWrapper;
		sceneWrapper.redrawMesh(currentMesh);
	}
	
	document.getElementById('save').onclick = function()
	{
		tubeMeshBuilder.saveSTL();
	}
	
	//For loop adding
	document.getElementById('loops').onclick = function()
	{
		loops = !loops;
	}
	
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	function onDocumentMouseDown(event)
	{
		if (loops)
		{
			var projector = new THREE.Projector();
			
			event.preventDefault();
			var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
			projector.unprojectVector(vector, sceneWrapper.camera);
			var raycaster = new THREE.Raycaster (sceneWrapper.camera.position, vector.sub(sceneWrapper.camera.position).normalize());
			
			var inBounds = tubeMeshBuilder.addLoop(raycaster);
			if (inBounds === true)
			{
				scene.torusDefined = true;
				scene.redrawMesh(scene.currentMesh);
			}
		}
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
		
		
		var controller = gui.add(currentMesh, 'Starting Shape', 1, 15).step(1);
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
		
		var cloudToggle = document.createElement('div');
		cloudToggle.style.position = 'absolute';
		cloudToggle.style.top = '97%';
		cloudToggle.style.left = '91%';
		cloudToggle.style.zIndex = '1000';
		cloudToggle.style.background = '#999';
		cloudToggle.innerHTML += '<input id="toggle" type="button" value="Swap Background"/>';
		customContainer.appendChild(cloudToggle);
		
		var saveSTL = document.createElement('div');
		saveSTL.style.position = 'absolute';
		saveSTL.style.top = '0px';
		saveSTL.style.left = '230px';
		saveSTL.style.zIndex = '1000';
		saveSTL.style.background = '#999';
		saveSTL.innerHTML += '<input id="save" type="button" value="Save Shape"/>';
		customContainer.appendChild(saveSTL);
		
		var loopTest = document.createElement('div');
		loopTest.style.position = 'absolute';
		loopTest.style.top = '28px';
		loopTest.style.left = '230px';
		loopTest.style.zIndex = '1000';
		loopTest.style.background = '#999';
		loopTest.innerHTML += '<input id="loops" type="button" value="Loop Test"/>';
		customContainer.appendChild(loopTest);
	};

}