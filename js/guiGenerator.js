function generatorGUI() {

	
	// Create shape generator page custom gui

			container = document.createElement('div');
			document.body.appendChild(container);
			
			
	//Container & image for reset button
	
			var resetContainer = document.createElement('div');
			resetContainer.id = 'idResetContainer';
			resetContainer.style.position = 'absolute';
			resetContainer.style.top = '220px';
			resetContainer.style.left = '1%';			
			resetContainer.style.zIndex = '1000';
			container.appendChild(resetContainer);
			
			var resetRotationImg = document.createElement('img');
			resetRotationImg.id = 'idResetRotationImg';
			resetRotationImg.className = 'buttonImg';
			resetRotationImg.style.margin = '2px 2px 0px 0px';
			resetRotationImg.src = 'assets/imgs/buttons/resetRotation.png';
			resetRotationImg.style.zIndex = '1000';
			resetContainer.appendChild(resetRotationImg);
			
			var resetShapeImg = resetRotationImg.cloneNode(true);
			resetShapeImg.id = 'idResetShapdImg';
			resetShapeImg.src = 'assets/imgs/buttons/resetShape.png';
			resetContainer.appendChild(resetShapeImg);
			

			
	// Container for shape images		
			
			var shapeContainer = document.createElement('div');
			shapeContainer.id = 'idShapeContainer';
			shapeContainer.className = 'rounded';
			shapeContainer.innerHTML += 'Shape Library<br>';
			shapeContainer.style.position = 'absolute';
			shapeContainer.style.border = '10px solid #000';
			shapeContainer.style.margin = '15 15 15 15';
			shapeContainer.style.color = '#fff';
			shapeContainer.style.background = '#000';
			shapeContainer.style.bottom = '25%';
			shapeContainer.style.left = '0.05%';	
			shapeContainer.style.width = '215px';			
			shapeContainer.style.zIndex = '1000';
			container.appendChild(shapeContainer);
			
			
			var shapeHeader = document.createElement('img');
			shapeHeader.id = 'idShapeHeader';
			shapeHeader.className = 'buttonImg';
			shapeHeader.style.margin = '5px 5px 5px 5px';
			//shapeHeader.src = 'assets/imgs/buttons/shapeLibrary.png';
			shapeHeader.style.zIndex = '1000';
			shapeContainer.appendChild(shapeHeader);
			
			
			var shapeLibrary = document.createElement('div');
			shapeLibrary.id = 'idShapeLibrary';
			shapeContainer.appendChild(shapeLibrary);

	// Shape images
		
			var s1 = document.createElement('img');
			s1.id = 'idS1';
			s1.className = 'buttonImg';
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
			
	//addSave button		
			
			addSave();
			
	//add Progress Bar
	
			addProgressBar();
			var progressImg = document.getElementById('idProgressImg');
			var progressContainer = document.getElementById('idProgressContainer');	
			progressImg.src = 'assets/imgs/progress/progress1.png';	
			progressContainer.appendChild(progressImg);			
				
}

function loopGUI() {
	
	// Create add Loop GUI

			container = document.createElement('div');
			document.body.appendChild(container);
			
	// Container for Add loop button	
			
			var loopContainer = document.createElement('div');
			loopContainer.id = 'idShapeContainer';
			loopContainer.style.position = 'absolute';
			loopContainer.style.color = '#fff';
			loopContainer.style.background = '';
			loopContainer.style.top = '35%';
			loopContainer.style.right = '0.5%';	
			loopContainer.style.width = '200px';			
			loopContainer.style.zIndex = '1000';
			container.appendChild(loopContainer);

	// Add Loop Button
		
			var loopImg = document.createElement('img');
			loopImg.id = 'idLoops';
			loopImg.className = 'buttonImg';
			loopImg.style.margin = '5px 5px 5px 5px';
			loopImg.src = 'assets/imgs/buttons/addLoop.png';
			loopImg.style.zIndex = '1000';
			loopContainer.appendChild(loopImg);
			
			var resetContainer = document.createElement('div');
			var resetRotationImg = document.createElement('img');
			resetRotationImg.id = 'idResetRotationImg';
			resetRotationImg.className = 'buttonImg';
			resetRotationImg.style.margin = '2px 2px 0px 0px';
			resetRotationImg.src = 'assets/imgs/buttons/resetRotation.png';
			resetRotationImg.style.zIndex = '1000';
			resetContainer.appendChild(resetRotationImg);
			
	// Add Save Button
		
			addSave();
			
	//add Progress Bar
	
			addProgressBar();
			var progressImg = document.getElementById('idProgressImg');	
			var progressContainer = document.getElementById('idProgressContainer');	
			progressImg.src = 'assets/imgs/progress/progress2.png';	
			progressContainer.appendChild(progressImg);	
		
}

function scaleGUI() {
	
	// Create shape generator page custom gui

			container = document.createElement('div');
			document.body.appendChild(container);
			
	// Create Positioning for ruler images		
			
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
			
	// Add ruler		
			
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
	
	// Add Save Button
		
			addSave();
			
	//add Progress Bar
	
			addProgressBar();
			var progressImg = document.getElementById('idProgressImg');	
			var progressContainer = document.getElementById('idProgressContainer');	
			progressImg.src = 'assets/imgs/progress/progress3.png';	
			progressContainer.appendChild(progressImg);	
}

function addSave() {
	
	// Add Save Button
	
			var saveButtonContainer = document.createElement('div');
			saveButtonContainer.id = 'idSaveButtonContainer';
			saveButtonContainer.style.zIndex = '1000';
			saveButtonContainer.style.position = 'absolute';
			saveButtonContainer.style.bottom = '0%';
			saveButtonContainer.style.right = '0%';
			container.appendChild(saveButtonContainer);	
		
			var saveButton = document.createElement('img');
			saveButton.id = 'idSaveButton';
			saveButton.className = 'buttonImg';
			saveButton.src = 'assets/imgs/buttons/save.png';
			saveButton.style.margin = '3px 3px 10px 10px';
			saveButtonContainer.appendChild(saveButton);
}


function addProgressBar() {
	
	//Container & image for Progress Bar
	
			var progressContainer = document.createElement('div');
			progressContainer.id = 'idProgressContainer';
			progressContainer.style.position = 'absolute';
			progressContainer.style.top = '10px';
			progressContainer.style.left = '36%';			
			progressContainer.style.zIndex = '1000';
			container.appendChild(progressContainer);
			
			var progressImg = document.createElement('img');
			progressImg.id = 'idProgressImg';
			progressImg.style.margin = '5px 5px 5px 5px';
			progressImg.src = 'assets/imgs/progress/progress3.png';
			progressImg.style.zIndex = '1000';
			progressContainer.appendChild(progressImg);	
}


// JavaScript Document