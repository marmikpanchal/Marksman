
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
                    <div v-for="(subject, index) in subjects" class="dropdown-menu" aria-labelledby="pagesDropdown" :key="index">
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
                            <a href="#">Subjects</a>
                        </li>
                        <li class="breadcrumb-item active">{{this.$parent.subject_name}}</li>
                    </ol>
                    <!-- End breadcrumbs -->
                    <!-- Progress bar -->
                    <div class="card mb-3">
                        <div class="card-header">
                            <i class="fas fa-chart-area"></i>
                            <strong>Your current progress</strong>
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
                                <b-button class="mb-3" variant="info" @click="showPendingModal">
                                    Add Pending Assessment
                                </b-button>
                                <b-modal ref="Pending_Modal" hide-footer title="Add Pending Assessment">
                                    <div class="d-block text-center">
                                        <h4 style="margin-top: 15px">Fill in the details
                                            <button data-tooltip="For assessments that are in progress."><i class="fa fa-question-circle"></i></button>
                                        </h4>
                                    </div>
                                    <div>
                                        <b-container fluid>
                                            <b-row class="my-1" :key="type">
                                                <b-col class="mt-3" sm="3"><strong>Name: </strong></b-col>
                                                <b-col class="mt-3" sm="9"><b-form-input v-model="name" placeholder="Assignment 1 - databases"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Total mark: </strong></b-col>
                                                <b-col class="mt-3" sm="9"><b-form-input v-model="total_mark" placeholder="30"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Goal mark: </strong></b-col>
                                                <b-col class="mt-3" sm="9"><b-form-input v-model="goal_mark" placeholder="25"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Weighting mark: </strong></b-col>
                                                <b-col class="mt-3 mb-3" sm="9"><b-form-input v-model="weight" placeholder="20%"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Estimated hours til completion: </strong></b-col>
                                                <b-col class="mt-3 mb-3" sm="9"><b-form-input type="hours" placeholder="3"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Due date: </strong></b-col>
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
                                        <h4 style="margin-top: 15px">Fill in the details 
                                            <button data-tooltip="For assessments that you have received marks for."><i class="fa fa-question-circle"></i></button>
                                        </h4>
                                    </div>
                                    <div>
                                        <b-container fluid>
                                            <b-row class="my-1" :key="type">
                                                <b-col class="mt-3" sm="3"><strong>Name: </strong></b-col>
                                                <b-col class="mt-3" sm="9"><b-form-input v-model="name" placeholder="Assignment 1 - databases"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Total mark: </strong></b-col>
                                                <b-col class="mt-3" sm="9"><b-form-input v-model="total_mark" placeholder="30"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Goal mark: </strong></b-col>
                                                <b-col class="mt-3" sm="9"><b-form-input v-model="goal_mark" placeholder="25"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Actual mark: </strong></b-col>
                                                <b-col class="mt-3" sm="9"><b-form-input v-model="actual_mark" placeholder="20"></b-form-input></b-col>
                                                
                                                <b-col class="mt-3" sm="3"><strong>Weighting mark: </strong></b-col>
                                                <b-col class="mt-3 mb-3" sm="9"><b-form-input v-model="weight" placeholder="20%"></b-form-input></b-col>
                                            </b-row>
                                        </b-container>
                                    </div>
                                    <b-btn class="mt-5" variant="danger" block @click="hideModal">Cancel</b-btn>
                                    <b-btn class = "mt-3" variant="success" block v-on:click="createAssessment()">Save Changes</b-btn>
                                </b-modal>
                            </div>
                            <!-- End add finished assessment modal -->
                            <!-- Assessments accordion -->
                            <div v-if="assessments.length > 0" class="accordion vertical">
                                <ul v-for="(assessment, index) in assessments" :key="index">
                                    <li>
                                        <input type="checkbox" :id="'checkbox-' + index" name="checkbox-accordion" />
                                        <label :for="'checkbox-' + index">{{assessment.name}}</label>
                                        <div class="content">
                                            <div class="container float-left">
                                                <h5><strong>Details</strong></h5>
                                                <table class="table table-bordered">
                                                    <tr>
                                                        <td><h6>Worth: {{assessment.weight}}%</h6></td>
                                                    </tr>
                                                    <tr>
                                                        <td><h6>Goal of {{assessment.goal_mark}} out {{assessment.total_mark}} possible marks</h6></td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div>
                                                                <b-container fluid>
                                                                    <b-row class="my-1" :key="type">
                                                                        <h6>Received mark: {{assessment.actual_mark}}</h6>
                                                                        <b-col v-if="!assessment.actual_mark" sm="3"><b-form-input v-model="received_mark"></b-form-input></b-col>
                                                                    </b-row>
                                                                </b-container>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>  
                                            </div>
                                            <div class="container float-right">
                                                <h5><strong>Memo</strong></h5>
                                                <div class="form-group">
                                                    <textarea class="form-control" id="message" name="message" placeholder="Please enter your notes here..." rows="8"></textarea>
                                                    <!-- Save button for memo -->
                                                    <button class="btn btn-success memo-save">Save</button>
                                                </div> 
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <!-- End assessments accordion -->
                            <div v-else class="row">
                                <div class="card-body">
                                    <span>No assessments, please add an assessment</span>
                                </div>
                            </div> 
                        </div>
                    </div>
                    <!-- End assessment box -->
                </div>
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
                showPendingModal() { this.$refs.Pending_Modal.show() },
                hidePendingModal() { this.$refs.Pending_Modal.hide() },

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
