//Global variable for toggle clouds/bridges
var n = 0;
var loops = false;

window.onload = function() {

	var tubeMeshBuilder, view, gui, scene, tubeMP, matListener, state;
	var renderer, sceneWrapper, materialsLibrary, customContainer, datGuiContainer;
	var firstTime = true;

	init();
	animate();

	function init() {

		materialsLibrary = new MaterialsLibrary();
		tubeMeshBuilder = new TubeMeshBuilder(materialsLibrary);
		
		if (typeof savedShape == 'undefined')
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
		
		datGuiContainer = document.createElement('div');
		document.body.appendChild(datGuiContainer);
		datGuiContainer.id = 'datGuiStuff';
	    setupDatGui(sceneWrapper);	
		
		matListener = new materialListener(sceneWrapper, tubeMeshBuilder);
		state = 'creator';
		setupInterface();
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
	
	function setupInterface()
	{
		if (state == 'creator' && firstTime)
		{
			addStartingShapes();
			addMaterialSelector();
			addResetButtons();
			addSave();
			addProgressBar();
			addLoops();
			$('#idLoopContainer').fadeOut(0);
			$('#idBackButton').fadeOut(0);	
			$("#materials").fadeOut(0);	
		}
		else if (state == 'creator')
		{
			document.getElementById('idProgressImg').src = 'assets/imgs/progress/progressSection1.png';
			document.getElementById('idProgressImg2').src = 'assets/imgs/progress/progressSectionOpaque.png';
			document.getElementById('idProgressImg3').src = 'assets/imgs/progress/progressSectionOpaque.png';
			document.getElementById('idProgressImg4').src = 'assets/imgs/progress/progressSectionOpaque.png';
			document.getElementById('idProgressImgNamesId2').src = 'assets/imgs/progress/progressNames2_opaque.png';
			document.getElementById('idProgressImgNamesId3').src = 'assets/imgs/progress/progressNames3_opaque.png';
			document.getElementById('idProgressImgNamesId4').src = 'assets/imgs/progress/progressNames4_opaque.png';
			$('#idLoopContainer').fadeOut(450);
			$("#datGuiStuff").fadeIn(450);
			$("#materials").fadeOut(450);
			$("#idShapeContainer").fadeIn(450);
			$('#idBackButton').fadeOut(450);
		}
		else if (state == 'loops')
		{
			document.getElementById('idProgressImg').src = 'assets/imgs/progress/progressSection1_complete.png';
			document.getElementById('idProgressImg2').src = 'assets/imgs/progress/progressSectionActive.png';
			document.getElementById('idProgressImg3').src = 'assets/imgs/progress/progressSectionOpaque.png';
			document.getElementById('idProgressImg4').src = 'assets/imgs/progress/progressSectionOpaque.png';
			document.getElementById('idProgressImgNamesId2').src = 'assets/imgs/progress/progressNames2_solid.png';
			$("#datGuiStuff").fadeOut(450);
			$("#materials").fadeOut(450);
			$("#idShapeContainer").fadeOut(450);
			$('#idLoopContainer').fadeIn(450);
			$('#idBackButton').fadeIn(450);
		}
		else if (state == 'finalize')
		{
			document.getElementById('idProgressImg').src = 'assets/imgs/progress/progressSection1_complete.png';
			document.getElementById('idProgressImg2').src = 'assets/imgs/progress/progressSectionComplete.png';
			document.getElementById('idProgressImg3').src = 'assets/imgs/progress/progressSectionActive.png';
			document.getElementById('idProgressImg4').src = 'assets/imgs/progress/progressSectionOpaque.png';
			document.getElementById('idProgressImgNamesId2').src = 'assets/imgs/progress/progressNames2_solid.png';
			document.getElementById('idProgressImgNamesId3').src = 'assets/imgs/progress/progressNames3_solid.png';
			$('#idLoopContainer').fadeOut(450);
			$("#materials").fadeIn(450);
			$('#idBackButton').fadeIn(450);
			$('#idSaveButton').fadeIn(450);
			$('#idResetContainer').fadeIn(450);
		}
		else if (state == 'publish')
		{
			document.getElementById('idProgressImg').src = 'assets/imgs/progress/progressSection1_complete.png';
			document.getElementById('idProgressImg2').src = 'assets/imgs/progress/progressSectionComplete.png';
			document.getElementById('idProgressImg3').src = 'assets/imgs/progress/progressSectionComplete.png';
			document.getElementById('idProgressImg4').src = 'assets/imgs/progress/progressSectionActive.png';
			document.getElementById('idProgressImgNamesId2').src = 'assets/imgs/progress/progressNames2_solid.png';
			document.getElementById('idProgressImgNamesId3').src = 'assets/imgs/progress/progressNames3_solid.png';
			document.getElementById('idProgressImgNamesId4').src = 'assets/imgs/progress/progressNames4_solid.png';
			$('#idLoopContainer').fadeOut(450);
			$("#materials").fadeOut(450);
			$('#idBackButton').fadeIn(450);
			$('#idResetContainer').fadeOut(450);
			$('#idSaveButton').fadeOut(450);
		}
	}
	
	customContainer = document.getElementById('container');	
	customContainer.style.zIndex = '100';
	customContainer.style.position = 'relative';

	var saveSTL = document.createElement('div');
	saveSTL.style.position = 'absolute';
	saveSTL.style.top = '0px';
	saveSTL.style.left = '230px';
	saveSTL.style.zIndex = '1000';
	saveSTL.style.background = '#999';
	saveSTL.innerHTML += '<input id="save" type="button" value="Save Shape"/>';
	customContainer.appendChild(saveSTL);
    
    var screen = document.createElement('div');
    screen.style.position = 'absolute';
    screen.style.top = '28px';
    screen.style.left = '230px';
    screen.style.zIndex = '1000';
    screen.style.background= '#999';
    screen.innerHTML = '<input id="screen" type="button" value="Volume Test">';
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
	
	document.getElementById('idSaveButton').onclick = function()
	{
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
		if (typeof newuser != 'undefined')
			createNewUser();
		firstTime = false;
		if (state == 'creator')
		{
			state = 'loops';
			setupInterface();
		}
		else if (state == 'loops')
		{
			state = 'finalize';
			loops = false;
			setupInterface();
		}
		else if (state == 'finalize')
		{
			state = 'publish';
			setupInterface();
		}
		weLoveRicky();
	}
	
	
	document.getElementById('idBackButton').onclick = function()
	{
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
		if (state == 'creator')
		{
		}
		else if (state == 'loops')
		{
			state = 'creator';
			setupInterface();
		}
		else if (state == 'finalize')
		{
			state = 'loops';
			setupInterface();
		}
		else if (state == 'publish')
		{
			state = 'finalize';
			setupInterface();
		}
		weLoveRicky();
	}
	
	document.getElementById('screen').onclick = function()
	{
		tubeMeshBuilder.calculateVolume();
		//tubeMeshBuilder.volumeCalc(true);
		tubeMeshBuilder.calculateSurfaceArea();
	}
	
	document.getElementById('idResetRotationImg').onclick = function()
	{
		view.targetX = 0;
		view.targetY = 0;
	}
	
	document.getElementById('idLoopContainer').onclick = function()
	{
		loops = !loops;
	}
    
    document.getElementById('idResetShapdImg').onclick = function()
	{
		if (state == 'creator')
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
			
			view.targetX = 0;
			view.targetY = 0;
		}
		else if (state == 'loops')
		{
			scene.scene.remove(scene.torusMesh);
			scene.torusDefined = false;
		}
	}
	
	document.getElementById('idS1').onclick = function()
	{
		sceneWrapper.currentMesh['Starting Shape'] = 1;
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
	}
	
	document.getElementById('idS2').onclick = function()
	{
		sceneWrapper.currentMesh['Starting Shape'] = 2;
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
	}
	
	document.getElementById('idS3').onclick = function()
	{
		sceneWrapper.currentMesh['Starting Shape'] = 3;
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
	}
	
	document.getElementById('idS4').onclick = function()
	{
		sceneWrapper.currentMesh['Starting Shape'] = 4;
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
	}
	
	document.getElementById('idS5').onclick = function()
	{
		sceneWrapper.currentMesh['Starting Shape'] = 5;
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
	}
	
	document.getElementById('idS6').onclick = function()
	{
		sceneWrapper.currentMesh['Starting Shape'] = 6;
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
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
	
		gui.domElement.style.position = 'absolute';
		gui.domElement.style.top = '-1px';
		gui.domElement.style.left = '-15px';
		gui.domElement.style.zIndex = '100';
		datGuiContainer.appendChild(gui.domElement);
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
	};
}
