function loopRotations(){
			var loopRotContainer = document.createElement('div');
			loopRotContainer.id = 'idLoopRotContainer';
			document.body.appendChild(loopRotContainer);
			
			var loopAroundDiv = document.createElement('div');
			loopAroundDiv.id = 'idloopAroundDiv';
			loopAroundDiv.style.top = '16%';
			loopAroundDiv.style.left = '7%';
			loopAroundDiv.style.position = 'absolute';
			loopRotContainer.appendChild(loopAroundDiv);
			
			var loopAroundLabel = document.createElement('div');
			loopAroundLabel.id = 'idLoopAroundLabel';
			loopAroundLabel.className = 'floatingTextContainer';
			loopAroundLabel.innerHTML = 'Align Your Loop:';
			loopAroundDiv.appendChild(loopAroundLabel);
			
			var rotateDiv = document.createElement('div');
			rotateDiv.id = 'idRotateDiv';
			rotateDiv.style.zIndex = '1000';
			rotateDiv.style.position = 'relative';
			loopAroundDiv.appendChild(rotateDiv);

			var loopAroundLeftImg = document.createElement('img');
			loopAroundLeftImg.id = 'idLoopAroundLeftImg';
			loopAroundLeftImg.style.zIndex = '1000';
			loopAroundLeftImg.className = 'buttonImg';
			loopAroundLeftImg.src = 'assets/imgs/buttons/rotateLoopLeft.png';
			loopAroundLeftImg.style.margin = '5px';
			loopAroundLeftImg.style.display = 'inline';
			loopAroundLeftImg.style.zIndex = '1000';
			rotateDiv.appendChild(loopAroundLeftImg);
			
			var loopAroundRightImg = loopAroundLeftImg.cloneNode(true);
			loopAroundRightImg.id = 'idLoopAroundRightImg';
			loopAroundRightImg.src = 'assets/imgs/buttons/rotateLoopRight.png';
			rotateDiv.appendChild(loopAroundRightImg);
			
			var angleDiv = document.createElement('div');
			angleDiv.id = 'idAngleDiv';
			angleDiv.style.zIndex = '1000';
			angleDiv.style.position = 'relative';
			loopAroundDiv.appendChild(angleDiv);
			
			var loopLessAngle = loopAroundLeftImg.cloneNode(true);
			loopLessAngle.style.display = 'inline';
			loopLessAngle.id = 'idLoopLessangle';
			loopLessAngle.src= 'assets/imgs/buttons/lessAngle.png';
			angleDiv.appendChild(loopLessAngle);
			
			var loopMoreAngle = loopLessAngle.cloneNode(true);
			loopMoreAngle.id = 'idLoopMoreangle';
			loopMoreAngle.src= 'assets/imgs/buttons/moreAngle.png';
			angleDiv.appendChild(loopMoreAngle);
			
			var spinDiv = document.createElement('div');
			spinDiv.id = 'idAngleDiv';
			spinDiv.align = 'center';
			spinDiv.style.zIndex = '1000';
			loopAroundDiv.appendChild(spinDiv);
			
			var spinButton = loopAroundLeftImg.cloneNode(true);
			spinButton.style.display = 'inline';
			spinButton.id = 'idSpinButton';
			spinButton.src= 'assets/imgs/buttons/spin.png';
			spinDiv.appendChild(spinButton);
			
			var removeLoopDiv = document.createElement('div');
			removeLoopDiv.id = 'idloopAroundDiv';
			removeLoopDiv.style.position = 'absolute';
			removeLoopDiv.className = 'rounded';
			removeLoopDiv.style.top = '370px';
			removeLoopDiv.style.right = '70px';
			removeLoopDiv.style.zIndex = '1000';
			loopAroundDiv.appendChild(removeLoopDiv);
			
			var removeLoop = document.createElement('img');
			removeLoop.id = 'idRemoveLoop';
			removeLoop.style.zIndex = '1000';
			removeLoop.className = 'buttonImg';
			removeLoop.src = 'assets/imgs/buttons/removeLoop.png';
			removeLoop.style.zIndex = '1000';
			removeLoopDiv.appendChild(removeLoop);
}

function addDimensions() {
			var dimsContainer = document.createElement('div');
			dimsContainer.id = 'idDimsContainer';
			document.body.appendChild(dimsContainer);
				
			var hDimDiv = document.createElement('div');
			hDimDiv.id = 'idHShapeDiv';
			hDimDiv.style.position = 'absolute';
			hDimDiv.className = 'rounded';
			hDimDiv.innerHTML += '<span style="font-size: 24px"><b>0.02 H</b></span><br><span style="font-size: 14px">(Inches)<span>';
			hDimDiv.style.background = '#000';
			hDimDiv.style.color = '#fff';
			hDimDiv.style.padding = '5px 15px 10px 15px';
			hDimDiv.style.bottom = '14%';
			hDimDiv.style.right = '50%';
			hDimDiv.style.marginRight = '-57px';
			hDimDiv.style.zIndex = '1000';
			dimsContainer.appendChild(hDimDiv);
			
			var vDimDiv = hDimDiv.cloneNode(true);
			vDimDiv.id = 'idVShapeDiv';
			vDimDiv.innerHTML += '<span style="font-size: 24px"><b>0.02 W</b></span><br><span style="font-size: 14px">(Inches)<span>';
			vDimDiv.style.top = '50%';
			vDimDiv.style.marginTop = '-35px';
			vDimDiv.style.right = '30%';
			vDimDiv.style.bottom = '';
			dimsContainer.appendChild(vDimDiv);
}

function addDesignTips() {
			var designTipsContainer = document.createElement('div');
			designTipsContainer.id = 'idCostDataContainer';
			document.body.appendChild(designTipsContainer);
		
		
}

function addCost() {
			var costDataContainer = document.createElement('div');
			costDataContainer.id = 'idCostDataContainer';
			document.body.appendChild(costDataContainer);
				
			var costDiv = document.createElement('div');
			costDiv.id = 'idCostDiv';
			costDiv.className = 'blackContainer';
			costDiv.style.bottom = '130px';
			costDiv.style.right = '0.5%';
			costDataContainer.appendChild(costDiv);
			
			var costLabel = document.createElement('div');
			costLabel.id = 'idCostLabel';
			costLabel.className = 'blueInnerLabel';
			costLabel.innerHTML += 'Cost:';
			costDiv.appendChild(costLabel);
			
			var costData = document.createElement('div');
			costData.id = 'idCostData';
			costData.className = 'blackInnerLargeText';
			costData.innerHTML += '$15.77';
			costDiv.appendChild(costData);
			
			var costDim = document.createElement('div');
			costDim.id = 'idCostDim';
			costDim.className = 'blueInnerSmall';
			costDim.innerHTML += '0.02 (h) x 0.04 (w) x 0.04 (d)<br><br>Dimensions in Inches';
			costDiv.appendChild(costDim);
}

function addSave() {
			var saveButtonContainer = document.createElement('div');
			saveButtonContainer.id = 'idSaveButtonContainer';
			saveButtonContainer.style.zIndex = '900';
			saveButtonContainer.style.position = 'absolute';
			saveButtonContainer.style.bottom = '0%';
			saveButtonContainer.style.right = '1%';
			document.body.appendChild(saveButtonContainer);	
			
			var saveBackButtonContainer = document.createElement('div');
			saveBackButtonContainer.id = 'idSaveBackButtonContainer';
			saveBackButtonContainer.style.zIndex = '900';
			saveBackButtonContainer.style.position = 'relative';
			saveBackButtonContainer.style.margin = '0px 0px 2px 0px';
			saveBackButtonContainer.style.display = 'inline-block';
			saveButtonContainer.appendChild(saveBackButtonContainer);	
			
			var backButton = document.createElement('img');
			backButton.id = 'idBackButton';
			backButton.style.zIndex = '1000';
			backButton.className = 'buttonImg';
			backButton.style.display = 'block';
			backButton.src = 'assets/imgs/buttons/back.png';
			backButton.style.margin = '1px 1px 10px 10px';
			saveBackButtonContainer.appendChild(backButton);
			
			var saveStayButton = document.createElement('img');
			saveStayButton.id = 'idSaveStayButton';
			saveStayButton.style.zIndex = '1000';
			saveStayButton.className = 'buttonImg';
			saveStayButton.src = 'assets/imgs/buttons/savebutton.png';
			saveStayButton.style.display = 'block';
			saveStayButton.style.margin = '1px 1px 7px 10px';
			saveBackButtonContainer.appendChild(saveStayButton);
		
			var saveButton = document.createElement('img');
			saveButton.id = 'idSaveButton';
			saveButton.style.zIndex = '1000';
			saveButton.className = 'buttonImg';
			saveButton.style.display = 'inline-block';
			saveButton.src = 'assets/imgs/buttons/save.png';
			saveButton.style.margin = '1px 1px 7px 10px';
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
		if (!(typeof notSignedIn !== 'undefined' && notSignedIn))
		{
			progressImg.className = 'buttonImg';
		}
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

		var progressImg4 = document.createElement('img');
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
		if (!(typeof notSignedIn !== 'undefined' && notSignedIn))
		{
			progressImgNames1.className = 'buttonImg';
		}
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
	
		var progressImgNames4 = document.createElement('img');
		progressImgNames4.id = 'idProgressImgNamesId4';
		progressImgNames4.style.margin = '3px 3px 0px 0px';
		progressImgNames4.src = 'assets/imgs/progress/progressNames4_opaque.png';
		progressNameContainer.appendChild(progressImgNames4);		
}

function addResetButtons() {
	var resetContainer = document.createElement('div');
	resetContainer.id = 'idResetContainer';
	resetContainer.style.position = 'absolute';
	resetContainer.style.bottom = '7px';
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
        savedShapeContainer.className = 'blackContainer';
        savedShapeContainer.style.top = '20%';
        savedShapeContainer.style.right = '0.75%';	
        savedShapeContainer.style.width = '217px';	
		savedShapeContainer.style.overflow = 'hidden';		
        document.body.appendChild(savedShapeContainer);
		
		var savedShapeLabel = document.createElement('div');
		savedShapeLabel.id = 'idSavedShapeLabel';
		savedShapeLabel.className = 'blueInnerLabel';
		savedShapeLabel.innerHTML += 'Your Saved Shapes';
		shapeContainer.appendChild(savedShapeLabel);
        
        var scrollWrapper = document.createElement('div');
        scrollWrapper.className = 'rounded antiscroll-wrap';
        savedShapeContainer.appendChild(scrollWrapper);
                
        var savedShapeLibrary = document.createElement('div');
        savedShapeLibrary.id = 'idSavedShapeLibrary';
        savedShapeLibrary.innerHTML = shapeLib;
        savedShapeLibrary.style.background = '#000';
        savedShapeLibrary.className = 'antiscroll-inner';
        scrollWrapper.appendChild(savedShapeLibrary);
    }
}

function addStartingShapes() {
	var shapeContainer = document.createElement('div');
	shapeContainer.id = 'idShapeContainer';
	shapeContainer.className = 'blackContainer';
	shapeContainer.style.bottom = '10%';
	shapeContainer.style.left = '5px';
    shapeContainer.style.overflow = 'hidden';
	document.body.appendChild(shapeContainer);
	
	var shapeLibLabel = document.createElement('div');
	shapeLibLabel.id = 'idShapeLibLabel';
	shapeLibLabel.className = 'blueInnerLabel';
	shapeLibLabel.innerHTML += 'Starting Shape<br>Library';
	shapeContainer.appendChild(shapeLibLabel);
	
	var scrollWrapper = document.createElement('div');
	scrollWrapper.id = 'idScrollWrapper';
	scrollWrapper.className = 'rounded antiscroll-wrap';
	scrollWrapper.style.display = 'block';	
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
			
    for (var x=2; x<=16; x++)
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
	materialDetailContainer.className = 'blackContainer';
	materialDetailContainer.style.top = '150px';
	materialDetailContainer.style.left = '1%';				
	materialDetailContainer.style.zIndex = '300';
	document.body.appendChild(materialDetailContainer);		

	var materialName = document.createElement('div');
	materialName.id = 'idMaterialName';
	materialName.className = 'blueInnerLabel';
	materialName.style.width = '150px';
	materialName.textContent += ' White Flexible Plastic';
	materialName.style.marginBottom = '5px';
	materialName.style.display = 'block';
	materialDetailContainer.appendChild(materialName);	
	
	var costContainer = document.createElement('div');
	costContainer.id = 'idCostContainer';
	costContainer.className = 'blackInnerSmallText';
	costContainer.style.display = 'inline';
	costContainer.style.marginRight = '1px';
	costContainer.style.padding = '2px';
	materialDetailContainer.appendChild(costContainer);		
	
	var smoothContainer = document.createElement('div');
	smoothContainer.id = 'idSmoothContainer';
	smoothContainer.className = 'blackInnerSmallText';
	smoothContainer.style.display = 'inline';
	smoothContainer.style.marginLeft = '1px';
	smoothContainer.style.padding = '2px';
	materialDetailContainer.appendChild(smoothContainer);	
	
	var matLibrary = document.createElement('div');
	materialDetailContainer.appendChild(matLibrary);

	var m1 = document.createElement('img');
	m1.id = 'idM1';
	m1.style.margin = '8px 3px 5px 0px';
	m1.src = 'assets/imgs/materialExamples/alumide_1.jpg';
	m1.height = 85;
	m1.width = 85;
	m1.style.cursor = 'pointer';
	m1.style.zIndex = '1000';
	matLibrary.appendChild(m1);
			
	var m2 = m1.cloneNode(true);
	m2.id = 'idM2';
	m2.src = 'assets/imgs/materialExamples/alumide_2.jpg';
	m2.style.margin = '8px 0px 5px 3px';
	matLibrary.appendChild(m2);	
	
	var materialDescription = document.createElement('div');
	materialDescription.id = 'idMaterialDescription';
	materialDescription.className = 'blueInnerSmall';
	materialDescription.style.width = '170px';
	materialDescription.textContent += ' Stainless steel has a fairly pitted surface finish, which gives it a vintage (almost steam-punk) look.';
	materialDetailContainer.appendChild(materialDescription);
	
	document.getElementById('sliderContainer').style.zIndex = '1001';
	document.getElementById('thicknessContainer').style.zIndex = '1001';
}

function addLoops(){

	var loopText = document.createElement('div');
	loopText.id = 'idLoopText';
	loopText.className = 'floatingTextContainer';
	loopText.innerHTML = 'Click anywhere on your piece<br>to place a loop for the necklace.';
	loopText.style.bottom = '12%';
	loopText.style.left = '50%';
	loopText.style.marginLeft = '-211px';
	document.body.appendChild(loopText);
}

function addDatGui(){
	var datgui = document.createElement('div');
	datgui.id = 'datGuiStuff';
	document.body.appendChild(datgui);
}