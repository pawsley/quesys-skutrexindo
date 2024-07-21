<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login_model extends CI_Model {
  private $_table = "tb_user";

  public function cek_login($where) {		
    $this->db->where($where);
    $this->db->where_in('status', [1]);
    return $this->db->get($this->_table);
  }
}

/* End of file Login_model.php */
/* Location: ./application/models/Login_model.php */