const cl = console.log,
    target = document.querySelector('#shape-target'),
    shName = document.querySelector('#Shape-Name span'),
    shWidth = document.querySelector('#Width span'),
    shHeight = document.querySelector('#Height span'),
    shRadius = document.querySelector('#Radius span'),
    shArea = document.querySelector('#Area span'),
    shPerimeter = document.querySelector('#Perimeter span');

class Shape {
    constructor(height, className){
        this.height = height;
        this.className = className;
    }
    createEl(){
        let c = document.createElement('div'),
            parseHeight = parseInt(this.height),
            parseWidth = parseInt(this.width);

        c.style.top = this.randNumb(0, (600 - parseHeight))+"px";
        c.style.left = this.randNumb(0, (600 - parseWidth))+"px";
        c.style.height = parseHeight+"px"; 
        c.style.width = parseWidth+"px"; 
        c.classList.add(this.className);

        if(this.className == "tri"){
            c.style.borderRightWidth = parseHeight + 'px';
            c.style.borderBottomWidth = parseHeight + 'px';
            c.style.borderBottomColor = this.randomCol();
        } else {
            c.style.backgroundColor = this.randomCol();
        }

        target.appendChild(c);

        c.addEventListener('click', function(){
            let classN = this.getAttribute('class'),
                shpW = this.offsetWidth,
                shpH = this.offsetHeight,
                shpRadius = shpH / 2,
                shpArea = shpW * shpH,
                shPeri = (shpW*2) + (shpH*2);
            switch (classN) {
                case 'squa':
                    shName.innerHTML = 'Square';
                    print_widthHeight();
                    shArea.innerHTML = shpArea;
                    shPerimeter.innerHTML = shPeri;
                    shRadius.innerHTML = '-----';
                    break;
                case 'rect':
                    shName.innerHTML = 'Rectangle';
                    print_widthHeight();
                    shArea.innerHTML = shpArea;
                    shPerimeter.innerHTML = shPeri; 
                    shRadius.innerHTML = '-----';
                    break;
                case 'tri':
                    shName.innerHTML = 'Triangle';
                    print_widthHeight();
                    shArea.innerHTML = (shpArea / 2).toFixed(0);
                    shPerimeter.innerHTML = (Math.pow(shPeri), 2).toFixed(0); 
                    shRadius.innerHTML = '-----';
                    break;
                case 'circ':
                    shName.innerHTML = 'Circle';
                    print_widthHeight();
                    shArea.innerHTML = (Math.PI * (shpRadius * shpRadius)).toFixed(0);
                    shPerimeter.innerHTML = (2 * Math.PI * shpRadius).toFixed(0); 
                    shRadius.innerHTML = shpRadius;
                    break;
            }
            function print_widthHeight(){
                shWidth.innerHTML = shpW;
                shHeight.innerHTML = shpH;
            }
            cl();
        });
        c.addEventListener('dblclick', function(){
            this.remove();
        });
    }
    randNumb(min, max){
        const random =  Math.floor( Math.random() * (max - min)) + min;
        return random;
    }
    randomCol(){
        let colNum1 = this.randNumb(0,255),
            colNum2 = this.randNumb(0,255),
            colNum3 = this.randNumb(0,255);
        return `rgba(${colNum1},${colNum2},${colNum3})`;
    }
    describe(){
        
    }
}
class Circle extends Shape{
    constructor(height){
        super(height);
        this.width = height;
        this.className = 'circ';
    }
}
class Square extends Shape{
    constructor(height, width){
        super(height);
        this.width = height;
        this.className = 'squa';
    }
}
class Rectangle extends Shape{
    constructor(height, width){
        super(height);
        this.height = height;
        this.className = 'rect';
        this.width = width;
    }
}
class Triangle extends Shape{
    constructor(height){
        super(height);
        this.height = height;
        this.width = height;
        this.className = 'tri';
    }
}


window.addEventListener('DOMContentLoaded', function(){
    // disable buttons
    const circleSubmit = document.querySelector('.circle-group input[type="submit"]'),
        squareSubmit = document.querySelector('.square-group input[type="submit"]'),
        rectSubmit = document.querySelector('.rectangle-group input[type="submit"]'),
        triSubmit = document.querySelector('.triangle-group input[type="submit"]');
    const subAr = [circleSubmit, squareSubmit, rectSubmit, triSubmit];
    
    // disable submit buttons firstly
    disableBtns();
    cl('this has been disabled');

    // cycle through array of children to find the number inputs. If focused, toggle disabled button
    const inputs = document.querySelectorAll('input[type="number"]');
    for (let i = 0; i < inputs.length; i++) {
        const el2 = inputs[i];
        el2.classList.add(i);
        cl(el2);
        
        // if input is focus, enable submit button
        el2.addEventListener("keyup", checkButton);

        // function to check if input has value, then activate button. Otherwise, disable it
        function checkButton(e){
            const par = e.currentTarget.parentNode.querySelector('input[type="submit"]');
            const el2val = el2.value.length;
            if(el2.value.length > 0){
                // cl(el2.value);
                par.removeAttribute('disabled');
            } else {
                par.setAttribute('disabled', 'true');
                cl('this has been disabled');
            }
        }
    }

    // circle
    circleSubmit.addEventListener('click', function(){
        const inVal = document.querySelector('.circle-group input[type="number"]').value;
        if(inVal > 600){
            alert('Please enter a number that is 600 or less');
        } else {
            let shape = new Circle(inVal);
            shape.createEl();
        }
    });
    // square
    squareSubmit.addEventListener('click', function(){
        const inVal = document.querySelector('.square-group input[type="number"]').value;
        if(inVal > 600){
            alert('Please enter a number that is 600 or less');
        } else {
            let shape = new Square(inVal);
            shape.createEl();
        }        
    });
    // rectangle
    rectSubmit.addEventListener('click', function(){
        const rectArray = document.querySelectorAll('.rectangle-group input[type="number"]'),
            inValOne = parseInt(rectArray[0].value),
            inValTwo = parseInt(rectArray[1].value);
        if(inValOne <= inValTwo){
            alert('A rectangles width needs to be greater than it\'s height. Please adjust your values. Please try again!');
        } else {
            if(inValOne > 600){
                alert('Your width needs to be 600 or less. Please try again!');
            } else {
                let shape = new Rectangle(inValTwo, inValOne);
                shape.createEl();
            }
        }
    });
    // triangle
    triSubmit.addEventListener('click', function(){
        const inVal = document.querySelector('.triangle-group input[type="number"]').value;
        if(inVal > 600){
            alert('Please enter a number that is 600 or less');
        } else {
            let shape = new Triangle(inVal);
            shape.createEl();
        }
    });

    function disableBtns(){
        for (let i = 0; i < subAr.length; i++) {
            // array item
            const el = subAr[i];
            // disable buttons
            el.setAttribute('disabled', true);
        }
    }
});