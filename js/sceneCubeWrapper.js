var SceneCubeWrapper = function(textureCube) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 100000 );
	
	var shader = THREE.ShaderLib[ "cube" ];
	shader.uniforms[ "tCube" ].value = textureCube;

    if (typeof screenShot === 'undefined')
    {
	var material = new THREE.ShaderMaterial( {

		fragmentShader: shader.fragmentShader,
		vertexShader: shader.vertexShader,
		uniforms: shader.uniforms,
		depthWrite: false,
		side: THREE.BackSide

	} );
    }
    else
    {
        var material = new THREE.ShaderMaterial( {
                                                
                                                fragmentShader: shader.fragmentShader,
                                                vertexShader: shader.vertexShader,
                                                uniforms: shader.uniforms,
                                                depthWrite: false,
                                                
                                                } );
    }

	this.scene.add( new THREE.Mesh( new THREE.CubeGeometry( 100, 100, 100 ), material ) );

	this.updateCameraOnWindowResize = function(){
		this.camera.aspect = (window.innerWidth/2) / (window.innerHeight/2);
		this.camera.updateProjectionMatrix();
	};

	this.renderCamera = function(sceneCameraRotation){
		this.camera.rotation.copy( sceneCameraRotation );
	};
}