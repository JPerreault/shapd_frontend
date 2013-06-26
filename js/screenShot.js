

function loadBlank()
{
    document.getElementById('shape_stage').src = "blank.html";
}

function loadScreenshotStage()
{
    loadBlank();
    document.getElementById('shape_stage').src = "viewer.html#"+ hashend.replace("%7C","|");
    
}
