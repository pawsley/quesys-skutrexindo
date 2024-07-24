<?php foreach ($cardmkn as $data) { ?>
<div class="col-md-4 mb-4 fade-in" id="card-que">
    <div class="card border border-success shadow-sm">
        <div class="card-body p-2">
            <div class="mb-1">
                <h3 class="pt-4 text-center">ANTRIAN</h3>
                <hr>
                <h1 id="antrian-sekarang" class="display-1 fw-bold text-success text-center lh-1 pb-2"><?=$data['no_antrian']?></h1>
                <hr>
                <p class="fs-5 text-dark text-center mb-1"><?=$data['book_time']?></p>
                <hr>
                <div class="d-flex justify-content-between">
                    <div class="col-md-4 text-center">
                        <div class="feature-icon-1">
                            <i class="bi-person-check text-danger"></i>
                        </div>
                        <p class="fs-6 text-dark"><?=$data['nama_cst']?></p>
                    </div>
                    <div class="col-md-4 text-center">
                        <div class="feature-icon-1">
                            <i class="bi-gear text-primary"></i>
                        </div>
                        <p class="fs-6 text-dark"><?=$data['nama_servis']?></p>
                    </div>
                    <div class="col-md-4 text-center">
                        <div class="feature-icon-1">
                            <i class="bi-person-gear text-info"></i>
                        </div>
                        <p class="fs-6 text-dark"><?=$data['nama_mkn']?></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php } ?>
