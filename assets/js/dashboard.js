$(document).ready(function() {
    setInterval(function() {
        AntrianCount();
        SisaAntrianCount();
    }, 2000);
    modal_addsrv();
    modal_addmkn();
});

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