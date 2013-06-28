var materialListener = function(sW, tMB){
	var tubeMeshBuilder = tMB;
	var sceneWrapper = sW;
	var name = 'name';
	var description = 'description';
	var cost = 'cost';
	
	document.getElementById('whiteregularplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular white';
		name = 'White Regular Plastic';
		description = 'Bumpy, rough';
		cost = '$';
		materialChange();
	}
	
	document.getElementById('blackregularplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular black';
		name = 'Black Regular Plastic';
		description = 'Bumpy, rough';
		cost = '$';
		materialChange();
	}
	
	document.getElementById('whitepolishedplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular white polished';
		materialChange();
	}
	
	document.getElementById('redpolishedplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular red polished';
		materialChange();
	}
	
	document.getElementById('bluepolishedplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular blue polished';
		materialChange();
	}
	
	document.getElementById('pinkpolishedplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular pink polished';
		materialChange();
	}
	
	document.getElementById('purplepolishedplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular purple polished';
		materialChange();
	}
	
	document.getElementById('whitedetailplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic detail white';
		materialChange();
	}
	
	document.getElementById('blackdetailplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic detail black';
		materialChange();
	}
	
	document.getElementById('whitetransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin white';
		materialChange();
	}
	
	document.getElementById('blacktransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin black';
		materialChange();
	}
	
	document.getElementById('graytransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin gray';
		materialChange();
	}
	
	document.getElementById('redtransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin red';
		materialChange();
	}
	
	document.getElementById('greentransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin green';
		materialChange();
	}
	
	document.getElementById('bluetransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin blue';
		materialChange();
	}
	
	document.getElementById('yellowtransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin yellow';
		materialChange();
	}
	
	document.getElementById('orangetransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin orange';
		materialChange();
	}
	
	document.getElementById('browntransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin brown';
		materialChange();
	}
	
	document.getElementById('regularalumide').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Alumide regular';
		materialChange();
	}
	
	document.getElementById('polishedalumide').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Alumide polished';
		materialChange();
	}
	
	document.getElementById('regularbrass').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Brass regular';
		materialChange();
	}
	
	document.getElementById('goldplatedbrass').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Brass gold plated polished';
		materialChange();
	}
	
	document.getElementById('regularsteel').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Stainless steel regular';
		materialChange();
	}
	
	document.getElementById('medievalsteel').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Stainless steel medieval pewter';
		materialChange();
	}
	
	document.getElementById('bronzemattesteel').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Stainless steel bronze matte';
		materialChange();
	}
	
	document.getElementById('bronzeglossysteel').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Stainless steel bronze glossy';
		materialChange();
	}
	
	document.getElementById('goldmattesteel').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Stainless steel gold matte';
		materialChange();
	}
	
	document.getElementById('goldglossysteel').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Stainless steel gold glossy';
		materialChange();
	}
	
	document.getElementById('regularsilver').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Silver regular';
		materialChange();
	}
	
	document.getElementById('glossysilver').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Silver glossy';
		materialChange();
	}
	
	document.getElementById('premiumsilver').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Silver premium';
		materialChange();
	}
	
	document.getElementById('unpolishedtitanium').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Titanium unpolished';
		materialChange();
	}
	
	document.getElementById('polishedtitanium').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Titanium polished';
		materialChange();
	}
	
	document.getElementById('regulargold').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Gold regular';
		materialChange();
	}
	
	function materialChange()
	{
		sceneWrapper.redrawMesh(sceneWrapper.currentMesh);
		getNewPrice();
		this.panelUpdate();
	}
	
	function getNewPrice()
	{
		var jsonString = getJson(sceneWrapper.currentMesh);
		if (typeof authToken !== 'undefined')
			$.post("/pricing/", {authenticity_token: authToken, id: shapeID, json: jsonString}, function(data){updatePrice(data)});
	}
	
	function updatePrice(data)
	{
		$( "#cost" ).val('$'.concat(data+''));
	}
	
	this.panelUpdate = function()
	{
		$( "#matname" ).val(name);
		$( "#matdesc" ).val(description);
		$( "#matcost" ).val(cost);
	}
}