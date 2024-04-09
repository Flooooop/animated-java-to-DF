import type {
	IBlueprintVariantBoneConfigJSON,
	IBlueprintVariantLocatorConfigJSON,
} from './blueprintFormat'
import { type Variant } from './variants'

declare global {
	interface ModelProject {
		animated_java: {
			export_namespace: string
			// Plugin Settings
			enable_plugin_mode: boolean
			// Resource Pack Settings
			enable_resource_pack: boolean
			display_item: string
			customModelDataOffset: number
			enable_advanced_resource_pack_settings: boolean
			resource_pack: string
			display_item_path: string
			model_folder: string
			texture_folder: string
			// Data Pack Settings
			enable_data_pack: boolean
			enable_advanced_data_pack_settings: boolean
			data_pack: string
		}

		variants: Variant[]
	}

	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface _Animation {
		excludedBones: string[]
		invertExcludedBones: boolean
	}

	interface Group {
		configs: {
			default: IBlueprintVariantBoneConfigJSON
			variants: Record<string, IBlueprintVariantBoneConfigJSON>
		}
	}

	interface Locator {
		configs: {
			default: IBlueprintVariantLocatorConfigJSON
			variants: Record<string, IBlueprintVariantLocatorConfigJSON>
		}
	}
}
