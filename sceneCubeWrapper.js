var SceneCubeWrapper = function(textureCube) {
    this.scene = new THREE.Scene();
	
	var shader = THREE.ShaderLib[ "cube" ];
	shader.uniforms[ "tCube" ].value = textureCube;

	var material = new THREE.ShaderMaterial( {

		fragmentShader: shader.fragmentShader,
		vertexShader: shader.vertexShader,
		uniforms: shader.uniforms,
		depthWrite: false,
		side: THREE.BackSide

	} );

	this.scene.add( new THREE.Mesh( new THREE.CubeGeometry( 100, 100, 100 ), material ) );

	this.addLights = function(){
		var ambient = new THREE.AmbientLight( 0x050505 );
		this.scene.add( ambient );

		var directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
		directionalLight.position.set( 2, 1.2, 10 ).normalize();
		this.scene.add( directionalLight );

		directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
		directionalLight.position.set( -2, 1.2, -10 ).normalize();
		this.scene.add( directionalLight );

		var pointLight = new THREE.PointLight( 0xffaa00, 2 );
		pointLight.position.set( 2000, 1200, 10000 );
		this.scene.add( pointLight );
	}
}