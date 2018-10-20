
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
                                    <div class="row">
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" placeholder="Do work">
                                        </div>
                                        <div class="col-lg-0">
                                            <button class="btn btn-success todo-add">Add todo</button>
                                        </div>
                                    </div>
                                    <div class="space">
                                        <ul id="sortable" class="list-unstyled">
                                            <!-- Example of a todo in list -->
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
                                        <!-- Todo delete button -->
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



<script>
export default {
            name: 'Subject',
        // components: { Modal },
        data() {
            return {
                subjects: [],
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
                goTodo(event) {
                    event.preventDefault();
                    this.$router.push({ name: "todo" });
                },
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
