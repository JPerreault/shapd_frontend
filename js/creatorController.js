var n = 0;
var count = 0;
var loops = false;
var sceneWrapper, view;

window.onload = function() {

	var tubeMeshBuilder, gui, scene, tubeMP, matListener, state, thickness;
	var renderer, materialsLibrary, customContainer, datGuiContainer;
	var projector, mouse = { x: 0, y: 0 }, intersected;
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
            location.href = 'snag.html';
		view = new InputView(sceneWrapper, renderer, tubeMP);
		
		renderer.setSize( view.currentWindowX, view.currentWindowY );
		renderer.setFaceCulling( THREE.CullFaceNone );
		renderer.autoClear = false;

		view.addMeshElement(renderer.domElement)
		sceneWrapper.init();
		scene = sceneWrapper;
		
		matListener = new materialListener(sceneWrapper, tubeMeshBuilder);
		state = 'creator';
		setupInterface();
		setupDatGui(sceneWrapper);	
	}
    
    function killSelf()
    {
        parent.hideTheBeast();
        idSavedShapeLibrary.innerHTML = shapeLib;
        setTimeout("location.href=\"blank.html\";", 500);
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

            count++;
        }
        
		
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
			$("#thicknessContainer").fadeOut(0);				
			$("#materials").fadeOut(0);
			$("#idLoopText").fadeOut(0);
			$("#idmaterialDetailContainer").fadeOut(0);
			$('#idMaterialPanel').fadeOut(0);
			$('#idDimensions').fadeOut(0);
			$('#materialDetailContainer').fadeOut(0);
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
			document.getElementById('idProgressImg').src = 'assets/imgs/progress/progressSection1.png';
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
			$('#materialDetailContainer').fadeOut(450);
			$("#idSavedShapeContainer").fadeIn(450);
			$('#idMaterialPanel').fadeOut(450);
			$('#idDimensions').fadeOut(450);
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
			$("#idmaterialDetailContainer").fadeOut(450);
			$("#sliderContainer").fadeOut(450);
			$("#thicknessContainer").fadeOut(450);
			$("#idShapeContainer").fadeOut(450);
			$('#materialDetailContainer').fadeOut(450);
			$('#idBackButton').fadeIn(450);
			$('#idSaveButton').fadeIn(450);
			$('#idResetContainer').fadeIn(450);
			$("#idLoopText").fadeIn(450);
			$("#idSavedShapeContainer").fadeOut(450);
			$('#idMaterialPanel').fadeOut(450);
			$('#idDimensions').fadeOut(450);
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
			$("#idmaterialDetailContainer").fadeIn(450);
			$("#sliderContainer").fadeIn(450);
			$("#thicknessContainer").fadeOut(450);
			$("#idShapeContainer").fadeOut(450);
			$('#idBackButton').fadeIn(450);
			$('#idSaveButton').fadeIn(450);
			$('#materialDetailContainer').fadeIn(450);
			$('#idResetContainer').fadeIn(450);
			$("#idLoopText").fadeOut(450);
			$("#idSavedShapeContainer").fadeOut(450);
			$('#idMaterialPanel').fadeIn(450);
			$('#idDimensions').fadeIn(450);
			loops = false;
			tubeMeshBuilder.calculateDimensions('xyz');
			matListener.panelUpdate();
			getNewPrice();
			$( "#thickslider" ).slider( "value", sceneWrapper.currentMesh['Thickness'] );
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
			$("#idmaterialDetailContainer").fadeOut(450);
			$("#sliderContainer").fadeOut(450);
			$("#thicknessContainer").fadeOut(450);
			$("#idShapeContainer").fadeOut(450);
			$('#idBackButton').fadeIn(450);
			$('#idSaveButton').fadeIn(450);
			$('#materialDetailContainer').fadeOut(450);
			$('#idResetContainer').fadeOut(450);
			$("#idLoopText").fadeOut(450);
			$("#idSavedShapeContainer").fadeOut(450);
			$('#idMaterialPanel').fadeOut(450);
			$('#idDimensions').fadeOut(450);
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
		addDatGui();
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
	
	document.getElementById('idSaveStayButton').onclick = function()
	{
		if (typeof newuser !== 'undefined' && newuser)
				createNewUser();
			else
				saveShape();
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
			currentMesh['Scale'] = 1;
			currentMesh['Modify'] = 5;
			currentMesh['Depth'] = 1;
			currentMesh['Stretch'] = 1;
			currentMesh['Loops'] = 2;
			currentMesh['Thickness'] = 1.75;
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
			currentMesh.figure.scale.x = 1;
			currentMesh.figure.scale.y = 1;
			currentMesh.figure.scale.z = 1;
			$( "#slider" ).slider( "value", 100 );
			$( "#scale" ).val( $( "#slider" ).slider( "value" ) );
			$( "#thickslider" ).slider( "value", 1.75 );
			tubeMeshBuilder.calculateDimensions('xyz');
		
			sceneWrapper.redrawMesh(currentMesh);
			getNewPrice();
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
		getJson(sceneWrapper.currentMesh);
		console.log(sceneWrapper.torusMesh);
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
		updateThickness();
	}
	
	function releaseThickSlider()
	{
		event.preventDefault();
		
		var sliderValue = $( "#thickslider" ).slider( "value" );
		console.log(sliderValue);
		sceneWrapper.currentMesh['Thickness'] = sliderValue;
		document.removeEventListener( 'mouseup', releaseThickSlider, false );
		document.removeEventListener( 'mousemove', moveThickSlider, false );
		
		scene.redrawMesh(scene.currentMesh);
		tubeMeshBuilder.calculateDimensions('xyz');
		getNewPrice();
		updateThickness(true);
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
		
		scene.redrawMesh(scene.currentMesh);
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
		
		scene.redrawMesh(scene.currentMesh);
		tubeMeshBuilder.calculateDimensions('xyz');
		getNewPrice();
		updateThickness();
	}
	
	function updateThickness(isRelease)
	{
		thickness = sceneWrapper.currentMesh.figure.scale.x * sceneWrapper.currentMesh['Thickness'] * 25.4;
		//console.log(thickness);
		
		if (thickness < 9)
		{
			$("#thicknessContainer").fadeIn(0);
		}
		else
		{
			if (!isRelease)
			{
				$("#thicknessContainer").fadeOut(0);
				//console.log(isRelease);
			}
		}
	}
	
	function getNewPrice()
	{
		var jsonString = getJson(sceneWrapper.currentMesh);
		if (typeof authToken !== 'undefined')
			$.post("/pricing/", {authenticity_token: authToken, id: shapeID, json: jsonString}, function(data){updatePrice(data)});
	}
	
	function updatePrice(data)
	{	
		data = data + (data * .3);
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
	
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	function onDocumentMouseMove(event)
	{
		if (loops)
		{
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		}
	};
}

function loadFromLib(hash)
{
//    if (typeof savedShape != 'undefined')
    window.savedShape = hash;
    var loadedShape = new TubeMeshParams();
    window.sceneWrapper.redrawMesh(loadedShape, true);
    window.sceneWrapper.currentMesh = loadedShape;
    window.sceneWrapper.tubeMeshParams = loadedShape;
	window.view.targetX = loadedShape['Rotation X'];
	window.view.targetY = loadedShape['Rotation Y'];
	setupDatGui(window.sceneWrapper);
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
	
	controller = gui.add(currentMesh, 'Thickness', .5, 10);
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
