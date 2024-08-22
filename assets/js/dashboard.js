var tableQueRgst;
var tableReport;
$(document).ready(function() {
    $(document).on('select2:open', () => {
        document.querySelector('.select2-search__field').focus();
    });
    $(".select2").select2({
        containerCssClass: function(e) { 
          return $(e).attr('required') ? 'required' : '';
        }
    });
    setInterval(function() {
        AntrianCount();
        SisaAntrianCount();
    }, 2000);
    modal_addsrv();
    modal_addmkn();
    modal_addfront();
    modal_que();
    modal_report();
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
            {
                "data": "nama_servis",
                "render": function(data, type, row) {
                    return data.replace(/\n/g, '<br>');
                }
            },
            { "data": "nama_mkn" },
            { "data": "nama_fr" },
            {
                "data": "id",
                "orderable": false,
                "render": function (data, type, full, meta) {
                    var timeParts = full.book_time.split('-');

                    // Extract the start and end times
                    var startTime = timeParts[0];
                    var endTime = timeParts[1];
                    if (type === "display") {
                        return `
                                <ul class="action">
                                    <div class="btn-group">
                                        <button class="btn btn-success" id="callingque"
                                        data-id="${data}" data-noque="${full.no_antrian}" data-mkn="${full.nama_mkn}"><i class="bi bi-megaphone-fill"></i></button>
                                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modaque"
                                        id="editque" data-id="edque" data-idatr="${data}" data-noque="${full.no_antrian}" data-imkn="${full.id_mkn}" data-mkn="${full.nama_mkn}" data-ifr="${full.id_fr}" data-fr="${full.nama_fr}" data-idtl="${full.id_adtl}" data-isrv="${full.id_servis}" data-srv="${full.nama_servis}" data-jb="${startTime}" data-eb="${endTime}" data-cst="${full.nama_cst}">
                                        <i class="bi-pencil-square"></i></button>
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
function tablerp() {
    if ($.fn.DataTable.isDataTable('#tabel-report')) {
        tableReport.destroy();
    }
    tableReport = $("#tabel-report").DataTable({
        "processing": true,
        "language": {
            "processing": '<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>',
        },
        "serverSide": true,
        "order": [
            [1, 'asc']
        ],
        "ajax": {
            "url": base_url + 'antrian/load-antrian-report/',
            "type": "POST"
        },
        "columns": [
            { "data": "no_antrian" },
            { "data": "reserv" },
            { "data": "nama_cst" },
            {
                "data": "nama_servis",
                "render": function(data, type, row) {
                    return data.replace(/\n/g, '<br>');
                }
            },
            { "data": "nama_mkn" },
            { "data": "nama_fr" },    
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
                        tableReport.ajax.reload();
                    }
                },
            ]
            
    });
    return tableReport;
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
// servis
function addservis() {
    let isSubmitting = false; 
    $('#form-srv').off('submit').on('submit', function(e) {
        e.preventDefault(); 

        if (isSubmitting) {
            return; 
        }

        isSubmitting = true; 
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
                isSubmitting = false;
                $('#spinner-srv').addClass('d-none');
                $('#txsubsrv').removeClass('d-none');
                $('#subsrv').prop('disabled', false);
            }
        });
    });
}
function modal_addsrv() {
    $('#modaddsrv').off('show.bs.modal').on('show.bs.modal', function (e) {
        var btn = e.relatedTarget;
        var cid = $(btn).data('id');

        if (cid ==='asrv') {
            $('#modaddsrvLabel').text('Tambahkan Servis');
            $('#form-srv').removeClass('d-none');
            $('#formu-mkn').addClass('d-none');
            $('#list-srv').addClass('d-none');
            $('#mfsrv').addClass('d-none');
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
            $('#mfsrv').removeClass('d-none');
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
                $('#updsrv').removeClass('d-none');
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
    let isSubmitting = false; 
    $('#form-mkn').off('submit').on('submit', function(e) {
        e.preventDefault(); 

        if (isSubmitting) {
            return; 
        }

        isSubmitting = true; 
        $('#spinner-mkn').removeClass('d-none');
        $('#txsubmkn').addClass('d-none');
        $('#submkn').prop('disabled', true);

        var formData = new FormData(this);

        $.ajax({
            type: 'POST',
            url: base_url+'/mekanik/tambah-mekanik', 
            data: formData,
            dataType: 'json',
            processData: false, 
            contentType: false, 
            success: function(response) {
                if (response.status === 'success') {
                    Swal.fire({
                        title: 'Success',
                        text: "Data berhasil ditambahkan",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        $('#namamkn').val('');
                        $('#upload-mkn').css('background-image', 'none');
                        $('#imgmkn').val('');
                        $('#namamkn').focus();
                    });
                } else if (response.status === 'exists') {
                    Swal.fire({
                        title: 'Warning',
                        text: "Nama mekanik sudah ada",
                        icon: 'warning',
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        $('#namamkn').focus();
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: response.message,
                        icon: 'error',
                        showConfirmButton: true
                    });
                }
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            },
            complete: function() {
                isSubmitting = false; 
                $('#spinner-mkn').addClass('d-none');
                $('#txsubmkn').removeClass('d-none');
                $('#submkn').prop('disabled', false);
            }
        });
    });
}
function modal_addmkn() {
    let fileReader;
    $('#modaddmkn').off('show.bs.modal').on('show.bs.modal', function (e) {
        var btn = e.relatedTarget;
        var cid = $(btn).data('id');

        if (cid ==='amkn') {
            $('#modaddmknLabel').text('Tambahkan Mekanik');
            $('#form-mkn').removeClass('d-none');
            $('#formu-mkn').addClass('d-none');
            $('#list-mkn').addClass('d-none');
            $('#mfmkn').addClass('d-none');
            setTimeout(function () {
                $('#namamkn').val('');
                $('#namamkn').focus();
            }, 500);
            imgpreviewmkn(fileReader);
            addmekanik();
        } else if (cid === 'lmkn'){
            $('#modaddmknLabel').text('List Mekanik');
            $('#list-mkn').removeClass('d-none');
            $('#form-mkn').addClass('d-none');
            $('#formu-mkn').removeClass('d-none');
            $('#umkn').removeClass('d-none');
            $('#mfmkn').removeClass('d-none');
            listmkn();
            updatemekanik();
            deletemkn();
        }
    });
    $('#modaddmkn').off('hide.bs.modal').on('hide.bs.modal', function() {
        clearImagePreviewmkn(fileReader);
    });
}
function listmkn() {
    $('#list-mkn').empty();
    $.ajax({
        type: 'GET',
        url: base_url + 'mekanik/list-mekanik',
        dataType: 'json',
        success: function(response) {
            console.log(response);
            if (response.length === 0) {
                $('#list-mkn').append('<h5 class="text-center">No Data</h5>');
                $('#updmkn').addClass('d-none');
            } else {
                $('#updmkn').removeClass('d-none');
                $.each(response, function(index, daf) {
                    var dafContainer = $('<div class="row mt-2 mkn-item">');

                    var inputField = $('<input class="form-control mkn-name" data-id="'+daf.id_mkn+'" type="text">').val(daf.nama_mkn);

                    var imgUpload = $('<input class="form-control imgprm" id="imgprm-'+daf.id_mkn+'" name="imgprm[]" type="file" accept=".png, .jpg, .jpeg" style="display: none;">');

                    var imgButton = $('<div class="input-group-text"></div>').css({
                        width: '40px',
                        height: '40px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }).click(function() {
                        imgUpload.click();
                    });

                    if (daf.foto_mkn) {
                        imgButton.css({
                            backgroundImage: 'url(' + base_url + 'assets/foto-mekanik/' + daf.foto_mkn + ')',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }).empty(); // Clear the content if there was an icon
                    } else {
                        imgButton.html('<i class="bi bi-person-circle"></i>').css({
                            backgroundImage: 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        });
                    }

                    imgUpload.on('change', function() {
                        const file = this.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = function(e) {
                                imgButton.css('background-image', 'url(' + e.target.result + ')').empty();
                            };
                            reader.readAsDataURL(file);
                        }
                    });

                    var deleteButton = $('<button class="btn btn-danger delmkn" data-id="'+daf.id_mkn+'" type="button"><i class="bi bi-trash3"></i></button>');

                    var inputGroup = $('<div class="input-group">');
                    inputGroup.append(imgButton).append(inputField);

                    dafContainer.append($('<div class="col-10">').append(inputGroup));
                    dafContainer.append($('<div class="col-2">').append(deleteButton));
                    dafContainer.append($('<div class="col-md-12">').append(imgUpload));

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

        var formData = new FormData();
        hasEmptyField = false;

        $('#list-mkn .mkn-item').each(function(index) {
            var id = $(this).find('.mkn-name').data('id');
            var name = $(this).find('.mkn-name').val();
            var img = $(this).find('.imgprm')[0].files[0];

            if (name === '') {
                hasEmptyField = true;
                Swal.fire({
                    title: 'Warning',
                    text: "Nama mekanik tidak boleh kosong",
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 1000
                }).then(() => {
                    $(this).find('.mkn-name').focus(); // Focus on the empty input field
                });
                return false; // Exit the loop
            }
            formData.append('ids[]', id);
            formData.append('names[]', name);
            if (img) {
                formData.append('imgs[]', img);
                formData.append('file_indices[]', index); // Add file index
            }
        });

        if (hasEmptyField) return;

        $.ajax({
            type: 'POST',
            url: base_url + 'mekanik/update-mekanik', 
            contentType: 'application/json',
            data: formData,
            processData: false,
            contentType: false,
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
function imgpreviewmkn(fileReader) {
    $('#upload-mkn').off('click').on('click', function() {
        $('#imgmkn').click();
    });

    $('#imgmkn').off('change').on('change', function(event) {
        const file = event.target.files[0];
        const $uploadBtn = $('#upload-mkn');

        if (file) {
            fileReader = new FileReader();

            fileReader.onload = function(e) {
                lastImageUrl = e.target.result;
                $uploadBtn.css('background-image', 'url(' + e.target.result + ')');
            };

            fileReader.readAsDataURL(file);
        }
    });
}
function clearImagePreviewmkn(fileReader) {
    const $uploadBtn = $('#upload-mkn');
    $uploadBtn.css('background-image', 'none');
    $('#imgmkn').val(''); 
    if (fileReader) {
        fileReader.abort();
        fileReader = null; 
    }
}
// antrian
function modal_que() {
    $('#modaque').on('show.bs.modal', function (e) {
        var btn = e.relatedTarget;
        var cid = $(btn).data('id');

        if (cid ==='queatr') {
            $('#form-editque').addClass('d-none');
            $('#form-que').removeClass('d-none');
            $('#modaqueLabel').text('Form Antrian');
            NowQue();
            setTimeout(function () {
                $('#namacst').val('');
                $('#namacst').focus();
            }, 500);
            $("#selmkn").val('0').trigger('change.select2');
            $("#selsrv").val('0').trigger('change.select2');
            $("#selfr").val('0').trigger('change.select2');
            $("#selbook").val('0').trigger('change.select2');
            selectque();
            addque();
        } else if (cid ==='edque'){
            selectedque();
            var idatr = $(btn).data('idatr');
            var no = $(btn).data('noque');
            var cst = $(btn).data('cst');
            var imkn = $(btn).data('imkn');
            var mkn = $(btn).data('mkn');
            var ifr = $(btn).data('ifr');
            var fr = $(btn).data('fr');
            var srvData = $(btn).data('srv');
            var isrvData = $(btn).data('isrv');
            var srv = typeof srvData === 'string' ? srvData.split(/[\n,]+/) : [srvData];
            var isrv = typeof isrvData === 'string' ? isrvData.split(',') : [isrvData];            
            var jb = $(btn).data('jb');
            var eb = $(btn).data('eb');
            var $select = $('#edselsrv');
            $('#form-que').addClass('d-none');
            $('#form-editque').removeClass('d-none');
            $('#modaqueLabel').text('Edit Antrian');
            $('#edantrian').text(no);
            $('#ednoque').val(no);
            $('#ednamacst').val(cst);
            $("#edselmkn").empty().append('<option value="' + imkn + '">' + mkn + '</option>').trigger('change.select2');
            $("#edselfr").empty().append('<option value="' + ifr + '">' + fr + '</option>').trigger('change.select2');
            
            $select.empty();
    
            for (var i = 0; i < isrv.length; i++) {
                var optionText = srv[i] || ''; 
                var optionValue = isrv[i];     
                if (optionText && optionValue) { 
                    $select.append(new Option(optionText, optionValue, true, true));
                }
            }
            console.log(isrv);
    
            $select.trigger('change.select2');
            $('#edselbook').val(jb);
            $('#eselend').val(eb);
            updateque(idatr);
        }
    });
}
function modal_report() {
    $('#modarepor').on('show.bs.modal', function (e) {
        tablerp();
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
    $('#selfr').select2({
        dropdownParent: $("#modaque"),
        theme: 'classic',
        placeholder: 'Pilih Frontliner',
        allowClear: true,
        ajax: {
            url: base_url + 'frontliner/list-frontliner',
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
                            id: item.id_fr,
                            text: item.nama_fr,
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
        multiple: true,
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
    // $('#selmkn').on('select2:select', function(e) {
    //     var data = e.params.data;
    //     var id_mkn = data.id;
    //     var startTime = 10;
    //     var endTime = 17;
    //     var select = $('#selbook');
    //     var selectedValues = select.val() || [];
    
    //     $.ajax({
    //         url: base_url + 'Dashboard/cekavail/',
    //         type: 'POST',
    //         data: {
    //             id_mkn: id_mkn
    //         },
    //         dataType: 'json',
    //         success: function(response) {
    //             select.empty();
                
    //             var options = [];
    //             var bookedTimes = response.map(function(daf) { return daf.book_time; });
    
    //             for (var hour = startTime; hour < endTime; hour++) {
    //                 var start = ('0' + hour).slice(-2) + ':00';
    //                 var end = ('0' + (hour + 1)).slice(-2) + ':00';
    //                 var optionText = start + '-' + end;
    //                 var optionValue = start + '-' + end;
    
    //                 if (bookedTimes.includes(optionText)) {
    //                     optionText += ' (booked)';
    //                 }
    
    //                 var option = new Option(optionText, optionValue, false, false);
    //                 options.push(option);
    //             }

    //             var placeholder = new Option('Pilih Jam Booking', '0', true, false);
    //             select.append(placeholder);
    //             select.append(options);
    
    //             select.select2({
    //                 dropdownParent: $("#modaque"),
    //                 theme: 'classic',
    //                 placeholder: 'Pilih Jam Booking',
    //                 allowClear: true,
    //             });
    //             if (selectedValues.length === 0 || selectedValues.includes('0')) {
    //                 select.val('0').trigger('change');
    //             } else {
    //                 select.val(selectedValues).trigger('change');
    //             }
    //             select.find('option[value="0"]').prop('disabled', true);
    //             select.find('option').each(function() {
    //                 var optionText = $(this).text();
    //                 if (optionText.endsWith('(booked)')) {
    //                     $(this).prop('disabled', true);
    //                 }
    //             });
    
    //             select.trigger('change.select2');
    //         },
    //         error: function(xhr, status, error) {
    //             console.error('Error checking availability:', error);
    //         }
    //     });
    // });
    // $('#selbook').select2({
    //     dropdownParent: $("#modaque"),
    //     theme: 'classic',
    //     placeholder: 'Pilih Jam Booking',
    //     allowClear: true,
    // });
}
function selectedque() {
    $('#edselmkn').select2({
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
    $('#edselfr').select2({
        dropdownParent: $("#modaque"),
        theme: 'classic',
        placeholder: 'Pilih Frontliner',
        allowClear: true,
        ajax: {
            url: base_url + 'frontliner/list-frontliner',
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
                            id: item.id_fr,
                            text: item.nama_fr,
                        };
                    }),
                };
            },
            cache: false,
        },
    });
    $('#edselsrv').select2({
        dropdownParent: $("#modaque"),
        theme: 'classic',
        placeholder: 'Pilih Jenis Servis',
        allowClear: true,
        multiple: true,
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
    // $('#edselmkn').on('select2:select', function(e) {
    //     var data = e.params.data;
    //     var id_mkn = data.id;
    //     var startTime = 10; // Start time in 24-hour format
    //     var endTime = 17; // End time in 24-hour format
    //     var select = $('#edselbook');
    //     var selectedValues = select.val() || [];
    
    //     $.ajax({
    //         url: base_url + 'Dashboard/cekavail/', // URL to your CI controller method
    //         type: 'POST',
    //         data: {
    //             id_mkn: id_mkn
    //         },
    //         dataType: 'json',
    //         success: function(response) {
    //             select.empty();
                
    //             var options = [];
    //             var bookedTimes = response.map(function(daf) { return daf.book_time; });
    
    //             for (var hour = startTime; hour < endTime; hour++) {
    //                 var start = ('0' + hour).slice(-2) + ':00';
    //                 var end = ('0' + (hour + 1)).slice(-2) + ':00';
    //                 var optionText = start + '-' + end;
    //                 // var optionValue = hour + '-' + (hour + 1);
    //                 var optionValue = start + '-' + end;
    
    //                 // Check if this time slot is booked
    //                 if (bookedTimes.includes(optionText)) {
    //                     optionText += ' (booked)';
    //                 }
    
    //                 var option = new Option(optionText, optionValue, false, false);
    //                 options.push(option);
    //             }

    //             var placeholder = new Option('Pilih Jam Booking', '0', true, false);
    //             select.append(placeholder);
    //             // Append options to select element
    //             select.append(options);
    
    //             // Initialize select2 once
    //             select.select2({
    //                 dropdownParent: $("#modaque"),
    //                 theme: 'classic',
    //                 placeholder: 'Pilih Jam Booking',
    //                 allowClear: true,
    //             });
    //             if (selectedValues.length === 0 || selectedValues.includes('0')) {
    //                 select.val('0').trigger('change'); // Set placeholder as selected
    //             } else {
    //                 select.val(selectedValues).trigger('change');
    //             }
    //             select.find('option[value="0"]').prop('disabled', true);
    //             // Disable options based on the response
    //             select.find('option').each(function() {
    //                 var optionText = $(this).text();
    //                 if (optionText.endsWith('(booked)')) {
    //                     $(this).prop('disabled', true);
    //                 }
    //             });
    
    //             // Refresh select2 to show disabled options correctly
    //             select.trigger('change.select2');
    //         },
    //         error: function(xhr, status, error) {
    //             console.error('Error checking availability:', error);
    //         }
    //     });
    // });
    // $('#edselbook').select2({
    //     dropdownParent: $("#modaque"),
    //     theme: 'classic',
    //     placeholder: 'Pilih Jam Booking',
    //     allowClear: true,
    // });
}
function addque() {
    let isSubmitting = false; 
    $('#form-que').off('submit').on('submit', function(e) {
        e.preventDefault(); 

        if (isSubmitting) {
            return; 
        }

        isSubmitting = true; 
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
                        $("#selfr").val('0').trigger('change.select2');
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
                isSubmitting = false;
                $('#spinner-que').addClass('d-none');
                $('#txque').removeClass('d-none');
                $('#addque').prop('disabled', false);
            }
        });
    });
}
function updateque(id) {
    $('#form-editque').off('submit').on('submit', function(e) {
        e.preventDefault();
        $('#spinner-edque').removeClass('d-none');
        $('#txedque').addClass('d-none');
        $('#edque').prop('disabled', true);
        var nama = $('#ednamacst').val();
        var mkn = $('#edselmkn').val();
        var fr = $('#edselfr').val();
        var srv = $('#edselsrv').val();
        var book = $('#edselbook').val();
        var estd = $('#eselend').val();
        $.ajax({
            type: 'POST',
            url: base_url + 'antrian/update-antrian', 
            dataType: "json", 
            data: {
                eid: id,
                ednamacst: nama,
                edselmkn: mkn,
                edselfr: fr,
                edselbook: book,
                eselend: estd,
                edselsrv: srv
            },
            success: function(response) {
                if (response.status ==='success') {
                    Swal.fire({
                        title: 'Success',
                        text: "Data berhasil diupdate",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        tableQueRgst.ajax.reload();
                    });
                }
            },
            complete: function() {
                $('#spinner-edque').addClass('d-none');
                $('#txedque').removeClass('d-none');
                $('#edque').prop('disabled', false);
            }
        });
    });
}
function callque() {
    $('#tabel-antrian').off('click', '#callingque').on('click', '#callingque', function (e) {
        e.preventDefault(); // Prevent default action if necessary
        var button = $(this);

        if (button.prop('disabled')) {
            return;
        }

        button.prop('disabled', true); // Disable button
        var id = button.data('id');
        var antrian = button.data('noque');
        var mekanik = button.data('mkn');

        $.ajax({
            url: base_url + 'Dashboard/callingque/', // URL to your CI controller method
            type: 'POST',
            data: {
                idque: id,
                nomor: antrian,
                mekanik: mekanik
            },
            dataType: 'json',
            success: function(response) {
                console.log(response.status);
            },
            error: function(xhr, status, error) {
                console.error('Error checking availability:', error);
            },
            complete: function() {
                button.prop('disabled', false);
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
// frontliner
function addfront() {
    let isSubmitting = false; 

    $('#form-fr').off('submit').on('submit', function(e) {
        e.preventDefault(); 

        if (isSubmitting) {
            return; 
        }

        isSubmitting = true; 
        $('#spinner-fr').removeClass('d-none');
        $('#txsubfr').addClass('d-none');
        $('#subfr').prop('disabled', true);

        var formData = new FormData(this); 

        $.ajax({
            type: 'POST',
            url: base_url + '/frontliner/tambah-frontliner',
            data: formData,
            dataType: 'json',
            processData: false, 
            contentType: false, 
            success: function(response) {
                if (response.status === 'success') {
                    Swal.fire({
                        title: 'Success',
                        text: "Data berhasil ditambahkan",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        $('#namafr').val('');
                        $('#upload-btn').css('background-image', 'none');
                        $('#imgm').val('');
                        $('#namafr').focus();
                    });
                } else if (response.status === 'exists') {
                    Swal.fire({
                        title: 'Warning',
                        text: "Nama frontliner sudah ada",
                        icon: 'warning',
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        $('#namafr').focus();
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: response.message,
                        icon: 'error',
                        showConfirmButton: true
                    });
                }
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            },
            complete: function() {
                isSubmitting = false; 
                $('#spinner-fr').addClass('d-none');
                $('#txsubfr').removeClass('d-none');
                $('#subfr').prop('disabled', false);
            }
        });
    });
}
function modal_addfront() {
    let fileReader;
    $('#modaaddfr').off('show.bs.modal').on('show.bs.modal', function (e) {
        var btn = e.relatedTarget;
        var cid = $(btn).data('id');

        if (cid ==='afr') {
            $('#modaaddfrLabel').text('Tambahkan Frontliner');
            $('#form-fr').removeClass('d-none');
            $('#formu-fr').addClass('d-none');
            $('#list-fr').addClass('d-none');
            $('#mffr').addClass('d-none');
            setTimeout(function () {
                $('#namafr').val('');
                $('#namafr').focus();
            }, 500);
            imgpreviewfr(fileReader);
            addfront();
        } else if (cid === 'lfr'){
            $('#modaaddfrLabel').text('List Frontliner');
            $('#list-fr').removeClass('d-none');
            $('#form-fr').addClass('d-none');
            $('#formu-fr').removeClass('d-none');
            $('#ufr').removeClass('d-none');
            $('#mffr').removeClass('d-none');
            listfront();
            updatefront();
            deletefront();
        }
    });
    $('#modaaddfr').off('hide.bs.modal').on('hide.bs.modal', function() {
        clearImagePreview(fileReader)
    });
}
function listfront() {
    $('#list-fr').empty();
    $.ajax({
        type: 'GET',
        url: base_url + 'frontliner/list-frontliner',
        dataType: 'json',
        success: function(response) {
            if (response.length === 0) {
                $('#list-fr').append('<h5 class="text-center">No Data</h5>');
                $('#updfr').addClass('d-none');
            } else {
                $('#updfr').removeClass('d-none');
                $.each(response, function(index, daf) {
                    var dafContainer = $('<div class="row mt-2 fr-item">');

                    var inputField = $('<input class="form-control fr-name" data-id="'+daf.id_fr+'" type="text">').val(daf.nama_fr);

                    var imgUpload = $('<input class="form-control imgpr" id="imgpr-'+daf.id_fr+'" name="imgpr[]" type="file" accept=".png, .jpg, .jpeg" style="display: none;">');

                    var imgButton = $('<div class="input-group-text"></div>').css({
                        width: '40px',
                        height: '40px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }).click(function() {
                        imgUpload.click();
                    });

                    if (daf.foto_fr) {
                        imgButton.css({
                            backgroundImage: 'url(' + base_url + 'assets/foto-frontliner/' + daf.foto_fr + ')',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }).empty(); // Clear the content if there was an icon
                    } else {
                        imgButton.html('<i class="bi bi-person-circle"></i>').css({
                            backgroundImage: 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        });
                    }

                    imgUpload.on('change', function() {
                        const file = this.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = function(e) {
                                imgButton.css('background-image', 'url(' + e.target.result + ')').empty();
                            };
                            reader.readAsDataURL(file);
                        }
                    });

                    var deleteButton = $('<button class="btn btn-danger delfr" data-id="'+daf.id_fr+'" type="button"><i class="bi bi-trash3"></i></button>');

                    var inputGroup = $('<div class="input-group">');
                    inputGroup.append(imgButton).append(inputField);

                    dafContainer.append($('<div class="col-md-10">').append(inputGroup));
                    dafContainer.append($('<div class="col-md-2">').append(deleteButton));
                    dafContainer.append($('<div class="col-md-12">').append(imgUpload));

                    $('#list-fr').append(dafContainer);
                });
            }
        },
        error: function() {
            $('#list-fr').append('<h5 class="text-center">No Data</h5>');
            $('#updfr').addClass('d-none');
        }
    });
}
function updatefront() {
    $('#formu-fr').submit(function(e) {
        e.preventDefault();
        $('#spinner-fru').removeClass('d-none');
        $('#txupdfr').addClass('d-none');
        $('#updfr').prop('disabled', true);

        var formData = new FormData();
        hasEmptyField = false;

        $('#list-fr .fr-item').each(function(index) {
            var id = $(this).find('.fr-name').data('id');
            var name = $(this).find('.fr-name').val();
            var img = $(this).find('.imgpr')[0].files[0];

            if (name === '') {
                hasEmptyField = true;
                Swal.fire({
                    title: 'Warning',
                    text: "Nama frontliner tidak boleh kosong",
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 1000
                }).then(() => {
                    $(this).find('.fr-name').focus(); // Focus on the empty input field
                });
                return false; // Exit the loop
            }
            formData.append('ids[]', id);
            formData.append('names[]', name);
            if (img) {
                formData.append('imgs[]', img);
                formData.append('file_indices[]', index); // Add file index
            }
        });

        if (hasEmptyField) return;

        $.ajax({
            type: 'POST',
            url: base_url + 'frontliner/update-frontliner',
            data: formData,
            processData: false, 
            contentType: false, 
            success: function(response) {
                if (response.status === 'success') {
                    Swal.fire({
                        title: 'Success',
                        text: "Data berhasil diupdate",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        listfront();
                    });
                } else {
                    Swal.fire('Error!', response.message, 'error');
                }
            },
            complete: function() {
                $('#spinner-fru').addClass('d-none');
                $('#txupdfr').removeClass('d-none');
                $('#updfr').prop('disabled', false);
            }
        });
    });
}
function deletefront() {
    $(document).on('click', '.delfr', function(e) {
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
                    url: base_url + 'frontliner/hapus-frontliner/' + dafId,
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
                                listfront();
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
function imgpreviewfr(fileReader) {
    $('#upload-btn').off('click').on('click', function() {
        $('#imgm').click();
    });

    $('#imgm').off('change').on('change', function(event) {
        const file = event.target.files[0];
        const $uploadBtn = $('#upload-btn');

        if (file) {
            fileReader = new FileReader();

            fileReader.onload = function(e) {
                lastImageUrl = e.target.result;
                $uploadBtn.css('background-image', 'url(' + e.target.result + ')');
            };

            fileReader.readAsDataURL(file);
        }
    });
}
function clearImagePreview(fileReader) {
    const $uploadBtn = $('#upload-btn');
    $uploadBtn.css('background-image', 'none');
    $('#imgm').val(''); 
    if (fileReader) {
        fileReader.abort();
        fileReader = null; 
    }
}
// 