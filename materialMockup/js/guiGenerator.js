function generatorGUI() {
	
	// Create shape generator page custom gui

			
			
			
	//Container & image for reset button
	
			var resetContainer = document.createElement('div');
			resetContainer.id = 'idResetContainer';
			resetContainer.style.position = 'absolute';
			resetContainer.style.top = '275px';
			resetContainer.style.left = '0.5%';			
			resetContainer.style.zIndex = '1000';
			resetContainer.style.display = 'inline-block';
			container.appendChild(resetContainer);
			
			var resetRotationImg = document.createElement('img');
			resetRotationImg.id = 'idResetRotationImg';
			resetRotationImg.style.margin = '5px 5px 5px 5px';
			resetRotationImg.src = 'assets/imgs/buttons/resetRotation.png';
			resetRotationImg.style.zIndex = '1000';
			resetContainer.appendChild(resetRotationImg);
			
			var resetShapeImg = document.createElement('img');
			resetShapeImg.id = 'idResetShapdImg';
			resetShapeImg.style.margin = '5px 5px 5px 5px';
			resetShapeImg.src = 'assets/imgs/buttons/resetShape.png';
			resetShapeImg.style.zIndex = '1000';
			resetContainer.appendChild(resetShapeImg);
			
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
			
	// Container for shape images		
			
			var shapeContainer = document.createElement('div');
			shapeContainer.id = 'idShapeContainer';
			shapeContainer.innerHTML += 'Shapes<br>';
			shapeContainer.style.position = 'absolute';
			shapeContainer.style.border = '1px solid #000';
			shapeContainer.style.color = '#fff';
			shapeContainer.style.background = '';
			shapeContainer.style.bottom = '25%';
			shapeContainer.style.left = '0.5%';	
			shapeContainer.style.width = '200px';			
			shapeContainer.style.zIndex = '1000';
			container.appendChild(shapeContainer);

	// Shape images
		
			var s1 = document.createElement('img');
			s1.id = 'idS1';
			s1.style.margin = '5px 5px 5px 5px';
			s1.src = 'assets/imgs/shapes/1.jpg';
			s1.style.cursor = 'move';
			s1.style.zIndex = '1000';
			shapeContainer.appendChild(s1);
			
			var s2 = s1.cloneNode(true);
			s2.id = 'idS2';
			s2.src = 'assets/imgs/shapes/2.jpg'
			shapeContainer.appendChild(s2);
	
			var s3 = s1.cloneNode(true);
			s3.id = 'idS3';
			s3.src = 'assets/imgs/shapes/3.jpg'
			shapeContainer.appendChild(s3);
			
			var s4 = s1.cloneNode(true);
			s4.id = 'idS4';
			s4.src = 'assets/imgs/shapes/4.jpg'
			shapeContainer.appendChild(s4);
				
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
		
			var s1 = document.createElement('img');
			s1.id = 'idS1';
			s1.style.margin = '5px 5px 5px 5px';
			s1.src = 'assets/imgs/addLoop.png';
			s1.style.cursor = 'move';
			s1.style.zIndex = '1000';
			loopContainer.appendChild(s1);
			
	// Add Save Button
		
			var saveButton = document.createElement('img');
			saveButton.id = 'idSaveButton';
			saveButton.style.margin = '5px 5px 5px 5px';
			saveButton.src = 'assets/imgs/save.png';
			saveButton.style.cursor = 'move';
			saveButton.style.zIndex = '1000';
			loopContainer.appendChild(saveButton);
		
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
			hRulerImg.src = 'assets/imgs/hRuler2.png';
			hRulerImg.style.position = 'absolute';
			hRulerImg.style.cursor = 'move';
			hRulerImg.style.zIndex = '1000';
			hShapeDiv.appendChild(hRulerImg);
			
			var vRulerImg = document.createElement('img');
			vRulerImg.id = 'idVRuler';
			vRulerImg.style.marginTop = '5px';
			vRulerImg.src = 'assets/imgs/vRuler2.png';
			vRulerImg.style.position = 'absolute';
			vRulerImg.style.cursor = 'move';
			vRulerImg.style.zIndex = '1000';
			vShapeDiv.appendChild(vRulerImg);
	
	
}

// Add sound interface here - look at Generator21.html under sandbox for working implementation. Added sounds to folder. 