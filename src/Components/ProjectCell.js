/// project group cell
import React, { Component } from 'react';
import { Card } from 'antd';
import { List } from 'antd';

export default class ProjectCell extends Component {
	constructor(props) {
      super(props);
      console.log(props);
      
  	}

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }
  componentWillReceiveProps(nextProps) {
      //this.setState({ content: content });
  }

  componentWillUnmount() {

  }
  componentDidMount() {
   
  }

  render() {
  	const { item } = this.props;

  	return <Card title={item.projectName} style={{minHeight: "290px"}} >
  			
  			<List  
          
  				dataSource={item.jobs}
          renderItem={item => {
            var result = item.lastBuild.result
            if (result !== null ){
              result = result.toLowerCase()
            } else {
              result = "null"
            }
            return <li className={result} ><span>{item.name}</span> 
              
             { (() => { 
                if( item.lastBuild.number > 1 ) {
                  return <span> #{item.lastBuild.number}</span>
                }
              })() }
              
              </li>
          }}
        />
  			</Card>
  }
}