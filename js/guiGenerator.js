function addCreatorSliders() {
			
			var sliderControls = document.createElement('div');
			sliderControls.id = 'shapeSlidersContainer';
			sliderControls.style.top = '3%';
			sliderControls.style.left = '1%';
			sliderControls.style.position = 'absolute';
			sliderControls.style.zIndex = '1000';
			document.body.appendChild(sliderControls);

			var creatorSliderContainer = document.createElement('div');
			creatorSliderContainer.id = 'shapeSliders';
			creatorSliderContainer.style.width = '300px';
			creatorSliderContainer.style.marginTop = '5px';
			creatorSliderContainer.style.position = 'relative';
			sliderControls.appendChild(creatorSliderContainer);
			
			var sliderContainer1 = document.createElement('div');
			sliderContainer1.id = 'idSliderContainer1';
			sliderContainer1.style.marginBottom = '5px';
			sliderContainer1.style.display = 'inline-block';
			creatorSliderContainer.appendChild(sliderContainer1);
			
			var slider1 = document.createElement('div');
			slider1.id = 'thicknessguislider';
			slider1.style.width = '180px';
			slider1.className = 'menuHeader';
			slider1.style.position = 'relative';
			slider1.style.display = 'inline-block';
			slider1.style.marginTop = '12px';
			slider1.style.marginLeft = '20px';
			slider1.style.cssFloat = 'right';
			sliderContainer1.appendChild(slider1);
			
			var sliderLabel1 = document.createElement('div');
			sliderLabel1.id = 'idSliderLabel1';
			sliderLabel1.style.color = '#fff';
			sliderLabel1.style.opacity = '0.9';
			sliderLabel1.style.fontFamily = 'Helvetica, Verdana, Geneva, sans-serif;';
			sliderLabel1.style.position = 'relative';
			sliderLabel1.textContent = 'Thickness';
			sliderLabel1.style.fontWeight = '600';
			sliderLabel1.style.width = '80px';
			sliderLabel1.className = 'blackContainer';
			sliderLabel1.style.padding = '7px';
			sliderLabel1.style.fontSize = '15px';
			sliderLabel1.style.background = '#000';
			sliderLabel1.style.display = 'inline';
			sliderLabel1.style.cssFloat = 'right';
			sliderContainer1.appendChild(sliderLabel1);
			
			
			var sliderContainer2 = sliderContainer1.cloneNode(false);
			sliderContainer2.id = 'idSliderContainer2';
			creatorSliderContainer.appendChild(sliderContainer2);
			
			var slider2 = slider1.cloneNode(true);
			slider2.id = 'depthguislider';
			sliderContainer2.appendChild(slider2);
			
			var sliderLabel2 = sliderLabel1.cloneNode(true);
			sliderLabel2.id = 'idSliderLabel2';
			sliderLabel2.textContent = 'Depth ';
			sliderContainer2.appendChild(sliderLabel2);
			
						
			var sliderContainer3 = sliderContainer1.cloneNode(false);
			sliderContainer3.id = 'idSliderContainer3';
			creatorSliderContainer.appendChild(sliderContainer3);
			
			var slider3 = slider1.cloneNode(true);
			slider3.id = 'stretchguislider';
			sliderContainer3.appendChild(slider3);
			
			var sliderLabel3 = sliderLabel1.cloneNode(true);
			sliderLabel3.id = 'idSliderLabel3';
			sliderLabel3.textContent = 'Stretch ';
			sliderContainer3.appendChild(sliderLabel3);
			

			var sliderContainer4 = sliderContainer1.cloneNode(false);
			sliderContainer4.id = 'idSliderContainer4';
			creatorSliderContainer.appendChild(sliderContainer4);
			
			var slider4 = slider1.cloneNode(true);
			slider4.id = 'modifyguislider';
			sliderContainer4.appendChild(slider4);
			
			var sliderLabel4 = sliderLabel1.cloneNode(true);
			sliderLabel4.id = 'idSliderLabel4';
			sliderLabel4.textContent = 'Modify ';
			sliderContainer4.appendChild(sliderLabel4);
			
			
			var sliderContainer5 = sliderContainer1.cloneNode(false);
			sliderContainer5.id = 'idSliderContainer5';
			creatorSliderContainer.appendChild(sliderContainer5);
			
			var slider5 = slider1.cloneNode(true);
			slider5.id = 'loopsguislider';
			sliderContainer5.appendChild(slider5);
			
			var sliderLabel5 = sliderLabel1.cloneNode(true);
			sliderLabel5.id = 'idSliderLabel3';
			sliderLabel5.textContent = 'Loops ';
			sliderContainer5.appendChild(sliderLabel5);
			
			
			var resetContainer = document.createElement('div');
			resetContainer.id = 'idResetContainer';
			resetContainer.style.position = 'absolute';
			resetContainer.style.marginLeft = '8px';
			resetContainer.style.marginTop = '10px';
			resetContainer.align = 'right';
			resetContainer.style.width = '280';			
			creatorSliderContainer.appendChild(resetContainer);
			
			var resetRotationImg = document.createElement('button');
			resetRotationImg.id = 'idResetRotationImg';
			resetRotationImg.className = 'buttonVerySmall';
			resetRotationImg.innerHTML = 'Reset Rotation';
			resetRotationImg.style.display = 'inline';
			resetRotationImg.style.margin = '0px 0px 0px 10px';
			resetContainer.appendChild(resetRotationImg);
			
			var resetShapeImg = resetRotationImg.cloneNode(true);
			resetShapeImg.id = 'idResetShapdImg';
			resetShapeImg.innerHTML = 'Reset Shape';
			resetContainer.appendChild(resetShapeImg);
}

function addFinalizeSliders() {
			var finalizeSliderContainer = document.createElement('div');
			finalizeSliderContainer.id = 'sliderContainer';
			finalizeSliderContainer.style.bottom = '1%';
			finalizeSliderContainer.style.left = '50%';
			finalizeSliderContainer.style.marginLeft = '-155px';
			finalizeSliderContainer.style.marginTop = '5px';
			finalizeSliderContainer.style.position = 'absolute';
			finalizeSliderContainer.style.zIndex = '1000';
			document.body.appendChild(finalizeSliderContainer);
			
			//Dimensions boxes

			var dimsContainer = document.createElement('div');
			dimsContainer.id = 'idDimsContainer';
			dimsContainer.style.position = 'relative';
			dimsContainer.style.display = 'block';
			finalizeSliderContainer.appendChild(dimsContainer);
				
			var hDimDiv = document.createElement('div');
			hDimDiv.id = 'idHShapeDiv';
			hDimDiv.style.position = 'relative';
			hDimDiv.className = 'rounded';
			hDimDiv.innerHTML += '<span style="font-size: 16px"><b>0.02 H</b></span><br><span style="font-size: 12px">(Inches)<span>';
			hDimDiv.style.background = '#000';
			hDimDiv.style.display = 'inline-block';
			hDimDiv.style.color = '#fff';
			hDimDiv.style.padding = '3px 3px 9px 3px';
			hDimDiv.style.marginTop = '5px';
			hDimDiv.style.marginRight = '8px';
			hDimDiv.style.marginBottom = '12px';
			hDimDiv.style.width = '90px';
			hDimDiv.style.zIndex = '1000';
			dimsContainer.appendChild(hDimDiv);
			
			var vDimDiv = hDimDiv.cloneNode(true);
			vDimDiv.id = 'idVShapeDiv';
			vDimDiv.innerHTML += '<span style="font-size: 24px"><b>0.02 W</b></span><br><span style="font-size: 14px">(Inches)<span>';
			dimsContainer.appendChild(vDimDiv);
			
			var dDimDiv = hDimDiv.cloneNode(true);
			dDimDiv.id = 'idDShapeDiv';
			dDimDiv.innerHTML += '<span style="font-size: 24px"><b>0.02 W</b></span><br><span style="font-size: 14px">(Inches)<span>';
			dimsContainer.appendChild(dDimDiv);

			//Sliders
			
			var allSlidersContainer = document.createElement('div');
			allSlidersContainer.id = 'idAllSlidersContainer';
			allSlidersContainer.style.display = 'inline-block';
			finalizeSliderContainer.appendChild(allSlidersContainer);
			
			var sliderFinalizeContainer1 = document.createElement('div');
			sliderFinalizeContainer1.id = 'idSliderFinalizeContainer1';
			sliderFinalizeContainer1.style.display = 'inline-block';
			sliderFinalizeContainer1.style.marginBottom = '3px';
			sliderFinalizeContainer1.style.verticalAlign = 'top';
			allSlidersContainer.appendChild(sliderFinalizeContainer1);
			
			var sliderFinalLabel1 = document.createElement('div');
			sliderFinalLabel1.id = 'idSliderFinalLabel1';
			sliderFinalLabel1.style.color = '#fff';
			sliderFinalLabel1.style.opacity = '0.9';
			sliderFinalLabel1.style.fontFamily = 'Helvetica, Verdana, Geneva, sans-serif;';
			sliderFinalLabel1.style.position = 'relative';
			sliderFinalLabel1.textContent = 'Scale';
			sliderFinalLabel1.style.fontWeight = '600';
			sliderFinalLabel1.style.width = '80px';
			sliderFinalLabel1.className = 'blackContainer';
			sliderFinalLabel1.style.paddingBottom = '4px';
			sliderFinalLabel1.style.paddingTop = '4px';
			sliderFinalLabel1.style.paddingRight = '7px';
			sliderFinalLabel1.style.paddingLeft = '7px';
			sliderFinalLabel1.style.fontSize = '15px';
			sliderFinalLabel1.style.marginRight = '20px';
			sliderFinalLabel1.style.background = '#000';
			sliderFinalLabel1.style.display = 'inline-block';
			sliderFinalizeContainer1.appendChild(sliderFinalLabel1);
			
			var sliderFinal1 = document.createElement('div');
			sliderFinal1.id = 'slider';
			sliderFinal1.style.width = '260px';
			sliderFinal1.className = 'menuHeader';
			sliderFinal1.style.position = 'relative';
			sliderFinal1.style.display = 'inline';
			sliderFinal1.style.marginTop = '5px';
			sliderFinal1.style.verticalAlign = 'middle';
			sliderFinal1.style.cssFloat = 'right';
			sliderFinalizeContainer1.appendChild(sliderFinal1);

			var expandedControls = document.createElement('div');
			expandedControls.id = 'thickdepthfinalize';
			expandedControls.style.width = '400px';
			allSlidersContainer.appendChild(expandedControls);
			
			var sliderFinalizeContainer2 = sliderFinalizeContainer1.cloneNode(false);
			sliderFinalizeContainer2.id = 'idSliderFinalizeContainer2';
			expandedControls.appendChild(sliderFinalizeContainer2);
			
			var sliderFinalLabel2 = sliderFinalLabel1.cloneNode(true);
			sliderFinalLabel2.id = 'idSliderFinalLabel2';
			sliderFinalLabel2.textContent = 'Thickness';
			sliderFinalizeContainer2.appendChild(sliderFinalLabel2);
			
			var sliderFinal2 = sliderFinal1.cloneNode(true);
			sliderFinal2.id = 'thickslider';
			//sliderFinal2.style.width = '160px';
			sliderFinalizeContainer2.appendChild(sliderFinal2);
							
			var sliderFinalizeContainer3 = sliderFinalizeContainer1.cloneNode(false);
			sliderFinalizeContainer3.id = 'idSliderFinalizeContainer3';
			expandedControls.appendChild(sliderFinalizeContainer3);
			
			var sliderFinalLabel3 = sliderFinalLabel1.cloneNode(true);
			sliderFinalLabel3.id = 'idSliderFinalLabel3';
			sliderFinalLabel3.textContent = 'Depth';
			sliderFinalizeContainer3.appendChild(sliderFinalLabel3);
			
			var sliderFinal3 = sliderFinal1.cloneNode(true);
			sliderFinal3.id = 'depthslider';
			//sliderFinal3.style.width = '160px';
			sliderFinalizeContainer3.appendChild(sliderFinal3);
			
			var moreOptions = document.createElement('button');
			moreOptions.id = 'idMoreOptions';
			moreOptions.className = 'buttonVerySmall';
			moreOptions.style.fontSize = '16px';
			moreOptions.style.marginTop = '5px';
			moreOptions.style.marginRight = 'auto';
			moreOptions.style.marginLeft = 'auto';
			moreOptions.innerHTML = 'More';
			//moreOptions.style.display = 'block';
			allSlidersContainer.appendChild(moreOptions);
}

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
			
			var lockLoop = document.createElement('button');
			lockLoop.id = 'idlockLoop';
			lockLoop.className = 'buttonMedium';
			lockLoop.innerHTML = 'Lock<br>Loop';
			lockLoop.style.position = 'absolute';
			lockLoop.style.zIndex = '1000';
			lockLoop.style.width = '100px';
			lockLoop.style.marginLeft = 'auto';
			lockLoop.style.marginRight = 'auto';
			lockLoop.style.right = '-15px';
			lockLoop.style.top = '-8px';
			removeLoopDiv.appendChild(lockLoop);
			
			var removeLoop = document.createElement('button');
			removeLoop.id = 'idRemoveLoop';
			removeLoop.className = 'buttonMedium';
			removeLoop.innerHTML = 'Remove<br>Loop';
			removeLoopDiv.appendChild(removeLoop);
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
			var storeButtonContainer = document.createElement('div');
			storeButtonContainer.id = 'idStoreButtonContainer';
			storeButtonContainer.style.top = '1%';
			storeButtonContainer.style.right = '1%';
			document.body.appendChild(storeButtonContainer);

			var storeShape = document.createElement('button');
			storeShape.id = 'idStoreShape';
			storeShape.className = 'buttonVerySmall';
			storeShape.style.position = 'relative';
			storeShape.innerHTML = 'Store Shape';
			storeShape.style.display = 'inline';
			storeShape.style.marginBottom = '0px';
			storeShape.style.marginLeft = '0px';
			storeShape.style.marginRight = '4px';
			storeButtonContainer.appendChild(storeShape);
		
			var loadShape = storeShape.cloneNode(true);
			loadShape.id = 'idLoadShape';
			loadShape.innerHTML = 'Load Shape';
			loadShape.style.display = 'inline';
			loadShape.style.display = 'inline';
			loadShape.style.marginTop = '10px';
			loadShape.style.marginBottom = '0px';
			loadShape.style.marginLeft = '4px';
			loadShape.style.marginRight = '0px';
			storeButtonContainer.appendChild(loadShape);
    
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
	shapeContainer.style.top = '290px';
	shapeContainer.style.left = '70px';
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
	loopText.style.bottom = '5%';
	loopText.style.left = '50%';
	loopText.style.marginLeft = '-165px';
	document.body.appendChild(loopText);
}

function addDatGui(){
	var datgui = document.createElement('div');
	datgui.id = 'datGuiStuff';
	document.body.appendChild(datgui);
}