<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard_model extends CI_Model {
    protected $tanggal;

    public function __construct() {
        parent::__construct();
        $this->tanggal = gmdate("Y-m-d", time() + 60 * 60 * 7);
    }
    public function count_antrian() {
        $this->db->select('COUNT(id) as jumlah');
        $this->db->from('tbl_antrian');
        $this->db->where('tanggal', $this->tanggal);
        $query = $this->db->get();

        $result = $query->row_array();
        return $result['jumlah'];
    }
    public function count_sisa_antrian() {
        $this->db->select('COUNT(id) as jumlah');
        $this->db->from('tbl_antrian');
        $this->db->where('tanggal', $this->tanggal);
        $this->db->where('status', '0');
        $query = $this->db->get();

        $result = $query->row_array();
        return $result['jumlah'];
    }
    public function add_servis($nsrv) {
        $existdata = $this->db->where('nama_servis', $nsrv)
                            ->get('tbl_servis')
                            ->row();
        if (!$existdata) {
            $data = array(
                'nama_servis' => $nsrv
            );
            $this->db->insert('tbl_servis', $data);
            return true; 
        } else {
            return false; 
        }
    }
    public function getListServis() {
        $this->db->select(['id_servis', 'nama_servis']);
        $this->db->from('tbl_servis');
        $this->db->order_by('nama_servis', 'asc');
        $query = $this->db->get();
        return $query->result_array();
    }
    public function update_servis($id,$data){
        $this->db->where('id_servis', $id);
        $this->db->update('tbl_servis', $data);
    }
    public function delete_servis($id){
        $success = $this->db->delete('tbl_servis', array("id_servis" => $id));
        $message = $success ? 'Data berhasil dihapus' : 'Gagal dihapus';
        return array('success' => $success, 'message' => $message);
    }
    public function add_mekanik($nmk) {
        $existdata = $this->db->where('nama_mkn', $nmk)
                            ->get('tbl_mekanik')
                            ->row();
        if (!$existdata) {
            $data = array(
                'nama_mkn' => $nmk,
                'status' => '1'
            );
            $this->db->insert('tbl_mekanik', $data);
            return true; 
        } else {
            return false; 
        }
    }
    public function getListMekanik() {
        $this->db->select(['id_mkn', 'nama_mkn']);
        $this->db->from('tbl_mekanik');
        $this->db->order_by('nama_mkn', 'asc');
        $query = $this->db->get();
        return $query->result_array();
    }
    public function update_mekanik($id,$data){
        $this->db->where('id_mkn', $id);
        $this->db->update('tbl_mekanik', $data);
    }
    public function delete_mekanik($id){
        $success = $this->db->delete('tbl_mekanik', array("id_mkn" => $id));
        $message = $success ? 'Data berhasil dihapus' : 'Gagal dihapus';
        return array('success' => $success, 'message' => $message);
    }
}

/* End of file Dashboard_model.php */
/* Location: ./application/models/Dashboard_model.php */