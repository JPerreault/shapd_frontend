function saveSTL(mesh)
{
		var stlFile = createSTL(mesh);
		var blob = new Blob ([stlFile], {type: 'text/plain'});
		saveAs (blob, 'shape.stl');
}

//Generates an STL file using the shape currently on the screen.
function createSTL(mesh)
{
	stl = 'solid test \n';	
	if (loop.torusDefined)
	{
        var vertices = loop.loopMesh.geometry.vertices;
        var faces = loop.loopMesh.geometry.faces;
        
        //Loop for all faces, adding each vertex to the stl file and making triangles from them.
        for (var i = 0; i < faces.length; i++)
        {
            stl += 'facet normal ' + convertVectorToString(faces[i].normal) + ' \n';
            stl += 'outer loop \n';
            stl += convertVertexToString(vertices[faces[i].a], true);
            stl += convertVertexToString(vertices[faces[i].b], true);
            stl += convertVertexToString(vertices[faces[i].c], true);
            stl += 'endloop \n';
            stl += 'endfacet \n';
            
            if (faces[i] instanceof THREE.Face4)
            {
                stl += 'facet normal ' + convertVectorToString(faces[i].normal) + ' \n';
                stl += 'outer loop \n';
                stl += convertVertexToString(vertices[faces[i].a], true);
                stl += convertVertexToString(vertices[faces[i].c], true);
                stl += convertVertexToString(vertices[faces[i].d], true);
                stl += 'endloop \n';
                stl += 'endfacet \n';
            }
        }
	}
    var vertices = mesh.geometry.vertices;
    var faces = mesh.geometry.faces;
        
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
        
        if (faces[i] instanceof THREE.Face4)
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

function convertVectorToString(vector, isTorus)
{
    if (isTorus)
        return ''+ vector.x*loop.loopMesh.scale.x + ' '+ vector.y*loop.loopMesh.scale.x + ' '+ vector.z*loop.loopMesh.scale.x;
    else
        return ''+ vector.x*currentMesh.figure.scale.x + ' '+ vector.y*currentMesh.figure.scale.y + ' '+ vector.z*currentMesh.figure.scale.z;
}

function convertVertexToString(vector, isTorus)
{
	return 'vertex '+ convertVectorToString(vector, isTorus) + ' \n';
}