<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <div>
            <b-navbar-brand href="#"><router-link to="/" class="text-white">Sizer</router-link></b-navbar-brand>
            <b-navbar-brand href="#"><small>| {{$attrs.navTitle}}</small></b-navbar-brand>
        </div>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="#" class="text-center text-white"><router-link to="/modelling">Modelling</router-link></b-nav-item>
                <b-nav-item href="#" class="text-center text-white"><router-link to="/measurement">Measurement</router-link></b-nav-item>
                <b-nav-item href="#" class="text-center text-white"><router-link to="/angle">Angle</router-link></b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto"></b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
    props: {
        navTitle: {
            type: String
        }
    }
}