var TubeMeshBuilder = function(materialsLibrary) {	
    var m = new THREE.MeshFaceMaterial();
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


    this.build = function(radius, scale, design) {
        var knot = new THREE.Curves.CinquefoilKnot(20, design);
        var geometry = new THREE.TubeGeometry(knot, 200, 10, radius, true, false);

        var result = {
            radius: radius,
            scale: scale,
            design: design,
            
            figure: new THREE.Mesh( geometry, m )
        };

        result.figure.rotation.x = 0;
        result.figure.rotation.y = 0;
        result.figure.rotation.z = 0;

        result.figure.scale.x = result.figure.scale.y = result.figure.scale.z = result.scale;

        return result;
    };

};

