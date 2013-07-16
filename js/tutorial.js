var Tutorial = function(view, doTutorial, state)
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
			
			fadeOut(fout);
			var tut = 'Welcome!<br><br>This is the starting shape which you\'re going to turn into a pendant. You rotate it by clicking and dragging, or you can zoom in and out with the mouse wheel.<br><img src = "assets/imgs/shapes/1.png"><br><button id = "giveShot" class="tutButton buttonImg">Give it a shot!</button>';
			var d1 = generateTutorialMsg(tut, 300);
			fout = d1;
			slideDownCustBotR(d1, '50%', '300px');	
		
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

				if (that.tutorialOn === true && (Math.abs(view.targetX) > 3 || Math.abs(view.targetY) > 6))
				{
					document.removeEventListener( 'mousedown', onTwoClick, false );
					tut2();
				}
			}
	}

	function tut2() {
		
			highlight = 'idShapeContainer';
			var tut = 'Great!<br><br> Now, select a base shape from the library. You can scroll down to see more shapes.<br><img src = "assets/imgs/misc/arrowWhite.png">';
			var d1 = generateTutorialMsg(tut, 250, highlight);
			fout = d1;
			slideDownCustBotL(d1, '22%', '18%');	
	}

	this.tut3 = function() {
			
		if (this.shapeLibClicked === 0 )
		{
			document.getElementById('idShapeContainer').style.zIndex = 1000;
			fadeOut(fout);
			var tut = '<img src = "assets/imgs/misc/arrowWhiteUp.png"><br><br>Now for the fun part. <br><br>Use these sliders to modify your shape. "Modify" and "Loops" change it the most, usually in unxpected ways.<br><br> Go on! Play a bit.';
			var d1 = generateTutorialMsg(tut, 250);
			fout = d1;
			slideDownCustTopL(d1, '18%', '1%');	
			this.shapeLibClicked++;
			$(".dg.main")[0].style.zIndex = 100000;
		}
	}

	this.tut4 = function() {
		
		document.addEventListener( 'mouseup', releaseSlider, false );
		function releaseSlider( event ) 
		{
			fadeOut(fout);
			$(".dg.main")[0].style.zIndex = 1000;
			highlight = 'idSaveButtonContainer';
			var tut = 'Neat, huh?<br><br>When you find a shape you like, save and go to the next step.<br><br><button id = "okay" class="tutButton buttonImg">Okay!</button><br><img src = "assets/imgs/misc/arrowWhiteDown.png">';
			var d1 = generateTutorialMsg(tut, 230, highlight);
			fout = d1;
			
			this.controllerMoved++;
			slideDownCustBotR(d1, '200px', '30px');
			
			document.getElementById('okay').onclick = function()
			{
				fadeOut(fout);
			}	
			document.removeEventListener( 'mouseup', releaseSlider, false );
		}
	}
	
	this.tut5 = function() {
		
			if (this.loopPage === 0 && that.tutorialOn === true ) {
				
				document.getElementById('idSaveButtonContainer').style.zIndex = 1000;
				fadeOut(fout);
				this.loopPage = 1;
				var tut = '<div style="padding:30px;">Now we need a way to put your pendant on your neck.<br><br>Here you can add a necklace loop (or you can just string it through, in which case you\'d skip this step). Click anywhere on your piece to add it.<br><br><button id = "okay2" class="tutButton buttonImg">Okay</button></div>';
				var d1 = generateDropDown(420, 300, tut);
				fout = d1;
				fadeIn(d1);

					document.getElementById('okay2').onclick = function()
					{
						fadeOut(fout);
						document.addEventListener( 'mousedown', onDocumentMouseDown, false );
					}
			}
	}
	
	this.tut6 = function() {
		
			if ( this.loopPage === 1 && that.tutorialOn === true ) {
				
				document.getElementById('idSaveButtonContainer').style.zIndex = 1000;
				this.loopPage = 2;
				highlight = 'idloopAroundDiv';
				var tut = '<div style="padding:10px;"><img src = "assets/imgs/misc/arrowWhite.png"><br>Use these to adjust the loop further and continue when done. <button id = "okay3" class="tutButton buttonImg">Okay</button></div>';
				var d1 = generateTutorialMsg(tut, 220, highlight);
				fout = d1;
				slideDownCustTopL(d1, '170px', '600px');

					document.getElementById('okay3').onclick = function()
					{
						fadeOut(fout);
					}
			}
	}
	
	this.tut7 = function() {
		
			if ( this.matsPage === 0 && that.tutorialOn === true) {
				
				document.getElementById('idloopAroundDiv').style.zIndex = 1000;
				this.matsPage = 1;
				var tut = '<div style="padding:30px;">Lastly we need to pick a material for your piece and size it!<br><br><button id = "okay4" class="tutButton buttonImg">Okay</button></div>';
				var d1 = generateDropDown(200, 240, tut);
				fout = d1;
				fadeIn(d1);

					document.getElementById('okay4').onclick = function()
					{
						tut8();
					}
			}
	}
	
	function tut8() {
		
			if ( that.tutorialOn === true) {
				fadeOut(fout);
				highlight = 'sliderContainer';
				var tut = '<div style="padding:15px;">Use this slider to adjust the size of your piece.<br><br><button id = "okay5" class="tutButton buttonImg">Okay</button> <img src = "assets/imgs/misc/arrowWhiteDown.png"></div>';
				var d1 = generateTutorialMsg(tut, 220, highlight);
				fout = d1;
				slideDownCustBotR(d1, '200px', 'center');

					document.getElementById('okay5').onclick = function()
					{
						fadeOut(fout);
					}
			}
	}
	
	this.tut9 = function() {
		
			if ( that.tutorialOn === true ) {
				document.getElementById('sliderContainer').style.zIndex = 1000;
				fadeOut(fout);
				highlight = 'materials';
				var tut = '<div style="padding:15px;"><img src = "assets/imgs/misc/arrowWhite.png"><br><br> Great!<br><br>Now use these drop downs to select a material.</div>';
				var d1 = generateTutorialMsg(tut, 210, highlight);
				fout = d1;
				slideDownCustTopL(d1, '20px', '240px');
			}
	}
	
		this.tut10 = function() {
		
			if ( that.tutorialOn === true ) {
				document.getElementById('materials').style.zIndex = 1000;
				fadeOut(fout);
				highlight = 'idCostDiv';
				highlight2 = 'idmaterialDetailContainer';
				var tut = '<div style="padding:15px;"><img src = "assets/imgs/misc/arrowWhiteRight.png"><br><br> Nice.<br><br>You\'ll see these update the material, price, and dimensions of your piece as you change the controls. The final price will be based on those factors, as well as the thickness and shape. When you\'ve made something beautiful, save and continue. <br><br> That\'s it for the tutorial! Have fun and we\'re so excited to see what you make!<br><bR><button id = "thanks" class="tutButton buttonImg">Thanks!</button><br><br><img src = "assets/imgs/misc/arrowWhiteDown.png"></div>';
				var d1 = generateTutorialMsg(tut, 350, highlight, highlight2);
				fout = d1;
				slideDownCustTopR(d1, '100px', '250px');
				
				document.getElementById('thanks').onclick = function()
					{
						fadeOut(fout);
					}
			}
	}
	

	function noTut() {
		fadeOut(fout);
		tutorialOn = false;
	}
}
