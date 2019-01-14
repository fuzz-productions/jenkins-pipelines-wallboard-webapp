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


  /**
   * Fetches jobs for a specific folder. will fetch "mobile-projects" for android or ios projects.
   * @param jobFolder the job folder from jenkins to load.
   */
  fetchJobs = async (jobFolder: string): Promise<Array<FolderJob>> => {
    let resolvedJobs = await this._fetchJobs(jobFolder)
    // load mobile if we're loading android or ios projects too
    if (jobFolder === 'android-projects' || jobFolder === 'ios-projects') {
      const mobileJobs = await this._fetchJobs('mobile-projects')
      resolvedJobs = resolvedJobs.concat(mobileJobs)
    }
    return resolvedJobs
  }

  /**
   * Internal method that does the call directly.
   * @private
   */
  _fetchJobs = async (jobFolder: string): Promise<Array<FolderJob>> => {
    const jobs = await axios.get(
      `https://jenkins.fuzzhq.com/job/${jobFolder}/api/json?pretty=true&depth=3&tree=${this.newJobsParamsPath()}`,
      JobService.requestConfig())
    return jobs.data.jobs || []
  }

  static requestConfig() {
    const username = process.env.REACT_APP_USERNAME
    const password = process.env.REACT_APP_PASSWORD
    if (!!username && !!password) {
      return {
        auth: {
          username: username || '',
          password: password || '',
        },
      }
    } else {
      return {}
    }
  }
}

