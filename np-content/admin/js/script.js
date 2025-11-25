$(() => {

    $('.sqlite').on('click', () => {
        $('#install-select-database').hide();
        $('#install-site-name').css('display', 'flex');
    })

    $('.save-site-title').on('click', (e) => {

        e.preventDefault();

        const site_title = $('input[name="site_title"]').val();



        if (site_title == '') {
            $('input[name="site_title"]').siblings('p').show();
            return;
        }

        $.post('/api/np-admin/save-site-title', {
            site_title,
            tag_line: $('input[name="tag_line"]').val()

        }, () => {
            $('#install-site-name').css('display', 'none');
            $('#admin_creds').css('display', 'flex');
        })
    })

    $('.save-admin-creds').on('click', (e) => {
        e.preventDefault();
        const username = $('input[name="username"]').val();
        const password = $('input[name="password"]').val();

        if (username == '') {
            $('input[name="username"]').siblings('p').show();
            return;
        }

        if (password == '') {
            $('input[name="password"]').siblings('p').show();
            return;
        }


        $.post('/api/np-admin/save-admin-creds', {
            username,
            password

        }, () => {
            $('#install-start').css('display', 'flex');
            $('#admin_creds').css('display', 'none');
        })
    })

    $('#start-with-ignition').on('click', () => {
        $.post('/api/np-admin/start-with-ignition', {}, () => {
            window.location.href = '/np-admin';
        });
    })


    $('#start-with-pagebuilder').on('click', () => {
        $.post('/api/np-admin/start-with-ignition', {}, () => {
            window.location.href = '/np-admin';
        });
    })

    $('#add_cpt').on('click', () => {
        const title = $('input[name="cpt_title"]').val();

        if (title == '') {
            return $('input[name="cpt_title"]').siblings('p').show();
        }

        $.post('/api/np-admin/add-cpt', {
            title,
            slug: $('input[name="cpt_slug"]').val(),
            basic_editor: $('input[name="basic"]').prop('checked'),
            page_builder: $('input[name="page_builder"]').prop('checked'),
            top_level: $('input[name="top_level"]').prop('checked'),
            use_rest: $('input[name="use_rest"]').prop('checked'),
        }, (res) => {
            if (res == 'success') {
                window.location.href = window.location.href;
            }
        });




    })

    $('input[name="cpt_title"]').on('input', (e) => {

        const slug = e.currentTarget.value.toLowerCase().replaceAll(' ', '-');
        $('input[name="cpt_slug"]').val(slug);

    })

    $('.menu-item').on('click', (e) => {

        const item = $(e.currentTarget);

        $('.open').removeClass('open');

        item.addClass('open')


    })
    let currentCPT = null;

    $('.edit-cpt').on('click', (e) => {
       
        const el = $(e.currentTarget);

        const row = el.parent().parent();

        const index = row.index();

        currentCPT = cpts[index - 1];

        $('input[name="title"]').val(currentCPT.title);
        $('input[name="slug"]').val(currentCPT.slug);
        $('input[name="top_level"]').prop('checked', (currentCPT.top_level == "true"))
        $('input[name="basic_editor"]').prop('checked', (currentCPT.basic_editor == "true"))
        $('input[name="page_builder"]').prop('checked', (currentCPT.page_builder == "true"))
        $('input[name="use_rest"]').prop('checked', (currentCPT.use_rest == "true"))
        $('#edit-cpt').show();
    })

    $('.close-popup').on('click', (e) => {
        $(e.currentTarget).parent().hide()
    })

let currentIndex = 0;
    
$('.delete-cpt').on('click' , (e) => {
        const el = $(e.currentTarget);

        const row = el.parent().parent();

        const index = row.index();

        currentCPT = cpts[index - 1];

          currentIndex = index;

        $('#delete-cpt-popup').show();
    })

    $('.destroy-cpt').on('click' , (e) => {
        const el = $(e.currentTarget);

        const row = el.parent().parent();

        const index = row.index();

        currentIndex = index;

        currentCPT = cpts[index - 1];
        
        $('#destroy-cpt-popup').show();
    })

    $('#delete-cpt').on('click', () => {
        
        $.post('/api/'+adminURL+'/delete-cpt', currentCPT, () => {
            $('tr').eq(currentIndex).remove();
            $('.popup').hide();
        })

    })

    $('#update_cpt').on('click', () => {

        currentCPT.title = $('input[name="title"]').val();
        currentCPT.slug = $('input[name="slug"]').val();
        currentCPT.top_level = ($('input[name="top_level"]').prop('checked') == true);
        currentCPT.basic_editor = ($('input[name="basic_editor"]').prop('checked') == true);
        currentCPT.page_builder = ($('input[name="page_builder"]').prop('checked') == true);
        currentCPT.use_rest = ($('input[name="use_rest"]').prop('checked') == true);


        $.post('/api/' +adminURL + '/update-cpt', currentCPT, () => {
            $('tr').each((index, el) => {

                const row = $(el);

                if (parseInt(row.data('id')) == currentCPT.id) {
                    const cells = row.find('td');
                    cells.eq(0).html(currentCPT.title);
                    cells.eq(1).html(currentCPT.slug);
                    cells.eq(2).html(currentCPT.use_rest ? 'true' : 'false');
                    cells.eq(3).html(currentCPT.basic_editor ? 'true' : 'false');
                    cells.eq(4).html(currentCPT.page_builder ? 'true' : 'false');
                    cells.eq(5).html(currentCPT.top_level ? 'true' : 'false');
                }

                $('.popup').hide();
            
            })
        })


    })

})