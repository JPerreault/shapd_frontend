function loopRotations(){
			var loopRotContainer = document.createElement('div');
			loopRotContainer.id = 'idLoopRotContainer';
			document.body.appendChild(loopRotContainer);
			
			var loopAroundDiv = document.createElement('div');
			loopAroundDiv.id = 'idloopAroundDiv';
			loopAroundDiv.style.top = '3%';
			loopAroundDiv.style.left = '1%';
			loopAroundDiv.style.position = 'absolute';
			loopRotContainer.appendChild(loopAroundDiv);
			
			var loopAroundLabel = document.createElement('div');
			loopAroundLabel.id = 'idLoopAroundLabel';
			loopAroundLabel.className = 'floatingTextContainer';
			loopAroundLabel.innerHTML = 'Align Your Loop:';
			loopAroundLabel.style.fontSize = '18px';
			loopAroundLabel.style.position = 'relative';
			loopAroundLabel.style.padding = '5px';
			loopAroundLabel.style.width = '185px';
			loopAroundLabel.style.marginBottom = '10px';
			loopAroundDiv.appendChild(loopAroundLabel);
			
			var rotateDiv = document.createElement('div');
			rotateDiv.id = 'idRotateDiv';
			rotateDiv.style.zIndex = '1000';
			loopAroundDiv.appendChild(rotateDiv);
			
			var loopAroundLeftButton = document.createElement('button');
			loopAroundLeftButton.id = 'idLoopAroundLeftButton';
			loopAroundLeftButton.className = 'buttonSmall';
			loopAroundLeftButton.innerHTML = 'Rotate<br>Left';
			loopAroundLeftButton.style.display = 'inline';
			rotateDiv.appendChild(loopAroundLeftButton);

			var loopAroundLeftImg = document.createElement('img');
			loopAroundLeftImg.id = 'idLoopAroundLeftImg';
			loopAroundLeftImg.src = 'assets/imgs/buttons/rotateLoopLeft.png';
			loopAroundLeftImg.style.marginTop = '5px';
			loopAroundLeftImg.style.display = 'block';
			loopAroundLeftButton.appendChild(loopAroundLeftImg);
			
			var loopAroundRightButton = document.createElement('button');
			loopAroundRightButton.id = 'idLoopAroundRightButton';
			loopAroundRightButton.className = 'buttonSmall';
			loopAroundRightButton.innerHTML = 'Rotate<br>Right';
			loopAroundRightButton.style.display = 'inline';
			rotateDiv.appendChild(loopAroundRightButton);
			
			var loopAroundRightImg = loopAroundLeftImg.cloneNode(true);
			loopAroundRightImg.id = 'idLoopAroundRightImg';
			loopAroundRightImg.src = 'assets/imgs/buttons/rotateLoopRight.png';
			loopAroundRightButton.appendChild(loopAroundRightImg);
			
			var angleDiv = document.createElement('div');
			angleDiv.id = 'idAngleDiv';
			angleDiv.style.zIndex = '1000';
			angleDiv.style.position = 'relative';
			loopAroundDiv.appendChild(angleDiv);
			
			var loopLessAngleButton = document.createElement('button');
			loopLessAngleButton.id = 'idLoopLessAngleButton';
			loopLessAngleButton.className = 'buttonSmall';
			loopLessAngleButton.style.width = '90px';
			loopLessAngleButton.innerHTML = 'Less<br>Angle';
			loopLessAngleButton.style.display = 'inline';
			angleDiv.appendChild(loopLessAngleButton);
			
			var loopLessAngleImg = document.createElement('img');
			loopLessAngleImg.style.display = 'block';
			loopLessAngleImg.id = 'idLoopLessAngleImg';
			loopLessAngleImg.src= 'assets/imgs/buttons/lessAngle.png';
			loopLessAngleButton.appendChild(loopLessAngleImg);
			
			var loopMoreAngleButton = document.createElement('button');
			loopMoreAngleButton.id = 'idLoopMoreAngleButton';
			loopMoreAngleButton.className = 'buttonSmall';
			loopMoreAngleButton.style.width = '90px';
			loopMoreAngleButton.innerHTML = 'More<br>Angle';
			loopMoreAngleButton.style.display = 'inline';
			angleDiv.appendChild(loopMoreAngleButton);
			
			var loopMoreAngleImg = document.createElement('img');
			loopMoreAngleImg.style.display = 'block';
			loopMoreAngleImg.id = 'idLoopMoreAngleImg';
			loopMoreAngleImg.src= 'assets/imgs/buttons/moreAngle.png';
			loopMoreAngleButton.appendChild(loopMoreAngleImg);
			
			var spinDiv = document.createElement('div');
			spinDiv.id = 'idAngleDiv';
			spinDiv.innerHTML = 'Spin';
			spinDiv.className = 'buttonSmall';
			spinDiv.style.width = '100px';
			spinDiv.style.marginLeft = 'auto';
			spinDiv.style.marginRight = 'auto';
			loopAroundDiv.appendChild(spinDiv);
			
			var spinButton = document.createElement('img');
			spinButton.style.display = 'inline';
			spinButton.id = 'idSpinButton';
			spinButton.src= 'assets/imgs/buttons/spin.png';
			spinButton.style.display = 'block';
			spinButton.style.marginLeft = 'auto';
			spinButton.style.marginRight = 'auto';
			spinDiv.appendChild(spinButton);
			
			var removeLoopDiv = document.createElement('div');
			removeLoopDiv.id = 'idloopAroundDiv';
			removeLoopDiv.style.position = 'relative';
			removeLoopDiv.className = 'rounded';
			removeLoopDiv.style.top = '90px';
			removeLoopDiv.style.zIndex = '1000';
			loopAroundDiv.appendChild(removeLoopDiv);
			
			var removeLoop = document.createElement('button');
			removeLoop.id = 'idRemoveLoop';
			removeLoop.className = 'buttonMedium';
			removeLoop.innerHTML = 'Remove<br>Loop';
			removeLoop.style.marginLeft = 'auto';
			removeLoop.style.marginRight = 'auto';
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
			designTipsContainer.id = 'idDesignTipsContainer';
			document.body.appendChild(designTipsContainer);
		
			var designDiv = document.createElement('div');
			designDiv.id = 'idDesignDiv';
			designDiv.className = 'blackContainer';
			designDiv.style.top = '215px';
			designDiv.style.right = '1%';
			designTipsContainer.appendChild(designDiv);
			
			var designLabel = document.createElement('div');
			designLabel.id = 'idDesignLabel';
			designLabel.className = 'blueInnerLabel';
			designLabel.innerHTML += '3 Tips to Save Money:';
			designDiv.appendChild(designLabel);
			
			var designTips = document.createElement('div');
			designTips.id = 'idDesignTips';
			designTips.className = 'whiteInnerSmall';
			designTips.style.width = '215px';
			designTips.innerHTML += '1)  Try regular stainless steel instead of silver.';
			designTips.style.textAlign = 'left';
			designTips.style.display = 'block';
			designDiv.appendChild(designTips);
}

function addCost() {
			var costDataContainer = document.createElement('div');
			costDataContainer.id = 'idCostDataContainer';
			costDataContainer.style.top = '1%';
			costDataContainer.style.right = '1%';
			costDataContainer.style.width = '263px';
			costDataContainer.style.position = 'absolute';
			document.body.appendChild(costDataContainer);
				
			var costOutline = document.createElement('div');
			costOutline.id = 'idCostOutline';
			costOutline.className = 'blackContainer';
			costOutline.style.borderTopRightRadius = '12px'; 
			costOutline.style.borderTopLeftRadius = '12px'; 
			costOutline.style.borderBottomLeftRadius = '0px'; 
			costOutline.style.borderBottomRightRadius = '0px'; 
			costOutline.style.MozBorderRadius = '12px';
			costOutline.style.display = 'inline-block';
			costOutline.style.textAlign = 'center';
			costOutline.style.position = 'relative';
			costDataContainer.appendChild(costOutline);
			
			var costLabel = document.createElement('div');
			costLabel.id = 'idCostLabel';
			costLabel.className = 'blueInnerLabel';
			costLabel.innerHTML += 'Price';
			costOutline.appendChild(costLabel);	
				
			var costDiv = document.createElement('div');
			costDiv.id = 'idCostDiv';
			costDiv.style.top = '100px';
			costDiv.style.right = '5px';
			costDiv.style.zIndex = '1000';
			costDiv.style.position = 'absolute'; 
			costDataContainer.appendChild(costDiv);
			
			var costData = document.createElement('div');
			costData.id = 'idCostData';
			costData.className = 'blackInnerLargeText';
			costData.innerHTML += '$15.77';
			costOutline.appendChild(costData);
			
			var dimDiv = document.createElement('div');
			dimDiv.id = 'idDimDiv';
			dimDiv.className = 'blackContainer';
			dimDiv.style.display = 'block';
			dimDiv.style.position = 'absolute';
			dimDiv.style.right = '1%';
			dimDiv.style.top = '95px';
			costDataContainer.appendChild(dimDiv);
			
			var costDim = document.createElement('div');
			costDim.id = 'idCostDim';
			costDim.className = 'whiteInnerSmall';
			costDim.innerHTML += '0.02 (h) x 0.04 (w) x 0.04 (d)<br>Dimensions in Inches';
			dimDiv.appendChild(costDim);
}

function addSave() {
			var saveButtonContainer = document.createElement('div');
			saveButtonContainer.id = 'idSaveButtonContainer';
			saveButtonContainer.style.zIndex = '900';
			saveButtonContainer.style.position = 'absolute';
			saveButtonContainer.style.bottom = '1%';
			saveButtonContainer.style.right = '1%';
			document.body.appendChild(saveButtonContainer);	
			
			var saveBackButtonContainer = document.createElement('div');
			saveBackButtonContainer.id = 'idSaveBackButtonContainer';
			saveBackButtonContainer.style.zIndex = '900';
			saveBackButtonContainer.style.position = 'relative';
			saveBackButtonContainer.style.verticalAlign = 'bottom';
			saveBackButtonContainer.style.display = 'inline-block';
			saveButtonContainer.appendChild(saveBackButtonContainer);	
			
			var backButton = document.createElement('button');
			backButton.id = 'idBackButton';
			backButton.innerHTML = 'Back';
			backButton.className = 'buttonSmall';
			backButton.style.margin = '10px 10px 16px 3px';
			backButton.style.display = 'block';
			saveBackButtonContainer.appendChild(backButton);
			
			var saveStayButton = document.createElement('button');
			saveStayButton.id = 'idSaveStayButton';
			saveStayButton.innerHTML = 'Save';
			saveStayButton.className = 'buttonSmall';
			saveStayButton.style.margin = '16px 10px 10px 3px';
			saveStayButton.style.display = 'block';
			saveBackButtonContainer.appendChild(saveStayButton);
		
			var saveButton = document.createElement('button');
			saveButton.id = 'idSaveButton';
			saveButton.innerHTML = 'Save &<br>Continue';
			saveButton.className = 'buttonLarge';
			saveButton.style.display = 'inline';
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
		progressImg.id = 'idProgressImg1';
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
		resetContainer.style.bottom = '1%';
		resetContainer.style.left = '1%';			
		resetContainer.style.zIndex = '1000';
		container.appendChild(resetContainer);
			
		var resetRotationImg = document.createElement('button');
		resetRotationImg.id = 'idResetRotationImg';
		resetRotationImg.className = 'buttonVerySmall';
		resetRotationImg.innerHTML = 'Reset Rotation';
		resetRotationImg.style.display = 'inline';
		resetRotationImg.style.margin = '0px 10px 0px 0px';
		resetContainer.appendChild(resetRotationImg);
			
		var resetShapeImg = resetRotationImg.cloneNode(true);
		resetShapeImg.id = 'idResetShapdImg';
		resetShapeImg.innerHTML = 'Reset Shape';
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
		savedShapeContainer.appendChild(savedShapeLabel);
        
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
	shapeContainer.style.top = '220px';
	shapeContainer.style.left = '1%';
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
	materialDescription.className = 'whiteInnerSmall';
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