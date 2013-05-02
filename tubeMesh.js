var TubeMesh = function(radius, scale, design) {	
	this.radius = radius;
	this.scale = scale;
    this.design = design;
	this.figure = buildTubeMesh(radius, scale, design); 
};

function buildTubeMesh(radius, scale, design) {
    var knot = new THREE.Curves.CinquefoilKnot(20, design);
    var geometry = new THREE.TubeGeometry(knot, 200, 10, radius, true, false);

    var tubeMesh = THREE.SceneUtils.createMultiMaterialObject( geometry, [
                new THREE.MeshLambertMaterial({
                    color: 0xff00ff,
                    opacity: geometry.debug ? 0.2 : 0.8,
                    transparent: true
                }),
                new THREE.MeshBasicMaterial({
                    color: 0x000000,
                    opacity: 0.5,
                    wireframe: true
            })]);

    tubeMesh.scale.set( scale, scale, scale );
    return tubeMesh;
};