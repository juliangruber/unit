import { Functional } from '../../../../Class/Functional'
import { Unit } from '../../../../Class/Unit'
import { UnitClass } from '../../../../types/UnitClass'

export interface I<T> {
  class: UnitClass<any>
}

export interface O<T> {
  unit: Unit<any, any>
}

export default class New<T> extends Functional<I<T>, O<T>> {
  constructor() {
    super({
      i: ['class'],
      o: ['unit'],
    })
  }

  f({ class: Class }: I<T>, done): void {
    done({ unit: new Class(this.__system) })
  }
}
