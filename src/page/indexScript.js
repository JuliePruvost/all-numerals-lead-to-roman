

$(function() {
    $("form").on('submit', (event) => {
        event.preventDefault();
        
        const url = `/convert/roman?input=${$('#inputNumber').val()}`;
        $.ajax({
            url: url,
            type: 'GET',
            success: function(data){ 
                $('#response').css('color', 'black');
                $('#response').text(data);
            },
            error: function(data) {
                $('#response').css('color', 'red');
                $('#response').text(data.responseText);
            }
        });
    });
});