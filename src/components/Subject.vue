
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
                        <a class="dropdown-item" href="" v-on:click="next(subject, $event)">{{subject.name}}</a>
                    </div>
                </li> 
                <li class="nav-item">
                    <a class="nav-link" href="" v-on:click="goCalendar($event)">
                        <i class="fas fa-fw fa-table"></i>
                        <span>Calendar</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="" v-on:click="goTodo($event)">
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
                            <div class="nav-item dropdown" style="float:right">
                                <a class="fa fa-cog nav-link dropdown-toggle" id="pagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                </a>
                                <div class="dropdown-menu" aria-labelledby="pagesDropdown" :key="index">
                                    <a class="dropdown-item" @click="showSubjectEditModal">Edit subject</a>
                                    
                                    <a class="dropdown-item">Hide subject</a>
                                    <a class="dropdown-item" @click="showSubjectDeleteModal">Delete subject</a>
                                </div>
                            </div> 
                        </div>
                        <div class="card-body">
                            <div class = "alert alert-info"><strong>Goal mark: {{this.$parent.subject_goal_mark}}</strong>
                                <br><br>
                                <p v-if="subjects.actual_mark - this.$parent.subject_goal_mark > 0">
                                    You are currently {{Math.round((this.$parent.subject_goal_mark - marks.curr_total) * 100) / 100}} marks passed your goal!
                                </p>
                                <p v-else>
                                    You are currently {{Math.round((this.$parent.subject_goal_mark - marks.curr_total) * 100) / 100}} marks away from your goal!
                                </p>
                            </div>
                            <br>
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
                    <!-- Subject memo -->
                    <div class="card mb-3">
                        <div class="card-header">
                            <i class="fas fa-fw  fa-list"></i>
                            <strong>Memo</strong>&nbsp&nbsp<button data-tooltip="Write down any notes you have for this subject"><i class="fa fa-question-circle"></i></button>
                             
                        </div>
                        <div class="card-body">
                            <div class="form-group">
                                <b-form-textarea class="form-control" v-model="this.$parent.memo" id="message" name="message" placeholder="Please enter your notes here..." rows="8"><!--{{subject.memo}}--></b-form-textarea>
                                <!-- Save button for memo -->
                                <button v-on:click="updateSubjectMemo(this.$parent)" class="btn btn-success memo-save">Save</button>
                            </div>
                        </div>
                    </div>
                    <!-- End subject memo -->
                   
                
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
                                                <b-col class="mt-3" sm="9"><b-form-input v-model="pending_name" placeholder="Assignment 1 - databases"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Total mark: </strong></b-col>
                                                <b-col class="mt-3" sm="9"><b-form-input v-model="pending_total_mark" placeholder="30"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Goal mark: </strong></b-col>
                                                <b-col class="mt-3" sm="9"><b-form-input v-model="pending_goal_mark" placeholder="25"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Weighting mark: </strong></b-col>
                                                <b-col class="mt-3 mb-3" sm="9"><b-form-input v-model="pending_weight" placeholder="20%"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Estimated hours til completion: </strong></b-col>
                                                <b-col class="mt-3 mb-3" sm="9"><b-form-input v-model="pending_time_required" type="hours" placeholder="3"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Due date: </strong></b-col>
                                                <b-col class="mt-3 mb-3" sm="9"><b-form-input v-model="pending_due_date" type="date"></b-form-input></b-col>
                                            </b-row>
                                        </b-container>
                                    </div>
                                    <b-btn class="mt-5" variant="danger" block @click="hideModal">Cancel</b-btn>
                                    <b-btn class = "mt-3" variant="success" block v-on:click="createPendingAssessment()">Save Changes</b-btn>
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
                                    <b-btn class = "mt-3" variant="success" block v-on:click="createFinishedAssessment()">Save Changes</b-btn>
                                </b-modal>
                            </div>
                            <!-- End add finished assessment modal -->
                            <!-- Assessments accordion -->
                            <div v-if="assessments.length > 0" class="accordion vertical">
                                <ul v-for="(assessment, index) in assessments" :key="index">
                                    <li>
                                        <input type="checkbox" :id="'checkbox-' + index" name="checkbox-accordion" />
                                        <label :for="'checkbox-' + index" style="height:60px">{{assessment.name}}
                                            <b-button  @click="showAssessDeleteModal"  class="mb-3 btn btn-danger float-right-delete">Delete</b-button>
                                            <b-button class="mb-3 btn btn-warning float-right-delete">Hide</b-button>
                                            <b-button @click="showEditAssessModal" class="mb-3 btn btn-primary float-right-delete">Edit</b-button>
                                        </label>
                                        <!-- Edit assessment modal -->
                                        
                                        <!-- End delete subject modal -->
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
                                                                        <b-col v-if="!assessment.actual_mark" sm="3"><b-form-input v-model="actual_marks[index]"></b-form-input></b-col>
                                                                        <button v-if="!assessment.actual_mark" v-on:click="updateAssessment(assessment, index)" class="btn btn-success">Save</button>
                                                                    </b-row>
                                                                </b-container>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr v-if="assessments.time_required">
                                                        <td><h6>Hours required: {{assessment.time_required}}</h6></td>
                                                    </tr>
                                                    <tr v-if="assessments.due_date">
                                                        <td><h6>Due date: {{assessment.due_date}}</h6></td>
                                                    </tr>
                                                </table>  
                                            </div>
                                            <div class="container float-right">
                                                <h5><strong>Memo</strong></h5>
                                                <div class="form-group">
                                                    <b-form-textarea class="form-control" v-model="memos[index]" id="message" name="message" placeholder="Please enter your notes here..." rows="8">{{assessment.memo}}</b-form-textarea>
                                                    <!-- Save button for memo -->
                                                    <button v-on:click="updateAssessment(assessment, index)" class="btn btn-success memo-save">Save</button>
                                                </div> 
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <!-- End assessments accordion -->
                            <div v-else class="row">
                                <div class="card-body">
                                    <div class = "alert alert-danger">No assessments, please add an assessment</div>
                                </div>
                            </div> 
                        </div>
                    </div>
                    <!-- End assessment box -->  
                    <!-- Edit subject modal doesn't work when it's in button -->    
                    <b-modal ref="Edit_Subject_Modal" hide-footer title="Edit Subject">
                        <div class="d-block text-center">
                            <h4 style="margin-top: 15px">Edit the details</h4>
                        </div>
                        <div>
                            <b-container fluid>
                                <b-row class="my-1" :key="type">
                                    <b-col class="mt-3" sm="3"><strong>Name: </strong></b-col>
                                    <b-col class="mt-3" sm="9"><b-form-input v-model="name" :placeholder=this.$parent.subject_name></b-form-input></b-col>
                                    <b-col class="mt-3" sm="3"><strong>Goal mark: </strong></b-col>
                                    <b-col class="mt-3" sm="9"><b-form-input v-model="goal_mark" :placeholder=this.$parent.goal_mark></b-form-input></b-col>
                                </b-row>
                            </b-container>
                        </div>
                        <b-btn class="mt-5" variant="danger" block @click="hideSubjectEditModal">Cancel</b-btn>
                        <b-btn class = "mt-3" variant="success" block  v-on:click="editSubject(this.$parent)">Save Changes</b-btn>
                    </b-modal>
                    <!-- End edit subject modal -->  
                    <!-- Delete subject modal -->
                    <b-modal ref="Delete_Modal" hide-footer title="Delete Subject">
                        <div class="d-block text-center">
                            <h4 style="margin-top: 15px">Delete subject?</h4>
                            This will delete it forever
                        </div>
                        <b-btn class="mt-5" variant="danger" block @click="hideSubjectDeleteModal">Cancel</b-btn>
                        <b-btn class = "mt-3" variant="success" block v-on:click="deleteSubject(this.$parent)">Yes, delete it</b-btn>
                    </b-modal>
                    <!-- End delete subject modal -->
                    

                    <!-- End edit assessment modal -->  
                    <!-- Delete assessment modal -->
                    <b-modal ref="Assess_Delete_Modal" hide-footer title="Delete Assessment">
                        <div class="d-block text-center">
                            <h4 style="margin-top: 15px">Delete assessment?</h4>
                            This will delete it forever
                        </div>
                        <b-btn class="mt-5" variant="danger" block @click="hideAssessDeleteModal">Cancel</b-btn>
                        <b-btn class = "mt-3" variant="success" block v-on:click="deleteAssessment(assessment)">Yes, delete it</b-btn>
                    </b-modal>
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
                    marks: {},
                    pending_name: '',
                    pending_total_mark: '',
                    pending_goal_mark: '',
                    pending_weight: '',
                    pending_time_required: '',
                    pending_due_date: '',
                    memos: [],
                    actual_marks: []
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
                goTodo(event) {
                    event.preventDefault();
                    this.$router.push({ name: "todo" });
                },
                goCalendar(event) {
                    event.preventDefault();
                    this.$router.push({ name: "calendar" });
                },
                showModal() { this.$refs.Modal.show() },
                hideModal() { this.$refs.Modal.hide() },
                showPendingModal() { this.$refs.Pending_Modal.show() },
                hidePendingModal() { this.$refs.Pending_Modal.hide() },
                showSubjectEditModal() { this.$refs.Edit_Subject_Modal.show() },
                hideSubjectEditModal() { this.$refs.Edit_Subject_Modal.hide() },
                showSubjectDeleteModal() { this.$refs.Delete_Modal.show() },
                hideSubjectDeleteModal() { this.$refs.Delete_Modal.hide() },
                showEditAssessModal() { this.$refs.Edit_Assess_Modal.show() },
                hideEditAssessModal() { this.$refs.Edit_Assess_Modal.hide() },
                showAssessDeleteModal() { this.$refs.Assess_Delete_Modal.show() },
                hideAssessDeleteModal() { this.$refs.Assess_Delete_Modal.hide() },
                createPendingAssessment() {
                    const name = this.pending_name;
                    const total_mark = this.pending_total_mark;
                    const actual_mark = null;
                    const goal_mark = this.pending_goal_mark;
                    const weight = this.pending_weight;
                    const time_required = this.pending_time_required;
                    const due_date = this.pending_due_date;
                    const memo = '';

                    fetch(`http://localhost:8081/assessments`, {
                        method: 'POST',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            subject_id: this.$parent.subject_id,
                            name,
                            total_mark,
                            actual_mark,
                            goal_mark,
                            weight,
                            time_required,
                            due_date,
                            memo,
                        })
                    }).then(response => {
                        this.hideModal()
                        this.getInfo();
                    })
                },
                createFinishedAssessment() {
                    const name = this.name;
                    const total_mark = this.total_mark;
                    const actual_mark = this.actual_mark;
                    const goal_mark = this.goal_mark;
                    const weight = this.weight;
                    const time_required = null;
                    const due_date = null;
                    const memo = '';
                    fetch(`http://localhost:8081/assessments`, {
                        method: 'POST',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            subject_id: this.$parent.subject_id,
                            name,
                            total_mark,
                            actual_mark,
                            goal_mark,
                            weight,
                            time_required,
                            due_date,
                            memo,
                        })
                    }).then(response => {
                        this.hideModal()
                        this.getInfo();
                    })
                },
                editAssessment(assessment, index) {
                    const memo = memos[index];
                    const id = assessment.id;
                    const name = this.assessment.name;
                    const total_mark = this.assessment.total_mark;
                    const actual_mark = this.actual_marks[index];
                    const goal_mark = this.assessment.goal_mark;
                    const weight = this.assessment.weight;
                    const time_required = this.assessment.time_required;
                    const due_date = this.assessment.due_date;
                    fetch(`http://localhost:8081/assessments`, {
                        method: 'PUT',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            id,
                            name,
                            total_mark,
                            actual_mark,
                            goal_mark,
                            weight,
                            time_required,
                            due_date,
                            memo,
                        })
                    }).then(response => {
                        this.getInfo();
                    })
                },
                updateAssessment(assessment, index) {
                    const memo = this.memos[index];
                    const id = assessment.id;
                    const name = assessment.name;
                    const total_mark = assessment.total_mark;
                    const actual_mark = this.actual_marks[index];
                    const goal_mark = assessment.goal_mark;
                    const weight = assessment.weight;
                    const time_required = assessment.time_required;
                    const due_date = assessment.due_date;
                    fetch(`http://localhost:8081/assessments`, {
                        method: 'PUT',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            id,
                            name,
                            total_mark,
                            actual_mark,
                            goal_mark,
                            weight,
                            time_required,
                            due_date,
                            memo,
                        })
                    }).then(response => {
                        this.getInfo();
                    })
                },
                deleteAssessment(assessment) {
                    const id = assessment.id;
                    fetch(`http://localhost:8081/assessments/${id}`, {
                        method: 'DELETE'
                    }).then(response => {
                        if (response.status === 200) {
                            this.getInfo();                                                       
                        } else {
                            console.log("Cannot retrieve assessments");
                        }
                    })
                },
                editSubject(subject) {
                    const id = subject.id;
                    const name = this.subject.name;
                    const goal_mark = this.subject.goal_mark;
                    const memo = subject.memo;
                    fetch(`http://localhost:8081/subject`, {
                        method: 'PUT',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            id,
                            name,
                            goal_mark,
                            memo,
                        })
                    }).then(response => {
                        this.getInfo();
                    })
                },
                updateSubjectMemo(subject) {
                    const id = subject.id;
                    const name = subject.name;
                    const goal_mark = subject.goal_mark;
                    const memo = this.subject.memo;
                    fetch(`http://localhost:8081/subject`, {
                        method: 'PUT',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            id,
                            name,
                            goal_mark,
                            memo,
                        })
                    }).then(response => {
                        this.getInfo();
                    })
                },
                deleteSubject(subject) {
                    const id = subject.id;
                    fetch(`http://localhost:8081/subject/${id}`, {
                        method: 'DELETE'
                    }).then(response => {
                        if (response.status === 200) {
                            this.getInfo();                                                       
                        } else {
                            console.log("Cannot retrieve assessments");
                        }
                    })
                },
                getInfo() {
                    fetch(`http://localhost:8081/assessments/${this.$parent.subject_id}`, {
                        method: 'GET',
                    }).then(response => {
                        if (response.status === 200) {
                            response.json().then(assessments => {
                                    this.assessments = assessments
                                    assessments.forEach((assessment) => {
                                        this.memos.push(assessment.memo);
                                        this.actual_marks.push(assessment.actual_mark);
                                    });
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
