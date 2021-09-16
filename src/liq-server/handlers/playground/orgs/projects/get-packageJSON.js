const verb = 'get'
const preOrg = '/playground/orgs/'
const preProject = '/projects/'
const postProject = '/packageJSON'
const path = `${preOrg}*${preProject}*${postProject}`

const func = (liqModel) => (req, res) => {
  const path = req.path
  const midBitLength = path.length - preOrg.length - postProject.length
  const midBit = path.substr(preOrg.length, midBitLength)
  const orgName = midBit.replace(/\/.+$/, '')
  const projectName = midBit.replace(/^.+\//, '')
  
  res.json(liqModel.playground.orgs[orgName].projects[projectName].packageJSON)
}

export { func, path, verb }