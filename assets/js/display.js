$(document).ready(function() {
    var url = base_url+'display/';

    if (window.location.href === url) {
        $('body').addClass('bg-display');
        updateTime();
        setInterval(updateTime, 1000);
    }
    
    var pusher = new Pusher('aa6cdc14689b5982c96f', {
        cluster: 'ap1',
        encrypted: true
    });

    // Subscribe to the channel
    var channel = pusher.subscribe('antrian-channel');
    var c2 = pusher.subscribe('waiting-channel');

    c2.bind('waiting-event', function(data) {
        refreshTable();
    });
    
    // Bind to the event
    channel.bind('antrian-event', function(data) {
        
        responsiveVoice.speak("Nomor Antrian, " + data.nomor + ", menuju, mekanik, "+ data.mekanik +"", "Indonesian Male", {
            rate: 0.9,
            pitch: 1,
            volume: 1
        });
        refreshTable();
    });
});
function loadCards() {
    $.ajax({
        url: base_url + 'Dashboard/getCardData/', // URL to your CI controller method to get card data
        type: 'GET',
        dataType: 'html',
        success: function(response) {
            $('#card-container').html(response);
            $('.fade-data').each(function(index) {
                $(this).delay(200 * index).queue(function(next) {
                    $(this).addClass('show');
                    next();
                });
            });
            cekdata();
            // $('#card-placeholder').addClass('d-none');
        },
        error: function(xhr, status, error) {
            console.error('Error loading cards:', error);
        }
    });
}
function loadCardWait() {
    $.ajax({
        url: base_url + 'Dashboard/loadCardWait/', // URL to your CI controller method to get card data
        type: 'GET',
        dataType: 'html',
        success: function(response) {
            $('#card-waiting').html(response);
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
function updateTime() {
    var now = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var date = now.toLocaleDateString('id-ID', options); // Indonesian locale
    var time = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }); // 24-hour format
    time = time.replace(/\./g, ':'); // Replace all periods with colons
    $('#dateTime').html(date + '<div class="d-flex justify-content-end">' + time+'</div>');
}

function refreshTable() {
    $.ajax({
        url: base_url+'display/refresh-data',
        method: 'GET',
        dataType: 'json', // Expecting JSON response
        success: function(data) {
            // Clear the existing table body
            $('tbody').empty();

            // Iterate through the returned data and create new rows
            $.each(data, function(index, item) {
                const fotoMkn = item.foto_mkn ? `<img src="${base_url+'assets/foto-mekanik/'+item.foto_mkn}" class="rounded-circle border border-blue shadow" style="width: 60px; height:60px;" alt="Avatar" />` : `<i class="bi bi-person-circle text-danger" style="font-size: 60px;"></i>`;
                const fotoFr = item.foto_fr ? `<img src="${base_url+'assets/foto-frontliner/'+item.foto_fr}" class="rounded-circle border border-blue shadow" style="width: 60px; height:60px;" alt="Avatar" />` : `<i class="bi bi-person-circle text-danger" style="font-size: 60px;"></i>`;
                const namaServis = item.nama_servis.replace(/\n/g, '<br>');

                const newRow = `
                    <tr>
                        <td class="text-white text-center">${item.no_antrian}</td>
                        <td class="text-white">${item.book_time}</td>
                        <td class="text-white">${item.nama_cst}</td>
                        <td class="text-white">${namaServis}</td>
                        <td class="text-white text-center">
                            <div class="feature-icon-1 centered-content">
                                ${fotoMkn}
                                <h6 class="mb-1 text-white text-center"><strong>${item.nama_mkn}</strong></h6>
                            </div>
                        </td>
                        <td class="text-white text-center">
                            <div class="feature-icon-1 centered-content">
                                ${fotoFr}
                                <h6 class="mb-1 text-white text-center"><strong>${item.nama_fr}</strong></h6>
                            </div>
                        </td>
                    </tr>`;
                
                // Append the new row to the table body
                $('tbody').append(newRow);
            });
        },
        error: function(error) {
            console.error('Error refreshing the table:', error);
        }
    });
}
