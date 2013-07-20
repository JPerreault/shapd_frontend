function addSliders(tutorial, sceneWrapper)
{	
	var nostep = .0000001;
	
	$(function() {
		$( "#thickslider" ).slider({
			value: 1.5,
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
			value: 1,
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
			value: 66,
			min: 40,
			max: 175,
			step: 1,
			slide: function(event, ui){
				sceneWrapper.updateScale(ui.value/100);
				sceneWrapper.tubeMeshBuilder.calculateDimensions('xy', sceneWrapper.torusDefined);
				updateThickness();
			},
			stop: function(event, ui){
				if (tutorial.tutorialOn === true)
					tutorial.tut9();
				sceneWrapper.tubeMeshBuilder.calculateDimensions('xyz', sceneWrapper.torusDefined);
				getNewPrice();
				updateThickness();
			}
		})});	
		
	$(function() {
		$( "#thicknessguislider" ).slider({
			value: 1.5,
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
			value: 1,
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
			value: 1,
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
			value: 5,
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
			value: 2,
			min: 1,
			max: 10,
			step: 1,
			slide: function(event, ui){
				sceneWrapper.currentMesh['Loops'] = ui.value;
				sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
			}
		})});
	
}