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
}