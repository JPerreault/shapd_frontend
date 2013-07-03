
var count = 0;

// pos should be "TOP", "CENTER", "BOTTOM", or any ID of an element
function generateDropDown(width, height, messageHTML)
{
    count++;
    
    var div = document.createElement("div");
    
    div.setAttribute("id", "popup"+count);
    div.style.width = ""+width+"px";
    div.style.marginLeft = "-"+(width/2)+"px";
    div.style.height = ""+height+"px";
    div.style.top = "-"+height+"px";
    
    div.style.color = "white";
    div.innerHTML = messageHTML;
    div.className = "swoop";
    
    document.body.appendChild(div);
    
    return div.id;
}

function slideDown(id)
{
    var div = document.getElementById(id);
    div.style.marginTop = "-20px";
    div.style.top = "-"+div.style.height;
    div.style.display = "block";
    
    $("#blackout").fadeIn();
    $("#"+id).animate({top:0});
}

function slideUp(id)
{
    var div = document.getElementById(id);
    
    $("#blackout").fadeOut();
    $("#"+id).animate({top:"-"+div.style.height, marginTop:"-20px"});
}

function fadeOut(id)
{
    var div = document.getElementById(id);
    
    $("#blackout").fadeOut();
    $("#"+id).fadeOut();
}

function fadeIn(id)
{
    var div = document.getElementById(id);
    div.style.marginTop = "-"+parseInt(div.style.height)/2;
    div.style.display = "none";
    div.style.top = "50%"
    
    $("#blackout").fadeIn();
    $("#"+id).fadeIn();
}
