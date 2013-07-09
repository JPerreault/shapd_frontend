var n = 0;
var count = 0;
var loops = false;
var sceneWrapper, view, gui;

window.onload = function() {

	var tubeMeshBuilder, scene, tubeMP, matListener, state;
	var renderer, materialsLibrary, customContainer, datGuiContainer;
	var projector, mouse = { x: 0, y: 0 }, intersected;
	var firstTime = true;
	var loops = false;
	var fout;

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
			$('#idCostDataContainer').fadeOut(0);
			$('#materialDetailContainer').fadeOut(0);
			$('#loopControls').fadeOut(0);
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
			$('#idDimsContainer').fadeOut(450);
			$('#idCostDataContainer').fadeOut(450);
			$('#materialDetailContainer').fadeOut(450);
			$("#idSavedShapeContainer").fadeIn(450);
			$('#idMaterialPanel').fadeOut(450);
			$('#loopControls').fadeOut(450);
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
			$('#idDimsContainer').fadeOut(450);
			$('#idCostDataContainer').fadeOut(450);
			$("#idSavedShapeContainer").fadeOut(450);
			$('#idMaterialPanel').fadeOut(450);
			if (sceneWrapper.torusDefined == true)
				$('#loopControls').fadeIn(450);
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
			$('#idDimsContainer').fadeIn(450);
			$('#idCostDataContainer').fadeIn(450);
			$("#idSavedShapeContainer").fadeOut(450);
			$('#idMaterialPanel').fadeIn(450);
			$('#loopControls').fadeOut(450);
			loops = false;
			tubeMeshBuilder.calculateDimensions('xyz', sceneWrapper.torusDefined);
			matListener.panelUpdate();
			getNewPrice();
			$( "#thickslider" ).slider( "value", sceneWrapper.currentMesh['Thickness'] );
			updateThickness();
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
			$('#idSaveButton').fadeOut(450);
			$('#materialDetailContainer').fadeOut(450);
			$('#idResetContainer').fadeOut(450);
			$("#idLoopText").fadeOut(450);
			$('#idDimsContainer').fadeOut(450);
			$('#idCostDataContainer').fadeOut(450);
			$("#idSavedShapeContainer").fadeOut(450);
			$('#idMaterialPanel').fadeOut(450);
			$('#loopControls').fadeOut(450);
			loops = false;
			
			var publishCSS = "<br><br><span style='font-size: 3em; font-weight: bold;'>Congratulations!</span><br><br><span style='font-size: 1.5em; font-weight: bold;'>You've made a pendant!</span><br>(and it's awesome)<br><br><img src='assets/imgs/materialExamples/titaniumPolished_2.jpg' width='170px' height='170' style='border: 1px'></img><br><br><span style='font-size: 1.1em; font-weight: bold;'>Now, you can either:</span><br><br><br><div id='publishActionContainer' width='100%'><div style='display:inline'><form action='http://www.shapd.co'><button style='cursor:pointer;' type='submit'>Publish</button></form></div><div style='display:inline'><form action='http://www.shapd.co'><button style='cursor:pointer;' type='submit'>Order</button></form></div>";
			var d1 = generateDropDown(800, 600, publishCSS );
			fout = d1;
			fadeIn(d1); // I prefer slideDown though
            //document.getElementById("blackout").onclick = null;
			
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
		addDimensions()
		addDatGui();
		addCost()
		addLoopControls();
	}
	
	customContainer = document.getElementById('container');	
	customContainer.style.zIndex = '100';
	customContainer.style.position = 'relative';

	var saveSTL = document.createElement('div');
	saveSTL.style.position = 'absolute';
	saveSTL.style.bottom = '0px';
	saveSTL.style.left = '15%';
	saveSTL.style.zIndex = '1000';
	saveSTL.style.background = '#999';
	saveSTL.innerHTML += '<input id="save" type="button" value="Save Shape"/>';
	customContainer.appendChild(saveSTL);

	document.getElementById('save').onclick = function()
	{
		tubeMeshBuilder.saveSTL(sceneWrapper.torusDefined);
	}
	
	document.getElementById('blackout').onclick = function()
	{
		fadeOut(fout);
	}
	
	
	document.getElementById('idM1').onclick = function()
	{
		var imgSource = document.getElementById('idM1').src;
		var imgDesc = matListener.getImgDesc1();
		var d1 = generateLightbox(imgSource, imgDesc);
		fout = d1;
		fadeIn(d1);
	}
	
	document.getElementById('idM2').onclick = function()
	{
		var imgSource = document.getElementById('idM2').src;
		var imgDesc = matListener.getImgDesc2();
		var d1 = generateLightbox(imgSource, imgDesc);
		fout = d1;
		fadeIn(d1);
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
			resetAllParams(0);
		
			sceneWrapper.redrawMesh(currentMesh);
			setupDatGui(sceneWrapper);
		}
		else if (state == 'loops')
		{
			scene.scene.remove(scene.torusMesh);
			scene.torusDefined = false;
			sceneWrapper.currentMesh['Face Index'] = -1;
			sceneWrapper.tubeMeshBuilder.fIndex = -1;
			$('#loopControls').fadeOut(0);
			tubeMeshBuilder.torusRotation = 0;
			tubeMeshBuilder.torusRotation = 0;
			tubeMeshBuilder.torusRotationNinety = 0;
		}
		else if (state == 'finalize')
		{
			currentMesh.figure.scale.x = 1;
			currentMesh.figure.scale.y = 1;
			currentMesh.figure.scale.z = 1;
			$( "#slider" ).slider( "value", 100 );
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
			tubeMeshBuilder.torusRotation = 0;
			tubeMeshBuilder.torusRotationNinety = 0;
			sceneWrapper.torusDefined = false;
			
			sceneWrapper.currentMesh['Thickness'] = 1.75;
			sceneWrapper.currentMesh['Depth'] = 1;
			sceneWrapper.currentMesh['Stretch'] = 1;
			sceneWrapper.currentMesh['Modify'] = 5;
			sceneWrapper.currentMesh['Loops'] = 2;

			if (typeof sceneWrapper.torusMesh !== 'undefined')
				sceneWrapper.scene.remove(sceneWrapper.torusMesh);
			setupDatGui(window.sceneWrapper);
			sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
		}
	}
	
	document.getElementById('rotateAroundF').onclick = function()
	{
		tubeMeshBuilder.faceIndexIncrementor += 1;
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
	}
	
	document.getElementById('rotateAroundB').onclick = function()
	{
		tubeMeshBuilder.faceIndexIncrementor -= 1;
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
	}
	
	document.getElementById('rotatePlaceF').onclick = function()
	{
		if (tubeMeshBuilder.torusRotation < 0.7853981634)
			tubeMeshBuilder.torusRotation += 0.0872664626;
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
	}
	
	document.getElementById('rotatePlaceB').onclick = function()
	{
		if (tubeMeshBuilder.torusRotation > -0.7853981634)
			tubeMeshBuilder.torusRotation -= 0.0872664626;
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
	}
	
	document.getElementById('rotate90').onclick = function()
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
		
		scene.redrawMesh(scene.currentMesh);
		tubeMeshBuilder.calculateDimensions('xyz', sceneWrapper.torusDefined);
		getNewPrice();
		updateThickness();
	}
	
	function updateThickness(isMove)
	{
		var isOkay = tubeMeshBuilder.checkDimensions();

		if (isOkay === 'small'|| isOkay === 'thin')
		{
			$("#thicknessContainer").fadeIn(0);
			document.getElementById('shapethin').innerHTML = "Your shape is too thin to print!";
			document.getElementById('increasesize').innerHTML = 'Please increase thickness, increase the scale, or alter your shape.';
		}
		else if (isOkay === 'large')
		{
			$("#thicknessContainer").fadeIn(0);
			document.getElementById('shapethin').innerHTML = "Your shape is too large to print!";
			document.getElementById('increasesize').innerHTML = 'Please decrease thickness, decrease the scale, or alter your shape.';
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
		var jsonString = getJson(sceneWrapper.currentMesh);
		if (typeof authToken !== 'undefined')
		{
			if (jsonString.indexOf('currency') === -1)
				$.post("/pricing2/", {authenticity_token: authToken, id: shapeID, json: jsonString}, function(data){updatePrice(data)});
			else
				$.post("/pricing/", {authenticity_token: authToken, id: shapeID, json: jsonString}, function(data){updatePrice(data)});
		}
	}
	
	function updatePrice(data)
	{	
		
		document.getElementById('idCostData').innerHTML = '$' + data;		
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
				tubeMeshBuilder.faceIndexIncrementor = 0;
				scene.redrawMesh(scene.currentMesh);
				$('#loopControls').fadeIn(0);
			}
		}
	};
    
    $(function () {
      $('.antiscroll-wrap').antiscroll();
      });
	/*
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	function onDocumentMouseMove(event)
	{
		if (loops)
		{
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			//updateSelected(mouse);
		}
	};
	
	function updateSelected(mouse)
	{
		if ( sceneWrapper.torusDefined )
		{
			var projector = new THREE.Projector();
			var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
			//sceneWrapper.torusMesh.name = 'torusMeshName';
			projector.unprojectVector( vector, sceneWrapper.camera );
			var ray = new THREE.Raycaster( sceneWrapper.camera.position, vector.sub( sceneWrapper.camera.position ).normalize() );
			// create an array containing all objects in the scene with which the ray intersects
			var intersects = ray.intersectObjects( sceneWrapper.scene.children );


		// INTERSECTED = the object in the scene currently closest to the camera 
		//		and intersected by the Ray projected from the mouse position 	
	
			// if there is one (or more) intersections
			if ( intersects.length > 0 )
			{
				console.log(intersects);
			// if the closest object intersected is not the currently stored intersection object
				if ( intersects[ 0 ].object != intersected ) 
				{  			//console.log(intersects[ 0 ]);
			    // restore previous intersection object (if it exists) to its original color
					if ( intersected ) 
						intersected.material.color.setHex( intersected.currentHex );
				// store reference to closest object as current intersection object
					intersected = intersects[ 0 ].object;
					//console.log(intersected);
				// store color of closest object (for later restoration)
					intersected.currentHex = intersected.material.color.getHex();
				// set a new color for closest object
					intersected.material.color.setHex( 0xffff00 );
				}
			} 
			else // there are no intersections
			{
			// restore previous intersection object (if it exists) to its original color
				if ( intersected ) 
					intersected.material.color.setHex( intersected.currentHex );
			// remove previous intersection object reference
			//     by setting current intersection object to "nothing"
				intersected = null;
			}
		
		}
	}

		}
	};
*/
}

function loadFromLib(hash)
{
    window.savedShape = hash;
    var loadedShape = new TubeMeshParams();
	window.view.targetX = loadedShape['Rotation X'];
	window.view.targetY = loadedShape['Rotation Y'];
	
	window.sceneWrapper.tubeMeshBuilder.faceIndexIncrementor = loadedShape['Face Index Incrementor'];
	window.sceneWrapper.tubeMeshBuilder.torusRotation = loadedShape['Torus Rotation'];
	window.sceneWrapper.tubeMeshBuilder.torusRotationNinety = loadedShape['Torus 90 Rotations'];
	
	if (typeof window.sceneWrapper.torusMesh !== 'undefined')
		window.sceneWrapper.scene.remove(sceneWrapper.torusMesh);
	if (loadedShape['Face Index'] != -1)
	{
		window.sceneWrapper.torusDefined = true;
		window.sceneWrapper.tubeMeshBuilder.fIndex = loadedShape['Face Index'];
		window.sceneWrapper.torusMesh = window.sceneWrapper.tubeMeshBuilder.createTorus();
	}
	
    window.sceneWrapper.redrawMesh(loadedShape, true);
    window.sceneWrapper.currentMesh = loadedShape;
    window.sceneWrapper.tubeMeshParams = loadedShape;
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

	controller = gui.add(currentMesh, 'Depth', 0.0005, 3.5);
	setUpController(controller, 'Depth');

	controller = gui.add(currentMesh, 'Stretch', 0.00005, 1.75);
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
