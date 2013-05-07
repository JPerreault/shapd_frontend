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


    this.build = function(radius, scale, design, morph1) {

        var tubeMeshParams = {
            curviness: radius,
            scalar: 20,
            scale: scale,
            design: design,
            morph1: morph1
        }

        var knot = new THREE.Curves.CinquefoilKnot(tubeMeshParams);
        var geometry = new THREE.TubeGeometry(knot, 200, 10, radius, true, false);

        var result = {
            curviness: radius,
            scale: scale,
            design: design,
			morph1: morph1,
            
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
    this.scale = 20;
    this.morph = {
                design: 5,
                morph1: 1
                // strange: 2,
                // leftright: 0,
                // updown: 0,
                // height: 1,
                // width: 1
            };
};