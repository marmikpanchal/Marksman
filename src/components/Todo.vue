
<template>    
    <body id="page-top">
        <!-- Main page -->
        <div id="wrapper">
            <!-- Sidebar -->
            <ul class="sidebar navbar-nav">
                <li class="nav-item">
                    <a v-on:click="goSecure($event)" class="nav-link" href="">
                        <i class="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="subjects.html" id="pagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-fw fa-chart-area"></i>
                        <span>Subjects</span><span class="caret"></span>
                    </a>
                    <div v-for="(subject, index) in subjects" class="dropdown-menu" aria-labelledby="pagesDropdown">
                        <a class="dropdown-item" href="">{{subject.name}}</a>
                    </div>
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
                            <a href="#">To-Do List</a>
                        </li>
                    </ol>
                    <!-- End breadcrumbs -->
                    <!-- To-do -->
                    <div class="row">
                        <!-- To-dos -->
                        <div class="col-lg-6">
                            <div class="card mb-3">
                                <div class="card-header">
                                    <i class="fas fa-fw fa-bell"></i>
                                <strong>To-Dos</strong>
                                </div>
                                <div class="card-body">
                                    <input type="text" class="form-control add-todo" placeholder="Add todo">
                                    <button id="checkAll" class="btn btn-success">Mark all as done</button>
                                    <div class="space">
                                        <ul id="sortable" class="list-unstyled">
                                            <li class="ui-state-default">
                                                <div class="checkbox">
                                                    <label>
                                                        <input type="checkbox" value=""/>&nbsp Take out the trash</label>
                                                        <br>
                                                </div>
                                            </li>
                                            <br>
                                            <li class="ui-state-default">
                                                <div class="checkbox">
                                                    <label>
                                                        <input type="checkbox" value=""/>&nbsp Buy bread</label>
                                                        <br>
                                                </div>
                                            </li>
                                            <br>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End of to-dos -->
                        <!-- Already done -->
                        <div class="col-lg-6">
                            <div class="card mb-3">
                                <div class="card-header">
                                    <i class="fas fa-fw fa-check"></i>
                                <strong>Already Done</strong>
                                </div>
                                <div class="card-body">
                                    <ul id="done-items" class="list-unstyled">
                                        <li>Some item <button class="remove-item btn btn-default btn-xs right-pull"><span class="fa fa-trash"></span></button></li>
                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!-- End of already done -->
                    </div>
                    <!-- End to-do -->
                </div>
            </div>
            <!-- End dashboard -->
        </div>
        <!-- End main page -->    
    </body>
</template>


<style src= "../assets/vendor/bootstrap/css/bootstrap.min.css" scoped></style>
<style src= "../assets/vendor/fontawesome-free/css/all.min.css" scoped></style>
<style src= "../assets/vendor/datatables/dataTables.bootstrap4.css" scoped></style>
<style src= "../assets/css/sb-admin.css" scoped></style>
