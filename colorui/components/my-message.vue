<template>
	<view :class="[site,'content',hide?'hidden':'']">
		<block v-for="item in messageList" :key="item.id">
			<view>
				<view class="message mask radius shadow shadow-lg" :class="[item.animation,item.bgClass]">
					<text class="msg-text">{{item.content}}</text>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	// 需要支持的单独配置项：显示时长、是否启用背景、类型、内容
	export default {
		props: {
			duration: {
				type: Number,
				default: 2000
			},
			site: {
				type: String,
				default: 'left'
			},
			animation: {
				type: String,
				default: 'anim-slide-right-in'
			},
			animationOut: {
				type: String,
				default: 'anim-slide-right-out'
			},
			hide: {
				type: Boolean,
				default: false
			},
			

		},
		computed: {

		},
		data() {
			return {
				messageList: [],
				total: 0,
				audio_1: 'data:audio/mpeg;base64,SUQzBAAAAAAAP1REUkMAAAASAAADMjAxOS0xMi0yOSAxNDowMQBUU1NFAAAADwAAA0xhdmY1Ny40MS4xMDAAAAAAAAAAAAAAAP/7UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEluZm8AAAAPAAAAIQAAG8AADg4OFhYWHh4eJSUlLS0tNDQ0PDw8Q0NDS0tLUlJSWlpaYWFhaWlpcHBweHh4f39/h4eHj4+PlpaWnp6epaWlra2ttLS0vLy8w8PDy8vL0tLS2tra4eHh6enp8PDw+Pj4////AAAAAExhdmM1Ny40OAAAAAAAAAAAAAAAACQAAAAAAAAAABvAzxxPcgAAAAAAAAAAAAAAAAAAAAD/+1BkAADxUwA96CEYABXAB4AAAAAD0AMRgIRgAHiAYMAAiACWSaORyOJI4OSXB80GLUoz6Edxz9CWIKf9x/lx78Hwfy4Ph/PifrB/l30///////9KcuXfnwfJ58Pk8Tg+/B8PmONgANCCcS1mrXLftdE76M/n/W//IfV8/n+r6z/8f+UFnMIH7JdeIOcWaSmXiB0+JKw+6pSdkW7O+spYXWAESfu0XAJJMnjk09x7YmmfdwBaSJK4s9IVF0OyPT6f/5ehfolcugAgOLSQKHBA//tSZBeNgdYqxIhGGlA5pYjGBSNeBWwrJhSBAAC8hWVCkjAA6OS5AJrKYP9ClLegAt6oAbB843C0ciBilBQwvOoRzYMLtrt19xAoogdS5GG21BQxkJ8RC6//6V+uaF+5oiUDPn1BiX7yZd/H/BFRQuCthSJnxIo+ExGPlx4BNbBMUefJ3G5CoxjWmzSm3a3ooVpfWHhGaz3//c9tGgARMjopzAjQ48TPvghOg/EYwo6QlDiioYsjDQfQlZ+66B606SCMPF1+/IHkh/55OV/xbcn/+1JEBoABaErRhgVAAC1H2hDBHAAFSPNnfPKACK0eakOUcAAJ/7YsEIDYqgL//jd0X/+Z4vBDJf//0/PEWF+P////JHvPvLYrC2OVWNQ5P0MHH/kDDDPmVxuNzigkf38w7r/+8vRiBhn//7egBBb/5eQCSSRoRd/bX/+Ne13unxvBuB0VEjKzIahv5vm+3//////////6IMEgFymL/mznNGIHyRymp12pqbN0dTZps47oa1Dpprf/9fbq2ps7///U1SIhChWum/9ocECEsAAOif/7UkQFAAFRPNppIRRkKKerHRTFOIVA82ejKEwQsZ5sdHQIqod82WnqrVPaS6SaZrJL/fi/+v//0Hf+Shy/////6FJDSjawywSyRoAKFX8jnI67k+WcIIr030f/19GMPX/6/1//6/////flAFptraHIJFGyAC3iWfI28ikS7h0SbaiMT/tR1pwRaJ/7+9k/+n////f+ihdttsHpZWJUABzDO6spTjyiwv4mOMjFn618rvt97Cv/7f//13/Vf19+ze9CQ1V221hNwJBwgDB6VXpb//tSRAaAAWY82O0goAQsJ5rtoZQAxX01bBhTgAClh3A3FGACpCITITg8LihCdGfsR2df/T7f7///zf//RF/ulKoiHCpaK4HW3Aw0ABkay+4vNwMfCAIcFlOER6n206/X2K+c///X///////51IULj//wjDkJFo0ICMW59P6qn/s7Mf/8xFRP/9Eanp/9r6Gudf//b7s7lgA/63CQAYC3STUCiyRiRsAAAD+voHkV4GV8mmCr+9Bm8ICbwyNKI8PlPsxL1/Sq3/2yKAEAYADHgon/+1JEBYEBW0jd7xjgBCuJG13jFACE1F+Rp4UNMKCMLnTApapOCAI4GT03DGOLwjVv///VL//////oV/////////uJQ7d9dkCIGJQAHyuTAelp2nmpk3crEL//3/6///+l2//GiRH8jf///////gokP//4h9rZ/l/OXQNQfTO32iQ4U0i7+n9yl+dHGAJgHIARvqRxGj6rbLaghHBAARk4siDsE0EwWQvrIYyN9P/Lv9owoJFw5/6wi//////sRTaZdIYlUCFABj8qbOGXkPtoeP/7UkQJAAFvJNt7I2mwL8kquD0KNgVMlXfkgLRApSRwdFALzkcHo4lmIFmTqtnH//7A8g7EVf/nv/Pf////99H7eBBBl691aMLC5kKrxZMSF8Cutu7P//PcGAazv/oo7/5f//////q3/v//lsoRk7dkFL7DS4AmAeCjuXoLgrsEFzUdaVO9o/C/XS/6hn/9Af/qDf///7vyk6n/vSV0AKMAkK9CgAEqjnIrsJyNDlSX///oP/9545xcl90YdZX////8UVWRCKJRwAqAsJQrFRj1//tSRAaAAVMk3WhpEVQppLtlGAWCBTEleaOAXlC9Em50waiiD4aOnLzd5iQWZ6NzKxv+hf/6gmtt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',
				audio_2: 'data:audio/mpeg;base64,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///5QIHEDHKSAKUAABScVQqJjXDhDIVFGT//5DKXazUN+V8r//2/9H//iInWf9kI3ywIC6BMKOBh5GjXkQgJgEz/p8PBoKMMLnQXDuJf1D3/////QKaISatZExJF0hCwW20o9eUH/YOvTqvt4UYUFTSbB/4v//////t/4M7//4mDdYxNsg0MkAAAjOQkhcvU00hFqp5EIOj/+1JECwABVEjbaUA/JC/G2y08yiIF7SVvtIUAELeOb7aQcAYCtv7+rizYjJDzeM/6t/9f///CYdsH/5HA6wCAHtlTH+VgTWUrV5NiQip+3hMGotFnZ6ceP+RiMv////0/3/8qT///BaoS2kAGwAIADVyMeH79tZiVyER5GA0Y3/5DMarK2pIXfT////////+3/////UcKPop97PRmwQSOsQ2BgyiCEo7dpHUG4wJDP6N5SDsSyZiDiNjYz+R//7er6f//UPWUlI+9phkrChgqBP/7UkQFgAFCTVoGHaAAKaObEMacAAV4yXAYlQAAp6auAwZQAKojFI41Eft+3bU3/+h/////+r/////8d//WNP/nkRdWI+GwWSnPvap0xOwXjpf/oDdQbisPSVakq9al2s/+ijnyFPv6f//ZNJUhkRuFYTog4rXh4e67vr+yGS05C1x+P3WGZfh6O////0Mb5Qt8oW//8RQXHxGg2+l/ghRj2H4bEAapsTfGvsSkKbjG////7/V+tf/7/6f+n/m/8TWtCWNiOBgiAOg5EI0XgKSO//tSRAgAAVMw328YoAQyKRuN4ygABQjDb6eM5oCvjG40ZKmSjydvrFk+IU+IAreUVLlH/ov/////+MX///1eob9rB9MOpgtKiQ5MRqUzP+conjS6OLnAs/i90TzjqD4a/r//////yqf+c3/////YsU8Ik6fg4IAAFYvgRbkZW0R1GhvbGts+C97+UndTzjcIBn+//////+hepCSo0KkMoESO7nBQrE3Ie3fJhL8T9yai5UBv+VZHq1jsZlv/V/+S+j//4PowTADECD+r5HOZLQv/+1JEBgABVDFYyeNpoC4pG60kRzqFHMOFoBhBcKiMbbSFJhgxCA7Grz2PyHoDR/Jx/7u1QH5X9D//////i2/f//6rWI6hQ6nU0QlDWBLLXOdNsGmIlOwcwCH80t2s3Cpv/zP+f////Lf/b/////qPMLDdqsnTAmkOWYOELVpsraRcfB2vhf4MfXMqYYb+X//////Bivs//+EpCG2RApAIABxTahOJnm4SbiTdwj1yAfgBf6MtqzMLGT7nf/+jyDv///CVtIdsEKAgQgEA4o3NK//7UkQGgAE4SGBowRPkJCYcLBwC04S8w2cjgFwAmgsw9DKNNt7iq0Th3wc8X8//n/82v////+rf//////+LkZkjQFwIAeEAQiAbkDDRwalBsaRHnNZa/U7/bXOtUKG///6j+H6cghCHElQmGgiBA9TOrIfhOWfjglt+V/+FTf/t///xP0f//BCYr73fTEBBgKMBPjMMLcZzD5ripypwLt4gzRuMDcWd///62f//+XWwAOkUMKiUELqpcVjGnVlGca+YoFP6t/46X/+e//r/gi/R//tSRBEAASow2ujgFwAihhrASAfSBLx7d6OAVhCZjG20YR1S//8FlPTE8AqoeUUXS6zZZ7KSvWW3/H5P/rFDjB///xOGPp//+FbWba3QwpUCQbmhU4qyIjUSVGkwFDmoVUS/9sE//qBeW//T///8fWBY2q1QAE4KJtogaB9Aq8wbkE4enHAg/lC/yxr4n////R9P//wW2k2ymMEcQAEJIDGBkIdqy06g7Jqgh/T/4eJ9Hr//Lf///CAoUjbplABYAjRSYlaQqeNWL2Dy+JGSb/z/+1JEHYEBFxjg6GEqLCXCu20AyASEZGOLpIRs8JYYq4DxqOjCuG6d4kkKw3///8Q/ZdHtpAZWBSBk+gQ0YC6MUNnm3OIRhXwra/EMjJla+Hf///5DN91UxDoKPRHzQyxax2sqCDEGOmuqZV//DAm/t//////oX///+lWaypsl3PuK9IunKILVLnG+m6idU1woR/6RGFJv1f/////5EL/ychEgRhYcEiYNY1mJFHU41u07T1YSv5Vv/A4h/P6f/p/cG+j//4M1kWWSowQAgAwlKv/7UkQrAAErMNSDB2nwJgYbnRwF4IRsw3OjgFwwmZhuNFCU2jwvEMgQLsyFd9Vzcv/Kfn+Uf+R////Qf6bELagBK3ZCgjRgWQZG0zME1r+O/jR308Bwz/7f9f///xop9H//xioVCy2aOgAFgapEObqEA7QrKPkRUkQA/hh/m8E7///7/v//8uOB/oO+DROWMpnGDDOoI2lRsF3IHAU/KN/4P/bj///8b6P//g/jNLBw0rYUKZCFbKWkmOt6AV1/GZN/zRSCT/p//////iORfV////tSRDaAARsYXegGEDwkxhs9CALgBMDFUABhQICHjG90UArG9W1Y2gyYlDBIVo0OAUTHadKDtaSCcH/o2JH+JP//iH///5DmY9xOAQwyk1r3tT0VdA6CuFj/K//WIco///6hn///qGZwgCOBQxwPxQox2QuyHyZae1iMHCQ3WH6N/4QJ///9P///wW8M4xDIkkxx5o4GSHvv1G2SehUDKfr/8hf/7///6Df//////+LXN/YzefSCSruJ1trD0lM7tNMokAda78ob/2Lgz///////+1JERQARBTDVgaAukCPjGuUhJXQEqSNhJQBcAJmYKkGEHPD/yrP///VVpKgiJIAVqkAhQNBo6mdEKiEwtm88lALF2+jZAPd6P//iH///4IVzhFh3gLVBa5ogU0dbKP3NEvSIq35SP/+KyTv//+UM/f//6/MEx7hler1nAvruFVfqIgcBq/1N/5ES/+v///Qf///////oFNeZiUhpAGBAWjFRAfJj2n8izedOfqTK3/WJaW///9A76v//lvNnDSInV7nCPUCTMvUMcCRU31f/Sf/7UkRTAPEtGNXJQD2AI2YqcEwF0gSNI1AGgFwAjpipAUAfSL/6X/3/1N///9////BhohEVbsUAAAA+sTw1Gw1l4hh3fIZq97GwZ1+4lCp9Ys1D////U31Uh4A4CCUxa7a4LitPEzyafaG8AGM922BpY5dk4ms////9H///xkf4EzfwIL4U5cCDRkLocXuM/ohIA7yXernW/6h8Nv///iP///7lkkTf2MuzFRyKjKqz9uKFnyjkvUumKQHMykdxz/5AP///////8osiMkikhxFC//tSRGEAARtI04GgLwAmAksdAYgFhLg7XSSZh0CVjGpU8bTozCRJLRSqmP9qi4w1cFAQQzpXJfDn0///J////JyoNVTNUMLCa1kIsyLupOwDq8yjSyjAE/jH+/jH6P//5H6bYZKnTA4EgRksJQT0NfKrTGxLOyhDgf8jf+Ewzqq//+LfR//8GQgEWVCoAAABopOUADIGY1YxW6Bk1DTUmuyRX/TLV+k/Jzf//8fy6bgKsH3S9yYPW4w76kyVBVFNvqb/xpX/9v//9Rv///////H/+1JEbQEBLzDUAwk54CPB22wYWHOEPGNnpISqcJYMbXRhFWaQwbgA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aJTpU78Gg6VO4NHpU7EQmsDXxDhoDwDKD///+ZF81YHRG7/+gKihLiv/+1JEwIABJ0jOKkAXBCImCXU0AtIEqGE/poC0QJCYZmTQF0gyCwuIzJmf/iot/8WF2YqLN/W3/6xRv8UVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7UkTOgAEkGM2ozyuAI0YZYDQC0gS0YywGGKeAkAbmZBMMSFVVVVVVVVVVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//tSZNwIwSALRABgGQAlwFiAACIAAyyS2yCAdOBMgFmEAYwAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+1JkqQ/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==',
				audio_3: 'data:audio/mpeg;base64,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BgBS2UpZhDNbMzf///2XJp///+j/0A3///tSZIIJ0Vw6S0hcPRAc4np9ADCChVjnL6BwsMBZCenMALYKReskBNv/yl2+mz5WW4T///RVAEEDf//+qdg4h+2WLXMAgsMRQBMR7ENPg+LruQ38UobFt2////su3////9/gQAAAAFA3wgA9HrTBwClf5v+PrW4Vn9WcE///9P71XlEXZAmGFhsDiCMt3COtgODBHSARzgWT0Vt2////sv7f///99MM//sUkASAQQIAEL4w/jnYgckwZddNb//QdSKf//1L8v/8jgLnLlWJQAyr/+1Jkk43xajnJEB08oB2Emp0BQoaFwOcgIvRUQEmS6kAFChogAkQD8YBhEZ0v2fBCCAhaTwXcv1r0Vvqn///9m/f/////DHf/5IAAAAVgXAMAYvrWcNwagoj9OD4OD98H////3fxf/yeLHHuMNRlWMMAQMA0EowVANjCHQVMlAG8wFwCkkWfSByozoqf///6t////03/qDAXUQAK/tziQnwNT/+oopgzvM67///76f6//+U2hOEwsu4YFIAZhAAYCFI0wLwaxCAgX9UyYHDVDYP/7UmSkDYFrOcioXRUQG8S6XQGilIV06R4AdPKAZ4nndADmCkv////lb////+qKTqAAAAGBQwwBkEv1nBkwFdj4Z5rotDS3f6P/930ip/oacIHZQ8aPBgiJYkWBkJepu6G4cDCV7NGn3Ldgz8Tv0f+sl/1yoHgWRgAF93/cZ5/CH9rtYm6C1H97SZU59+8hAMAAA/94TcEN3W0SkUwUCzOh/J9uNBVtpyU2bXCf+HIYK/oL///6qQAAABqBdbAAEBnsn0zwG0U2aKw/h7q2X+nP//tSZLMPwZI5xoA9FKAaomotADCChmDnGgD4soBajajMBooaf9h6J5X/8coNf51lUgsQ5heHpnhoB9uLhh0B4GA5CSzpgrvXhX1u6f//6OJABGAqFV6ka9RHl0ORCozyX/Mn1VmDZCDKEAjF5rrL+0ruQQ0MwMCMxVDUxM841vF4wIAlTJL2UTssB76P////aAAAANQN8IADykEAetMQAUm/V1Dm1PwIabYhX//rmT/+f/PDOpK4YV2ygiALMBgEQwowKTBfVqOVIwKhsLABhqn/+1Jkvg2BeznGgD4VEBsCecoAOJCFAFscIAus0GoJ5ugA5gqi9Y5P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',
				audio_4: 'data:audio/mpeg;base64,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'
			}
		},
		onLoad() {
			
		},
		methods: {
			div(arr) {
				let param = this.make('');
				for (var i in param) {
					if (arr[i]) param[i] = arr[i];
				}
				this.respond(param.aduioSrc)
				this.fadeIn(param);
			},
			info(content,audio = true ) {
				this.respond(this.audio_3);
				console.log('xxxxxxxx')
				if(audio){
					console.log('infocontent',content)
					this.fadeIn(this.make(content));
				}
			},
			err(content) {
				this.respond(this.audio_1);
				if(content){
					this.fadeIn(this.make(content, 'error'));
					}
			},
			warn(content) {
				this.respond(this.audio_2);
				if(content){
					this.fadeIn(this.make(content, 'warning'));
				}
			},
			success(content) {
				this.respond(this.audio_4);
				if(content){
					this.fadeIn(this.make(content, 'success'));
				}
			},
			fadeIn(message) {
				message.id = this.total++
				// console.log('fadeIn', message)
				this.messageList.unshift(message)
				// 动画执行完毕后取消动画效果，防止列表刷新时重新执行动画
				setTimeout(() => {
					message.animation = ''
				}, 510)
				// 显示一段时间后隐藏
				setTimeout(() => {
					this.fadeOut(message)
				}, message.duration || this.duration)
			},
			respond(src) {
				// 短震动
				uni.vibrateShort({});
				// 播放提示音
				let innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = src;
				innerAudioContext.onError((res) => {
					return false;
				});
				innerAudioContext.play();
				return true;
			},
			fadeOut(message) {
				// console.log('fadeOut',message)
				message.animation = message.animationOut
				setTimeout(() => {
					let idx = 0
					this.messageList.some((msg, index) => {
						if (msg.id === message.id) {
							idx = index
							return true
						}
					})
					this.messageList.splice(idx, 1)
				}, 500)
			},
			make(content, type = 'info') {
				// 初始化消息
				let param = {
					content: content,
					bgClass: 'bg-white',
					duration: this.duration,
					animation: this.animation,
					animationOut: this.animationOut,
					aduioSrc: this.audio_4
				}
				switch (type) {
					case 'error':
						param.bgClass = 'bg-yellow'
						break;
					case 'warning':
						param.bgClass = 'bg-red'
						break;
					case 'success':
						param.bgClass = 'bg-green'
						break;
					default:
						break;
				}
				return param;
			},
		}
	}
</script>

<style>
	.content {
		z-index: 99;
		position: fixed;
		align-items: center;
		width: 730rpx;
		text-align: center;
	}

	.top {
		top: calc(var(--status-bar-height) + 50px);
	}

	.bottom {
		bottom: 50rpx;
	}

	.left {
		text-align: left;
		top: calc(var(--status-bar-height) + 50px);
		margin: 10upx;
		/* left: 0; */
	}

	.right {
		text-align: right;
		top: calc(var(--status-bar-height) + 50px);
		margin: 10upx;
		/* left: 0; */
	}

	.message {
		display: inline-flex;
		min-width: 250upx;
		max-width: 50%;
		margin: 10upx;
		padding: 25upx 35upx 25upx 35upx;
		/* Safari for macOS & iOS */
		-webkit-backdrop-filter: blur(5px);
		/* Google Chrome */
		backdrop-filter: blur(5px);
		/* 设置背景半透明黑色 */
		/* opacity: 0.5; */
		/* background: rgba(255, 255, 255, 0.8); */
		/* visibility: hidden; */
		
	}
	.msg-text{
		word-break: break-all;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	
	/* 	.bg-red {
		background: #e54d4270;
	}

	.bg-white {
		background: #ffffff70;
	}

	.bg-yellow {
		background: #fbbd0870;
	}

	.bg-green {
		background: #39b54a70;
	} */
</style>
