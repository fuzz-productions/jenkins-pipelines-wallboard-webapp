export class OrganizationStore {


  setOrganization = (name: string) => localStorage.setItem('selected-organization', name)

  getOrganization = () => localStorage.getItem('selected-organization') || 'ios-projects'
}
