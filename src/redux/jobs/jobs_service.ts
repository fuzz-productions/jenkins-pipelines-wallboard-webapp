import axios from 'axios'
import { Job } from '../../model'

export class JobService {

  async fetchJobs(jobFolder: string): Promise<Array<Job>> {
    const jobs = await axios.get(`https://jenkins.fuzzhq.com/job/${jobFolder}/api/json`, {
      auth: {
        username: process.env.REACT_APP_USERNAME || '',
        password: process.env.REACT_APP_PASSWORD || '',
      },
    })
    return JSON.parse(jobs.data.jobs)
  }
}

