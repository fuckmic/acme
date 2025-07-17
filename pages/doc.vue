<template>
	<AcmePageContainer>
		<AcmeAppBarSub :title="$nav.keys.doc" />
		<AcmeBottomNav :code="`doc`"></AcmeBottomNav>
		<view style="padding: 160rpx 40rpx;">
			<AcmeIconSearch :size="128" />
		</view>
	</AcmePageContainer>
</template>

<script>
	import AcmeAppBarSub from '../ui/nav/AcmeAppBarSub.vue';
	import AcmeBottomNav from '../ui/nav/AcmeBottomNav.vue';
	import AcmeIconSearch from '../ui/icons/AcmeIconSearch.vue';
	export default {
		components: { AcmeBottomNav, AcmeAppBarSub, AcmeIconSearch },
		data() {
			return {
				curKey: `doc`,
			}
		}
	}
</script>

<style>
</style>