var materialListener = function(sW, tMB){
	var tubeMeshBuilder = tMB;
	var sceneWrapper = sW;
	
	document.getElementById('whiteregularplastic').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Plastic regular white');
		materialChange();
	}
	
	document.getElementById('blackregularplastic').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Plastic regular black');
		materialChange();
	}
	
	document.getElementById('whitepolishedplastic').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Plastic regular white polished');
		materialChange();
	}
	
	document.getElementById('redpolishedplastic').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Plastic regular red polished');
		materialChange();
	}
	
	document.getElementById('bluepolishedplastic').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Plastic regular blue polished');
		materialChange();
	}
	
	document.getElementById('pinkpolishedplastic').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Plastic regular pink polished');
		materialChange();
	}
	
	document.getElementById('purplepolishedplastic').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Plastic regular purple polished');
		materialChange();
	}
	
	document.getElementById('whitedetailplastic').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Plastic detail white');
		materialChange();
	}
	
	document.getElementById('blackdetailplastic').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Plastic detail black');
		materialChange();
	}
	
	document.getElementById('whitetransparentplastic').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Transparent resin white');
		materialChange();
	}
	
	document.getElementById('blacktransparentplastic').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Transparent resin black');
		materialChange();
	}
	
	document.getElementById('graytransparentplastic').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Transparent resin gray');
		materialChange();
	}
	
	document.getElementById('redtransparentplastic').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Transparent resin red');
		materialChange();
	}
	
	document.getElementById('greentransparentplastic').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Transparent resin green');
		materialChange();
	}
	
	document.getElementById('bluetransparentplastic').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Transparent resin blue');
		materialChange();
	}
	
	document.getElementById('yellowtransparentplastic').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Transparent resin yellow');
		materialChange();
	}
	
	document.getElementById('orangetransparentplastic').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Transparent resin orange');
		materialChange();
	}
	
	document.getElementById('browntransparentplastic').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Transparent resin brown');
		materialChange();
	}
	
	document.getElementById('regularalumide').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Alumide regular');
		materialChange();
	}
	
	document.getElementById('polishedalumide').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Alumide polished');
		materialChange();
	}
	
	document.getElementById('regularbrass').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Brass regular');
		materialChange();
	}
	
	document.getElementById('goldplatedbrass').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Brass gold plated polished');
		materialChange();
	}
	
	document.getElementById('regularsteel').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Stainless steel regular');
		materialChange();
	}
	
	document.getElementById('medievalsteel').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Stainless steel medieval pewter');
		materialChange();
	}
	
	document.getElementById('bronzemattesteel').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Stainless steel bronze matte');
		materialChange();
	}
	
	document.getElementById('bronzeglossysteel').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Stainless steel bronze glossy');
		materialChange();
	}
	
	document.getElementById('goldmattesteel').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Stainless steel gold matte');
		materialChange();
	}
	
	document.getElementById('goldglossysteel').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Stainless steel gold glossy');
		materialChange();
	}
	
	document.getElementById('regularsilver').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Silver regular');
		materialChange();
	}
	
	document.getElementById('glossysilver').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Silver glossy');
		materialChange();
	}
	
	document.getElementById('premiumsilver').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Silver premium');
		materialChange();
	}
	
	document.getElementById('unpolishedtitanium').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Titanium unpolished');
		materialChange();
	}
	
	document.getElementById('polishedtitanium').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Titanium polished');
		materialChange();
	}
	
	document.getElementById('regulargold').onclick = function()
	{
		tubeMeshBuilder.setMaterial('Gold regular');
		materialChange();
	}
	
	function materialChange()
	{
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
		getNewPrice();
	}
	
	function getNewPrice()
	{
		var jsonString = getJson(sceneWrapper.currentMesh.figure);
		console.log(jsonString);
		if (typeof authToken !== 'undefined')
			$.post("/pricing/", {authenticity_token: authToken, id: shapeID, json: jsonString}, function(data){updatePrice(data)});
	}
	
	function updatePrice(data)
	{
		$( "#cost" ).val('$'.concat(data+''));
	}
}	