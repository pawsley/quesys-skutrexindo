<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use Pusher\Pusher;

class Pusher_lib {
    private $pusher;

    public function __construct() {
        $CI =& get_instance();
        $CI->load->config('pusher'); // Pastikan konfigurasi ada di sini

        $options = array(
            'cluster' => $CI->config->item('pusher_cluster'),
            'useTLS' => $CI->config->item('pusher_use_tls')
        );

        $this->pusher = new Pusher(
            $CI->config->item('pusher_key'),
            $CI->config->item('pusher_secret'),
            $CI->config->item('pusher_app_id'),
            $options
        );
    }

    public function trigger($channel, $event, $data) {
        return $this->pusher->trigger($channel, $event, $data);
    }
}