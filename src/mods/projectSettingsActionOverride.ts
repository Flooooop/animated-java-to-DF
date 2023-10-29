import PACKAGE from '../../package.json'
import { BLUEPRINT_FORMAT } from '../blueprintFormat'
import { openProjectSettingsDialog } from '../interface/projectSettingsDialog'
import { createBlockbenchMod } from '../util/moddingTools'

createBlockbenchMod(
	`${PACKAGE.name}:projectSettingsActionOverride`,
	{
		action: BarItems.project_window as Action,
		oldClick: (BarItems.project_window as Action).click,
	},
	context => {
		context.action.click = function (this, event: Event) {
			console.log('Opening project settings dialog')
			if (Format.id === BLUEPRINT_FORMAT.id) {
				openProjectSettingsDialog()
			} else {
				context.oldClick.call(this, event)
			}
		}
		return context
	},
	context => {
		context.action.click = context.oldClick
	}
)