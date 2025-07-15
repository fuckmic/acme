<template>
	<view>
		<view style="padding: 16px;
		border-radius: 8px;
		background-color: #121212;">
			<view v-for="(v,k) in [0,1,2,3,4,5,6,7,8,9]" :key="k" style="    background-color: #121212;
		color: #fff;
		-webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
		transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
		border-radius: 4px;
		font-weight: 400;
		font-size: 0.875rem;
		line-height: 60px;
		letter-spacing: 0.01071em;
		text-align: center;
		color: rgba(255, 255, 255, 0.7);margin-bottom: 40rpx;
		height: 60px;"
				:style="{boxShadow:`var(--acme-shadow-elevation-${v})`,backgroundImage:`var(--acme-overlay-elevation-${v})`}">
				{{`--acme-shadow-`+v}}
			</view>
		</view>

		<view style="padding: 16px;
		border-radius: 8px;
		background-color: #FFF;">
			<view v-for="(v,k) in [0,1,2,3,4,5,6,7,8,9]" :key="k" style="background-color: #fff;
		color: rgba(0, 0, 0, 0.87);
		-webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
		transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
		border-radius: 4px;
		font-weight: 400;
		font-size: 0.875rem;
		line-height: 60px;
		letter-spacing: 0.01071em;
		text-align: center;
		color: rgba(0, 0, 0, 0.6);margin-bottom: 40rpx;
		height: 60px;" :style="{boxShadow:`var(--acme-shadow-elevation-${v})`}">
				{{`--acme-shadow-`+v}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Elevation",
	}
</script>

<style>
</style>