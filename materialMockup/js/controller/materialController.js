var n = 0;

window.onload = function() {

	var tubeMeshBuilder, view, scene, tubeMP;
	var renderer, sceneWrapper, materialsLibrary, customContainer;

	init();
	animate();

	function init() {

		materialsLibrary = new MaterialsLibrary();
		tubeMeshBuilder = new TubeMeshBuilder(materialsLibrary);
		
		renderer = new THREE.WebGLRenderer();
		sceneWrapper = new SceneWrapper(tubeMeshBuilder, materialsLibrary.textureCube);
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
	
	customContainer = document.getElementById('container');	
	customContainer.style.zIndex = '100';
	customContainer.style.position = 'absolute';

	var mat = document.createElement('div');
	mat.style.position = 'absolute';
	mat.style.top = '50%';
	mat.style.left = '30%';
	mat.style.zIndex = '1000';
	mat.style.background= '#999';
	mat.innerHTML = '<input id="material" type="button" value="Next Material">';
	customContainer.appendChild(mat);
	
	document.getElementById('material').onclick = function()
	{
		x++;
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
	}
}
