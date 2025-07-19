<template>
	<AcmePageContainer>
		<AcmeAppBar />
		<AcmeBottomNav :code="`kline`"></AcmeBottomNav>
	</AcmePageContainer>
</template>

<script>
	import AcmeAppBar from '../ui/nav/AcmeAppBar.vue';
	import AcmeBottomNav from '../ui/nav/AcmeBottomNav.vue';
	export default {
		components: { AcmeBottomNav, AcmeAppBar },
		data() {
			return {}
		}
	}
</script>

<style>
</style>