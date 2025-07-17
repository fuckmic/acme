<template>
	<AcmePageContainer>
		<AcmeAppBarSub :title="$nav.keys.kline" />
		<AcmeBottomNav :code="`kline`"></AcmeBottomNav>
	</AcmePageContainer>
</template>

<script>
	import AcmeAppBarSub from '../ui/nav/AcmeAppBarSub.vue';
	import AcmeBottomNav from '../ui/nav/AcmeBottomNav.vue';
	export default {
		components: { AcmeBottomNav, AcmeAppBarSub },
		data() {
			return {
				curKey: `doc`,
			}
		}
	}
</script>

<style>
</style>