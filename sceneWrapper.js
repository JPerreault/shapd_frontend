var SceneWrapper = function() {
	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 100000 );

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

	this.updateCameraOnWindowResize = function(){
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
	};

	this.renderCamera = function(){
		var timer = -0.0002 * Date.now();

		this.camera.position.x = 1000 * Math.cos( timer );
		this.camera.position.y += ( - mouseY - this.camera.position.y ) * .05;
		this.camera.position.z = 1000 * Math.sin( timer );

		this.camera.lookAt( this.scene.position );
	};

	this.addMesh = function(mesh){
		this.scene.add(mesh);
	}
}