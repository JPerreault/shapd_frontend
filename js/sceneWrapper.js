var SceneWrapper = function(tMB, textureCube, tMP) {
	var fIndex;
	tubeMeshParams = tMP;
	tubeMeshBuilder = tMB;

	this.scene = new THREE.Scene();
    this.sceneCube = new SceneCubeWrapper(textureCube);

	this.camera = new THREE.PerspectiveCamera( 4, window.innerWidth / window.innerHeight, 500, 100000 );
	this.camera.position.z = 1000;

	var ambient = new THREE.AmbientLight( 0x050505 );

	directionalLight1 = new THREE.DirectionalLight( 0xffffff, 1.5 );
	directionalLight1.position.set( 2, 1.2, 10 ).normalize();
	this.scene.add( directionalLight1 );

	directionalLight2 = new THREE.DirectionalLight( 0xffffff, 2 ); 
	directionalLight2.position.set( -2, 1.2, -10 ).normalize();
	this.scene.add( directionalLight2 );

	pointLight = new THREE.PointLight( 0xffaa00, .5 );
	pointLight.position.set( 2000, 1200, 10000 );
	this.scene.add( pointLight );
	

	this.init = function(){
		if (typeof tubeMeshParams === 'undefined')
			tubeMeshParams = new TubeMeshParams();
		else
			tubeMeshParams = tMP;
			
		fIndex = tubeMeshParams['Face Index'];
		loop.faceIndexIncrementor = tubeMeshParams['Face Index Incrementor'];
		loop.torusRotation = tubeMeshParams['Torus Rotation'];
		loop.torusRotationNinety = tubeMeshParams['Torus 90 Rotations'];
		
		if (tubeMeshParams['Description'] !== '')
		{
			var nameParser = '';
			for (var i = tubeMeshParams['Description'].indexOf('in ') + 3; i < tubeMeshParams['Description'].length; i++)
			{
				nameParser += tubeMeshParams['Description'][i];
			}
			tubeMeshBuilder.officialName = nameParser;
		}
	
		this.addMesh( tubeMeshBuilder.build() );
		if (fIndex != -1)
		{
			loop.torusDefined = true;
			loop.fIndex = fIndex;
			loop.torusMesh = loop.createTorus(tubeMeshParams['Material']);
			this.redrawTorus();
		}
	};

	this.updateCameraOnWindowResize = function (){
		this.camera.aspect = (window.innerWidth /2) / (window.innerHeight/2);
		this.camera.updateProjectionMatrix();
	}

	this.rotateMesh = function(targetXRotation, targetYRotation){
		currentMesh.figure.rotation.x += (( targetXRotation - currentMesh.figure.rotation.x ) * 0.05) ;
		currentMesh.figure.rotation.y += (( targetYRotation - currentMesh.figure.rotation.y ) * 0.05) ;	

		if (loop.torusDefined)
		{
			loop.torusMesh.rotation.x += ( targetXRotation - loop.torusMesh.rotation.x) * 0.05;
			loop.torusMesh.rotation.y += ( targetYRotation - loop.torusMesh.rotation.y) * 0.05;
		}
	};

	this.renderCamera = function(mouseY){
		this.sceneCube.renderCamera(this.camera.rotation);	
	};

	this.addMesh = function(mesh){
		currentMesh = mesh;
		this.scene.add(mesh.figure);
		if (typeof screenShot !== 'undefined')
		{ 
			var yRotation = currentMesh.figure.rotation.y;
			var xRotation = currentMesh.figure.rotation.x;
			figure = currentMesh.figure;
			var outlineMaterial = new THREE.MeshBasicMaterial({color:0x000000, side: THREE.BackSide});
			
			var outlineMesh = new THREE.Mesh(figure.geometry, outlineMaterial);
			outlineMesh.rotation.x = xRotation;
			outlineMesh.rotation.y = yRotation;
			outlineMesh.position = figure.position;
			outlineMesh.scale.x = currentMesh.figure.scale.x;
			outlineMesh.scale.y = currentMesh.figure.scale.x;
			outlineMesh.scale.z = currentMesh.figure.scale.x;
			outlineMesh.scale.multiplyScalar(1.015);
			this.scene.add(outlineMesh);
			
			var outlineMesh2 = new THREE.Mesh(figure.geometry, outlineMaterial);
			outlineMesh2.rotation.x = xRotation;
			outlineMesh2.rotation.y = yRotation;
			outlineMesh2.position = figure.position;
			outlineMesh2.scale.x = currentMesh.figure.scale.x;
			outlineMesh2.scale.y = currentMesh.figure.scale.x;
			outlineMesh2.scale.z = currentMesh.figure.scale.x;
			outlineMesh2.scale.multiplyScalar(.985);
			this.scene.add(outlineMesh2);
		}
	};
	
	this.redrawFigureOnly = function()
	{
		var scale = currentMesh['Scale'];
        this.scene.remove( currentMesh.figure );
		segments = 1800;
		radiusSegments = 56;
		currentMesh = tubeMeshBuilder.build();
        this.scene.add( currentMesh.figure );

		this.updateScale(scale);
	}

	this.redrawMesh = function(newParams, isFromLib){
		if (isFromLib){
			var yRotation = newParams['Rotation Y'];
			var xRotation = newParams['Rotation X'];
		}
		else{
		var yRotation = currentMesh.figure.rotation.y;
		var xRotation = currentMesh.figure.rotation.x;
		}
		var scale = currentMesh['Scale'];
        this.scene.remove( currentMesh.figure );
		currentMesh = tubeMeshBuilder.build();

		currentMesh.figure.rotation.x = xRotation;
		currentMesh.figure.rotation.y = yRotation;	

        this.scene.add( currentMesh.figure );

		this.updateScale(scale);
		if (loop.torusDefined)
		{
			this.redrawTorus();
		}
	};
	
	this.redrawTorus = function()
	{
		this.scene.remove(loop.torusMesh);
		loop.torusMesh = loop.createTorus(currentMesh['Material']);
		
		loop.torusMesh.rotation.x = currentMesh.figure.rotation.x;
		loop.torusMesh.rotation.y = currentMesh.figure.rotation.y;
		
		this.scene.add(loop.torusMesh);
	};

    this.updateScale = function(newVal){
        currentMesh.figure.scale.set(newVal, newVal, newVal);
		currentMesh['Scale'] = newVal;
    };
	
	this.setOfficialName = function(name)
	{
		tubeMeshBuilder.officialName = name;
	}
}