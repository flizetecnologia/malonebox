(function() {

  jQuery(document).ready(function(){

    var malonebox = jQuery('.malonebox')
    , init = jQuery('.malonebox-init')
    , minWidth = 480;

    if(malonebox.length == 0 || window.innerWidth < minWidth) {
      console.log('Malonebox not initialized.');
      return;
    }
    console.log('Malonebox initialized with ' + malonebox.length + ' itens.');

    if(init.length > 0 && init.data('malonebox-min-to-run')) {
      minWidth = init.data('malonebox-min-to-run');
    }

    jQuery('body').append('<div class="malonebox__overlay"></div>');
    jQuery('body').append('<div class="malonebox__container"></div>');
    jQuery('.malonebox__container').append('<div class="malonebox__modal"></div>');
    jQuery('.malonebox__modal').append('<div class="malonebox__header"></div>');
    jQuery('.malonebox__modal').append('<div class="malonebox__image"></div>');
    jQuery('.malonebox__modal').append('<div class="malonebox__footer"></div>');
    jQuery('.malonebox').each(function(i){
      jQuery(this).attr('data-malonebox-item', i + 1);
    });

  });

  jQuery(document).on('click', '.malonebox', function(event){

    var malonebox = jQuery(this);
    modalBuild(malonebox, false);
    event.preventDefault();

  });

  jQuery(document).on('click', '.malonebox__close', function(event){

    jQuery('.malonebox__container, .malonebox__overlay').fadeOut(200);
    event.preventDefault();

  });

  jQuery(document).on('click', '.malonebox__prev, .malonebox__next', function(event){

    var id = jQuery(this).data('malonebox-item');

    jQuery('.malonebox').each(function(i){
      var malonebox = $(this)
      , item = malonebox.data('malonebox-item');
      if(item == id) {
        modalBuild(malonebox, true);
      }
    });

  });

  function modalBuild(malonebox, transition) {

    var init = jQuery('.malonebox-init')
    , textClose = 'Fechar [X]'
    , textPrev = '[<] Anterior'
    , textNext = 'Próxima [>]'
    , maxWidth = 800;

    if(init.length > 0 && init.data('malonebox-max-width')) {
      maxWidth = init.data('malonebox-max-width');
    }

    if(init.length > 0 && init.data('malonebox-text-close')) {
      textClose = init.data('malonebox-text-close');
    }

    if(init.length > 0 && init.data('malonebox-text-prev')) {
      textPrev = init.data('malonebox-text-prev');
    }

    if(init.length > 0 && init.data('malonebox-text-next')) {
      textNext = init.data('malonebox-text-next');
    }

    jQuery('.malonebox__modal').css('max-width', maxWidth + 'px');

    var href = malonebox.attr('href')
    , title = malonebox.attr('title')
    , item = malonebox.data('malonebox-item')
    , itens = $('.malonebox').length;

    var prev = parseInt(item) - 1
    , next = parseInt(item) + 1;

    var header = '<div class="malonebox__title">' + title + '</div><div class="malonebox__close">' + textClose + '</div>'
    , image = '<img class="malonebox__src" src="' + href + '" alt="' + title + '"/>'
    , footer = '';

    if(prev > 0)
      footer = footer + '<div class="malonebox__prev" data-malonebox-item="' + prev + '">' + textPrev + '</div>';

    if(next <= itens)
      footer = footer + '<div class="malonebox__next" data-malonebox-item="' + next + '">' + textNext + '</div>';

    jQuery('.malonebox__header').html(header);
    jQuery('.malonebox__image').html(image);
    jQuery('.malonebox__footer').html(footer);

    if(transition === true)
      jQuery('.malonebox__container').fadeOut(200).fadeIn(200);
    else
      jQuery('.malonebox__container, .malonebox__overlay').fadeIn(200);

  }

})(jQuery);
