<template>
	<AcmePageContainer>
		<AcmeBottomNav :code="`doc`"></AcmeBottomNav>
	</AcmePageContainer>
</template>

<script>
	import AcmeBottomNav from '../ui/nav/AcmeBottomNav.vue';
	export default {
		components: { AcmeBottomNav },
		data() {
			return {
				curKey: `doc`,
			}
		}
	}
</script>

<style>
</style>