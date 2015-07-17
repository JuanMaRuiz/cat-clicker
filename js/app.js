$(function() {
	
	var cats = [
		{
			catId: 1,
			name: "Panceta",
			imgSrc: "img/cat_picture1.jpg",
			numberOfClicks: 0
		},
		{
			catId: 2,
			name: "Yoda",
			imgSrc: "img/cat_picture2.jpeg",
			numberOfClicks: 0
		},
		{
			catId: 3,
			name: "Cesar",
			imgSrc: "img/cat_picture3.jpeg",
			numberOfClicks: 0
		},
		{
			catId: 4,
			name: "Chewaka",
			imgSrc: "img/cat_picture4.jpeg",
			numberOfClicks: 0
		},
		{
			catId: 5,
			name: "Kyle",
			imgSrc: "img/cat_picture5.jpeg",
			numberOfClicks: 0
		}
	];

	var octopus = {
		getCats: function() {
			return cats;
		},
		showCat: function(cat) {
			var selectedCat = cat.substr(4,5);
            
            pictureView.render(selectedCat);
		},
		addClick: function( clickedCat ) {
			var clickedCat = clickedCat;
			octopus.getCats().forEach(function( cat ){
				if(clickedCat === cat.catId) {
					cat.numberOfClicks = cat.numberOfClicks + 1;
					pictureView.render(clickedCat);
					adminView.render(clickedCat);
				}
			});
		},
		showForm: function(cat) {
			$("#cat-form").show();
			
		},
		hideForm: function() {
			$("#cat-form").hide();
		},
		updateFormData: function( cat ) {
			var selectedCat = cat.substr(4,5);
			adminView.render(selectedCat);
		},
		modifyCat: function( cat ) {
			// console.log("Before forEach " + cat);
			var myCat = cat.id;
			octopus.getCats().forEach(function( cats ){
				//console.log("After forEach " + cat);
				if(parseInt(cat.id) === cats.catId){
					console.log("Inside forEach and if " + adminView.$formCatId.val())
					cats.catId = parseInt(cat.id);
					cats.imgSrc = cat.url;
					cats.name = cat.name;
					cats.numberOfClicks = cat.clicks;

					pictureView.render(cats.catId);
					// octopus.showCat( cat );
				}
			});
		},
		init: function() {
			listView.init();
			pictureView.init();
			adminView.init();
		}
	};

	var listView = {
		render: function() {
			var htmlString = "";
			octopus.getCats().forEach(function(cat){
				htmlString += '<li><a href="#" id="cat-' + cat.catId + '" class="js-select-cat">' + cat.name + '</a></li>';
			});

			this.$catList.html( htmlString );
		},
		init: function() {
			this.$catList = $("#list-of-cats");
			this.$catsById = $("[data-cat-id]");
			listView.render();
			pictureView.init();

			// grab elements and html for using in the render function
            this.$catList.on('click', '.js-select-cat', function(e) {
            	var cat = $( this ).prop("id");
                octopus.showCat( cat );
                octopus.updateFormData( cat );
                return false;
            });

            this.$catsById.on('click', function(){
            	var clickedCat = parseInt(this.getAttribute("data-cat-id"));
            	octopus.addClick(clickedCat);
            });
		}
	};

	var pictureView = {
		init: function() {
			this.catTitle = $("#cat-title");
			this.catPicture = $("#cat-picture");
			this.catInfo = $("#cat-info");
			this.catTitle.html("Select a cat");
		},
		render: function(cat) {
			var img = "";
			var catInfo = "";
			octopus.getCats().forEach( function( cats ) {
				if(parseInt(cat) === cats.catId){
					img += '<img src="' + cats.imgSrc + '" alt="' + cats.name + '" data-cat-id="' + cats.catId + '"/>';
					catInfo += '<li> Cat name: <b>' + cats.name + '</b></li>';
					catInfo += '<li class="active"> Number of clicks: <span class="badge">' + cats.numberOfClicks + '</span></li>';
				}
			});

			this.catPicture.html( img );
			this.catInfo.html( catInfo );

			listView.init();
		}
	};

	var adminView = {
		render: function(cat) {
			octopus.getCats().forEach( function( cats ) {
				if(parseInt(cat) === cats.catId){
					adminView.$formCatName.val(cats.name);
					adminView.$formCatNumOfClicks.val(cats.numberOfClicks);
					adminView.$formCatUrl.val(cats.imgSrc);
					adminView.$formCatId.val(cats.catId);
				}
			});
		},
		init: function() {
			this.$formCatName = $("#form-cat-name");
			this.$formCatNumOfClicks = $("#form-num-of-clicks");
			this.$formCatUrl = $("#form-cat-url");
			this.$formCatId = $("#form-cat-id");
			this.adminButton = $("#admin-btn");
			this.closeButton = $("#close-btn");
			this.changeButton = $("#change-data-btn");
			this.catForm = $("#cat-form");

			$("#cat-form").hide();

			this.adminButton.on('click', function() {
				octopus.showForm();
			});

			this.closeButton.on('click', function() {
				octopus.hideForm();
			});

			this.changeButton.on('click', function(e) {
				cat = {};
				cat.id = adminView.$formCatId.val();
				cat.url = adminView.$formCatUrl.val();
				cat.name = adminView.$formCatName.val();
				cat.clicks = adminView.$formCatNumOfClicks.val();
				octopus.modifyCat(cat);
				e.preventDefault();
			})

		}
	}

	octopus.init();

});
