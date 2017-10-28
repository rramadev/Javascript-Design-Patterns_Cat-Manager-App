// let data = require ('../../data/cats').catList;

const data = {  
  showAdmin: false,
  selectedCat: {},
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
  getSelectedCat: function() {
    return data.selectedCat;
  },

  getList: function() {
    return data.catList;
  },

  getShowAdmin: function() {
    return data.showAdmin;
  },

  showCat: function(cat) {
    data.selectedCat = cat;
    viewImg.render(cat);
  },

  addClick: function() {
    data.selectedCat.clicks += 1;
    viewList.render();
    viewImg.render(data.selectedCat);
  },  

  showAdmin: function() { 
    data.showAdmin = !data.showAdmin;
    viewAdmin.render();   
  },

  saveAdmin: function(name, clicks, imgSrc) {
    // data.selectedCat = {...cat};
    // let idx = data.catList.findIndex((obj) => obj.id == cat.id);
    // data.catList[idx] = {...cat} ;
    data.selectedCat.name = name;
    data.selectedCat.clicks = clicks;
    data.selectedCat.imgSrc = imgSrc;
    
    this.showAdmin();
    viewList.render();
    viewImg.render(data.selectedCat);
  },

  init: function() { 
    // Set current selectedCat cat index to 0 by default
    data.selectedCat = data.catList[0];

    // Initialize views
    viewImg.init();
    viewList.init();   
    viewList.render();
    viewAdmin.init();
    viewAdmin.render(data.selectedCat);
            
    // Show the actual selectedCat cat (first by default)
    this.showCat(data.selectedCat);  
  }
};

const viewList = {
  init: function() {
    this.elList = document.getElementById('list'); 
  },
  render: function() {
    this.elList.innerHTML = '';
    let catList = catManager.getList();
    
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
  }
}; 

const viewImg = {
  init: function() {
    this.elName = document.getElementById('name');
    this.elCounter = document.getElementById('counter');
    this.elCatImg = document.getElementById('catImg');

    this.elCatImg.addEventListener('click', function() {
      catManager.addClick();        
    }); 
  },
  render: function(cat) {
    this.elName.innerHTML = cat.name;
    this.elCounter.innerHTML = cat.clicks;
    this.elCatImg.src = cat.imgSrc;   
  }
}  

const viewAdmin = {
  init: function() {
    this.elAdminForm = document.getElementById('adminForm');
    this.elAdminBtn = document.getElementById('adminBtn');
    this.elNameInput = document.getElementById('nameInput');
    this.elUrlInput = document.getElementById('urlInput');
    this.elClickInput = document.getElementById('clickInput');
    this.elCancelBtn = document.getElementById('cancelBtn');
    this.elSaveBtn = document.getElementById('saveBtn');
    
    this.elAdminBtn.addEventListener('click', function() {
      catManager.showAdmin();        
    }); 

    this.elCancelBtn.addEventListener('click', function() {
      catManager.showAdmin();         
    });
    
    this.saveCat = function() {      
      let name = this.elNameInput.value;
      let clicks = parseInt(this.elClickInput.value);
      let imgSrc = this.elUrlInput.value;
            
      catManager.saveAdmin(name, clicks, imgSrc); 
    };

    this.elSaveBtn.addEventListener('click', 
      this.saveCat.bind(this));
  },
  render: function() {
    let cat = catManager.getSelectedCat();
    this.elNameInput.value = cat.name;
    this.elClickInput.value = cat.clicks; 
    this.elUrlInput.value = cat.imgSrc;

    let showForm = catManager.getShowAdmin() ?
      this.elAdminForm.setAttribute('class','show') :
      this.elAdminForm.setAttribute('class','hidden');   
  }
}  

window.onload = function () {
  console.log('Document loaded...');
  // Run App on window´s load
  catManager.init();
}