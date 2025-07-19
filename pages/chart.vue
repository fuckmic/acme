<template>
	<AcmePageContainer>
		<AcmeAppBar />
		<AcmeBottomNav :code="`chart`"></AcmeBottomNav>
	</AcmePageContainer>
</template>

<script>
	import AcmeAppBar from '../ui/nav/AcmeAppBar.vue';
	import AcmeBottomNav from '../ui/nav/AcmeBottomNav.vue';
	export default {
		components: { AcmeBottomNav, AcmeAppBar },
		data() {
			return {
				curKey: `doc`,
			}
		}
	}
</script>

<style>
</style>