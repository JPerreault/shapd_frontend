var x = 0;

var TubeMeshBuilder = function(materialsLibrary) {
	var knot, geometry, stl, closed, figure, torusLoop;
	var m, fIndex, intersects;
	
	var segments = 600, radiusSegments = 6;
	
    var materialsMap = {
        0: materialsLibrary.getMaterial( "Regular alumide" ),       
        1: materialsLibrary.getMaterial( "Polished alumide" ),       
        2: materialsLibrary.getMaterial( "Plastic regular white" ),       
        3: materialsLibrary.getMaterial( "Plastic regular black" ),
        4: materialsLibrary.getMaterial( "Plastic regular white polished" ),       
        5: materialsLibrary.getMaterial( "Plastic regular red polished" ),       
        6: materialsLibrary.getMaterial( "Plastic regular purple polished" ),      
        7: materialsLibrary.getMaterial("Plastic regular pink polished"),
		8: materialsLibrary.getMaterial( "Plastic regular blue polished" ),
		9: materialsLibrary.getMaterial( "Plastic detail white" ),
		10: materialsLibrary.getMaterial( "Plastic detail black" ),
		11: materialsLibrary.getMaterial( "Stainless steel regular" ),
		12: materialsLibrary.getMaterial( "Stainless steel medieval pewter" ),
		13: materialsLibrary.getMaterial( "Stainless steel bronze matte" ),
		14: materialsLibrary.getMaterial( "Stainless steel bronze glossy" ),
		15: materialsLibrary.getMaterial( "Stainless steel gold matte" ),
		16: materialsLibrary.getMaterial( "Stainless steel gold glossy" ),
		17: materialsLibrary.getMaterial( "Silver regular" ),
		18: materialsLibrary.getMaterial( "Silver glossy" ),
		19: materialsLibrary.getMaterial( "Silver premium" ),
		20: materialsLibrary.getMaterial( "Gold regular" ),
		21: materialsLibrary.getMaterial( "Titanium unpolished" ),
		22: materialsLibrary.getMaterial( "Titanium polished" ),
		23: materialsLibrary.getMaterial( "Transparent resin white" ),
		24: materialsLibrary.getMaterial( "Transparent resin black" ),
		25: materialsLibrary.getMaterial( "Transparent resin red" ),
		26: materialsLibrary.getMaterial( "Transparent resin blue" ),
		27: materialsLibrary.getMaterial( "Transparent resin green" ),
		28: materialsLibrary.getMaterial( "Transparent resin gray" ),
		29: materialsLibrary.getMaterial( "Transparent resin yellow" ),
		30: materialsLibrary.getMaterial( "Transparent resin orange" ),
		31: materialsLibrary.getMaterial( "Transparent resin brown" ),
		32: materialsLibrary.getMaterial( "Brass regular" ),
		33: materialsLibrary.getMaterial( "Brass gold plated polished" )
    }
	
	

    this.build = function(tubeMeshParams) {
		m = materialsMap[x%34];
		var radius = tubeMeshParams['Thickness'];
		var scal = tubeMeshParams['Scale'];
		knot = new curveMaker(tubeMeshParams);
        geometry = new THREE.TubeGeometry(knot, segments, radius, radiusSegments, closed, false); //6 is default 'curviness', or how rounded the lines are
		var vertices = geometry.vertices;

		//m = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } ); //Makes the frame wirey.
        figure = new THREE.Mesh(geometry, m);
        figure.rotation.x = tubeMeshParams['Rotation X'];
        figure.rotation.y = tubeMeshParams['Rotation Y'];
        figure.rotation.z = 0;	

        figure.scale.x = figure.scale.y = figure.scale.z = tubeMeshParams['Scale'];
        tubeMeshParams.figure = figure;

        return tubeMeshParams;
    }

	function setMaterial(material)
	{
		m = materialsLibrary.getMaterial(material);
	}
};

var TubeMeshParams = function(){
	this['Scale'] = 5;
	this['Modify'] = 5;
	this['Depth'] = 1;
	this['Stretch'] = 1;
	this['Loops'] = 2;
	this['Starting Shape'] = 1;
	this['Thickness'] = 4;
	this['Rotation X'] = 0;
	this['Rotation Y'] = 0;
};