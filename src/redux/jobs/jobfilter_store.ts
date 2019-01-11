export class JobFilterStore {

  setJobFilter = (name: string) => localStorage.setItem('job_filter', name)

  getJobFilter = () => localStorage.getItem('job_filter')
}
