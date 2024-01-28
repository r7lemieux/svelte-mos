import type {MoDefinitionInterface} from '$lib/models/managedObjects/MoDefinitionInterface.js'

export class Mo {

  moDef: MoDefinitionInterface
  id: number | string | undefined

  constructor(moDef: MoDefinitionInterface) {
    this.moDef = moDef
  }
  setProps = (props: any): Mo => {
    for (const key of Object.getOwnPropertyNames(props)) {
      // if (key != 'fieldDefs') {
        this[key] = props[key]
      // }
    }
    return this
  }
  toObj = () => {
    const data: any = {}
    if (this.id) data.id = this.id
    for (const fname of Array.from(this.moDef.fieldDefs.keys())) {
      const fieldDef = this.moDef.fieldDefs.get(fname)
      const value = this[fname]
      if (value !== undefined && value !== null) {
        data[fname] = this[fname]
      }
    }
    return data
  }
  toDocument = () => {
    const data: any = {}
    if (this.id) data.id = this.id
    for (const fname of Array.from(this.moDef.fieldDefs.keys())) {
      const fieldDef = this.moDef.fieldDefs.get(fname)
      const value = this[fname]
      if (value !== undefined && value !== null) {
        data[fname] = fieldDef?.valueToDocument(this[fname])
      }
    }
    return data
  }

  hydrate(partial: Partial<Mo>) {
    Object.assign(this, partial)
  }


}
