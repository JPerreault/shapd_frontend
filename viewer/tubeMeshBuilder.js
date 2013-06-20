var hashend;

var TubeMeshBuilder = function(materialsLibrary) {
	var knot, geometry, stl, closed, figure, torusLoop;
	var m, fIndex, intersects;
	
	//Scoping out of functions
	var segments = 600, radiusSegments = 6;
	
    var materialsMap = {

        0: materialsLibrary.getMaterial( "Pure chrome" ),       
        1: materialsLibrary.getMaterial( "Black rough" ),       
        2: materialsLibrary.getMaterial( "Black metal" ),       
        3: materialsLibrary.getMaterial( "Dark glass" ),
        4: materialsLibrary.getMaterial( "Dark chrome" ),       
        5: materialsLibrary.getMaterial( "Plastic regular white" ),       
        6: materialsLibrary.getMaterial( "Gold" ),      
        7: materialsLibrary.getMaterial("Bronze")
    }

   // for ( var i in materialsMap ) {
   //     m.materials[ i ] = materialsMap[ 0 ];
   // }
	var m = materialsMap[0];
	

    this.build = function(tubeMeshParams) {
		updateHash(tubeMeshParams);
		var radius = tubeMeshParams['Thickness'];
		var scal = tubeMeshParams['Scale'];
		closed = this.isClosed (tubeMeshParams);
		knot = new curveMaker(tubeMeshParams);
        geometry = new THREE.TubeGeometry(knot, segments, radius, radiusSegments, closed, false); //6 is default 'curviness', or how rounded the lines are
		var vertices = geometry.vertices;
		
		//Check if caps are needed on open ends.
		if (!closed) {				
			var cap = new capSpline(knot, segments, radius, radiusSegments, closed, false);
			THREE.GeometryUtils.merge(geometry, cap);
		}
		//m = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } ); //Makes the frame wirey.
        figure = new THREE.Mesh(geometry, m);
        figure.rotation.x = tubeMeshParams['Rotation X'];
        figure.rotation.y = tubeMeshParams['Rotation Y'];
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
		console.log(geometry);
		stl = 'solid test \n';
		//Loop for all faces, adding each vertex to the stl file and making triangles from them.
		for (var i = 0; i < faces.length; i++)
		{
			stl += 'facet normal ' + convertVectorToString(faces[i].normal, figure.scale.x) + ' \n';
			stl += 'outer loop \n';
			stl += convertVertexToString(vertices[faces[i].a], figure.scale.x);
			stl += convertVertexToString(vertices[faces[i].b], figure.scale.x);
			stl += convertVertexToString(vertices[faces[i].c], figure.scale.x);
			stl += 'endloop \n';
			stl += 'endfacet \n';
			//Make the corresponding triangle unless the face in question is the cap.
			if ((i < faces.length - (2 * (radiusSegments - 2)) && closed == false) || closed == true)
			{
				stl += 'facet normal ' + convertVectorToString(faces[i].normal, figure.scale.x) + ' \n';
				stl += 'outer loop \n';
				stl += convertVertexToString(vertices[faces[i].a], figure.scale.x);
				stl += convertVertexToString(vertices[faces[i].c], figure.scale.x);
				stl += convertVertexToString(vertices[faces[i].d], figure.scale.x);
				stl += 'endloop \n';
				stl += 'endfacet \n';
			}
		}
		if (typeof torusLoop != 'undefined')
		{
			faces = torusLoop.geometry.faces;
			vertices = torusLoop.geometry.vertices;
			console.log(torusLoop.geometry);
			
			for (var i = 0; i < faces.length; i++)
			{
				stl += 'facet normal ' + convertVectorToString(faces[i].normal, figure.scale.x) + ' \n';
				stl += 'outer loop \n';
				stl += convertVertexToString(vertices[faces[i].a], figure.scale.x);
				stl += convertVertexToString(vertices[faces[i].b], figure.scale.x);
				stl += convertVertexToString(vertices[faces[i].c], figure.scale.x);
				stl += 'endloop \n';
				stl += 'endfacet \n';
				
				stl += 'facet normal ' + convertVectorToString(faces[i].normal, figure.scale.x) + ' \n';
				stl += 'outer loop \n';
				stl += convertVertexToString(vertices[faces[i].a], figure.scale.x);
				stl += convertVertexToString(vertices[faces[i].c], figure.scale.x);
				stl += convertVertexToString(vertices[faces[i].d], figure.scale.x);
				stl += 'endloop \n';
				stl += 'endfacet \n';
			}
		}
		stl += 'endsolid';
		
		return stl;
	}
	
	function convertVectorToString(vector, scale)
	{
		return ''+ vector.x/scale + ' '+ vector.y/scale + ' '+ vector.z/scale;
	}
	
	function convertVertexToString(vector, scale)
	{
		return 'vertex '+ convertVectorToString(vector, scale) + ' \n';
	}
	
	//Adding loops:
	this.addLoop = function (rC)
	{
		var raycaster = rC;
		intersects = raycaster.intersectObject(figure);
		
		if (intersects.length > 0)
		{
			fIndex = intersects[0].faceIndex;
			return true;
		}
		return false;
	}
	
	this.createTorus = function (tubeMeshParams)
	{
		var torus = new THREE.TorusGeometry(5, 1.5, segments/10, 50);
		var yRadian = yToRadians(geometry.vertices[intersects[0].face.a], geometry.vertices[intersects[0].face.b], geometry.vertices[intersects[0].face.d]);
		torus.applyMatrix(new THREE.Matrix4().makeRotationY(-yRadian));
		torusLoop = new THREE.Mesh(torus, m);
		
		torusLoop.scale.x = torusLoop.scale.y = torusLoop.scale.z = tubeMeshParams['Scale'];
		
		posx = geometry.faces[fIndex].centroid.x;
		posy = geometry.faces[fIndex].centroid.y;
		posz = geometry.faces[fIndex].centroid.z;
		
		torusLoop.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(posx, posy, posz));
		torusLoop.geometry.computeCentroids();
		torusLoop.geometry.computeFaceNormals();
		torusLoop.geometry.computeVertexNormals();
		
		return torusLoop;
	}
	
	//x and y values of points a, b, c of given face
	function yToRadians(a, b, c)
	{
		var m, q, w, e, r, s;
		//Find slope m between b and c.
		m = (b.x - c.x)/(b.y - c.y);
		//console.log('m :', m);
		//Find x intercept between plane (y = 0 and line bc) which is the length of q = distance of line segment between origin and y intercept of the line bc.
		q = Math.abs(b.y - (m * b.x));
		//console.log('q :', q);
		
		//Determine length of side w, which is the length between points a and b.
		w = Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2));
		//w = Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2);
		//console.log(Math.pow((a.x - b.x), 2));
		//console.log(Math.pow((a.y - b.y), 2));
		//console.log('w: ', w);
		
		//Determine angle e given sides q, w and the known right angle using law of sines.
		e = Math.asin(w/q);
		//Converting e to degrees
		e *= 57.2957795
		//console.log('e: ', e);
		
		//With known angle e, solve for remaining unknown angle r.
		r = 90 - e;
		//console.log('r :', r);
		//Convert angle r into radian value to feed back into function.
		//return (r * Math.PI) / 180;
		return r * 0.0174532925;
	}
	
	//Calculate dimensions of Mesh. Being fed currentMesh as a param, defined above. 
	function calculateMeshSize(figure)
	{
		figure.geometry.computeBoundingBox();
		var boundingBox = figure.geometry.boundingBox;
		
		var xMin = boundingBox.min.x;
		var xMax = boundingBox.max.x;
		var yMin = boundingBox.min.y;
		var yMax = boundingBox.max.y;
		var zMin = boundingBox.min.z;
		var zMax = boundingBox.max.z;
		
		var xWidth = xMax - xMin;
		var yHeight = yMax - yMin;
		var zDepth = zMax - zMin;
	}

	function setMaterial(material)
	{
		m = materialsLibrary.getMaterial(material);
	}
};

// Updates the URL's hash to the shape's string
function setHash()
{
    location.hash = hashend;
}

// Update the string representing the shape
function updateHash(tubeMesh)
{
	var keys = Object.keys(tubeMesh);
	if (typeof tubeMesh.figure != 'undefined')
	{
		tubeMesh['Rotation X'] = tubeMesh.figure.rotation.x;
		tubeMesh['Rotation Y'] = tubeMesh.figure.rotation.y;
	}

	hashend = "";
	for (var x=0; x<keys.length; x++)
	{
		if (keys[x] == 'Rotation Y')
		{
			hashend += tubeMesh[keys[x]];
			break;
		}
		hashend += tubeMesh[keys[x]]+"|";
	}
}

var TubeMeshParams = function(){
    if (location.hash == "#" || location.hash == "")
	{
        
		this['Scale'] = 5;
		this['Modify'] = 5;
		this['Depth'] = 1;
		this['Stretch'] = 1;
		this['Loops'] = 2;
		this['Starting Shape'] = 1;
		this['Thickness'] = 4;
		this['Rotation X'] = 0;
		this['Rotation Y'] = 0;
	}
	else
	{
		var hash = location.hash;
		location.hash = "";
		location.hash = hash.replace(/\%7C/g, '|');
		var parseme = location.hash.substring(1).split("|");
		var transformations = ['Scale', 'Modify', 'Depth', 'Stretch', 'Loops', 'Starting Shape', 'Thickness', 'Rotation X', 'Rotation Y'];
		for (var x=0; x<transformations.length; x++)
		{
			this[transformations[x]] = parseFloat(parseme[x]);
		}
//        this['Scale'] = 15;

	}
};