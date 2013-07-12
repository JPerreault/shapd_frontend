
var dropdownCount = 0;

// pos should be "TOP", "CENTER", "BOTTOM", or any ID of an element
function generateDropDown(width, height, messageHTML)
{
    dropdownCount++;
    
    var div = document.createElement("div");
    
    div.setAttribute("id", "popup"+dropdownCount);
    div.style.width = ""+width+"px";
    div.style.marginLeft = "-"+(width/2)+"px";
    div.style.height = ""+height+"px";
    div.style.top = "-"+height+"px";
    
    div.style.color = "white";
    div.innerHTML = messageHTML;
    div.className = "swoop";
	div.style.top = '0px';
	div.style.left = '50%';
    
    document.body.appendChild(div);
    
    return div.id;
}


function generateWhiteDropDown(width, height, messageHTML)
{
    dropdownCount++;
    
    var div = document.createElement("div");
    
    div.setAttribute("id", "popup"+dropdownCount);
    div.style.width = ""+width+"px";
    div.style.marginLeft = "-"+(width/2)+"px";
    div.style.height = ""+height+"px";
    div.style.top = "-"+height+"px";
    
    div.style.color = "white";
    div.innerHTML = messageHTML;
    div.className = "whiteSwoop";
    
    document.body.appendChild(div);
    
    return div.id;
}

function generateTutorialMsg(messageHTML, width, lightUpID)
{
    dropdownCount++;
    
    var div = document.createElement("div");
    
    div.setAttribute("id", "popup"+dropdownCount);
    div.style.color = "white";
	div.style.width = ""+width+"px";
	div.style.padding = '20px';
    div.innerHTML = messageHTML;
    div.className = "swoop";
    
    document.body.appendChild(div);
	if (typeof lightUpID !== 'undefined')
		document.getElementById(lightUpID).style.zIndex = '100000';
    
    return div.id;
}

function generateLightbox(src, imgDesc)
{
    dropdownCount++;

    var div = document.createElement("div");
	var src = src;
	var imgD = imgDesc;
	
    div.setAttribute("id", "popup"+dropdownCount);
   	div.style.left = '50%';
	div.style.padding = '30px';
    div.style.color = "white";
    div.innerHTML = "<br><br><img src='" + src + "'><br><br>" + imgD;
    div.className = "swoop";
    
    document.body.appendChild(div);
    
    div.style.marginTop = "-"+parseInt(div.clientHeight)/2;
	div.style.marginLeft = "-"+parseInt(div.clientWidth)/2;
	
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

function slideDownCustTopL(id, fromTop, left)
{
	
    var div = document.getElementById(id);
	div.style.left = left;
    div.style.display = "block";
	div.className = "swoop top left";
    
    $("#blackout").fadeIn();
    $("#"+id).animate({top:fromTop});
}

function slideDownCustBotR(id, fromBot, right)
{
	
    var div = document.getElementById(id);
	div.style.right = right;
    div.style.display = "block";
	div.className = "swoop bot right";
    
    $("#blackout").fadeIn();
    $("#"+id).animate({bottom:fromBot});
}

function slideDownCustBotL(id, fromBot, left)
{
	
    var div = document.getElementById(id);
	div.style.left = left;
    div.style.display = "block";
	div.className = "swoop bot left";
    
    $("#blackout").fadeIn();
    $("#"+id).animate({bottom:fromBot});
}

function slideDownCustBotR(id, fromBot, right)
{
	
    var div = document.getElementById(id);
	div.style.right = right;
    div.style.display = "block";
	div.className = "swoop bot right";
    
    $("#blackout").fadeIn();
    $("#"+id).animate({bottom:fromBot});
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
	div.style.marginLeft = "-"+parseInt(div.style.width)/2;
    div.style.display = "none";
    div.style.top = "50%";
    
    $("#blackout").fadeIn();
    $("#"+id).fadeIn();
}

