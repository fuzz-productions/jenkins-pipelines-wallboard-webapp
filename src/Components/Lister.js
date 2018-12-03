import React from 'react';
import { List } from 'antd';

//import { Badge } from 'antd';

export default class Lister extends React.Component {
  constructor(props) {
      super(props);
      console.log(props);
      this.state = {
        initLoading: true,
        loading: false,

        list: [],
      }
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
    if (this.props.items.count > 0 ){
      this.setState({ loading: false })
    }
  }

  render() {
    const { items, rowMaker } = this.props;
    const { loading } = this.state;

    var rows = "";
    var count = 0;
    if( items !== undefined ) {
      rows = items.map((item) => {
          count++;
          return rowMaker(item, count)
      });
    }

    return <List className="demo-loadmore-list"
           loading={loading}
           itemLayout="horizontal"
           dataSource={items}
           renderItem={item => (
             rowMaker(item)
           )}
         />

  };
}
