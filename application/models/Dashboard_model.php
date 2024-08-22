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
        $this->db->order_by('updated_date','desc');
        $this->db->limit(1);

        $query = $this->db->get();
        return $query->result_array();
    }
    public function cekdata() {
        $this->db->select('
            no_antrian, tanggal, updated_date, status
        ');
        $this->db->from('vantrian');
        $this->db->where('tanggal', $this->tanggal);
        $this->db->where('status', '1');
        $this->db->order_by('updated_date','desc');
        $this->db->limit(1);

        $query = $this->db->get();
        return $query->num_rows();
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
    public function update_que($id,$data){
        $this->db->where('id', $id);
        $this->db->update('tbl_antrian', $data);
    }
    public function get_srv_ids_by_id($id) {
        $query = $this->db->get_where('tbl_antrian_dtl', ['id' => $id]);
        $result = $query->result_array();
        return array_column($result, 'id_servis'); 
    }
    
    public function add_srv_id($data) {
        $this->db->insert('tbl_antrian_dtl', $data);
    }
    public function remove_srv_id($id, $srv_id) {
        $this->db->where('id', $id);
        $this->db->where('id_servis', $srv_id);
        $this->db->delete('tbl_antrian_dtl');
    }
    public function update_details($id, $data) {
        $this->db->where('id', $id);
        $this->db->update('tbl_antrian_dtl', $data);
    }
        
    public function detail_que($data){
        $this->db->insert('tbl_antrian_dtl', $data);
        return $this->db->affected_rows() > 0;
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
    public function add_mekanik($data) {
        $this->db->where('nama_mkn', $data['nama_mkn']);
        $existdata = $this->db->get('tbl_mekanik')->row();
        
        if (!$existdata) {
            $this->db->insert('tbl_mekanik', $data);
            return true; 
        } else {
            return false; 
        }
    }
    public function getListMekanik($searchTerm=null) {
        $this->db->select(['id_mkn', 'nama_mkn','foto_mkn','status']);
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
    public function get_file_namedm($id) {
        return $this->db->select('foto_mkn')
                        ->where('id_mkn', $id)
                        ->get('tbl_mekanik')
                        ->row()
                        ->foto_mkn;
    }    
    public function delete_mekanik($id) {
        $file_name = $this->get_file_namedm($id);
        $success = $this->db->delete('tbl_mekanik', array("id_mkn" => $id));
        
        if ($success && $file_name) {
            $file_path = realpath(APPPATH . '../assets/foto-mekanik') . '/' . $file_name;
            if (file_exists($file_path)) {
                unlink($file_path);
            }
        }
    
        $message = $success ? 'Data berhasil dihapus' : 'Gagal dihapus';
        return array('success' => $success, 'message' => $message);
    }
    public function add_front($data) {
        $this->db->insert('tbl_frontliner', $data);
        return $this->db->affected_rows() > 0; // Return true if the insert was successful
    }        
    public function getListFront($searchTerm=null) {
        $this->db->select(['id_fr', 'nama_fr','foto_fr','status']);
        $this->db->from('tbl_frontliner');
        if ($searchTerm) {
            $this->db->group_start();
            $this->db->like('nama_fr', $searchTerm);
            $this->db->group_end();
        }
        $this->db->order_by('nama_fr', 'asc');
        $query = $this->db->get();
        return $query->result_array();
    }
    public function update_front($id,$data){
        $this->db->where('id_fr', $id);
        $this->db->update('tbl_frontliner', $data);
    }
    public function get_file_namedf($id) {
        return $this->db->select('foto_fr')
                        ->where('id_fr', $id)
                        ->get('tbl_frontliner')
                        ->row()
                        ->foto_fr;
    }
    public function delete_front($id) {
        $file_name = $this->get_file_namedf($id);
        $success = $this->db->delete('tbl_frontliner', array("id_fr" => $id));
        
        if ($success && $file_name) {
            $file_path = realpath(APPPATH . '../assets/foto-frontliner') . '/' . $file_name;
            if (file_exists($file_path)) {
                unlink($file_path);
            }
        }
    
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