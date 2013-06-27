

function loadBlank()
{
    document.getElementById('shape_stage').src = "blank.html";
}

function loadScreenshotStage()
{
    loadBlank();
    setTimeout("document.getElementById('shape_stage').src = location.href+shapeID+\"?meta=1\";", 1000);
}
