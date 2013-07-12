var Tutorial = function(view, doTutorial)
{
	var rotationsDone = 0;
	this.tutorialOn = doTutorial;
	this.shapeLibClicked = 0;
	this.controllerMoved = 0;
	var that = this;
	
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
		
		document.addEventListener( 'mousedown', onTwoClick, false );
		function onTwoClick( event ) 
		{
			fadeOut(fout);

			if (that.tutorialOn === true && (Math.abs(view.targetX) > 3 || Math.abs(view.targetY) > 3))
			{
				document.removeEventListener( 'mousedown', onTwoClick, false );
				tut2();
			}
		}
	}

	function tut1() {
		fadeOut(fout);
		var tut = 'Welcome!<br><br>This is the starting shape which you\'re going to turn into a pendant. You rotate it by clicking and dragging, or you can zoom in and out with the mouse wheel.<br><img src = "assets/imgs/shapes/1.png"><br><br>Give it a shot!';
		var d1 = generateTutorialMsg(tut, 300);
		fout = d1;
		slideDownCustBotR(d1, '45%', '300px');	
		
		document.getElementById('popup2').onclick = function()
		{
			fadeOut(fout);
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
		if (this.shapeLibClicked === 0)
		{
			document.getElementById('idShapeContainer').style.zIndex = 1000;
			fadeOut(fout);
			var tut = '<img src = "assets/imgs/misc/arrowWhiteUp.png"><br><br>Nice!<br><br>Now for the fun part. <br><br>Use these sliders to modify your shape. "Modify" and "Loops" change it the most, usually in unxpected ways.<br><br> Go on! Play a bit.';
			var d1 = generateTutorialMsg(tut, 250);
			fout = d1;
			slideDownCustTopL(d1, '18%', '1%');	
			
			this.shapeLibClicked++;
			$(".dg.main")[0].style.zIndex = 100000;
		}
	}

	this.tut4 = function() {
		$(".dg.main")[0].style.zIndex = 1000;
		fadeOut(fout);
		this.controllerMoved++;
		highlight = 'idSaveButtonContainer';
		var tut = '<br>Great!<br><br><img src = "assets/imgs/misc/arrowWhiteDown.png">';
		var d1 = generateTutorialMsg(tut, 200, highlight);
		fout = d1;
		slideDownCustBotR(d1, '200px', '30px');
	}

	function noTut() {
		fadeOut(fout);
		tutorialOn = false;
	}
}
