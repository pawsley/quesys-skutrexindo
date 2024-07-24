<?php
defined('BASEPATH') or exit('No direct script access allowed');
include_once(APPPATH . 'controllers/Auth.php');
class Dashboard extends Auth
{
    
  public function __construct(){
    parent::__construct();
    $this->load->model('Dashboard_model');
    $this->tanggal = gmdate("Y-m-d", time() + 60 * 60 * 7);
  }

  public function index(){
    $data['css'] = '
      <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11.12.3/dist/sweetalert2.min.css" rel="stylesheet">
      <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs5/dt-1.10.25/datatables.min.css" />
      <style>
        .select2-container--classic .select2-results__option--highlighted.select2-results__option--selectable{
          background-color: #00aa9d; /* Background color on hover */
          color: white; /* Text color on hover */
        }
        .select2-selection.required {
          background-color: yellow !important;
        }
      </style>
    ';
    $data['cardmkn'] = $this->Dashboard_model->getmekanik();
    $data['content'] = $this->load->view('dashboard/index', $data, true);
    $data['js'] = '
      <script>var base_url = "' . base_url() . '";</script>
      <script src="' . base_url('assets/js/dashboard.js?v=1.0') . '"></script>
      <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.12.3/dist/sweetalert2.all.min.js"></script>
      <script type="text/javascript" src="https://cdn.datatables.net/v/bs5/dt-1.10.25/datatables.min.js"></script>
      <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.1/js/dataTables.buttons.min.js"></script>
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
      <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.1/js/buttons.html5.min.js"></script>
      <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.1/js/buttons.print.min.js"></script>
    ';
    $this->load->view('base/layout', $data);
  }
  public function getCardData() {
    $cardmkn = $this->Dashboard_model->getmekanik();
    $this->load->view('dashboard/card_view', ['cardmkn' => $cardmkn]);
  }

  public function loadantrian() {
    $this->load->library('datatables');
    $this->datatables->select('id,tanggal,no_antrian,book_time,nama_mkn,nama_servis,nama_cst,updated_date,status');
    $this->datatables->from('vantrian');
    return print_r($this->datatables->generate());
  }
  public function listsrv(){
    $searchTerm = $this->input->get('q');
    $results = $this->Dashboard_model->getListServis($searchTerm);
    header('Content-Type: application/json');
    echo json_encode($results);
  }
  public function listmkn(){
    $searchTerm = $this->input->get('q');
    $results = $this->Dashboard_model->getListMekanik($searchTerm);
    header('Content-Type: application/json');
    echo json_encode($results);
  }
  public function countantrian() {
    if ($this->input->is_ajax_request()) {
      $cekval = $this->Dashboard_model->count_antrian();
      echo number_format($cekval, 0, '', '.');
    } else {
        show_404();
    }
  }
  public function cekavail() {
    if ($this->input->is_ajax_request()) {
      $idmkn = $this->input->post('id_mkn');
      $cek = $this->Dashboard_model->cekavail($idmkn);
      header('Content-Type: application/json');
      echo json_encode($cek);
    } else {
      show_404();
    }
  }
  function addque(){
    if ($this->input->is_ajax_request()) {
      $noque = $this->input->post('noque');
      $namacst = $this->input->post('namacst');
      $selmkn = $this->input->post('selmkn');
      $selsrv = $this->input->post('selsrv');
      $selbook = $this->input->post('selbook');
      $data = array(
        'tanggal' => $this->tanggal,
        'no_antrian' => $noque,
        'nama_cst' => $namacst,
        'id_mkn' => $selmkn,
        'id_servis' => $selsrv,
        'book_time' => $selbook,
        'status' => '0'
      );

      $inserted = $this->Dashboard_model->add_que($data);

      if ($inserted) {
        echo json_encode(['status' => 'success']);
      } else {
        echo json_encode(['status' => 'exists']);
      }
    } else {
      show_404();
    }
  }
  public function nowantrian() {
    if ($this->input->is_ajax_request()) {
      $jumlah_antrian = $this->Dashboard_model->now_antrian();
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
  public function callingque() {
    if ($this->input->is_ajax_request()) {
      $idque = $this->input->post('idque');

      $update = $this->Dashboard_model->calling($idque);

      if ($update) {
        echo json_encode(['status' => 'success']);
      } else {
          echo json_encode(['status' => 'error']);
      }
    } else {
      show_404();
    }
  }

}


/* End of file Dashboard.php */
/* Location: ./application/controllers/Dashboard.php */