import { List } from 'antd'
import 'antd/dist/antd.css'
import dotenv from 'dotenv'
import React, { PureComponent } from 'react'
import './style.scss'
import ProjectCell from './../../components/ProjectCell'
import { jobsHawk } from '../../redux/jobs/hawk'
import { LoadingModel } from '../../redux/loading.model'
import { Job } from '../../model'

interface AppProps {
  loadJobs: Function
  jobModel: LoadingModel<Array<Job>>
}

class AppPage extends PureComponent<AppProps> {

  componentDidMount() {
    dotenv.config()
    this.props.loadJobs()
  }

  /*loadProjects = () => {
    axios.get('https://jenkins.fuzzhq.com/job/' + process.env.REACT_APP_GROUP + '/api/json', {
      'auth': {
        username: process.env.REACT_APP_USERNAME,
        password: process.env.REACT_APP_PASSWORD,
      },
    })
      .then(res => {
        let jobs = res.data.jobs
        jobs = jobs.sort(function (a, b) {
          return a.name < b.name
        })
        // jobs = jobs.filter( function (a) {
        //     if ( a.name === "koala-kit-ios" || a.name === "koala-pay-ios" || a.name === "tulerie-ios" || a.name === "coffers-ios" ) {
        //         return false;
        //     }
        //     return true;
        //   })
        //console.log(jobs);

        var arr = []
        const projects = jobs.map((obj) => {
          var job = {
            'projectName': obj.name,
            'jobs': [],
            'id': obj.name,
          }

          arr.push(
            axios.get(obj.url + 'api/json?tree=jobs[name,url,color,lastBuild[number,duration,building,result,timestamp]]', {
              'auth': {
                username: process.env.REACT_APP_USERNAME,
                password: process.env.REACT_APP_PASSWORD,
              },
            })
              .then(res => {
                //console.log(res);
                var jobs = res.data.jobs
                jobs = jobs.filter(function (a) {
                  if (a.color === 'notbuilt' || a.color === 'notbuilt_anime' || a.color === 'blue_anime') {
                    return false
                  }
                  return true
                })
                //console.log(jobs);
                jobs = jobs.sort(function (a, b) {
                  if (a.name === 'dev' || a.name === 'develop' || a.name === 'development' || a.name === 'master') {
                    return -1
                  }
                  if (b.name === 'dev' || b.name === 'develop' || b.name === 'development' || b.name === 'master') {
                    return 1
                  }
                  if (a.lastBuild.timestamp > b.lastBuild.timestamp) {
                    return -1
                  }
                  return 1
                })

                jobs = jobs.slice(0, Math.min(jobs.length, 18))

                //console.log(jobs);
                job.jobs = jobs

                var list = this.state.projects
                delete (list['loading'])
                list[job.projectName] = job
                console.log(list)
                this.setState({ 'projects': list })

              }),
          )
          return job
        })

        let result = axios.all(arr).then(res => {
          console.log(res)
        })

      })
  }*/

  render() {
    return (
      <div className="App">
        <header className="App-header"> Fuzz {process.env.REACT_APP_GROUPNAME}
          <br />

          <List
            grid={{
              gutter: 16,
              column: 4,
              offset: 5,
            }}
            dataSource={this.props.jobModel.success}
            renderItem={(item: Job) => (
              <List.Item><ProjectCell item={item} /></List.Item>
            )}
          />
        </header>
      </div>
    )
  }
}

export default jobsHawk(AppPage)
