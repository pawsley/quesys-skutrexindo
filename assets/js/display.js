$(document).ready(function() {
    var pusher = new Pusher('aa6cdc14689b5982c96f', {
        cluster: 'ap1',
        encrypted: true
    });

    // Subscribe to the channel
    var channel = pusher.subscribe('antrian-channel');
    
    // Bind to the event
    channel.bind('antrian-event', function(data) {
        responsiveVoice.speak("Nomor Antrian, " + data.nomor + ", menuju, mekanik, "+ data.mekanik +"", "Indonesian Male", {
            rate: 0.9,
            pitch: 1,
            volume: 1
        });
        // var $bell = $('#tingtung')[0];
        // $bell.pause();
        // $bell.currentTime = 0;
        // $bell.play();

        // var durasi_bell = $bell.duration * 770;

        // setTimeout(function() {
        //     responsiveVoice.speak("Nomor Antrian, " + data.nomor + ", menuju, mekanik, "+ data.mekanik +"", "Indonesian Male", {
        //         rate: 0.9,
        //         pitch: 1,
        //         volume: 1
        //     });
        // }, durasi_bell);
        loadCards();
    });
    loadCards();
});
function loadCards() {
    $.ajax({
        url: base_url + 'Dashboard/getCardData/', // URL to your CI controller method to get card data
        type: 'GET',
        dataType: 'html',
        success: function(response) {
            $('#card-container').html(response);
            $('.fade-in').each(function(index) {
                $(this).delay(200 * index).queue(function(next) {
                    $(this).addClass('show');
                    next();
                });
            });
        },
        error: function(xhr, status, error) {
            console.error('Error loading cards:', error);
        }
    });
}
function playvoice(data) {
    // $("#check").on("click", function () {

    // });
}