import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import Eth from 'ethjs-query';
import EthContract from 'ethjs-contract';
import * as contractUtils from '../utils/ContractInfo';
import createKeccakHash from 'keccak';

class TaskListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      user_id: this.props.auth.isAuthenticated === true ? this.parseJwt(localStorage.id_token).user_id : "",
      last_saved: 0,
      monster: "",
      newMonsterGender: Math.floor(Math.random() * 2) === 1 ? "♂" : "♀",
      deadline: "",
      newMonsterName: "",
      loadingNewMonster: false,
      eventResult: ''
    }
  }

  componentWillMount(){
    if (typeof window.web3 !== 'undefined') {
      console.log('loaded!');
    } else {
      // Warn the user that they need to get a web3 browser
      // Or install MetaMask, maybe with a nice graphic.
      alert('Please download MetaMask to use this dApp');
    }      
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    })
  }

  parseJwt = token => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64))
  }

  handleSubmit = event => {
    event.preventDefault();
    const { name, deadline, monster, user_id } = this.state;

    if (!name || !deadline || !monster || !user_id) {
      return;
    }

    return fetch("http://localhost:3001/task_lists", {
      method: 'POST',
      body: JSON.stringify({
          name: this.state.name,
          user_id: this.state.user_id,
          last_saved: 0,
          monster: this.state.monster,
          deadline: this.state.deadline
      }), 
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(function(data){
      window.location.assign("/")
      this.setState({monsters: this.props.taskLists.map(taskList => ({name: taskList.monster.nickname, level: taskList.monster.level, id: taskList.monster.id})).sort(function(a, b) { return a.id - b.id }).filter(function(monster, index, arr) { return arr[index-1] ? monster.id !== arr[index-1].id : monster })})
    }.bind(this));
  }

  startApp = web3 => {
    const eth = new Eth(web3.currentProvider);
    const contract = new EthContract(eth);

    this.initContracts(contract);
  }

  initContracts = contract => {
    const TaskMonster = contract(contractUtils.abi); 
    const taskMonsterInstance = TaskMonster.at('0xde4a3cc424e270e7bba00b59114c07eb6d388714');  
    const monsterBorn = taskMonsterInstance.monsterBorn({}, { fromBlock: 0});
    monsterBorn.watch(function(error, result){
      console.log("on watch"); 
      if (!error) {
        console.log(result);
        this.setState({eventResult: result})
      }
    }.bind(this));
    this.getMonster(taskMonsterInstance);
  }

  hatchMonster(){
    if (parseInt(Math.floor(parseInt((parseInt(createKeccakHash('keccak256').update(localStorage.id_token.concat(this.state.name)).digest('hex'), 16))).toString().split("e")[0], 10)) % 2 !== 0) {
      this.setState({newMonsterName: "Schrodinger"})
    } else {
      this.setState({newMonsterName: "Leaflet"})
    }

    return fetch("http://localhost:3001/monsters", {
      method: 'POST',
      body: JSON.stringify({
          gender: this.state.newMonsterGender,
          user_id: this.state.user_id,
          nickname: this.state.newMonsterName
      }), 
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({monster: data.id});
    });
  }

  checkMonsterBirth(txHash) {
    window.web3.eth.getTransaction(txHash, 
      function(err, result) {
        if (result === null) {
          console.log(result);
          this.checkMonsterBirth(txHash);
        } else {
          console.log(result); 
          this.hatchMonster();
        }  
      }.bind(this))
    }

  getMonster = taskMonsterInstance => {
    const monsterBorn = taskMonsterInstance.monsterBorn({}, { fromBlock: 0});
    monsterBorn.watch(function(error, result){
      if (!error) {
        console.log("on watch"); 
        console.log(result);
        this.setState({eventResult: result})
      }
    }.bind(this));

    this.setState({monster: ''})
    if (this.state.name === '') {
      alert('Name your task first!')
    } else {
      let combined = localStorage.id_token.concat(this.state.name)
      monsterBorn.watch(function(error, result){
      if (!error) {
        console.log("on watch"); 
        console.log(result);
        this.setState({eventResult: result})
      }
      }.bind(this));
      taskMonsterInstance.newMonster(this.state.newMonsterGender, combined, {from: window.web3.eth.accounts[0]})
      .then(function(txHash) {
        this.setState({loadingNewMonster: true})
        this.checkMonsterBirth(txHash);
        console.log('Transaction sent');
        console.dir(txHash);
      }.bind(this))
    }
  }

  loadImage() {
    if (this.state.loadingNewMonster === false) {
      return <img src="/documents-flat.png" alt="new task" height="100" width="100" style={{display: "block", margin: "0 auto"}}/>
    } else if (this.state.loadingNewMonster === true && this.state.monster === '') {
      return <img src="/Egg.gif" alt="" style={{display: "block", margin: "0 auto"}} height="80px" width="80px"/>
    } else {
      return this.state.newMonsterName === 'Schrodinger' ? <img src="/Schrodinger-Normal.gif" alt="" style={{display: "block", margin: "0 auto"}} height="55px" width="70.25px"/> : <img src="/Leaflet-Normal.gif" alt="" style={{display: "block", margin: "0 auto"}} height="55px" width="70.25px" />
    }
  }

  selectMonster() {
    if (this.state.loadingNewMonster === false) {
      return  <div>
                <FormControl>
                  <Select value={this.state.monster} onChange={this.handleChange} displayEmpty name="monster" >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {this.props.taskLists.lists.map(taskList => ({name: taskList.monster.nickname, level: taskList.monster.level, id: taskList.monster.id})).sort(function(a, b) { return a.id - b.id }).filter(function(monster, index, arr) { return arr[index-1] ? monster.id !== arr[index-1].id : monster }).map(monster => <MenuItem value={monster.id}>{monster.name} Level {monster.level}</MenuItem>)}
                  </Select>
                <FormHelperText>Select Existing Monster</FormHelperText>
                </FormControl>

                <p>or</p>

                <div>
                  <Button variant="contained" onClick={(e) => this.startApp(window.web3, e)} color="default" className="nav">Get New Monster</Button>
                </div>
              </div>
    } else if (this.state.loadingNewMonster === true && this.state.monster !== '') {
      return <p style={{color: "#36BF7F"}}>New {this.state.newMonsterName} hatched!</p>
    } else if (this.state.loadingNewMonster === true && this.state.monster === '') {
      return <p style={{color: "#3f51b5"}}>Hatching new monster...</p>
    }
  }

  render() {
    return (
      <div>
        <Grid container spacing={24} alignItems="center" direction="row" justify="center">
          <form style={{width: "11em"}} className="newTaskList">
            <div>
              {this.loadImage()}
            </div>
        
            <div>
              <TextField autoComplete="off" id="name" className="name" name="name" placeholder="Name your new list" value={this.state.name} onChange={this.handleChange} margin="normal" />
            </div>

            <br/>

            <div>
              <TextField id="deadline" onChange={this.handleChange} name="deadline" label="Set Deadline" type="date" defaultValue="YYYY-MM-DD" InputLabelProps={{shrink: true}} />
            </div>

            <br/>

            <div>
              {this.selectMonster()}
            </div>

            <br/>

            <div>
              <Button variant="contained" onClick={this.handleSubmit} color="primary" className="nav">Create New List</Button>
            </div> 
          </form>
        </Grid>
      <br/>
      <br/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    taskLists: state.taskLists
  };
};
 
export default connect(mapStateToProps)(TaskListForm);