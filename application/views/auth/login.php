
    <div class="container pt-5">
        <div class="row justify-content-lg-center">
            <div class="col-lg-5 mb-4">
                <div class="px-4 py-3 mb-4 bg-white rounded-2 shadow-sm">
                    <!-- judul halaman -->
                    <div class="d-flex align-items-center me-md-auto">
                        <i class="bi-person-fill-lock text-success me-3 fs-3"></i>
                        <h1 class="h5 pt-2">Sistem Antrian Skutrexindo</h1>
                    </div>
                </div>

                <div class="card border-0 shadow-sm">
                    <div class="card-body text-center d-grid p-5">
                        <form class="form-log">
                            <div class="mb-3">
                                <label for="txusername" class="form-label">Username</label>
                                <input type="text" class="form-control" id="txusername" name="txusername" placeholder="Masukkan username">
                            </div>
                            <div class="mb-3">
                                <label for="txpassword" class="form-label">Password</label>
                                <input type="password" class="form-control" id="txpassword" name="txpassword" placeholder="Masukkan password">
                            </div>
                            <button type="submit" id="btnlogin" class="btn btn-success btn-block w-100">
                                <span id="spinner" class="spinner-border spinner-border-sm text-light d-none" role="status" aria-hidden="true"></span>
                                <span id="signin"><i class="bi bi-box-arrow-in-right"> Login</i></span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>