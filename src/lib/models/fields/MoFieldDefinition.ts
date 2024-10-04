import {FieldDefinition, from} from './FieldDefinition.js'
import {MoDefinition} from './managedObjects/MoInterface'

// export const BaseFieldDefs: { [name: string]: FieldDefinition<any> } = {

export const MoFieldDefinition: FieldDefinition = from(BaseFieldDefs.Object)
MoFieldDefinition.type = 'MO'
MoFieldDefinition.gridColDef = {
    type: 'object'
  }
