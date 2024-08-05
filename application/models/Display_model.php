<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Display_model extends CI_Model {

  protected $tanggal;

  public function __construct() {
      parent::__construct();
      $this->tanggal = gmdate("Y-m-d", time() + 60 * 60 * 7);
  }

  public function getmekanik() {
    $this->db->select('
        id_mkn, no_antrian, 
        id, 
        tanggal, 
        book_time,
        nama_mkn,
        foto_mkn,
        nama_fr,
        foto_fr,
        nama_servis,
        nama_cst
    ');
    $this->db->from('vantrian');
    $this->db->where('tanggal', $this->tanggal);
    $this->db->where('status', '1');
    $this->db->order_by('no_antrian','desc');
    $this->db->limit(3);

    $query = $this->db->get();
    return $query->result_array();
}

}

/* End of file Display_model.php */
/* Location: ./application/models/Display_model.php */