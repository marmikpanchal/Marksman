
<template>    
    <body id="page-top">
        <!-- Navbar -->
        <nav class="navbar navbar-expand navbar-dark bg-dark static-top">
            <a v-on:click="goSecure($event)" class="navbar-brand mr-1" href="">Marksman</a>
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
                    <div class="dropdown-menu" aria-labelledby="pagesDropdown">
                        <a class="dropdown-item" href="">COMP</a>
                        <a class="dropdown-item" href="">COMP</a>
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
                            <a href="#">Assessments for {{this.$parent.subject_name}}</a>
                        </li>
                        <li class="breadcrumb-item active">
                            <div v-if="subjects.length > 0" class="row">
                                Trying to get it to display subject name but this won't work as subject_id != index in local subjects array
                                <!-- <div class="mr-5">{{subjects[subject_id].name}}</div> -->
                            </div>
                        </li>
                    </ol>
                    <!-- End breadcrumbs -->
                    <!-- Progress bar -->
                    <div class="card mb-3">
                        <div class="card-header">
                            <i class="fas fa-chart-area"></i>
                            Your current progress
                        </div>
                        <div class="card-body">
                            <div class="progress">
                                <div class="progress-bar bg-success" role="progressbar" style="width: 15%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                                <div class="progress-bar bg-danger" role="progressbar" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                    </div>
                    <!-- End progress bar -->
                    <!-- Assessment box -->
                    <div class="card mb-3">
                        <div class="card-header">
                            Assessments
                        </div>
                        <div class="card-body">
                            <!-- Add assessment modal -->
                            <div>
                                <b-button class="mb-3" variant="success" @click="showModal">
                                    Add Assessment
                                </b-button>
                                <b-modal ref="Modal" hide-footer title="Adding an Assessment">
                                    <div class="d-block text-center">
                                        <h3 style="margin-top: 15px">Fill in the details</h3>
                                    </div>
                                    <div>
                                        <b-container fluid>
                                            <b-row class="my-1" :key="type">
                                                <b-col class="mt-3" sm="3"><strong>Name: </strong></b-col>
                                                <b-col class="mt-3" sm="9"><b-form-input v-model="name"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Total Mark: </strong></b-col>
                                                <b-col class="mt-3" sm="9"><b-form-input v-model="total_mark"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Actual Mark: </strong></b-col>
                                                <b-col class="mt-3" sm="9"><b-form-input v-model="actual_mark"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Goal Mark: </strong></b-col>
                                                <b-col class="mt-3" sm="9"><b-form-input v-model="goal_mark"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Weighting Mark: </strong></b-col>
                                                <b-col class="mt-3 mb-3" sm="9"><b-form-input v-model="weight"></b-form-input></b-col>
                                            </b-row>
                                        </b-container>
                                    </div>
                                    <b-btn class="mt-5" variant="danger" block @click="hideModal">Cancel</b-btn>
                                    <b-btn class = "mt-3" variant="success" block v-on:click="createAssessment()">Save Changes</b-btn>
                                </b-modal>
                            </div>
                            <!-- End add assessment modal -->
                            <div class="accordion vertical">
                                <ul>
                                    <li>
                                        <input type="checkbox" id="checkbox-1" name="checkbox-accordion" />
                                        <label for="checkbox-1">Assignment 1</label>
                                        <div class="content">
                                        </div>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="checkbox-2" name="checkbox-accordion" />
                                        <label for="checkbox-2">Assignment 2</label>
                                        <div class="content">
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                    </div>
                    <!-- End assessment box -->

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
                            <div class="card-body">
                                <span>No assessments, please add an assessment</span>
                            </div>
                        </div> 
                    </div>  
                    <!-- End assessments -->   
            </div>
            <!-- End dashboard -->
        </div>
        <!-- End main page -->    
    </body>
</template>

<script>
    // import Modal from './Modal.vue';
    export default {
        name: 'Subject',
        // components: { Modal },
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
                    ],
                    name: '',
                    total_mark: '',
                    actual_mark: '',
                    goal_mark: '',
                    weight: ''
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
                },
                goSecure(event) {
                    event.preventDefault();
                    this.$router.push({ name: "secure" });
                },
                goSubject(event) {
                    event.preventDefault();
                    this.$router.push({ name: "subject" });
                },
                showModal() { this.$refs.Modal.show() },
                hideModal() { this.$refs.Modal.hide() },

                createAssessment() {
                    fetch(`http://localhost:8081/assessments`, {
                        method: 'POST',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            subject_id: this.$parent.subject_id,
                            name: this.name,
                            total_mark: this.total_mark,
                            actual_mark: this.actual_mark,
                            goal_mark: this.goal_mark,
                            weight: this.weight
                        })
                    }).then(response => {
                        this.hideModal()
                        this.getInfo();
                    })
                },
                getInfo() {
                    fetch(`http://localhost:8081/assessments/${this.$parent.subject_id}`, {
                        method: 'GET',
                    }).then(response => {
                        if (response.status === 200) {
                            response.json().then(assessments => {
                                    this.assessments = assessments
                            })                           
                        } else {
                            console.log("Cannot retrieve assessments");
                        }
                    });
                }
            },
          
            mounted() {
                this.getInfo();
            }  
    }
</script>


<style>
.modal-dialog {
    margin-top: 150px;
    width: auto;
    pointer-events: none;
}
</style>

<style src= "../assets/vendor/bootstrap/css/bootstrap.min.css" scoped></style>
<style src= "../assets/vendor/fontawesome-free/css/all.min.css" scoped></style>
<style src= "../assets/vendor/datatables/dataTables.bootstrap4.css" scoped></style>
<style src= "../assets/css/sb-admin.css" scoped></style>
