//Error Message Functions

function errorSafariWebGL() {
	
	document.getElementById('errorMessage').innerHTML ='<h4 class="secondary"><strong>We detected that you do not have something called WebGL enabled on Safari, which we need for the Shapd app.<br>  <br>  Follow these quick steps to enable it:</strong></singleline></h4>  <ul>    <li>Open the Safari menu and select <strong>Preferences</strong>.</li>  <li>Then, click the <strong>Advanced</strong> tab in the <strong>Preferences</strong> window.</li>  <li>Then, at the bottom of the window, check the <strong>Show Develop menu</strong> in menu bar checkbox.</li>  <li>Then, open the <strong>Develop menu</strong> in the menu bar and select <strong>Enable WebGL</strong>.</li>  </ul>  <h4 class="secondary">    <strong>      Our app will work now. Sorry for any inconvenience! <br>        </strong>  </h4>';

	document.getElementById('bottomMessage').innerHTML = '<h4 class="secondary"><center><singleline label="Title">  <p><a href="https://www.shapd.co/demo/">Try again</a><a href="https://www.shapd.co/demo/"></a> once you enable it.                              </p></singleline>  <p style="font-size:12px;">(Alternatively, you could also use an updated version of <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a> or <a href="https://www.google.com/intl/en/chrome/browser/">Chrome</a>.)</p></center>';
}


function chromeError() {
	
	document.getElementById('errorMessage').innerHTML = '<h4 class="secondary"><singleline label="Title"><strong>We detected that you are using an older version of Chrome. <br>  <br>  Our app needs an updated version to work. Please update and try again (just a couple of easy steps <a href="https://support.google.com/chrome/answer/95414?hl=en">here</a>).  <br>  <br>  Sorry for any inconvenience!<br></strong></singleline></h4>';
	
}


function firefoxError() {
	
	document.getElementById('errorMessage').innerHTML = ' <h4 class="secondary"><singleline label="Title"><strong>We detected that you are using an older version of Firefox. <br>  <br>  Our app needs an updated version to work. Please update and try again (just a couple of easy steps <a href="http://www.mozilla.org/en-US/firefox/update/">here</a>).  <br>  <br>  Sorry for any inconvenience!<br></strong></singleline></h4>';
	
}

function safariError() {
	
	document.getElementById('errorMessage').innerHTML = '<h4 class="secondary"><singleline label="Title"><strong>We detected that you are using an older version of Safari. <br>  <br>  Our app needs an updated version to work. Please update and try again (just a couple of easy steps <a href="http://www.apple.com/softwareupdate/">here</a>).  <br>  <br>  Sorry for any inconvenience!<br></strong></singleline></h4>';
	
}