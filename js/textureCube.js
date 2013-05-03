var TextureCube = function(){
	var r = "src/textures/cube/Bridge2/";
	var urls = [ r + "posx.jpg", r + "negx.jpg",
				 r + "posy.jpg", r + "negy.jpg",
				 r + "posz.jpg", r + "negz.jpg" ];

	this.figure = THREE.ImageUtils.loadTextureCube( urls );
	figure.format = THREE.RGBFormat;
}