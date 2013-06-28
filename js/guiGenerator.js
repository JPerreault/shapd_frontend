function scaleGUI() {
			container = document.createElement('div');
			document.body.appendChild(container);
				
			var hShapeDiv = document.createElement('div');
			hShapeDiv.id = 'idHShapeDiv';
			hShapeDiv.style.position = 'absolute';
			hShapeDiv.style.bottom = '25%';
			hShapeDiv.style.width = '50%';
			hShapeDiv.style.right = '40%';
		
			container.appendChild(hShapeDiv);
			
			var vShapeDiv = document.createElement('div');
			vShapeDiv.id = 'idVShapeDiv';
			vShapeDiv.style.position = 'absolute';
			vShapeDiv.style.top = '20%';
			vShapeDiv.style.right = '32.5%';
		
			container.appendChild(vShapeDiv);
	
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
			
			var backButton = document.createElement('img');
			backButton.id = 'idBackButton';
			backButton.style.zIndex = '1000';
			backButton.className = 'buttonImg';
			backButton.src = 'assets/imgs/buttons/back.png';
			backButton.style.margin = '1px 1px 10px 10px';
			saveButtonContainer.appendChild(backButton);
		
			var saveButton = document.createElement('img');
			saveButton.id = 'idSaveButton';
			saveButton.style.zIndex = '1000';
			saveButton.className = 'buttonImg';
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
	resetContainer.style.top = '192px';
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
        savedShapeContainer.style.background = '#000';
        savedShapeContainer.style.top = '20%';
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
	shapeContainer.innerHTML += 'Shape Library<br>';
	shapeContainer.style.position = 'absolute';
	shapeContainer.style.border = '10px solid #000';
	shapeContainer.style.margin = '15 15 15 15';
	shapeContainer.style.color = '#fff';
	shapeContainer.style.background = '#000';
	shapeContainer.style.bottom = '2%';
	shapeContainer.style.left = '0.05%';	
	shapeContainer.style.width = '215px';			
	shapeContainer.style.zIndex = '1000';
	document.body.appendChild(shapeContainer);			
			
	var shapeLibrary = document.createElement('div');
	shapeLibrary.id = 'idShapeLibrary';
	shapeContainer.appendChild(shapeLibrary);

	var s1 = document.createElement('img');
	s1.id = 'idS1';
	s1.className = 'galleryImg';
	s1.style.margin = '5px 5px 5px 5px';
	s1.src = 'assets/imgs/shapes/1.jpg';
	s1.height = 90;
	s1.width = 90;
	s1.style.zIndex = '1000';
	shapeLibrary.appendChild(s1);
			
	var s2 = s1.cloneNode(true);
	s2.id = 'idS2';
	s2.src = 'assets/imgs/shapes/2.jpg'
	shapeLibrary.appendChild(s2);
	
	var s3 = s1.cloneNode(true);
	s3.id = 'idS3';
	s3.src = 'assets/imgs/shapes/3.jpg'
	shapeLibrary.appendChild(s3);
			
	var s4 = s1.cloneNode(true);
	s4.id = 'idS4';
	s4.src = 'assets/imgs/shapes/4.jpg'
	shapeLibrary.appendChild(s4);	
	
	var s5 = s1.cloneNode(true);
	s5.id = 'idS5';
	s5.src = 'assets/imgs/shapes/5.png'
	shapeLibrary.appendChild(s5);	
	
	var s6 = s1.cloneNode(true);
	s6.id = 'idS6';
	s6.src = 'assets/imgs/shapes/6.png'
	shapeLibrary.appendChild(s6);	
}

function addMaterialSelector() {
	document.getElementById('materials').style.zIndex = '1001';
	document.getElementById('sliderContainer').style.zIndex = '1001';
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