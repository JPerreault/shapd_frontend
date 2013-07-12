function tutorial()
{
	tutIntro();	
}	

function tutIntro() {
	var tut = '<div style="padding:30px;"><span style="font-size:22px; font-weight: bold;"> Hi!</span><br><br><span style="font-size:18px;">It looks like this is your first time!<br> Can we show you around?</span><br><br><button class="tutButton buttonImg" onclick="noTut();">No, thanks.</button><br><button class="tutButton buttonImg" onclick="tut1();">Sure! Show me cool stuff.</button></div>';
	var d1 = generateDropDown(400, 340, tut);
	fout = d1;
	fadeIn(d1);
}

function tut1() {
	fadeOut(fout);
	highlight = 'datGuiStuff';
	var tut = 'Welcome!<br><br>This is the starting shape which you\'re going to turn into a pendant. You rotate it by clicking and dragging, or you can zoom in and out with the mouse wheel.<br><img src = "assets/imgs/shapes/1.png"><br><br>Give it a shot!';
	var d1 = generateTutorialMsg(tut, 300, highlight);
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

function tut3() {
	highlight = 'datGuiStuff';
	var tut = '<img src = "assets/imgs/misc/arrowWhiteUp.png"><br><br>Nice!<br><br>Now for the fun part. <br><br>Use these sliders to modify your shape. "Modify" and "Loops" change it the most, usually in unxpected ways.<br><br> Go on! Play a bit.';
	var d1 = generateTutorialMsg(tut, 250, highlight);
	fout = d1;
	slideDownCustTop(d1, '18%', '1%');	
}

function tut4() {
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