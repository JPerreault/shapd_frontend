var materialListener = function(sW, tMB){
	var tubeMeshBuilder = tMB;
	var sceneWrapper = sW;
	var name = 'name';
	var description = ' - ';
	var cost = '$';
	var smooth = ' - '
	var that = this;
	var img1 = '';
	var img2 = '';
	var feeFlat, feePerCM3;
	var shipsinBizDays;
	var ourHandling = 3;
	var estShippingFrom = 3;
	var estShippingTo = 3;
	
	document.getElementById('whiteregularplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular white';
		name = 'White Regular Plastic';
		cost = '$';
		smooth = 'Low';
		img1 = 'assets/imgs/materialExamples/whitePlasticRegular_1.jpg';
		img2 = 'assets/imgs/materialExamples/whitePlasticRegular_2.jpg';
		description = 'Unpolished plastic is cost effective, with a fairly rough, grainy look to it.';
		feeFlat = 1.5;
		feeperCM3 = 1.4;
		shipsinBizDays = 8;

		that.materialChange();
	}
	
	document.getElementById('blackregularplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Black regular black';
		name = 'Black Regular Plastic';
		cost = '$';
		smooth = 'Low';
		img1 = 'assets/imgs/materialExamples/blackPlasticRegular_1.jpg';
		img2 = 'assets/imgs/materialExamples/blackPlasticRegular_2.jpg';
		description = 'Unpolished plastic is cost effective, with a fairly rough, grainy look to it.';
		feeFlat = 1.75;
		feeperCM3 = 1.75;
		shipsinBizDays = 8;
		
		that.materialChange();
	}
	
	document.getElementById('whitepolishedplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular white polished';
		name = 'Black Polished Plastic';
		cost = '$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/whitePlasticPolished_1.jpg';
		img2 = 'assets/imgs/materialExamples/whitePlasticPolished_2.jpg';
		description = 'Cost effective & durable, polished plastic has a moderately smooth texture that comes in a variety of colors.';
		feeFlat = 2.00;
		feeperCM3 = 1.5;
		shipsinBizDays = 12;
		
		that.materialChange();
	}
	
	document.getElementById('redpolishedplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular red polished';
		name = 'Red Polished Plastic';
		cost = '$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/redPlastic_1.jpg';
		img2 = 'assets/imgs/materialExamples/redPlastic_2.jpg';
		description = 'Cost effective & durable, polished plastic has a moderately smooth texture that comes in a variety of colors.';
		feeFlat = 2.00;
		feeperCM3 = 1.5;
		shipsinBizDays = 12;
		that.materialChange();
	}
	
	document.getElementById('bluepolishedplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular blue polished';
		name = 'Blue Polished Plastic';
		cost = '$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/bluePlastic_1.jpg';
		img2 = 'assets/imgs/materialExamples/bluePlastic_2.jpg';
		description = 'Cost effective & durable, polished plastic has a moderately smooth texture that comes in a variety of colors.';
		feeFlat = 2.00;
		feeperCM3 = 1.5;
		shipsinBizDays = 12;
		that.materialChange();
	}
	
	document.getElementById('pinkpolishedplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular pink polished';
		name = 'Hot-Pink Polished Plastic';
		cost = '$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/pinkPlastic_1.jpg';
		img2 = 'assets/imgs/materialExamples/pinkPlastic_2.jpg';
		description = 'Hot pink? Yes, please. Hot pink plastic has a moderately smooth texture that comes in a variety of colors.';
		feeFlat = 2.00;
		feeperCM3 = 1.5;
		shipsinBizDays = 12;
		that.materialChange();
	}
	
	document.getElementById('purplepolishedplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular purple polished';
		name = 'Purple Polished Plastic';
		cost = '$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/purplePlastic_1.jpg';
		img2 = 'assets/imgs/materialExamples/purplePlastic_2.jpg';
		description = 'Cost effective & durable, polished plastic has a moderately smooth texture that comes in a variety of colors.';
		feeFlat = 2.00;
		feeperCM3 = 1.5;
		shipsinBizDays = 12;
		that.materialChange();
	}
	
	document.getElementById('whitedetailplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic detail white';
		name = 'White Detail Plastic';
		cost = '$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/whiteDetail_1.jpg';
		img2 = 'assets/imgs/materialExamples/whiteDetail_2.jpg';
		description = 'Detail plastic is excellent at picking out fine details in pieces, while still having a sligtly unsmooth finish.';
		feeFlat = 2.50;
		feeperCM3 = 2.99;
		shipsinBizDays = 8;
		that.materialChange();
	}
	
	document.getElementById('blackdetailplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic detail black';
		name = 'Black Detail Plastic';
		cost = '$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/blackDetail_1.jpg';
		img2 = 'assets/imgs/materialExamples/blackDetail_2.jpg';
		description = 'Detail plastic is excellent at picking out fine details in pieces, while still having a sligtly unsmooth finish.';
		feeFlat = 2.50;
		feeperCM3 = 2.99;
		shipsinBizDays = 8;
		that.materialChange();
	}
	
/*	document.getElementById('blackdetailplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent Detail Plastic';
		name = 'Transparent Detail Plastic';
		cost = '$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/transparentDetail_1.jpg';
		img2 = 'assets/imgs/materialExamples/transparentDetail_2.jpg';
		description = 'Detail plastic is excellent at picking out fine details in pieces, while still having a sligtly unsmooth finish.';
		feeFlat = 2.50;
		feeperCM3 = 2.99;
		shipsinBizDays = 8;
		that.materialChange();
	}
	
	
	document.getElementById('cleartransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin white';
		name = 'Ultra Smooth Clear Plastic ';
		cost = '$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/transparentDetail_1.jpg';
		img2 = 'assets/imgs/materialExamples/transparentDetail_2.jpg';
		description = 'Detail plastic is excellent at picking out fine details in pieces, while still having a sligtly unsmooth finish.';
		feeFlat = 2.50;
		feeperCM3 = 2.99;
		shipsinBizDays = 15;
		that.materialChange();
	}
	*/
	document.getElementById('whitetransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin white';
		name = 'Ultra-Smooth White Plastic ';
		cost = '$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/whiteTransparentResin_1.jpg';
		img2 = 'assets/imgs/materialExamples/whiteTransparentResin_2.jpg';
		description = 'Detail plastic is excellent at picking out fine details in pieces, while still having a sligtly unsmooth finish.';
		feeFlat = 2.50;
		feeperCM3 = 2.99;
		shipsinBizDays = 15;
		that.materialChange();
	}
	
	document.getElementById('blacktransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin black';
		name = 'Ultra-Smooth Black Plastic ';
		cost = '$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/whiteTransparentResin_1.jpg';
		img2 = 'assets/imgs/materialExamples/whiteTransparentResin_2.jpg';
		description = 'Detail plastic is excellent at picking out fine details in pieces, while still having a sligtly unsmooth finish.';
		feeFlat = 2.50;
		feeperCM3 = 2.99;
		shipsinBizDays = 15;
		that.materialChange();
	}
	
	document.getElementById('graytransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin gray';
		name = 'Ultra-Smooth Clear Gray Plastic ';
		cost = '$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/whiteTransparentResin_1.jpg';
		img2 = 'assets/imgs/materialExamples/whiteTransparentResin_2.jpg';
		description = 'Detail plastic is excellent at picking out fine details in pieces, while still having a sligtly unsmooth finish.';
		feeFlat = 2.50;
		feeperCM3 = 2.99;
		shipsinBizDays = 15;
		that.materialChange();
	}
	
	document.getElementById('redtransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin red';
		name = 'Ultra-Smooth Clear Red Plastic ';
		cost = '$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/whiteTransparentResin_1.jpg';
		img2 = 'assets/imgs/materialExamples/whiteTransparentResin_2.jpg';
		description = 'Detail plastic is excellent at picking out fine details in pieces, while still having a sligtly unsmooth finish.';
		feeFlat = 2.50;
		feeperCM3 = 2.99;
		shipsinBizDays = 15;
		that.materialChange();
	}
	
	document.getElementById('greentransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin green';
		name = 'Ultra-Smooth Clear Green Plastic ';
		cost = '$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/whiteTransparentResin_1.jpg';
		img2 = 'assets/imgs/materialExamples/whiteTransparentResin_2.jpg';
		description = 'Detail plastic is excellent at picking out fine details in pieces, while still having a sligtly unsmooth finish.';
		feeFlat = 2.50;
		feeperCM3 = 2.99;
		shipsinBizDays = 15;
		that.materialChange();
	}
	
	document.getElementById('bluetransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin blue';
		name = 'Ultra-Smooth Clear Blue Plastic ';
		cost = '$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/whiteTransparentResin_1.jpg';
		img2 = 'assets/imgs/materialExamples/whiteTransparentResin_2.jpg';
		description = 'Detail plastic is excellent at picking out fine details in pieces, while still having a sligtly unsmooth finish.';
		feeFlat = 2.50;
		feeperCM3 = 2.99;
		shipsinBizDays = 15;
		that.materialChange();
	}
	
	document.getElementById('yellowtransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin yellow';
		name = 'Ultra-Smooth Clear Blue Plastic ';
		cost = '$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/whiteTransparentResin_1.jpg';
		img2 = 'assets/imgs/materialExamples/whiteTransparentResin_2.jpg';
		description = 'Detail plastic is excellent at picking out fine details in pieces, while still having a sligtly unsmooth finish.';
		feeFlat = 2.50;
		feeperCM3 = 2.99;
		shipsinBizDays = 15;
		that.materialChange();
	}
	
	document.getElementById('orangetransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin orange';
		name = 'Ultra-Smooth Clear Blue Plastic ';
		cost = '$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/whiteTransparentResin_1.jpg';
		img2 = 'assets/imgs/materialExamples/whiteTransparentResin_2.jpg';
		description = 'Detail plastic is excellent at picking out fine details in pieces, while still having a sligtly unsmooth finish.';
		feeFlat = 2.50;
		feeperCM3 = 2.99;
		shipsinBizDays = 15;
		that.materialChange();
	}
	
	document.getElementById('browntransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin brown';
		name = 'Ultra-Smooth Brown Blue Plastic ';
		cost = '$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/whiteTransparentResin_1.jpg';
		img2 = 'assets/imgs/materialExamples/whiteTransparentResin_2.jpg';
		description = 'Detail plastic is excellent at picking out fine details in pieces, while still having a sligtly unsmooth finish.';
		feeFlat = 2.50;
		feeperCM3 = 2.99;
		shipsinBizDays = 15;
		that.materialChange();
	}
	
	document.getElementById('regularalumide').onclick = function()
	{
		name = 'Regular Alumide';
		cost = '$';
		smooth = 'Low';
		img1 = 'assets/imgs/materialExamples/alumide_1.jpg';
		img2 = 'assets/imgs/materialExamples/alumide_2.jpg';
		description = 'Alumide has a sparkly, very rough metallic finish to it. Slightly brittle, it is perfect for a futuristic or sparkly look.';
		feeFlat = 1.5;
		feeperCM3 = 1.75;
		shipsinBizDays = 8;
		that.materialChange();
	}
	
	document.getElementById('polishedalumide').onclick = function()
	{
		name = 'Polished Alumide';
		cost = '$';
		smooth = 'Low';
		img1 = 'assets/imgs/materialExamples/polishedAlumide_1.jpg';
		img2 = 'assets/imgs/materialExamples/polishedAlumide_2.jpg';
		description = 'Polished alumide has a sparkly, fairly rough, metallic finish to it. Slightly brittle, it is perfect for a futuristic look.';
		feeFlat = 1.50;
		feeperCM3 = 2.00;
		shipsinBizDays = 12;
		that.materialChange();
	}
	
	document.getElementById('regularbrass').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Brass regular';
		name = 'Regular Brass';
		cost = '$$$';
		smooth = 'Low';
		img1 = 'assets/imgs/materialExamples/brass_1.jpg';
		img2 = 'assets/imgs/materialExamples/brass_2.jpg';
		description = 'Pure, 100% brass piece with no coating. Heavy feel, with a fine polished finish - without the price tag of silver or gold.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 20;
		that.materialChange();
	}
	
	document.getElementById('goldplatedbrass').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Brass gold plated polished';
		name = 'Gold Plated Brass';
		cost = '$$$';
		smooth = 'Low';
		img1 = 'assets/imgs/materialExamples/brass_1.jpg';
		img2 = 'assets/imgs/materialExamples/brass_2.jpg';
		description = 'Solid brass piece with 18k gold coating. Extremely polished and smooth. Heavy feel with a gold finish - without the gold price tag.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 20;
		that.materialChange();
	}
	
	document.getElementById('regularsteel').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Stainless steel regular';
		name = 'Stainless Steel';
		cost = '$$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/ssRegular_1.jpg';
		img2 = 'assets/imgs/materialExamples/ssRegular_2.jpg';
		description = 'Stainless Steel has a pitted surface for a vingage, steam-punk look. Very strong and durable, it can be plated in a number of colors.';
		feeFlat = 6.00;
		feeperCM3 = 8.00;
		shipsinBizDays = 12;
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
		name = 'Antique Bronze-Plated Matte Stainless Steel';
		cost = '$$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/ssBronzeMatte_1.jpg';
		img2 = 'assets/imgs/materialExamples/ssBronzeMatte_2.jpg';
		description = 'Stainless Steel has a pitted surface for a vingage, steam-punk look. Very strong and durable, it can be plated in a number of colors.';
		feeFlat = 7.50;
		feeperCM3 = 8.00;
		shipsinBizDays = 16;
		that.materialChange();
	}
	
	document.getElementById('bronzeglossysteel').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Stainless steel bronze glossy';
		name = 'Antique Bronze-Plated Glossy Stainless Steel';
		cost = '$$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/ssBronzeGlossy_1.jpg';
		img2 = 'assets/imgs/materialExamples/ssBronzeGlossy_2.jpg';
		description = 'Stainless Steel has a pitted surface for a vingage, steam-punk look. Very strong and durable, it can be plated in a number of colors.';
		feeFlat = 7.50;
		feeperCM3 = 8.00;
		shipsinBizDays = 16;
		that.materialChange();
	}
	
	document.getElementById('goldmattesteel').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Stainless steel gold matte';
		name = 'Gold-Plated Matte Stainless Steel';
		cost = '$$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/ssGoldMatte_1.jpg';
		img2 = 'assets/imgs/materialExamples/ssGoldMatte_2.jpg';
		description = 'Stainless Steel has a pitted surface for a vingage, steam-punk look. Very strong and durable, it can be plated in a number of colors.';
		feeFlat = 9.00;
		feeperCM3 = 8.00;
		shipsinBizDays = 16;
		that.materialChange();
	}
	
	document.getElementById('goldglossysteel').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Stainless steel gold glossy';
		name = 'Gold-Plated Glossy Stainless Steel';
		cost = '$$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/ssGoldGlossy_1.jpg';
		img2 = 'assets/imgs/materialExamples/ssGoldGlossy_2.jpg';
		description = 'Stainless Steel has a pitted surface for a vingage, steam-punk look. Very strong and durable, it can be plated in a number of colors.';
		feeFlat = 9.00;
		feeperCM3 = 8.00;
		shipsinBizDays = 16;
		that.materialChange();
	}
	
	document.getElementById('regularsilver').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Silver regular';
		name = 'Regular Sterling Silver';
		cost = '$$$';
		smooth = 'Low';
		img1 = 'assets/imgs/materialExamples/silverRegular_1.jpg';
		img2 = 'assets/imgs/materialExamples/silverRegular_2.jpg';
		description = 'Unlike hand-polished glossy or premium silver, regular sterling (92.5%) silver has a rough texture. Beautiful material for pieces.';
		feeFlat = 30;
		feeperCM3 = 20;
		shipsinBizDays = 15;
		that.materialChange();
	}
	
	document.getElementById('glossysilver').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Silver glossy';
		name = 'Glossy Sterling Silver';
		cost = '$$$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/silverGlossy_1.jpg';
		img2 = 'assets/imgs/materialExamples/silverGlossy_2.jpg';
		description = 'Glossy sterling (92.5%) silver is lightly hand-polished to a smooth finish with some remaining bumpy surface texture. Beautiful material for pieces.';
		feeFlat = 35;
		feeperCM3 = 20;
		shipsinBizDays = 15;
		that.materialChange();
	}
	
	document.getElementById('premiumsilver').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Silver premium';
		name = 'Premium Glossy Sterling Silver';
		cost = '$$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/silverPremiumGlossy_1.jpg';
		img2 = 'assets/imgs/materialExamples/silverPremiumGlossy_2.jpg';
		description = 'Premium glossy sterling (92.5%) silver is stunningly beautiful.It is highly hand polished to a wet-looking sheen and is exceptionally shiny. Our favorite material for pieces. Since it is polished by hand, some interior surfaces may remain unpolished if we can\'t reach them.';
		feeFlat = 78;
		feeperCM3 = 28;
		shipsinBizDays = 15;
		that.materialChange();
	}
	
	document.getElementById('unpolishedtitanium').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Titanium unpolished';
		name = 'Unpolished Titanium';
		cost = '$$$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/titaniumUnpolished_1.jpg';
		img2 = 'assets/imgs/materialExamples/titaniumUnpolished_2.jpg';
		description = 'Beautiful and vibrant, premium unpolished titanium has a gray silver color. Unlike polished, it has a slightly rough texture to it.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 20;
		that.materialChange();
	}
	
	document.getElementById('polishedtitanium').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Titanium polished';
		name = 'Polished Titanium';
		cost = '$$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/titaniumPolished_1.jpg';
		img2 = 'assets/imgs/materialExamples/titaniumPolished_2.jpg';
		description = 'Premium, polished titanium has a gray silver color. It is stunningly beautiful, polished to a high, glossy sheen. Please note: Since it is polished by hand, some interior surfaces may remain unpolished if we can\'t reach them.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 20;
		that.materialChange();
	}
	
	document.getElementById('regulargold').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Gold regular';
		name = 'Premium Gold';
		cost = '$$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/gold_1.jpg';
		img2 = 'assets/imgs/materialExamples/gold_2.jpg';
		description = 'Not some thin plating, this is pure, 14k solid gold. Incredible, valuable, and timeless, your piece will be polished to a beautiful finish. Please note: Since it is polished by hand, some interior surfaces may remain unpolished if we can\'t reach them.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 20;
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
		document.getElementById('idCostContainer').textContent = 'Cost: ' + cost;
		document.getElementById('idSmoothContainer').textContent = 'Smooth: ' + smooth;
		document.getElementById('idM1').src = img1;
		document.getElementById('idM2').src = img2;
		document.getElementById('idMaterialDescription').textContent = description;
		
		
		$( "#matname" ).val(name);
		$( "#matdesc" ).val(description);
		$( "#matcost" ).val(cost);
	}
}