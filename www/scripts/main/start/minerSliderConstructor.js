function makeMinerSlider(slider, sliderValue, min, max){
    sliderValue.style.fontWeight = "bold";
    slider.innerHTML = '';
    slider.style.backgroundColor = colorMinerSlider; 
    var thumb = document.createElement("div");
    thumb.className = slider.className + "-thumb";
    thumb.style.backgroundColor = colorMinerSlider;   
    slider.appendChild(thumb);

    var step=1, stepDecimals=0,
        sliderCoords = getCoords(slider),
        sliderLength = slider.offsetWidth,
        numberOfSteps = (max-min)/step,
        stepLength = sliderLength/numberOfSteps;

    var value = min + step*Math.round(numberOfSteps*Math.random()/5);
    value = value.toFixed(stepDecimals);
    value = value*1;

    slider.value = value;
    sliderValue.innerHTML = value + " sat/B";
    thumb.style.left = ((value-min)/step)*stepLength - thumb.offsetWidth/2 + 'px';

    var isMouseDownOnSlider = 0, isMouseOverSlider = 0;

    var sliderMouseover = function(e){
        isMouseOverSlider = 1;
        slider.style.opacity = 1;
    }

    var sliderMouseout = function(e){
        isMouseOverSlider = 0;
        isMouseDownOnSlider ? slider.style.opacity = 1: slider.style.opacity = .7;
    }

    var sliderOnMouseDown1 = function(e){
        var sliderCoords = getCoords(slider);
        var sliderLength = slider.offsetWidth;
        var stepLength = sliderLength/numberOfSteps;
        var thumbCoords = getCoords(thumb);
        var thumbStyle = thumb.style;
        e.pageX = e.pageX || e.touches[0].pageX;
        isMouseDownOnSlider = 1; 

        if (e.pageX > thumbCoords.right || e.pageX < thumbCoords.left) {
            var temp = Math.round((e.pageX - sliderCoords.left)/stepLength);
            thumbStyle.left = temp*stepLength - (thumb.offsetWidth/2) + 'px';
            value = min + step*temp;
            value = value.toFixed(stepDecimals);
            value = value*1;
            slider.value = value;
            sliderValue.innerHTML = value.toFixed(stepDecimals) + " sat/B";
        }        
        controlSendCalculator();
        controlDetailsCalculator();
    };

    var sliderOnMouseDown2 = function(e){
        e.preventDefault(); 
        isMouseDownOnSlider = 1; 

        var sliderCoords = getCoords(slider);
        var sliderLength = slider.offsetWidth;
        var stepLength = sliderLength/numberOfSteps;
        e.pageX = e.pageX || e.touches[0].pageX; 
        var shiftX = e.pageX - getCoords(thumb).left;    
        var thumbStyle = thumb.style;         
        slider.style.opacity = 1;

        function changeAtMove(e){ 
            isMouseDownOnSlider = 1; 
            e.pageX = e.pageX || e.touches[0].pageX;     
            if((e.pageX - shiftX + thumb.offsetWidth/2) < sliderCoords.left){
                value = min;
                thumbStyle.left = - (thumb.offsetWidth/2) +'px';     
            } else if((e.pageX - shiftX + thumb.offsetWidth/2) > sliderCoords.right){
                value = max;
                thumbStyle.left = slider.offsetWidth - (thumb.offsetWidth/2) + 'px';
            } else {
                var temp = Math.round((e.pageX - shiftX  + thumb.offsetWidth/2 - sliderCoords.left)/stepLength);
                thumbStyle.left = temp*stepLength - thumb.offsetWidth/2 + 'px';
                value = min + step*temp;
                value = value.toFixed(stepDecimals);
                value = value*1;
            }
            sliderValue.innerHTML = value.toFixed(stepDecimals) + " sat/B";
            slider.value = value;
            controlSendCalculator();
            controlDetailsCalculator();
        }

        document.onmousemove = function(e){
            changeAtMove(e);
        }

        document.onmouseup = slider.onmouseup = function(){
            isMouseDownOnSlider = 0;
            isMouseOverSlider ? slider.style.opacity = 1: slider.style.opacity = .7;
            document.onmousemove = document.onmouseup = null;
        }
    };

    var sliderOnMouseDown3 = function(e){
        e.preventDefault(); 
        isMouseDownOnSlider = 1; 

        var sliderCoords = getCoords(slider);
        var sliderLength = slider.offsetWidth;
        var stepLength = sliderLength/numberOfSteps;
        e.pageX = e.pageX || e.touches[0].pageX;
        var shiftX = e.pageX - getCoords(thumb).left;    
        var thumbStyle = thumb.style;         
        slider.style.opacity = 1;

        function changeAtMove(e){ 
            isMouseDownOnSlider = 1;  
            e.pageX = e.pageX || e.touches[0].pageX;        
            if((e.pageX - shiftX + thumb.offsetWidth/2) < sliderCoords.left){
                value = min;
                thumbStyle.left = - (thumb.offsetWidth/2) +'px';     
            } else if((e.pageX - shiftX + thumb.offsetWidth/2) > sliderCoords.right){
                value = max;
                thumbStyle.left = slider.offsetWidth - (thumb.offsetWidth/2) + 'px';
            } else {
                var temp = Math.round((e.pageX - shiftX  + thumb.offsetWidth/2 - sliderCoords.left)/stepLength);
                thumbStyle.left = temp*stepLength - thumb.offsetWidth/2 + 'px';
                value = min + step*temp;
                value = value.toFixed(stepDecimals);
                value = value*1;
            }
            sliderValue.innerHTML = value.toFixed(stepDecimals) + " sat/B";
            slider.value = value;
            controlSendCalculator();
            controlDetailsCalculator();
        }

        document.ontouchmove = function(e){
            changeAtMove(e);
        }

        document.ontouchend = slider.ontouchend = function(){
            isMouseDownOnSlider = 0;
            isMouseOverSlider ? slider.style.opacity = 1: slider.style.opacity = .7;
            document.ontouchmove = document.ontouchend = null;
        }
    };

    slider.parentNode.addEventListener("mousedown", sliderOnMouseDown1);
    slider.parentNode.addEventListener("mousedown", sliderOnMouseDown2);
    //slider.parentNode.addEventListener("touchstart", sliderOnMouseDown1);
    slider.parentNode.addEventListener("touchstart", sliderOnMouseDown3);
    slider.parentNode.addEventListener("mouseover", sliderMouseover);
    slider.parentNode.addEventListener("mouseout", sliderMouseout);

    function getCoords(elem){
        var box = elem.getBoundingClientRect();
        return {
            top:   box.top + pageYOffset,
            left:  box.left + pageXOffset,
            right: box.right + pageXOffset
        };
    }
}

