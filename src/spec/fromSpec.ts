import { Graph } from '../Class/Graph'
import { System } from '../system'
import {
  GraphSpec,
  GraphUnitPinSpec,
  GraphUnitSpec,
  PinSpec,
  Specs,
} from '../types'
import { GraphClass } from '../types/GraphClass'
import { clone, mapObjVK } from '../util/object'

export function fromSpec<I = any, O = any>(
  spec: GraphSpec,
  specs: Specs,
  branch: { [path: string]: true } = {}
): GraphClass {
  spec = clone(spec)

  const { id, name, units } = spec

  for (const unitId in units) {
    const unitSpec: GraphUnitSpec = units[unitId]
    let { id, input = {}, output = {} } = unitSpec

    const spec = specs[id]

    const { inputs, outputs } = spec

    function setIgnored(
      unitPinSpec: GraphUnitPinSpec,
      pinSpec: PinSpec
    ): GraphUnitPinSpec {
      const { ignored } = unitPinSpec
      if (ignored === undefined) {
        const { defaultIgnored } = pinSpec
        if (defaultIgnored === true) {
          return { ...unitPinSpec, ignored: true }
        }
      }
      return unitPinSpec
    }

    unitSpec.input = mapObjVK(
      inputs,
      (inputPinSpec: PinSpec, inputId: string) => {
        const unitPinSpec = input[inputId] || {}
        return setIgnored(unitPinSpec, inputPinSpec)
      }
    )

    unitSpec.output = mapObjVK(
      outputs,
      (outputPinSpec: PinSpec, outputId: string) => {
        const unitPinSpec = output[outputId] || {}
        return setIgnored(unitPinSpec, outputPinSpec)
      }
    )
  }

  class Class<I, O> extends Graph<I, O> {
    static __id: string = id

    constructor(system: System) {
      super(spec, branch, system)
    }
  }

  Object.defineProperty(Class, 'name', {
    value: name,
  })

  return Class
}
