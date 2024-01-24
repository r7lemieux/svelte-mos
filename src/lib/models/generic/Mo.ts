import type {MoMetaInterface} from  '$lib/models/generic/MoMetaInterface'

export class Mo {

  moMeta: MoMetaInterface
  id: number | string | undefined

  constructor(moMeta: MoMetaInterface) {
    this.moMeta = moMeta
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
    for (const fname of Array.from(this.moMeta.fieldDefs.keys())) {
      const fieldDef = this.moMeta.fieldDefs.get(fname)
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
    for (const fname of Array.from(this.moMeta.fieldDefs.keys())) {
      const fieldDef = this.moMeta.fieldDefs.get(fname)
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
