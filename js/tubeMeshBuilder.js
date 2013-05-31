var TubeMeshBuilder = function(materialsLibrary) {	
    var m = new THREE.MeshFaceMaterial();
	var knot;
	
	// Scoping out of functions
	var segments = 300;
	var radiusSegments = 6;
	
    var materialsMap = {

        0: materialsLibrary.getMaterial( "Pure chrome" ),       
        1: materialsLibrary.getMaterial( "Black rough" ),       
        2: materialsLibrary.getMaterial( "Black metal" ),       
        3: materialsLibrary.getMaterial( "Dark glass" ),
        4: materialsLibrary.getMaterial( "Pure chrome" ),       
        5: materialsLibrary.getMaterial( "Pure chrome" ),       
        6: materialsLibrary.getMaterial( "Red glass 50" ),      
        7: materialsLibrary.getMaterial("Orange glass 50")
    }

    for ( var i in materialsMap ) {
        m.materials[ i ] = materialsMap[ i ];
    }
	m.opacity = 0.5;
	m.transparent = true;
	m.wireframe = true;

    this.build = function(tubeMeshParams) {
		var radius = tubeMeshParams['Thickness'];
		knot = new curveMaker(tubeMeshParams);
        var geometry = new THREE.TubeGeometry(knot, segments, radius, radiusSegments, isClosed(tubeMeshParams), false); //6 is default 'curviness', or how rounded the lines are
		
		
		if (isClosed(tubeMeshParams) == false ) {								// Check to see if there are caps (i.e. if its closed or not)
			var cap = new capSpline(knot, segments, radius, radiusSegments, isClosed(tubeMeshParams), false);
			THREE.GeometryUtils.merge( geometry, cap );
		} 
		//m = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } ); //Makes the frame wirey.
        var figure = new THREE.Mesh( geometry, m );
        figure.rotation.x = 0;
        figure.rotation.y = 0;
        figure.rotation.z = 0;

        figure.scale.x = figure.scale.y = figure.scale.z = tubeMeshParams['Scale'];
        tubeMeshParams.figure = figure;

        return tubeMeshParams;
    };
	
	//Sees if the lines should be attempted to be closed or not
	function isClosed(tubeMeshParams)
	{
		if (tubeMeshParams['Starting Shape'] < 10)
			return true;
		else
			return false;
	}

};

var TubeMeshParams = function(){
    this['Scale'] = 5;
    this.scalar = 20;
    this['Modify'] = 5;
    this['Depth'] = 1;
    this['Stretch'] = 1;
	this['Loops'] = 2;
	this['Starting Shape'] = 12;
	this['Thickness'] = 4;
};