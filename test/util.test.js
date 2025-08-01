/**
 *
 *    Copyright (c) 2020 Silicon Labs
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 *
 * @jest-environment jsdom
 */

const util = require('../src/util/util')
const util2 = require('../src-electron/util/util')
const { timeout } = require('./test-util')

test(
  'Clean symbol',
  () => {
    expect(util.asHex('-1', 4)).toEqual('-1')
    expect(util.asHex(null, 4)).toEqual('')
    expect(util.asHex('123', 4)).toEqual('0x007B')
    expect(util.asHex('0x123', 4)).toEqual('0x0123')
    expect(util.asHex(123, 4)).toEqual('0x007B')
  },
  timeout.short()
)

test(
  'Pattern format',
  () => {
    expect(util2.patternFormat('{a}{b}', { a: 1, b: 2 })).toEqual('12')
    expect(util2.patternFormat('{a}{b}', { a: 10, b: 2 })).toEqual('102')
    expect(util2.patternFormat('{a:hexuppercase}{b}', { a: 10, b: 2 })).toEqual(
      'A2'
    )
    expect(util2.patternFormat('{a:hexlowercase}{b}', { a: 10, b: 2 })).toEqual(
      'a2'
    )
    expect(
      util2.patternFormat(
        '{a:tocamelcase} {b:tosnakecase} {b:tosnakecaseallcaps} {a:tokensintouppercamelcase} {c:tokensintouppercamelcase} {d:tokensintouppercamelcase}',
        {
          a: 'some string',
          b: 'another string',
          c: 'PM2.5 Concentration Measurement',
          d: 'FOO2.5 BAR Baz'
        }
      )
    ).toEqual(
      'someString another_string ANOTHER_STRING SomeString Pm25ConcentrationMeasurement Foo25BarBaz'
    )
  },
  timeout.short()
)
