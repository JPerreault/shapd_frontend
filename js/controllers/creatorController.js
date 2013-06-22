//Global variable for toggle clouds/bridges
var n = 0;

window.onload = function() {

	var tubeMeshBuilder, view, gui, scene, tubeMP, matListener;
	var renderer, sceneWrapper, materialsLibrary, customContainer;

	init();
	animate();

	function init() {

		materialsLibrary = new MaterialsLibrary();
		tubeMeshBuilder = new TubeMeshBuilder(materialsLibrary);
		
		if (location.hash == "#" || location.hash == "")
		{
			sceneWrapper = new SceneWrapper(tubeMeshBuilder, materialsLibrary.textureCube);
		}
		else
		{
			tubeMP = new TubeMeshParams();
			sceneWrapper = new SceneWrapper(tubeMeshBuilder, materialsLibrary.textureCube, tubeMP);
		}
		
		if (Detector.webgl)
			renderer = new THREE.WebGLRenderer();
		else
			renderer = new THREE.CanvasRenderer();
		view = new InputView(sceneWrapper, renderer, tubeMP);
		
		renderer.setSize( view.currentWindowX, view.currentWindowY );
		renderer.setFaceCulling( THREE.CullFaceNone );
		renderer.autoClear = false;

		view.addMeshElement(renderer.domElement)
		sceneWrapper.init();
		scene = sceneWrapper;
	    setupDatGui(sceneWrapper);	
		matListener = new materialListener(sceneWrapper, tubeMeshBuilder);
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
	
	customContainer = document.getElementById('container');	
	customContainer.style.zIndex = '100';
	customContainer.style.position = 'absolute';

	var saveSTL = document.createElement('div');
	saveSTL.style.position = 'absolute';
	saveSTL.style.top = '0px';
	saveSTL.style.left = '230px';
	saveSTL.style.zIndex = '1000';
	saveSTL.style.background = '#999';
	saveSTL.innerHTML += '<input id="save" type="button" value="Save Shape"/>';
	customContainer.appendChild(saveSTL);
	
	var rotateButton = document.createElement('div');
	rotateButton.style.position = 'absolute';
	rotateButton.style.top = '56px';
	rotateButton.style.left = '230px';
	rotateButton.style.zIndex = '1000';
	rotateButton.style.background = '#999';
	rotateButton.innerHTML += '<input id="rotate" type="button" value="Reset Rotations"/>';
	customContainer.appendChild(rotateButton);
	
	var share = document.createElement('div');
	share.style.position = 'absolute';
	share.style.top = '84px';
	share.style.left = '230px';
	share.style.zIndex = '1000';
	share.style.background= '#999';
	share.innerHTML = '<input id="share" type="button" value="Update URL">';
	customContainer.appendChild(share);
    
    var screen = document.createElement('div');
    screen.style.position = 'absolute';
    screen.style.top = '28px';
    screen.style.left = '230px';
    screen.style.zIndex = '1000';
    screen.style.background= '#999';
    screen.innerHTML = '<input id="screen" type="button" value="Screen Shot">';
    customContainer.appendChild(screen);
	
	//For background toggling
	//document.getElementById('toggle').onclick = function()
	//{
	//	n++;

	//	materialsLibrary = new MaterialsLibrary();
	//	tubeMeshBuilder = new TubeMeshBuilder(materialsLibrary);
	//	sceneWrapper = new SceneWrapper(tubeMeshBuilder, materialsLibrary.textureCube, scene.currentMesh);
		
	//	view = new InputView(sceneWrapper, renderer);
	//	sceneWrapper.init();
		
	//	view.addMeshElement(renderer.domElement)
		
	//	var currentMesh = sceneWrapper.currentMesh;
	//	scene = sceneWrapper;
	//	sceneWrapper.redrawMesh(currentMesh);
		
	//	matListener = new materialListener(sceneWrapper, tubeMeshBuilder);
	//}
	
	document.getElementById('save').onclick = function()
	{
		tubeMeshBuilder.saveSTL();
	}
	
	document.getElementById('idSaveButtonContainer').onclick = function()
	{
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
		setHash();
		window.location.href = 'loops.html' + location.hash;
	}
    
    // For shape sharing via hash
    document.getElementById('share').onclick = function()
	{
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
		setHash();
	}
	
	document.getElementById('idResetRotationImg').onclick = function()
	{
		view.targetX = 0;
		view.targetY = 0;
		//tubeMeshBuilder.calculateVolume();
		//tubeMeshBuilder.calculateSurfaceArea();
	}
    
    document.getElementById('idResetShapdImg').onclick = function()
	{
        sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
		loadScreenshotStage();
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
		
		customContainer = document.getElementById('container');	
		gui.domElement.style.position = 'absolute';
		gui.domElement.style.top = '-1px';
		gui.domElement.style.left = '-15px';
		gui.domElement.style.zIndex = '1000';
		customContainer.appendChild(gui.domElement);
	};
}