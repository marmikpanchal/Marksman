
<template>    
    <body id="page-top">
        <!-- Navbar -->
        <nav class="navbar navbar-expand navbar-dark bg-dark static-top">
            <a v-on:click="goSecure($event)" class="navbar-brand mr-1" href="">Marksman</a>
            <!-- Navbar icons -->
            <ul class="navbar-nav ml-auto mr-0 mr-md-3 my-2 my-md-0">
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
                            <a href="#">Subjects</a>
                        </li>
                        <li class="breadcrumb-item active">{{this.$parent.subject_name}}</li>
                    </ol>
                    <!-- End breadcrumbs -->
                    <!-- Progress bar -->
                    <div class="card mb-3">
                        <div class="card-header">
                            <i class="fas fa-chart-area"></i>
                            Your current progress
                        </div>
                        <div class="card-body">
                            <div style="margin-bottom: 2%;">
                                <b-progress height="35px" style="font-size: 16px; font-weight: bold;" class="mt-1 mb-3" :max="max" show-value>
                                    <b-progress-bar :value="marks.curr_total" variant="success"></b-progress-bar>
                                    <!-- <b-progress-bar :value="25" variant="warning"></b-progress-bar> -->
                                    <b-progress-bar :value="marks.total - marks.curr_total" variant="danger"></b-progress-bar>
                                </b-progress>
                            </div>
                        </div>
                        <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                    </div>
                    <!-- End progress bar -->

                   
                
                    <!-- Assessment box -->
                    <div class="card mb-3">
                        <div class="card-header">
                            <i class="fas fa-fw fa-book"></i>
                            <strong>Assessments</strong>
                        </div>
                        <div class="card-body">
                            <!-- Add pending assessment modal -->
                            <div class="button-next">
                                <b-button class="mb-3" variant="info" @click="showModal">
                                    Add Pending Assessment
                                </b-button>
                                <b-modal ref="Modal" hide-footer title="Add Pending Assessment">
                                    <div class="d-block text-center">
                                        <h4 style="margin-top: 15px">Fill in the details</h4>
                                        <button data-tooltip="I’m the tooltip text."><i class="fa fa-question-circle"></i></button>
                                    </div>
                                    <div>
                                        <b-container fluid>
                                            <b-row class="my-1" :key="type">
                                                <b-col class="mt-3" sm="3"><strong>Name: </strong></b-col>
                                                <b-col class="mt-3" sm="9"><b-form-input v-model="name" placeholder="Assignment 1 - databases"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Total Mark: </strong></b-col>
                                                <b-col class="mt-3" sm="9"><b-form-input v-model="total_mark" placeholder="30"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Goal Mark: </strong></b-col>
                                                <b-col class="mt-3" sm="9"><b-form-input v-model="goal_mark" placeholder="25"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Weighting Mark: </strong></b-col>
                                                <b-col class="mt-3 mb-3" sm="9"><b-form-input v-model="weight" placeholder="20%"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Due Date: </strong></b-col>
                                                <b-col class="mt-3 mb-3" sm="9"><b-form-input type="date"></b-form-input></b-col>
                                            </b-row>
                                        </b-container>
                                    </div>
                                    <b-btn class="mt-5" variant="danger" block @click="hideModal">Cancel</b-btn>
                                    <b-btn class = "mt-3" variant="success" block v-on:click="createAssessment()">Save Changes</b-btn>
                                </b-modal>
                            </div>
                            <!-- End add pending assessment modal -->
                            <!-- Add finished assessment modal -->
                            <div class="button-next">
                                <b-button class="mb-3" style="display:inline-block" variant="success" @click="showModal">
                                    Add Finished Assessment
                                </b-button>
                                <b-modal ref="Modal" hide-footer title="Add Finished Assessment">
                                    <div class="d-block text-center">
                                        <h4 style="margin-top: 15px">Fill in the details</h4>
                                    </div>
                                    <div>
                                        <b-container fluid>
                                            <b-row class="my-1" :key="type">
                                                <b-col class="mt-3" sm="3"><strong>Name: </strong></b-col>
                                                <b-col class="mt-3" sm="9"><b-form-input v-model="name" placeholder="Assignment 1 - databases"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Total Mark: </strong></b-col>
                                                <b-col class="mt-3" sm="9"><b-form-input v-model="total_mark" placeholder="30"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Goal Mark: </strong></b-col>
                                                <b-col class="mt-3" sm="9"><b-form-input v-model="goal_mark" placeholder="25"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Actual Mark: </strong></b-col>
                                                <b-col class="mt-3" sm="9"><b-form-input v-model="actual_mark" placeholder="20"></b-form-input></b-col>
                                                
                                                <b-col class="mt-3" sm="3"><strong>Weighting Mark: </strong></b-col>
                                                <b-col class="mt-3 mb-3" sm="9"><b-form-input v-model="weight" placeholder="20%"></b-form-input></b-col>
                                            </b-row>
                                        </b-container>
                                    </div>
                                    <b-btn class="mt-5" variant="danger" block @click="hideModal">Cancel</b-btn>
                                    <b-btn class = "mt-3" variant="success" block v-on:click="createAssessment()">Save Changes</b-btn>
                                </b-modal>
                            </div>
                            <!-- End add finished assessment modal -->
                            <div v-if="assessments.length > 0" class="accordion vertical">
                                <ul v-for="(assessment, index) in assessments" :key="index">
                                    <li>
                                        <input type="checkbox" :id="'checkbox-' + index" name="checkbox-accordion" />
                                        <label :for="'checkbox-' + index">{{assessment.name}}</label>
                                        <div class="content">
                                            <div class="container float-left">
                                                <h5>Worth: {{assessment.weight}}%</h5><br>
                                                <h5>Goal of {{assessment.goal_mark}} out {{assessment.total_mark}} possible marks</h5>
                                                <div>
                                                    <b-container fluid>
                                                        <b-row class="my-1" :key="type">
                                                            <h5 class="mt-3" sm="3">Received mark: {{assessment.actual_mark}}</h5>
                                                            <b-col class="mt-3" sm="3"><b-form-input v-model="received_mark"></b-form-input></b-col>
                                                        </b-row>
                                                    </b-container>
                                                </div>
                                            </div>
                                            <div class="container float-right">
                                                <h5>Memo</h5>
                                                <div class="form-group">
                                                    <textarea class="form-control" id="message" name="message" placeholder="Please enter your notes here..." rows="10"></textarea>
                                                </div> 
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div v-else class="row">
                                <div class="card-body">
                                    <span>No assessments, please add an assessment</span>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
                    <!-- End assessment box -->
                  
                        <!-- If there aren't assessments-->
            
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
                    weight: '',
                    marks: {}
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
                    fetch(`http://localhost:8081/subjects/totals/${this.$parent.subject_id}`, {
                        method: 'GET',
                    }).then(response => {
                        if (response.status === 200) {
                            response.json().then(marks => {
                                    this.marks = marks
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

<style src= "../assets/vendor/bootstrap/css/bootstrap.min.css" scoped></style>
<style src= "../assets/vendor/fontawesome-free/css/all.min.css" scoped></style>
<style src= "../assets/vendor/datatables/dataTables.bootstrap4.css" scoped></style>
<style src= "../assets/css/sb-admin.css" scoped></style>
