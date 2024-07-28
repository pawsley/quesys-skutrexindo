<!doctype html>
<html lang="en" class="h-100">

    <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Aplikasi Antrian Berbasis Web">

    <!-- Title -->
    <title>Antrian skutrexindo</title>

    <!-- Favicon icon -->
    <link rel="shortcut icon" href="<?=base_url()?>assets/img/favicon.png" type="image/x-icon">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">

    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <!-- Font -->
    <!-- <link href="https://fonts.googleapis.com/css?family=Raleway:700,800,900&amp;display=swap" rel="stylesheet"> -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@700;900&display=swap">

    <!-- Custom Style -->
    <link rel="stylesheet" href="<?=base_url()?>assets/css/style.css">
    <?=$css?>
    </head>

    <body class="d-flex flex-column h-100">
        <main class="flex-shrink-0">
            <?=$content?>
        </main>

        <!-- Footer -->
        <footer class="footer mt-auto py-4">
            <div class="container">
            <!-- copyright -->
                <div class="copyright text-center mb-2 mb-md-0">
                    &copy; 2024 <a href="https://www.instagram.com/skutrexindo/" target="_blank" class="text-danger text-decoration-none">@skutrexindo</a>. All rights reserved.
                </div>
            </div>
        </footer>
        <audio id="tingtung" src="assets/audio/tingtung.mp3"></audio>

        <!-- jQuery Core -->
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        <?=$js?>
        <!-- Popper and Bootstrap JS -->
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT" crossorigin="anonymous"></script>

    </body>

</html>