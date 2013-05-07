var SceneWrapper = function(tMB, textureCube) {
	this.currentMesh;
	var tubeMeshBuilder = tMB;

	this.scene = new THREE.Scene();
	this.sceneCube = new SceneCubeWrapper(textureCube);

	this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 100000 );
	this.camera.position.z = 1000;

	var ambient = new THREE.AmbientLight( 0x050505 );
	this.scene.add( ambient );

	directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
	directionalLight.position.set( 2, 1.2, 10 ).normalize();
	this.scene.add( directionalLight );

	directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
	directionalLight.position.set( -2, 1.2, -10 ).normalize();
	this.scene.add( directionalLight );

	pointLight = new THREE.PointLight( 0xffaa00, 2 );
	pointLight.position.set( 2000, 1200, 10000 );
	this.scene.add( pointLight );

	this.init = function(){
		var tubeMeshParams = new TubeMeshParams();
		this.addMesh( tubeMeshBuilder.build(tubeMeshParams) );
	};

	this.updateCameraOnWindowResize = function(){
		this.camera.aspect = (window.innerWidth /2) / (window.innerHeight/2);
		this.camera.updateProjectionMatrix();
	};

	this.rotateMesh = function(targetXRotation, targetYRotation){
		this.currentMesh.figure.rotation.x += ( targetXRotation - this.currentMesh.figure.rotation.x ) * 0.05;
		this.currentMesh.figure.rotation.y += ( targetYRotation - this.currentMesh.figure.rotation.y ) * 0.05;	
	};

	this.renderCamera = function(mouseY){
		// var timer = -0.0002 * Date.now();

		// this.camera.position.x = 1000 * Math.cos( timer );
		// this.camera.position.y += ( - mouseY - this.camera.position.y ) * .05;
		// this.camera.position.z = 1000 * Math.sin( timer );

		// this.camera.lookAt( this.scene.position );

		this.sceneCube.renderCamera(this.camera.rotation);	
	};

	this.addMesh = function(mesh){
		this.currentMesh = mesh;
		this.scene.add(mesh.figure);
	};

	this.updateRadius = function(newVal){
        this.scene.remove( this.currentMesh.figure );
        var newParams = new TubeMeshParams();
        newParams.curviness = newVal;

        this.currentMesh = tubeMeshBuilder.build(newParams);
        this.scene.add( this.currentMesh.figure );
    };

    this.updateScale = function(newVal){
        this.currentMesh.figure.scale.set(newVal, newVal, newVal);
    };

    this.updateDesign = function(newVal){
        this.scene.remove( this.currentMesh.figure );
        var newParams = new TubeMeshParams();
        newParams.design = newVal;

        this.currentMesh = tubeMeshBuilder.build(newParams);
        this.scene.add( this.currentMesh.figure );
    };
	
	this.updateMorph1 = function(newVal){
        this.scene.remove( this.currentMesh.figure );

        var newParams = new TubeMeshParams();
        newParams.morph1 = newVal;

        this.currentMesh = tubeMeshBuilder.build(newParams);
        this.scene.add( this.currentMesh.figure );
    };

}