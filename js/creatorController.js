var n = 0;
var changedModify = 0;
var count = 0;
var loops = false;
var sceneWrapper, view, gui, tutorial, state, printable;

window.onload = function() {

	var tubeMeshBuilder, scene, tubeMP, matListener;
	var renderer, materialsLibrary, customContainer, datGuiContainer;
	var projector, mouse = { x: 0, y: 0 }, intersected, fout;
	var firstTime = true;
	var loops = false;
    if (typeof notSignedIn === 'undefined')
        var doTutorial = false;
    else
        var doTutorial = true;
	
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
            location.href = 'snag.html';
		view = new InputView(sceneWrapper, renderer, tubeMP);
		
		renderer.setSize( view.currentWindowX, view.currentWindowY );
		renderer.setFaceCulling( THREE.CullFaceNone );
		renderer.setClearColor(0xffffff, 1);
		renderer.autoClear = false;
		state = 'creator';

		view.addMeshElement(renderer.domElement)
		sceneWrapper.init();
		scene = sceneWrapper;
		
		tutorial = new Tutorial(view, doTutorial, state);
		
		matListener = new materialListener(sceneWrapper, tubeMeshBuilder, tutorial);
		setupInterface();
		setupDatGui(sceneWrapper);
		if (typeof screenShot === 'undefined')
			document.getElementById(sceneWrapper.currentMesh['Material']).click();	//For initializing material	
	}

    function killSelf()
    {
        parent.hideTheBeast(parent.state);
        idSavedShapeLibrary.innerHTML = shapeLib;
        setTimeout("location.href=\"blank.html\";", 2000);
    }
    
    function screenie()
    {
        var metaData = renderer.domElement.toDataURL("image/png");
        
        $.post("/meta", {id: shapeID, authenticity_token: authToken, meta: metaData}, killSelf());
        
    }
    
	function animate() {
		requestAnimationFrame( animate );
		render();      
		
		if (typeof screenShot != 'undefined')
		{
			if (count==10)
				screenie();
//			else if (count == 20)               
//				killSelf();
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
			$("#thicknessContainer").fadeOut(0);				
			$("#materials").fadeOut(0);
			$("#idLoopText").fadeOut(0);
			$("#idmaterialDetailContainer").fadeOut(0);
			$('#idMaterialPanel').fadeOut(0);
			$('#idCostDataContainer').fadeOut(0);
			$('#materialDetailContainer').fadeOut(0);
			$('#idLoopRotContainer').fadeOut(0);
			$('#idDimsContainer').fadeOut(0);
			
			if (typeof viewer !== 'undefined' && viewer)
			{
				$("#datGuiStuff").fadeOut(0);
				$("#idShapeContainer").fadeOut(0);
				$('#idResetContainer').fadeOut(0);
				$("#idSavedShapeContainer").fadeOut(0);
				$('#idSaveButton').fadeOut(0);
				$('#idProgressContainer').fadeOut(0);
			}
			firstTime = false;	
		}
		else if (state == 'creator')
		{
			document.getElementById('idProgressImg1').src = 'assets/imgs/progress/progressSection1.png';
			document.getElementById('idProgressImg2').src = 'assets/imgs/progress/progressSectionOpaque.png';
			document.getElementById('idProgressImg3').src = 'assets/imgs/progress/progressSectionOpaque.png';
			document.getElementById('idProgressImg4').src = 'assets/imgs/progress/progressSectionOpaque.png';
			document.getElementById('idProgressImgNamesId2').src = 'assets/imgs/progress/progressNames2_opaque.png';
			document.getElementById('idProgressImgNamesId3').src = 'assets/imgs/progress/progressNames3_opaque.png';
			document.getElementById('idProgressImgNamesId4').src = 'assets/imgs/progress/progressNames4_opaque.png';
			$("#datGuiStuff").fadeIn(450);
			$("#materials").fadeOut(450);
			$("#idmaterialDetailContainer").fadeOut(450);
			$("#sliderContainer").fadeOut(450);
			$("#thicknessContainer").fadeOut(450);
			$("#idShapeContainer").fadeIn(450);
			$('#idBackButton').fadeOut(450);
			$('#idSaveButton').fadeIn(450);
			$('#idResetContainer').fadeIn(450);
			$("#idLoopText").fadeOut(450);
			$('#idDimsContainer').fadeOut(450);
			$('#idCostDataContainer').fadeOut(450);
			$('#materialDetailContainer').fadeOut(450);
			$("#idSavedShapeContainer").fadeIn(450);
			$('#idMaterialPanel').fadeOut(450);
			$('#idLoopRotContainer').fadeOut(450);
			document.removeEventListener( 'mousedown', onDocumentMouseDown, false );
			loops = false;
			saveButtonClick(true);
		}
		else if (state == 'loops')
		{
			document.getElementById('idProgressImg1').src = 'assets/imgs/progress/progressSection1.png';
			document.getElementById('idProgressImg2').src = 'assets/imgs/progress/progressSectionActive.png';
			document.getElementById('idProgressImg3').src = 'assets/imgs/progress/progressSectionOpaque.png';
			document.getElementById('idProgressImg4').src = 'assets/imgs/progress/progressSectionOpaque.png';
			document.getElementById('idProgressImgNamesId2').src = 'assets/imgs/progress/progressNames2_solid.png';
			document.getElementById('idProgressImgNamesId3').src = 'assets/imgs/progress/progressNames3_opaque.png';
			document.getElementById('idProgressImgNamesId4').src = 'assets/imgs/progress/progressNames4_opaque.png';
			$("#datGuiStuff").fadeOut(450);
			$("#materials").fadeOut(450);
			$("#idmaterialDetailContainer").fadeOut(450);
			$("#sliderContainer").fadeOut(450);
			$("#thicknessContainer").fadeOut(450);
			$("#idShapeContainer").fadeOut(450);
			$('#materialDetailContainer').fadeOut(450);
			$('#idBackButton').fadeIn(450);
			$('#idSaveButton').fadeIn(450);
			$('#idResetContainer').fadeIn(450);
			$("#idLoopText").fadeIn(450);
			$('#idDimsContainer').fadeOut(450);
			$('#idCostDataContainer').fadeOut(450);
			$("#idSavedShapeContainer").fadeOut(450);
			$('#idMaterialPanel').fadeOut(450);
			if (sceneWrapper.torusDefined == true)
				$('#idLoopRotContainer').fadeIn(450);
			if (tutorial.tutorialOn === false)
				document.addEventListener( 'mousedown', onDocumentMouseDown, false );
			loops = true;
			tutorial.tut5();
			saveButtonClick(true);
		}
		else if (state == 'finalize')
		{
			document.getElementById('idProgressImg1').src = 'assets/imgs/progress/progressSection1.png';
			document.getElementById('idProgressImg2').src = 'assets/imgs/progress/progressSectionActive.png';
			document.getElementById('idProgressImg3').src = 'assets/imgs/progress/progressSectionActive.png';
			document.getElementById('idProgressImg4').src = 'assets/imgs/progress/progressSectionOpaque.png';
			document.getElementById('idProgressImgNamesId2').src = 'assets/imgs/progress/progressNames2_solid.png';
			document.getElementById('idProgressImgNamesId3').src = 'assets/imgs/progress/progressNames3_solid.png';
			document.getElementById('idProgressImgNamesId4').src = 'assets/imgs/progress/progressNames4_opaque.png';
			$("#datGuiStuff").fadeOut(450);
			$("#materials").fadeIn(450);
			$("#idmaterialDetailContainer").fadeIn(450);
			$("#sliderContainer").fadeIn(450);
			$("#thicknessContainer").fadeOut(450);
			$("#idShapeContainer").fadeOut(450);
			$('#idBackButton').fadeIn(450);
			$('#idSaveButton').fadeIn(450);
			$('#materialDetailContainer').fadeIn(450);
			$('#idResetContainer').fadeIn(450);
			$("#idLoopText").fadeOut(450);
			$('#idDimsContainer').fadeIn(450);
			$('#idCostDataContainer').fadeIn(450);
			$("#idSavedShapeContainer").fadeOut(450);
			$('#idMaterialPanel').fadeIn(450);
			$('#idLoopRotContainer').fadeOut(450);
			document.removeEventListener( 'mousedown', onDocumentMouseDown, false );
			loops = false;
			tutorial.tut7();
			tubeMeshBuilder.calculateDimensions('xyz', sceneWrapper.torusDefined);
			matListener.panelUpdate();
			getNewPrice();
			$( "#thickslider" ).slider( "value", sceneWrapper.currentMesh['Thickness'] );
			updateThickness();
			saveButtonClick(false);
		}
		else if (state == 'publish')
		{
			document.getElementById('idProgressImg1').src = 'assets/imgs/progress/progressSection1.png';
			document.getElementById('idProgressImg2').src = 'assets/imgs/progress/progressSectionActive.png';
			document.getElementById('idProgressImg3').src = 'assets/imgs/progress/progressSectionActive.png';
			document.getElementById('idProgressImg4').src = 'assets/imgs/progress/progressSectionActive.png';
			document.getElementById('idProgressImgNamesId2').src = 'assets/imgs/progress/progressNames2_solid.png';
			document.getElementById('idProgressImgNamesId3').src = 'assets/imgs/progress/progressNames3_solid.png';
			document.getElementById('idProgressImgNamesId4').src = 'assets/imgs/progress/progressNames4_solid.png';
			$("#datGuiStuff").fadeOut(450);
			$("#materials").fadeOut(450);
			$("#idmaterialDetailContainer").fadeOut(450);
			$("#sliderContainer").fadeOut(450);
			$("#thicknessContainer").fadeOut(450);
			$("#idShapeContainer").fadeOut(450);
			$('#idBackButton').fadeOut(450);
			$('#idSaveButton').fadeOut(450);
			$('#idSaveStayButton').fadeOut(450);
			$('#materialDetailContainer').fadeOut(450);
			$('#idResetContainer').fadeOut(450);
			$("#idLoopText").fadeOut(450);
			$('#idDimsContainer').fadeOut(450);
			$('#idCostDataContainer').fadeOut(450);
			$("#idSavedShapeContainer").fadeOut(450);
			$('#idMaterialPanel').fadeOut(450);
			$('#idLoopRotContainer').fadeOut(450);
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
		addDesignTips();
		loopRotations();
		addDimensions();
		addDatGui();
		addCost();
	}
	
	customContainer = document.getElementById('container');	
	customContainer.style.zIndex = '100';
	customContainer.style.position = 'relative';

	// var saveSTL = document.createElement('div');
	// saveSTL.style.position = 'absolute';
	// saveSTL.style.bottom = '0px';
	// saveSTL.style.left = '15%';
	// saveSTL.style.zIndex = '1000';
	// saveSTL.style.background = '#999';
	// saveSTL.innerHTML += '<input id="save" type="button" value="Save Shape"/>';
	// customContainer.appendChild(saveSTL);

	
	// document.getElementById('save').onclick = function()
	// {

		// tubeMeshBuilder.saveSTL(sceneWrapper.torusDefined);
		
		// var newFigure = tubeMeshBuilder.removeFaces();
		// sceneWrapper.scene.add(newFigure );
		// sceneWrapper.scene.remove(sceneWrapper.currentMesh.figure);
		// sceneWrapper.currentMesh.figure = newFigure;
	// }
	
	document.getElementById('blackout').onclick = function()
	{
		fadeOut(fout);
		$(".swoop").fadeOut();
		
		if (tutorial.tutorialOn === true && state === 'loops')
			document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	}
	
	document.getElementById('idM1').onclick = function()
	{
		var imgSource = document.getElementById('idM1').src;
		var imgDesc = matListener.getImgDesc1();
		var d1 = generateLightbox(imgSource, imgDesc);
		fout = d1;
		fadeIn(d1);
		document.getElementById(d1).onclick = function()
		{
			fadeOut(fout);
		}
	}
	
	document.getElementById('idM2').onclick = function()
	{
		var imgSource = document.getElementById('idM2').src;
		var imgDesc = matListener.getImgDesc2();
		var d1 = generateLightbox(imgSource, imgDesc);
		fout = d1;
		fadeIn(d1);
		document.getElementById(d1).onclick = function()
		{
			fadeOut(fout);
		}
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
			saveShape();
		}
		else if (state == 'loops')
		{
			state = 'finalize';
			loops = false;
			setupInterface();
			saveShape();
		}
		else if (state == 'finalize')
		{
			if (printable)
			{
				state = 'publish';
				setupInterface();
				saveShape();
			}
		}
	}	
	
	document.getElementById('idSaveStayButton').onclick = function()
	{
		if (typeof newuser !== 'undefined' && newuser)
				createNewUser();
			else
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
	}
	
	document.getElementById('idProgressImg1').onclick = function()
	{
		if (typeof notSignedIn === 'undefined' || typeof shapeID !== 'undefined')
		{
			state = 'creator';
			setupInterface();
		}
	}
	
	document.getElementById('idProgressImg2').onclick = function()
	{
		if (typeof notSignedIn === 'undefined' || typeof shapeID !== 'undefined')
		{
			state = 'loops';
			setupInterface();
		}
	}
	
	document.getElementById('idProgressImg3').onclick = function()
	{
		if (typeof notSignedIn === 'undefined' || typeof shapeID !== 'undefined')
		{
			state = 'finalize';
			setupInterface();
			if (typeof shapeID === 'undefined')
				saveShape();
		}
	}
	
	document.getElementById('idProgressImgNamesId1').onclick = function()
	{
		if (typeof notSignedIn === 'undefined' || typeof shapeID !== 'undefined')
		{
			state = 'creator';
			setupInterface();
		}
	}
	
	document.getElementById('idProgressImgNamesId2').onclick = function()
	{
		if (typeof notSignedIn === 'undefined' || typeof shapeID !== 'undefined')
		{
			state = 'loops';
			setupInterface();
		}
	}
	
	document.getElementById('idProgressImgNamesId3').onclick = function()
	{
		if (typeof notSignedIn === 'undefined' || typeof shapeID !== 'undefined')
		{
			state = 'finalize';
			setupInterface();
			if (typeof shapeID === 'undefined')
				saveShape();
		}
	}
	
	document.getElementById('idResetRotationImg').onclick = function()
	{
		view.targetX = 0;
		view.targetY = 0;
	}
    
	document.getElementById('idRemoveLoop').onclick = function()
	{
		scene.scene.remove(scene.torusMesh);
		scene.torusDefined = false;
		sceneWrapper.currentMesh['Face Index'] = -1;
		sceneWrapper.tubeMeshBuilder.fIndex = -1;
		$('#idLoopRotContainer').fadeOut(0);
		tubeMeshBuilder.torusRotation = 0;
		tubeMeshBuilder.torusRotationNinety = 0;
	}
	
    document.getElementById('idResetShapdImg').onclick = function()
	{
		var currentMesh = sceneWrapper.currentMesh;
		if (state == 'creator')
		{
			resetAllParams(0);
		
			sceneWrapper.redrawMesh(currentMesh);
			resetDatGui();
			setupDatGui(sceneWrapper);
		}
		else if (state == 'loops')
		{
			scene.scene.remove(scene.torusMesh);
			scene.torusDefined = false;
			sceneWrapper.currentMesh['Face Index'] = -1;
			sceneWrapper.tubeMeshBuilder.fIndex = -1;
			$('#idLoopRotContainer').fadeOut(0);
			tubeMeshBuilder.torusRotation = 0;
			tubeMeshBuilder.torusRotationNinety = 0;
		}
		else if (state == 'finalize')
		{
			sceneWrapper.updateScale(.66);
			$( "#slider" ).slider( "value", 66 );
			$( "#scale" ).val( $( "#slider" ).slider( "value" ) );
			$( "#thickslider" ).slider( "value", 1.75 );
			tubeMeshBuilder.calculateDimensions('xyz', sceneWrapper.torusDefined);
		
			sceneWrapper.redrawMesh(currentMesh);
			getNewPrice();
		}
	}
	
	function resetAllParams()
	{
		var currentMesh = sceneWrapper.currentMesh;
		
		currentMesh['Modify'] = 5;
		currentMesh['Depth'] = 1;
		currentMesh['Stretch'] = 1;
		currentMesh['Loops'] = 2;
		currentMesh['Thickness'] = 1.75;
		currentMesh['Rotation X'] = 0;
		currentMesh['Rotation Y'] = 0;
		view.targetX = 0;
		view.targetY = 0;
		
		$( "#thickslider" ).slider( "value", 1.75 );
		tubeMeshBuilder.calculateDimensions('xyz', sceneWrapper.torusDefined);
	}
	
	document.getElementById('idShapeLibrary').onclick = function()
	{
		if (event.toElement.tagName === 'IMG')
		{
				
			var shapeNumber = event.toElement.id.substr(3, event.toElement.id.length);
			sceneWrapper.currentMesh['Starting Shape'] = parseInt(shapeNumber);
			resetAllParams();
			
			tubeMeshBuilder.fIndex = -1;
			tubeMeshBuilder.torusRotation = 0;
			tubeMeshBuilder.torusRotationNinety = 0;
			sceneWrapper.torusDefined = false;
			
			sceneWrapper.updateScale(.66);
			$( "#slider" ).slider( "value", 66 );

			if (typeof sceneWrapper.torusMesh !== 'undefined')
				sceneWrapper.scene.remove(sceneWrapper.torusMesh);
			resetDatGui();
			setupDatGui(sceneWrapper);
			sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
			
			if (tutorial.tutorialOn)
				tutorial.tut3();
		}
	}
	
	document.getElementById('idLoopAroundRightButton').onclick = function()
	{						
		tubeMeshBuilder.faceIndexIncrementor += 1;
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
	}
	
	document.getElementById('idLoopAroundLeftButton').onclick = function()
	{
		tubeMeshBuilder.faceIndexIncrementor -= 1;
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
	}
	
	document.getElementById('idLoopMoreAngleButton').onclick = function()
	{
		if (tubeMeshBuilder.torusRotation < 0.7853981634)
			tubeMeshBuilder.torusRotation += 0.0872664626;
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
	}
	
	document.getElementById('idLoopLessAngleButton').onclick = function()
	{
		if (tubeMeshBuilder.torusRotation > -0.7853981634)
			tubeMeshBuilder.torusRotation -= 0.0872664626;
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
	}
	
	document.getElementById('idSpinButton').onclick = function()
	{
		if (tubeMeshBuilder.torusRotationNinety === 0)
			tubeMeshBuilder.torusRotationNinety = 1.57079633;
		else
			tubeMeshBuilder.torusRotationNinety = 0;
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
	}
	
	document.getElementById('thickslider').onmousedown = function()
	{
		event.preventDefault();
		
		document.addEventListener( 'mouseup', releaseThickSlider, false );
		document.addEventListener( 'mousemove', moveThickSlider, false );
	}
	
	function moveThickSlider()
	{
		var sliderValue = $( "#thickslider" ).slider( "value" );
		sceneWrapper.currentMesh['Thickness'] = sliderValue;
		
		scene.redrawMesh(scene.currentMesh);
		tubeMeshBuilder.calculateDimensions('xy', sceneWrapper.torusDefined);
		updateThickness(true);
	}
	
	function releaseThickSlider()
	{
		event.preventDefault();
		
		var sliderValue = $( "#thickslider" ).slider( "value" );
		sceneWrapper.currentMesh['Thickness'] = sliderValue;
		document.removeEventListener( 'mouseup', releaseThickSlider, false );
		document.removeEventListener( 'mousemove', moveThickSlider, false );
		
		scene.redrawMesh(scene.currentMesh);
		tubeMeshBuilder.calculateDimensions('xyz', sceneWrapper.torusDefined);
		getNewPrice();
		updateThickness();
		gui.__controllers[0].setValue(sliderValue);
	}
	
	document.getElementById('slider').onmousedown = function()
	{
		event.preventDefault();
		
		document.addEventListener( 'mouseup', releaseSlider, false );
		document.addEventListener( 'mousemove', moveSlider, false );
	}
	
	
	function moveSlider()
	{
		var sliderValue = $( "#slider" ).slider( "value" );
		var newScale = sliderValue / 100;
		sceneWrapper.updateScale(newScale);
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
		
		tubeMeshBuilder.calculateDimensions('xy', sceneWrapper.torusDefined);
		updateThickness();
	}
	
	function releaseSlider()
	{
		event.preventDefault();
		
		var sliderValue = $( "#slider" ).slider( "value" );
		var newScale = sliderValue / 100;
		sceneWrapper.updateScale(newScale);
		document.removeEventListener( 'mouseup', releaseSlider, false );
		document.removeEventListener( 'mousemove', moveSlider, false );
		
		if (tutorial.tutorialOn === true) {
			tutorial.tut9();
		}
		
		scene.redrawMesh(scene.currentMesh);
		tubeMeshBuilder.calculateDimensions('xyz', sceneWrapper.torusDefined);
		getNewPrice();
		updateThickness();
	}
    
    $(function () {
      $('.antiscroll-wrap').antiscroll();
      });
}

function loadFromLib(hash)
{
    window.savedShape = hash;
    var loadedShape = new TubeMeshParams();
	window.view.targetX = loadedShape['Rotation X'];
	window.view.targetY = loadedShape['Rotation Y'];
	
	sceneWrapper.tubeMeshBuilder.faceIndexIncrementor = loadedShape['Face Index Incrementor'];
	sceneWrapper.tubeMeshBuilder.torusRotation = loadedShape['Torus Rotation'];
	sceneWrapper.tubeMeshBuilder.torusRotationNinety = loadedShape['Torus 90 Rotations'];
	sceneWrapper.tubeMeshBuilder.officialName = loadedShape['Description'];
	
	if (loadedShape['Face Index'] != -1)
	{
		sceneWrapper.torusDefined = true;
		sceneWrapper.tubeMeshBuilder.fIndex = loadedShape['Face Index'];
	}
	else
	{
		sceneWrapper.scene.remove(sceneWrapper.torusMesh);
		sceneWrapper.torusDefined = false;
		sceneWrapper.tubeMeshBuilder.fIndex = -1;
	}
	
    sceneWrapper.redrawMesh(loadedShape, true);
    sceneWrapper.currentMesh = loadedShape;

	gui.__controllers[0].updateDisplay();
	gui.__controllers[1].updateDisplay();
	gui.__controllers[2].updateDisplay();
	gui.__folders['Shape Alteration'].__controllers[0].updateDisplay();
	gui.__folders['Shape Alteration'].__controllers[1].updateDisplay();
	
	setupDatGui(sceneWrapper);
}
	
function setupDatGui(sC) {
	datGuiContainer = document.getElementById('datGuiStuff');
	
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
	
	controller = gui.add(currentMesh, 'Thickness', .5, 5);
	setUpController(controller, 'Thickness');

	controller = gui.add(currentMesh, 'Depth', 0.0005, 2);
	setUpController(controller, 'Depth');

	controller = gui.add(currentMesh, 'Stretch', 0.00005, 1.75);
	setUpController(controller, 'Stretch');
	
	var morphFolder = gui.addFolder ('Shape Alteration');
	controller = morphFolder.add(currentMesh, 'Modify', 1, 10).step(1);
	setUpController(controller, 'Modify');
	
	controller = morphFolder.add(currentMesh, 'Loops', 1, 10, 0x000000).step(1);
	setUpController(controller, 'Loops');

	morphFolder.open();

	gui.domElement.style.position = 'absolute';
	gui.domElement.style.top = '-1px';
	gui.domElement.style.left = '-15px';
	gui.domElement.style.zIndex = '1000';
	datGuiContainer.appendChild(gui.domElement);
}

function resetDatGui()
{
	var currentMesh = sceneWrapper.currentMesh;
	currentMesh['Thickness'] = 1.75;
	currentMesh['Depth'] = 1;
	currentMesh['Stretch'] = 1;
	currentMesh['Modify'] = 5;
	currentMesh['Loops'] = 2;
	gui.__controllers[0].updateDisplay();
	gui.__controllers[1].updateDisplay();
	gui.__controllers[2].updateDisplay();
	gui.__folders['Shape Alteration'].__controllers[0].updateDisplay();
	gui.__folders['Shape Alteration'].__controllers[1].updateDisplay();
}

function saveButtonClick(isClickable)
{
	var saveButton = document.getElementById('idSaveButton');
	n++;
	if (isClickable === true)
	{
		saveButton.style.opacity = 1;
		saveButton.style.cursor = 'pointer';
		printable = true;
	}
	else
	{
		if (n > 1)
		{
			saveButton.style.opacity = .5;
			saveButton.style.cursor = 'default';
			printable = false;
		}
	}
}

function updateThickness(isMove)
{
	var isOkay = sceneWrapper.tubeMeshBuilder.checkDimensions();
	
	if (isOkay === 'small'|| isOkay === 'thin')
	{
		$("#thicknessContainer").fadeIn(0);
		document.getElementById('shapethin').innerHTML = "Your shape is too thin to print!";
		document.getElementById('increasesize').innerHTML = 'Please increase thickness, increase the scale, or alter your shape.';
		saveButtonClick(false);
	}
	else if (isOkay === 'large')
	{
		$("#thicknessContainer").fadeIn(0);
		document.getElementById('shapethin').innerHTML = "Your shape is too large to print!";
		document.getElementById('increasesize').innerHTML = 'Please decrease thickness, decrease the scale, or alter your shape.';
		document.getElementById('idSaveButton').style.opacity = .5;
		saveButtonClick(false);
	}
	else
	{
		if (isMove)
		{
			document.getElementById('shapethin').innerHTML = "You\'re all set!";
			document.getElementById('increasesize').innerHTML = 'Your shape is now an acceptable size.';
		}
		else
			$("#thicknessContainer").fadeOut(0);
	}
}

function getNewPrice()
	{
		var jsonString = getJson(sceneWrapper.currentMesh, sceneWrapper);
		document.getElementById('idCostData').innerHTML = 'Pricing...';	
		saveButtonClick(false);

		var material = sceneWrapper.currentMesh['Material'];
		
		if (material.indexOf('Transparent resin') !== -1 && typeof authToken !== 'undefined' && typeof shapeID !== 'undefined')
		{
			var data = 0;
			if (sceneWrapper.tubeMeshBuilder.checkDimensions() === 'success')
				data = pre(sceneWrapper.currentMesh.figure);
			$.post("/pricing3/", {authenticity_token: authToken, id: shapeID, p: data}, function(data){updatePrice(data)});
		}
		else if (material === 'Gold regular')
		{
			document.getElementById('idCostData').innerHTML = 'Unavailable';
            return;
		}
		else if (material === 'Prime gray')
		{
			document.getElementById('idCostData').innerHTML = 'Unavailable';
			return;
		}
		
		else if (typeof authToken !== 'undefined' && typeof shapeID !== 'undefined')
		{
			if (jsonString.indexOf('currency') === -1)
				$.post("/pricing2/", {authenticity_token: authToken, id: shapeID, json: jsonString}, function(data){updatePrice(data)});
			else
				$.post("/pricing/", {authenticity_token: authToken, id: shapeID, json: jsonString}, function(data){updatePrice(data)});
		}
	}
	
function updatePrice(data)
{	
	data = parseFloat(data).toFixed(2);
	if (data > 0)
	{
		document.getElementById('idCostData').innerHTML = '$' + data;
		saveButtonClick(true);
	}
	else
	{
		document.getElementById('idCostData').innerHTML = 'Unavailable';
		saveButtonClick(false);
	}
	return data;
}

function makePublish()
{
    $.post("/publish", {authenticity_token: authToken, id: shapeID}, function(data){location.href='/gallery'});
}

function makeProduct()
{
    slideUp(fout);
    var d1 = generateDropDown(500, 85, "<h1>One moment please...</h1>");
    fadeIn(d1);
    $.post("/produce", {authenticity_token: authToken, id: shapeID}, function(data){location.href='/shop/products/'+data});
}

function pre(figure)
{
	var p = 0;
	var v = calculateVolume (figure, figure.scale.x);
	v *= 1000;
	
	(v < 20000) ? p = (4.5069 * Math.log(v) + 30.805) * 1.28 * 1.2089 : p = (0.0012 * v + 62.55) * 1.28 * 1.2089;
	
	return p;
}

function publishCreation()
{
    document.removeEventListener( 'mousedown', onDocumentMouseDown, false );
    
    var timestamp = new Date().getTime();
    
    var publishCSS = "<br><span style='font-size: 3em; font-weight: bold; color:#2fa1d7;'>Congratulations!</span><br><span style='font-size: 1.5em; font-weight: bold; color:#000; opacity: 0.8;'>You've made a pendant!</span><br><span class='verdana' style='color:#000; opacity: 0.8;'>(and it's awesome)</span><br><br><div class='publishImg'><div style='height:155px;width:155px;margin-left:auto;margin-right:auto'><img src='/shapes/"+shapeID+".png#"+timestamp+"' id='shapepreview' style='width:250px; height:250px; margin-top:-55px; margin-left:-55px'></img></div><div style='font-size:18px'>Now, you can either:</div></div><div id='publishActionContainer' width='100%'><button class='publishButtonCSS buttonImg verdana' onclick='makePublish()'>Publish</button><button class='publishButtonCSS buttonImg' onclick='makeProduct()'>Order</button></div><div style='text-align:center;'><div class='publishDesc buttonImg'>Share your design by publishing it. It will appear in the group gallery so that others can see what you've made. Other people could give you kudos, use it themselves, or make a copy and alter it themselves.</div><div class='publishDesc buttonImg'>Buy it! You can order it and we will have it made for you and ship it to your house! The next time someone says \'Wow, what a nice necklace! Where did you get it?' you will have a heck of a story :). </div></div></div></div>";
    var d1 = generateWhiteDropDown(700, 700, publishCSS );
    setTimeout('document.getElementById("shapepreview").src ="/shapes/'+shapeID+'.png#'+timestamp+'";', 1000);
    fout = d1;
    fadeIn(d1); // I prefer slideDown though
    document.getElementById("blackout").onclick = null;
}

function onDocumentMouseDown(event)
	{
		var projector = new THREE.Projector();
		
		event.preventDefault();
		var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
		projector.unprojectVector(vector, sceneWrapper.camera);
		var raycaster = new THREE.Raycaster (sceneWrapper.camera.position, vector.sub(sceneWrapper.camera.position).normalize());
		
		var inBounds = sceneWrapper.tubeMeshBuilder.addLoop(raycaster);
		if (inBounds === true)
		{
			sceneWrapper.torusDefined = true;
			sceneWrapper.tubeMeshBuilder.faceIndexIncrementor = 0;
			sceneWrapper.tubeMeshBuilder.torusRotation = 0;
			sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
			$('#idLoopRotContainer').fadeIn(0);
			tutorial.tut6();
		}
	};
