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
        var geometry = new THREE.TubeGeometry(knot, 200, 10, tubeMeshParams['Curviness'], true, false);

        var figure = new THREE.Mesh( geometry, m );

        figure.rotation.x = 0;
        figure.rotation.y = 0;
        figure.rotation.z = 0;

        figure.scale.x = figure.scale.y = figure.scale.z = tubeMeshParams['Scale'];
        tubeMeshParams.figure = figure;

        return tubeMeshParams;
    };

};

var TubeMeshParams = function(){
    this['Curviness'] = 6;
    this['Scale'] = 5;
    this.scalar = 20;
    this['Design'] = 5;
    this['Depth'] = 1;
    this['Stretch Side'] = 0;
    this['Stretch Up'] = 0;
    this['Height'] = 1;
    this['Width'] = 1;
};