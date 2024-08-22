    <div class="pt-2" style="margin-left:24px !important; margin-right:24px !important">
        <div class="d-flex flex-column flex-md-row align-items-center justify-content-between px-4 py-3 mb-3 bg-blue rounded-2 shadow-lg sticky-top">
            <div class="row align-items-start">
                <div class="col-md-3">
                    <img src="<?=base_url()?>assets/img/favicon.png" alt="logo-skutrexindo" width="80" class="me-md-3 mb-3 mb-md-0 rounded-circle border border-blue shadow">
                </div>
                <div class="col-md-9">
                    <h4 class="mb-0 text-white">skutrexindo</h4>
                    <p class="mb-0 text-white">Senin - Sabtu: 10.00 - 17.00 WIB</p>
                    <p class="mb-0 text-white"><i class="bi bi-whatsapp"></i> 081252333365 &nbsp<i class="bi bi-whatsapp"></i> 081234652263</p>
                </div>  
            </div>
            <div id="dateTime" class="text-white fs-6"></div>
        </div>
        <div class="row px-2 py-2 bg-blue rounded-2 shadow-lg" style="margin-left:0px !important; margin-right:0px !important">
            <!-- <div class="row px-4 py-3 mb-3 bg-blue rounded-2 shadow-lg sticky-top"> -->
                <div class="col-md-12">
                    <h4> WAITING LIST </h4>
                </div>
                <div class="col-md-12">
                    <table class="table table-bordered" style="background-color: rgba(255, 255, 255, 0);">
                        <thead class="table-blue">
                            <tr>
                            <th class="text-white" width="10"><strong>Nomor</strong></th>
                            <th class="text-white"><strong>Reservasi</strong></th>
                            <th class="text-white"><strong>Customer</strong></th>
                            <th class="text-white"><strong>Servis Order</strong></th>
                            <th class="text-white text-center"><strong>Mekanik</strong></th>
                            <th class="text-white text-center"><strong>Frontliner</strong></th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($cardwaiting as $data) { ?>                    
                                <tr>
                                    <td class="text-white text-center"><?=$data['no_antrian']?></td>
                                    <td class="text-white"><?=$data['book_time']?></td>
                                    <td class="text-white"><?=$data['nama_cst']?></td>
                                    <td class="text-white"><?= nl2br($data['nama_servis']) ?></td>
                                    <td class="text-white text-center">
                                        <div class="feature-icon-1 centered-content">
                                            <?php if ($data['foto_mkn'] !== null) { ?>
                                                <img src="<?= base_url('assets/foto-mekanik/' . $data['foto_mkn']) ?>" 
                                                    class="rounded-circle border border-blue shadow" 
                                                    style="width: 60px; height:60px;" 
                                                    alt="Avatar" />
                                            <?php } else { ?>
                                                <i class="bi bi-person-circle text-danger" style="font-size: 60px;"></i>
                                            <?php } ?>
                                            <h6 class="mb-1 text-white text-center"><strong><?=$data['nama_mkn']?></strong></h6>
                                        </div>
                                    </td>
                                    <td class="text-white text-center">
                                        <div class="feature-icon-1 centered-content">
                                            <?php if ($data['foto_fr'] !== null) { ?>
                                                <img src="<?= base_url('assets/foto-frontliner/' . $data['foto_fr']) ?>" 
                                                    class="rounded-circle border border-blue shadow" 
                                                    style="width: 60px; height:60px;" 
                                                    alt="Avatar" />
                                            <?php } else { ?>
                                                <i class="bi bi-person-circle text-danger" style="font-size: 60px;"></i>
                                            <?php } ?>
                                            <h6 class="mb-1 text-white text-center"><strong><?=$data['nama_fr']?></strong></h6>
                                        </div>
                                    </td>
                                </tr>
                            <?php } ?>
                        </tbody>
                    </table>
                </div>
            <!-- </div> -->
        </div>
    </div>