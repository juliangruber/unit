import * as assert from 'assert'
import { watchGraphAndLog, watchUnitAndLog } from '../../../debug'
import { fromSpec } from '../../../spec/fromSpec'
import _specs from '../../../system/_specs'
import { countEvent } from '../../util'

const spec = require('../../../system/core/control/IfElse/spec.json')

const IfElse = fromSpec<{ a: any; b: boolean }, { if: any; else: any }>(
  spec,
  _specs
)

import { system } from '../../util/system'

const ifElse = new IfElse(system)

false && watchGraphAndLog(ifElse)
false && watchUnitAndLog(ifElse)

const ifDataCounter = countEvent(ifElse.getOutput('if'), 'data')
const ifDropCounter = countEvent(ifElse.getOutput('if'), 'drop')
const elseDataCounter = countEvent(ifElse.getOutput('else'), 'data')
const elseDropCounter = countEvent(ifElse.getOutput('else'), 'drop')


ifElse.play()

ifElse.push('a', 1)
ifElse.push('b', true)
assert.equal(ifElse.take('if'), 1)
assert.equal(ifElse.take('if'), undefined)
assert.equal(ifElse.peakInput('a'), undefined)
assert.equal(ifElse.peakInput('b'), undefined)

ifElse.push('a', 1)
ifElse.push('b', false)
assert.equal(ifElse.take('if'), undefined)
assert.equal(ifElse.take('else'), 1)
assert.equal(ifElse.peakInput('a'), undefined)
assert.equal(ifElse.peakInput('b'), undefined)

ifDataCounter.reset()
ifDropCounter.reset()
elseDataCounter.reset()
elseDropCounter.reset()
ifElse.push('a', 2)
ifElse.push('b', true)
assert.equal(ifElse.peak('if'), 2)
assert.equal(ifDataCounter.count, 1)
assert.equal(ifDropCounter.count, 0)
assert.equal(elseDataCounter.count, 0)
assert.equal(elseDropCounter.count, 0)
assert.equal(ifElse.peakInput('a'), 2)
assert.equal(ifElse.peakInput('b'), true)
ifElse.push('b', false)
assert.equal(ifDataCounter.count, 1)
assert.equal(ifDropCounter.count, 1)
assert.equal(elseDataCounter.count, 1)
assert.equal(elseDropCounter.count, 0)
assert.equal(ifElse.peakInput('a'), 2)
assert.equal(ifElse.peakInput('b'), false)
assert.equal(ifElse.peak('if'), undefined)
assert.equal(ifElse.take('else'), 2)
assert.equal(ifElse.peakInput('a'), undefined)
assert.equal(ifElse.peakInput('b'), undefined)

ifDataCounter.reset()
ifDropCounter.reset()
elseDataCounter.reset()
elseDropCounter.reset()
ifElse.push('a', 2)
ifElse.push('b', false)
assert.equal(ifElse.peak('else'), 2)
assert.equal(ifDataCounter.count, 0)
assert.equal(ifDropCounter.count, 0)
assert.equal(elseDataCounter.count, 1)
assert.equal(elseDropCounter.count, 0)
assert.equal(ifElse.peakInput('a'), 2)
assert.equal(ifElse.peakInput('b'), false)
ifElse.push('b', true)
assert.equal(ifDataCounter.count, 1)
assert.equal(ifDropCounter.count, 0)
assert.equal(elseDataCounter.count, 1)
assert.equal(elseDropCounter.count, 1)
assert.equal(ifElse.peakInput('a'), 2)
assert.equal(ifElse.peakInput('b'), true)
assert.equal(ifElse.peak('else'), undefined)
assert.equal(ifElse.take('if'), 2)
assert.equal(ifElse.peakInput('a'), undefined)
assert.equal(ifElse.peakInput('b'), undefined)

ifElse.push('a', 2)
ifElse.push('b', true)
assert.equal(ifElse.peak('if'), 2)
assert.equal(ifElse.peakInput('a'), 2)
assert.equal(ifElse.peakInput('b'), true)
assert.equal(ifElse.takeInput('a'), 2)
assert.equal(ifElse.peak('if'), undefined)
assert.equal(ifElse.peak('else'), undefined)
assert.equal(ifElse.takeInput('b'), true)

ifElse.setInputConstant('a', true)
ifElse.setInputConstant('b', true)
ifElse.push('a', 1)
ifElse.push('b', false)
assert.equal(ifElse.take('if'), undefined)
assert.equal(ifElse.take('else'), 1)
assert.equal(ifElse.take('else'), 1)
assert.equal(ifElse.take('else'), 1)
assert.equal(ifElse.take('else'), 1)
assert.equal(ifElse.take('else'), 1)
