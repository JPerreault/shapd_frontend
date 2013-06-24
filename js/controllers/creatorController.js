//Global variable for toggle clouds/bridges
var n = 0;

window.onload = function() {

	var tubeMeshBuilder, view, gui, scene, tubeMP, matListener, interfaceState;
	var renderer, sceneWrapper, materialsLibrary, customContainer;
	var firstTime = true;

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
			window.location = 'http://google.com/chrome';
		view = new InputView(sceneWrapper, renderer, tubeMP);
		
		renderer.setSize( view.currentWindowX, view.currentWindowY );
		renderer.setFaceCulling( THREE.CullFaceNone );
		renderer.autoClear = false;

		view.addMeshElement(renderer.domElement)
		sceneWrapper.init();
		scene = sceneWrapper;
	    setupDatGui(sceneWrapper);	
		matListener = new materialListener(sceneWrapper, tubeMeshBuilder);
		interfaceState = 'creator';
		setupInterface(interfaceState);
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
	
	function setupInterface(state)
	{
		if (state == 'creator' && firstTime)
		{
			addStartingShapes();
			addMaterialSelector();
			addResetButtons();
			addProgressBar();
			addLoops();
			$('#idLoopContainer').fadeOut(0);
		}
		else if (state == 'creator')
		{
			document.getElementById('idProgressImg').src = 'assets/imgs/progress/progress1.png';
			$('#idLoopContainer').fadeOut(450);
			$("#datGuiStuff").fadeIn(450);
			$("#materials").fadeIn(450);
			$("#idShapeContainer").fadeIn(450);
		}
		else if (state == 'loops')
		{
			document.getElementById('idProgressImg').src = 'assets/imgs/progress/progress2.png';
			$("#datGuiStuff").fadeOut(450);
			$("#materials").fadeOut(450);
			$("#idShapeContainer").fadeOut(450);
			$('#idLoopContainer').fadeIn(450);
			console.log($('idLoopContainer'));
		}
		else if (state == 'finalize')
		{
			document.getElementById('idProgressImg').src = 'assets/imgs/progress/progress3.png';
			$('#idLoopContainer').fadeOut(450);
			$("#materials").fadeIn(450);
		}
	}
	
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
	
	
		//document.getElementById('idProgressImg').onclick = function()
	//{
	//	console.log('test');
	//	console.log($('#idProgressImg'));
	//}
    
    // For shape sharing via hash
	
	document.getElementById('idS1').onclick = function()
	{
		var currentMesh = sceneWrapper.currentMesh;
		currentMesh['Starting Shape'] = 1;
		
		sceneWrapper.redrawMesh(currentMesh);
	}
	
	document.getElementById('idS2').onclick = function()
	{
		var currentMesh = sceneWrapper.currentMesh;
		currentMesh['Starting Shape'] = 2;
		
		sceneWrapper.redrawMesh(currentMesh);
	}
	
	document.getElementById('idS3').onclick = function()
	{
		var currentMesh = sceneWrapper.currentMesh;
		currentMesh['Starting Shape'] = 3;
		
		sceneWrapper.redrawMesh(currentMesh);
	}
	
	document.getElementById('idS4').onclick = function()
	{
		var currentMesh = sceneWrapper.currentMesh;
		currentMesh['Starting Shape'] = 4;
		
		sceneWrapper.redrawMesh(currentMesh);
	}
	
	document.getElementById('idS5').onclick = function()
	{
		var currentMesh = sceneWrapper.currentMesh;
		currentMesh['Starting Shape'] = 13;
		
		sceneWrapper.redrawMesh(currentMesh);
	}
	
	document.getElementById('idS6').onclick = function()
	{
		var currentMesh = sceneWrapper.currentMesh;
		currentMesh['Starting Shape'] = 12;
		
		sceneWrapper.redrawMesh(currentMesh);
	}
	
	document.getElementById('idResetRotationImg').onclick = function()
	{
		view.targetX = 0;
		view.targetY = 0;
	}
    
    document.getElementById('idResetShapdImg').onclick = function()
	{
		var currentMesh = sceneWrapper.currentMesh;
		currentMesh['Scale'] = 5;
		currentMesh['Modify'] = 5;
		currentMesh['Depth'] = 1;
		currentMesh['Stretch'] = 1;
		currentMesh['Loops'] = 2;
		currentMesh['Thickness'] = 4;
		currentMesh['Rotation X'] = 0;
		currentMesh['Rotation Y'] = 0;
		
        sceneWrapper.redrawMesh(currentMesh);
		setupDatGui(sceneWrapper);
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
		
		var datGuiContainer = document.createElement('div');
		document.body.appendChild(datGuiContainer);
		datGuiContainer.id = 'datGuiStuff';
		gui.domElement.style.position = 'absolute';
		gui.domElement.style.top = '-1px';
		gui.domElement.style.left = '-15px';
		gui.domElement.style.zIndex = '100';
		datGuiContainer.appendChild(gui.domElement);
	};
}
