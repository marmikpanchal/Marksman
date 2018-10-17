<script></script>

<template>    
    <body id="page-top">
        <!-- Main page -->
        <div id="wrapper">
            <!-- Sidebar -->
            <ul class="sidebar navbar-nav">
                <li class="nav-item active">
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
                        <a class="dropdown-item" href="">COMP2111</a>
                        <a class="dropdown-item" href="">COMP3121</a>
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
                            <a href="#">Dashboard</a>
                        </li>
                        <li class="breadcrumb-item active">Overview</li>
                    </ol>
                    <!-- End breadcrumbs -->
                    <!-- Subjects -->
                    <!-- An example pie -->
                    <div class="row">
                        <div class="col-xl-3 col-sm-6 mb-3">
                            <div class="card-body">
                                <div class="circle-progress" data-percentage="20">
                                    <span class="circle-progress-left">
                                     <span class="circle-progress-bar"></span>
                                 </span>
                                 <span class="circle-progress-right">
                                     <span class="circle-progress-bar"></span>
                                 </span>
                                 <div class="circle-progress-value">
                                     <div>
                                         COMP2111
                                         <span>20/100</span>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
                 <!-- If there are subjects -->
                 <div v-if="subjects.length > 0" class="row">
                    <div v-for="(subject, index) in subjects" class="col-xl-3 col-sm-6 mb-3" :key="index">
                        <div :class="'card text-white ' + colours[index%colours.length] + ' o-hidden h-100'">
                            <div class="card-body">
                                <div class="card-body-icon">
                                    <i class="fas fa-fw fa-comments"></i>
                                </div>
                                <div class="mr-5">{{subject.name}}</div>
                            </div>
                            <a v-on:click="next(subject, $event)" class="card-footer text-white clearfix small z-1" href="">
                                <span class="float-left">View Details</span>
                                <span class="float-right">
                                    <i class="fas fa-angle-right"></i>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- If there aren't subjects-->
                <!-- If there aren't subjects -->
                <div v-else class="row">
                    <div class="card-body">
                        <span>No subjects, please add a subject</span>
                    </div>
                </div>

                <div>
                    <b-button class="mb-3" variant="success" @click="showModal">
                        Add Subject
                    </b-button>
                    <b-modal ref="Modal" hide-footer title="Adding a Subject">
                        <div class="d-block text-center">
                            <h3 style="margin-top: 15px">Fill in the details</h3>
                        </div>
                        <div>
                            <b-container fluid>
                                <b-row class="my-1" :key="type">
                                    <b-col class="mt-5" sm="3"><strong>Subject Name: </strong></b-col>
                                    <b-col class="mt-5" sm="9"><b-form-input v-model="name"></b-form-input></b-col>
                                    <b-col class="mt-3" sm="3"><strong>Goal Mark: </strong></b-col>
                                    <b-col class="mt-3" sm="9"><b-form-input v-model="goal_mark"></b-form-input></b-col>
                                </b-row>
                            </b-container>
                        </div>
                        <b-btn class="mt-5" variant="danger" block @click="hideModal">Cancel</b-btn>
                        <b-btn class = "mt-3" variant="success" block v-on:click="createSubject()">Save Changes</b-btn>
                    </b-modal>
                </div>


                <!-- End subjects -->
                <div class="row">
                    <!-- Calendar -->
                    <div class="col-lg-7">
                        <div class="card mb-3"> 
                            <div class="card-header">Calendar</div>
                            <div class="card-body">
                                <v-date-picker
                                v-model="date2"
                                :event-color="date => date[9] % 2 ? 'green' : 'yellow'"
                                :events="functionEvents"
                                full-width

                                ></v-date-picker>
                            </div>
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
                                            <li v-for="(task, index) in tasks" :key="index"><label>
                                                <input type="checkbox"><i :class="colours[index%colours.length]"></i><span>{{task.task_description}}</span>
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
        <!-- Footer
        <footer class="sticky-footer">
            <div class="container my-auto">
                <div class="copyright text-center my-auto">
                    <span>Copyright © Marksman 2018</span>
                </div>
            </div>
        </footer> -->
        <!-- End footer -->   
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
                date2: null
            };
        },
        methods: {
            next(subject, event) {
                event.preventDefault();

                this.$emit("subject_id", subject.id);
                this.$emit("subject_name", subject.name);
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
            getInfo() {
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
            functionEvents (date) {
                const [,, day] = date.split('-')
                return parseInt(day, 10) % 3 === 0
            } 
        },
        mounted() {
            this.getInfo();
            this.arrayEvents = [...Array(6)].map(() => {
                const day = Math.floor(Math.random() * 30)
                const d = new Date()
                d.setDate(day)
                return d.toISOString().substr(0, 10)
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
