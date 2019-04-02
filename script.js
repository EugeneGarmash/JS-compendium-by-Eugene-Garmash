var doc = document,
    menu = doc.querySelector('.navbar__list'),
    menuItems = doc.querySelectorAll('.navbar__list li>a'),
    anchors = doc.querySelectorAll('a[href*="#"]'),
    contentBlocks = doc.querySelectorAll('.content-section'),
    hiddenBlocks = Array.from(contentBlocks).slice(1),
    buttonScroll = doc.querySelector('.button-scroll');

// скрываю разделы кроме первого, выделяю первый пункт меню
hiddenBlocks.forEach(function(item){
  item.style.display = 'none';
});
doc.querySelector('.navbar__list li:first-child a').classList.add('menu-item--selected');

// делегирую события для пунктов меню
menu.addEventListener('click', function(evt) {
  var target = evt.target;  
  // по клику на пункт меню...
  if(target.matches('a')) {  
    // отмечаю серым выбранный пункт, остальные - белым.
    menuItems.forEach(function(item) {
      item.classList.remove('menu-item--selected');
    });
    target.classList.add('menu-item--selected');
    // запоминаю якорь пункта меню
    var anchor = target.getAttribute('href');
    for (var i = 0; i < contentBlocks.length; i ++) {
      // стираю все нескрытые блоки
      if (contentBlocks[i].style.display !== 'none') {
        contentBlocks[i].style.display = 'none';
      }
// contentBlocks.forEach(function(item){
//   item.style.display = 'none';
// });
      // показываю нужный блок, если его id соответствует anchor'у у target
      if (contentBlocks[i].getAttribute('id') === anchor.slice(1)) {
        contentBlocks[i].style.display = 'block';
      }
    }
    // литаю страницу вверх при переключении блоков
    document.documentElement.scrollTop = 0;
  } else { 
    return ; 
  }
});

// меняю фон элемента меню при наведении
menu.addEventListener('mouseover', function(evt) {
  if(evt.target.matches('a')) { 
    evt.target.classList.toggle('menu-item--hovered');
    // evt.relatedTarget
  }
});
menu.addEventListener('mouseout', function(evt) {
  if(evt.target.matches('a')) { 
    evt.target.classList.toggle('menu-item--hovered');
  }
});


// плавный скролл вниз для якорей (можно и через CSS: повесить scroll-behavior: smooth);
for (let i = 0; i < anchors.length; i ++) {
  anchors[i].addEventListener('click', function(evt) {
    evt.preventDefault();
    let elem = document.querySelector(anchors[i].getAttribute('href'));
    elem.scrollIntoView({behavior: "smooth"});
  });
}

// прокрутка вверх (сама кнопка - якорь)
document.addEventListener('scroll',  function() {
  var offsetTop = document.documentElement.scrollTop;
  if (offsetTop > 400) {
    buttonScroll.style.display = 'flex';
  } else if (offsetTop < 400) {
      buttonScroll.style.display = 'none';
  } 
});



