$(function() {

    const eventUrl = '/events';
    $.ajax({
        url: eventUrl,
        type: 'GET',
        success: function(data){ 
            console.log(data);
        },
        xhrFields: {
            onprogress: (event) => {
                const messages = event.currentTarget.response.split('\n\n');
                $('#responses').empty();
                messages.forEach(message => {
                    if (message) {
                        const data = message.replace('data: ','');
                        $('#responses').append($('<p>').text(data));
                    }
                });
            }
        }
    });

    $("form").on('submit', (event) => {
        event.preventDefault();
        
        const url = `/convert/roman?input=${$('#inputNumber').val()}`;
        $.ajax({
            url: url,
            type: 'GET'
        });
    });
});