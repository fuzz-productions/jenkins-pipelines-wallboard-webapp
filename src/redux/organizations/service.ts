import { OrganizationFolder } from '../../model'
import axios from 'axios'
import { JobService } from '../jobs/jobs_service'


export class OrganizationService {

  fetchOrganizationFolders = async (): Promise<Array<OrganizationFolder>> => {
    const folders = await axios.get('https://jenkins.fuzzhq.com/api/json?pretty=true&tree=jobs%5Bname,url%5D', JobService.requestConfig())
    return folders.data.jobs.filter((job: OrganizationFolder) => job._class === 'jenkins.branch.OrganizationFolder')
  }
}
