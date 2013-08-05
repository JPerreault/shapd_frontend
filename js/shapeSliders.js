function addSliders(tutorial, sceneWrapper)
{	
	var nostep = .0000001;
	var notSlid = true;
	
	$(function() {
		$( "#thickslider" ).slider({
			value: currentMesh['Thickness'],
			min: .5,
			max: 5,
			step: nostep,
			slide: function(event, ui){
				currentMesh['Thickness'] = ui.value;
				sceneWrapper.redrawMesh(currentMesh);
				currentMesh.calculateDimensions('xy', loop.torusDefined);
				updateThickness(true);
			},
			stop: function(event, ui){
				currentMesh.calculateDimensions('xyz', loop.torusDefined);
				getNewPrice();
				updateThickness();
				$( "#thicknessguislider" ).slider( "value", ui.value );
			}
		})});
		
	$(function() {
		$( "#depthslider" ).slider({
			value: currentMesh['Depth'],
			min: .0005,
			max: 2,
			step: nostep,
			slide: function(event, ui){
				currentMesh['Depth'] = ui.value;
				sceneWrapper.redrawMesh(currentMesh);
				currentMesh.calculateDimensions('xy', loop.torusDefined);
				updateThickness();
			},
			stop: function(event, ui){
				currentMesh.calculateDimensions('xyz', loop.torusDefined);
				getNewPrice();
				updateThickness();
				$( "#depthguislider" ).slider( "value", ui.value );
			}
		})});
	
	$(function() {
		$( "#slider" ).slider({
			value: (currentMesh['Scale'])*100,
			min: 40,
			max: 175,
			step: 1,
			slide: function(event, ui){
				sceneWrapper.updateScale(ui.value/100);
				currentMesh.calculateDimensions('xy', loop.torusDefined);
				if (loop.torusDefined)
					sceneWrapper.redrawTorus();
				updateThickness(true);
			},
			stop: function(event, ui){
				if (tutorial.tutorialOn === true && notSlid)
				{
					tutorial.tut9();
					notSlid = false;
				}
				sceneWrapper.redrawMesh(currentMesh);
				currentMesh.calculateDimensions('xyz', loop.torusDefined);
				getNewPrice();
				updateThickness();
			}
		})});	
		
	$(function() {
		$( "#thicknessguislider" ).slider({
			value: currentMesh['Thickness'],
			min: .5,
			max: 5,
			step: nostep,
			slide: function(event, ui){
				currentMesh['Thickness'] = ui.value;
				sceneWrapper.redrawMesh(currentMesh);
			}
		})});
		
		$(function() {
		$( "#depthguislider" ).slider({
			value: currentMesh['Depth'],
			min: .0005,
			max: 2,
			step: nostep,
			slide: function(event, ui){
				currentMesh['Depth'] = ui.value;
				sceneWrapper.redrawMesh(currentMesh);
			}
		})});
		
		$(function() {
		$( "#stretchguislider" ).slider({
			value: currentMesh['Stretch'],
			min: .00005,
			max: 1.75,
			step: nostep,
			slide: function(event, ui){
				currentMesh['Stretch'] = ui.value;
				sceneWrapper.redrawMesh(currentMesh);
			}
		})});
		
		$(function() {
		$( "#modifyguislider" ).slider({
			value: currentMesh['Modify'],
			min: 1,
			max: 10,
			step: 1,
			slide: function(event, ui){
				currentMesh['Modify'] = ui.value;
				sceneWrapper.redrawMesh(currentMesh);
			}
		})});
		
		$(function() {
		$( "#loopsguislider" ).slider({
			value: currentMesh['Loops'],
			min: 1,
			max: 10,
			step: 1,
			slide: function(event, ui){
				currentMesh['Loops'] = ui.value;
				sceneWrapper.redrawMesh(currentMesh);
			}
		})});
	
}