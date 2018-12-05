import React, { Component } from 'react';
import dotenv from 'dotenv';
import axios from 'axios';
import { List } from 'antd';
import ProjectCell from './Components/ProjectCell'
import 'antd/dist/antd.css';
import './App.css';

//require('dotenv').config()

class App extends Component {
  state = {
    projects: [],
  }

    componentDidMount() {
        dotenv.config()

        axios.get("https://jenkins.fuzzhq.com/job/" + process.env.REACT_APP_GROUP + "/api/json", { "auth": {
             username: process.env.REACT_APP_USERNAME,
             password: process.env.REACT_APP_PASSWORD
           }})
          .then(res => {
            let jobs = res.data.jobs;
            jobs = jobs.sort(function(a, b) {
                return a.name < b.name
            });
            //console.log(jobs);

            var arr = []
            const projects = jobs.map( (obj) => {
              var job = {"projectName": obj.name, "jobs": [], "id": obj.name}

              arr.push(
                axios.get(obj.url + "api/json", { "auth": {
                  username: process.env.REACT_APP_USERNAME,
                  password: process.env.REACT_APP_PASSWORD
                }})
                  .then(res => { 
                    var jobs = res.data.jobs;
                    jobs = jobs.filter( function (a) {
                      if ( a.color === "notbuilt" || a.color === "notbuilt_anime" || a.color === "blue_anime" ) {
                          return false;
                      }
                      return true;
                    })
                    console.log(jobs);
                    jobs = jobs.sort(function(a, b) {
                        if (a.name === "dev" || a.name === "develop" || a.name === "master" ) { return -1 }
                        if (b.name === "dev" || b.name === "develop" || b.name === "master") { return 1 }
                        if ( a.name.toLowerCase() < b.name.toLowerCase() ){
                          return -1
                        }
                        return 1
                    });
                    console.log(jobs);
                    job['jobs'] = jobs;
                    var list = this.state.projects
                    list.push(job)
                    this.setState({ "projects": list });

                  })
              );
              return job
            });

            let result = axios.all(arr).then(res => { 
              console.log(res)
            });
            
          })
    }


  render() {
   
    let {projects} = this.state
    projects = projects.sort(function(a, b) {
        console.log(a.jobs.length);
          if( a['jobs'].length < b['jobs'].length ){
            return -1
          }
          return 1
    });
    return (
      <div className="App">
        <header className="App-header"> Fuzz {process.env.REACT_APP_GROUPNAME}

          <List 
            grid={{ gutter: 16, column: 3, offset: 5 }}
            dataSource={projects}
            renderItem={item => (
               <List.Item><ProjectCell item={item} /></List.Item>
            )}
         />
        </header>
      </div>
    );
  }
}

export default App;
