
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
                <li class="nav-item">
                    <a class="nav-link" href="index.html">
                        <i class="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li class="nav-item active">
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
                            <a href="#">Assessments</a>
                        </li>
                        <li class="breadcrumb-item active">
                            <a>this.name</a>
                        </li>
                    </ol>
                    <!-- End breadcrumbs -->



                    <!-- Assessments -->
                    <!-- If there are assessments -->
                    <div v-if="assessments.length > 0" class="row">
                        <div v-for="(assessment, index) in assessments" class="col-xl-12 col-sm-12 mb-3" :key="index">
                            <div :class="'card text-white ' + colours[index%colours.length] + ' o-hidden h-100'">
                                <div class="card-body">
                                    <div class="card-body-icon">
                                        <i class="fas fa-fw fa-comments"></i>
                                    </div>
                                    <div class="mr-5">{{assessment.name}}
                                        <button type="button" class="btn btn-info btn-sm">Save</button>
                                    </div>
                                    <!-- <div class="mr-5">{{JSON.stringify(assessment)}}</div> -->
                                </div>
                                <!-- <a v-on:click="next(assessment, $event)" class="card-footer text-white clearfix small z-1" href=""> -->
                                    <!-- <span class="float-left">View Details</span> -->
                                    <span class="float">
                                        <!-- <i class="fas fa-angle-right"></i> -->

                                        <ul class="details">
                                            <!-- <li class="detail-item">
                                                <a href="#">{{JSON.stringify(assessment)}}</a>
                                                <a href="#"></a>
                                                <a href="#"></a>
                                                <a href="#"></a>
                                                <a href="#"></a>
                                            </li> -->
                                            
                                            <li class="list-group-item list-group-item-secondary">Total Mark: {{assessment.total_mark}}</li>
                                            <li class="list-group-item list-group-item-secondary">Actual Mark: {{assessment.actual_mark}}</li>
                                            <li class="list-group-item list-group-item-secondary">Goal Mark: {{assessment.goal_mark}}</li>
                                            <li class="list-group-item list-group-item-secondary">Weighting: {{assessment.weight}}</li>

                                            <form>
                                                <div class="form-group">
                                                    <label for="detail1">Total Mark:</label>
                                                    <input type="detail" class="form-control" id="detail1" placeholder=assessment.total_mark>
                                                    <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                                                </div>
                                                <div class="form-group">
                                                    <label for="detail2">Actual Mark:</label>
                                                    <input type="detail" class="form-control" id="detail2" placeholder=assessment.actual_mark>
                                                </div>
                                                <div class="form-group">
                                                    <label for="detail3">Goal Mark:</label>
                                                    <input type="detail" class="form-control" id="detail3" placeholder=assessment.goal_mark>
                                                </div>
                                                <div class="form-group">
                                                    <label for="detail4">Weighting:</label>
                                                    <input type="detail" class="form-control" id="detail4" placeholder=weighting>
                                                </div>
                                                </form>

                                        </ul>


                                    </span>

                                    


                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- If there aren't assessments-->
                    <div v-else class="row">
                        <span>No assessments, please add an assessment</span>
                    </div>
                    <!-- End assessments -->





                </div>     
            </div>
            <!-- End dashboard -->
        </div>
        <!-- End main page -->    
    </body>
</template>

<script>
    export default {
        name: 'Subject',
        data() {
            return {
                subjects: [
                    // {name: "COMP9323"},
                    // {name: "COMP1234"},
                    // {name: "COMP1232"},
                    // {name: "COMP1231"}
                ],
                assessments: [],
                colours: [
                    "bg-primary",
                    "bg-warning",
                    "bg-success",
                    "bg-danger"
                ]
            };
        },
        methods: {
            next(subject, event) {
                event.preventDefault();
                 alert(JSON.stringify(subject));
            },
            next(assessment, event) {
                event.preventDefault();
                 alert(JSON.stringify(assessment));
            }
        },
        mounted() {
            fetch(`http://localhost:8081/subjects/${this.$parent.user_id}`, {
                        method: 'GET',
                    }).then(response => {
                        if (response.status === 200) {
                            response.json().then(subs => {
                                subs.forEach(subject => {
                                    this.subjects.push(subject);
                                });
                                
                            })                           
                        } else {
                            console.log("Cannot retrieve subjects");
                        }
            });

            fetch(`http://localhost:8081/assessments/${this.$parent.subject_id}`, {
                        method: 'GET',
                    }).then(response => {
                        if (response.status === 200) {
                            response.json().then(asss => {
                                asss.forEach(assessment => {
                                    this.assessments.push(assessment);
                                });
                                
                            })                           
                        } else {
                            console.log("Cannot retrieve assessments");
                        }
            });

            // fetch('http://localhost:8081/assessments/${this.$parent.subject_id}', {
            //     method: 'GET',
            // }).then(response => {
            //     if (response.status === 200) {
            //         response.json().then(asss => {
            //             asss.forEach(assessment => {
            //                 this.assessments.push(assessment);
            //             });
            //         })
            //     } else {
            //         console.log("Cannot retrieve assessments");
            //     }
            // });
                
                
        }
        
    }
</script>

<style src= "../assets/vendor/bootstrap/css/bootstrap.min.css" scoped></style>
<style src= "../assets/vendor/fontawesome-free/css/all.min.css" scoped></style>
<style src= "../assets/vendor/datatables/dataTables.bootstrap4.css" scoped></style>
<style src= "../assets/css/sb-admin.css" scoped></style>