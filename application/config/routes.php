<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/userguide3/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'Dashboard';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
// login
$route['login']='Login';
$route['logout']='Login/logout';
$route['cek-auth']='Login/aksi_login';
// countantrian
$route['antrian-counting']='Dashboard/countantrian';
$route['antrian-sisa-counting']='Dashboard/countsisaantrian';
// servis
$route['servis/tambah-servis']='Dashboard/addservis';
$route['servis/update-servis']='Dashboard/updateservis';
$route['servis/hapus-servis/(:num)']='Dashboard/deleteservis/$1';
$route['servis/list-servis']='Dashboard/listsrv';
// mekanik
$route['mekanik/tambah-mekanik']='Dashboard/addmekanik';
$route['mekanik/update-mekanik']='Dashboard/updatemekanik';
$route['mekanik/hapus-mekanik/(:num)']='Dashboard/deletemekanik/$1';
$route['mekanik/list-mekanik']='Dashboard/listmkn';
// frontliner
$route['frontliner/tambah-frontliner']='Dashboard/addfront';
$route['frontliner/update-frontliner']='Dashboard/updatefront';
$route['frontliner/hapus-frontliner/(:num)']='Dashboard/deletefront/$1';
$route['frontliner/list-frontliner']='Dashboard/listfr';
// antrian
$route['now-que']='Dashboard/nowantrian';
$route['antrian/tambah-antrian']='Dashboard/addque';
$route['antrian/load-antrian-regist']='Dashboard/loadantrian';
// display tv
$route['display']='Display';