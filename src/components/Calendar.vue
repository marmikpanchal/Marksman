
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
                        <a class="dropdown-item" href="" v-on:click="goSubject($event)">{{subject.name}}</a>
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
                            <a href="#">Calendar</a>
                        </li>
                    </ol>
                    <!-- End breadcrumbs -->
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
                                    :event-color="date => date[9] % 2 ? 'green' : 'yellow'"
                                    :events="functionEvents"
                                    full-width

                                    ></v-date-picker>
                                </div>
                            </div>
                        </div>
                        <!-- End calendar -->

                        <!-- Due dates list -->
                        <div class="col-lg-5">
                            <div class="card mb-3">
                                <div class="card-header">
                                    <i class="fas fa-fw fa-list"></i>
                                    <strong>Due dates</strong>
                                </div>
                                <div class="card-body">
                                    <div class="todo-list">
                                   
                                       <ul id="sortable" class="list-unstyled" :key="index">
                                            <!-- Example of a todo in list -->
                                            <template >
                                            <li class="ui-state-default">
                                                <div class="checkbox">
                                                    <label>
                                                        <input type="checkbox" :name="index" />&nbsp; Assignment 1 - databases
                                                        
                                                    </label>
                                                    <div class="float-right"> 
                                                        <strong> Due: 3rd Nov 2018</strong>
                                                    </div>
                                                </div>
                                            </li>
                                            </template>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End due dates list -->
                    </div>
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
                goTodo(event) {
                    event.preventDefault();
                    this.$router.push({ name: "todo" });
                },
                goCalendar(event) {
                    event.preventDefault();
                    this.$router.push({ name: "calendar" });
                }, 
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
