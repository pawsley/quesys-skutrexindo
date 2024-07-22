$(document).ready(function() {
    login();
});
function login() {
    $('.form-log').submit(function(e) {
        e.preventDefault(); // Prevent form submission
        $('#spinner').removeClass('d-none');
        $('#signin').addClass('d-none');
        $('#btnlogin').prop('disabled', true);

        var formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: base_url+'/cek-auth', 
            data: formData,
            dataType: 'json',
            success: function(response) {
                console.log(response);
                if (response.success) {
                    window.location.href = base_url;
                } else {
                    Swal.fire({
                        title: 'Warning',
                        text: response.message,
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        // Additional actions after the alert is closed, if needed
                    });
                }
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText); 
            },
            complete: function() {
                $('#spinner').addClass('d-none');
                $('#signin').removeClass('d-none');
                $('#btnlogin').prop('disabled', false);
            }
        });
    });
}