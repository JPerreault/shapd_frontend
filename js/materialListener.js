var materialListener = function(sW, tMB){
	var tubeMeshBuilder = tMB;
	var sceneWrapper = sW;
	var name = 'Premium Gold';
	var description = 'Not some thin plating, this is pure, 14k solid gold. Incredible, valuable, and timeless, your piece will be polished to a beautiful finish. Please note: Since it is polished by hand, some interior surfaces may remain unpolished if we can\'t reach them.';
	var cost = '$$$';
	var smooth = 'High'
	var that = this;
	var img1 = 'assets/imgs/materialExamples/gold_1.jpg';
	var img2 = 'assets/imgs/materialExamples/gold_2.jpg';
	var feeFlat, feePerCM3;
	var shipsinBizDays;
	var ourHandling = 3;
	var estShippingFrom = 3;
	var estShippingTo = 3;
	var imgDesc1 = '';
	var imgDesc2 = '';
	
	document.getElementById('whiteregularplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular white';
		name = 'Rough White Plastic';
		cost = '$';
		smooth = 'Very Low';
		img1 = 'assets/imgs/materialExamples/whitePlasticRegular_1.jpg';
		img2 = 'assets/imgs/materialExamples/whitePlasticRegular_2.jpg';
		description = 'Rough plastic is our most cost effective material and is comparatively fast to make. It has a grainy look - perfect for modern, artistic, or winter-themed pieces. Please click on the example pictures for a comparison of rough vs regular.';
		feeFlat = 1.5;
		feeperCM3 = 1.4;
		shipsinBizDays = 8;
		imgDesc1 = 'Regular plastic on the left, polished on the right.';
		imgDesc2 = '';

		that.materialChange();
	}
	
	document.getElementById('blackregularplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular black';
		name = 'Rough Black Plastic';
		cost = '$';
		smooth = 'Very Low';
		img1 = 'assets/imgs/materialExamples/blackPlasticRegular_1.jpg';
		img2 = 'assets/imgs/materialExamples/blackPlasticRegular_2.jpg';
		description = 'Rough plastic is our most cost effective material and is comparatively fast to make. It has a grainy look - perfect for modern, artistic, or vintage-themed pieces. Click on the example pictures to get a sense the texture.';
		feeFlat = 1.75;
		feeperCM3 = 1.75;
		shipsinBizDays = 8;
		imgDesc1 = '';
		imgDesc2 = '';
		
		that.materialChange();
	}
	
	document.getElementById('whitepolishedplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular white polished';
		name = 'White Regular Plastic';
		cost = '$';
		smooth = 'Low';
		img1 = 'assets/imgs/materialExamples/whitePlasticPolished_1.jpg';
		img2 = 'assets/imgs/materialExamples/whitePlasticPolished_2.jpg';
		description = 'While a smoother finish than rough plastic, regular plastic has a moderately coarse texture and is very cost effective. Comes in a variety of colors and is perfect for bright, playful pieces. Click on the examples to get a feel for the texture.';
		feeFlat = 2.00;
		feeperCM3 = 1.5;
		shipsinBizDays = 12;
		imgDesc1 = 'Regular plastic on the left, polished on the right.';
		imgDesc2 = '';
		
		that.materialChange();
	}
	
	document.getElementById('redpolishedplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular red polished';
		name = 'Red Regular Plastic';
		cost = '$';
		smooth = 'Low';
		img1 = 'assets/imgs/materialExamples/redPlastic_1.jpg';
		img2 = 'assets/imgs/materialExamples/redPlastic_2.jpg';
		description = 'While a smoother finish than rough plastic, regular plastic has a moderately coarse texture and is very cost effective. Comes in a variety of colors and is perfect for bright, playful pieces. Click on the examples to get an idea of the texture.';
		feeFlat = 2.00;
		feeperCM3 = 1.5;
		shipsinBizDays = 12;
		imgDesc1 = '';
		imgDesc2 = '';
		that.materialChange();
	}
	
	document.getElementById('bluepolishedplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular blue polished';
		name = 'Blue Regular Plastic';
		cost = '$';
		smooth = 'Low';
		img1 = 'assets/imgs/materialExamples/bluePlastic_1.jpg';
		img2 = 'assets/imgs/materialExamples/bluePlastic_2.jpg';
		description = 'While a smoother finish than rough plastic, regular plastic has a moderately coarse texture and is very cost effective. Comes in a variety of colors and is perfect for bright, playful pieces. Click on the examples to get an idea of the texture.';
		feeFlat = 2.00;
		feeperCM3 = 1.5;
		shipsinBizDays = 12;
		imgDesc1 = '';
		imgDesc2 = '';
		that.materialChange();
	}
	
	document.getElementById('pinkpolishedplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular pink polished';
		name = 'Hot-Pink Regular Plastic';
		cost = '$';
		smooth = 'Low';
		img1 = 'assets/imgs/materialExamples/pinkPlastic_1.jpg';
		img2 = 'assets/imgs/materialExamples/pinkPlastic_2.jpg';
		description = 'Hot pink? Yes, please. While a smoother finish than rough plastic, regular plastic has a moderately coarse texture and is very cost effective. Perfect for bright, playful pieces. Click on the examples to get an idea of the texture.';
		feeFlat = 2.00;
		feeperCM3 = 1.5;
		shipsinBizDays = 12;
		imgDesc1 = '';
		imgDesc2 = '';
		that.materialChange();
	}
	
	document.getElementById('purplepolishedplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Plastic regular purple polished';
		name = 'Purple Regular Plastic';
		cost = '$';
		smooth = 'Low';
		img1 = 'assets/imgs/materialExamples/purplePlastic_1.jpg';
		img2 = 'assets/imgs/materialExamples/purplePlastic_2.jpg';
		description = 'While a smoother finish than rough plastic, regular plastic has a moderately coarse texture and is very cost effective. Comes in a variety of colors and is perfect for bright, playful pieces. Click on the examples to get an idea of the texture.';
		feeFlat = 2.00;
		feeperCM3 = 1.5;
		shipsinBizDays = 12;
		imgDesc1 = '';
		imgDesc2 = '';
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
		description = 'Detail plastic is excellent at picking out fine details or for thinner pieces. It is much smoother than either rough or regular plastic, yet can still have a coarse finish depending on the piece. Please click on the examples to get an idea of the texture.';
		feeFlat = 2.50;
		feeperCM3 = 2.99;
		shipsinBizDays = 8;
		imgDesc1 = '';
		imgDesc2 = '';
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
		description = 'Detail plastic is excellent at picking out fine details or for thinner pieces. It is much smoother than either rough or regular plastic, yet can still have a coarse finish depending on the piece. Please click on the examples to get an idea of the texture.';
		feeFlat = 2.50;
		feeperCM3 = 2.99;
		shipsinBizDays = 8;
		imgDesc1 = '';
		imgDesc2 = '';
		that.materialChange();
	}
	
	document.getElementById('highdetailgrayplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent Detail Plastic';
		name = 'Premium Smooth Gray Plastic';
		cost = '$$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/primeGray_1.jpg';
		img2 = 'assets/imgs/materialExamples/primeGray_2.jpg';
		description = 'Premium smooth gray plastic is beautiful, with a clean, sleek finish. The quality of finish is a bit more costly and takes a little longer to make, but is well worth the wait. The finished, clean look only comes in gray.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 15;
		imgDesc1 = '';
		imgDesc2 = '';
		that.materialChange();
	}
	
/*	
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
		name = 'Ultra-Premium Clear & Smooth Plastic';
		cost = '$$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/transparentClear_1.jpg';
		img2 = 'assets/imgs/materialExamples/transparentClear_2.jpg';
		description = 'Ultra Premium transparent plastic is incredibly smooth for a beautiful, fine finish. Perfect for detailed pieces with a sleek texture, our ultra premium plastic is simply beautiful. Please note that the transparency is determined by the thickness of the piece.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 15;
		imgDesc1 = '';
		imgDesc2 = '';
		that.materialChange();
	}
	
	document.getElementById('redtransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin red';
		name = 'Ultra-Premium Clear & Smooth Red Plastic ';
		cost = '$$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/transparentRed_1.jpg';
		img2 = 'assets/imgs/materialExamples/transparentRed_2.jpg';
		description = 'Ultra Premium transparent plastic is incredibly smooth for a beautiful, fine finish. Perfect for detailed pieces with a sleek texture, our ultra premium plastic is simply beautiful. Please note that the transparency is determined by the thickness of the piece.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 15;
		imgDesc1 = '';
		imgDesc2 = '';
		that.materialChange();
	}
	
	document.getElementById('bluetransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin blue';
		name = 'Ultra-Premium Clear & Smooth Blue Plastic ';
		cost = '$$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/transparentBlue_1.jpg';
		img2 = 'assets/imgs/materialExamples/transparentBlue_2.jpg';
		description = 'Ultra Premium transparent plastic is incredibly smooth for a beautiful, fine finish. Perfect for detailed pieces with a sleek texture, our ultra premium plastic is simply beautiful. Please note that the transparency is determined by the thickness of the piece.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 15;
		imgDesc1 = '';
		imgDesc2 = '';
		that.materialChange();
	}
	
	document.getElementById('yellowtransparentplastic').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Transparent resin yellow';
		name = 'Ultra-Premium Clear & Smooth Yellow Plastic ';
		cost = '$$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/transparentYellow_1.jpg';
		img2 = 'assets/imgs/materialExamples/transparentYellow_2.jpg';
		description = 'Ultra Premium transparent plastic is incredibly smooth for a beautiful, fine finish. Perfect for detailed pieces with a sleek texture, our ultra premium plastic is simply beautiful. Please note that the transparency is determined by the thickness of the piece.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 15;
		imgDesc1 = '';
		imgDesc2 = '';
		that.materialChange();
	}
	/*
	
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
		imgDesc = '';
		that.materialChange();
	}
	
	Materials available but no img's. Leaving out for V0
	
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
		imgDesc = '';
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
		imgDesc = '';
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
		imgDesc = '';
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
		imgDesc = '';
		that.materialChange();
	}
	*/
	document.getElementById('regularalumide').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Alumide regular';
		name = 'Regular Alumide';
		cost = '$';
		smooth = 'Very Low';
		img1 = 'assets/imgs/materialExamples/alumide_1.jpg';
		img2 = 'assets/imgs/materialExamples/alumide_2.jpg';
		description = 'Regular alumide has a sparkly, very rough metallic finish to it. Slightly brittle and very cost effective, it is perfect for a futuristic or sparkly look. Please click on the examples to get an idea of the texture.';
		feeFlat = 1.5;
		feeperCM3 = 1.75;
		shipsinBizDays = 8;
		imgDesc1 = '';
		imgDesc2 = '';
		that.materialChange();
	}
	
	document.getElementById('polishedalumide').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Alumide polished';
		name = 'Alumide polished';
		cost = '$';
		smooth = 'Low';
		img1 = 'assets/imgs/materialExamples/polishedAlumide_1.jpg';
		img2 = 'assets/imgs/materialExamples/polishedAlumide_2.jpg';
		description = 'While smoother than regular alumide, polished alumide still has a fairly rough, metallic finish to it. Sparkly and slightly brittle, it is perfect for a futuristic look. Please click on the examples to get an idea of the texture.';
		feeFlat = 1.50;
		feeperCM3 = 2.00;
		shipsinBizDays = 12;
		imgDesc1 = '';
		imgDesc2 = '';
		that.materialChange();
	}
	
	document.getElementById('regularbrass').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Brass regular';
		name = 'Regular Solid Brass';
		cost = '$$$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/brass_1.jpg';
		img2 = 'assets/imgs/materialExamples/brass_2.jpg';
		description = 'Pure, 100% brass. Heavy feel to pieces with no coating or plating.  This fine smooth finish is fantastic - without the price tag of silver or gold. Perfect for an antique piece. Color might change slightly over time for an aged look. Please click on the examples to compare regular vs. gold-plated brass.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 20;
		imgDesc1 = 'Gold-plated brass on the left, regular brass on the right.';
		imgDesc2 = 'Gold-plated brass on the left, regular brass on the right.';
		that.materialChange();
	}
	
	document.getElementById('goldplatedbrass').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Brass gold plated polished';
		name = 'Gold-Plated Solid Brass';
		cost = '$$$';
		smooth = 'Low';
		img1 = 'assets/imgs/materialExamples/brass_1.jpg';
		img2 = 'assets/imgs/materialExamples/brass_2.jpg';
		description = 'Solid brass with 18k gold plating. Extremely polished and smooth. Heavy feel with a dazzling gold finish (without the price tag of solid gold). One of our favorite materials, your piece will be simply stunning. Please click on the examples to compare regular vs. gold-plated brass and get a feel for this wonderful material.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 20;
		imgDesc1 = 'Gold-plated brass on the left, regular brass on the right.';
		imgDesc2 = 'Gold-plated brass on the left, regular brass on the right.';
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
		description = 'Stainless Steel has a pitted surface for a vingage, steam-punk look. Solid steel, it is very strong and durable with a heavy feel. Can be left in plain gray or plated in a number of colors. Please click on the examples to get an idea of the texture.';
		feeFlat = 6.00;
		feeperCM3 = 8.00;
		shipsinBizDays = 12;
		imgDesc1 = '';
		imgDesc2 = '';
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
		description = 'Stainless Steel has a pitted surface for a vingage, steam-punk look. Solid steel, it is very strong and durable with a heavy feel. Can be left in plain gray or plated in a number of colors. Please click on the examples to get an idea of the texture.';
		feeFlat = 7.50;
		feeperCM3 = 8.00;
		shipsinBizDays = 16;
		imgDesc1 = '';
		imgDesc2 = '';
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
		description = 'Stainless Steel has a pitted surface for a vingage, steam-punk look. Solid steel, it is very strong and durable with a heavy feel. Can be left in plain gray or plated in a number of colors. Please click on the examples to get an idea of the texture.';
		feeFlat = 7.50;
		feeperCM3 = 8.00;
		shipsinBizDays = 16;
		imgDesc1 = '';
		imgDesc2 = '';
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
		description = 'Stainless Steel has a pitted surface for a vingage, steam-punk look. Solid steel, it is very strong and durable with a heavy feel. Can be left in plain gray or plated in a number of colors. Please click on the examples to get an idea of the texture.';
		feeFlat = 9.00;
		feeperCM3 = 8.00;
		shipsinBizDays = 16;
		imgDesc1 = '';
		imgDesc2 = '';
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
		description = 'Stainless Steel has a pitted surface for a vingage, steam-punk look. Solid steel, it is very strong and durable with a heavy feel. Can be left in plain gray or plated in a number of colors. Please click on the examples to get an idea of the texture.';
		feeFlat = 9.00;
		feeperCM3 = 8.00;
		shipsinBizDays = 16;
		imgDesc1 = '';
		imgDesc2 = '';
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
		description = 'Any piece would look beautiful in our sterling (92.5%) silver. Unlike hand-polished glossy or premium silver, regular sterling (92.5%) silver has a rough texture. Please click on the examples to get an idea of the texture.';
		feeFlat = 30;
		feeperCM3 = 20;
		shipsinBizDays = 15;
		imgDesc1 = '';
		imgDesc2 = 'Regular silver on the left, glossy (non-premium) silver on the right.';
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
		description = 'Glossy sterling (92.5%) silver Would look beautiful with any piece. It is lightly hand-polished to a smooth finish with some remaining bumpy surface texture. Please click on the examples to get an idea of the texture.';
		feeFlat = 35;
		feeperCM3 = 20;
		shipsinBizDays = 15;
		imgDesc1 = '';
		imgDesc2 = 'Regular silver on the left, glossy (non-premium) silver on the right.';
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
		description = 'Premium glossy sterling (92.5%) silver is stunningly beautiful. It is highly hand polished to a wet-looking sheen and is exceptionally shiny. Our favorite material, your piece will look dazzling. Since it is polished by hand, some interior surfaces may remain unpolished if they can\'t be reached.';
		feeFlat = 78;
		feeperCM3 = 28;
		shipsinBizDays = 15;
		imgDesc1 = '';
		imgDesc2 = '';
		that.materialChange();
	}
	
	document.getElementById('unpolishedtitanium').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Titanium unpolished';
		name = 'Unpolished Solid Titanium';
		cost = '$$$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/titaniumUnpolished_1.jpg';
		img2 = 'assets/imgs/materialExamples/titaniumUnpolished_2.jpg';
		description = 'Beautiful and vibrant, premium unpolished titanium has a gray silver color. Solid titanium, it is strong and durable with a heavy feel to it. Unlike polished, it has a slightly rough texture. Please click on the examples to get an idea of this amazing material.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 20;
		imgDesc1 = '';
		imgDesc2 = '';
		that.materialChange();
	}
	
	document.getElementById('polishedtitanium').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Titanium polished';
		name = 'Polished Solid Titanium';
		cost = '$$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/titaniumPolished_1.jpg';
		img2 = 'assets/imgs/materialExamples/titaniumPolished_2.jpg';
		description = 'Any piece would look stunning in our premium, polished titanium. It is dazzlingly beautiful, polished to a high, glossy sheen. Solid titanium, it is strong and durable with a heavy feel to it. Please note: Since it is polished by hand, some interior surfaces may remain unpolished if they can\'t be reached.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 20;
		imgDesc1 = '';
		imgDesc2 = '';
		that.materialChange();
	}
	
	document.getElementById('regulargold').onclick = function()
	{
		sceneWrapper.tubeMeshParams['Material'] = 'Gold regular';
		name = 'Premium Solid Gold';
		cost = '$$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/gold_1.jpg';
		img2 = 'assets/imgs/materialExamples/gold_2.jpg';
		description = 'Not some thin plating, this is pure, 14k solid gold. Incredible, valuable, and timeless, your piece will be polished to a beautiful finish. Please note: Since it is polished by hand, some interior surfaces may remain unpolished if they can\'t be reached.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 20;
		imgDesc1 = '';
		imgDesc2 = '';
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
	
	this.getImgDesc1 = function()
	{
		return imgDesc1;	
	}
	
	this.getImgDesc2 = function()
	{
		return imgDesc2;	
	}
	
	this.panelUpdate = function()
	{
		document.getElementById('idMaterialName').textContent = name;
		document.getElementById('idCostContainer').textContent = 'Cost: ' + cost;
		document.getElementById('idSmoothContainer').textContent = 'Smooth: ' + smooth;
		document.getElementById('idM1').src = img1;
		document.getElementById('idM2').src = img2;
		document.getElementById('idMaterialDescription').textContent = description;
	}
}