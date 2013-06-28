var SceneWrapper = function(tMB, textureCube, tMP) {
	this.currentMesh;
	this.torusMesh;
	this.torusDefined = false;
	this.tubeMeshParams = tMP;
	var tubeMeshBuilder = tMB;

	this.scene = new THREE.Scene();
	this.sceneCube = new SceneCubeWrapper(textureCube);

	this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 100000 );
	this.camera.position.z = 1000;

	var ambient = new THREE.AmbientLight( 0x050505 );
	this.scene.add( ambient );

	if (n%2 == 0) //Cloud scene
	{
		directionalLight1 = new THREE.DirectionalLight( 0xffffff, 1.5 ); 
		directionalLight1.position.set( 2, 1.2, 10 ).normalize();
		this.scene.add( directionalLight1 );

		directionalLight2 = new THREE.DirectionalLight( 0xffffff, 2 ); 
		directionalLight2.position.set( -2, 1.2, -10 ).normalize();
		this.scene.add( directionalLight2 );

		pointLight = new THREE.PointLight( 0xffaa00, .5 );
		pointLight.position.set( 2000, 1200, 10000 );
		this.scene.add( pointLight );
	}
	
	else
	{
		this.scene.remove(directionalLight1);
		this.scene.remove(directionalLight2);
		this.scene.remove(pointLight);
		
		directionalLight1 = new THREE.DirectionalLight( 0xffffff, 2 );
		directionalLight1.position.set( 2, 1.2, 10 ).normalize();
		this.scene.add( directionalLight1 );

		directionalLight2 = new THREE.DirectionalLight( 0xffffff, 1 );
		directionalLight2.position.set( -2, 1.2, -10 ).normalize();
		this.scene.add( directionalLight2 );
	
		pointLight = new THREE.PointLight( 0xffaa00, 2 ); 
		pointLight.position.set( 2000, 1200, 10000 );
		this.scene.add( pointLight );
	}

	this.init = function(){
		if (typeof this.tubeMeshParams === 'undefined')
			this.tubeMeshParams = new TubeMeshParams();
		else
			this.tubeMeshParams = tMP;
		this.addMesh( tubeMeshBuilder.build(this.tubeMeshParams) );
		if (typeof tubeMeshBuilder.fIndex != 'undefined')
		{
			this.torusDefined = true;
			this.addToMesh(tubeMeshBuilder.createTorus());
		}
	};

	this.updateCameraOnWindowResize = function (){
		this.camera.aspect = (window.innerWidth /2) / (window.innerHeight/2);
		this.camera.updateProjectionMatrix();
	}

	this.rotateMesh = function(targetXRotation, targetYRotation){
		this.currentMesh.figure.rotation.x += (( targetXRotation - this.currentMesh.figure.rotation.x ) * 0.05);
		this.currentMesh.figure.rotation.y += (( targetYRotation - this.currentMesh.figure.rotation.y ) * 0.05);	

		
		if (this.torusDefined)
		{
			this.torusMesh.rotation.x += ( targetXRotation - this.torusMesh.rotation.x) * 0.05;
			this.torusMesh.rotation.y += ( targetYRotation - this.torusMesh.rotation.y) * 0.05;
		}
	};

	this.renderCamera = function(mouseY){
		this.sceneCube.renderCamera(this.camera.rotation);	
	};

	this.addMesh = function(mesh){
		this.currentMesh = mesh;
		this.scene.add(mesh.figure);
		if (typeof screenShot !== 'undefined')
		{ 
			var yRotation = this.currentMesh.figure.rotation.y;
			var xRotation = this.currentMesh.figure.rotation.x;
			figure = this.currentMesh.figure;
			var outlineMaterial = new THREE.MeshBasicMaterial({color:0x000000, side: THREE.BackSide});
			
			var outlineMesh = new THREE.Mesh(figure.geometry, outlineMaterial);
			outlineMesh.rotation.x = xRotation;
			outlineMesh.rotation.y = yRotation;
			outlineMesh.position = figure.position;
			outlineMesh.scale.x = this.currentMesh.figure.scale.x;
			outlineMesh.scale.y = this.currentMesh.figure.scale.x;
			outlineMesh.scale.z = this.currentMesh.figure.scale.x;
			outlineMesh.scale.multiplyScalar(1.015);
			this.scene.add(outlineMesh);
			
			var outlineMesh2 = new THREE.Mesh(figure.geometry, outlineMaterial);
			outlineMesh2.rotation.x = xRotation;
			outlineMesh2.rotation.y = yRotation;
			outlineMesh2.position = figure.position;
			outlineMesh2.scale.x = this.currentMesh.figure.scale.x;
			outlineMesh2.scale.y = this.currentMesh.figure.scale.x;
			outlineMesh2.scale.z = this.currentMesh.figure.scale.x;
			outlineMesh2.scale.multiplyScalar(.985);
			this.scene.add(outlineMesh2);
		}
	};

	this.redrawMesh = function(newParams){
		var yRotation = this.currentMesh.figure.rotation.y;
		var xRotation = this.currentMesh.figure.rotation.x;
		var scale = this.currentMesh.figure.scale.x;

        this.scene.remove( this.currentMesh.figure );
		this.currentMesh = tubeMeshBuilder.build(newParams);

		this.currentMesh.figure.rotation.x = xRotation;
		this.currentMesh.figure.rotation.y = yRotation;	

        this.scene.add( this.currentMesh.figure );
		
		if (this.torusDefined)
		{
			this.scene.remove(this.torusMesh);
			this.torusMesh = tubeMeshBuilder.createTorus(this.currentMesh);
			
			this.torusMesh.rotation.x = xRotation;
			this.torusMesh.rotation.y = yRotation;
			
			this.scene.add(this.torusMesh);
		}
		this.updateScale(scale);
	};

    this.updateScale = function(newVal){
        this.currentMesh.figure.scale.set(newVal, newVal, newVal);
		if (this.torusDefined)
		{
			this.torusMesh.scale.set(newVal, newVal, newVal);
		}
    };
}