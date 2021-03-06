import * as StreamPromises from 'stream/promises'

import { importFromCSV } from '@liquid-labs/import-export'

import {
  canBeAutoDeleted,
  finalizeRecord,
  headerNormalizations,
  headerValidations,
  validateAndNormalizeRecords
} from './_lib/staff-import-lib'

const method = 'post'
const path = '/orgs/:orgKey/staff(/refresh)?'
const parameters = [
  {
    name: 'files',
    required: true,
    isMultiValue: true,
    description: 'All the provided files comprise the totality of current employees.'
  }
]

const func = ({ model }) => (req, res) => {
  // if the org path is invalid, then there's no point in doing other work
  const { orgKey } = req.params
  const org = model.orgs[orgKey]
  if (!org) {
    res.status(400).json({ message: `Could not locate org '${orgKey}'.` })
    return
  }
  
  const { files } = req
  
  importFromCSV({
    canBeAutoDeleted,
    files,
    finalizeRecord,
    headerNormalizations,
    headerValidations,
    model,
    org,
    res,
    resourceAPI: org.staff,
    validateAndNormalizeRecords
  })
}

export { func, path, method }
