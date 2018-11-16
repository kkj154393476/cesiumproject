$(function() {
	'use strict';

	var slider = $('#slider'),
	sliderList = $('<ul></ul>'),
	bulletList = $('<ul></ul'),
	sliderJSON= [],

	sliderJSON = [
	{
		"imagePath": "/images/continents/africa.jpg",
		"order": "1",
		"url": "#",
		"slideText": "Africa"
	},
	{
		"imagePath": "/images/continents/asia.jpg",
		"order": "2",
		"url": "#",
		"slideText": "Asia"
	},
	{
		"imagePath": "/images/continents/europe.jpg",
		"order": "3",
		"url": "#",
		"slideText": "Europe"
	},
	{
		"imagePath": "/images/continents/northAmerica.jpg",
		"order": "4",
		"url": "#",
		"slideText": "NorthAmerica!"
	},
	{
		"imagePath": "/images/continents/oceania.jpg",
		"order": "5",
		"url": "#",
		"slideText": "Oceania"
	},
	{
		"imagePath": "/images/continents/southAmerica.jpg",
		"order": "6",
		"url": "#",
		"slideText": "SouthAmerica"
	},
	
];
	//сортируем массив по order
	sliderJSON.sort(function(a, b) {
		return a.order - b.order;
	});

	//создаем слайды из json'a
	$.each(sliderJSON, function(index, element) {
		sliderList.append("<li><a href='"+ element.url +"'><img src='" + element.imagePath + "' alt=''></a>" +
			"<div class='content'>"+ element.slideText +"</div></li>");
		bulletList.append("<li id='bullet_"+ (index + 1) +"'></li>");
	});

	//добавляем классы к листам и добавляем их в DOM
	sliderList.addClass('sliderList');
	bulletList.addClass('bulletList');
	slider.append(sliderList);
	slider.append(bulletList);

	//Делаем первый буллет активным
	bulletList.find("li:first-child").addClass('bulletActive');

	var firstSlide = sliderList.find("li:first-child"),
	lastSlide = sliderList.find("li:last-child"),
	buttonPrev = $(".button-prev"),
	buttonNext = $(".button-next"),
	sliderCount = sliderList.children().length,
	sliderWidth = 100.0 / sliderCount,
	slideIndex = 0,
	intervalID;

	//Добавляем первый и последний слайды в начало и конец массива (для плавной анимации)
	lastSlide.clone().prependTo(sliderList);
	firstSlide.clone().appendTo(sliderList);

	//Рассчитываем ширину листа
	sliderList.css({"width": (100 * sliderCount) + "%"});
	sliderList.css({"margin-left": "-100%"});

	//Рассчитываем позицию слайдов
	sliderList.find("li").each(function(index) {
		var leftPercent = (sliderWidth * index) + "%";
		$(this).css({"left": leftPercent});
		$(this).css({"width": sliderWidth + "%"});
	});

	//А вот и обработчики подъехали
	buttonPrev.on('click', function() {
		slide(slideIndex - 1);
	});
	buttonNext.on('click', function() {
		slide(slideIndex + 1);
	});
	$('.bulletList li').on('click', function() {
		var id = ($(this).attr('id').split('_')[1]) - 1;
		slide(id);
	});

	//Запускаем таймер и обрабатываем его остановку
	startTimer();
	slider.on('mouseenter mouseleave', function(e){ 
    	var onMouEnt = (e.type === 'mouseenter') ?  
        clearInterval(intervalID) : startTimer();               
	});

	//Управляет анимацией, землей, небом и даже Аллахом
	function slide(newSlideIndex) {

		var marginLeft = (newSlideIndex * (-100) - 100) + "%";
		sliderList.animate({"margin-left": marginLeft}, 400, function() {
			if ( newSlideIndex < 0 ) {
				$(".bulletActive").removeClass('bulletActive');
				bulletList.find("li:last-child").addClass("bulletActive");
				sliderList.css({"margin-left": ((sliderCount) * (-100)) + "%"});
        		newSlideIndex = sliderCount - 1;
        		slideIndex = newSlideIndex;
        		return;
			} else if ( newSlideIndex >= sliderCount ) {
				$(".bulletActive").removeClass('bulletActive');
				bulletList.find("li:first-child").addClass("bulletActive");
				sliderList.css({"margin-left": "-100%"});
				newSlideIndex = 0;
				slideIndex = newSlideIndex;
				return;
			}
			$(".bulletActive").removeClass('bulletActive');
			bulletList.find('li:nth-child('+ (newSlideIndex + 1) +')').addClass('bulletActive');
			slideIndex = newSlideIndex;
		});
	};

	//Нажимает на кнопку раз в 5 секунд
	function startTimer() {
		intervalID = setInterval(function() { buttonNext.click(); }, 9999999);
		return intervalID;
	};
});


