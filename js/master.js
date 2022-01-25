
//show the nav bar
let bar = document.querySelector('.nav .bar')

bar.onclick = function(){
    this.classList.toggle('active')
}

document.querySelector('.nav .links .close').onclick = function(){
    bar.classList.remove('active')
}

let links = document.querySelector('.nav .links')
document.onclick = function(e){
    
    if(e.target !== links && e.target !== bar){
        if(bar.classList.contains('active'))
        bar.classList.remove('active')
    }
}
links.onclick = function(e){
    e.stopPropagation()
}


// show the setting bar on click at bottom
document.querySelector(".sett-bar .config i").onclick= function(){
    this.classList.toggle('fa-spin');
    this.parentElement.parentElement.classList.toggle('active')
}

// set the color of element in li
let licolor = document.querySelectorAll('.sett-bar .color-setting ul li');

// loop for the li
licolor.forEach(li => {
    // set the valur of attribuit at the background of element
    let color = li.dataset.color;   
    li.style.background= color;

    // change them on click in 'li' color
    li.addEventListener('click', function(e){

        // add the color in root variab
        document.documentElement.style.setProperty('--main-color', color);
        
        // remove classe active frome sibling and added in it
        delet_acitve(e.target)

        // set the color in local storag
        localStorage.setItem('stcolor', color)
    });
});

// get color from local storag and tigger it
let mycolor = localStorage.getItem('stcolor')
if(mycolor !== null){
    document.documentElement.style.setProperty('--main-color', mycolor);

    // loop for all li element if it is have the same color in storage add active class and delet from all sibling
    licolor.forEach(li => {

        li.classList.remove('active')

        if(li.dataset.color == mycolor){
            li.classList.add('active')
        }
        
    })

}


// change the image background of landing
let img = ["1.jpg", "2.jpg", "3.jfif", "4.jfif", "5.jpg"];
var num = 0;

// fucntion of change bakcground
function chang_back(num){
    document.querySelector('.header').style.background = "url(images/"+ img[num] + ") bottom";
    document.querySelector('.header').style.backgroundSize = "cover";
    localStorage.setItem('num_iamge', num)
}

// declair the elements and all variabels
const par = document.querySelector('.sett-bar .back-set .select-div');
const move = document.querySelectorAll('.sett-bar .back-set .move');



// ****** locale Storage
let storage_stat = localStorage.getItem('back-status')
let storag_num = localStorage.getItem('num_iamge')


if(storage_stat){
    if(storage_stat == 'fix'){
        chang_back(storag_num);
        delet_active_back()
        document.querySelector('.sett-bar .back-set .fix').classList.add('active')
    }
    else if(storage_stat == 'select'){
        chang_back(storag_num);
        delet_active_back()
        document.querySelector('.sett-bar .back-set .sel-user').classList.add('active')
    }
}


let back_interval;
let func_select;

function change(){
    let butn = document.querySelector('.sett-bar .back-set .active').dataset.status;
    
    // function for select random
    if(butn == 'random'){
        back_interval = setInterval(function(){
            num = Math.floor(Math.random()* img.length)
            chang_back(num)
        }, 5000)
        func_select = false;
        localStorage.setItem('back-status', 'random')
    }

    // clear randome interval if select fix
    else if(butn == 'fix'){
        clearInterval(back_interval);
        func_select = false;
        localStorage.setItem('back-status', 'fix');
    }

    else if(butn == 'select'){
        func_select = true;
        clearInterval(back_interval);
        move.forEach(elm =>{

            if(elm.classList.contains('next')){
                elm.addEventListener('click', function(){
                    if(func_select == true){
                        num++;
                        if(num > (img.length - 1)){
                            num = 0;
                        }
                        chang_back(num) 
                        }
                })
            }
            else if(elm.classList.contains('prev')){
                elm.addEventListener('click', function(){
                    if(func_select == true){
                        num--;
                        if(num < 0 ){
                            num = (img.length - 1);
                        }
                        chang_back(num)
                    }
                })
            }
            
        })

        localStorage.setItem('back-status', 'select')
    }


    // change color of move button on the select-button is active
    if(par.querySelector('.active')){
        par.classList.add('active-move')
    }
    else{
        par.classList.remove('active-move')
    }
}


// change the setting of Background Random
document.querySelectorAll('.sett-bar .back-set .select').forEach(but => {
    but.addEventListener('click', function(e){
        if(!but.classList.contains('active')){
            delet_active_back();
            but.classList.add('active')
            change();
        }
    })
})

change();

//delet class active from background elements
function delet_active_back(){
    let elements = document.querySelectorAll(".sett-bar .parent-back .active")
    elements.forEach(function(elem){
        elem.classList.remove('active')
    })
}

// remove classe active frome sibling and added in it
function delet_acitve(child){
    child.parentElement.querySelectorAll('.active').forEach(function(elem){
        elem.classList.remove('active')
    })
    child.classList.add('active')
}


// navigation bullets show or hidden
let nav_bul_set = document.querySelectorAll('.sett-bar .nav-bul-set button')
let nav_bul = document.querySelector('.nav-bul')
let bullets_local = localStorage.getItem('bullets-option')

if(bullets_local !== null){

    nav_bul_set.forEach(function(elem){

        elem.classList.remove('active')

        if(bullets_local === 'yes' && elem.classList.contains("yes")){
            delet_acitve(elem)
            nav_bul.style.display = 'block'
        }
        else if(bullets_local === 'no' && elem.classList.contains("no")){
            delet_acitve(elem)
            nav_bul.style.display = 'none'
        }
    })
    
}

nav_bul_set.forEach(btn => {

    btn.addEventListener('click', chick_pull)

    function chick_pull(){

        if(btn.classList.contains('yes') && !btn.classList.contains('active') ){

            nav_bul.style.display = 'block';

            localStorage.setItem('bullets-option', 'yes')
        }
        else {
            
            nav_bul.style.display = 'none';

            localStorage.setItem('bullets-option', 'no')
        }
        // remove classe active frome sibling and added in it
        delet_acitve(btn)
    }
})


// on click navigation bullets
const bullets = document.querySelectorAll('.nav-bul ul li');
const nav_links = document.querySelectorAll('.nav .links li a');

function scorllSmoth(links_l){
    links_l.forEach(function(elem){
        elem.addEventListener('click', function(e){
            e.preventDefault();
            if(bar.classList.contains('active')){
                bar.classList.remove('active')
                console.log('done')
            }
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}

scorllSmoth(bullets);
scorllSmoth(nav_links);

// reset all setting
document.querySelector('.sett-bar .reset').addEventListener('click', ()=>{
    
    // localStorage.clear()

    localStorage.removeItem('stcolor')
    localStorage.removeItem('num_iamge')
    localStorage.removeItem('back-status')
    localStorage.removeItem('bullets-option')

    window.location.reload()
})





// our skils ************************
// let the number conteur up
let sk = document.querySelector('.skills');
let done = false
document.querySelector('body').onscroll = function(){ // sk.scrollHeight
   
    if(sk.offsetTop < document.documentElement.scrollTop + (window.innerHeight / 3) && done == false){
        done = true;
        document.querySelectorAll('.progress .value span').forEach(elem => {
            let val = elem.dataset.progress;
            elem.style.width = val;
        })

    }
}



// Galleruy
let img_gallery = document.querySelectorAll(".gallery .image-box")

let box_pop = document.createElement('div')
box_pop.className= 'box-pop'

let close_pop = document.createElement('i')
close_pop.classList.add('far', 'fa-times-circle', 'pop-close')

let text_pop = document.querySelector('.gallery .pop-text')

let imag_pop = document.createElement('img')


img_gallery.forEach(elem =>{
    elem.addEventListener('click', function(){

        let overlay = document.createElement('div')
        overlay.className = 'popup-overlay'

        let srcImg = elem.querySelector('img').src
        imag_pop.setAttribute('src', srcImg)

        box_pop.appendChild(imag_pop)
        box_pop.appendChild(text_pop)
        box_pop.appendChild(close_pop)

        overlay.appendChild(box_pop)
        document.body.appendChild(overlay)
    })
})


// close the pupup
document.addEventListener('click', function(e){
    if(e.target.classList.contains('pop-close')){
        e.target.parentElement.parentElement.remove();
    }
})


//slide testimonials
let arrow = document.querySelectorAll(".testim .content .arrow")
let slid = document.querySelector('.testim .content .slid')


let box_width = window.screen.width

if(box_width > 576){
    box_width = 400;
}
else{
    let width = window.screen.width
    slid.querySelectorAll('.box').forEach(function(elem){
        elem.style.width = width + 'px'
    })

    slid.style.width = width * 5 + 'px'
}

let left_p = (window.screen.width / 2) - (box_width / 2)

slid.style.left = left_p - box_width +'px'
let pos
arrow.forEach(elm =>{
    if(elm.classList.contains('left')){
        elm.addEventListener('click', function(){
            let active = document.querySelector('.testim .content .slid .active')
            if(active.previousElementSibling){
                active.classList.remove('active')
                active.previousElementSibling.classList.add('active')
                pos = slid.style.left
                if(pos == ''){pos = 0}
                pos = parseFloat(pos)
                slid.style.left = pos + box_width + "px"
            }
            
        })
    }
    else if(elm.classList.contains('right')){
        elm.addEventListener('click', function(){
            let active = document.querySelector('.testim .content .slid .active')
            if(active.nextElementSibling){
                active.classList.remove('active')
                active.nextElementSibling.classList.add('active')
                pos = slid.style.left
                if(pos == ''){pos = 0}
                pos = parseFloat(pos)
                slid.style.left = pos - box_width + "px"
            }
            
        })
    }
})




