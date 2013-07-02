var websiteName = '';

function getJson(currentMesh)
{
	var jsonString = '';
	var data = [];
	var figure = currentMesh.figure;
	var scale = figure.scale.x;
	figure.material.name = currentMesh['Material'];
	var material = calculateMaterial(figure);
	var volume = calculateVolume(figure, scale);
	var surfaceArea = calculateSurfaceArea(figure, scale);
	var dimensions = calculateXYZ(figure, scale);
	if (websiteName == 'iMaterialise')
	{
		var quantity = 1;
		var modelRefernece = 'myModel';
		var finishID = calculateFinishId(figure);
		
		var models = [{
				"toolID":"",
				"modelReference":"model.xml",
				"materialID":material,
				"finishID":finishID,
				"quantity":quantity,
				"xDimMm": dimensions[0],
				"yDimMm": dimensions[1],
				"zDimMm": dimensions[2],
				"volumeCm3":volume,
				"surfaceCm2":surfaceArea,
			}];
		
		var shipmentInfo = {
			"countryCode":"US",
			"stateCode":"NH",
			"city":"Nashua",
			"zipCode":"03063"
		};	
		
		data = {
			"currency":"USD"
		};
		data.models = models;
		data.shipmentInfo = shipmentInfo;
		
		jsonString = JSON.stringify(data);
	}
	
	else
	{
		data = {
			"volume": volume,
			"area": surfaceArea,
			"xBoundMin": dimensions[0],
			"xBoundMax": dimensions[1],
			"yBoundMin": dimensions[2],
			"yBoundMax": dimensions[3],
			"zBoundMin": dimensions[4],
			"zBoundMax": dimensions[5],
			"materials": material,
		};
		jsonString = JSON.stringify(data);
	}
	
	console.log('Volume: ', volume);
	console.log('Surface Area: ', surfaceArea);
	console.log('Length: ', dimensions[1]);
	console.log('----------------------');
	//console.log(jsonString);
	return jsonString;
}

function calculateVolume(figure, scale)
{
	var vertices = figure.geometry.vertices;
	var faces = figure.geometry.faces;
	var totalVolume = 0;
	var partVol;
	var px, py, pz,
		qx, qy, qz,
		rx, ry, rz;
		
	for (i = 0; i < faces.length; i++)
	{
		px = vertices[faces[i].a].x;
		py = vertices[faces[i].a].y;
		pz = vertices[faces[i].a].z;
			
		qx = vertices[faces[i].b].x;
		qy = vertices[faces[i].b].y;
		qz = vertices[faces[i].b].z;
		
		rx = vertices[faces[i].c].x;
		ry = vertices[faces[i].c].y;
		rz = vertices[faces[i].c].z;
			
		partVol = (px*qy*rz) + (py*qz*rx) + (pz*qx*ry) - (px*qz*ry) - (py*qx*rz) - (pz*qy*rx);
		totalVolume += partVol;

		if (typeof faces[i].d != 'undefined')
		{
			px = vertices[faces[i].c].x;
			py = vertices[faces[i].c].y;
			pz = vertices[faces[i].c].z;
				
			qx = vertices[faces[i].d].x;
			qy = vertices[faces[i].d].y;
			qz = vertices[faces[i].d].z;
				
			rx = vertices[faces[i].a].x;
			ry = vertices[faces[i].a].y;
			rz = vertices[faces[i].a].z;
				
			partVol = (px*qy*rz) + (py*qz*rx) + (pz*qx*ry) - (px*qz*ry) - (py*qx*rz) - (pz*qy*rx);
			totalVolume += partVol;
		}
	}
	
	totalVolume /= 6;
	totalVolume *= (Math.pow(scale, 3));
	totalVolume /= 1000; //conversion to cm^3
		
	return totalVolume;
}
	
function calculateSurfaceArea(figure, scale)
{
	var surfaceArea = 0;
	var faces = figure.geometry.faces;
	var vertices = figure.geometry.vertices;
	var a, b, c, d, ab, ad, p, p1, p2, p3, partSA;
		
	for (var i = 0; i < faces.length; i++)
	{
		a = vertices[faces[i].a];
		b = vertices[faces[i].b];
		c = vertices[faces[i].c];
		d = vertices[faces[i].d];
		if (typeof d != 'undefined')
		{
			ab = Math.sqrt(Math.pow(a.x - b.x, 2)+Math.pow(a.y - b.y, 2)+Math.pow(a.z - b.z, 2));
			ad = Math.sqrt(Math.pow(a.x - d.x, 2)+Math.pow(a.y - d.y, 2)+Math.pow(a.z - d.z, 2));
			partSA = ab*ad;
		}
		
		else
		{
			p1 = Math.sqrt(Math.pow(a.x-b.x, 2) + Math.pow(a.y-b.y, 2) + Math.pow(a.z-b.z, 2));
			p2 = Math.sqrt(Math.pow(a.x-c.x, 2) + Math.pow(a.y-c.y, 2) + Math.pow(a.z-c.z, 2));
			p3 = Math.sqrt(Math.pow(b.x-c.x, 2) + Math.pow(b.y-c.y, 2) + Math.pow(b.z-c.z, 2));
			p = (p1 + p2 + p3) / 2;
			
			partSA = Math.sqrt(p * (p - p1) * (p - p2) * (p - p3));
		}
		surfaceArea += partSA;
	}
	surfaceArea *= (Math.pow(scale, 2));
	surfaceArea /= 100; //conversion to cm^2
		
	return surfaceArea;
}
	
function calculateXYZ(figure, scale)
{
	figure.geometry.computeBoundingBox();
	var boundingBox = figure.geometry.boundingBox;
	var dimensions = [];
		
	var xMin = boundingBox.min.x * scale / 10;
	var yMin = boundingBox.min.y * scale / 10;
	var zMin = boundingBox.min.z * scale / 10;
	var xMax = boundingBox.max.x * scale / 10;
	var yMax = boundingBox.max.y * scale / 10;
	var zMax = boundingBox.max.z * scale / 10;
	
	var xVal = (xMax - xMin);
	var yVal = (yMax - yMin);
	var zVal = (zMax - zMin);
	
	if (websiteName == 'iMaterialise')
	{
		dimensions.push(xVal);
		dimensions.push(yVal);
		dimensions.push(zVal);
	}
	else 
	{
		xVal /= 10;
		yVal /= 10;
		zVal /= 10;
		
		dimensions.push(0);
		dimensions.push(xVal);
		dimensions.push(0);
		dimensions.push(yVal);
		dimensions.push(0);
		dimensions.push(zVal);
	}
	
	return dimensions;
}

function calculateMaterial(figure)
{
	if (figure.material.name == 'Plastic regular white'){
		websiteName = 'shapeways';
		return 6;
	}	
	
	else if (figure.material.name == 'Plastic regular black'){
		websiteName = 'shapeways';
		return 25;
	}	
	
	else if (figure.material.name == 'Plastic regular white polished'){
		websiteName = 'shapeways';
		return 62;
	}	
	
	else if (figure.material.name == 'Plastic regular red polished'){
		websiteName = 'shapeways';
		return 76;
	}	
	
	else if (figure.material.name == 'Plastic regular purple polished'){
		websiteName = 'shapeways';
		return 75;
	}	
	
	else if (figure.material.name == 'Plastic regular pink polished'){
		websiteName = 'shapeways';
		return 77;
	}	
	
	else if (figure.material.name == 'Plastic regular blue polished'){
		websiteName = 'shapeways';
		return 78;
	}
	
	else if (figure.material.name == 'Plastic detail white'){
		websiteName = 'shapeways';
		return 5;
	}
	
	else if (figure.material.name == 'Plastic detail black'){
		websiteName = 'shapeways';
		return 7;
	}
	
	else if (figure.material.name.indexOf('Transparent') !== -1){
		websiteName = 'iMaterialise';
		return '7bd84076-b86d-45c5-b498-766484b02ad9';
	}	

	else if (figure.material.name == 'Alumide regular'){
		websiteName = 'shapeways';
		return 28;
	}
	
	else if (figure.material.name == 'Alumide polished'){
		websiteName = 'shapeways';
		return 66;
	}	
		
	else if (figure.material.name.indexOf('Brass') !== -1){
		websiteName = 'iMaterialise';
		return '170d6e35-8f0d-4f92-8408-2d3e095c256e';
	}	
			
	else if (figure.material.name == 'Stainless steel regular'){
		websiteName = 'shapeways';
		return 23;
	}	
	
	else if (figure.material.name == 'Stainless steel medieval pewter'){
		websiteName = 'iMaterialise';
		return '1ff61659-a26b-4ee6-97b7-de642dfe1263';
	}
				
	else if (figure.material.name == 'Stainless steel bronze matte'){
		websiteName = 'shapeways';
		return 37;
	}	
	
	else if (figure.material.name == 'Stainless steel bronze glossy'){
		websiteName = 'shapeways';
		return 38;
	}
					
	else if (figure.material.name == 'Stainless steel gold matte'){
		websiteName = 'shapeways';
		return 23;
	}	

	else if (figure.material.name == 'Stainless steel gold glossy'){
		websiteName = 'shapeways';
		return 39;
	}
		
	else if (figure.material.name == 'Silver regular'){
		websiteName = 'shapeways';
		return 53;
	}
		
	else if (figure.material.name == 'Silver glossy'){
		websiteName = 'shapeways';
		return 54;
	}
					
	else if (figure.material.name == 'Silver premium'){
		websiteName = 'shapeways';
		return 81;
	}	
			
	else if (figure.material.name.indexOf('Titanium') !== -1){
		websiteName = 'iMaterialise';
		return '12a65a42-df49-47a9-8828-0efaf84c5509';
	}
	
	else if (figure.material.name == 'Regular gold'){
		websiteName = 'iMaterialise';
		return 'd01a95ab-aaba-44f0-a4b6-8f72b66655b1';
	}
}

function calculateFinishId(figure)
{
	if (figure.material.name == 'Transparent resin white'){
		return 'e1b52251-6eba-4a26-a46b-66898f3831d7';
	}	
	
	else if (figure.material.name == 'Transparent resin black'){
		return '0a2ec08d-e664-41a3-8b38-59fefa9499e9';
	}	
	
	else if (figure.material.name == 'Transparent resin red'){
		return '2fd1fcd5-9677-4e31-835d-0eb8e60630a4';
	}	
	
	else if (figure.material.name == 'Transparent resin blue'){
		return 'f7fcc397-5f84-407b-ac61-2566c8cba9ef';
	}	
	
	else if (figure.material.name == 'Transparent resin green'){
		return 'ad18f5f7-28ac-46cc-b729-fbf987f468bd';
	}	
	
	else if (figure.material.name == 'Transparent resin gray'){
		return 'ade745f2-1d90-4230-a9c4-335155023f18';
	}	
	
	else if (figure.material.name == 'Transparent resin yellow'){
		return '08d03489-eafd-480a-8085-93778d288828';
	}	
	
	else if (figure.material.name == 'Transparent resin orange'){
		return 'a9c9632f-b5ef-4fac-bc37-25f6aba8f7a6';
	}	
	
	else if (figure.material.name == 'Transparent resin brown'){
		return '7d1bca66-5282-4b7e-8735-d62902819766';
	}	
	
	else if (figure.material.name == 'Brass regular'){
		return '9c31bfc6-dba0-40c1-8cc0-048d9df487af';
	}	
	
	else if (figure.material.name == 'Brass gold plated polished'){
		return '53248ecd-b95e-43f4-9c6f-74fa9ba9f9a4';
	}
	
	else if (figure.material.name == 'Stainless steel medieval pewter'){
		return '8111e78a-dbee-4351-8d98-e70911efcef2';
	}	
	
	else if (figure.material.name == 'Titanium unpolished'){
		return 'c9c27ce3-eee4-47e4-a896-a9010a7971fd';
	}
					
	else if (figure.material.name == 'Titanium polished'){
		return '7fbdfe5d-4f92-4038-99bd-42009ff9a4b4';
	}
	
	else if (figure.material.name == 'Regular gold'){
		return '8f1cc7fa-8422-43e3-abf7-a7a2f8f63b8f';
	}
}