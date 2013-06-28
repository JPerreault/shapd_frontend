var hashend;

var TubeMeshBuilder = function(materialsLibrary) {
	var knot, geometry, stl, closed, figure, torusLoop, scale;
	var fIndex, intersects;
	this.m = materialsLibrary.getMaterial( "Brass gold plated polished" ) ;
	
	
	//Scoping out of functions
	var segments = 600, radiusSegments = 6;

    this.build = function(tubeMeshParams) {
		updateHash(tubeMeshParams);
		var radius = tubeMeshParams['Thickness'];
		scale = tubeMeshParams['Scale'];
		closed = this.isClosed (tubeMeshParams);
		knot = new curveMaker(tubeMeshParams);
        geometry = new THREE.TubeGeometry(knot, segments, radius, radiusSegments, closed, false); //6 is default 'curviness', or how rounded the lines are
		var vertices = geometry.vertices;
		
		//Check if caps are needed on open ends.
		if (!closed) {				
			var cap = new capSpline(knot, segments, radius, radiusSegments, closed, false);
			THREE.GeometryUtils.merge(geometry, cap);
		}
		
		geometry.mergeVertices();
		geometry.computeCentroids();
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();
		
		//this.m = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } ); //Makes the frame wirey.
		if (typeof screenShot !== 'undefined')
			this.m.opacity = 1;
        figure = new THREE.Mesh(geometry, this.m);
		
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
	this.setMaterial= function (material)
	{
		this.m = materialsLibrary.getMaterial(material);
		this.m.name = material;
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
		return ''+ vector.x/scale + ' '+ vector.y/scale + ' '+ vector.z/scale;
	}
	
	function convertVertexToString(vector)
	{
		return 'vertex '+ convertVectorToString(vector) + ' \n';
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
		fIndex = this.calculateFaceIndex();
		var xRadian = this.toRadians(geometry.faces[fIndex], true);
		var yRadian = this.toRadians(geometry.faces[fIndex], false);
		//torus.applyMatrix(new THREE.Matrix4().makeRotationX(xRadian));
		//torus.applyMatrix(new THREE.Matrix4().makeRotationY(yRadian));
		torusLoop = new THREE.Mesh(torus, this.m);
		
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
	
	this.calculateFaceIndex = function()
	{
		var sectionNumber = Math.floor(fIndex / radiusSegments);
		var high = -1, fIndexHigh = -1;
		var newFace, newValue;
		for (var i = 0; i < radiusSegments; i++)
		{
			newFace = geometry.faces[sectionNumber*radiusSegments + i];
			newValue = Math.abs(newFace.centroid.x) + Math.abs(newFace.centroid.y);
			if (newValue > high)
			{
				high = Math.max(high, newValue);
				fIndexHigh = sectionNumber*radiusSegments + i;
			}
		}
		
		return fIndexHigh;
	}
	
	this.toRadians = function (face, isX)
	{
		var n1 = face.normal;
		
		//Normal of the vertical plane
		if (isX)
			var n2 = new THREE.Vector3(1, 0, 0);
		else
			var n2 = new THREE.Vector3(0, 1, 0);
		//Equation to find the cosin of the angle. (n1)(n2) = ||n1|| * ||n2|| (cos theta)
	
		//Find the dot product of n1 and n2.
		var d = (n1.x * n2.x) + (n1.y * n2.y) + (n1.z * n2.z);
		var l1 = Math.pow ((Math.pow(n1.x, 2) + Math.pow(n1.y, 2) + Math.pow(n1.z, 2)), .5);
		var l2 = Math.pow ((Math.pow(n2.x, 2) + Math.pow(n2.y, 2) + Math.pow(n2.z, 2)), .5);
		
		var a = (d)/(l1*l2);
		var result = Math.acos(a);

		return result;
	}
	
	this.calculateDimensions = function(variables)
	{
		geometry.computeBoundingBox();
		var boundingBox = figure.geometry.boundingBox;
		var dimensions = [];
		var scale = 5 / figure.scale.x * 5;
		
		var xMin = boundingBox.min.x / scale;
		var yMin = boundingBox.min.y / scale;
		var zMin = boundingBox.min.z / scale;
		var xMax = boundingBox.max.x / scale;
		var yMax = boundingBox.max.y / scale;
		var zMax = boundingBox.max.z / scale;
	
		var xVal = (xMax - xMin) * 0.393701;
		xVal = Math.floor(xVal * 100) / 100;
		var yVal = (yMax - yMin) * 0.393701;
		yVal = Math.floor(yVal * 100) / 100;
		var zVal = (zMax - zMin) * 0.393701;
		zVal = Math.floor(zVal * 100) / 100;
		
		if (variables === 'xyz')
		{
			$( "#dimensions" ).val(xVal+''.concat(' by ').concat(yVal).concat(' by ').concat(zVal+'').concat(' inches'));
			$( "#xwidth" ).val(xVal+''.concat(' inches'));
			$( "#yheight" ).val(yVal+''.concat(' inches'));
		}
		else if (variables === 'xy')
		{
			$( "#xwidth" ).val(xVal+''.concat(' inches'));
			$( "#yheight" ).val(yVal+''.concat(' inches'));
		}
		
	}
	
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
};

var TubeMeshParams = function(){
    if (typeof savedShape != 'undefined')
	{
        try
        {
            var parseme = savedShape.split("|");
            var transformations = ['Scale', 'Modify', 'Depth', 'Stretch', 'Loops', 'Starting Shape', 'Thickness', 'Rotation X', 'Rotation Y'];
            for (var x=0; x<transformations.length; x++)
            {
                this[transformations[x]] = parseFloat(parseme[x]);
                
                if (parseme[x].indexOf("undefined") != -1)
                    throw "invalid";
            }

            if (parseme == "")
                throw "invalid";
            
            return;
        }
        catch(e)
        {
            
        }
    }
        
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