<?php foreach ($cardwait as $data) { ?> 
    <div class="col-md-2 fade-in" id="card-waiting">
        <div class="card border border-2 border-success shadow-sm bg-orange rounded-3">
            <div class="card-header text-center bg-transparent border-0">
                <h1 class="text-center text-blue mb-0"><?=$data['no_antrian']?></h1>
            </div>
            <div class="card-body p-2">
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <p class="text-blue mb-0" style="font-size:14px;"><?= $data['nama_cst'] ?></p>
                    <p class="text-blue mb-0" style="font-size:14px;">(<?= $data['book_time'] ?>)</p>
                </div>
                
                <div class="d-flex justify-content-between mt-2 mb-2">
                    <div class="col-md-6 text-center">
                        <h6 class="mb-1"><strong><?=$data['nama_fr']?></strong></h6>
                        <span class="badge bg-danger">FRONTLINER</span>
                    </div>
                    <div class="col-md-6 text-center">
                        <h6 class="mb-1"><strong><?=$data['nama_mkn']?></strong></h6>
                        <span class="badge bg-primary">MEKANIK</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php } ?>