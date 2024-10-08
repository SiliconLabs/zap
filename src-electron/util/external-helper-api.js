/**
 *
 *
 *    Copyright (c) 2024 Silicon Labs
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
 */

/**
 * External helper utilities for ZAP
 *
 * @module External API: External API utilities
 */

const queryZcl = require('../db/query-zcl.js')
const queryPackage = require('../db/query-package.js')
const queryCommand = require('../db/query-command.js')
const queryEvent = require('../db/query-event.js')
const querySessionZcl = require('../db/query-session-zcl.js')
/**
 * Returns all available clusters.
 *
 * @param {*} context
 * @returns all available clusters
 */
async function availableClusters(context) {
  let clusters = querySessionZcl.selectAllSessionClusters(
    context.db,
    context.sessionId
  )
  return clusters
}

/**
 * Returns all available events.
 *
 * @param {*} context
 * @returns all available events
 */
async function availableEvents(context) {
  let packageIds = await queryPackage.getSessionZclPackageIds(
    context.db,
    context.sessionId
  )
  let events = await queryEvent.selectAllEvents(context.db, packageIds)
  return events
}

/**
 * Returns all available commands.
 *
 * @param {*} context
 * @returns all available ccommands
 */
async function availableCommands(context) {
  let packageIds = await queryPackage.getSessionZclPackageIds(
    context.db,
    context.sessionId
  )
  let commands = await queryCommand.selectAllCommands(context.db, packageIds)
  return commands
}

/**
 * Returns all available attributes.
 *
 * @param {*} context
 * @returns all available attributes
 */
async function availableAttributes(context) {
  let packageIds = await queryPackage.getSessionZclPackageIds(
    context.db,
    context.sessionId
  )
  let attributes = await queryZcl.selectAllAttributes(context.db, packageIds)
  return attributes
}

exports.availableEvents = availableEvents
exports.availableCommands = availableCommands
exports.availableAttributes = availableAttributes
exports.availableClusters = availableClusters
