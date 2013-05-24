var testObject = function() {
	
	function init()
	{
		var materialsLibrary = new MaterialsLibrary();
		var tubeMeshBuilder = new TubeMeshBuilder(materialsLibrary);
		var sceneWrapper = new SceneWrapper(tubeMeshBuilder, materialsLibrary.textureCube);
		var renderer = new THREE.WebGLRenderer();
		var view = new InputView(sceneWrapper, renderer);
		renderer.setSize( view.currentWindowX, view.currentWindowY );
		renderer.setFaceCulling( THREE.CullFaceNone );
		renderer.autoClear = false;

		view.addMeshElement(renderer.domElement)
	};
}