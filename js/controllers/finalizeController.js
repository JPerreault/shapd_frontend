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
	
	//Buttons
	var customContainer = document.getElementById('container');	
	var saveSTL = document.createElement('div');
	saveSTL.style.position = 'absolute';
	saveSTL.style.top = '0px';
	saveSTL.style.left = '0';
	saveSTL.style.zIndex = '1000';
	saveSTL.style.background = '#999';
	saveSTL.innerHTML += '<input id="save" type="button" value="Save Shape"/>';
	customContainer.appendChild(saveSTL);
		
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
    screen.style.top = '28px';
    screen.style.left = '0px';
    screen.style.zIndex = '1000';
    screen.style.background= '#999';
    screen.innerHTML = '<input id="screen" type="button" value="Screen Shot">';
    customContainer.appendChild(screen);
	
	
	document.getElementById('save').onclick = function()
	{
		tubeMeshBuilder.saveSTL();
	}
	
	document.getElementById('continue').onclick = function()
	{
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
		setHash();
		window.location.href = 'creator.html'; //Later goes to checkout.html
	}
	
	document.getElementById('rotate').onclick = function()
	{
		view.targetX = 0;
		view.targetY = 0;
	}
    
    document.getElementById('screen').onclick = function()
	{
        sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
		loadScreenshotStage();
	}
}
