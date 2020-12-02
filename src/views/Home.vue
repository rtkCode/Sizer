<template>
	<div class="content d-flex flex-column align-items-center justify-content-between cos-bg-dark">
		<div class="ruler"></div>
		<div class="d-flex flex-column align-items-center p-4 justify-content-center">
			<h1 class="title cos-color-light">S<svg t="1605440063912" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3134" width="50" height="64"><path d="M341.31456 68.33152l0.06144 887.43936c0 37.51936 30.64832 68.16768 68.3008 68.16256l204.70272 0.06656c37.51936 0 68.33152-30.67904 68.3008-68.16256l0.00512-887.50592C682.6496 30.77632 651.93472 0.06656 614.41536 0.06656L409.64608 0c-37.68832 0.03072-68.27008 30.80704-68.33152 68.33152z m146.29888 809.37472v48.76288l-121.856-0.03072v-48.768l121.856 0.03584z m97.53088-97.536v48.76288H365.72672l-0.03072-48.7936 219.44832 0.03072z m-97.536-97.536v48.76288l-121.88672 0.06656v-48.82432l121.88672-0.00512z m0.00512-97.53088l-0.00512 48.75776-121.81504 0.00512-0.03072-48.79872 121.85088 0.03584z m97.50016-97.50528v48.76288l-219.35616 0.00512v-48.768h219.35616zM487.61344 390.09792v48.76288H365.79328V390.0928h121.82016z m0.03072-97.50016v48.76288H365.75744v-48.768h121.88672z m97.536-97.536l-0.03584 48.79872-219.38688-0.0256-0.03072-48.79872 219.45344 0.0256z m-97.536-97.46432l0.00512 48.76288-121.88672-0.06144 0.03072-48.73728 121.85088 0.03584z" fill="#d2d2d2" p-id="3135"></path></svg>zer</h1>
			<p class="cos-color-light">Project virtual items to reality in real proportions</p>

			<b-overlay :show="loading1" rounded opacity="0.6" spinner-small spinner-variant="secondary" class="d-inline-block home-button mt-1">
				<b-button :disabled="loading1" size="lg" class="cos-bg-lightblue cos-color-gray border-0 w-100" @click="route1('Modelling')">Modelling</b-button>
			</b-overlay>

			<b-overlay :show="loading2" rounded opacity="0.6" spinner-small spinner-variant="secondary" class="d-inline-block home-button mt-3">
				<b-button :disabled="loading2" size="lg" class="cos-bg-lightblue cos-color-gray border-0 w-100" @click="route2('Measurement')">Measurement</b-button>
			</b-overlay>

			<b-overlay :show="loading3" rounded opacity="0.6" spinner-small spinner-variant="secondary" class="d-inline-block home-button mt-3">
				<b-button :disabled="loading3" size="lg" class="cos-bg-lightblue cos-color-gray border-0 w-100" @click="route3('Angle')">Angle</b-button>
			</b-overlay>

		</div>
		<div class="ruler reverse"></div>
	</div>
</template>

<script>
export default {
  	name: 'Home',

  	data(){
		return{
			loading1: false,
			loading2: false,
			loading3: false,
		}
	},

	mounted() {
		this.$$global.adjustHeight();
	},

  	methods: {
		route1(name){
			this.loading1=true;
			this.$router.push({ name: name});
		},

		route2(name){
			this.loading2=true;
			this.$router.push({ name: name});
		},

		route3(name){
			this.loading3=true;
			this.$router.push({ name: name});
		}
  	}
}
</script>

<style scoped>
.home-button{
	width: 70%;
}

h1{
	font-size: 100px;
}

.title{
	letter-spacing: 2px;
}

.ruler{
    background: url('../assets/img/ruler.png') center center no-repeat;
	height: 25px;
	width: 100%;
}

.reverse{
	transform: rotate(180deg);
}
</style>
