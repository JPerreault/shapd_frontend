

function loadBlank()
{
    document.getElementById('shape_stage').src = "blank.html";
}

function loadScreenshotStage()
{
    loadBlank();
    setHash();
    document.getElementById('shape_stage').src = "viewer.html"+ location.hash;
    
}
