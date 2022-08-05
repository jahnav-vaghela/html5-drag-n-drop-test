

import random from "lodash.random";
import shuffel from "lodash.shuffle";

const words = ['cat','bat','get','set'];
const cword = words[ random(0,words.length-1) ];
const sword = shuffel(cword).join('');
console.log(cword,sword);

const dragcont = document.querySelector('#drag-container');
const dropcont = document.querySelector('#drop-container');

const getDropContVal = () => {
    const dropEles = Array.from( dropcont.querySelectorAll('div') );
    const dropVal = [];
    dropEles.forEach((dropEle)=>{
        dropVal.push(dropEle.innerText.trim());
    });

    return dropVal.join('');
};

for (let i in sword) {
    // draggable 
    const dragItem = document.createElement('div');
    dragItem.setAttribute('draggable','true');
    const cchr = sword[i];
    dragItem.innerHTML = cchr;
    dragcont.appendChild(dragItem);

    dragItem.addEventListener( 'dragstart', (event) => {
        dragItem.classList.add('dragging');
        event.dataTransfer.effectAllowed = 'move';
        let char = event.target.innerHTML;
        event.dataTransfer.setData('text/plain',char);
    });

    dragItem.addEventListener( 'dragend', () => {
        dragItem.classList.remove('dragging');
    });

    // droppable
    const dropItem = document.createElement('div');
    dropcont.appendChild(dropItem);

    dropItem.addEventListener( 'dragenter', (event) => {
        dropItem.classList.add('droping');
        event.dataTransfer.dropEffect = 'move';
    });

    dropItem.addEventListener( 'dragleave', () => {
        dropItem.classList.remove('droping');
    });

    dropItem.addEventListener( 'dragover', (event) => {
        event.preventDefault();
    });

    dropItem.addEventListener( 'drop', (event) => {
        event.stopPropagation();
        let char = event.dataTransfer.getData('text/plain');
        event.target.innerHTML = char;
        event.target.classList.remove('droping');

        console.log(getDropContVal());

        if( getDropContVal() == cword.toUpperCase() ){
            alert('your wan');
        }
    });

}// for in end 


/*
//old code 

const dragdivs = document.querySelectorAll('#drag-container div');
Array.from(dragdivs).forEach((dragdiv)=>{
    
    dragdiv.addEventListener( 'dragstart', (event) => {
        console.log('drag start');
        event.target.classList.add('dragging');

        //console.log(event.dataTransfer);
        event.dataTransfer.effectAllowed = 'move';
        let className = event.target.getAttribute('data-class'); 
        event.dataTransfer.setData('text/plain',className );
    });

    dragdiv.addEventListener( 'dragend', (event) => {
        console.log('drag end');
        event.target.classList.remove('dragging');

        event.target.setAttribute("class", "");
    });

});

// dragstart
// drag
// dragend


const dropdivs = document.querySelectorAll('#drop-container div');
Array.from(dropdivs).forEach((dropdiv)=>{

    dropdiv.addEventListener( 'dragenter', (event) => {
        console.log('drag enter');
        event.target.classList.add('droping');

        event.dataTransfer.dropEffect = 'move';
    });

    dropdiv.addEventListener( 'dragleave', (event) => {
        console.log('drag leave');
        event.target.classList.remove('droping');
    });

    dropdiv.addEventListener( 'dragover', (event) => {
        event.preventDefault();
        //console.log('dragover');
    });

    dropdiv.addEventListener( 'drop', (event) => {
        console.log('drop');
        event.stopPropagation();

        let className = event.dataTransfer.getData('text/plain');
        console.log(className);
        event.target.classList.add(className);
        event.target.classList.remove('droping');
    });

});

// dragenter
// dragover
// dragleave
// drop

*/