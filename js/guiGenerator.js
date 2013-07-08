function scaleGUI() {
			var dimContainer = document.createElement('div');
			dimContainer.id = 'idDimContainer';
			document.body.appendChild(dimContainer);
				
			var hShapeDiv = document.createElement('div');
			hShapeDiv.id = 'idHShapeDiv';
			hShapeDiv.style.position = 'absolute';
			hShapeDiv.style.bottom = '25%';
			hShapeDiv.style.width = '50%';
			hShapeDiv.style.right = '40%';
			hShapeDiv.style.zIndex = '1000';
			dimContainer.appendChild(hShapeDiv);
			
			var vShapeDiv = document.createElement('div');
			vShapeDiv.id = 'idVShapeDiv';
			vShapeDiv.style.position = 'absolute';
			vShapeDiv.style.color = '#000';
			vShapeDiv.style.top = '20%';
			vShapeDiv.style.right = '32.5%';
			vShapeDiv.style.display = 'inline-block';
			vShapeDiv.style.zIndex = '1000';
			dimContainer.appendChild(vShapeDiv);
	
			var hRulerImg = document.createElement('img');
			hRulerImg.id = 'idHRuler';
			hRulerImg.style.marginTop = '5px';
			hRulerImg.src = 'assets/imgs/buttons/hRuler2.png';
			hRulerImg.style.position = 'absolute';
			hRulerImg.style.cursor = 'move';
			hRulerImg.style.zIndex = '1000';
			hShapeDiv.appendChild(hRulerImg);
			
			var vRulerImg = document.createElement('img');
			vRulerImg.id = 'idVRuler';
			vRulerImg.style.marginTop = '5px';
			vRulerImg.src = 'assets/imgs/buttons/vRuler2.png';
			vRulerImg.style.position = 'absolute';
			vRulerImg.style.display = 'inline-block';
			vRulerImg.style.cursor = 'move';
			vRulerImg.style.zIndex = '1000';
			vShapeDiv.appendChild(vRulerImg);
			
}

function addSave() {
			var saveButtonContainer = document.createElement('div');
			saveButtonContainer.id = 'idSaveButtonContainer';
			saveButtonContainer.style.zIndex = '900';
			saveButtonContainer.style.position = 'absolute';
			saveButtonContainer.style.bottom = '0%';
			saveButtonContainer.style.right = '0%';
			document.body.appendChild(saveButtonContainer);	
			
			var saveBackButtonContainer = document.createElement('div');
			saveBackButtonContainer.id = 'idSaveBackButtonContainer';
			saveBackButtonContainer.style.zIndex = '900';
			saveBackButtonContainer.style.position = 'relative';
			saveBackButtonContainer.style.margin = '0px 0px 2px 0px';
			saveBackButtonContainer.style.display = 'inline-block';
			saveButtonContainer.appendChild(saveBackButtonContainer);	
			
			var saveStayButton = document.createElement('img');
			saveStayButton.id = 'idSaveStayButton';
			saveStayButton.style.zIndex = '1000';
			saveStayButton.className = 'buttonImg';
			saveStayButton.src = 'assets/imgs/buttons/savebutton.png';
			saveStayButton.style.display = 'block';
			saveStayButton.style.margin = '1px 1px 10px 10px';
			saveBackButtonContainer.appendChild(saveStayButton);
			
			var backButton = document.createElement('img');
			backButton.id = 'idBackButton';
			backButton.style.zIndex = '1000';
			backButton.className = 'buttonImg';
			backButton.style.display = 'block';
			backButton.src = 'assets/imgs/buttons/back.png';
			backButton.style.margin = '1px 1px 10px 10px';
			saveBackButtonContainer.appendChild(backButton);
		
			var saveButton = document.createElement('img');
			saveButton.id = 'idSaveButton';
			saveButton.style.zIndex = '1000';
			saveButton.className = 'buttonImg';
			saveButton.style.display = 'inline-block';
			saveButton.src = 'assets/imgs/buttons/save.png';
			saveButton.style.margin = '1px 1px 10px 10px';
			saveButtonContainer.appendChild(saveButton);
}


function addProgressBar() {
	
	var progressContainer = document.createElement('div');
	progressContainer.id = 'idProgressContainer';
	progressContainer.style.position = 'absolute';
	progressContainer.style.width = '100%';
	progressContainer.style.top = '10px';			
	progressContainer.style.zIndex = '100';
	document.body.appendChild(progressContainer);
	
		var progressImg = document.createElement('img');
		progressImg.id = 'idProgressImg';
		progressImg.className = 'buttonImg';
		progressImg.src = 'assets/imgs/progress/progressSection1.png';
		progressContainer.appendChild(progressImg);	
	
		var progressImg2 = progressImg.cloneNode(true);
		progressImg2.id = 'idProgressImg2';
		progressImg2.src = 'assets/imgs/progress/progressSectionOpaque.png';
		progressContainer.appendChild(progressImg2);	
	
		var progressImg3 = progressImg.cloneNode(true);
		progressImg3.id = 'idProgressImg3';
		progressImg3.src = 'assets/imgs/progress/progressSectionOpaque.png';
		progressContainer.appendChild(progressImg3);	
	
		var progressImg4 = progressImg.cloneNode(true);
		progressImg4.id = 'idProgressImg4';
		progressImg4.src = 'assets/imgs/progress/progressSectionOpaque.png';
		progressContainer.appendChild(progressImg4);	
	
	var progressNameContainer = document.createElement('div');
	progressNameContainer.id = 'idProgressNameContainer';
	progressNameContainer.style.margin = '0px 0px 0px 4px';
	progressNameContainer.style.position = 'absolute';
	progressNameContainer.style.width = '100%';
	progressNameContainer.style.display = 'block';		
	progressNameContainer.style.zIndex = '1000';
	progressContainer.appendChild(progressNameContainer);
	
		var progressImgNames1 = document.createElement('img');
		progressImgNames1.id = 'idProgressImgNamesId1';
		progressImgNames1.className = 'buttonImg';
		progressImgNames1.style.margin = '3px 3px 0px 0px';
		progressImgNames1.src = 'assets/imgs/progress/progressNames1_solid.png';
		progressNameContainer.appendChild(progressImgNames1);	
	
		var progressImgNames2 = progressImgNames1.cloneNode(true);
		progressImgNames2.id = 'idProgressImgNamesId2';
		progressImgNames2.style.margin = '3px 3px 0px 5px';
		progressImgNames2.src = 'assets/imgs/progress/progressNames2_opaque.png';
		progressNameContainer.appendChild(progressImgNames2);	
	
		var progressImgNames3 = progressImgNames1.cloneNode(true);
		progressImgNames3.id = 'idProgressImgNamesId3';
		progressImgNames3.style.margin = '3px 3px 0px 6px';
		progressImgNames3.src = 'assets/imgs/progress/progressNames3_opaque.png';
		progressNameContainer.appendChild(progressImgNames3);	
	
		var progressImgNames4 = progressImgNames1.cloneNode(true);
		progressImgNames4.id = 'idProgressImgNamesId4';
		progressImgNames4.style.margin = '3px 3px 0px 0px';
		progressImgNames4.src = 'assets/imgs/progress/progressNames4_opaque.png';
		progressNameContainer.appendChild(progressImgNames4);	
}

function addResetButtons() {
	var resetContainer = document.createElement('div');
	resetContainer.id = 'idResetContainer';
	resetContainer.style.position = 'absolute';
	resetContainer.style.bottom = '1%';
	resetContainer.style.left = '1%';			
	resetContainer.style.zIndex = '1000';
	container.appendChild(resetContainer);
			
	var resetRotationImg = document.createElement('img');
	resetRotationImg.id = 'idResetRotationImg';
	resetRotationImg.className = 'buttonImg';
	resetRotationImg.style.margin = '0px 10px 0px 0px';
	resetRotationImg.src = 'assets/imgs/buttons/resetRotation.png';
	resetRotationImg.style.zIndex = '1000';
	resetContainer.appendChild(resetRotationImg);
			
	var resetShapeImg = resetRotationImg.cloneNode(true);
	resetShapeImg.id = 'idResetShapdImg';
	resetShapeImg.src = 'assets/imgs/buttons/resetShape.png';
	resetContainer.appendChild(resetShapeImg);
    
}

function addSavedLibrary() {
	
    if (typeof shapeLib !== 'undefined')
    {
        var savedShapeContainer = document.createElement('div');
        savedShapeContainer.id = 'idSavedShapeContainer';
        savedShapeContainer.className = 'rounded antiscroll-wrap';
        savedShapeContainer.innerHTML += '<b>Your Saved Shapes</b><br>';
        savedShapeContainer.style.position = 'absolute';
        savedShapeContainer.style.border = '10px solid #000';
        savedShapeContainer.style.color = '#fff';
        savedShapeContainer.style.top = '20%';
        savedShapeContainer.style.background = '#000';
        savedShapeContainer.style.right = '0.75%';	
        savedShapeContainer.style.width = '217px';			
        savedShapeContainer.style.zIndex = '1000';
        document.body.appendChild(savedShapeContainer);			
                
        var savedShapeLibrary = document.createElement('div');
        savedShapeLibrary.id = 'idSavedShapeLibrary';
        savedShapeLibrary.innerHTML = shapeLib;
        savedShapeLibrary.style.background = '#000';
        savedShapeLibrary.className = 'antiscroll-inner';
        savedShapeContainer.appendChild(savedShapeLibrary);
    }
}


function addStartingShapes() {
	var shapeContainer = document.createElement('div');
	shapeContainer.id = 'idShapeContainer';
	shapeContainer.className = 'rounded';
	shapeContainer.innerHTML += 'Starting Shape<br>Library<br><br>';
	shapeContainer.style.position = 'absolute';
	shapeContainer.style.fontFamily = 'Verdana, Geneva, sans-serif';
	shapeContainer.style.fontWeight = '600';
	shapeContainer.style.border = '10px solid #000';
	shapeContainer.style.margin = '10';
	shapeContainer.style.color = '#fff';
	shapeContainer.style.background = '#000';
	shapeContainer.style.bottom = '25%';
	shapeContainer.style.left = '0.1%';	
	shapeContainer.style.zIndex = '1000';
    shapeContainer.style.overflow = 'hidden';
	document.body.appendChild(shapeContainer);	
	
	var scrollWrapper = document.createElement('div');
	scrollWrapper.id = 'idScrollWrapper';
	scrollWrapper.className = 'rounded antiscroll-wrap';	
	shapeContainer.appendChild(scrollWrapper);	
			
	var shapeLibrary = document.createElement('div');
	shapeLibrary.id = 'idShapeLibrary';
    shapeLibrary.className = 'antiscroll-inner';
	shapeLibrary.style.height = '300px';
	shapeLibrary.style.width = '217px';
	shapeLibrary.style.overflow = 'auto';
	scrollWrapper.appendChild(shapeLibrary);

	var s1 = document.createElement('img');
	s1.id = 'idS1';
	s1.className = 'galleryImg';
	s1.src = 'assets/imgs/shapes/1.png';
	s1.height = 100;
	s1.width = 100;
	s1.style.zIndex = '1000';
	shapeLibrary.appendChild(s1);
    var br = document.createElement("br");
			
    for (var x=2; x<=15; x++)
    {
        var sX = s1.cloneNode(true);
        sX.id = 'idS'+x;
        sX.src = 'assets/imgs/shapes/'+x+'.png'
        if (x%2 == 1)
            shapeLibrary.appendChild(br.cloneNode());
        shapeLibrary.appendChild(sX);
    }
	
}

function addMaterialSelector() {
	document.getElementById('materials').style.zIndex = '1001';
	
	var materialDetailContainer = document.createElement('div');
	materialDetailContainer.id = 'idmaterialDetailContainer';
	materialDetailContainer.className = 'rounded';
	materialDetailContainer.style.fontWeight = '500';
	materialDetailContainer.style.position = 'absolute';
	materialDetailContainer.style.border = '7px solid #000';
	materialDetailContainer.style.color = '#fff';
	materialDetailContainer.align = 'center';
	materialDetailContainer.style.background = '#000';
	materialDetailContainer.style.top = '1%';
	materialDetailContainer.style.right = '1%';	
	materialDetailContainer.style.width = '190px';			
	materialDetailContainer.style.zIndex = '1000';
	document.body.appendChild(materialDetailContainer);		
	
	var materialNameContainer = document.createElement('div');
	materialNameContainer.id = 'idmaterialNameContainer';
	materialNameContainer.align = 'center';
	materialNameContainer.className = 'rounded';
	materialNameContainer.style.position = 'relative';
	materialNameContainer.style.padding = '5px';
	materialNameContainer.style.margin = '2px 7px 5px 5px';
	materialNameContainer.style.color = '#000';
	materialNameContainer.style.background = '#2ea1d7';		
	materialNameContainer.style.zIndex = '1000';
	materialDetailContainer.appendChild(materialNameContainer);		
	
	var materialName = document.createElement('div');
	materialName.id = 'idMaterialName';
	materialName.align = 'center';
	materialName.style.fontSize = '16px';
	materialName.textContent += ' White Flexible Plastic';
	materialName.style.fontWeight = '400';
	materialName.style.fontFamily = 'Verdana, Geneva, sans-serif';
	materialName.style.position = 'relative';
	materialName.style.color = '#fff';
	materialName.style.zIndex = '1000';
	materialNameContainer.appendChild(materialName);	
	
	var costContainer = document.createElement('div');
	costContainer.id = 'idCostContainer';
	costContainer.align = 'center';
	costContainer.style.height = '20px';
	costContainer.style.fontSize = '15px';
	costContainer.textContent += 'Cost: $$$';
	costContainer.style.display = 'inline';
	costContainer.style.position = 'relative';
	costContainer.style.margin = '5px 5px 5px 5px';
	costContainer.style.color = '#fff';
	costContainer.style.background = '#000';		
	costContainer.style.zIndex = '1000';
	materialDetailContainer.appendChild(costContainer);		
	
	var smoothContainer = document.createElement('div');
	smoothContainer.id = 'idSmoothContainer';
	smoothContainer.align = 'center';
	smoothContainer.style.fontSize = '15px';
	smoothContainer.style.height = '20px';
	smoothContainer.textContent += 'Smooth: High';
	smoothContainer.style.position = 'relative';
	smoothContainer.style.display = 'inline';
	smoothContainer.style.margin = '5px 5px 5px 5px';
	smoothContainer.style.color = '#fff';
	smoothContainer.style.background = '#000';		
	smoothContainer.style.zIndex = '1000';
	materialDetailContainer.appendChild(smoothContainer);	
	
	var matLibrary = document.createElement('div');
	materialDetailContainer.appendChild(matLibrary);

	var m1 = document.createElement('img');
	m1.id = 'idM1';
	m1.style.margin = '7px 2px 4px 5px';
	m1.src = 'assets/imgs/materialExamples/alumide_1.jpg';
	m1.height = 85;
	m1.width = 85;
	m1.style.cursor = 'pointer';
	m1.style.zIndex = '1000';
	matLibrary.appendChild(m1);
			
	var m2 = m1.cloneNode(true);
	m2.id = 'idM2';
	m2.src = 'assets/imgs/materialExamples/alumide_2.jpg';
	m2.style.margin = '7px 5px 4px 2px';
	matLibrary.appendChild(m2);
	
	var materialDescriptionContainer = document.createElement('div');
	materialDescriptionContainer.id = 'idMaterialDescriptionContainer';
	materialDescriptionContainer.align = 'center';
	materialDescriptionContainer.className = 'rounded';
	materialDescriptionContainer.style.position = 'relative';
	materialDescriptionContainer.style.margin = '3px 5px 4px 5px';
	materialDescriptionContainer.style.padding = '7px';
	materialDescriptionContainer.style.color = '#000';
	materialDescriptionContainer.style.background = '#2ea1d7';		
	materialDescriptionContainer.style.zIndex = '1000';
	materialDetailContainer.appendChild(materialDescriptionContainer);		
	
	var materialDescription = document.createElement('div');
	materialDescription.id = 'idMaterialDescription';
	materialDescription.style.textAlign = 'left';
	materialDescription.style.fontSize = '14px';
	materialDescription.textContent += ' Stainless steel has a fairly pitted surface finish, which gives it a vintage (almost steam-punk) look.';
	materialDescription.style.fontWeight = '400';
	materialDescription.style.fontFamily = 'Verdana, Geneva, sans-serif';
	materialDescription.style.position = 'relative';
	materialDescription.style.color = '#fff';
	materialDescription.style.zIndex = '1000';
	materialDescriptionContainer.appendChild(materialDescription);
	
	document.getElementById('sliderContainer').style.zIndex = '1001';
	document.getElementById('thicknessContainer').style.zIndex = '1001';
}

function addLoops(){

	var loopText = document.createElement('div');
	loopText.id = 'idLoopText';
	loopText.style.position = 'absolute';
	loopText.style.color = '#fff';
	loopText.innerHTML = 'Now we need a loop for the attachment.<br>Please click anywhere on your piece to place it.';
	loopText.style.bottom = '7%';
	loopText.style.width = '100%';
	loopText.style.fontSize = 'x-large';
	loopText.style.fontFamily = 'Verdana, Geneva, sans-serif';
	loopText.align = 'center';			
	loopText.style.zIndex = '100';
	document.body.appendChild(loopText);
}

function addLoopControls(){
	var loopControls = document.createElement('div');
	loopControls.id = 'loopControls';
	loopControls.style.position = 'absolute';
	loopControls.style.top = '0%';
	loopControls.style.left = '0%';
	loopControls.style.zIndex = '1000';
	document.body.appendChild(loopControls);
	
	var rotAroundF = document.createElement('div');
    rotAroundF.style.position = 'absolute';
	rotAroundF.style.top = '0px';
    rotAroundF.style.zIndex = '1000';
    rotAroundF.style.background= '#999';
    rotAroundF.innerHTML = '<input id="rotateAroundF" type="button" value="Rotate Forward Around Shape">';
    loopControls.appendChild(rotAroundF);
	
	var rotAroundB = document.createElement('div');
    rotAroundB.style.position = 'absolute';
	rotAroundB.style.top = '28px';
    rotAroundB.style.zIndex = '1000';
    rotAroundB.style.background= '#999';
    rotAroundB.innerHTML = '<input id="rotateAroundB" type="button" value="Rotate Backward Around Shape">';
    loopControls.appendChild(rotAroundB);
	
	var rotPlaceF = document.createElement('div');
    rotPlaceF.style.position = 'absolute';
	rotPlaceF.style.top = '56px';
    rotPlaceF.style.zIndex = '1000';
    rotPlaceF.style.background= '#999';
    rotPlaceF.innerHTML = '<input id="rotatePlaceF" type="button" value="Rotate Forward In Place">';
    loopControls.appendChild(rotPlaceF);
	
	var rotPlaceB = document.createElement('div');
    rotPlaceB.style.position = 'absolute';
	rotPlaceB.style.top = '84px';
    rotPlaceB.style.zIndex = '1000';
    rotPlaceB.style.background= '#999';
    rotPlaceB.innerHTML = '<input id="rotatePlaceB" type="button" value="Rotate Backward In Place">';
    loopControls.appendChild(rotPlaceB);
	
	var rotNinety = document.createElement('div');
    rotNinety.style.position = 'absolute';
	rotNinety.style.top = '110px';
    rotNinety.style.zIndex = '1000';
    rotNinety.style.background= '#999';
    rotNinety.innerHTML = '<input id="rotate90" type="button" value="Rotate 90 Degrees">';
    loopControls.appendChild(rotNinety);
}

function addDatGui(){
	var datgui = document.createElement('div');
	datgui.id = 'datGuiStuff';
	document.body.appendChild(datgui);
}