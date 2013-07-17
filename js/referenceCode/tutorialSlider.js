/*

Reference code for additional tutorial step. Removing for now, but might want in the future.

Add the following to creator controller in setupDatGui (currently line 736)

function setupDatGui(sC) {
	datGuiContainer = document.getElementById('datGuiStuff');
	
	scene = sC;
	gui = new dat.GUI({ autoPlace: false });

	var currentMesh = scene.currentMesh;
	
	var setUpController = function(controller, fieldName){
		controller.onChange(function(newVal){
			currentMesh[fieldName] = newVal;
			this.color = [ 0, 128, 225];
			scene.redrawMesh(currentMesh);

			if (tutorial.tutorialOn && tutorial.controllerMoved === 0)
			{
				if (fieldName ==='Modify' || fieldName === 'Loops')
					changedModify += Math.abs(2 - currentMesh['Loops']) + Math.abs(5 - currentMesh['Modify']);
					console.log(changedModify);
					//console.log
				if (changedModify >= 30 && changedModify < 100)
				{
					tutorial.tut4()
					changedModify = 100;
				}
					currentMesh['Modify'] = sceneWrapper.currentMesh['Modify'];
					currentMesh['Loops'] = sceneWrapper.currentMesh['Loops'];
					gui.__folders['Shape Alteration'].__controllers[0].updateDisplay();
					gui.__folders['Shape Alteration'].__controllers[1].updateDisplay();
			}
		});
	};





Then, add the following to tutorial.js


this.tut4 = function() {
		
		clearHighlights();
		document.addEventListener( 'mouseup', releaseSlider, false );
		function releaseSlider( event ) 
		{
			fadeOut(fout);
			highlight = 'idSaveButtonContainer';
			var tut = 'Neat, huh?<br><br>When you find a shape you like, save and go to the next step.<br><br><button id = "okay" class="tutButton buttonImg">Okay!</button><br><img src = "assets/imgs/misc/arrowWhiteDown.png">';
			var d1 = generateTutorialMsg(tut, 270, highlight);
			fout = d1;
			
			this.controllerMoved++;
			slideDownCustBotR(d1, '310px', '170px');
			
			document.getElementById('okay').onclick = function()
			{
				fadeOut(fout);
			}	
			document.removeEventListener( 'mouseup', releaseSlider, false );
		}
	}



*/