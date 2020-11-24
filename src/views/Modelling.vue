<template>
    <div class="cos-bg-dark">
		<header><Header :navTitle="'Modelling'"></Header></header>
		<div class="content">
			<div class="d-flex flex-column justify-content-center mt-3">
				<div class="p-4">
					<p class="text-left cos-color-light">Enter the size of the item</p>

					<b-input-group class="my-3 bg-dark" size="lg" prepend="width" append="cm">
						<b-form-input v-model="width" type="number" id="width" placeholder="width"></b-form-input>
					</b-input-group>

					<b-input-group class="my-3" size="lg" prepend="length" append="cm">
						<b-form-input v-model="length" type="number" id="length" placeholder="length"></b-form-input>
					</b-input-group>

					<b-input-group class="my-3" size="lg" prepend="height" append="cm">
						<b-form-input v-model="height" type="number" id="height" placeholder="height"></b-form-input>
					</b-input-group>

					<b-overlay :show="loading" rounded opacity="0.6" spinner-small spinner-variant="secondary" style="width: 100%" class="d-inline-block mr-1 mt-3">  
						<b-button :disabled="loading" size="lg" class="border-0 cos-bg-lightblue cos-color-gray" block @click="showScene()">Start Modelling</b-button>
					</b-overlay>
				</div>
			</div>

			<div class="d-flex flex-column mt-1 px-4">
				<b-link v-b-toggle.collapse-a class="text-left text-secondary">View modelling history</b-link>
				<b-collapse id="collapse-a" class="mt-2">
					<b-card no-body>
						<b-list-group flush>
							<b-list-group-item v-for="(h,i) in history.slice().reverse()" v-bind:key="i" class="d-flex justify-content-between align-items-center bg-dark">
								<div>
									<b-badge>{{h.type}}</b-badge>
									<span class="ml-3 cos-color-light">{{h.date}}</span>
								</div>
								<b-button-group size="sm">
									<b-button v-show="h.type=='Modelling'" variant="secondary" @click="edit(h.data)">Edit</b-button>
									<b-button variant="success" @click="project(h.data)" class="cos-bg-success">Project!</b-button>
								</b-button-group>
							</b-list-group-item>
						</b-list-group>
					</b-card>
				</b-collapse>
			</div>
		</div>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
    name: 'Modelling',
    data() {
      return {
        length: 10,
        width: 10,
        height: 10,
		loading: false,
		history: []
      }
    },

    components: {
      	Header,
	},
	
	mounted(){
		this.history = this.$$history.read();
		this.$$global.adjustHeight();
	},

    methods:{
      	showScene(){
			this.loading=true;
			this.$router.push({ name: "BuildScene" ,query:{ 
				length: this.length,
				width: this.width,
				height: this.height
			}});
		},

		project(data){
            this.$router.push({ name: "ProjectScene" ,query:{ data: data }});
		},
		
		edit(data){
			this.$router.push({ name: "BuildScene" ,query:{ history: data }});
		}

    }
}
</script>

<style scoped>
.input-group-text{
	background: #b9cfda !important;
	color: #4e5055;
}

.form-control{
	background: #343a40 !important;
	color: #c5c5c5 !important;
}
</style>