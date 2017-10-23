// let data = require ('../../data/cats').catList;

/**
 * Shows the selected cat´s data
 * 
 * @param {Object} cat 
 * @param {HTMLElement} elName 
 * @param {HTMLElement} elCounter 
 * @param {HTMLElement} elCatImg 
 */
function showCat(cat, elName, elCounter, elCatImg) {
  elName.innerHTML = cat.name;
  elCounter.innerHTML = cat.clicks;
  elCatImg.src = cat.imgSrc;  
}

/**
 * Add one click to the selected cat
 * 
 * @param {Object} cat 
 */
function addClick(cat) {
  cat.clicks += 1;
}

/**
 * Initialize data and DOM elements
 * 
 */
function init() {  
  // let catList = data;
  let catList = [
    {
      id: 0,
      name: 'Cat1',
      clicks: 0,
      imgSrc: 'assets/img/cat1.jpg'
    },
    {
      id: 1,
      name: 'Cat2',
      clicks: 0,
      imgSrc: 'assets/img/cat2.jpg'
    },
    {
      id: 2,
      name: 'Cat3',
      clicks: 0,
      imgSrc: 'assets/img/cat3.jpg'
    }
  ];

  let selected = 0;
  
  let elList = document.getElementById('list');  
  let elName = document.getElementById('name');
  let elCounter = document.getElementById('counter');
  let elCatImg = document.getElementById('catImg');
  
  catList.forEach((cat) => {
    let li = document.createElement('li');
    li.setAttribute('class','list-group-item');    
    let textNode = document.createTextNode(cat.name + ' - ' + cat.clicks);
    li.appendChild(textNode);

    li.addEventListener('click', 
      (function(catty) {
        return function() {
          showCat(catty, elName, elCounter, elCatImg);
          selected = cat.id;
        };
      })(cat)
    );

    elList.appendChild(li);
  }); 
  
  elCatImg.addEventListener('click', function() {
      addClick(catList[selected]);
      showCat(catList[selected], elName, elCounter, elCatImg);
    }  
  );

  // Show Cat1 from start
  showCat(catList[0], elName, elCounter, elCatImg);
}

window.onload = function () {
  console.log('Document loaded...');
  // Run App on window´s load
  init();
}