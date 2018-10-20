
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
                                            <input v-model="task_description" type="text" class="form-control" placeholder="Do work">
                                        </div>
                                        <div class="col-lg-0">
                                            <button v-on:click="createTask()" class="btn btn-success todo-add">Add todo</button>
                                        </div>
                                    </div>
                                    <div class="space">
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
                                    <ul id="done-items" class="list-unstyled" v-for="(task, index) in tasks" :key="index">
                                        <!-- Todo delete button -->
                                        <template v-if="task.complete">
                                            <li>{{task.task_description}} <button v-on:click="deleteTask(task)" class="remove-item btn btn-default btn-xs right-pull"><span class="fa fa-trash"></span></button></li>
                                        </template>
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
                tasks: [],
                task_description: ''
                };
            },
            methods: {
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
                deleteTask(task) {
                    fetch(`http://localhost:8081/tasks/${task.id}`, {
                        method: 'DELETE',
                    }).then(response => {
                        if (response.status === 200) {
                            this.getInfo();                       
                        } else {
                            console.log("Cannot retrieve assessments");
                        }
                    });
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
                    fetch(`http://localhost:8081/tasks/${this.$parent.user_id}`, {
                        method: 'GET',
                    }).then(response => {
                        if (response.status === 200) {
                            response.json().then(tasks => {
                                    this.tasks = tasks;
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
