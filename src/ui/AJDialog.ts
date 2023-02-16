import { SvelteComponent } from 'svelte'
import { Subscribable } from '../util/suscribable'

export class AJDialog extends Blockbench.Dialog {
	instance: SvelteComponent | undefined
	closeHandler: Subscribable<void>
	constructor(
		// @ts-ignore
		svelteComponent: SvelteComponentConstructor<
			unknown,
			// @ts-ignore
			Svelte2TsxComponentConstructorParameters<any>
		>,
		svelteComponentArgs: Record<string, any>,
		options: DialogOptions
	) {
		let mount = document.createComment('Mount')
		const closeHandler = new Subscribable<void>()
		super({
			...options,
			lines: [mount as any as HTMLElement],
			onCancel() {
				closeHandler.dispatchSubscribers()
			},
		})
		let diagShow = this.show.bind(this)
		this.show = () => {
			diagShow()
			if (!this.instance) {
				// debugger
				mount.parentElement!.style.overflowY = 'visible'
				this.instance = new svelteComponent({
					target: mount.parentElement as any,
					props: {
						onCloseHandler: closeHandler,
						...svelteComponentArgs,
					},
				}) as any
			}
			return this
		}
		let diagClose = this.close.bind(this)
		this.close = (...args) => {
			if (this.instance) {
				closeHandler.dispatchSubscribers()
				this.instance.$destroy()
				this.instance = undefined
			}
			return diagClose(...args)
		}
		this.closeHandler = closeHandler
	}
}
