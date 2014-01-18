function loadBlank()
{
    document.getElementById('shape_stage').src = "blank.html";
}

function loadScreenshotStage()
{
    loadBlank();
    setTimeout("document.getElementById('shape_stage').src = 'create.html#id='+shapeID+\"&meta=1\";", 300);
}
