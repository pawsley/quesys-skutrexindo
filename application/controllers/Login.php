<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Login extends CI_Controller
{
    
  public function __construct(){
    parent::__construct();
    $this->load->model('Login_model');
  }

  public function index(){
    $data['css'] = '
      <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11.12.3/dist/sweetalert2.min.css" rel="stylesheet">
    ';
    $data['content'] = $this->load->view('auth/login', '', true);
    $data['js'] = '
      <script>var base_url = "' . base_url() . '";</script>
      <script src="' . base_url('assets/js/auth.js?v=1.0') . '"></script>
      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.12.3/dist/sweetalert2.all.min.js"></script>
    ';
    $this->load->view('base/layout', $data);
  }
  function aksi_login() {
    $username = $this->input->post('txusername');
    $password = $this->input->post('txpassword');
    $where = array(
        'username' => $username,
        'password' => $password,
    );

    // Call the model method once
    $result = $this->Login_model->cek_login($where);

    // Check if any rows are returned
    if ($result->num_rows() > 0) {
        $data = $result->row_array();
        if ($password == $data['password'] && $username == $data['username']) {
            $data_session = array(
                'username' => $data['username'],
                'id_user' => $data['id_user'],
                'logged' => TRUE
            );
            $this->session->set_userdata($data_session);
            $response = array('success' => true, 'message' => 'Login berhasil.');
            echo json_encode($response);
            return;
        } else {
            echo json_encode(array('success' => false, 'message' => 'Password atau Email yang anda masukkan salah, Silahkan Coba Lagi'));
            return;
        }
    } else {
        echo json_encode(array('success' => false, 'message' => 'Anda belum terdaftar!'));
        return;
    }
  }
	function logout(){
		$this->session->sess_destroy();
		redirect(base_url('login'));
	}

}


/* End of file Login.php */
/* Location: ./application/controllers/Login.php */