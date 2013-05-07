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


    this.build = function(tubeMeshParams) {
        var knot = new THREE.Curves.CinquefoilKnot(tubeMeshParams);
        var geometry = new THREE.TubeGeometry(knot, 200, 10, tubeMeshParams.curviness, true, false);

        var result = {
            curviness: tubeMeshParams.curviness,
            scale: tubeMeshParams.scale,
            design: tubeMeshParams.design,
            morph1: tubeMeshParams.morph1,
			morph2: tubeMeshParams.morph2,
            scalar: 20,
            
            figure: new THREE.Mesh( geometry, m )
        };

        result.figure.rotation.x = 0;
        result.figure.rotation.y = 0;
        result.figure.rotation.z = 0;

        result.figure.scale.x = result.figure.scale.y = result.figure.scale.z = result.scale;

        return result;
    };

};

var TubeMeshParams = function(){
    this.curviness = 6;
    this.scale = 8;
    this.scalar = 20;
    this.design = 5;
    this.morph1 = 1;               
    this.morph2 = 2;               
    this.morph3 = 0;               
    this.morph4 = 0;               
    this.morphHeight = 1;               
    this.morphWidth = 1;               
};