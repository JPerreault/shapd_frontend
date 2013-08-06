var MaterialsLibrary = function() {
	this.reflectCube = buildreflectCube();
    this.textureCube = buildWhiteBox();
	var mlib = {
				"Alumide regular":  new THREE.MeshLambertMaterial({color: 0xB4BECF, map: createGrainyTexture(4, 4),  shading: THREE.FlatShading}),
				"Alumide polished":	new THREE.MeshLambertMaterial({color: 0xB4BECF, map: createGrainyTexture(12.5, 12.5), shading: THREE.FlatShading}),
				
				"Plastic regular white": 			new THREE.MeshLambertMaterial({color: 0xEBEFFF, map: createGrainyTexture(2, 2), shading: THREE.FlatShading}),
				"Plastic regular black": 			new THREE.MeshLambertMaterial({color: 0x666666, map: createGrainyTexture(2, 2), shading: THREE.FlatShading}),
				"Plastic regular white polished": 	new THREE.MeshLambertMaterial({color: 0xEBEFFF, map: createGrainyTexture(4, 4), shading: THREE.FlatShading}),
				"Plastic regular red polished": 	new THREE.MeshLambertMaterial({color: 0xE03838, map: createGrainyTexture(4, 4), shading: THREE.FlatShading}),
				"Plastic regular purple polished":	new THREE.MeshLambertMaterial({color: 0x7C2F9C, map: createGrainyTexture(4, 4), shading: THREE.FlatShading}),
				"Plastic regular pink polished":	new THREE.MeshLambertMaterial({color: 0xFF75CA, map: createGrainyTexture(4, 4), shading: THREE.FlatShading}),
				"Plastic regular blue polished": 	new THREE.MeshLambertMaterial({color: 0x4A77FF, map: createGrainyTexture(4, 4), shading: THREE.FlatShading}),
				
				"Plastic detail white": new THREE.MeshLambertMaterial({color: 0xF2EDF1, map: createGrainyTexture(10, 10)}),
				"Plastic detail black": new THREE.MeshLambertMaterial({color: 0x595959, map: createGrainyTexture(2, 2)}),
				
				"Prime gray": new THREE.MeshLambertMaterial({color: 0x717780}),
				
				"Stainless steel regular":			new THREE.MeshLambertMaterial({color: 0xD3DBE8, map: createGrainyTexture(2, 2),  shading: THREE.FlatShading}),
				
				"Stainless steel bronze matte": 	new THREE.MeshLambertMaterial({color: 0x7D570C, map: createGrainyTexture(4, 4), envMap: this.reflectCube,  shininess: 100, reflectivity: .75}),
				"Stainless steel bronze glossy":	new THREE.MeshLambertMaterial({color: 0x7D480C, map: createGrainyTexture(2, 2), envMap: this.reflectCube,  shininess: 100, reflectivity: .75}),
				
				"Stainless steel gold matte": 	new THREE.MeshLambertMaterial({color: 0xFFEE7D, map: createGrainyTexture(4, 4), envMap: this.reflectCube,  shininess: 100, reflectivity: .95}),
				"Stainless steel gold glossy": 	new THREE.MeshLambertMaterial({color: 0xFFCE80, map: createGrainyTexture(2, 2), envMap: this.reflectCube,  shininess: 100, reflectivity: .95}),
				
				"Silver regular": 	new THREE.MeshLambertMaterial({color: 0xDBEAFF, map: createGrainyTexture(4,4)}),
				"Silver glossy": 	new THREE.MeshLambertMaterial({color: 0xBCCBE0, map: createGrainyTexture(2,2, true), envMap: this.reflectCube, shininess: 100, reflectivity: .75}),
				"Silver premium": 	new THREE.MeshLambertMaterial({color: 0xD9E8FF, map: THREE.ImageUtils.loadTexture('textures/lighttexture.png'), envMap: this.reflectCube, shininess: 200, reflectivity: .85}),
				"Gold regular": 	new THREE.MeshLambertMaterial({color: 0xFFEFA8, map: THREE.ImageUtils.loadTexture('textures/lighttexture.png'), envMap: this.reflectCube}),
				
				"Titanium unpolished":	new THREE.MeshLambertMaterial({color: 0xE0EFFF, map: createGrainyTexture(4,4), envMap: this.reflectCube, shininess: 500, reflectivity: .75}),
				"Titanium polished": 	new THREE.MeshLambertMaterial({color: 0xD9E8FF, map: THREE.ImageUtils.loadTexture('textures/lighttexture.png'), envMap: this.reflectCube, shininess: 100, reflectivity: .95}),
				
				"Transparent resin white": 	new THREE.MeshLambertMaterial({color: 0xC2E6ED, opacity: .45, transparent: true}),
				"Transparent resin red": 	new THREE.MeshLambertMaterial({color: 0xA31212, opacity: .65, transparent: true}),
				"Transparent resin blue": 	new THREE.MeshLambertMaterial({color: 0x0D5E5E, opacity: .65, transparent: true}),
				"Transparent resin yellow": new THREE.MeshLambertMaterial({color: 0xAD9534, opacity: .65, transparent: true}),
				
				"Brass regular": 				new THREE.MeshLambertMaterial({color: 0x594927, map: THREE.ImageUtils.loadTexture('textures/lighttexture.png'), envMap: this.reflectCube, reflectivity: .75}),
				"Brass gold plated polished": 	new THREE.MeshLambertMaterial({color: 0xFFEA8C, map: THREE.ImageUtils.loadTexture('textures/lighttexture.png'), envMap: this.reflectCube}),
	};
				
	this.getMaterial = function(name){
		return mlib[name];
	};
	
	function createGrainyTexture(repeat1, repeat2, isLight)
	{
		var grainyTexture = THREE.ImageUtils.loadTexture( "textures/moon_1024.png" );
		if (isLight)
			grainyTexture = THREE.ImageUtils.loadTexture( "textures/lighttexture.png" );
		grainyTexture.wrapS = grainyTexture.wrapT = THREE.RepeatWrapping;
		grainyTexture.anisotropy = 16;
		grainyTexture.repeat.set(repeat1, repeat2);
		
		return grainyTexture;
	}
};

// This function builds the background of the shape that isn't reflected, only displayed
function buildWhiteBox()
{
    var r = "textures/cube/whitePattern2/";

    var whites = [ r + "flip.png", r + "flip.png",
                  r + "flip.png", r + "flip.png",
                  r + "flip.png", r + "orig.jpg" ];
    
    var textureCube = THREE.ImageUtils.loadTextureCube( whites );
    textureCube.format = THREE.RGBFormat;

    return textureCube;
}

// This function builds the background of the environment that the shapes actually reflect
function buildreflectCube(){
	var r = "textures/cube/skybox/";
	var urls = [ r + "px.png", r + "nx.png",
				 r + "py.png", r + "ny.png",
				 r + "pz.png", r + "nz.png" ];

   	var reflectCube = THREE.ImageUtils.loadTextureCube( urls );

	reflectCube.format = THREE.RGBFormat;
	return reflectCube;
};