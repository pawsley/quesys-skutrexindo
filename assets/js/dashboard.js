var tableQueRgst;
$(document).ready(function() {
    $(document).on('select2:open', () => {
        document.querySelector('.select2-search__field').focus();
    });
    $(".select2").select2({
        containerCssClass: function(e) { 
          return $(e).attr('required') ? 'required' : '';
        }
    });
    $('.fade-in').each(function(index) {
        $(this).delay(200 * index).queue(function(next) {
            $(this).addClass('show');
            next();
        });
    });
    setInterval(function() {
        AntrianCount();
        SisaAntrianCount();
        // loadCards();
    }, 2000);
    modal_addsrv();
    modal_addmkn();
    modal_que();
    tableque();
    callque();
});

function tableque() {
    if ($.fn.DataTable.isDataTable('#tabel-antrian')) {
        tableQueRgst.destroy();
    }
    tableQueRgst = $("#tabel-antrian").DataTable({
        "processing": true,
        "language": {
            "processing": '<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>',
        },
        "serverSide": true,
        "order": [
            [0, 'asc']
        ],
        "ajax": {
            "url": base_url + 'antrian/load-antrian-regist/',
            "type": "POST"
        },
        "columns": [
            { "data": "no_antrian" },
            { "data": "book_time" },
            { "data": "nama_cst" },
            { "data": "nama_servis" },
            { "data": "nama_mkn" },
            {
                "data": "id",
                "orderable": false,
                "render": function (data, type, full, meta) {
                    if (type === "display") {
                        return `
                                <ul class="action">
                                    <div class="btn-group">
                                        <button class="btn btn-success" id="callingque"
                                        data-id="${data}" data-noque="${full.no_antrian}" data-mkn="${full.nama_mkn}"><i class="bi-mic-fill"></i></button>
                                    </div>
                                </ul>
                            `;
                    }
                    return data;
                }
            }    
        ],
        "dom":  "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
                "<'row'<'col-sm-12 col-md-2 mt-2'B>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-12 col-md-4'i><'col-sm-12 col-md-8'p>>",
                "buttons": [
                {
                    "text": 'Refresh', // Font Awesome icon for refresh
                    "className": 'btn btn-success', // Add a class name for identification
                    "attr": {
                        "id": "refresh-button" // Set the ID attribute
                    },
                    "init": function (api, node, config) {
                        $(node).removeClass('btn-default');
                        $(node).addClass('btn-success');
                        $(node).attr('title', 'Refresh'); // Add a title attribute for tooltip
                    },
                    "action": function () {
                        tableQueRgst.ajax.reload();
                    }
                },
            ]
            
    });
    return tableQueRgst;
}
function AntrianCount() {
    $.ajax({
        url: base_url+'antrian-counting/',
        type: 'GET',
        success: function(response) {
            $('#jumlah-antrian').text(response);
        },
        error: function() {
            $('#jumlah-antrian').text('0');
        }
    });
}
function NowQue() {
    $.ajax({
        url: base_url+'now-que/',
        type: 'GET',
        success: function(response) {
            $('#antrian').text(response);
            $('#noque').val(response);
        },
        error: function() {
            $('#antrian').text('0');
            $('#noque').val('0');
        }
    });
}
function SisaAntrianCount() {
    $.ajax({
        url: base_url+'antrian-sisa-counting/',
        type: 'GET',
        success: function(response) {
            $('#sisa-antrian').text(response);
        },
        error: function() {
            $('#sisa-antrian').text('0');
        }
    });
}

function addservis() {
    $('#form-srv').submit(function(e) {
        e.preventDefault(); // Prevent form submission
        $('#spinner-srv').removeClass('d-none');
        $('#txsubsrv').addClass('d-none');
        $('#subsrv').prop('disabled', true);

        var formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: base_url+'/servis/tambah-servis', 
            data: formData,
            dataType: 'json',
            success: function(response) {
                if (response.status ==='success') {
                    Swal.fire({
                        title: 'Success',
                        text: "Data berhasil ditambahkan",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        $('#namasrv').val('');
                        $('#namasrv').focus();
                    });
                } else {
                    Swal.fire({
                        title: 'Warning',
                        text: "nama servis sudah ada",
                        icon: 'warning',
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        $('#namasrv').focus();
                    });
                }
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText); 
            },
            complete: function() {
                $('#spinner-srv').addClass('d-none');
                $('#txsubsrv').removeClass('d-none');
                $('#subsrv').prop('disabled', false);
            }
        });
    });
    $('#form-srv input').keypress(function(e) {
        if (e.which == 13) { // Enter key
            $('#form-srv').submit();
            return false; // Prevent default form submission
        }
    });
}
function modal_addsrv() {
    $('#modaddsrv').on('show.bs.modal', function (e) {
        var btn = e.relatedTarget;
        var cid = $(btn).data('id');

        if (cid ==='asrv') {
            $('#modaddsrvLabel').text('Tambahkan Servis');
            $('#form-srv').removeClass('d-none');
            $('#formu-mkn').addClass('d-none');
            $('#list-srv').addClass('d-none');
            $('.modal-footer').addClass('d-none');
            setTimeout(function () {
                $('#namasrv').val('');
                $('#namasrv').focus();
            }, 500);
            addservis();
        } else if (cid === 'lsrv'){
            $('#modaddsrvLabel').text('List Servis');
            $('#list-srv').removeClass('d-none');
            $('#form-srv').addClass('d-none');
            $('#formu-srv').removeClass('d-none');
            $('#updsrv').removeClass('d-none');
            $('.modal-footer').removeClass('d-none');

            listsrv();
            updateservis();
            deletesrv();
        }
    });
}
function listsrv() {
    $('#list-srv').empty();
    $.ajax({
        type: 'GET',
        url: base_url + 'servis/list-servis',
        dataType: 'json',
        success: function(response) {
            if (response.length === 0) {
                $('#list-srv').append('<h5 class="text-center">No Data</h5>');
                $('#updsrv').addClass('d-none');
            } else {
                $.each(response, function(index, daf) {
                    var dafContainer = $('<div class="row mt-2 srv-item">');
                    var inputField = $('<input class="form-control srv-name" data-id="'+daf.id_servis+'" type="text">')
                                        .val(daf.nama_servis);
                    var deleteButton = $('<button class="btn btn-danger delsrv" data-id="'+daf.id_servis+'" type="button"><i class="bi bi-trash3"></i></button>');

                    dafContainer.append($('<div class="col-10">').append(inputField));
                    dafContainer.append($('<div class="col-2">').append(deleteButton));

                    $('#list-srv').append(dafContainer);
                });
            }
        },
        error: function() {
            $('#list-srv').append('<h5 class="text-center">No Data</h5>');
            $('#updsrv').addClass('d-none');
        }
    }); 
}
function updateservis() {
    $('#formu-srv').submit(function(e) {
        e.preventDefault();
        $('#spinner-upd').removeClass('d-none');
        $('#txupdsrv').addClass('d-none');
        $('#updsrv').prop('disabled', true);
        var dafData = [];
        var hasEmptyField = false;
        $('#list-srv .srv-item').each(function() {
            var idsb = $(this).find('.srv-name').data('id');
            var namasb = $(this).find('.srv-name').val();

            if (namasb === '') {
                hasEmptyField = true;
                Swal.fire({
                    title: 'Warning',
                    text: "Nama servis tidak boleh kosong",
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 1000
                }).then(() => {
                    $(this).find('.srv-name').focus(); // Focus on the empty input field
                });
                return false; // Exit the loop
            }
            dafData.push({
                id: idsb,
                name: namasb
            });
        });
        var jsonData = JSON.stringify(dafData);
        $.ajax({
            type: 'POST',
            url: base_url + 'servis/update-servis', 
            contentType: 'application/json',
            data: jsonData,
            success: function(response) {
                if (response.status ==='success') {
                    Swal.fire({
                        title: 'Success',
                        text: "Data berhasil diupdate",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        listsrv();
                    });
                }
            },
            complete: function() {
                $('#spinner-upd').addClass('d-none');
                $('#txupdsrv').removeClass('d-none');
                $('#updsrv').prop('disabled', false);
            }
        });
    });
    $('#modaddsrv').keypress(function(e) {
        if (e.which == 13) { // Enter key
            $('#formu-srv').submit();
            return false; // Prevent default form submission
        }
    });
}
function deletesrv() {
    $(document).on('click', '.delsrv', function(e) {
        e.preventDefault();
        var dafId = $(this).data('id');

        Swal.fire({
            title: 'Apa anda yakin?',
            text: 'Data yang sudah terhapus hilang permanen!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6c757d'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: 'POST',
                    url: base_url + 'servis/hapus-servis/' + dafId,
                    dataType: 'json',
                    success: function(response) {
                        if (response.success) {
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'Data berhasil dihapus.',
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 1000
                            }).then(function() {
                                listsrv();
                            });
                        } else {
                            Swal.fire('Error!', response.message, 'error');
                        }
                    },
                    error: function() {
                        Swal.fire('Error!', 'An error occurred while processing the request.', 'error');
                    }
                });
            }
        });
    });
}
// mekanik
function addmekanik() {
    $('#form-mkn').submit(function(e) {
        e.preventDefault(); // Prevent form submission
        $('#spinner-mkn').removeClass('d-none');
        $('#txsubmkn').addClass('d-none');
        $('#submkn').prop('disabled', true);

        var formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: base_url+'/mekanik/tambah-mekanik', 
            data: formData,
            dataType: 'json',
            success: function(response) {
                if (response.status ==='success') {
                    Swal.fire({
                        title: 'Success',
                        text: "Data berhasil ditambahkan",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        $('#namamkn').val('');
                        $('#namamkn').focus();
                    });
                } else {
                    Swal.fire({
                        title: 'Warning',
                        text: "nama mekanik sudah ada",
                        icon: 'warning',
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        $('#namamkn').focus();
                    });
                }
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText); 
            },
            complete: function() {
                $('#spinner-mkn').addClass('d-none');
                $('#txsubmkn').removeClass('d-none');
                $('#submkn').prop('disabled', false);
            }
        });
    });
    $('#form-mkn input').keypress(function(e) {
        if (e.which == 13) { // Enter key
            $('#form-mkn').submit();
            return false; // Prevent default form submission
        }
    });
}
function modal_addmkn() {
    $('#modaddmkn').on('show.bs.modal', function (e) {
        var btn = e.relatedTarget;
        var cid = $(btn).data('id');

        if (cid ==='amkn') {
            $('#modaddmknLabel').text('Tambahkan Mekanik');
            $('#form-mkn').removeClass('d-none');
            $('#formu-mkn').addClass('d-none');
            $('#list-mkn').addClass('d-none');
            $('.modal-footer').addClass('d-none');
            setTimeout(function () {
                $('#namamkn').val('');
                $('#namamkn').focus();
            }, 500);
            addmekanik();
        } else if (cid === 'lmkn'){
            $('#modaddmknLabel').text('List Mekanik');
            $('#list-mkn').removeClass('d-none');
            $('#form-mkn').addClass('d-none');
            $('#formu-mkn').removeClass('d-none');
            $('#umkn').removeClass('d-none');
            $('.modal-footer').removeClass('d-none');

            listmkn();
            updatemekanik();
            deletemkn();
        }
    });
}
function listmkn() {
    $('#list-mkn').empty();
    $.ajax({
        type: 'GET',
        url: base_url + 'mekanik/list-mekanik',
        dataType: 'json',
        success: function(response) {
            if (response.length === 0) {
                $('#list-mkn').append('<h5 class="text-center">No Data</h5>');
                $('#updmkn').addClass('d-none');
            } else {
                $.each(response, function(index, daf) {
                    var dafContainer = $('<div class="row mt-2 mkn-item">');
                    var inputField = $('<input class="form-control mkn-name" data-id="'+daf.id_mkn+'" type="text">')
                                        .val(daf.nama_mkn);
                    var deleteButton = $('<button class="btn btn-danger delmkn" data-id="'+daf.id_mkn+'" type="button"><i class="bi bi-trash3"></i></button>');

                    dafContainer.append($('<div class="col-10">').append(inputField));
                    dafContainer.append($('<div class="col-2">').append(deleteButton));

                    $('#list-mkn').append(dafContainer);
                });
            }
        },
        error: function() {
            $('#list-mkn').append('<h5 class="text-center">No Data</h5>');
            $('#updmkn').addClass('d-none');
        }
    }); 
}
function updatemekanik() {
    $('#formu-mkn').submit(function(e) {
        e.preventDefault();
        $('#spinner-umkn').removeClass('d-none');
        $('#txupdmkn').addClass('d-none');
        $('#updmkn').prop('disabled', true);
        var dafData = [];
        var hasEmptyField = false;
        $('#list-mkn .mkn-item').each(function() {
            var idsb = $(this).find('.mkn-name').data('id');
            var namasb = $(this).find('.mkn-name').val();

            if (namasb === '') {
                hasEmptyField = true;
                Swal.fire({
                    title: 'Warning',
                    text: "Nama servis tidak boleh kosong",
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 1000
                }).then(() => {
                    $(this).find('.mkn-name').focus(); // Focus on the empty input field
                });
                return false; // Exit the loop
            }
            dafData.push({
                id: idsb,
                name: namasb
            });
        });
        var jsonData = JSON.stringify(dafData);
        $.ajax({
            type: 'POST',
            url: base_url + 'mekanik/update-mekanik', 
            contentType: 'application/json',
            data: jsonData,
            success: function(response) {
                if (response.status ==='success') {
                    Swal.fire({
                        title: 'Success',
                        text: "Data berhasil diupdate",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        listmkn();
                    });
                }
            },
            complete: function() {
                $('#spinner-umkn').addClass('d-none');
                $('#txupdmkn').removeClass('d-none');
                $('#updmkn').prop('disabled', false);
            }
        });
    });
    $('#modaddmkn').keypress(function(e) {
        if (e.which == 13) { // Enter key
            $('#formu-mkn').submit();
            return false; // Prevent default form submission
        }
    });
}
function deletemkn() {
    $(document).on('click', '.delmkn', function(e) {
        e.preventDefault();
        var dafId = $(this).data('id');

        Swal.fire({
            title: 'Apa anda yakin?',
            text: 'Data yang sudah terhapus hilang permanen!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6c757d'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: 'POST',
                    url: base_url + 'mekanik/hapus-mekanik/' + dafId,
                    dataType: 'json',
                    success: function(response) {
                        if (response.success) {
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'Data berhasil dihapus.',
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 1000
                            }).then(function() {
                                listmkn();
                            });
                        } else {
                            Swal.fire('Error!', response.message, 'error');
                        }
                    },
                    error: function() {
                        Swal.fire('Error!', 'An error occurred while processing the request.', 'error');
                    }
                });
            }
        });
    });
}
// antrian
function modal_que() {
    $('#modaque').on('show.bs.modal', function (e) {
        var btn = e.relatedTarget;
        var cid = $(btn).data('id');

        if (cid ==='queatr') {
            NowQue();
            setTimeout(function () {
                $('#namacst').val('');
                $('#namacst').focus();
            }, 500);
            $("#selmkn").val('0').trigger('change.select2');
            $("#selsrv").val('0').trigger('change.select2');
            $("#selbook").val('0').trigger('change.select2');
            selectque();
            addque();
        }
    });
}
function selectque() {
    $('#selmkn').select2({
        dropdownParent: $("#modaque"),
        theme: 'classic',
        placeholder: 'Pilih Mekanik',
        allowClear: true,
        ajax: {
            url: base_url + 'mekanik/list-mekanik',
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term, // Add the search term to your AJAX request
                };
            },
            processResults: function (data) {
                return {
                    results: $.map(data, function (item) {
                        return {
                            id: item.id_mkn,
                            text: item.nama_mkn,
                        };
                    }),
                };
            },
            cache: false,
        },
    });
    $('#selsrv').select2({
        dropdownParent: $("#modaque"),
        theme: 'classic',
        placeholder: 'Pilih Jenis Servis',
        allowClear: true,
        ajax: {
            url: base_url + 'servis/list-servis',
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term, // Add the search term to your AJAX request
                };
            },
            processResults: function (data) {
                return {
                    results: $.map(data, function (item) {
                        return {
                            id: item.id_servis,
                            text: item.nama_servis,
                        };
                    }),
                };
            },
            cache: false,
        },
    });
    $('#selmkn').on('select2:select', function(e) {
        var data = e.params.data;
        var id_mkn = data.id;
        var startTime = 10; // Start time in 24-hour format
        var endTime = 17; // End time in 24-hour format
        var select = $('#selbook');
        var selectedValues = select.val() || [];
    
        $.ajax({
            url: base_url + 'Dashboard/cekavail/', // URL to your CI controller method
            type: 'POST',
            data: {
                id_mkn: id_mkn
            },
            dataType: 'json',
            success: function(response) {
                select.empty();
                
                var options = [];
                var bookedTimes = response.map(function(daf) { return daf.book_time; });
    
                for (var hour = startTime; hour < endTime; hour++) {
                    var start = ('0' + hour).slice(-2) + ':00';
                    var end = ('0' + (hour + 1)).slice(-2) + ':00';
                    var optionText = start + '-' + end;
                    // var optionValue = hour + '-' + (hour + 1);
                    var optionValue = start + '-' + end;
    
                    // Check if this time slot is booked
                    if (bookedTimes.includes(optionText)) {
                        optionText += ' (booked)';
                    }
    
                    var option = new Option(optionText, optionValue, false, false);
                    options.push(option);
                }

                var placeholder = new Option('Pilih Jam Booking', '0', true, false);
                select.append(placeholder);
                // Append options to select element
                select.append(options);
    
                // Initialize select2 once
                select.select2({
                    dropdownParent: $("#modaque"),
                    theme: 'classic',
                    placeholder: 'Pilih Jam Booking',
                    allowClear: true,
                });
                if (selectedValues.length === 0 || selectedValues.includes('0')) {
                    select.val('0').trigger('change'); // Set placeholder as selected
                } else {
                    select.val(selectedValues).trigger('change');
                }
                select.find('option[value="0"]').prop('disabled', true);
                // Disable options based on the response
                select.find('option').each(function() {
                    var optionText = $(this).text();
                    if (optionText.endsWith('(booked)')) {
                        $(this).prop('disabled', true);
                    }
                });
    
                // Refresh select2 to show disabled options correctly
                select.trigger('change.select2');
            },
            error: function(xhr, status, error) {
                console.error('Error checking availability:', error);
            }
        });
    });
    $('#selbook').select2({
        dropdownParent: $("#modaque"),
        theme: 'classic',
        placeholder: 'Pilih Jam Booking',
        allowClear: true,
    });
}
function addque() {
    $('#form-que').submit(function(e) {
        e.preventDefault(); // Prevent form submission
        $('#spinner-que').removeClass('d-none');
        $('#txque').addClass('d-none');
        $('#addque').prop('disabled', true);

        var formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: base_url+'/antrian/tambah-antrian', 
            data: formData,
            dataType: 'json',
            success: function(response) {
                if (response.status ==='success') {
                    Swal.fire({
                        title: 'Success',
                        text: "Data berhasil ditambahkan",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        NowQue();
                        $('#namacst').val('');
                        $('#namacst').focus();
                        $("#selmkn").val('0').trigger('change.select2');
                        $("#selsrv").val('0').trigger('change.select2');
                        $("#selbook").val('0').trigger('change.select2');
                        tableQueRgst.ajax.reload();
                    });
                } else {
                    Swal.fire({
                        title: 'Warning',
                        text: "Antrian sudah ada",
                        icon: 'warning',
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        $('#namacst').focus();
                    });
                }
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText); 
            },
            complete: function() {
                $('#spinner-que').addClass('d-none');
                $('#txque').removeClass('d-none');
                $('#addque').prop('disabled', false);
            }
        });
    });
    $('#form-que input').keypress(function(e) {
        if (e.which == 13) { // Enter key
            $('#form-que').submit();
            return false; // Prevent default form submission
        }
    });
}
function callque() {
    $('#tabel-antrian').on('click', '#callingque', function (e) {
        var id = $(this).data('id');
        var antrian = $(this).data('noque');
        var mekanik = $(this).data('mkn');
        var $bell = $('#tingtung')[0];

        // mainkan suara bell antrian
        $bell.pause();
        $bell.currentTime = 0;
        $bell.play();

        // set delay antara suara bell dengan suara nomor antrian
        var durasi_bell = $bell.duration * 770;

        // mainkan suara nomor antrian
        setTimeout(function() {
            responsiveVoice.speak("Nomor Antrian, " + antrian + ", menuju, mekanik, "+ mekanik +"", "Indonesian Male", {
                rate: 0.9,
                pitch: 1,
                volume: 1
            });
        }, durasi_bell);

        $.ajax({
            url: base_url + 'Dashboard/callingque/', // URL to your CI controller method
            type: 'POST',
            data: {
                idque: id
            },
            dataType: 'json',
            success: function(response) {
                console.log(response.status);
                // console.log('panggil');
                // setInterval(function() {
                    loadCards();
                // }, 2000);
            },
            error: function(xhr, status, error) {
                console.error('Error checking availability:', error);
            }
        });
    });
}
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