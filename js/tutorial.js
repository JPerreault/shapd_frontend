var Tutorial = function(view, doTutorial)
{
	var rotationsDone = 0;
	this.tutorialOn = doTutorial;
	this.shapeLibClicked = 0;
	this.controllerMoved = 0;
	this.loopPage = 0;
	var that = this;
	this.matsPage = 0;
	
	if (doTutorial)
		tutIntro();

	function tutIntro() {
		var tut = '<div style="padding:30px;"><span style="font-size:22px; font-weight: bold;"> Hi!</span><br><br><span style="font-size:18px;">It looks like this is your first time!<br> Can we show you around?</span><br><br><button id = "noThanks" class="tutButton buttonImg">No, thanks.</button><br><button id = "yesPlease" class="tutButton buttonImg">Sure! Show me cool stuff.</button></div>';
		var d1 = generateDropDown(400, 340, tut);
		fout = d1;
		fadeIn(d1);
		
		document.getElementById('noThanks').onclick = function()
		{
			that.tutorialOn = false;
			fadeOut(fout);
		}
		document.getElementById('yesPlease').onclick = function()
		{
			tut1();
		}	
		
	}

	function tut1() {
			clearHighlights();
			fadeOut(fout);
			var tut = '<b>Welcome!</b><br><br>Let\'s get you started.<br><br><img height=270 width=260 src ="assets/imgs/misc/mousetut.png" style="border: 2px solid white; -moz-border-radius: 12px; border-radius: 12px;"><br><br><button id = "giveShot" class="tutButton buttonImg">Give it a shot!</button>';
			var d1 = generateTutorialMsg(tut, 300);
			fout = d1;
			slideDownCustBotR(d1, 'center', 'center');	
		
			document.getElementById('popup2').onclick = function()
			{
				fadeOut(fout);
			}
			document.getElementById('giveShot').onclick = function()
			{
				fadeOut(fout);
			}
			document.addEventListener( 'mousedown', onTwoClick, false );
			function onTwoClick( event ) 
			{
				fadeOut(fout);
				if (that.tutorialOn === true && (Math.abs(view.targetX) > 5 || Math.abs(view.targetY) > 5))
				{
					document.removeEventListener( 'mousedown', onTwoClick, false );
					tut2();
				}
			}
	}

	function tut2() {
		clearHighlights();
		highlight = 'idShapeContainer';
		var tut = 'Great!<br><br> You can change base shapes from the library. <br><br>(Scroll down to see more).<br><img src = "assets/imgs/misc/arrowWhite.png">';
		var d1 = generateTutorialMsg(tut, 250, highlight);
		fout = d1;
		slideDownCustTopL(d1, '405px', '500px');	
		
		document.addEventListener( 'mousedown', sliderClicked, false );
	}
	
	function sliderClicked(event) {
		if( event.target.className.indexOf('slider') !== -1) {
			fadeOut(fout);  
			document.removeEventListener( 'mousedown', sliderClicked, false );		
		}
	}
		

	this.tut3 = function() {
		if (this.shapeLibClicked === 0 )
		{
			clearHighlights();
			fadeOut(fout);
			highlight = 'shapeSlidersContainer';
			var tut = '<img src = "assets/imgs/misc/arrowWhiteUp.png"><br><br>Now for the fun part. <br><br>Use these sliders to modify your shape. "Modify" and "Loops" change it the most, usually in unxpected ways.<br><br> Go on! Play a bit.';
			var d1 = generateTutorialMsg(tut, 250, highlight);
			fout = d1;
			slideDownCustTopL(d1, '420px', '155px');	
			this.shapeLibClicked++;
			document.getElementById('shapeSliders').style.zIndex = 100000;
		}
	}

	
	
	this.tut5 = function() {
		if (this.loopPage === 0 && that.tutorialOn === true ) {
			clearHighlights();
			fadeOut(fout);
			this.loopPage = 1;
			var tut = 'In this step, we\'ll add a loop for your necklace. Just click anywhere on your piece to place it.<br><br>(Or you could choose not to and just save & continue)<br><br><button id = "okay2" class="tutButton buttonImg">Okay</button>';
			var d1 = generateTutorialMsg(tut, 280);
			fout = d1;
			slideDownCustBotR(d1, 'center', 'center');
				
				document.getElementById(d1).onclick = function()
				{
					fadeOut(fout);
					document.addEventListener( 'mousedown', onDocumentMouseDown, false );
				}
				document.getElementById('okay2').onclick = function()
				{
					fadeOut(fout);
					document.addEventListener( 'mousedown', onDocumentMouseDown, false );
				}
		}
	}
	
	this.tut6 = function() {
		if ( this.loopPage === 1 && that.tutorialOn === true ) {
			clearHighlights();
			this.loopPage = 2;
			highlight = 'idloopAroundDiv';
			var tut = '<img src = "assets/imgs/misc/arrowWhite.png"><br><br>Good! Use these to adjust the loop further and continue when done.<br><br><button id = "okay3" class="tutButton buttonImg">Okay</button>';
			var d1 = generateTutorialMsg(tut, 240, highlight);
			fout = d1;
			slideDownCustTopL(d1, '320px', '430px');

				document.getElementById('okay3').onclick = function()
				{
					fadeOut(fout);
				}
		}
	}
	
	this.tut7 = function() {
		if ( that.tutorialOn === true) {
			clearHighlights();
			fadeOut(fout);
			highlight = 'sliderContainer';
			var tut = 'Almost there! All that\'s left is to pick the size and material. Use this slider to adjust the size of your piece.<br><br><button id = "okay5" class="tutButton buttonImg">Okay</button> <img src = "assets/imgs/misc/arrowWhiteDown.png">';
			var d1 = generateTutorialMsg(tut, 200, highlight);
			fout = d1;
			slideDownCustBotR(d1, '300px', 'center');

				document.getElementById('okay5').onclick = function()
				{
					fadeOut(fout);
				}
		}
	}
	
	this.tut9 = function() {
		if ( that.tutorialOn === true ) {
			clearHighlights();
			fadeOut(fout);
			highlight = 'materials';
			var tut = '<div style="padding:15px;"><img src = "assets/imgs/misc/arrowWhite.png"><br><br> Great!<br><br>Now use these drop downs to select a material.</div>';
			var d1 = generateTutorialMsg(tut, 210, highlight);
			fout = d1;
			slideDownCustTopL(d1, '160px', '390px');
		}
	}
	
	this.tut10 = function() {
		if ( that.tutorialOn === true) {
			clearHighlights();
			fadeOut(fout);
			highlight = 'idCostDataContainer';
			highlight2 = 'idmaterialDetailContainer';
			var tut = '<div style="padding:10px;"><br> Nice!<br><br>The price and material update as you pick different options. You\'ll see that the thickness, the depth, the material, and the size all affect the price.<br><br> That\'s it for the tutorial. Thanks for trying our preview app! <br><br>We\'re excited to see what you make.<br><bR><button id = "thanks" class="tutButton buttonImg">Thanks!</button></div>';
			var d1 = generateTutorialMsg(tut, 350, highlight, highlight2);
			fout = d1;
			slideDownCustTopR(d1, 'center', 'center');
			that.tutorialOn = false;
			document.addEventListener( 'mousedown', nextClick, false );
			
			function nextClick( event ) 
			{
				fadeOut(fout);
				document.getElementById('idmaterialDetailContainer').style.zIndex = 1000;
				document.removeEventListener( 'mousedown', nextClick, false );
			}
		}
	}
	

	function noTut() {
		fadeOut(fout);
		tutorialOn = false;
	}
	
	function clearHighlights() {
		document.getElementById('shapeSlidersContainer').style.zIndex = 1000;
		document.getElementById('idShapeContainer').style.zIndex = 1000;
		document.getElementById('materials').style.zIndex = 1001;
		document.getElementById('sliderContainer').style.zIndex = 1000;
		document.getElementById('idloopAroundDiv').style.zIndex = 1000;
		document.getElementById('idSaveButtonContainer').style.zIndex = 1000;
		document.getElementById('idSaveButtonContainer').style.zIndex = 1000;
		document.getElementById('idShapeContainer').style.zIndex = 1000;
	}
}
