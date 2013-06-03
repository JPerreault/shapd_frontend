var TubeMeshBuilder = function(materialsLibrary) {	
    var m = new THREE.MeshFaceMaterial();
	var knot, geometry, stl, closed;
	
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
		closed = this.isClosed (tubeMeshParams);
		knot = new curveMaker(tubeMeshParams);
        geometry = new THREE.TubeGeometry(knot, segments, radius, radiusSegments, closed, false); //6 is default 'curviness', or how rounded the lines are
		var vertices = geometry.vertices;
		
		//Check if caps are needed on open ends.
		if (!closed) {				
			var cap = new capSpline(knot, segments, radius, radiusSegments, closed, false);
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
    }
	
	//Sees if the lines should be attempted to be closed or not
	this.isClosed = function(tubeMeshParams)
	{
		if (tubeMeshParams['Starting Shape'] < 10)
			return true;
		else
			return false;
	}
	
	//Saves the shape (currently to your computer) as an STL file.
	this.saveSTL = function()
	{
		var stlFile = createSTL();
		var blob = new Blob ([stlFile], {type: 'text/plain'});
		saveAs (blob, 'test.stl');
	}
	
	//Generates an STL file using the shape currently on the screen.
	function createSTL()
	{
		var vertices = geometry.vertices;
		var faces = geometry.faces;
		stl = 'solid test \n';
		//Loop for all faces, adding each vertex to the stl file and making triangles from them.
		for (var i = 0; i < faces.length; i++)
		{
			stl += 'facet normal ' + convertVectorToString(faces[i].normal) + ' \n';
			stl += 'outer loop \n';
			stl += convertVertexToString(vertices[faces[i].a]);
			stl += convertVertexToString(vertices[faces[i].b]);
			stl += convertVertexToString(vertices[faces[i].c]);
			stl += 'endloop \n';
			stl += 'endfacet \n';
			
			//Make the corresponding triangle unless the face in question is the cap.
			if ((i < faces.length - (2 * (radiusSegments - 2)) && closed == false) || closed == true)
			{
				stl += 'facet normal ' + convertVectorToString(faces[i].normal) + ' \n';
				stl += 'outer loop \n';
				stl += convertVertexToString(vertices[faces[i].a]);
				stl += convertVertexToString(vertices[faces[i].c]);
				stl += convertVertexToString(vertices[faces[i].d]);
				stl += 'endloop \n';
				stl += 'endfacet \n';
			}
		}
		stl += 'endsolid';
		
		return stl;
	}
	
	function convertVectorToString(vector)
	{
		return ''+ vector.x + ' '+ vector.y + ' '+ vector.z;
	}
	
	function convertVertexToString(vector)
	{
		return 'vertex '+ convertVectorToString(vector) + ' \n';
	}
};

var TubeMeshParams = function(){
    this['Scale'] = 5;
    this.scalar = 20;
    this['Modify'] = 5;
    this['Depth'] = 1;
    this['Stretch'] = 1;
	this['Loops'] = 2;
	this['Starting Shape'] = 1;
	this['Thickness'] = 4;
};