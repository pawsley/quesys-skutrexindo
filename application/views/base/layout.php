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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <!-- Font -->
    <!-- <link href="https://fonts.googleapis.com/css?family=Raleway:700,800,900&amp;display=swap" rel="stylesheet"> -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@700;900&display=swap">

    <!-- Custom Style -->
    <link rel="stylesheet" href="<?=base_url()?>assets/css/style.css?v=1.2">
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

        <!-- jQuery Core -->
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        <?=$js?>
        <!-- Popper and Bootstrap JS -->
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>

    </body>

</html>