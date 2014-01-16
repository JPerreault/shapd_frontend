var SaveLoad = function(progState)
{
	document.getElementById('idSaveButton').onmousedown = function()
	{
		sceneWrapper.redrawMesh(currentMesh);
        
		if (typeof newuser !== 'undefined' && newuser)
			createNewUser();
        else
            saveButtonAction();
	}
	
	document.getElementById('idSaveStayButton').onmousedown = function()
	{
		sceneWrapper.redrawMesh(currentMesh);
		if (typeof newuser !== 'undefined' && newuser)
			createNewUser();
		else
			saveShape();
	}
	
	function saveButtonAction()
	{
		firstTime = false;
		if (progState.state == 'creator')
		{
			progState.changeState('loops');
			progState.setupInterface();
			saveShape();
		}
		else if (progState.state == 'loops')
		{
			progState.changeState('finalize');
			loops = false;
			progState.setupInterface();
			saveShape();
			
		}
		else if (progState.state == 'finalize')
		{
			if (printable)
			{
                if (typeof givenFeedback !== 'undefined' && !givenFeedback)
                    promptForFeedback()
				progState.changeState('publish');
				progState.setupInterface();
				saveShape();
				
			}
		}
	}
};

function saveLib()
{
    
    localStorage['shapes'] = JSON.stringify({'array' : shapeLib});
}

function saveShape()
{
    if (typeof shapeID == 'undefined')
    {
        if (typeof localStorage['shapes'] !== 'undefined')
        {
            shapeLib = JSON.parse(localStorage['shapes']).array;
            if (typeof shapeLib === 'undefined')
                shapeLib = [];
        }
        else
            shapeLib = [];
        var shape = {};
        shape.hash = hashend;
        location.hash = "id="+shapeLib.length;
        shapeID = shapeLib.length;
        shapeLib.push(shape);
        saveLib();
        loadScreenshotStage();
    }
}