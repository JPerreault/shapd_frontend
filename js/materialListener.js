var materialListener = function(sW, tutorial){
	var sceneWrapper = sW;
	var name, description, cost, smooth, img1, img2, feeFlat, feePerCM3, shipsinBizDays, ourHandling, estShippingFrom, estShippingTo, imgDesc1, imgDesc2, designTip;
	var that = this;
	
	document.getElementById('Plastic regular white').onclick = function()
	{
		currentMesh['Material'] = 'Plastic regular white';
		name = 'Rough White Plastic';
		cost = '$';
		smooth = 'Very Low';
		img1 = 'assets/imgs/materialExamples/whitePlasticRegular_1.png';
		img2 = 'assets/imgs/materialExamples/whitePlasticRegular_2.png';
		description = 'Rough plastic is our most cost effective material and is comparatively fast to make. It has a slightly grainy look - perfect for modern, artistic, or winter-themed pieces. Please click on the example pictures for a comparison of rough vs regular.';
		feeFlat = 1.5;
		feeperCM3 = 1.4;
		shipsinBizDays = 8;
		imgDesc1 = 'Regular plastic on the left, polished on the right.';
		imgDesc2 = '';
		designTip = 'Good job! Rough plastic is the least expensive material we offer.';

		that.materialChange();
	}
	
	document.getElementById('Plastic regular black').onclick = function()
	{
		currentMesh['Material'] = 'Plastic regular black';
		name = 'Rough Black Plastic';
		cost = '$';
		smooth = 'Very Low';
		img1 = 'assets/imgs/materialExamples/blackPlasticRegular_1.png';
		img2 = 'assets/imgs/materialExamples/blackPlasticRegular_2.png';
		description = 'Rough plastic is our most cost effective material and is comparatively fast to make. It has a grainy look - perfect for modern, artistic, or vintage-themed pieces. Click on the example pictures to get a sense the texture.';
		feeFlat = 1.75;
		feeperCM3 = 1.75;
		shipsinBizDays = 8;
		imgDesc1 = '';
		imgDesc2 = '';
		designTip = 'Good job! Rough plastic is the least expensive material we offer.';
		
		that.materialChange();
	}
	
	document.getElementById('Plastic regular white polished').onclick = function()
	{
		currentMesh['Material'] = 'Plastic regular white polished';
		name = 'White Regular Plastic';
		cost = '$';
		smooth = 'Low';
		img1 = 'assets/imgs/materialExamples/whitePlasticPolished_1.png';
		img2 = 'assets/imgs/materialExamples/whitePlasticPolished_2.png';
		description = 'While a smoother finish than rough plastic, regular plastic has a moderately coarse texture and is very cost effective. Comes in a variety of colors and is perfect for bright, playful pieces. Click on the examples to get a feel for the texture.';
		feeFlat = 2.00;
		feeperCM3 = 1.5;
		shipsinBizDays = 12;
		imgDesc1 = 'Regular plastic on the left, polished on the right.';
		imgDesc2 = '';
		designTip = 'Good job! Regular plastic is one of the least costly materials.';
		that.materialChange();
	}
	
	document.getElementById('Plastic regular red polished').onclick = function()
	{
		currentMesh['Material'] = 'Plastic regular red polished';
		name = 'Red Regular Plastic';
		cost = '$';
		smooth = 'Low';
		img1 = 'assets/imgs/materialExamples/redPlastic_1.png';
		img2 = 'assets/imgs/materialExamples/redPlastic_2.png';
		description = 'While a smoother finish than rough plastic, regular plastic has a moderately coarse texture and is very cost effective. Comes in a variety of colors and is perfect for bright, playful pieces. Click on the examples to get an idea of the texture.';
		feeFlat = 2.00;
		feeperCM3 = 1.5;
		shipsinBizDays = 12;
		imgDesc1 = '';
		imgDesc2 = '';
		designTip = 'Good job! Regular plastic is one of the least expensive materials.';
		that.materialChange();
	}
	
	document.getElementById('Plastic regular blue polished').onclick = function()
	{
		currentMesh['Material'] = 'Plastic regular blue polished';
		name = 'Blue Regular Plastic';
		cost = '$';
		smooth = 'Low';
		img1 = 'assets/imgs/materialExamples/bluePlastic_1.png';
		img2 = 'assets/imgs/materialExamples/bluePlastic_2.png';
		description = 'While a smoother finish than rough plastic, regular plastic has a moderately coarse texture and is very cost effective. Comes in a variety of colors and is perfect for bright, playful pieces. Click on the examples to get an idea of the texture.';
		feeFlat = 2.00;
		feeperCM3 = 1.5;
		shipsinBizDays = 12;
		imgDesc1 = '';
		imgDesc2 = '';
		designTip = 'Good job! Regular plastic is one of the least expensive materials.';
		that.materialChange();
	}
	
	document.getElementById('Plastic regular pink polished').onclick = function()
	{
		currentMesh['Material'] = 'Plastic regular pink polished';
		name = 'Hot-Pink Regular Plastic';
		cost = '$';
		smooth = 'Low';
		img1 = 'assets/imgs/materialExamples/pinkPlastic_1.png';
		img2 = 'assets/imgs/materialExamples/pinkPlastic_2.png';
		description = 'Hot pink? Yes, please. While a smoother finish than rough plastic, regular plastic has a moderately coarse texture and is very cost effective. Perfect for bright, playful pieces. Click on the examples to get an idea of the texture.';
		feeFlat = 2.00;
		feeperCM3 = 1.5;
		shipsinBizDays = 12;
		imgDesc1 = '';
		imgDesc2 = '';
		designTip = 'Good job! Regular plastic is one of the least expensive materials. And, it\'s like, hot pink.';
		that.materialChange();
	}
	
	document.getElementById('Plastic regular purple polished').onclick = function()
	{
		currentMesh['Material'] = 'Plastic regular purple polished';
		name = 'Purple Regular Plastic';
		cost = '$';
		smooth = 'Low';
		img1 = 'assets/imgs/materialExamples/purplePlastic_1.png';
		img2 = 'assets/imgs/materialExamples/purplePlastic_2.png';
		description = 'While a smoother finish than rough plastic, regular plastic has a moderately coarse texture and is very cost effective. Comes in a variety of colors and is perfect for bright, playful pieces. Click on the examples to get an idea of the texture.';
		feeFlat = 2.00;
		feeperCM3 = 1.5;
		shipsinBizDays = 12;
		imgDesc1 = '';
		imgDesc2 = '';
		designTip = 'Good job! Regular plastic is one of the least expensive materials.';
		that.materialChange();
	}
	
	document.getElementById('Plastic detail white').onclick = function()
	{
		currentMesh['Material'] = 'Plastic detail white';
		name = 'White Detail Plastic';
		cost = '$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/whiteDetail_1.png';
		img2 = 'assets/imgs/materialExamples/whiteDetail_2.png';
		description = 'Detail plastic is excellent at picking out fine details or for thinner pieces. It is much smoother than either rough or regular plastic, yet can still have a coarse finish depending on the piece. Please click on the examples to get an idea of the texture.';
		feeFlat = 2.50;
		feeperCM3 = 2.99;
		shipsinBizDays = 8;
		imgDesc1 = '';
		imgDesc2 = '';
		designTip = 'Detailed plastic is already fairly inexpensive and you get a better finish with it. You could try regular plastic for a bit of savings however.';
		that.materialChange();
	}
	
	document.getElementById('Plastic detail black').onclick = function()
	{
		currentMesh['Material'] = 'Plastic detail black';
		name = 'Black Detail Plastic';
		cost = '$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/blackDetail_1.png';
		img2 = 'assets/imgs/materialExamples/blackDetail_2.png';
		description = 'Detail plastic is excellent at picking out fine details or for thinner pieces. It is much smoother than either rough or regular plastic, yet can still have a coarse finish depending on the piece. Please click on the examples to get an idea of the texture.';
		feeFlat = 2.50;
		feeperCM3 = 2.99;
		shipsinBizDays = 8;
		imgDesc1 = '';
		imgDesc2 = '';
		designTip = 'Detailed plastic is already fairly inexpensive and you get a better finish with it. You could try regular plastic for a bit of savings however.';
		that.materialChange();
	}
	
	document.getElementById('Prime gray').onclick = function()
	{
		currentMesh['Material'] = 'Prime gray';
		name = 'Premium Smooth Gray Plastic';
		cost = '$$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/primeGray_1.png';
		img2 = 'assets/imgs/materialExamples/primeGray_2.png';
		description = 'Premium smooth gray plastic is beautiful, with a clean, sleek finish. The quality of finish is a bit more costly and takes a little longer to make, but is well worth the wait. The finished, clean look only comes in gray.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 15;
		imgDesc1 = '';
		imgDesc2 = '';
		designTip = 'Prime gray plastic has a very smooth texture but isn\'t the cheapest. Consider regular or detailed plastic if you want to save.';
		that.materialChange();
	}
	
/*	
	document.getElementById('cleartransparentplastic').onclick = function()
	{
		currentMesh['Material'] = 'Transparent resin white';
		name = 'Ultra Smooth Clear Plastic ';
		cost = '$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/transparentDetail_1.png';
		img2 = 'assets/imgs/materialExamples/transparentDetail_2.png';
		description = 'Detail plastic is excellent at picking out fine details in pieces, while still having a sligtly unsmooth finish.';
		feeFlat = 2.50;
		feeperCM3 = 2.99;
		shipsinBizDays = 15;
		that.materialChange();
	}
	*/
	document.getElementById('Transparent resin white').onclick = function()
	{
		currentMesh['Material'] = 'Transparent resin white';
		name = 'Ultra-Premium Clear & Smooth Plastic';
		cost = '$$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/transparentClear_1.png';
		img2 = 'assets/imgs/materialExamples/transparentClear_2.png';
		description = 'Ultra Premium transparent plastic is incredibly smooth for a beautiful, fine finish. Perfect for detailed pieces with a sleek texture, our ultra premium plastic is simply beautiful. Please note that the transparency is determined by the thickness of the piece.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 15;
		imgDesc1 = '';
		imgDesc2 = '';
		designTip = 'Clear and smooth plastic is very high quality but also incredibly expensive - often times as much as solid brass or stainless steel! If you want to save, consider any of the other plastics.';
		that.materialChange();
	}
	
	document.getElementById('Transparent resin red').onclick = function()
	{
		currentMesh['Material'] = 'Transparent resin red';
		name = 'Ultra-Premium Clear & Smooth Red Plastic ';
		cost = '$$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/transparentRed_1.png';
		img2 = 'assets/imgs/materialExamples/transparentRed_2.png';
		description = 'Ultra Premium transparent plastic is incredibly smooth for a beautiful, fine finish. Perfect for detailed pieces with a sleek texture, our ultra premium plastic is simply beautiful. Please note that the transparency is determined by the thickness of the piece.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 15;
		imgDesc1 = '';
		imgDesc2 = '';
		designTip = 'Clear and smooth plastic is very high quality but also incredibly expensive - often times as much as solid brass or stainless steel! If you want to save, consider any of the other plastics.';
		that.materialChange();
	}
	
	document.getElementById('Transparent resin blue').onclick = function()
	{
		currentMesh['Material'] = 'Transparent resin blue';
		name = 'Ultra-Premium Clear & Smooth Blue Plastic ';
		cost = '$$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/transparentBlue_1.png';
		img2 = 'assets/imgs/materialExamples/transparentBlue_2.png';
		description = 'Ultra Premium transparent plastic is incredibly smooth for a beautiful, fine finish. Perfect for detailed pieces with a sleek texture, our ultra premium plastic is simply beautiful. Please note that the transparency is determined by the thickness of the piece.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 15;
		imgDesc1 = '';
		imgDesc2 = '';
		designTip = 'Clear and smooth plastic is very high quality but also incredibly expensive - often times as much as solid brass or stainless steel! If you want to save, consider any of the other plastics.';
		that.materialChange();
	}
	
	document.getElementById('Transparent resin yellow').onclick = function()
	{
		currentMesh['Material'] = 'Transparent resin yellow';
		name = 'Ultra-Premium Clear & Smooth Yellow Plastic ';
		cost = '$$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/transparentYellow_1.png';
		img2 = 'assets/imgs/materialExamples/transparentYellow_2.png';
		description = 'Ultra Premium transparent plastic is incredibly smooth for a beautiful, fine finish. Perfect for detailed pieces with a sleek texture, our ultra premium plastic is simply beautiful. Please note that the transparency is determined by the thickness of the piece.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 15;
		imgDesc1 = '';
		imgDesc2 = '';
		designTip = 'Clear and smooth plastic is very high quality but also incredibly expensive - often times as much as solid brass or stainless steel! If you want to save, consider any of the other plastics.';
		that.materialChange();
	}

	document.getElementById('Alumide regular').onclick = function()
	{
		currentMesh['Material'] = 'Alumide regular';
		name = 'Regular Alumide';
		cost = '$';
		smooth = 'Very Low';
		img1 = 'assets/imgs/materialExamples/alumide_1.png';
		img2 = 'assets/imgs/materialExamples/alumide_2.png';
		description = 'Regular alumide has a sparkly, very rough metallic finish to it. Slightly brittle and very cost effective, it is perfect for a futuristic or sparkly look. Please click on the examples to get an idea of the texture.';
		feeFlat = 1.5;
		feeperCM3 = 1.75;
		shipsinBizDays = 8;
		imgDesc1 = '';
		imgDesc2 = '';
		designTip = 'Good job! Alumide is a great material and very inexpensive.';
		that.materialChange();
	}
	
	document.getElementById('Alumide polished').onclick = function()
	{
		currentMesh['Material'] = 'Alumide polished';
		name = 'Polished Alumide';
		cost = '$';
		smooth = 'Low';
		img1 = 'assets/imgs/materialExamples/polishedAlumide_1.png';
		img2 = 'assets/imgs/materialExamples/polishedAlumide_2.png';
		description = 'While smoother than regular alumide, polished alumide still has a fairly rough, metallic finish to it. Sparkly and slightly brittle, it is perfect for a futuristic look. Please click on the examples to get an idea of the texture.';
		feeFlat = 1.50;
		feeperCM3 = 2.00;
		shipsinBizDays = 12;
		imgDesc1 = '';
		imgDesc2 = '';
		designTip = 'Good job! Alumide is a great material and very inexpensive.';
		that.materialChange();
	}
	
	document.getElementById('Stainless steel regular').onclick = function()
	{
		currentMesh['Material'] = 'Stainless steel regular';
		name = 'Stainless Steel';
		cost = '$$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/ssRegular_1.png';
		img2 = 'assets/imgs/materialExamples/ssRegular_2.png';
		description = 'Stainless Steel has a pitted surface for a vingage, steam-punk look. Solid steel, it is very strong and durable with a heavy feel. Can be left in plain gray or plated in a number of colors. Please click on the examples to get an idea of the texture.';
		feeFlat = 6.00;
		feeperCM3 = 8.00;
		shipsinBizDays = 12;
		imgDesc1 = '';
		imgDesc2 = '';
		designTip = 'Stainless steel is the most cost effective solid metal. With a heavy feel, you get a lot for your money. You could try a plastic or alumide to save some money though.';
		that.materialChange();
	}
	
	document.getElementById('Stainless steel bronze matte').onclick = function()
	{
		currentMesh['Material'] = 'Stainless steel bronze matte';
		name = 'Antique Bronze-Plated Matte Stainless Steel';
		cost = '$$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/ssBronzeMatte_1.png';
		img2 = 'assets/imgs/materialExamples/ssBronzeMatte_2.png';
		description = 'Stainless Steel has a pitted surface for a vingage, steam-punk look. Solid steel, it is very strong and durable with a heavy feel. Can be left in plain gray or plated in a number of colors. Please click on the examples to get an idea of the texture.';
		feeFlat = 7.50;
		feeperCM3 = 8.00;
		shipsinBizDays = 16;
		imgDesc1 = '';
		imgDesc2 = '';
		designTip = 'Stainless steel is the most cost effective solid metal. With a heavy feel, you get a lot for your money. You could try a plastic or alumide to save some money though.';
		that.materialChange();
	}
	
	document.getElementById('Stainless steel bronze glossy').onclick = function()
	{
		currentMesh['Material'] = 'Stainless steel bronze glossy';
		name = 'Antique Bronze-Plated Glossy Stainless Steel';
		cost = '$$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/ssBronzeGlossy_1.png';
		img2 = 'assets/imgs/materialExamples/ssBronzeGlossy_2.png';
		description = 'Stainless Steel has a pitted surface for a vingage, steam-punk look. Solid steel, it is very strong and durable with a heavy feel. Can be left in plain gray or plated in a number of colors. Please click on the examples to get an idea of the texture.';
		feeFlat = 7.50;
		feeperCM3 = 8.00;
		shipsinBizDays = 16;
		imgDesc1 = '';
		imgDesc2 = '';
		designTip = 'Stainless steel is the most cost effective solid metal. With a heavy feel, you get a lot for your money. You could try a plastic or alumide to save some money though.';
		that.materialChange();
	}
	
	document.getElementById('Stainless steel gold matte').onclick = function()
	{
		currentMesh['Material'] = 'Stainless steel gold matte';
		name = 'Gold-Plated Matte Stainless Steel';
		cost = '$$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/ssGoldMatte_1.png';
		img2 = 'assets/imgs/materialExamples/ssGoldMatte_2.png';
		description = 'Stainless Steel has a pitted surface for a vingage, steam-punk look. Solid steel, it is very strong and durable with a heavy feel. Can be left in plain gray or plated in a number of colors. Please click on the examples to get an idea of the texture.';
		feeFlat = 9.00;
		feeperCM3 = 8.00;
		shipsinBizDays = 16;
		imgDesc1 = '';
		imgDesc2 = '';
		designTip = 'Stainless steel is the most cost effective solid metal. With a heavy feel, you get a lot for your money. You could try a plastic or alumide to save some money though.';
		that.materialChange();
	}
	
	document.getElementById('Stainless steel gold glossy').onclick = function()
	{
		currentMesh['Material'] = 'Stainless steel gold glossy';
		name = 'Gold-Plated Glossy Stainless Steel';
		cost = '$$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/ssGoldGlossy_1.png';
		img2 = 'assets/imgs/materialExamples/ssGoldGlossy_2.png';
		description = 'Stainless Steel has a pitted surface for a vingage, steam-punk look. Solid steel, it is very strong and durable with a heavy feel. Can be left in plain gray or plated in a number of colors. Please click on the examples to get an idea of the texture.';
		feeFlat = 9.00;
		feeperCM3 = 8.00;
		shipsinBizDays = 16;
		imgDesc1 = '';
		imgDesc2 = '';
		designTip = 'Stainless steel is the most cost effective solid metal. With a heavy feel, you get a lot for your money. You could try a plastic or alumide to save some money though.';
		that.materialChange();
	}
	
	document.getElementById('Brass regular').onclick = function()
	{
		currentMesh['Material'] = 'Brass regular';
		name = 'Regular Solid Brass';
		cost = '$$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/brass_1.png';
		img2 = 'assets/imgs/materialExamples/brass_2.png';
		description = 'Pure, 100% brass. Heavy feel to pieces with no coating or plating.  This fine smooth finish is fantastic - without the price tag of silver or gold. Perfect for an antique piece. Color might change slightly over time for an aged look. Please click on the examples to compare regular vs. gold-plated brass.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 20;
		imgDesc1 = 'Gold-plated brass on the left, regular brass on the right.';
		imgDesc2 = 'Gold-plated brass on the left, regular brass on the right.';
		designTip = 'We love brass, but if you want a less smooth texture, you could try gold-plated stainless steel as a way to save money.';
		that.materialChange();
	}
	
	document.getElementById('Brass gold plated polished').onclick = function()
	{
		currentMesh['Material'] = 'Brass gold plated polished';
		name = 'Gold-Plated Solid Brass';
		cost = '$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/brass_1.png';
		img2 = 'assets/imgs/materialExamples/brass_2.png';
		description = 'Solid brass with 18k gold plating. Extremely polished and smooth. Heavy feel with a dazzling gold finish (without the price tag of solid gold). One of our favorite materials, your piece will be simply stunning. Please click on the examples to compare regular vs. gold-plated brass and get a feel for this wonderful material.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 20;
		imgDesc1 = 'Gold-plated brass on the left, regular brass on the right.';
		imgDesc2 = 'Gold-plated brass on the left, regular brass on the right.';
		designTip = 'We love brass, but if you want a less smooth texture, you could try gold-plated stainless steel as a way to save money.';
		that.materialChange();
	}
	
	document.getElementById('Silver regular').onclick = function()
	{
		currentMesh['Material'] = 'Silver regular';
		name = 'Regular Sterling Silver';
		cost = '$$$';
		smooth = 'Low';
		img1 = 'assets/imgs/materialExamples/silverRegular_1.png';
		img2 = 'assets/imgs/materialExamples/silverRegular_2.png';
		description = 'Any piece would look beautiful in our sterling (92.5%) silver. Unlike hand-polished glossy or premium silver, regular sterling (92.5%) silver has a rough texture. Please click on the examples to get an idea of the texture.';
		feeFlat = 30;
		feeperCM3 = 20;
		shipsinBizDays = 15;
		imgDesc1 = '';
		imgDesc2 = 'Regular silver on the left, glossy (non-premium) silver on the right.';
		designTip = 'Silver is the least expensive of our precious metals. You could try regular stainless steel if you wanted to save but keep the silver color.';
		that.materialChange();
	}
	
	document.getElementById('Silver glossy').onclick = function()
	{
		currentMesh['Material'] = 'Silver glossy';
		name = 'Glossy Sterling Silver';
		cost = '$$$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/silverGlossy_1.png';
		img2 = 'assets/imgs/materialExamples/silverGlossy_2.png';
		description = 'Glossy sterling (92.5%) silver Would look beautiful with any piece. It is lightly hand-polished to a smooth finish with some remaining bumpy surface texture. Please click on the examples to get an idea of the texture.';
		feeFlat = 35;
		feeperCM3 = 20;
		shipsinBizDays = 15;
		imgDesc1 = '';
		imgDesc2 = 'Regular silver on the left, glossy (non-premium) silver on the right.';
		designTip = 'Glossy silver is beautiful but also fairly expensive. You could try regular silver or stainless steel if you wanted to save.';
		that.materialChange();
	}
	
	document.getElementById('Silver premium').onclick = function()
	{
		currentMesh['Material'] = 'Silver premium';
		name = 'Premium Glossy Sterling Silver';
		cost = '$$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/silverPremiumGlossy_1.png';
		img2 = 'assets/imgs/materialExamples/silverPremiumGlossy_2.png';
		description = 'Premium glossy sterling (92.5%) silver is stunningly beautiful. It is highly hand polished to a wet-looking sheen and is exceptionally shiny. Our favorite material, your piece will look dazzling. Since it is polished by hand, some interior surfaces may remain unpolished if they can\'t be reached.';
		feeFlat = 78;
		feeperCM3 = 28;
		shipsinBizDays = 15;
		imgDesc1 = '';
		imgDesc2 = '';
		designTip = 'Premium silver is gorgeous but also very expensive. You could switch to glossy silver (or even stainless steel) if you wanted to save.';
		that.materialChange();
	}
	
	document.getElementById('Titanium unpolished').onclick = function()
	{
		currentMesh['Material'] = 'Titanium unpolished';
		name = 'Unpolished Solid Titanium';
		cost = '$$$';
		smooth = 'Med';
		img1 = 'assets/imgs/materialExamples/titaniumUnpolished_1.png';
		img2 = 'assets/imgs/materialExamples/titaniumUnpolished_2.png';
		description = 'Beautiful and vibrant, premium unpolished titanium has a gray silver color. Solid titanium, it is strong and durable with a heavy feel to it. Unlike polished, it has a slightly rough texture. Please click on the examples to get an idea of this amazing material.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 20;
		imgDesc1 = '';
		imgDesc2 = '';
		designTip = 'Unpolished solid titanium is an incredible material, but you pay for it. Save a lot by switching to stainless steel.';
		that.materialChange();
	}
	
	document.getElementById('Titanium polished').onclick = function()
	{
		currentMesh['Material'] = 'Titanium polished';
		name = 'Polished Solid Titanium';
		cost = '$$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/titaniumPolished_1.png';
		img2 = 'assets/imgs/materialExamples/titaniumPolished_2.png';
		description = 'Any piece would look stunning in our premium, polished titanium. It is dazzlingly beautiful, polished to a high, glossy sheen. Solid titanium, it is strong and durable with a heavy feel to it. Please note: Since it is polished by hand, some interior surfaces may remain unpolished if they can\'t be reached.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 20;
		imgDesc1 = '';
		imgDesc2 = '';
		designTip = 'Polished solid titanium is our best, but also most expensive material we currently offer. Save a lot by switching to stainless steel.';
		that.materialChange();
	}
	
	document.getElementById('Gold regular').onclick = function()
	{
		currentMesh['Material'] = 'Gold regular';
		name = 'Premium Solid Gold';
		cost = '$$$';
		smooth = 'High';
		img1 = 'assets/imgs/materialExamples/gold_1.png';
		img2 = 'assets/imgs/materialExamples/gold_2.png';
		description = 'Not some thin plating, this is pure, 14k solid gold. Incredible, valuable, and timeless, your piece will be polished to a beautiful finish. Please note: Since it is polished by hand, some interior surfaces may remain unpolished if they can\'t be reached.';
		feeFlat = '';
		feeperCM3 = '';
		shipsinBizDays = 20;
		imgDesc1 = '';
		imgDesc2 = '';
		designTip = 'Almost as expensive, as, well ...gold. Currently unavailable.';
		that.materialChange();
	}
	
	document.getElementById('idM1').onclick = function()
	{
		var imgSource = document.getElementById('idM1').src;
		var imgDesc = imgDesc1;
		var d1 = generateLightbox(imgSource, imgDesc);
		fout = d1;
		fadeIn(d1);
		document.getElementById(d1).onclick = function()
		{
			fadeOut(fout);
		}
	}
	
	document.getElementById('idM2').onclick = function()
	{
		var imgSource = document.getElementById('idM2').src;
		var imgDesc = imgDesc2;
		var d1 = generateLightbox(imgSource, imgDesc);
		fout = d1;
		fadeIn(d1);
		document.getElementById(d1).onclick = function()
		{
			fadeOut(fout);
		}
	}
	
	this.materialChange = function()
	{
		currentMesh.officialName = name;
		sceneWrapper.redrawMesh(currentMesh);
		getNewPrice();
		this.panelUpdate();
		currentMesh.calculateDimensions('xyz', loop.torusDefined);
		updateThickness();
		
		if (tutorial.tutorialOn === true && state === 'finalize') {
			tutorial.tut10();
		}
	}
	
	this.panelUpdate = function()
	{
		document.getElementById('idMaterialName').textContent = name;
		document.getElementById('idCostContainer').innerHTML = 'Cost: <b>' + cost + '</b>';
		document.getElementById('idSmoothContainer').innerHTML = 'Smooth: <b>' + smooth + '</b>';
		document.getElementById('idM1').src = img1;
		document.getElementById('idM2').src = img2;
		document.getElementById('idMaterialDescription').textContent = description;
		document.getElementById('idDesignTips').innerHTML = '1) ' +  designTip;
		document.getElementById('idDesignTips').innerHTML += '<br>2)  Reduce the thickness. It can add a <u>lot</u> of cost.<br>3)  Try a smaller size or a design that uses less material.';
	}
}