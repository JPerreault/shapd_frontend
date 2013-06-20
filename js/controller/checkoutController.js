//Global variable for toggle clouds/bridges
var n = 0;

window.onload = function() {

	var tubeMeshBuilder, view, gui, scene, tubeMP;
	var renderer, sceneWrapper, materialsLibrary, projector;

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

		renderer = new THREE.WebGLRenderer();
		view = new InputView(sceneWrapper, renderer, tubeMP);
		
		renderer.setSize( view.currentWindowX, view.currentWindowY );
		renderer.setFaceCulling( THREE.CullFaceNone );
		renderer.autoClear = false;

		view.addMeshElement(renderer.domElement)
		sceneWrapper.init();
		scene = sceneWrapper;
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
	
	//Buttons
	var customContainer = document.getElementById('container');
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
	saveSTL.style.left = '0';
	saveSTL.style.zIndex = '1000';
	saveSTL.style.background = '#999';
	saveSTL.innerHTML += '<input id="save" type="button" value="Save Shape"/>';
	customContainer.appendChild(saveSTL);

	var continueButton = document.createElement('div');
	continueButton.style.position = 'absolute';
	continueButton.style.top = '28px';
	continueButton.style.left = '0px';
	continueButton.style.zIndex = '1000';
	continueButton.style.background = '#999';
	continueButton.innerHTML += '<input id="continue" type="button" value="Continue"/>';
	customContainer.appendChild(continueButton);
		
	var rotateButton = document.createElement('div');
	rotateButton.style.position = 'absolute';
	rotateButton.style.top = '56px';
	rotateButton.style.left = '0px';
	rotateButton.style.zIndex = '1000';
	rotateButton.style.background = '#999';
	rotateButton.innerHTML += '<input id="rotate" type="button" value="Reset Rotations"/>';
	customContainer.appendChild(rotateButton);
    
    var screen = document.createElement('div');
    screen.style.position = 'absolute';
    screen.style.top = '84px';
    screen.style.left = '230px';
    screen.style.zIndex = '1000';
    screen.style.background= '#999';
    screen.innerHTML = '<input id="screen" type="button" value="Screen Shot">';
    customContainer.appendChild(screen);
	
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
	
	document.getElementById('continue').onclick = function()
	{
		setHash();	
		window.location.href = 'creator.html';
	}
	
	document.getElementById('rotate').onclick = function()
	{
		view.targetX = 0;
		view.targetY = 0;
	}
    
    document.getElementById('screen').onclick = function()
	{
		loadScreenshotStage();
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
}
