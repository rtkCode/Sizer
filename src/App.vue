<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.router-link-exact-active{
	color: #c5c5c5 !important;
}

a{
	color: #c5c5c5 !important;
}

.cos-color-light{
  	color: #c5c5c5 !important;
}

.cos-color-gray{
  	color: #4e5055 !important;
}

.cos-bg-dark{
	background: #29292c !important;
}

.cos-bg-light{
  	background: #c5c5c5 !important;
}

.cos-bg-lightblue{
  	background: #b9cfda !important;
}

.cos-bg-success{
  	background: #085734 !important;
	border: 0 !important;
}

.cos-color-danger{
  	color: #952c2d !important;
}
</style>
