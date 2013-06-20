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
				"Bronze chrome":new THREE.MeshLambertMaterial( { color: 0x989898, envMap: this.textureCube } ),

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
				"Gray shiny":		new THREE.MeshPhongMaterial( { color: 0x050505, shininess: 20 } ),
				
				//Start of our materials
				
				"Alumide regular":  new THREE.MeshLambertMaterial({color: 0xEDEDED, map: THREE.ImageUtils.loadTexture('textures/roughmetal.jpg'),  shading: THREE.FlatShading}),
				"Alumide polished":	new THREE.MeshLambertMaterial({color: 0xEDEDED, map: THREE.ImageUtils.loadTexture('textures/glossymetal.jpg'), shading: THREE.FlatShading}),
				
				"Plastic regular white": 			new THREE.MeshLambertMaterial({color: 0xFAFFFF, map: THREE.ImageUtils.loadTexture('textures/sandy.jpg'), 			shading: THREE.FlatShading}),
				"Plastic regular black": 			new THREE.MeshLambertMaterial({color: 0x5C5C5C, map: THREE.ImageUtils.loadTexture('textures/streaky.png'), 			shading: THREE.FlatShading}),
				"Plastic regular white polished": 	new THREE.MeshLambertMaterial({color: 0xffffff, map: THREE.ImageUtils.loadTexture('textures/polishedplastic.png'), 	shading: THREE.FlatShading}),
				"Plastic regular red polished": 	new THREE.MeshLambertMaterial({color: 0xFF4040, map: THREE.ImageUtils.loadTexture('textures/polishedplastic.png'), 	shading: THREE.FlatShading}),
				"Plastic regular purple polished":	new THREE.MeshLambertMaterial({color: 0x6A2885, map: THREE.ImageUtils.loadTexture('textures/polishedplastic.png'), 	shading: THREE.FlatShading}),
				"Plastic regular pink polished":	new THREE.MeshLambertMaterial({color: 0xff69b4, map: THREE.ImageUtils.loadTexture('textures/polishedplastic.png'), 	shading: THREE.FlatShading}),
				"Plastic regular blue polished": 	new THREE.MeshLambertMaterial({color: 0x4169E1, map: THREE.ImageUtils.loadTexture('textures/polishedplastic.png'), 	shading: THREE.FlatShading}),
				
				"Plastic detail white": new THREE.MeshLambertMaterial({color: 0xE3E3E3, map: THREE.ImageUtils.loadTexture('textures/lighttexture.png'), shading: THREE.FlatShading}),
				"Plastic detail black": new THREE.MeshLambertMaterial({color: 0x757575, map: THREE.ImageUtils.loadTexture('textures/blackdetail.jpg'),  shading: THREE.FlatShading}),
				
				"Stainless steel regular":			new THREE.MeshLambertMaterial({color: 0xffffff, map: THREE.ImageUtils.loadTexture('textures/roughmetal.jpg'), shading: THREE.FlatShading}),
				"Stainless steel medieval pewter":	new THREE.MeshLambertMaterial({color: 0xc2c2c2, map: THREE.ImageUtils.loadTexture('textures/roughmetal.jpg'), shading: THREE.FlatShading}),
				
				"Stainless steel bronze matte": 	new THREE.MeshLambertMaterial({color: 0x8C6D45, map: THREE.ImageUtils.loadTexture('textures/bronzematte.jpg'), shading: THREE.FlatShading}),
				"Stainless steel bronze glossy":	new THREE.MeshLambertMaterial({color: 0xB08A58, map: THREE.ImageUtils.loadTexture('textures/glossymetal.jpg'), shading: THREE.FlatShading}),
				
				"Stainless steel gold matte": 	new THREE.MeshLambertMaterial({color: 0xF5BC5B, map: THREE.ImageUtils.loadTexture('textures/roughmetal.jpg'),  shading: THREE.FlatShading}),
				"Stainless steel gold glossy": 	new THREE.MeshLambertMaterial({color: 0xF5C969, map: THREE.ImageUtils.loadTexture('textures/glossymetal.jpg'), shading: THREE.FlatShading}),
				
				"Silver regular": 	new THREE.MeshLambertMaterial({color: 0xE3E3E3, map: THREE.ImageUtils.loadTexture('textures/glossymetal.jpg'),  shading: THREE.FlatShading}),
				"Silver glossy": 	new THREE.MeshLambertMaterial({color: 0xffffff, map: THREE.ImageUtils.loadTexture('textures/glossysilver.png'), shading: THREE.FlatShading}),
				"Silver premium": 	new THREE.MeshLambertMaterial({color: 0xffffff, map: THREE.ImageUtils.loadTexture('textures/lighttexture.png'), envMap: this.textureCube, shininess: 100, reflectivity: .45}),
				"Gold regular": 	new THREE.MeshLambertMaterial({color: 0xFFEFA8, map: THREE.ImageUtils.loadTexture('textures/lighttexture.png'), envMap: this.textureCube}),
				
				"Titanium unpolished":	new THREE.MeshLambertMaterial({color: 0xD6D6D6, map: THREE.ImageUtils.loadTexture('textures/unpolishedtitanium.jpg'), shading: THREE.FlatShading}),
				"Titanium polished": 	new THREE.MeshLambertMaterial({color: 0xffffff, map: THREE.ImageUtils.loadTexture('textures/lighttexture.png'), envMap: this.textureCube, reflectivity: .55}),
				
				"Transparent resin white": 	new THREE.MeshLambertMaterial({color: 0xC2E6ED, opacity: .65, transparent: true}),
				"Transparent resin black": 	new THREE.MeshLambertMaterial({color: 0x2E2E2E, opacity: .65, transparent: true}),
				"Transparent resin red": 	new THREE.MeshLambertMaterial({color: 0xA31212, opacity: .65, transparent: true}),
				"Transparent resin blue": 	new THREE.MeshLambertMaterial({color: 0x101991, opacity: .65, transparent: true}),
				"Transparent resin green": 	new THREE.MeshLambertMaterial({color: 0x31870F, opacity: .65, transparent: true}),
				"Transparent resin gray": 	new THREE.MeshLambertMaterial({color: 0xA3A3A3, opacity: .65, transparent: true}),
				"Transparent resin yellow": new THREE.MeshLambertMaterial({color: 0xFFFF00, opacity: .65, transparent: true}),
				"Transparent resin orange": new THREE.MeshLambertMaterial({color: 0xEB6B26, opacity: .65, transparent: true}),
				"Transparent resin brown": 	new THREE.MeshLambertMaterial({color: 0x80662A, opacity: .65, transparent: true}),
				
				"Brass regular": 				new THREE.MeshLambertMaterial({color: 0x967133, map: THREE.ImageUtils.loadTexture('textures/lighttexture.png'), shading: THREE.FlatShading}),
				"Brass gold plated polished": 	new THREE.MeshLambertMaterial({color: 0xFFEA8C, map: THREE.ImageUtils.loadTexture('textures/lighttexture.png'), envMap: this.textureCube}),
	};
				
	this.getMaterial = function(name){
		return mlib[name];
	};
};

function buildTextureCube(){
	if (n%2 == 0)
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