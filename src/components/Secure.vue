<script></script>

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
                            <a href="#">Dashboard</a>
                        </li>
                        <li class="breadcrumb-item active">Overview</li>
                    </ol>
                    <!-- End breadcrumbs -->
                    <!-- Subjects -->
                    <div class="card mb-3">
                        <div class="card-header">
                            <i class="fas fa-fw fa-chart-area"></i>
                            <strong>Subjects</strong>
                        </div>
                        <!-- An example pie -->
                        <div class="card-body">
                            <div v-if="subjects.length > 0" class="row">
                                <div v-for="(subject, index) in subjects" class="col-xl-3 col-sm-6 mb-3" :key="index">
                                    <a v-on:click="next(subject, $event)" href=""> 
                                        <div class="card-body">
                                            <div class="circle-progress" :data-percentage="subject.total">
                                                <span class="circle-progress-left">
                                                 <span class="circle-progress-bar"></span>
                                             </span>
                                             <span class="circle-progress-right">
                                                 <span class="circle-progress-bar"></span>
                                             </span>
                                             <div class="circle-progress-value">
                                                 <div>
                                                     {{subject.name}}
                                                     <span>{{Math.round(subject.curr_total * 100) / 100}}/100</span>
                                                 </div>
                                             </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <!-- End pie -->
                            <!-- If there aren't subjects -->
                            <div v-else class="row">
                                <div class="card-body">
                                    <div class = "alert alert-danger">No subjects, please add a subject</div>
                                </div>
                            </div> 
                            <!-- Add subject modal -->
                            <div>
                                <b-button class="mb-3" variant="success" @click="showModal">
                                    Add Subject
                                </b-button>
                                <b-modal ref="Modal" hide-footer title="Adding a Subject">
                                    <div class="d-block text-center">
                                        <h4 style="margin-top: 15px">Fill in the details
                                            <button data-tooltip="Add current subjects for semester"><i class="fa fa-question-circle"></i></button>
                                        </h4>
                                    </div>
                                    <div>
                                        <b-container fluid>
                                            <b-row class="my-1" :key="type">
                                                <b-col class="mt-5" sm="3"><strong>Subject name: </strong></b-col>
                                                <b-col class="mt-5" sm="9"><b-form-input v-model="name" placeholder="COMP4920"></b-form-input></b-col>
                                                <b-col class="mt-3" sm="3"><strong>Overall goal mark: </strong></b-col>
                                                <b-col class="mt-3" sm="9"><b-form-input v-model="goal_mark" placeholder="60"></b-form-input></b-col>
                                            </b-row>
                                        </b-container>
                                    </div>
                                    <b-btn class="mt-5" variant="danger" block @click="hideModal">Cancel</b-btn>
                                    <b-btn class = "mt-3" variant="success" block v-on:click="createSubject()">Save Changes</b-btn>
                                </b-modal>
                            </div>
                            <!-- End add subject modal -->
                        </div>
                    </div>
                    <!-- End subjects -->

                    <div class="row">
                        <!-- Calendar -->
                        <div class="col-lg-7">
                            <div class="card mb-3">
                                <div class="card-header">
                                    <i class="fas fa-fw fa-table"></i>
                                    <strong>Calendar</strong>
                                </div>
                                <div class="card-body">
                                    <v-date-picker
                                    v-model="date2"
                                    :event-color="date => date[9] % 2 ? 'green' : 'red'"
                                    :events="arrayEvents"
                                    full-width

                                    ></v-date-picker>
                                </div>
                            </div>
                        </div>
                        <!-- End calendar -->

                        <!-- To-do list -->
                        <div class="col-lg-5">
                            <div class="card mb-3">
                                <div class="card-header">
                                    <i class="fas fa-fw fa-list"></i>
                                    <strong>To-Do List</strong>
                                </div>
                                <div class="card-body">
                                    <div class="todo-list">
                                        <ul v-for="(task, index) in tasks" id="sortable" class="list-unstyled" :key="index">
                                            <!-- Example of a todo in list -->
                                            <template v-if="!task.complete">
                                            <li class="ui-state-default">
                                                <div class="checkbox">
                                                    <label>
                                                        <input v-on:click="setComplete(task, $event)" type="checkbox" :name="index" />&nbsp;{{task.task_description}}</label>
                                                        <br>
                                                </div>
                                            </li>
                                            <br>
                                            </template>
                                        </ul>
                                        <div class="row">
                                            <div class="col-lg-9">
                                                <input v-model="task_description" type="text" class="form-control" placeholder="Do work">
                                            </div>
                                            <div class="col-lg-0">
                                                <button v-on:click="createTask()" class="btn btn-success todo-add">Add todo</button>
                                            </div>
                                        </div>  
                                    </div>
                                    <br>
                                </div>
                            </div>
                        </div>
                        <!-- End to-do list -->
                    </div>
                </div>
            </div>     
        </div>
    </body>
</template>

<script>
    export default {
        name: 'Secure',
        data() {
            return {
                subjects: [],
                tasks: [],
                colours: [
                "bg-primary",
                "bg-warning",
                "bg-success",
                "bg-danger"
                ],
                name: '',
                goal_mark: 0,
                component: 0,
                arrayEvents: null,
                date1: null,
                date2: null,
                marks: []
            };
        },
        methods: {
            next(subject, event) {
                event.preventDefault();

                this.$emit("subject_id", subject.id);
                this.$emit("subject_name", subject.name);
                this.$emit("subject_goal", subject.goal_mark);
                console.log("TRYING TO DEBUG");
                console.log(subject);
                console.log(subject.id); // this works
                this.$router.push({ name: "subject" });
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
           createSubject() {
               fetch(`http://localhost:8081/subjects`, {
                   method: 'POST',
                   headers: {"Content-Type": "application/json"},
                   body: JSON.stringify({
                       user_id: this.$parent.user_id,
                       name: this.name,
                       goal_mark: this.goal_mark
                   })
               }).then(response => {
                   this.hideModal()
                   this.getInfo();
               })
           },
           createTask() {
                    const task_description = this.task_description;
                    const complete = false;
                    const user_id = this.$parent.user_id;
                    fetch(`http://localhost:8081/tasks`, {
                        method: 'POST',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            user_id,
                            complete,
                            task_description
                        })
                    }).then(response => {
                        if (response.status === 201) {
                            this.task_description = '';
                           this.getInfo();                      
                        } else {
                            console.log("Cannot");
                        }
                    });
                },
            setComplete(task, event) {
                    event.preventDefault();
                    const task_description = task.task_description;
                    const complete = true;
                    const id = task.id;
                    fetch(`http://localhost:8081/tasks`, {
                        method: 'PUT',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            id,
                            complete,
                            task_description
                        })
                    }).then(response => {
                        if (response.status === 200) {
                           this.getInfo();
                                               
                        } else {
                            console.log("Cannot retrieve assessments");
                        }
                    });
                },
            getInfo() {
                console.log("info")
                fetch(`http://localhost:8081/subjects/${this.$parent.user_id}`, {
                        method: 'GET',
                    }).then(response => {
                        if (response.status === 200) {
                            response.json().then(subs => {
                                this.subjects = subs;
                            });                           
                        } else {
                            console.log("Cannot retrieve subjects");
                        }
                    });
                fetch(`http://localhost:8081/tasks/${this.$parent.user_id}`, {
                        method: 'GET',
                    }).then(response => {
                        if (response.status === 200) {
                            response.json().then(tasks => {
                                this.tasks = tasks;
                            });                           
                        } else {
                            console.log("Cannot retrieve tasks");
                        }
                });
           
            
           },
       
        },
        mounted() {
            this.getInfo();
            this.arrayEvents = [...Array(6)].map(() => {
                assessments.forEach((assessment) => {
                    if (assessment.due_date) {
                        const d = new Date(assessment.due_date)
                        return d.toISOString().substr(0, 10)
                    }
                })
        })
    }
}
</script>

<style>
.modal-dialog {
    margin-top: 150px;
    width: auto;
    pointer-events: none;
}

.col-centered{
    float: none;
    margin: 0 auto;
}

</style>

<style src= "../assets/vendor/bootstrap/css/bootstrap.min.css" scoped></style>
<style src= "../assets/vendor/fontawesome-free/css/all.min.css" scoped></style>
<style src= "../assets/vendor/datatables/dataTables.bootstrap4.css" scoped></style>
<style src= "../assets/css/sb-admin.css" scoped></style>
