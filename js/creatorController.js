var n = 0;
var changedModify = 0;
var count = 0;
var loops = false;
var sceneWrapper, view, tutorial, state, printable;

window.onload = function() {

	var tubeMeshBuilder, scene, tubeMP, matListener;
	var renderer, materialsLibrary
	var projector, mouse = { x: 0, y: 0 }, intersected, fout;
	var firstTime = true;
	var loops = false;
	var moreOptionsClicked = 0;
	var storedShape = [];
    if (typeof notSignedIn === 'undefined')
        var doTutorial = true;
    else
        var doTutorial = true;
	
	init();
	animate();

	function init() {

		materialsLibrary = new MaterialsLibrary();
		tubeMeshBuilder = new TubeMeshBuilder(materialsLibrary);
		
		if (typeof savedShape === 'undefined')
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
//            
//                renderer = new THREE.WebGLRenderer({antialias: true});

		}
		else
            location.href = 'snag.html';
		view = new InputView(sceneWrapper, renderer, tubeMP);
		
		renderer.setSize( view.currentWindowX, view.currentWindowY );
		renderer.setFaceCulling( THREE.CullFaceNone );
		renderer.autoClear = false;
		state = 'creator';

		view.addMeshElement(renderer.domElement)
		sceneWrapper.init();
		scene = sceneWrapper;
		
		tutorial = new Tutorial(view, doTutorial, state);
		
		matListener = new materialListener(sceneWrapper, tubeMeshBuilder, tutorial);
		setupInterface();
		if (typeof screenShot === 'undefined')
			document.getElementById(sceneWrapper.currentMesh['Material']).click();	//For initializing material	
	}

    function killSelf()
    {
        parent.hideTheBeast(parent.state);
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
			$('#idLoopRotContainer').fadeOut(0);
			$('#idDesignDiv').fadeOut(0);
			$('#thickdepthfinalize').fadeOut(0);
			$('#idSliderFinalLabel1').fadeOut(0);
			$("#shapeSlidersContainer").fadeIn(450);
			
			if (typeof viewer !== 'undefined' && viewer)
			{
				$("#idShapeContainer").fadeOut(0);
				$('#idResetContainer').fadeOut(0);
				$("#idSavedShapeContainer").fadeOut(0);
				$('#idSaveButton').fadeOut(0);
				$('#idDesignDiv').fadeOut(0);
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
			$("#materials").fadeOut(450);
			$("#idmaterialDetailContainer").fadeOut(450);
			$("#sliderContainer").fadeOut(450);
			$("#thicknessContainer").fadeOut(450);
			$("#idShapeContainer").fadeIn(450);
			$('#idBackButton').fadeOut(450);
			$('#idSaveButton').fadeIn(450);
			$('#idResetContainer').fadeIn(450);
			$("#shapeSlidersContainer").fadeIn(450);
			$("#idLoopText").fadeOut(450);
			$('#idCostDataContainer').fadeOut(450);
			$('#materialDetailContainer').fadeOut(450);
			$('#idDesignDiv').fadeOut(450);
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
			$("#materials").fadeOut(450);
			$("#idmaterialDetailContainer").fadeOut(450);
			$("#sliderContainer").fadeOut(450);
			$("#thicknessContainer").fadeOut(450);
			$("#idShapeContainer").fadeOut(450);
			$('#idBackButton').fadeIn(450);
			$('#idSaveButton').fadeIn(450);
			$('#idResetContainer').fadeIn(450);
			$("#shapeSlidersContainer").fadeOut(450);
			$('#idDesignDiv').fadeOut(450);
			$("#idLoopText").fadeIn(450);
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
			document.getElementById('idlockLoop').innerHTML = 'Lock<br>Loop'
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
			$("#materials").fadeIn(450);
			$("#idmaterialDetailContainer").fadeIn(450);
			$("#sliderContainer").fadeIn(450);
			$("#thicknessContainer").fadeOut(450);
			$("#idShapeContainer").fadeOut(450);
			$('#idBackButton').fadeIn(450);
			$('#idSaveButton').fadeIn(450);
			$("#shapeSlidersContainer").fadeOut(450);
			$('#materialDetailContainer').fadeIn(450);
			$('#idDesignDiv').fadeIn(450);
			$('#idResetContainer').fadeIn(450);
			$("#idLoopText").fadeOut(450);
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
			$( "#depthslider" ).slider( "value", sceneWrapper.currentMesh['Depth'] );
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
			$("#materials").fadeOut(450);
			$("#idmaterialDetailContainer").fadeOut(450);
			$("#sliderContainer").fadeOut(450);
			$("#thicknessContainer").fadeOut(450);
			$("#idShapeContainer").fadeOut(450);
			$('#idBackButton').fadeOut(450);
			$('#idSaveButton').fadeOut(450);
			$("#shapeSlidersContainer").fadeOut(450);
			$('#idSaveStayButton').fadeOut(450);
			$('#materialDetailContainer').fadeOut(450);
			$('#idDesignDiv').fadeOut(450);
			$('#idResetContainer').fadeOut(450);
			$("#idLoopText").fadeOut(450);
			$('#idCostDataContainer').fadeOut(450);
			$("#idSavedShapeContainer").fadeOut(450);
			$('#idMaterialPanel').fadeOut(450);
			$('#idLoopRotContainer').fadeOut(450);
		}
	}
	
	function initialSetup()
	{	
		addCreatorSliders();
		addFinalizeSliders();
		addSliders(tutorial, sceneWrapper);
		addStartingShapes();
		addResetButtons();
		addSave();
		addProgressBar();
		addSavedLibrary();
		addLoops();
		addDesignTips();
		loopRotations();
		addCost();
		addMaterialSelector();
	}
	
	var customContainer = document.getElementById('container');	
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
	
	document.getElementById('idSaveButton').onmousedown = function()
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
			resetShapeRotation();
			setupInterface();
			saveShape();
		}
		else if (state == 'loops')
		{
			state = 'finalize';
			resetShapeRotation();
			loops = false;
			setupInterface();
			saveShape();
			
		}
		else if (state == 'finalize')
		{
			if (printable)
			{
                if (typeof givenFeedback !== 'undefined' && !givenFeedback)
                    promptForFeedback()
				state = 'publish';
				resetShapeRotation();
				setupInterface();
				saveShape();
				
			}
		}
	}	
	
	document.getElementById('idSaveStayButton').onmousedown = function()
	{
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
		if (typeof newuser !== 'undefined' && newuser)
				createNewUser();
			else
				saveShape();
	}

	document.getElementById('idBackButton').onmousedown = function()
	{
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
		if (state == 'loops')
		{
			state = 'creator';
			setupInterface();
			resetShapeRotation();
		}
		else if (state == 'finalize')
		{
			state = 'loops';
			setupInterface();
			resetShapeRotation();
		}
		else if (state == 'publish')
		{
			state = 'finalize';
			setupInterface();
			resetShapeRotation();
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
	
	document.getElementById('idResetRotationImg').onmousedown = function()
	{
		view.targetX = 0;
		view.targetY = 0;
	}
    
	document.getElementById('idRemoveLoop').onmousedown = function()
	{
		scene.scene.remove(scene.torusMesh);
		scene.torusDefined = false;
		sceneWrapper.currentMesh['Face Index'] = -1;
		sceneWrapper.tubeMeshBuilder.fIndex = -1;
		$('#idLoopRotContainer').fadeOut(0);
		tubeMeshBuilder.torusRotation = 0;
		tubeMeshBuilder.torusRotationNinety = 0;
		
		if (document.getElementById('idlockLoop').innerHTML === 'Unlock<br>Loop')
		{
			document.addEventListener( 'mousedown', onDocumentMouseDown, false );
			document.getElementById('idlockLoop').innerHTML = 'Lock<br>Loop';
		}
	}
	
    document.getElementById('idResetShapdImg').onmousedown = function()
	{
		var currentMesh = sceneWrapper.currentMesh;
		if (state == 'creator')
		{
			resetAllParams();
		
			sceneWrapper.redrawMesh(currentMesh);
			updateShapeSliders();
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
		currentMesh['Thickness'] = 1.5;
		if (view.targetX === 0 && view.targetY === 0)
		{
			// currentMesh['Rotation X'] = 6.28318531;
			currentMesh['Rotation Y'] = 6.28318531/2;
			// view.targetX = 6.28318531;
			view.targetY = 6.28318531/2;
		}
		else
		{
			currentMesh['Rotation X'] = 0;
			currentMesh['Rotation Y'] = 0;
			view.targetX = 0;
			view.targetY = 0;
		}
		
		updateShapeSliders();
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
			updateShapeSliders();
			sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
			
			if (tutorial.tutorialOn)
				tutorial.tut3();
		}
	}
	
	document.getElementById('idLoopAroundRightButton').onmousedown = function()
	{						
		tubeMeshBuilder.faceIndexIncrementor += 1;
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
	}
	
	document.getElementById('idLoopAroundLeftButton').onmousedown = function()
	{
		tubeMeshBuilder.faceIndexIncrementor -= 1;
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
	}
	
	document.getElementById('idLoopMoreAngleButton').onmousedown = function()
	{
		if (tubeMeshBuilder.torusRotation < 0.7853981634)
			tubeMeshBuilder.torusRotation += 0.0872664626;
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
	}
	
	document.getElementById('idLoopLessAngleButton').onmousedown = function()
	{
		if (tubeMeshBuilder.torusRotation > -0.7853981634)
			tubeMeshBuilder.torusRotation -= 0.0872664626;
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
	}
	
	document.getElementById('idSpinButton').onmousedown = function()
	{
		if (tubeMeshBuilder.torusRotationNinety === 0)
			tubeMeshBuilder.torusRotationNinety = 1.57079633;
		else
			tubeMeshBuilder.torusRotationNinety = 0;
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
	}
	
	document.getElementById('idStoreShape').onmousedown = function()
	{
		storedShape['Thickness'] = sceneWrapper.currentMesh['Thickness'];
		storedShape['Depth'] = sceneWrapper.currentMesh['Depth'];
		storedShape['Stretch'] = sceneWrapper.currentMesh['Stretch'];
		storedShape['Modify'] = sceneWrapper.currentMesh['Modify'];
		storedShape['Loops'] = sceneWrapper.currentMesh['Loops'];
		storedShape['Starting Shape'] = sceneWrapper.currentMesh['Starting Shape'];
	}
	
	document.getElementById('idLoadShape').onmousedown = function()
	{
		sceneWrapper.currentMesh['Thickness'] = storedShape['Thickness'];
		sceneWrapper.currentMesh['Depth'] = storedShape['Depth'];
		sceneWrapper.currentMesh['Stretch'] = storedShape['Stretch'];
		sceneWrapper.currentMesh['Modify'] = storedShape['Modify'];
		sceneWrapper.currentMesh['Loops'] = storedShape['Loops'];
		sceneWrapper.currentMesh['Starting Shape'] = storedShape['Starting Shape'];
		
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
		updateShapeSliders();
	}
	
	document.getElementById('idMoreOptions').onmousedown = function()
	{
		moreOptionsClicked++;
		var moreOptionsButton = document.getElementById('idMoreOptions');
		if (moreOptionsClicked%2 === 1)
		{
			$('#thickdepthfinalize').fadeIn(500);
			$('#idSliderFinalLabel1').fadeIn(500);
			$('#sliderContainer').css('marginLeft', '-200px');
			moreOptionsButton.innerHTML = 'Less';
		}
		else
		{
			$('#thickdepthfinalize').fadeOut(500);
			$('#idSliderFinalLabel1').fadeOut(500);
			$('#sliderContainer').css('marginLeft', '-155px');
			moreOptionsButton.innerHTML = 'More';
		}
	}
	
	document.getElementById('idlockLoop').onmousedown = function()
	{
		var loopButton = document.getElementById('idlockLoop');
		if (loopButton.innerHTML === 'Lock<br>Loop')
		{
			document.removeEventListener( 'mousedown', onDocumentMouseDown, false );
			loopButton.innerHTML = 'Unlock<br>Loop'
		}
		else
		{
			document.addEventListener( 'mousedown', onDocumentMouseDown, false );
			loopButton.innerHTML = 'Lock<br>Loop'
		}
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
	updateShapeSliders();
}

function resetShapeRotation() {
	view.targetX = 0;
	view.targetY = 0;	
}

function updateShapeSliders()
{
	$( "#thicknessguislider" ).slider( "value", sceneWrapper.currentMesh['Thickness'] );
	$( "#depthguislider" ).slider( "value", sceneWrapper.currentMesh['Depth'] );
	$( "#stretchguislider" ).slider( "value", sceneWrapper.currentMesh['Stretch'] );
	$( "#modifyguislider" ).slider( "value", sceneWrapper.currentMesh['Modify'] );
	$( "#loopsguislider" ).slider( "value", sceneWrapper.currentMesh['Loops'] );
	
	$( "#thickslider" ).slider( "value", sceneWrapper.currentMesh['Thickness'] );
	$( "#depthslider" ).slider( "value", sceneWrapper.currentMesh['Depth'] );
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
		document.getElementById('shapethin').innerHTML = "<b>Your shape is too thin to print!<br><br>Please increase the thickness, increase the scale, or alter your shape.</b>";
		document.getElementById('shapethin').style.background = '#d7432f';
		saveButtonClick(false);
	}
	else if (isOkay === 'large')
	{
		$("#thicknessContainer").fadeIn(0);
		document.getElementById('shapethin').innerHTML = "<b>Your shape is too large to print!<br><br>Please decrease the thickness, decrease the scale, or alter your shape.</b>";
		document.getElementById('shapethin').style.background = '#d7432f';
		document.getElementById('idSaveButton').style.opacity = .5;
		saveButtonClick(false);
	}
	else
	{
		if (isMove)
		{
			document.getElementById('shapethin').innerHTML = "<b>You\'re all set!<br><br>Your shape is now an acceptable size.</b>";
			document.getElementById('shapethin').style.background = '#2fd792';

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
	
	(v < 20000) ? p = (4.5069 * Math.log(v) + 30.805) * 1.28 * 1.2089 : p = (0.0012 * v + 62.55) * 1.31 * 1.2089;
	
	return p;
}

function submitFeedback()
{
    var i0 = document.getElementsByName('idOfsr0')[0].value;
    var i1 = document.getElementsByName('idOfsr1')[0].value;
    var i2 = document.getElementsByName('idOfsr2')[0].value;
    var i3 = document.getElementsByName('idOfsr3')[0].value;
    
    var rating = i0+"|"+i1+"|"+i2+"|"+i3;
    var content = document.getElementById('contentFeedback').value;
    
    $.post('/feedback', {rating: rating, content: content}, function(data){publishCreation();});
}

function getFeedback()
{
    if (typeof noFeedback !== 'undefined')
    {
        var feedbackBox = "<br><h1>How'd we do?</h1>A second of your time to let us know how your<br>experience was would be wonderful.<br><br>Lay it on us. We can take it.<br><br><br><br>Fun<div id='sr0'></div><br>Ease of Use<br><div id='sr1'></div><br>Creativity<br><div id='sr2'></div><br>Overall Experience<br><div id='sr3'></div><br>";
        
        for (var i=0; i<4; i++)
            feedbackBox += "<div id='sr0'></div>";
        
        feedbackBox += "<input type='text' id ='contentFeedback'></input>";
        
        
        var content = "hi";

        
        feedbackBox += "<button onclick='submitFeedback()'>Submit Feedback</button><a href='javascript:slideUp(fout);publishCreation();'>Not right now</a>"
        
        var d1 = generateDropDown(575,400, feedbackBox);
        
        for (var i=0; i<4; i++)
        $('#sr'+i).raty({
                        cancel   : false,
                        half     : true,
                        size     : 24,
                        starHalf : 'assets/imgs/stars/star-half-big.png',
                        starOff  : 'assets/imgs/stars/star-off-big.png',
                        starOn   : 'assets/imgs/stars/star-on-big.png',
                        scoreName : 'idOfsr'+i
                        });
        
        fout = d1;
        slideDown(d1);
        document.getElementById("blackout").onclick = null;
    }
    else
        publishCreation();
}

function publishCreation()
{
    
    document.removeEventListener( 'mousedown', onDocumentMouseDown, false );
    
    
   // oneQuickThing();
    
    
    var timestamp = new Date().getTime();
    
    var publishCSS = "<br><span style='font-size: 3em; font-weight: bold; color:#2fa1d7;'>Congratulations!</span><br><span style='font-size: 1.5em; font-weight: bold; color:#000; opacity: 0.8;'>You've made a pendant!</span><br><span class='verdana' style='color:#000; opacity: 0.8;'>(and it's awesome)</span><br><br><div class='publishImg'><div style='height:155px;width:155px;margin-left:auto;margin-right:auto'><img src='/shapes/"+shapeID+".png' id='shapepreview' style='width:250px; height:250px; margin-top:-55px; margin-left:-55px'></img></div><div style='font-size:18px'>Now, you can either:</div></div><div id='publishActionContainer' width='100%'><button class='publishButtonCSS buttonImg verdana' onclick='makePublish()'>Publish</button><button class='publishButtonCSS buttonImg' onclick='makeProduct()'>Order</button></div><div style='text-align:center;'><div class='publishDesc buttonImg'>Share your design by publishing it. It will appear in the group gallery so that others can see what you've made. Other people could give you kudos, use it themselves, or make a copy and alter it themselves.</div><div class='publishDesc buttonImg'>Buy it! You can order it and we will have it made for you and ship it to your house! The next time someone says \'Wow, what a nice necklace! Where did you get it?' you will have a heck of a story :). </div></div></div></div>";
    var d1 = generateWhiteDropDown(700, 700, publishCSS );
    
    // ugly code
    setTimeout('document.getElementById("shapepreview").src ="/shapes/'+shapeID+'.png?'+timestamp+'";', 500);
    setTimeout('document.getElementById("shapepreview").src ="/shapes/'+shapeID+'.png?'+(timestamp+12)+'";', 1000);

    fout = d1;
    fadeIn(d1);
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
