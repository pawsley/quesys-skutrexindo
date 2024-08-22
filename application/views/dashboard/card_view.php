<?php foreach ($cardmkn as $data) { ?>
    <!-- <div class="col-md-4 mb-4 fade-in" id="card-que"> -->
        <div class="card border border-2 border-success shadow bg-orange">
            <div class="card-body p-0">
                <div class="mb-1">
                    <div class="bg-orange text-white rounded-top-left-1 rounded-top-right-1">
                        <h1 class="pt-2 text-center text-blue">ANTRIAN</h1>
                    </div>
                    
                    <h1 id="antrian-sekarang" class="display-1 fw-bold text-blue text-center lh-1"><?=$data['no_antrian']?></h1>
                    
                    <li class="list-group-item d-flex justify-content-between align-items-center bg-orange">
                        <span class="text-blue">Customer</span>
                        <strong class="text-blue"><?=$data['nama_cst']?></strong>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center bg-orange">
                        <span class="text-blue">Reservasi</span>
                        <strong class="text-blue"><?=$data['book_time']?></strong>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center bg-orange">
                        <strong class="text-blue" id="dhnm"><?= nl2br($data['nama_servis']) ?></strong>
                    </li>                                
                    <div class="d-flex justify-content-between mt-2 mb-2">
                        <div class="col-md-6 text-center">
                            <div class="feature-icon-1">
                                <?php if ($data['foto_fr']!==null) { ?>
                                    <img src="<?=base_url('assets/foto-frontliner/'.$data['foto_fr'])?>" class="rounded-circle border border-blue shadow" style="width: 80px; height:80px;"alt="Avatar" />
                                <?php } else { ?>
                                    <i class="bi bi-person-circle text-danger" style="font-size: 80px;"></i>
                                <?php } ?>
                            </div>
                            <h6 class="mb-1 text-blue"><strong><?=$data['nama_fr']?></strong></h6>
                            <span class="badge bg-danger">FRONTLINER</span>
                        </div>
                        <div class="col-md-6 text-center">
                            <div class="feature-icon-1 mb-1">
                                <?php if ($data['foto_mkn']!==null) { ?>
                                    <img src="<?=base_url('assets/foto-mekanik/'.$data['foto_mkn'])?>" class="rounded-circle border border-blue shadow" style="width: 80px; height:80px;"alt="Avatar" />
                                <?php } else { ?>
                                    <i class="bi bi-person-circle text-blue" style="font-size: 80px;"></i>
                                <?php } ?>
                            </div>
                            <h6 class="mb-1 text-blue"><strong><?=$data['nama_mkn']?></strong></h6>
                            <span class="badge bg-primary">MEKANIK</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <!-- </div> -->
<?php } ?>
