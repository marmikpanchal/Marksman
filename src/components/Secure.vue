<script></script>

<template>    
    <body id="page-top">
        <!-- Navbar -->
        <nav class="navbar navbar-expand navbar-dark bg-dark static-top">
            <a class="navbar-brand mr-1" href="index.html">Marksman</a>
            <!-- Navbar search -->
            <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                        <button class="btn btn-primary" type="button">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </form>
            <!-- End navbar search -->
            <!-- Navbar icons -->
            <ul class="navbar-nav ml-auto ml-md-0">
                <li class="nav-item dropdown no-arrow mx-1">
                    <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-bell fa-fw"></i>
                        <span class="badge badge-danger">9+</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown">
                        <a class="dropdown-item" href="#">You have 1 new notification</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Some notification</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Check all notifications</a>
                    </div>
                </li>
                <li class="nav-item dropdown no-arrow">
                    <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-user-circle fa-fw"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                        <a class="dropdown-item" href="#">Profile</a>
                        <a class="dropdown-item" href="#">Settings</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">Logout</a>
                    </div>
                </li>
            </ul>
            <!-- End navbar icons -->
        </nav>
        <!-- End navbar -->

        <!-- Main page -->
        <div id="wrapper">
            <!-- Sidebar -->
            <ul class="sidebar navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="index.html">
                        <i class="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="subjects.html">
                        <i class="fas fa-fw fa-chart-area"></i>
                        <span>Subjects</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="calendar.html">
                        <i class="fas fa-fw fa-table"></i>
                        <span>Calendar</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="to-do.html">
                        <i class="fas fa-fw fa-list"></i>
                        <span>To-Do List</span>
                    </a>
                </li>
            </ul>
            <!-- End sidebar -->
    
            <!-- Dashboard -->
            <div id="content-wrapper">
                <div class="container-fluid">
                    <!-- Breadcrumbs -->
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#">Dashboard</a>
                        </li>
                        <li class="breadcrumb-item active">Overview</li>
                    </ol>
                    <!-- End breadcrumbs -->
                    <!-- Subjects -->
                    <div class="row">
                        <div class="col-xl-3 col-sm-6 mb-3">
                            <div class="card text-white bg-primary o-hidden h-100">
                                <div class="card-body">
                                    <div class="card-body-icon">
                                        <i class="fas fa-fw fa-comments"></i>
                                    </div>
                                    <div class="mr-5">COMP1111</div>
                                </div>
                                <a class="card-footer text-white clearfix small z-1" href="#">
                                    <span class="float-left">View Details</span>
                                    <span class="float-right">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div class="col-xl-3 col-sm-6 mb-3">
                            <div class="card text-white bg-warning o-hidden h-100">
                                <div class="card-body">
                                    <div class="card-body-icon">
                                        <i class="fas fa-fw fa-list"></i>
                                    </div>
                                    <div class="mr-5">COMP2222</div>
                                </div>
                                <a class="card-footer text-white clearfix small z-1" href="#">
                                    <span class="float-left">View Details</span>
                                    <span class="float-right">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div class="col-xl-3 col-sm-6 mb-3">
                            <div class="card text-white bg-success o-hidden h-100">
                                <div class="card-body">
                                    <div class="card-body-icon">
                                        <i class="fas fa-fw fa-shopping-cart"></i>
                                    </div>
                                    <div class="mr-5">COMP3333</div>
                                </div>
                                <a class="card-footer text-white clearfix small z-1" href="#">
                                    <span class="float-left">View Details</span>
                                    <span class="float-right">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div class="col-xl-3 col-sm-6 mb-3">
                            <div class="card text-white bg-danger o-hidden h-100">
                                <div class="card-body">
                                    <div class="card-body-icon">
                                        <i class="fas fa-fw fa-life-ring"></i>
                                    </div>
                                    <div class="mr-5">COMP4444</div>
                                </div>
                                <a class="card-footer text-white clearfix small z-1" href="#">
                                    <span class="float-left">View Details</span>
                                    <span class="float-right">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- End subjects -->
                    <div class="row">
                        <!-- Calendar -->
                        <div class="col-lg-7">
                            <div class="card mb-3">
                                <div class="card-header">Calendar</div>
                                <div class="card-body">
                                    <canvas id="myBarChart" width="100%" height="50"></canvas>
                                 </div>
                                <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                            </div>
                        </div>
                        <!-- End calendar -->
                        <!-- To-do list -->
                        <div class="col-lg-5">
                            <div class="card mb-3">
                                <div class="card-header">To-Do List</div>
                                <div class="card-body">
                                    <div class="todo-list">
                                    <div class="tdl-holder tdl-content">
                                        <ul>
                                            <li><label>
					                            <input type="checkbox"><i class="bg-primary"></i><span>A task</span>
					                            <a href='#' class="ti-close"></a>				                                
				                            </label></li>
                                            <li><label>
					                            <input type="checkbox"><i class="bg-success"></i><span>A task</span>
					                            <a href='#' class="ti-close"></a>				                                
				                            </label></li>
				                            <li><label>
					                            <input type="checkbox"><i class="bg-warning"></i><span>A task</span>
					                            <a href='#' class="ti-close"></a>				                                
				                            </label></li>
				                            <li><label>
					                            <input type="checkbox"><i class="bg-danger"></i><span>A task</span>
					                            <a href='#' class="ti-close"></a>				                                
				                            </label></li>
                                        </ul>
                                        <input type="text" class="tdl-new form-control" placeholder="Type here">                                      
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <!-- End to-do list -->
                    </div>
                </div>     
            </div>
            <!-- End dashboard -->
        </div>
        <!-- End main page -->    
    </body>
</template>

<script>
    export default {
        name: 'Secure',
        data() {
            return {};
        }
    }
</script>

<style src= "../assets/vendor/bootstrap/css/bootstrap.min.css" scoped></style>
<style src= "../assets/vendor/fontawesome-free/css/all.min.css" scoped></style>
<style src= "../assets/vendor/datatables/dataTables.bootstrap4.css" scoped></style>
<style src= "../assets/css/sb-admin.css" scoped></style>
