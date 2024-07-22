<?php
defined('BASEPATH') OR exit('No direct script access allowed');
include_once(APPPATH . 'controllers/Auth.php');
class Welcome extends Auth {
	public function index()
	{
		$this->load->view('welcome_message');
	}
}
