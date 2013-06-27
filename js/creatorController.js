var n = 0;
var count = 0;
var loops = false;

window.onload = function() {

	var tubeMeshBuilder, view, gui, scene, tubeMP, matListener, state;
	var renderer, sceneWrapper, materialsLibrary, customContainer, datGuiContainer;
	var firstTime = true;
	var loops = false;

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
        {
            if (typeof screenShot != 'undefined')
                renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
            else
                renderer = new THREE.WebGLRenderer();
        }
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
    
    function killSelf()
    {
        location.href="blank.html";
    }
    
    function screenie()
    {
        var metaData = renderer.domElement.toDataURL("image/png");
        
        $.post("/meta", {id: shapeID, authenticity_token: authToken, meta: metaData});
        
    }
    
	function animate() {
		requestAnimationFrame( animate );
		render();
        
        if (typeof screenShot != 'undefined')
        {
            if (count==10)
                screenie();
            else if (count == 20)
                killSelf();
            count++;
        }
        
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
			initialSetup();
			$('#idBackButton').fadeOut(0);
			$("#sliderContainer").fadeOut(0);			
			$("#materials").fadeOut(0);
			$("#idLoopText").fadeOut(0);
			firstTime = false;	
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
			$("#datGuiStuff").fadeIn(450);
			$("#materials").fadeOut(450);
			$("#sliderContainer").fadeOut(450);
			$("#idShapeContainer").fadeIn(450);
			$('#idBackButton').fadeOut(450);
			$('#idSaveButton').fadeIn(450);
			$('#idResetContainer').fadeIn(450);
			$("#idLoopText").fadeOut(450);
			$("#idSavedShapeContainer").fadeIn(450);
			loops = false;
		}
		else if (state == 'loops')
		{
			document.getElementById('idProgressImg').src = 'assets/imgs/progress/progressSection1_complete.png';
			document.getElementById('idProgressImg2').src = 'assets/imgs/progress/progressSectionActive.png';
			document.getElementById('idProgressImg3').src = 'assets/imgs/progress/progressSectionOpaque.png';
			document.getElementById('idProgressImg4').src = 'assets/imgs/progress/progressSectionOpaque.png';
			document.getElementById('idProgressImgNamesId2').src = 'assets/imgs/progress/progressNames2_solid.png';
			document.getElementById('idProgressImgNamesId3').src = 'assets/imgs/progress/progressNames3_opaque.png';
			document.getElementById('idProgressImgNamesId4').src = 'assets/imgs/progress/progressNames4_opaque.png';
			$("#datGuiStuff").fadeOut(450);
			$("#materials").fadeOut(450);
			$("#sliderContainer").fadeOut(450);
			$("#idShapeContainer").fadeOut(450);
			$('#idBackButton').fadeIn(450);
			$('#idSaveButton').fadeIn(450);
			$('#idResetContainer').fadeIn(450);
			$("#idLoopText").fadeIn(450);
			$("#idSavedShapeContainer").fadeOut(450);
			loops = true;
		}
		else if (state == 'finalize')
		{
			document.getElementById('idProgressImg').src = 'assets/imgs/progress/progressSection1_complete.png';
			document.getElementById('idProgressImg2').src = 'assets/imgs/progress/progressSectionComplete.png';
			document.getElementById('idProgressImg3').src = 'assets/imgs/progress/progressSectionActive.png';
			document.getElementById('idProgressImg4').src = 'assets/imgs/progress/progressSectionOpaque.png';
			document.getElementById('idProgressImgNamesId2').src = 'assets/imgs/progress/progressNames2_solid.png';
			document.getElementById('idProgressImgNamesId3').src = 'assets/imgs/progress/progressNames3_solid.png';
			document.getElementById('idProgressImgNamesId4').src = 'assets/imgs/progress/progressNames4_opaque.png';
			$("#datGuiStuff").fadeOut(450);
			$("#materials").fadeIn(450);
			$("#sliderContainer").fadeIn(450);
			$("#idShapeContainer").fadeOut(450);
			$('#idBackButton').fadeIn(450);
			$('#idSaveButton').fadeIn(450);
			$('#idResetContainer').fadeIn(450);
			$("#idLoopText").fadeOut(450);
			$("#idSavedShapeContainer").fadeOut(450);
			loops = false;
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
			$("#datGuiStuff").fadeOut(450);
			$("#materials").fadeOut(450);
			$("#sliderContainer").fadeOut(450);
			$("#idShapeContainer").fadeOut(450);
			$('#idBackButton').fadeIn(450);
			$('#idSaveButton').fadeIn(450);
			$('#idResetContainer').fadeOut(450);
			$("#idLoopText").fadeOut(450);
			$("#idSavedShapeContainer").fadeOut(450);
			loops = false;
		}
	}
	
	function initialSetup()
	{
		addStartingShapes();
		addMaterialSelector();
		addResetButtons();
		addSave();
		addProgressBar();
		addLoops();
		addSavedLibrary();
	}
	
	customContainer = document.getElementById('container');	
	customContainer.style.zIndex = '100';
	customContainer.style.position = 'relative';

	var saveSTL = document.createElement('div');
	saveSTL.style.position = 'absolute';
	saveSTL.style.bottom = '0px';
	saveSTL.style.left = '0px';
	saveSTL.style.zIndex = '1000';
	saveSTL.style.background = '#999';
	saveSTL.innerHTML += '<input id="save" type="button" value="Save Shape"/>';
	customContainer.appendChild(saveSTL);
    
    var screen = document.createElement('div');
    screen.style.position = 'absolute';
    screen.style.bottom = '28px';
    screen.style.left = '0px';
    screen.style.zIndex = '1000';
    screen.style.background= '#999';
    screen.innerHTML = '<input id="screen" type="button" value="Volume Test">';
    customContainer.appendChild(screen);
	
	document.getElementById('save').onclick = function()
	{
		tubeMeshBuilder.saveSTL();
	}
	
	document.getElementById('idSaveButton').onclick = function()
	{
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
                
		if (typeof newuser !== 'undefined' && newuser)
			createNewUser();
        else
            saveButtonAction();
	}
    
    
    function saveButtonAction()
    {
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
		saveShape();
    }

	
	
	document.getElementById('idBackButton').onclick = function()
	{
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
		if (state == 'loops')
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
		saveShape();
	}
	
	document.getElementById('idProgressImg').onclick = function()
	{
			state = 'creator';
			setupInterface();
	}
	
	document.getElementById('idProgressImg2').onclick = function()
	{
			state = 'loops';
			setupInterface();
	}
	
	document.getElementById('idProgressImg3').onclick = function()
	{
			state = 'finalize';
			setupInterface();
	}
	
	document.getElementById('idProgressImg4').onclick = function()
	{
			state = 'publish';
			setupInterface();
	}
	
	document.getElementById('idProgressImgNamesId1').onclick = function()
	{
			state = 'creator';
			setupInterface();
	}
	
	document.getElementById('idProgressImgNamesId2').onclick = function()
	{
			state = 'loops';
			setupInterface();
	}
	
	document.getElementById('idProgressImgNamesId3').onclick = function()
	{
			state = 'finalize';
			setupInterface();
	}
	
	document.getElementById('idProgressImgNamesId4').onclick = function()
	{
			state = 'publish';
			setupInterface();
	}
	
	document.getElementById('idResetRotationImg').onclick = function()
	{
		view.targetX = 0;
		view.targetY = 0;
	}
    
    document.getElementById('idResetShapdImg').onclick = function()
	{
		var currentMesh = sceneWrapper.currentMesh;
		if (state == 'creator')
		{
			currentMesh['Scale'] = 5;
			currentMesh['Modify'] = 5;
			currentMesh['Depth'] = 1;
			currentMesh['Stretch'] = 1;
			currentMesh['Loops'] = 2;
			currentMesh['Thickness'] = 4;
			currentMesh['Rotation X'] = 0;
			currentMesh['Rotation Y'] = 0;
			view.targetX = 0;
			view.targetY = 0;
		
			sceneWrapper.redrawMesh(currentMesh);
			setupDatGui(sceneWrapper);
			
			
		}
		else if (state == 'loops')
		{
			scene.scene.remove(scene.torusMesh);
			scene.torusDefined = false;
		}
		else if (state == 'finalize')
		{
			currentMesh['Scale'] = 5;
			$( "#slider" ).slider( "value", 100 );
			$( "#scale" ).val( $( "#slider" ).slider( "value" ) );
			
		
			sceneWrapper.redrawMesh(currentMesh);
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
	
	document.getElementById('screen').onclick = function()
	{
		getJson(sceneWrapper.currentMesh.figure);
	}
	
	document.getElementById('slider').onmousedown = function()
	{
		event.preventDefault();
		
		document.addEventListener( 'mouseup', releaseSlider, false );
	}
	
	function releaseSlider()
	{
		event.preventDefault();
		
		var sliderValue = $( "#slider" ).slider( "value" );
		sceneWrapper.currentMesh.figure.scale.x = sliderValue/ 20;
		sceneWrapper.currentMesh.figure.scale.y = sliderValue/ 20;
		sceneWrapper.currentMesh.figure.scale.z = sliderValue/ 20;
		document.removeEventListener( 'mouseup', releaseSlider, false );
		
		scene.redrawMesh(scene.currentMesh);
		getNewPrice();
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
		gui.domElement.style.zIndex = '1000';
		datGuiContainer.appendChild(gui.domElement);
	}
	
	function getNewPrice()
	{
		var jsonString = getJson(sceneWrapper.currentMesh.figure);
		if (typeof authToken !== 'undefined')
			$.post("/pricing/", {authenticity_token: authToken, id: shapeID, json: jsonString}, function(data){updatePrice(data)});
	}
	
	function updatePrice(data)
	{
		$( "#cost" ).val('$'.concat(data+''));
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
