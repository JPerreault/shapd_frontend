function loadBlank()
{
    document.getElementById('shape_stage').src = "blank.html";
}

function loadScreenshotStage()
{
    loadBlank();
    setTimeout("document.getElementById('shape_stage').src = '/demo/'+shapeID+\"?meta=1\";", 300);
}