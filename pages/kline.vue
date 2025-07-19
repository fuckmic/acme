<template>
	<AcmePageContainer>
		<AcmeAppBar />
		<BottomNav :code="$nav.keys.kline" />
	</AcmePageContainer>
</template>

<script>
	import AcmeAppBar from '../ui/nav/AcmeAppBar.vue';
	import BottomNav from '../components/BottomNav.vue';
	export default {
		components: { BottomNav, AcmeAppBar },
		data() {
			return {}
		}
	}
</script>

<style>
</style>