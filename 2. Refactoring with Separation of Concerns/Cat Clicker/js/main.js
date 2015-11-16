/* ====== Model ====== */

var model = {
	currentCat: null,
	cats: [
		{
			clickCount: 0,
			name: 'Tabby',
			imgSrc: 'img/cat.jpg'
		},
		{
			clickCount: 0,
			name: 'Tiger',
			imgSrc: 'img/cat2.jpg'
		}
	],
	addNewCat: function(newCat) {
		model.cats.push(newCat);
	}
};


/* ====== Octopus ====== */

var octopus = {
	init: function() {
		// set current cat to be first in the list
		model.currentCat = model.cats[0];

		// initialize view
		catListView.init();
		catView.init();
		catAddForm.init();
	},

	getCurrentCat: function() {
		return model.currentCat;
	},

	getCats: function() {
		return model.cats;
	},

	setCurrentCat: function(cat) {
		model.currentCat = cat;
	},

	// increment counter of current cat
	incrementCounter() {
		model.currentCat.clickCount++;
		catView.render();
	}
};


/* ====== View ====== */

var catView = {
	init: function() {
		// store pointers to our DOM elements for easy access later
		this.catElem = document.getElementById('cat');
		this.catNameElem = document.getElementById('cat-name');
		this.catImageElem = document.getElementById('cat-img');
		this.countElem = document.getElementById('cat-count');

		// on click, increment current cats's counter
		this.catImageElem.addEventListener('click', function(){
			octopus.incrementCounter();
		});

		// update the DOM elements
		this.render();
	},

	render: function() {
		// update the DOM elements
		var currentCat = octopus.getCurrentCat();
		this.countElem.textContent = currentCat.clickCount;
		this.catNameElem.textContent = currentCat.name;
		this.catImageElem.src = currentCat.imgSrc;
	}
};

var catListView = {
	init: function() {
		// store pointers to our DOM elements for easy access later
		this.catListElem = document.getElementById('cat-list');

		// update the DOM elements
		this.render();
	},

	render: function() {
		var cat, elem, i;

		// getting all cats to display them in view
		var cats = octopus.getCats();

		// empty the cat list
		this.catListElem.innerHTML = '';

		// loop for every cat
		for(i = 0; i < cats.length; i++) {
			cat = cats[i];

			// make new element
			elem = document.createElement('li');
			elem.textContent = cat.name;

			elem.addEventListener('click', (function(catCopy) {
				return function() {
					octopus.setCurrentCat(catCopy);
					catView.render();
				};
			})(cat));

			// adding element to the list
			this.catListElem.appendChild(elem);
		}
	}
};

var catAddForm = {
	init: function(){
		this.saveNewCatButton = document.getElementById('save');
		this.cancelNewCatButton = document.getElementById('cancel');
		this.newCatClicks = document.getElementById('clicks');
		this.newCatName = document.getElementById('name');
		this.newCatImgUrl = document.getElementById('img-url');

		// saving new cat
		this.saveNewCatButton.addEventListener('click', function(){
			var newCat = {};
			newCat.clickCount = catAddForm.newCatClicks.value;
			newCat.name = catAddForm.newCatName.value;
			newCat.imgSrc = catAddForm.newCatImgUrl.value;

			model.addNewCat(newCat);

			catListView.render();
			catAddForm.render();
		});

		// cancel saving new cat
		this.cancelNewCatButton.addEventListener('click', function(){
			catAddForm.render();
		});
	},

	render: function(){
		this.newCatClicks.value = '';
		this.newCatName.value = '';
		this.newCatImgUrl.value = '';
	}
};

octopus.init();
