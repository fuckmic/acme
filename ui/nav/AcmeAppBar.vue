<template>
	<AcmePaper elevation="4" :sx="setSx">
	</AcmePaper>
</template>

<script>
	import AcmePaper from '../common/AcmePaper.vue';
	import AcmeIcon from '../common/AcmeIcon.vue';
	export default {
		name: "AcmeAppBar",
		components: { AcmePaper, AcmeIcon, },
		computed: {
			setSx() {
				return {
					position: 'fixed',
					bottom: 0,
					left: 0,
					right: 0,
					zIndex: 9, // 引用 z-index 变量
					backgroundImage: 'none'
				}
			},
		},
	}
</script>

<style>
</style>