<?php
defined('BASEPATH') or exit('No direct script access allowed');
include_once(APPPATH . 'controllers/Auth.php');
class Dashboard extends Auth
{
    
  public function __construct(){
    parent::__construct();
    $this->load->model('Dashboard_model');
  }

  public function index(){
    $data['css'] = '
      <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11.12.3/dist/sweetalert2.min.css" rel="stylesheet">
      <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs5/dt-1.10.25/datatables.min.css" />
    ';
    $data['content'] = $this->load->view('dashboard/index', '', true);
    $data['js'] = '
      <script>var base_url = "' . base_url() . '";</script>
      <script src="' . base_url('assets/js/dashboard.js?v=1.0') . '"></script>
      <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.12.3/dist/sweetalert2.all.min.js"></script>
      <script type="text/javascript" src="https://cdn.datatables.net/v/bs5/dt-1.10.25/datatables.min.js"></script>
    ';
    $this->load->view('base/layout', $data);
  }

  public function loadantrian() {
    $this->load->library('datatables');
    $this->datatables->select('id,tanggal,no_antrian,updated_date,status');
    $this->datatables->from('tbl_antrian');
    return print_r($this->datatables->generate());
  }
  public function listsrv(){
    $results = $this->Dashboard_model->getListServis();
    header('Content-Type: application/json');
    echo json_encode($results);
  }
  public function listmkn(){
    $results = $this->Dashboard_model->getListMekanik();
    header('Content-Type: application/json');
    echo json_encode($results);
  }
  public function countantrian() {
    if ($this->input->is_ajax_request()) {
      $jumlah_antrian = $this->Dashboard_model->count_antrian();
      echo number_format($jumlah_antrian, 0, '', '.');
    } else {
        show_404();
    }
  }
  public function countsisaantrian() {
    if ($this->input->is_ajax_request()) {
      $jumlah_sisa_antrian = $this->Dashboard_model->count_sisa_antrian();
      echo number_format($jumlah_sisa_antrian, 0, '', '.');
    } else {
        show_404();
    }
  }
  function addservis(){
    if ($this->input->is_ajax_request()) {
      $nsrv = $this->input->post('namasrv');

      $inserted = $this->Dashboard_model->add_servis($nsrv);

      if ($inserted) {
        echo json_encode(['status' => 'success']);
      } else {
        echo json_encode(['status' => 'exists']);
      }
    } else {
      show_404();
    }
  }
  public function updateservis(){
    if ($this->input->is_ajax_request()) {
      $json_data = $this->input->raw_input_stream;
      $dafData = json_decode($json_data, true);
      header('Content-Type: application/json');
      if (!empty($dafData)) {
          foreach ($dafData as $data) {
              $idr = $data['id'];
              $nmr = $data['name'];

              $this->Dashboard_model->update_servis($idr, [
                  'nama_servis' => $nmr
              ]);
          }
        echo json_encode(['status' => 'success']);
      } else {
        echo json_encode(['status' => 'error']);
      }
    } else {
      show_404();
    }
  }
  public function deleteservis($id) {
    $result = $this->Dashboard_model->delete_servis($id);
    echo json_encode($result);
  }
  function addmekanik(){
    if ($this->input->is_ajax_request()) {
      $nmk = $this->input->post('namamkn');

      $inserted = $this->Dashboard_model->add_mekanik($nmk);

      if ($inserted) {
        echo json_encode(['status' => 'success']);
      } else {
        echo json_encode(['status' => 'exists']);
      }
    } else {
      show_404();
    }
  }
  public function updatemekanik(){
    if ($this->input->is_ajax_request()) {
      $json_data = $this->input->raw_input_stream;
      $dafData = json_decode($json_data, true);
      header('Content-Type: application/json');
      if (!empty($dafData)) {
          foreach ($dafData as $data) {
              $idr = $data['id'];
              $nmr = $data['name'];

              $this->Dashboard_model->update_mekanik($idr, [
                  'nama_mkn' => $nmr
              ]);
          }
        echo json_encode(['status' => 'success']);
      } else {
        echo json_encode(['status' => 'error']);
      }
    } else {
      show_404();
    }
  }
  public function deletemekanik($id) {
    $result = $this->Dashboard_model->delete_mekanik($id);
    echo json_encode($result);
  }  

}


/* End of file Dashboard.php */
/* Location: ./application/controllers/Dashboard.php */