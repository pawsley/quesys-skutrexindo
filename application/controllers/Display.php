<?php
defined('BASEPATH') or exit('No direct script access allowed');
include_once(APPPATH . 'controllers/Auth.php');
class Display extends Auth
{
    
  public function __construct()
  {
    parent::__construct();
    $this->load->model('Dashboard_model');
    $this->tanggal = gmdate("Y-m-d", time() + 60 * 60 * 7);    
    // $this->load->library('pusher_lib');
  }

  public function index(){
    $data['css'] = '';
    $data['cardmkn'] = $this->Dashboard_model->getmekanik();
    $data['content'] = $this->load->view('dashboard/display', $data, true);
    $data['js'] = '
      <script>var base_url = "' . base_url() . '";</script>
      <script src="' . base_url('assets/js/display.js?v=1.0') . '"></script>
      <script src="https://js.pusher.com/8.0.1/pusher.min.js"></script>
      <script src="https://code.responsivevoice.org/responsivevoice.js?key=jQZ2zcdq"></script>
    ';
    $this->load->view('base/layout', $data);
  }

}


/* End of file Display.php */
/* Location: ./application/controllers/Display.php */