function screenShot(){
    
    var data = (function convertCanvasToImage(canvas) {
                var image = new Image();
                image.src = canvas.toDataURL('image/png');
                return image;
                })(document.querySelectorAll('canvas')[0]);
    
    document.body.innerHTML="<br/><br/><br/><br/><br/><br/><img src="+data.src+"> ";
}