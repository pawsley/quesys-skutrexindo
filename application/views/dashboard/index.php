    <div class="container pt-4">
        <div class="d-flex flex-column flex-md-row px-4 py-3 mb-4 bg-white rounded-2 shadow-sm sticky-top">
            <nav class="navbar navbar-expand-lg navbar-light bg-white w-100">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#"><i class="bi bi-house text-success me-3 fs-3"></i>Dashboard Antrian</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#modaque" data-id="queatr">Antrian</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Mekanik
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#modaddmkn" data-id="amkn">Add Mekanik</a></li>
                                    <li><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#modaddmkn" data-id="lmkn">List Mekanik</a></li>
                                </ul>
                            </li>                            
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Servis
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#modaddsrv" data-id="asrv">Add Servis</a></li>
                                    <li><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#modaddsrv" data-id="lsrv">List Servis</a></li>
                                </ul>
                            </li>
                        </ul>
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <strong><?= $this->session->userdata('username') ?></strong>
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><a class="nav-link" href="<?=base_url()?>logout" id="logoutButton">Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>

        <div class="row">
            <!-- menampilkan informasi jumlah antrian -->
            <div class="col-md-6 mb-4">
                <div class="card border-0 shadow-sm">
                    <div class="card-body p-4">
                        <div class="d-flex justify-content-start">
                            <div class="feature-icon-3 me-4">
                                <i class="bi-people text-warning"></i>
                            </div>
                            <div>
                                <p id="jumlah-antrian" class="fs-3 text-warning mb-1"></p>
                                <p class="mb-0">Jumlah Antrian</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- menampilkan informasi jumlah antrian yang belum dipanggil -->
            <div class="col-md-6 mb-4">
                <div class="card border-0 shadow-sm">
                    <div class="card-body p-4">
                        <div class="d-flex justify-content-start">
                            <div class="feature-icon-3 me-4">
                                <i class="bi-person text-danger"></i>
                            </div>
                            <div>
                                <p id="sisa-antrian" class="fs-3 text-danger mb-1"></p>
                                <p class="mb-0">Sisa Antrian</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" id="card-container">
                <?php foreach ($cardmkn as $data) { ?>
                <div class="col-md-4 mb-4 fade-in" id="card-que">
                    <div class="card border border-success shadow-sm">
                        <div class="card-body p-2">
                            <div class=" mb-1">
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
                            <!-- <div class="feature-icon-3 me-4">
                                <i class="bi-person-check text-danger"></i>
                            </div> -->
                            <!-- <div class="row g-3">
                                <div class="col-md-12 border border-success rounded-2 py-2 mb-1">
                                    <label>MEKANIK</label>
                                    <hr>
                                    <p class="fs-5 text-success mb-1"><?=$data['nama_mkn']?></p>
                                </div>
                                <p class="fs-5 text-success mb-1">Booking : <?=$data['book_time']?></p>
                                <p class="fs-5 text-success mb-1">Servis : <?=$data['nama_servis']?></p>
                                <p class="fs-5 text-success mb-1">Customer : <?=$data['nama_cst']?></p>
                            </div> -->
                        </div>
                    </div>
                </div>
                <?php } ?>
            </div>
        </div>

        <div class="card border-0 shadow-sm">
            <div class="card-header bg-white p-3">
                <h5>List Antrian</h5>
            </div>
            <div class="card-body p-4">
                <div class="table-responsive">
                    <table id="tabel-antrian" class="table table-bordered table-striped table-hover" width="100%">
                        <thead>
                            <tr>
                            <th>Nomor Antrian</th>
                            <th>Book Time</th>
                            <th>Customer</th>
                            <th>Servis</th>
                            <th>Mekanik</th>
                            <th>Panggil</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modaddsrv" tabindex="-1" aria-labelledby="modaddsrvLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modaddsrvLabel"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="row g-3" id="form-srv">
                            <div class="col-md-12">
                                <label for="namasrv" class="form-label">Nama Servis</label>
                                <input type="text" class="form-control" id="namasrv" name="namasrv" placeholder="Masukkan nama jenis servis">
                            </div>
                            <div class="col-12">
                                <button type="submit" id="subsrv" class="btn btn-success btn-block w-100">
                                    <span id="spinner-srv" class="spinner-border spinner-border-sm text-light d-none" role="status" aria-hidden="true"></span>
                                    <span id="txsubsrv">Submit</span>
                                </button>
                            </div>
                        </form>
                        <div id="list-srv">
                            
                        </div>
                    </div>
                    <div class="modal-footer">
                        <form id="formu-srv">
                            <button type="submit" id="updsrv" class="btn btn-success btn-block w-100">
                                <span id="spinner-upd" class="spinner-border spinner-border-sm text-light d-none" role="status" aria-hidden="true"></span>
                                <span id="txupdsrv">Update</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modaddmkn" tabindex="-1" aria-labelledby="modaddmknLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modaddmknLabel"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="row g-3" id="form-mkn">
                            <div class="col-md-12">
                                <label for="namamkn" class="form-label">Nama Mekanik</label>
                                <input type="text" class="form-control" id="namamkn" name="namamkn" placeholder="Masukkan nama mekanik">
                            </div>
                            <div class="col-12">
                                <button type="submit" id="submkn" class="btn btn-success btn-block w-100">
                                    <span id="spinner-mkn" class="spinner-border spinner-border-sm text-light d-none" role="status" aria-hidden="true"></span>
                                    <span id="txsubmkn">Submit</span>
                                </button>
                            </div>
                        </form>                    
                        <div id="list-mkn">
                            
                        </div>
                    </div>
                    <div class="modal-footer">
                        <form id="formu-mkn">
                            <button type="submit" id="updmkn" class="btn btn-success btn-block w-100">
                                <span id="spinner-umkn" class="spinner-border spinner-border-sm text-light d-none" role="status" aria-hidden="true"></span>
                                <span id="txupdmkn">Update</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>        
        <div class="modal fade" id="modaque" tabindex="-1" aria-labelledby="modaqueLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modaqueLabel">Form Antrian</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="row g-3" id="form-que">
                            <div class="card border-0 shadow-sm">
                                <div class="card-body d-grid p-0">
                                    <div class="border border-success rounded-2 py-2 mb-1">
                                        <h3 class="pt-4 text-center">ANTRIAN</h3>
                                        <!-- menampilkan informasi jumlah antrian -->
                                        <h1 id="antrian" class="display-1 fw-bold text-success text-center lh-1 pb-2"></h1>
                                        <input type="hidden" class="form-control" id="noque" name="noque">
                                    </div>
                                    <div class="row g-3">
                                        <div class="col-md-12 mb-1">
                                            <label for="namacst" class="form-label">Nama Customer</label>
                                            <input type="text" class="form-control" id="namacst" name="namacst" required placeholder="Masukkan nama customer">
                                        </div>
                                        <div class="col-md-6 mb-1">
                                            <label for="selmkn" class="form-label">Nama Mekanik</label>
                                            <select class="form-select required" id="selmkn" style="width: 100%" name="selmkn" required>
                                                <!-- <option selected="" disabled="" value="0">Pilih Mekanik</option> -->
                                            </select>
                                        </div> 
                                        <div class="col-md-6 mb-1">
                                            <label for="selsrv" class="form-label">Jenis Servis</label>
                                            <select class="form-select" id="selsrv" style="width: 100%"  name="selsrv" required>
                                                <!-- <option selected="" disabled="" value="0">Pilih Jenis Servis</option> -->
                                            </select>
                                        </div> 
                                        <div class="col-md-12 mb-2">
                                            <label for="selbook" class="form-label">Jam Booking</label>
                                            <select class="form-select" id="selbook" style="width: 100%"  name="selbook" required>
                                                <!-- <option selected="" disabled="" value="0">Pilih Jam Booking</option> -->
                                            </select>
                                        </div> 
                                    </div>
                                    <button type="submit" id="addque" class="btn btn-success btn-block w-100">
                                        <span id="spinner-que" class="spinner-border spinner-border-sm text-light d-none" role="status" aria-hidden="true"></span>
                                        <span id="txque">Ambil Nomor</span>
                                    </button>
                                </div>
                            </div>                            
                            <!-- <div class="col-md-12">
                                <label for="namamkn" class="form-label">Nama Mekanik</label>
                                <input type="text" class="form-control" id="namamkn" name="namamkn">
                            </div>
                            <div class="col-12">
                                <button type="submit" id="submkn" class="btn btn-success btn-block w-100">
                                    <span id="spinner-mkn" class="spinner-border spinner-border-sm text-light d-none" role="status" aria-hidden="true"></span>
                                    <span id="txsubmkn">Submit</span>
                                </button>
                            </div> -->
                        </form>                    
                        <div id="list-que">
                            
                        </div>
                    </div>
                    <div class="modal-footer">
                        <!-- <form id="formu-mkn">
                            <button type="submit" id="updmkn" class="btn btn-success btn-block w-100">
                                <span id="spinner-umkn" class="spinner-border spinner-border-sm text-light d-none" role="status" aria-hidden="true"></span>
                                <span id="txupdmkn">Update</span>
                            </button>
                        </form> -->
                    </div>
                </div>
            </div>
        </div>        
    </div>