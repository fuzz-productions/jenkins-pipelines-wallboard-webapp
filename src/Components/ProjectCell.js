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

  	return <Card title={item.projectName}>
  			
  			<List  
          
  				dataSource={item.jobs}
          renderItem={item => (
          		<li><span>{item.name}</span> -  <span>{item.color}</span></li>
            )}
        />
  			</Card>
  }
}