<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class SuspendedHook {

    public function check() {
        $CI =& get_instance();

        // Safe access to config value
        $suspended_mode = $CI->config->item('suspended_mode');

        if ($suspended_mode === TRUE) {

            // Prevent infinite loop if already on suspended view
            $current_class = $CI->router->fetch_class();
            if (strtolower($current_class) === 'suspended') {
                return;
            }

            // Load required helpers/libraries
            $CI->load->helper('url');

            // Load the suspend view via CI
            echo $CI->load->view('suspend', [], true);
            exit;
        }
    }
}
