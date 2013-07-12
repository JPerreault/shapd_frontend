var Tutorial = function(view, doTutorial)
{
	var rotationsDone = 0;
	this.tutorialOn = doTutorial;
	this.shapeLibClicked = 0;
	var that = this;
	
	if (doTutorial)
		tutIntro();

	function tutIntro() {
		var tut = '<div style="padding:30px;"><span style="font-size:22px; font-weight: bold;"> Hi!</span><br><br><span style="font-size:18px;">It looks like this is your first time!<br> Can we show you around?</span><br><br><button id = "noThanks" class="tutButton buttonImg">No, thanks.</button><br><button id = "yesPlease" class="tutButton buttonImg">Sure! Show me cool stuff.</button></div>';
		var d1 = generateDropDown(400, 340, tut);
		fout = d1;
		fadeIn(d1);
	}

	function tut1() {
		fadeOut(fout);
		var tut = 'Welcome!<br><br>This is the starting shape which you\'re going to turn into a pendant. You rotate it by clicking and dragging, or you can zoom in and out with the mouse wheel.<br><img src = "assets/imgs/shapes/1.png"><br><br>Give it a shot!';
		var d1 = generateTutorialMsg(tut, 300);
		fout = d1;
		slideDownCustBot(d1, '45%', '65%');	
		
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
		slideDownCustBot(d1, '22%', '18%');	
	}

	this.tut3 = function() {
		if (this.shapeLibClicked === 0)
		{
			document.getElementById('idShapeLibrary').style.zIndex = 1000;
			fadeOut(fout);
			var tut = '<img src = "assets/imgs/misc/arrowWhiteUp.png"><br><br>Nice!<br><br>Now for the fun part. <br><br>Use these sliders to modify your shape. "Modify" and "Loops" change it the most, usually in unxpected ways.<br><br> Go on! Play a bit.';
			var d1 = generateTutorialMsg(tut, 250);
			fout = d1;
			slideDownCustTop(d1, '18%', '1%');	
			
			this.shapeLibClicked++;
			$(".dg.main")[0].style.zIndex = 100000;
		}
	}

	this.tut4 = function() {
		highlight = 'idSaveButtonContainer';
		var tut = '<img src = "assets/imgs/misc/arrowWhiteUp.png"><br><br>Great!<br><br>Now for the fun part. <br><br>Use these sliders to modify your shape. "Modify" and "Loops" change it the most, usually in unxpected ways.<br><br> Go on! Play a bit.';
		var d1 = generateTutorialMsg(tut, 250, highlight);
		fout = d1;
		slideDownCustTop(d1, '18%', '1%');
	}

	function noTut() {
		fadeOut(fout);
		tutorialOn = false;
	}
	
	document.getElementById('noThanks').onclick = function()
	{
		this.tutorialOn = false;
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

		if (that.tutorialOn === true && (Math.abs(view.targetX) > 5 || Math.abs(view.targetY) > 5))
		{
			document.removeEventListener( 'mousedown', onTwoClick, false );
			tut2();
		}
	}
}
