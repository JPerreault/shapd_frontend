var ProgressState = function(tubeMeshBuilder, matListener)
{
	var firstTime = true;
	this.state = 'creator';
	var that = this;
	
	this.setupInterface = function()
	{
		if (this.state == 'creator' && firstTime)
		{
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
				$("#shapeSlidersContainer").fadeOut(0);
			}
			firstTime = false;	
		}
		else if (this.state == 'creator')
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
			saveButtonClick(true);
		}
		else if (this.state == 'loops')
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
			if (loop.torusDefined == true)
				$('#idLoopRotContainer').fadeIn(450);
			if (tutorial.tutorialOn === false)
				document.addEventListener( 'mousedown', onDocumentMouseDown, false );
			tutorial.tut5();
			saveButtonClick(true);
			document.getElementById('idlockLoop').innerHTML = 'Lock<br>Loop'
		}
		else if (this.state == 'finalize')
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
			tutorial.tut7();
			currentMesh.calculateDimensions('xyz', loop.torusDefined);
			matListener.panelUpdate();
			getNewPrice();
			$( "#thickslider" ).slider( "value", currentMesh['Thickness'] );
			$( "#depthslider" ).slider( "value", currentMesh['Depth'] );
			updateThickness();
			saveButtonClick(false);
		}
		else if (this.state == 'publish')
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
	
	this.changeState = function(newState)
	{
		state = newState;
		this.state = newState;
	}
	
	document.getElementById('idBackButton').onmousedown = function()
	{
		sceneWrapper.redrawMesh(currentMesh);
		if (that.state == 'loops')
		{
			that.changeState('creator');
			that.setupInterface();
		}
		else if (that.state == 'finalize')
		{
			that.changeState('loops');
			that.setupInterface();
		}
		else if (that.state == 'publish')
		{
			that.changeState('finalize');
			that.setupInterface();
		}
	}
	
	document.getElementById('idProgressImg1').onclick = function()
	{
		if (typeof notSignedIn === 'undefined' || typeof shapeID !== 'undefined')
		{
			that.changeState('creator');
			that.setupInterface();
		}
	}
	
	document.getElementById('idProgressImg2').onclick = function()
	{
		if (typeof notSignedIn === 'undefined' || typeof shapeID !== 'undefined')
		{
			that.changeState('loops');
			that.setupInterface();
		}
	}
	
	document.getElementById('idProgressImg3').onclick = function()
	{
		if (typeof notSignedIn === 'undefined' || typeof shapeID !== 'undefined')
		{
			that.changeState('finalize');
			that.setupInterface();
			if (typeof shapeID === 'undefined')
				saveShape();
		}
	}
	
	document.getElementById('idProgressImgNamesId1').onclick = function()
	{
		if (typeof notSignedIn === 'undefined' || typeof shapeID !== 'undefined')
		{
			that.changeState('creator');
			that.setupInterface();
		}
	}
	
	document.getElementById('idProgressImgNamesId2').onclick = function()
	{
		if (typeof notSignedIn === 'undefined' || typeof shapeID !== 'undefined')
		{
			that.changeState('loops');
			that.setupInterface();
		}
	}
	
	document.getElementById('idProgressImgNamesId3').onclick = function()
	{
		if (typeof notSignedIn === 'undefined' || typeof shapeID !== 'undefined')
		{
			that.changeState('finalize');
			that.setupInterface();
			if (typeof shapeID === 'undefined')
				saveShape();
		}
	}
}