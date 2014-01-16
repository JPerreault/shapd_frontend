var changedModify = 0;
var count = 0;
var sceneWrapper, view, tutorial, state, printable, currentMesh, loop;

var segments = 600, radiusSegments = 8;

if (location.hash.indexOf("meta") > 0)
{
    var screenShot = true;
}

if (location.hash.indexOf("id=") > 0)
{
    var a = location.hash.indexOf("id=");
    var b = location.hash.indexOf("&");
    if (b == -1)
        b = location.hash.length;
    
    shapeID = parseInt(location.hash.substring(a+3, b));
    shapeLib = JSON.parse(localStorage['shapes']).array;
    trueHash = shapeLib[shapeID].hash;
}

if (location.hash.indexOf("shape=") > 0)
{
    var a = location.hash.indexOf("shape=");
    var b = location.hash.indexOf("&");
    if (b == -1)
        b = location.hash.length;
    
    trueHash = decodeURI(location.hash.substring(a+6, b));
    location.hash = "";
}

if (typeof printingUser !== 'undefined')
{
	document.getElementById('t').className = 'buttonVerySmall';
	document.getElementById('t').setAttribute( "onClick", "javascript: dothing();" );
}

window.onload = function() {
	var renderer, materialsLibrary;
	var tubeMeshBuilder, matListener, progState;
	var projector, fout, saveLoad, figure;
    var doTutorial = true;
	
	init();
	animate();

	function init() {
		var guiInit = new GuiInit();

		materialsLibrary = new MaterialsLibrary();
		tubeMeshBuilder = new TubeMeshBuilder(materialsLibrary);

		currentMesh = new TubeMeshParams().create();
		loop = new Loop(materialsLibrary);

		sceneWrapper = new SceneWrapper(tubeMeshBuilder, materialsLibrary.textureCube, currentMesh);
		
		if (!!window.WebGLRenderingContext  || document.createElement( 'canvas' ).getContext( 'experimental-webgl' ))
        {
            try
            {
			if (typeof screenShot != 'undefined')
				renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
			else
				renderer = new THREE.WebGLRenderer();
            }
            catch(e)
            {
                location.href = 'snag.html';
            }
		}
		else
            alert ('WebGL check failed.');
		view = new InputView(sceneWrapper, renderer, currentMesh);
		
		renderer.setSize( view.currentWindowX, view.currentWindowY );
		renderer.setFaceCulling( THREE.CullFaceNone );
		renderer.autoClear = false;

		view.addMeshElement(renderer.domElement)
		sceneWrapper.init();
		scene = sceneWrapper;
		
		tutorial = new Tutorial(view, doTutorial);
		
		matListener = new materialListener(sceneWrapper, tutorial);
		progState = new ProgressState(tubeMeshBuilder, matListener);
		var saveLoad = new SaveLoad(progState);
		progState.setupInterface();
		
		if (typeof screenShot === 'undefined')
			document.getElementById(currentMesh['Material']).click();	//For initializing material	
		addSliders(tutorial, sceneWrapper);
        
        if (typeof trueHash !== 'undefined')
            loadFromLib(trueHash);
	}
	   
    function killSelf()
    {
        parent.hideTheBeast(parent.state);
        location.href="blank.html";
    }
    
    function screenie()
    {
        var metaData = renderer.domElement.toDataURL("image/png");
        
//        $.post("/meta", {id: shapeID, authenticity_token: authToken, meta: metaData}, function(data){killSelf()});
        shapeLib[shapeID].image = metaData;
        saveLib();
        killSelf();
        
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
	}

	function render() {
		sceneWrapper.rotateMesh(view.targetX, view.targetY);

		renderer.render( sceneWrapper.sceneCube.scene, sceneWrapper.sceneCube.camera );
		renderer.render( sceneWrapper.scene, sceneWrapper.camera );
	}
	
	document.getElementById('blackout').onclick = function()
	{
		fadeOut(fout);
		$(".swoop").fadeOut();
		
		if (tutorial.tutorialOn === true && progState.state === 'loops')
			document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	}	
	
	document.getElementById('idMoreOptions').onmousedown = function()
	{
		moreOptionsPressed();
	}
}

var n = 0;
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
	var isOkay = currentMesh.checkDimensions();
	
	if (isOkay === 'small'|| isOkay === 'thin')
	{
		$("#thicknessContainer").fadeIn(0);
		document.getElementById('shapethin').innerHTML = "<b>Your shape is too thin to print!<br><br>Please increase the thickness, increase the scale, or alter your shape.<br><br>(Click the 'More' button under the slider.)</b>";
		document.getElementById('shapethin').style.background = '#d7432f';
		saveButtonClick(false);
		if (!isMove){
			showMoreOptions(true);
		}
	}
	else if (isOkay === 'large')
	{
		$("#thicknessContainer").fadeIn(0);
		document.getElementById('shapethin').innerHTML = "<b>Your shape is too large to print!<br><br>Please decrease the thickness, decrease the scale, or alter your shape.<br><br>(Click the 'More' button under the slider.)</b>";
		document.getElementById('shapethin').style.background = '#d7432f';
		document.getElementById('idSaveButton').style.opacity = .5;
		saveButtonClick(false);
		if (!isMove){
			showMoreOptions(true);
		}
	}
	else
	{
		if (isMove)
		{
			document.getElementById('shapethin').innerHTML = "<b>You\'re all set!<br><br>Your shape is now an acceptable size.</b>";
			document.getElementById('shapethin').style.background = '#2fd792';
		}
		else
		{
			$("#thicknessContainer").fadeOut(0);
			showMoreOptions(false);
		}
	}
}

function getNewPrice()
{
	var jsonString = getJson();
	document.getElementById('idCostData').innerHTML = 'Pricing...';	
	saveButtonClick(false);

	var material = currentMesh['Material'];

	if (material.indexOf('Transparent resin') !== -1 && typeof authToken !== 'undefined' && typeof shapeID !== 'undefined')
	{
		var data = 0;
		if (currentMesh.checkDimensions() === 'success')
			data = pre(currentMesh.figure);
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

var moreOptionsClicked = 0;
function showMoreOptions(show)
{
	var showStatus = document.getElementById('idMoreOptions').innerHTML;
	if ((show && showStatus === 'More') || (!show && showStatus === 'Less'))
		moreOptionsPressed();
}

function moreOptionsPressed()
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
	
	(v < 20000) ? p = (4.5069 * Math.log(v) + 30.805) * 1.33 * 1.2089 : p = (0.0012 * v + 62.55) * 1.33 * 1.2089;
	
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
    
    $.post('/feedback', {rating: rating, message: content, authenticity_token: authToken});
    slideUp(fout);
    publishCreation();
}

function getFeedback()
{
    if (typeof noFeedback !== 'undefined' || typeof noFeedback !== 'undefined')
    {
        var feedbackBox = "<br><h1>How'd we do?</h1>We're new here and would appreciate some feedback.<br><br>Lay it on us. We can take it.<br><br><div style='text-align:center;margin-left:80px;width:400px'><div style='position:relative;'><div style='float:left;width:50%;position:relative'>Fun<div style='position:absolute;left:15%' id='sr0'></div></div><div style='float:left;width:50%;position:relative;'>Ease of Use<br><div style='position:absolute;left:15%' id='sr1'></div></div></div><br><br><br><div style='text-align:center;position:relative;'><div style='float:left;width:50%;position:relative;'>Creativity<br><div  style='position:absolute;left:15%' id='sr2'></div></div><div style='float:left;width:50%;position:relative;'>Overall Experience<br><div style='position:absolute;left:15%' id='sr3'></div></div></div></div><br><br><br>Anything else?<br>";
        
        feedbackBox += "<textarea style='width: 350px;' rows=5 placeholder='Anything else?' id ='contentFeedback'></textarea><br>";
        
        feedbackBox += "<br><button class='tutButton buttonImg' onclick='submitFeedback()'>Submit Feedback</button><br><br><a href='javascript:slideUp(fout);publishCreation();'><font color=white><u><b>Not right now</b></u></font></a>"
        
        var d1 = generateDropDown(575,600, feedbackBox);
        
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
        freeze = true;
        document.getElementById("blackout").onclick = null;
    }
    else
        publishCreation();
}

function publishCreation()
{
    document.removeEventListener( 'mousedown', onDocumentMouseDown, false );

    var timestamp = new Date().getTime();
    
    var publishCSS = "<br><span style='font-size: 3em; font-weight: bold; color:#2fa1d7;'>Congratulations!</span><br><span style='font-size: 1.5em; font-weight: bold; color:#000; opacity: 0.8;'>You've made a pendant!</span><br><span class='verdana' style='color:#000; opacity: 0.8;'>(and it's awesome)</span><br><br><div class='publishImg'><div style='height:155px;width:155px;margin-left:auto;margin-right:auto'><img src='"+shapeLib[shapeID].image+"' id='shapepreview' style='width:250px; height:250px; margin-top:-55px; margin-left:-55px'></img></div><div style='font-size:18px'>Now, you can either:</div></div><div id='publishActionContainer' width='100%'><button class='publishButtonCSS buttonImg verdana' onclick='makePublish()'>Publish</button><button class='publishButtonCSS buttonImg' onclick='makeProduct()'>Order</button></div><div style='text-align:center;'><div class='publishDesc buttonImg'>Share your design by publishing it. It will appear in the group gallery so that others can see what you've made. Other people could give you kudos, use it themselves, or make a copy and alter it themselves.</div><div class='publishDesc buttonImg'>Buy it! You can order it and we will have it made for you and ship it to your house! The next time someone says \'Wow, what a nice necklace! Where did you get it?' you will have a heck of a story :). </div></div></div></div>";
    var d1 = generateWhiteDropDown(700, 700, publishCSS );
    
    setTimeout('document.getElementById("shapepreview").src ="'+shapeLib[shapeID].image+'";', 500);
    setTimeout('document.getElementById("shapepreview").src ="'+shapeLib[shapeID].image+'";', 1000);

    fout = d1;
    fadeIn(d1);
    document.getElementById("blackout").onclick = null;
}

function loadFromLib(hash)
{
	savedShape = hash;
	sceneWrapper.scene.remove( currentMesh.figure );
	currentMesh = new TubeMeshParams().create();
	
	view.targetX = currentMesh['Rotation X'];
	view.targetY = currentMesh['Rotation Y'];
	
	if (typeof printingUser === 'undefined')
			loop.faceIndexIncrementor = currentMesh['Face Index Incrementor'];
		else
			loop.faceIndexIncrementor = currentMesh['Face Index Incrementor'] * 7;
	loop.torusRotation = currentMesh['Torus Rotation'];
	loop.torusRotationNinety = currentMesh['Torus 90 Rotations'];
	sceneWrapper.setOfficialName(currentMesh['Description']);
	
	if (currentMesh['Face Index'] != -1)
	{
		loop.torusDefined = true;
		loop.fIndex = currentMesh['Face Index'];
	}
	else
	{
		sceneWrapper.scene.remove(loop.torusMesh);
		loop.torusDefined = false;
		loop.fIndex = -1;
	}

	sceneWrapper.redrawMesh(currentMesh, true);
	currentMesh.updateShapeSliders();
}

function onDocumentMouseDown(event)
{
	var projector = new THREE.Projector();
	
	event.preventDefault();
	var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
	projector.unprojectVector(vector, sceneWrapper.camera);
	var raycaster = new THREE.Raycaster (sceneWrapper.camera.position, vector.sub(sceneWrapper.camera.position).normalize());
	
	var inBounds = loop.addLoop(raycaster);
	if (inBounds === true)
	{
		loop.torusDefined = true;
		loop.faceIndexIncrementor = 0;
		loop.torusRotation = 0;
		sceneWrapper.redrawTorus();
		$('#idLoopRotContainer').fadeIn(0);
		tutorial.tut6();
	}
};