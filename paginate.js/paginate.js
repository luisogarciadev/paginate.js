$.fn.paginate = function(options) {

    var settings = $.extend({
        // These are the defaults.
        currentPage: 0,
        numPerPage: 10,
        pagesToDisplay: 7,
        paginatorSelector: "#paginator"
    }, options);

    this.each(function() {
        var $table = $(this);
        $table.bind('repaginate', function() {
            $table.find('tbody tr').hide().slice(settings.currentPage * settings.numPerPage, (settings.currentPage + 1) * settings.numPerPage).show();
        });
        $table.trigger('repaginate');
        var numRows = $table.find('tbody tr').length;
        var numPages = Math.ceil(numRows / settings.numPerPage);
        $(settings.paginatorSelector).html('');
        if (numPages > 1) {
            var $pager = $('<ul class="pagination text-center"></ul>');
            $('<li class="first-paginator"><a href="#">&laquo;</a></li><li class="previous-paginator"><a href="#"><</a></li>').appendTo($pager);
            for (var page = 0; page < numPages; page++) {
                $('<li class="page-number"></li>').html('<a href="#">' + (page + 1) + "</a>").bind('click', {
                    newPage: page
                }, function(event) {
                    settings.currentPage = event.data['newPage'];
                    $table.trigger('repaginate');
                    $(this).addClass('active').siblings().removeClass('active');
                    ShowPagesToDisplay(numPages);
                }).appendTo($pager).addClass('clickable');
            }
            $pager.appendTo(settings.paginatorSelector).find('li.page-number:nth-child(' + (settings.currentPage + 3) + ')').addClass('active');
            $('<li class="next-paginator"><a href="#">></a></li><li class="last-paginator"><a href="#">&raquo;</a></li>').appendTo($pager);

            $('.first-paginator').click(function() {
                if (settings.currentPage !== 0) {
                    settings.currentPage = 0;
                    $table.trigger('repaginate');
                    $('.page-number.active').removeClass('active');
                    $('li.page-number:nth-child(' + (settings.currentPage + 3) + ')').addClass('active');
                    ShowPagesToDisplay(numPages);
                }
            });
            $('.previous-paginator').click(function() {
                if (settings.currentPage !== 0) {
                    settings.currentPage--;
                    $table.trigger('repaginate');
                    $('.page-number.active').removeClass('active');
                    $('li.page-number:nth-child(' + (settings.currentPage + 3) + ')').addClass('active');
                    ShowPagesToDisplay(numPages);
                }
            });
            $('.last-paginator').click(function() {
                if (settings.currentPage !== numPages - 1) {
                    settings.currentPage = numPages - 1;
                    $table.trigger('repaginate');
                    $('.page-number.active').removeClass('active');
                    $('li.page-number:nth-child(' + (settings.currentPage + 3) + ')').addClass('active');
                    ShowPagesToDisplay(numPages);
                }
            });
            $('.next-paginator').click(function() {
                if (settings.currentPage !== numPages - 1) {
                    settings.currentPage++;
                    $table.trigger('repaginate');
                    $('.page-number.active').removeClass('active');
                    $('li.page-number:nth-child(' + (settings.currentPage + 3) + ')').addClass('active');
                    ShowPagesToDisplay(numPages);
                }
            });
            ShowPagesToDisplay(numPages);
        }
    });

    function ShowPagesToDisplay(numPages) {
        if (numPages > settings.pagesToDisplay) {
            pageOffset = Math.floor(settings.pagesToDisplay / 2);
            startPage = Math.floor((settings.currentPage - pageOffset) < 0 ? 0 : (settings.currentPage - pageOffset));
            endPage = startPage + settings.pagesToDisplay;

            if (endPage + pageOffset > numPages) {
                startPage = startPage - (endPage - numPages);
                endPage = numPages;
            }

            $('ul.pagination').find('li.page-number').hide().slice(startPage, endPage).show();
        }
        CheckIfDisableNavElements(numPages);
    }
    function CheckIfDisableNavElements(numPages) {
        if (settings.currentPage === 0) {
            $('.first-paginator, .previous-paginator').addClass('disabled');
        } else {
            $('.first-paginator, .previous-paginator').removeClass('disabled');
        }
        if (settings.currentPage === (numPages - 1)) {
            $('.last-paginator, .next-paginator').addClass('disabled');
        } else {
            $('.last-paginator, .next-paginator').removeClass('disabled');
        }
    }
};