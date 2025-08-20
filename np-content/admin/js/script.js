$(() => {
    
    $('.sqlite').on('click', () => {
        $('#install-select-database').hide();
        $('#install-site-name').css('display','flex');
    })

    $('.save-site-title').on('click', (e) => {
        
        e.preventDefault();
        
        const site_title = $('input[name="site_title"]').val();
        
      
        
        if(site_title == '') {
            $('input[name="site_title"]').siblings('p').show();
            return;
        }

        $.post('/api/np-admin/save-site-title', {
            site_title,
            tag_line: $('input[name="tag_line"]').val()

        } , () => {
            $('#install-site-name').css('display','none');
            $('#install-start').css('display','flex');
        })
    })

    $('#start-with-ignition').on('click',() => {
         $.post('/api/np-admin/start-with-ignition', {}, () => {
            window.location.href = '/np-admin';
        });
         
    })

    
    $('#start-with-pagebuilder').on('click',() => {
         $.post('/api/np-admin/start-with-ignition', {}, () => {
            window.location.href = '/np-admin';
        });
    })

})