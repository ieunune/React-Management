import React,{Component}from 'react';
import './App.css';
import Customer from './Components/Customer'

// material UI
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root : {
    width : '100%',
    marginTop : theme.spacing.unit * 3,
    overflowX : "auto"
  },
  table : {
    minWidth : 1080
  }
})

// 하드코딩 제거
// const customers=[
//   {
//   'id' : 1,
//   'image' : 'http://placeimg.com/64/64/1',
//   'name' : '홍길동1',
//   'birthday' : '960720',
//   'gender' : '남자',
//   'job' : '학생'
// },
// {
//   'id' : 2,
//   'image' : 'http://placeimg.com/64/64/2',
//   'name' : '홍길동2',
//   'birthday' : '960720',
//   'gender' : '남자',
//   'job' : '프로그래머'
// },
// {
//   'id' : 3,
//   'image' : 'http://placeimg.com/64/64/3',
//   'name' : '홍길동3',
//   'birthday' : '960720',
//   'gender' : '남자',
//   'job' : '디자이너'
// }
// ]
class App extends Component {

  state = {
    customers : ""
  }

  componentDidMount(){ 
    this.callApi().then(res => this.setState({customers:res})).catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }
render(){
  const { classes } = this.props;
  return(
    
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.customers ?
           this.state.customers.map(c => { return (<Customer id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>)})
           : "" }
        </TableBody>
      </Table>

      {/* 반복문의 필요성 */}
     
      {/* <Customer id={customers[0].id} image={customers[0].image} name={customers[0].name} birthday={customers[0].birthday} gender={customers[0].gender} job={customers[0].job}/>
      
      <Customer id={customers[1].id} image={customers[1].image} name={customers[1].name} birthday={customers[1].birthday} gender={customers[1].gender} job={customers[1].job}/>

      <Customer id={customers[2].id} image={customers[2].image} name={customers[2].name} birthday={customers[2].birthday} gender={customers[2].gender} job={customers[2].job}/> */}
    
    </Paper>
  );
}
}

export default withStyles(styles)(App);
