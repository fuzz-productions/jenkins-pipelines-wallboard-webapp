import axios from 'axios'
import { FolderJob, OrganizationFolder } from '../../model'

export class JobService {

  artifactsPath = (): string => 'artifacts%5BfileName,UDID%5D'

  changeSetPath = (name: string = 'changeSet'): string =>
    `${name}%5Bitems%5Bmsg,date%5D%5D`

  culpritsPath = (): string =>
    `culprits%5B${['absoluteUrl',
      'fullName'].join(',')}%5D`

  causesPath = (): string => 'causes%5BshortDescription%5D'

  actionsPath = (): string => `actions%5B${this.causesPath()},${this.artifactsPath()}%5D`

  jobActionsPath = (): string => 'actions%5BobjectDisplayName,objectUrl%5D'

  buildsPath = (name: string = 'builds'): string =>
    `${name}%5Bnumber,description,${this.actionsPath()},${this.culpritsPath()},url,building,result,${this.changeSetPath()},${this.changeSetPath('changeSets')},timestamp,displayName,${this.artifactsPath()}%5D`

  jobParamsPath = (): string =>
    'nextBuildNumber,inQueue,name,url,description,displayName,buildable'

  newJobsParamsPath = (): string =>
    `displayName,name,url,jobs%5B${this.jobParamsPath()},jobs%5B${this.jobActionsPath()},name,displayName,url,buildable,${this.buildsPath('lastBuild')}%5D%5D`


  fetchJobs = async (jobFolder: string): Promise<Array<FolderJob>> => {
    const jobs = await axios.get(
      `https://jenkins.fuzzhq.com/job/${jobFolder}/api/json?pretty=true&depth=3&tree=${this.newJobsParamsPath()}`,
      this.requestConfig())
    return jobs.data.jobs
  }

  fetchOrganizationFolders = async (): Promise<Array<OrganizationFolder>> => {
    const folders = await axios.get('https://jenkins.fuzzhq.com/api/json?pretty=true&tree=jobs%5Bname,url%5D', this.requestConfig())
    return folders.data.jobs.filter((job: OrganizationFolder) => job._class === 'jenkins.branch.OrganizationFolder')
  }

  private requestConfig = () => ({
    auth: {
      username: process.env.REACT_APP_USERNAME || '',
      password: process.env.REACT_APP_PASSWORD || '',
    },
  })
}

