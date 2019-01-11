import { applyMiddleware, createStore as reduxCreateStore } from 'redux'
import rootReducer, { initialAppState, State } from './reducers'
import { JobService } from './jobs/jobs_service'
import JobSagas from './jobs/sagas'
import { forkAll } from './sagas'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'remote-redux-devtools'
import actionToPlainObjectConverter from '../utils/action_class'
import { OrganizationService } from './organizations/service'
import { OrganizationSagas } from './organizations/sagas'
import { OrganizationStore } from './organizations/organization_store'
import { SettingsSagas } from './settings/sagas'
import { JobFilterStore } from './jobs/jobfilter_store'

const jobsService = new JobService()
const orgService = new OrganizationService()
const organizationStore = new OrganizationStore()
const jobFilterStore = new JobFilterStore()

const jobSagas = new JobSagas(jobsService, organizationStore)
const orgSagas = new OrganizationSagas(orgService, organizationStore)
const settingsSagas = new SettingsSagas(jobsService)

const sagas = [
  [
    jobSagas,
    ['loadJobs',
      'organizationFolderChanged',
      'jobsFiltered'],
  ],
  [
    orgSagas,
    ['loadOrganizations',
      'saveOrganizationFolder'],
  ],
  [
    settingsSagas,
    ['organizationFolderChanged',
      'fetchProjects'],
  ],
]

const appSagas = function* () {
  yield forkAll(sagas)
}

const sagaMiddleware = createSagaMiddleware()

export function createStore(initialState: State = { app: initialAppState }) {
  // declare Redux middleware
  const middlewares = [
    sagaMiddleware,
    actionToPlainObjectConverter,
  ]
  // apply middleware
  const enhancers = [
    applyMiddleware(...middlewares),
  ]

  // initialize store
  const store = reduxCreateStore(
    rootReducer,
    // @ts-ignore
    composeWithDevTools(...enhancers),
  )

  // attach sagas
  sagaMiddleware.run(appSagas)

  // Redux store to be injected into the <Provider />
  return store
}
