(function() {

  jQuery(document).ready(function(){

    var malonebox = jQuery('.malonebox');
    var init = jQuery('.malonebox-init');
    var minWidth = 480

    if(init.length > 0 && init.data('malonebox-min-to-run')) {
      minWidth = init.data('malonebox-min-to-run');
    }

    if(malonebox.length == 0 || window.innerWidth < minWidth) {
      console.log('malonebox.js not initialized.');
      return;
    }
    console.log('malonebox.js initialized with ' + malonebox.length + ' itens.');

    jQuery('body').append('<div class="malonebox__overlay"></div>');
    jQuery('body').append('<div class="malonebox__container"></div>');
    jQuery('.malonebox__container').append('<div class="malonebox__modal"></div>');
    jQuery('.malonebox__modal').append('<div class="malonebox__header"></div>');
    jQuery('.malonebox__modal').append('<div class="malonebox__image"></div>');
    jQuery('.malonebox__modal').append('<div class="malonebox__footer"></div>');
    jQuery('.malonebox').each(function(i){
      jQuery(this).attr('data-item', i + 1);
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

    var id = jQuery(this).data('item');

    jQuery('.malonebox').each(function(i){
      var malonebox = $(this);
      var item = malonebox.data('item');
      if(item == id) {
        modalBuild(malonebox, true);
      }
    });

  });

  function modalBuild(malonebox, transition) {

    var init = jQuery('.malonebox-init');
    var maxWidth = 800;

    if(init.length > 0 && init.data('malonebox-max-width')) {
      maxWidth = init.data('malonebox-max-width');
    }

    var top = $(document).scrollTop();
    top = top + 100;

    jQuery('.malonebox__modal').css('max-width', maxWidth + 'px');

    var href = malonebox.attr('href');
    var title = malonebox.attr('title');
    var item = malonebox.data('item');
    var itens = $('.malonebox').length;

    var prev = parseInt(item) - 1;
    var next = parseInt(item) + 1;

    var header = '<div class="malonebox__title">' + title + '</div><div class="malonebox__close">Fechar [X]</div>';
    var image = '<img class="malonebox__src" src="' + href + '" alt="' + title + '"/>';
    var footer = '';

    if(prev > 0)
      footer = footer + '<div class="malonebox__prev" data-item="' + prev + '">[<] Anterior</div>';

    if(next <= itens)
      footer = footer + '<div class="malonebox__next" data-item="' + next + '">Próxima [>]</div>';

    jQuery('.malonebox__header').html(header);
    jQuery('.malonebox__image').html(image);
    jQuery('.malonebox__footer').html(footer);

    if(transition === true)
      jQuery('.malonebox__container').fadeOut(200).fadeIn(200);
    else
      jQuery('.malonebox__container, .malonebox__overlay').fadeIn(200);

  }

})(jQuery);
