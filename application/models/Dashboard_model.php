<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard_model extends CI_Model {
    protected $tanggal;
    protected $tglwk;

    public function __construct() {
        parent::__construct();
        $this->tanggal = gmdate("Y-m-d", time() + 60 * 60 * 7);
        $this->tglwk = gmdate("Y-m-d H:i:s", time() + 60 * 60 * 7);
    }
    public function getmekanik() {
        $this->db->select('
            id_mkn, MAX(no_antrian) AS no_antrian, 
            MAX(id) AS id, 
            MAX(tanggal) AS tanggal, 
            MAX(book_time) AS book_time,
            MAX(nama_mkn) AS nama_mkn,
            MAX(nama_servis) AS nama_servis,
            MAX(nama_cst) AS nama_cst
        ');
        $this->db->from('vantrian');
        $this->db->where('tanggal', $this->tanggal);
        $this->db->where('status', '1');
        $this->db->group_by('id_mkn');
        $this->db->order_by('no_antrian','asc');

        $query = $this->db->get();
        return $query->result_array();
    }
    public function count_antrian() {
        $this->db->select('COUNT(id) as jumlah');
        $this->db->from('tbl_antrian');
        $this->db->where('tanggal', $this->tanggal);
        $query = $this->db->get();

        $result = $query->row_array();
        return $result['jumlah'];
    }
    public function cekavail($id_mkn) {
        $this->db->select('id_mkn,book_time');
        $this->db->from('tbl_antrian');
        $this->db->where('id_mkn', $id_mkn);
        $this->db->where('tanggal', $this->tanggal);

        $query = $this->db->get();
        return $query->result_array();
    }
    public function add_que($data) {
        $existdata = $this->db->select('max(no_antrian) as nomor')
                            ->where('tanggal', $this->tanggal)
                            ->get('tbl_antrian')
                            ->row();
        if ($existdata->nomor == $data['no_antrian']) {
            return false; 
        } else {
            $this->db->insert('tbl_antrian', $data);
            return true; 
        }
    }
    public function now_antrian() {
        $this->db->select('COUNT(id)+1 as jumlah');
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
    public function getListServis($searchTerm=null) {
        $this->db->select(['id_servis', 'nama_servis']);
        $this->db->from('tbl_servis');
        if ($searchTerm) {
            $this->db->group_start();
            $this->db->like('nama_servis', $searchTerm);
            $this->db->group_end();
        }
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
    public function getListMekanik($searchTerm=null) {
        $this->db->select(['id_mkn', 'nama_mkn']);
        $this->db->from('tbl_mekanik');
        if ($searchTerm) {
            $this->db->group_start();
            $this->db->like('nama_mkn', $searchTerm);
            $this->db->group_end();
        }
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
    public function calling($id){
        $data = array(
            'status' => '1',
            'updated_date' => $this->tglwk
        );
        $this->db->where('id', $id);
        $this->db->update('tbl_antrian', $data);
        if ($this->db->affected_rows() > 0) {
            return true;
        } else {
            return false;
        }
    }
}

/* End of file Dashboard_model.php */
/* Location: ./application/models/Dashboard_model.php */