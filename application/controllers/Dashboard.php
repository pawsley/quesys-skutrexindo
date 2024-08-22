<?php
defined('BASEPATH') or exit('No direct script access allowed');
include_once(APPPATH . 'controllers/Auth.php');
class Dashboard extends Auth
{
    
  public function __construct(){
    parent::__construct();
    $this->load->model('Dashboard_model');
    $this->load->model('Display_model');
    $this->tanggal = gmdate("Y-m-d", time() + 60 * 60 * 7);
    $this->load->library('pusher_lib');
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
        .upload-btn {
            width: 200px;  /* Set the width as needed */
            height: 200px; /* Set the height as needed */
            border: 3px dotted #00aa9d; /* Dotted border with a blue color */
            background-size: 100% 100%;
            // background-repeat: no-repeat;
            background-position: center;
            border-radius: 5px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            background-color: #f9f9f9; /* Optional: background color */
        }
        .upload-btn:hover {
            opacity: 0.8;
        }
        .upload-btn::after {
            content: "Upload Foto";
            position: absolute;
            bottom: 10px;
            color: #007bff;
            font-size: 16px;
            text-align: center;
            background: rgba(255, 255, 255, 0.8);
            padding: 10px;
            border-radius: 5px;
        }          
      </style>
    ';
    $data['cardmkn'] = $this->Dashboard_model->getmekanik();
    $data['content'] = $this->load->view('dashboard/index', $data, true);
    $data['js'] = '
      <script>var base_url = "' . base_url() . '";</script>
      <script src="' . base_url('assets/js/dashboard.js?v=1.3') . '"></script>
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

  public function loadCardWait() {
    $cardwait = $this->Display_model->waitinglist();
    $this->load->view('dashboard/card_wait', ['cardwait' => $cardwait]);
  }

  public function loadantrian() {
    $this->load->library('datatables');
    $this->datatables->select('id,tanggal,no_antrian,book_time,id_mkn,nama_mkn,id_fr,nama_fr,id_adtl, id_servis,nama_servis,nama_cst,updated_date,status');
    $this->datatables->from('vantrian');
    $this->datatables->where('tanggal',$this->tanggal);
    return print_r($this->datatables->generate());
  }
  public function loadreport() {
    $this->load->library('datatables');
    $this->datatables->select('id,tanggal,no_antrian,book_time,id_mkn,nama_mkn,id_fr,nama_fr,id_adtl, id_servis,nama_servis,nama_cst,updated_date, CONCAT(tanggal, " (", book_time, ")") as reserv,status');
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
  public function listfr(){
    $searchTerm = $this->input->get('q');
    $results = $this->Dashboard_model->getListFront($searchTerm);
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
      $selfr = $this->input->post('selfr');
      $selsrv = $this->input->post('selsrv');
      $selbook = $this->input->post('selbook');
      $selend = $this->input->post('selend');
      $data = array(
        'tanggal' => $this->tanggal,
        'no_antrian' => $noque,
        'nama_cst' => $namacst,
        'id_mkn' => $selmkn,
        'id_fr' => $selfr,
        'book_time' => $selbook.'-'.$selend,
        'status' => '0'
      );

      $inserted = $this->Dashboard_model->add_que($data);
      $id_antrian = $this->db->insert_id();

      if ($inserted && !empty($selsrv)) {
        foreach ($selsrv as $id_servis) {
          $data_dtl = array(
            'id'=>$id_antrian,
            'id_servis'=>$id_servis
          );
          $this->Dashboard_model->detail_que($data_dtl);
        }
        $data = array('load' => 'newdata');
        $this->pusher_lib->trigger('waiting-channel', 'waiting-event', $data);
      }

      if ($inserted) {
        echo json_encode(['status' => 'success']);
      } else {
        echo json_encode(['status' => 'error']);
      }
    } else {
      show_404();
    }
  }
  public function updateque() {
    if ($this->input->is_ajax_request()) {
        // Step 1: Validate and retrieve input data
        $id = $this->input->post('eid');
        $new_srv_ids = $this->input->post('edselsrv');

        // Ensure $new_srv_ids is always an array
        if (!is_array($new_srv_ids)) {
            $new_srv_ids = [];
        }

        // Step 2: Fetch existing srv_id values from the database
        $existing_srv_ids = $this->Dashboard_model->get_srv_ids_by_id($id);

        // Ensure $existing_srv_ids is always an array
        if (!is_array($existing_srv_ids)) {
            $existing_srv_ids = [];
        }

        // Step 3: Determine the changes needed
        $srv_ids_to_add = array_diff($new_srv_ids, $existing_srv_ids);
        $srv_ids_to_remove = array_diff($existing_srv_ids, $new_srv_ids);

        // 4b. Remove srv_id values that are no longer present
        if (!empty($srv_ids_to_remove)) {
          foreach ($srv_ids_to_remove as $srv_id) {
              $this->Dashboard_model->remove_srv_id($id, $srv_id);
          }
        }

        // Step 4: Perform Database Operations
        // 4a. Add new srv_id values
        if (!empty($srv_ids_to_add)) {
            foreach ($srv_ids_to_add as $srv_id) {
                $data = [
                    'id' => $id,
                    'id_servis' => $srv_id,
                ];
                $this->Dashboard_model->add_srv_id($data);
            }
        }

        // 4c. Update other details if necessary
        $update_data = [
            'nama_cst' => $this->input->post('ednamacst'),
            'id_mkn' => $this->input->post('edselmkn'),
            'id_fr' => $this->input->post('edselfr'),
            'book_time' => $this->input->post('edselbook').'-'.$this->input->post('eselend'),
        ];
        $this->Dashboard_model->update_que($id, $update_data);
        $data = array('load' => 'newdata');
        $this->pusher_lib->trigger('waiting-channel', 'waiting-event', $data);

        // Step 5: Respond to the request with success status
        echo json_encode(['status' => 'success', 'message' => 'Data updated successfully', 'id' => $id]);
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
      $this->load->library('upload');
      $nmk = $this->input->post('namamkn');

      $existdata = $this->db->where('nama_mkn', $nmk)->get('tbl_mekanik')->row();
      if (!$existdata) {
          $data = array(
              'nama_mkn' => $nmk,
              'status' => '1'
          );

          if (!empty($_FILES['imgmkn']['name'])) {
              $file_path = realpath(APPPATH . '../assets/foto-mekanik');
              $config['upload_path'] = $file_path;
              $config['allowed_types'] = 'jpg|jpeg|png';
              $config['overwrite'] = true;
              $config['file_name'] = $nmk . '_' . time();
              $config['max_size'] = 10048;

              $this->upload->initialize($config);

              if ($this->upload->do_upload('imgmkn')) {
                  $upload_data = $this->upload->data();
                  $data['foto_mkn'] = $upload_data['file_name'];
              } else {
                  echo json_encode(['status' => 'error', 'message' => $this->upload->display_errors()]);
                  return;
              }
          }

          // Save data to the database
          $inserted = $this->Dashboard_model->add_mekanik($data);

          if ($inserted) {
              echo json_encode(['status' => 'success']);
          } else {
              echo json_encode(['status' => 'error', 'message' => 'Database insertion failed.']);
          }
      } else {
          echo json_encode(['status' => 'exists']);
      }
    } else {
      show_404();
    }
  }
  public function updatemekanik(){
    if ($this->input->is_ajax_request()) {
      $this->load->library('upload');
      
      $ids = $this->input->post('ids[]');
      $names = $this->input->post('names[]');
      $imgs = isset($_FILES['imgs']) ? $_FILES['imgs'] : [];
      $file_indices = $this->input->post('file_indices[]');

      if (!is_array($file_indices)) {
          $file_indices = [];
      }

      header('Content-Type: application/json');
      if (!empty($ids) && !empty($names)) {
        foreach ($ids as $index => $id) {
          $name = $names[$index];
          $data = ['nama_mkn' => $name];
          
          if (in_array($index, $file_indices)) {
            $file_index = array_search($index, $file_indices);
            if ($file_index !== false && isset($imgs['name'][$file_index]) && !empty($imgs['name'][$file_index])) {
              $file_path = realpath(APPPATH . '../assets/foto-mekanik');
              $config['upload_path'] = $file_path;
              $config['allowed_types'] = 'jpg|jpeg|png';
              $config['overwrite'] = true;
              $config['file_name'] = $name . '_' . time();
              $config['max_size'] = 10048;

              // Assign the file to the 'userfile' key for upload
              $_FILES['userfile']['name'] = $imgs['name'][$file_index];
              $_FILES['userfile']['type'] = $imgs['type'][$file_index];
              $_FILES['userfile']['tmp_name'] = $imgs['tmp_name'][$file_index];
              $_FILES['userfile']['error'] = $imgs['error'][$file_index];
              $_FILES['userfile']['size'] = $imgs['size'][$file_index];

              $this->upload->initialize($config);

              if ($this->upload->do_upload('userfile')) {
                $upload_data = $this->upload->data();
                $data['foto_mkn'] = $upload_data['file_name'];

                // Remove old file if exists
                // $old_file = $this->db->where('id_mkn', $id)->get('tbl_mekanik')->row()->foto_mkn;
                // if ($old_file && file_exists($file_path . '/' . $old_file)) {
                //   unlink($file_path . '/' . $old_file);
                // }
              } else {
                echo json_encode(['status' => 'error', 'message' => $this->upload->display_errors()]);
                return;
              }
            }
          }
          $this->Dashboard_model->update_mekanik($id, $data);
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
  function addfront() {
    if ($this->input->is_ajax_request()) {
        $this->load->library('upload');
        $nmf = $this->input->post('namafr');
        
        // Check if the name already exists
        $existdata = $this->db->where('nama_fr', $nmf)->get('tbl_frontliner')->row();
        if (!$existdata) {
            $data = array(
                'nama_fr' => $nmf,
                'status' => '1'
            );

            if (!empty($_FILES['imgm']['name'])) {
                $file_path = realpath(APPPATH . '../assets/foto-frontliner');
                $config['upload_path'] = $file_path;
                $config['allowed_types'] = 'jpg|jpeg|png';
                $config['overwrite'] = true;
                $config['file_name'] = $nmf . '_' . time();
                $config['max_size'] = 10048;

                $this->upload->initialize($config);

                if ($this->upload->do_upload('imgm')) {
                    $upload_data = $this->upload->data();
                    $data['foto_fr'] = $upload_data['file_name'];
                } else {
                    echo json_encode(['status' => 'error', 'message' => $this->upload->display_errors()]);
                    return;
                }
            }

            // Save data to the database
            $inserted = $this->Dashboard_model->add_front($data);

            if ($inserted) {
                echo json_encode(['status' => 'success']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Database insertion failed.']);
            }
        } else {
            echo json_encode(['status' => 'exists']);
        }
    } else {
        show_404();
    }
  }
  public function updatefront() {
    if ($this->input->is_ajax_request()) {
        $this->load->library('upload');

        $ids = $this->input->post('ids[]');
        $names = $this->input->post('names[]');
        $imgs = isset($_FILES['imgs']) ? $_FILES['imgs'] : [];
        $file_indices = $this->input->post('file_indices[]');

        if (!is_array($file_indices)) {
          $file_indices = [];
        }

        header('Content-Type: application/json');
        if (!empty($ids) && !empty($names)) {
          foreach ($ids as $index => $id) {
            $name = $names[$index];
            $data = ['nama_fr' => $name];

            if (in_array($index, $file_indices)) {
              $file_index = array_search($index, $file_indices);
              if ($file_index !== false && isset($imgs['name'][$file_index]) && !empty($imgs['name'][$file_index])) {
                $file_path = realpath(APPPATH . '../assets/foto-frontliner');
                $config['upload_path'] = $file_path;
                $config['allowed_types'] = 'jpg|jpeg|png';
                $config['overwrite'] = true;
                $config['file_name'] = $name . '_' . time();
                $config['max_size'] = 10048;

                // Assign the file to the 'userfile' key for upload
                $_FILES['userfile']['name'] = $imgs['name'][$file_index];
                $_FILES['userfile']['type'] = $imgs['type'][$file_index];
                $_FILES['userfile']['tmp_name'] = $imgs['tmp_name'][$file_index];
                $_FILES['userfile']['error'] = $imgs['error'][$file_index];
                $_FILES['userfile']['size'] = $imgs['size'][$file_index];

                $this->upload->initialize($config);

                if ($this->upload->do_upload('userfile')) {
                  $upload_data = $this->upload->data();
                  $data['foto_fr'] = $upload_data['file_name'];

                  // Remove old file if exists
                  // $old_file = $this->db->where('id_fr', $id)->get('tbl_frontliner')->row()->foto_fr;
                  // if ($old_file) {
                  //     unlink($file_path . '/' . $old_file);
                  // }
                } else {
                  echo json_encode(['status' => 'error', 'message' => $this->upload->display_errors()]);
                  return;
                }
              }
            }
            $this->Dashboard_model->update_front($id, $data);
          }
          echo json_encode(['status' => 'success']);
        } else {
          echo json_encode(['status' => 'error', 'message' => 'IDs or names are empty.']);
        }
    } else {
      show_404();
    }
  }
  public function deletefront($id) {
    $result = $this->Dashboard_model->delete_front($id);
    echo json_encode($result);
  }
  public function callingque() {
    if ($this->input->is_ajax_request()) {
      $idque = $this->input->post('idque');
      $nomor = $this->input->post('nomor');
      $mekanik = $this->input->post('mekanik');

      $update = $this->Dashboard_model->calling($idque);

      if ($update) {
        $data = array('idque' => $idque,'nomor'=>$nomor,'mekanik'=>$mekanik);
        $this->pusher_lib->trigger('antrian-channel', 'antrian-event', $data);
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