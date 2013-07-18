/*


Reference code - old asssets created to display ruler overlays in the GUI.
Decided not to use but might again in the future

Just add this to guiGenerator.js, and call it in creatorController as you would the other functions.

function scaleGUI() {
			var dimContainer = document.createElement('div');
			dimContainer.id = 'idDimContainer';
			document.body.appendChild(dimContainer);
				
			var hShapeDiv = document.createElement('div');
			hShapeDiv.id = 'idHShapeDiv';
			hShapeDiv.style.position = 'absolute';
			hShapeDiv.style.bottom = '25%';
			hShapeDiv.style.width = '50%';
			hShapeDiv.style.right = '40%';
			hShapeDiv.style.zIndex = '1000';
			dimContainer.appendChild(hShapeDiv);
			
			var vShapeDiv = document.createElement('div');
			vShapeDiv.id = 'idVShapeDiv';
			vShapeDiv.style.position = 'absolute';
			vShapeDiv.style.color = '#000';
			vShapeDiv.style.top = '20%';
			vShapeDiv.style.right = '32.5%';
			vShapeDiv.style.display = 'inline-block';
			vShapeDiv.style.zIndex = '1000';
			dimContainer.appendChild(vShapeDiv);
	
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
			vRulerImg.style.display = 'inline-block';
			vRulerImg.style.cursor = 'move';
			vRulerImg.style.zIndex = '1000';
			vShapeDiv.appendChild(vRulerImg);
}
*/