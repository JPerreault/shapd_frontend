function addSliders(tutorial, sceneWrapper)
{	
	var nostep = .0000001;
	
	$(function() {
		$( "#thickslider" ).slider({
			value: sceneWrapper.currentMesh['Thickness'],
			min: .5,
			max: 5,
			step: nostep,
			slide: function(event, ui){
				sceneWrapper.currentMesh['Thickness'] = ui.value;
				sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
				sceneWrapper.tubeMeshBuilder.calculateDimensions('xy', sceneWrapper.torusDefined);
				updateThickness(true);
			},
			stop: function(event, ui){
				sceneWrapper.tubeMeshBuilder.calculateDimensions('xyz', sceneWrapper.torusDefined);
				getNewPrice();
				updateThickness();
				$( "#thicknessguislider" ).slider( "value", ui.value );
			}
		})});
		
	$(function() {
		$( "#depthslider" ).slider({
			value: sceneWrapper.currentMesh['Depth'],
			min: .0005,
			max: 2,
			step: nostep,
			slide: function(event, ui){
				sceneWrapper.currentMesh['Depth'] = ui.value;
				sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
				sceneWrapper.tubeMeshBuilder.calculateDimensions('xy', sceneWrapper.torusDefined);
				updateThickness();
			},
			stop: function(event, ui){
				sceneWrapper.tubeMeshBuilder.calculateDimensions('xyz', sceneWrapper.torusDefined);
				getNewPrice();
				updateThickness();
				$( "#depthguislider" ).slider( "value", ui.value );
			}
		})});
	
	$(function() {
		$( "#slider" ).slider({
			value: (sceneWrapper.currentMesh['Scale'])*100,
			min: 40,
			max: 175,
			step: 1,
			slide: function(event, ui){
				sceneWrapper.updateScale(ui.value/100);
				sceneWrapper.tubeMeshBuilder.calculateDimensions('xy', sceneWrapper.torusDefined);
				if (sceneWrapper.torusDefined)
					sceneWrapper.redrawTorus();
				updateThickness();
			},
			stop: function(event, ui){
				if (tutorial.tutorialOn === true)
					tutorial.tut9();
				sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
				sceneWrapper.tubeMeshBuilder.calculateDimensions('xyz', sceneWrapper.torusDefined);
				getNewPrice();
				updateThickness();
			}
		})});	
		
	$(function() {
		$( "#thicknessguislider" ).slider({
			value: sceneWrapper.currentMesh['Thickness'],
			min: .5,
			max: 5,
			step: nostep,
			slide: function(event, ui){
				sceneWrapper.currentMesh['Thickness'] = ui.value;
				sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
			}
		})});
		
		$(function() {
		$( "#depthguislider" ).slider({
			value: sceneWrapper.currentMesh['Depth'],
			min: .0005,
			max: 2,
			step: nostep,
			slide: function(event, ui){
				sceneWrapper.currentMesh['Depth'] = ui.value;
				sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
			}
		})});
		
		$(function() {
		$( "#stretchguislider" ).slider({
			value: sceneWrapper.currentMesh['Stretch'],
			min: .00005,
			max: 1.75,
			step: nostep,
			slide: function(event, ui){
				sceneWrapper.currentMesh['Stretch'] = ui.value;
				sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
			}
		})});
		
		$(function() {
		$( "#modifyguislider" ).slider({
			value: sceneWrapper.currentMesh['Modify'],
			min: 1,
			max: 10,
			step: 1,
			slide: function(event, ui){
				sceneWrapper.currentMesh['Modify'] = ui.value;
				sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
			}
		})});
		
		$(function() {
		$( "#loopsguislider" ).slider({
			value: sceneWrapper.currentMesh['Loops'],
			min: 1,
			max: 10,
			step: 1,
			slide: function(event, ui){
				sceneWrapper.currentMesh['Loops'] = ui.value;
				sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
			}
		})});
		
	// var guiSlidersContainer = document.createElement('div');
	// guiSlidersContainer.id = 'shapeSliders';
	// guiSlidersContainer.style.zIndex = '1000';
	// guiSlidersContainer.style.position = 'absolute';
	// guiSlidersContainer.style.top = '0%';
	// guiSlidersContainer.style.let = '0%';
	// document.body.appendChild(guiSlidersContainer);	
	
	// var thickSlider = document.createElement('div');
	// thickSlider.id = 'thicknessguislider';
	// thickSlider.className = 'menuHeader';
	// guiSlidersContainer.appendChild(thickSlider);
	
	var shapeContainer = document.getElementById('shapeSlidersContainer');
	
	var storeShape = document.createElement('button');
	storeShape.id = 'idStoreShape';
	storeShape.className = 'buttonVerySmall';
	storeShape.innerHTML = 'Store Shape';
	storeShape.style.display = 'inline';
	storeShape.style.margin = '0px 10px 0px 0px';
	storeShape.style.bottom = '0px';
	shapeContainer.appendChild(storeShape);
		
	var loadShape = storeShape.cloneNode(true);
	loadShape.id = 'idLoadShape';
	loadShape.innerHTML = 'Load Shape';
	storeShape.style.right = '100%';
	shapeContainer.appendChild(loadShape);
	
	$("#shapeSlidersContainer").fadeIn(450);
	
	var finalizeContainer = document.getElementById('sliderContainer');
	var moreOptions = document.createElement('button');
	moreOptions.id = 'idMoreOptions';
	moreOptions.className = 'buttonVerySmall';
	moreOptions.innerHTML = 'More';
	moreOptions.style.display = 'inline';
	moreOptions.style.margin = '0px 10px 0px 0px';
	moreOptions.style.bottom = '0px';
	finalizeContainer.appendChild(moreOptions);
}