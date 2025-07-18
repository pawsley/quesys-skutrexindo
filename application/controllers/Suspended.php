<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Suspended extends CI_Controller {

    public function index()
    {
        $this->load->view('suspend');
    }
}
