// let data = require ('../../data/cats').catList;

const data = {
  catList: [
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
  ]
};

const catManager = {
  selected: 0,

  getList: function() {
    return data.catList;
  },

  showCat: function(cat) {
    this.selected = cat.id;
    viewManager.render(cat);
  },

  addClick: function() {
    data.catList[this.selected].clicks += 1;
    viewManager.render(data.catList[this.selected]);
  },

  init: function() { 
    viewManager.init();
  }
};

const viewManager = {
  init: function() {
    this.elList = document.getElementById('list');  
    this.elName = document.getElementById('name');
    this.elCounter = document.getElementById('counter');
    this.elCatImg = document.getElementById('catImg');

    let catList = catManager.getList();

    console.log(catList);

    catList.forEach((cat) => {
      let li = document.createElement('li');
      li.setAttribute('class','list-group-item');    
      let textNode = document.createTextNode(cat.name + ' - ' + cat.clicks);
      li.appendChild(textNode);
  
      li.addEventListener('click', 
        (function(catty) {
          return function() {
            catManager.showCat(catty);           
          };
        })(cat)
      );
  
      this.elList.appendChild(li);
    }); 
    
    this.elCatImg.addEventListener('click', function() {
        catManager.addClick();        
      }  
    );
  
    // Show Cat1 from start
    catManager.showCat(catList[0]);
  },
  render: function(cat) {
    this.elName.innerHTML = cat.name;
    this.elCounter.innerHTML = cat.clicks;
    this.elCatImg.src = cat.imgSrc;  
  }
}; 
  

window.onload = function () {
  console.log('Document loaded...');
  // Run App on window´s load
  catManager.init();
}