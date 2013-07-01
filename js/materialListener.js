var materialListener = function(sW, tMB){
	var tubeMeshBuilder = tMB;
	var sceneWrapper = sW;
	var name = 'name';
	var description = 'description';
	var cost = 'cost';
	var smooth = ' - '
	var that = this;
	var img1 = '';
	var img2 = '';
	
	document.getElementById('whiteregularplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular white';
		name = 'White Regular Plastic';
		description = 'Bumpy, rough';
		cost = '$';
		img1 = 'assets/imgs/materialExamples/stainlessSteel_2.jpg';
		img2 = 'assets/imgs/materialExamples/stainlessSteel_2.jpg';
		that.materialChange();
	}
	
	document.getElementById('blackregularplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular black';
		name = 'Black Regular Plastic';
		cost = '$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/stainlessSteel_1.jpg';
		img2 = 'assets/imgs/materialExamples/stainlessSteel_1.jpg';
		description = 'Bumpy, rough';
		that.materialChange();
	}
	
	document.getElementById('whitepolishedplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular white polished';
		that.materialChange();
	}
	
	document.getElementById('redpolishedplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular red polished';
		that.materialChange();
	}
	
	document.getElementById('bluepolishedplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular blue polished';
		that.materialChange();
	}
	
	document.getElementById('pinkpolishedplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular pink polished';
		that.materialChange();
	}
	
	document.getElementById('purplepolishedplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular purple polished';
		that.materialChange();
	}
	
	document.getElementById('whitedetailplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic detail white';
		that.materialChange();
	}
	
	document.getElementById('blackdetailplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic detail black';
		that.materialChange();
	}
	
	document.getElementById('whitetransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin white';
		that.materialChange();
	}
	
	document.getElementById('blacktransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin black';
		that.materialChange();
	}
	
	document.getElementById('graytransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin gray';
		that.materialChange();
	}
	
	document.getElementById('redtransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin red';
		that.materialChange();
	}
	
	document.getElementById('greentransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin green';
		that.materialChange();
	}
	
	document.getElementById('bluetransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin blue';
		that.materialChange();
	}
	
	document.getElementById('yellowtransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin yellow';
		that.materialChange();
	}
	
	document.getElementById('orangetransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin orange';
		that.materialChange();
	}
	
	document.getElementById('browntransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin brown';
		that.materialChange();
	}
	
	document.getElementById('regularalumide').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Alumide regular';
		that.materialChange();
	}
	
	document.getElementById('polishedalumide').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Alumide polished';
		that.materialChange();
	}
	
	document.getElementById('regularbrass').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Brass regular';
		that.materialChange();
	}
	
	document.getElementById('goldplatedbrass').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Brass gold plated polished';
		that.materialChange();
	}
	
	document.getElementById('regularsteel').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Stainless steel regular';
		that.materialChange();
	}
	
	document.getElementById('medievalsteel').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Stainless steel medieval pewter';
		that.materialChange();
	}
	
	document.getElementById('bronzemattesteel').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Stainless steel bronze matte';
		that.materialChange();
	}
	
	document.getElementById('bronzeglossysteel').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Stainless steel bronze glossy';
		that.materialChange();
	}
	
	document.getElementById('goldmattesteel').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Stainless steel gold matte';
		that.materialChange();
	}
	
	document.getElementById('goldglossysteel').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Stainless steel gold glossy';
		that.materialChange();
	}
	
	document.getElementById('regularsilver').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Silver regular';
		that.materialChange();
	}
	
	document.getElementById('glossysilver').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Silver glossy';
		that.materialChange();
	}
	
	document.getElementById('premiumsilver').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Silver premium';
		that.materialChange();
	}
	
	document.getElementById('unpolishedtitanium').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Titanium unpolished';
		that.materialChange();
	}
	
	document.getElementById('polishedtitanium').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Titanium polished';
		that.materialChange();
	}
	
	document.getElementById('regulargold').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Gold regular';
		that.materialChange();
	}
	
	this.materialChange = function()
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
		document.getElementById('idMaterialName').textContent = name;
		document.getElementById('idCostContainer').textContent = cost;
		document.getElementById('idSmoothContainer').textContent = name;
		document.getElementById('idM1').src = name;
		document.getElementById('idM2').src = name;
		document.getElementById('idMaterialDescription').textContent = name;
		
		
		$( "#matname" ).val(name);
		$( "#matdesc" ).val(description);
		$( "#matcost" ).val(cost);
	}
}