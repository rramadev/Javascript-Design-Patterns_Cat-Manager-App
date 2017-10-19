function showCat(cat) {
  console.log('hey', cat);
  let elName = document.getElementById('name');
  let elCounter = document.getElementById('counter');
  let elCatImg = document.getElementById('catImg');

  elName.innerHTML = cat.name;
  elCounter.innerHTML = cat.clicks;
  elCatImg.src = cat.imgSrc;  
}

function init() {  
  let catList = [
    {
      name: 'Cat1',
      clicks: 0,
      imgSrc: 'assets/img/cat1.jpg'
    },
    {
      name: 'Cat2',
      clicks: 0,
      imgSrc: 'assets/img/cat2.jpg'
    }
  ];
  
  let elList = document.getElementById('list');
  
  catList.forEach((cat) => {
    let li = document.createElement('li');
    li.setAttribute('class','list-group-item');    
    let textNode = document.createTextNode(cat.name + ' - ' + cat.clicks);
    li.appendChild(textNode);

    li.addEventListener('click', 
      (function(catty) {
        return function() {
          showCat(catty);
        };
      })(cat)
    );

    elList.appendChild(li);
  }); 
}

window.onload = function () {
  console.log('Document loaded...');
  init();
}