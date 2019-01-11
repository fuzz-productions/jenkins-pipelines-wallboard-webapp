import axios from 'axios'
import { FolderJob } from '../../model'

export class JobService {

  changeSetPath = (name: string = 'changeSet'): string =>
    `${name}%5Bitems%5Bmsg,date%5D%5D`

  culpritsPath = (): string =>
    `culprits%5B${['absoluteUrl',
      'fullName'].join(',')}%5D`

  causesPath = (): string => 'causes%5BshortDescription%5D'

  actionsPath = (): string => `actions%5B${this.causesPath()}%5D`

  jobActionsPath = (): string => 'actions%5BobjectDisplayName,objectUrl%5D'

  buildsPath = (name: string = 'builds'): string =>
    `${name}%5Bnumber,description,${this.actionsPath()},${this.culpritsPath()},url,building,result,${this.changeSetPath()},${this.changeSetPath('changeSets')},timestamp,displayName%5D`

  jobParamsPath = (): string =>
    'nextBuildNumber,inQueue,name,url,description,displayName,buildable'

  newJobsParamsPath = (): string =>
    `displayName,name,url,jobs%5B${this.jobParamsPath()},jobs%5B${this.jobActionsPath()},name,displayName,url,buildable,${this.buildsPath('lastBuild')}%5D%5D`


  fetchJobs = async (jobFolder: string): Promise<Array<FolderJob>> => {
    const jobs = await axios.get(
      `https://jenkins.fuzzhq.com/job/${jobFolder}/api/json?pretty=true&depth=3&tree=${this.newJobsParamsPath()}`,
      JobService.requestConfig())
    return jobs.data.jobs
  }

  static requestConfig() {
    return {
      auth: {
        username: process.env.REACT_APP_USERNAME || '',
        password: process.env.REACT_APP_PASSWORD || '',
      },
    }
  }
}

