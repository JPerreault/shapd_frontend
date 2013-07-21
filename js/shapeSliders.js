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
				sceneWrapper.redrawMesh(sceneWrapper.currentMesh); //Had to put this line back in. 
				//Smoother effects without it, but doesn't account for loops in scene. If not in, loops appear to be floating in space.
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
	
}