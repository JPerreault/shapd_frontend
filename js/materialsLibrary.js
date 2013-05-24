var MaterialsLibrary = function() {
	this.textureCube = buildTextureCube();
	var mlib = {

				"Orange": 	new THREE.MeshLambertMaterial( { color: 0xff6600, ambient: 0xff2200, envMap: this.textureCube, combine: THREE.MixOperation, reflectivity: 0.3 } ),
				"Blue": 	new THREE.MeshLambertMaterial( { color: 0x001133, ambient: 0x001133, envMap: this.textureCube, combine: THREE.MixOperation, reflectivity: 0.3 } ),
				"Red": 		new THREE.MeshLambertMaterial( { color: 0x660000, ambient: 0x330000, envMap: this.textureCube, combine: THREE.MixOperation, reflectivity: 0.25 } ),
				"Black": 	new THREE.MeshLambertMaterial( { color: 0x000000, ambient: 0x000000, envMap: this.textureCube, combine: THREE.MixOperation, reflectivity: 0.15 } ),
				"White":	new THREE.MeshLambertMaterial( { color: 0xffffff, ambient: 0x666666, envMap: this.textureCube, combine: THREE.MixOperation, reflectivity: 0.25 } ),

				"Carmine": 	new THREE.MeshPhongMaterial( { color: 0x770000, specular:0xffaaaa, envMap: this.textureCube, combine: THREE.MultiplyOperation } ),
				"Gold": 	new THREE.MeshPhongMaterial( { color: 0xaa9944, specular:0xbbaa99, shininess:50, envMap: this.textureCube, combine: THREE.MultiplyOperation } ),
				"Bronze":	new THREE.MeshPhongMaterial( { color: 0x150505, specular:0xee6600, shininess:10, envMap: this.textureCube, combine: THREE.MixOperation, reflectivity: 0.25 } ),
				"Chrome": 	new THREE.MeshPhongMaterial( { color: 0xffffff, specular:0xffffff, envMap: this.textureCube, combine: THREE.Multiply } ),

				"Orange metal": new THREE.MeshLambertMaterial( { color: 0xff6600, ambient: 0xff2200, envMap: this.textureCube, combine: THREE.MultiplyOperation } ),
				"Blue metal": 	new THREE.MeshLambertMaterial( { color: 0x001133, ambient: 0x002266, envMap: this.textureCube, combine: THREE.MultiplyOperation } ),
				"Red metal": 	new THREE.MeshLambertMaterial( { color: 0x770000, envMap: this.textureCube, combine: THREE.MultiplyOperation } ),
				"Green metal": 	new THREE.MeshLambertMaterial( { color: 0x007711, envMap: this.textureCube, combine: THREE.MultiplyOperation } ),
				"Black metal":	new THREE.MeshLambertMaterial( { color: 0x222222, envMap: this.textureCube, combine: THREE.MultiplyOperation } ),

				"Pure chrome": 	new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: this.textureCube } ),
				"Dark chrome":	new THREE.MeshLambertMaterial( { color: 0x444444, envMap: this.textureCube } ),
				"Darker chrome":new THREE.MeshLambertMaterial( { color: 0x222222, envMap: this.textureCube } ),

				"Black glass": 	new THREE.MeshLambertMaterial( { color: 0x101016, envMap: this.textureCube, opacity: 0.975, transparent: true } ),
				"Dark glass":	new THREE.MeshLambertMaterial( { color: 0x101046, envMap: this.textureCube, opacity: 0.25, transparent: true } ),
				"Blue glass":	new THREE.MeshLambertMaterial( { color: 0x668899, envMap: this.textureCube, opacity: 0.75, transparent: true } ),
				"Light glass":	new THREE.MeshBasicMaterial( { color: 0x223344, envMap: this.textureCube, opacity: 0.25, transparent: true, combine: THREE.MixOperation, reflectivity: 0.25 } ),

				"Red glass":	new THREE.MeshLambertMaterial( { color: 0xff0000, opacity: 0.75, transparent: true } ),
				"Yellow glass":	new THREE.MeshLambertMaterial( { color: 0xffffaa, opacity: 0.75, transparent: true } ),
				"Orange glass":	new THREE.MeshLambertMaterial( { color: 0x995500, opacity: 0.75, transparent: true } ),

				"Orange glass 50":	new THREE.MeshLambertMaterial( { color: 0xffbb00, opacity: 0.5, transparent: true } ),
				"Red glass 50": 	new THREE.MeshLambertMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } ),

				"Fullblack rough":	new THREE.MeshLambertMaterial( { color: 0x000000 } ),
				"Black rough":		new THREE.MeshLambertMaterial( { color: 0x050505 } ),
				"Darkgray rough":	new THREE.MeshLambertMaterial( { color: 0x090909 } ),
				"Red rough":		new THREE.MeshLambertMaterial( { color: 0x330500 } ),

				"Darkgray shiny":	new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x050505 } ),
				"Gray shiny":		new THREE.MeshPhongMaterial( { color: 0x050505, shininess: 20 } )

				};
				
	this.getMaterial = function(name){
		return mlib[name];
	};
};

function buildTextureCube(){
	if (clouds == true)
	{
		var r = "src/textures/cube/skybox/";
		var urls = [ r + "px.jpg", r + "nx.jpg",
					r + "py.jpg", r + "ny.jpg",
					r + "pz.jpg", r + "nz.jpg" ];
	}
	else
	{
		var r = "src/textures/cube/Bridge2/";
		var urls = [ r + "posx.jpg", r + "negx.jpg",
					r + "posy.jpg", r + "negy.jpg",
					r + "posz.jpg", r + "negz.jpg" ];
	}

	var textureCube = THREE.ImageUtils.loadTextureCube( urls );
	textureCube.format = THREE.RGBFormat;
	return textureCube;
};