import { Functional } from '../../../../Class/Functional'
import { Done } from '../../../../Class/Functional/Done'
import { CH } from '../../../../interface/CH'

interface I<T> {
  unit: CH
  data: any
}

interface O<T> {}

export default class Send<T> extends Functional<I<T>, O<T>> {
  constructor() {
    super(
      {
        i: ['unit', 'data'],
        o: [],
      },
      {
        input: {
          unit: {
            ref: true,
          },
        },
      }
    )
  }

  async f({ unit, data }: I<T>, done: Done<O<T>>) {
    try {
      await unit.send(data)
    } catch (err) {
      done(undefined, err.message)
      return
    }
    done({})
  }
}
