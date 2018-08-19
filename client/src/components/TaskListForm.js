import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';
import Eth from 'ethjs-query';
import EthContract from 'ethjs-contract';
import * as contractUtils from '../utils/ContractInfo';
const createKeccakHash = require('keccak')
var React          = require('react');
var _              = require('lodash');
// var Functions      = require('../../utils/Functions.js');
var $              = require('jquery');

// SCREW LISTENING TO BLOCKCHAIN EVENTS... INSTEAD JUST DO EVERYTHING ON THE CLIENT SERVER, WHO FUCKING CARES? IT STILL WORKS ON THE BLOCKCHAIN ANYWAY

class TaskListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      user_id: this.props.auth.isAuthenticated === true ? this.parseJwt(localStorage.id_token).user_id : "",
      last_saved: 0,
      monster: "",
      deadline: "",
      monsters: props.taskLists.map(taskList => ({name: taskList.monster.nickname, level: taskList.monster.level, id: taskList.monster.id})).sort(function(a, b) { return a.id - b.id }).filter(function(monster, index, arr) { return arr[index-1] ? monster.name !== arr[index-1].name : monster }),
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

  componentWillReceiveProps(nextprops) {
    this.setState({
     monsters: nextprops.taskLists.map(taskList => ({name: taskList.monster.nickname, level: taskList.monster.level, id: taskList.monster.id})).sort(function(a, b) { return a.id - b.id }).filter(function(monster, index, arr) { return arr[index-1] ? monster.name !== arr[index-1].name : monster })
      }) 
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

    $.ajax({
      method: "POST",
      url: "http://localhost:3001/task_lists",
      data: {
        taskList: {
          name: this.state.name,
          user_id: this.state.user_id,
          last_saved: 0,
          monster: this.state.monster,
          deadline: this.state.deadline
        }
      }
    }).done(function(data){
      window.location.assign("/")
    }.bind(this));
  }

  startApp = web3 => {
    const eth = new Eth(web3.currentProvider);
    const contract = new EthContract(eth);

    this.initContracts(contract);
  }

  initContracts = contract => {
    // const TaskMonsters = contract(contractUtils.abi); << first iteration (plural)
    // const taskMonstersInstance = TaskMonsters.at('0x8d65dbae6455943fbb8b9edddea6e6c844d91215'); << first iteration (plural)
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
    debugger
    if (parseInt(Math.floor(parseInt((parseInt(createKeccakHash('keccak256').update(localStorage.id_token.concat(this.state.name)).digest('hex'), 16))).toString().split("e")[0], 10) % 2 != 0) % 2 != 0) {
      this.setState({monster: "Schrodinger"})
    } else {
      this.setState({monster: "Leaflet"})
    }
  }

  checkMonsterBirth(txHash) {
    // monsterEvent.watch(function(error, result){
    //       if (!error) {
    //         alert(result);
    //         // this.newMonster(result.args.name, )
    //         // this.setState({monster: result.args.name})
    //       } else {
    //         alert(error);
    //       }
    // })

    window.web3.eth.getTransaction(txHash, 
      function(err, result) {
        if (result === null) {
          console.log(result);
          this.checkMonsterBirth(txHash);
        } else {
          console.log(result); 
          // also create new monster in the backend, need to read blockchain events for this
          // this.setState({
          //   monster: 'Schrodinger'
          // })
          this.hatchMonster();
        }  
      }.bind(this))

    // Turn combined string into keccak, then to hex, then to decimal



    // window.web3.eth.getTransaction({txHash}, function(err, result){
    //   debugger
    //   console.log(result.blockNumber);
    //   if (result.blockNumber === null) {
    //     this.checkMonsterBirth(txHash)
    //   } else {
    //     this.setState({monster: 'Shrodinger'})
    //   }
    // }.bind(this))
    }
    // .then(function(blockNumber){
    //   if (blockNumber === null) {
    //     this.checkMonsterBirth(txHash)
    //   } else {
    //     this.setState({monster: 'Shrodinger'}) ;
    //   } 
    // }.bind(this))

    // fetch(url).then(function(response) {
    //   debugger 
    //   response.json().then(function(data){
    //     if (data.result.status === "1") {
    //       this.setState({monster: 'Shrodinger'})          
    //     } else {
    //       this.checkMonsterBirth(url);
    //     }
    //   }.bind(this))
    // }.bind(this))

  getMonster = taskMonsterInstance => {
    // const monsterEvent = taskMonsterInstance.monsterBorn();

    // const monsterBorn = taskMonsterInstance.monsterBorn({},{fromBlock: 0},function(error, result){
    //     // Expect to log when click 'Run accept' button
    //     console.log("MonsterBorn", error, result);
    // });
    // monsterEvent.watch(function(error, result){
    //       if (!error) {
    //         console.log(result);
    //         // this.newMonster(result.args.name, )
    //         // this.setState({monster: result.args.name})
    //       } else {
    //         console.log(error);
    //       }
    // })
    const monsterBorn = taskMonsterInstance.monsterBorn({}, { fromBlock: 0});
    monsterBorn.watch(function(error, result){
      if (!error) {
        console.log("on watch"); 
        console.log(result);
        this.setState({eventResult: result})
      }
    }.bind(this));

    this.setState({monster: ''})
    // randomly rolls gender, launches smart contract function and uses the data gotten back to create new monster
    if (this.state.name === '') {
      alert('Name your task first!')
    } else {
      let gender = Math.floor(Math.random() * 2) === 1 ? "♂" : "♀"
      // 0 is male, 1 is female
      let combined = localStorage.id_token.concat(this.state.name)
      monsterBorn.watch(function(error, result){
      if (!error) {
        console.log("on watch"); 
        console.log(result);
        this.setState({eventResult: result})
      }
      }.bind(this));
      taskMonsterInstance.newMonster(gender, combined, {from: window.web3.eth.accounts[0]})
      .then(function(txHash) {
        this.setState({loadingNewMonster: true})
        // let url = `https://api-kovan.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=AMCQSDTDGMUA685YDSA7GWFRW1FIBCGGDW.json`;
        // ^ don't need anymore
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
      return this.state.monster === 'Schrodinger' ? <img src="/Schrodinger-Normal.gif" alt="" style={{display: "block", margin: "0 auto"}} height="55px" width="70.25px"/> : <img src="/Leaflet-Normal.gif" alt="" style={{display: "block", margin: "0 auto"}} height="55px" width="70.25px" />
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
                    {this.state.monsters.map(monster => <MenuItem value={monster.id}>{monster.name} Level {monster.level}</MenuItem>)}
                  </Select>
                <FormHelperText>Select Existing Monster</FormHelperText>
                </FormControl>

                <p>or</p>

                <div>
                  <Button variant="contained" onClick={(e) => this.startApp(window.web3, e)} color="default" className="nav">Get New Monster</Button>
                </div>
              </div>
    } else if (this.state.loadingNewMonster === true && this.state.monster !== '') {
      return <p style={{color: "#36BF7F"}}>{this.state.monster} hatched!</p>
    } else if (this.state.loadingNewMonster === true && this.state.monster === '') {
      return <p style={{color: "#3f51b5"}}>Hatching new monster...</p>
    }
  }

// function nextInstallment(thingFunderInstance) {
//   $('div.wrapper').on('click', '.nextInstallment', function(event) {
//     event.preventDefault();
//     address = $(this).attr('data-contract');
//     thingFunderInstance.payoutToMaker({to: address, from: web3.eth.accounts[0]})
//     .then(function (txHash) {
//       let url = `https://api-ropsten.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=AMCQSDTDGMUA685YDSA7GWFRW1FIBCGGDW`
//       console.log('Transaction sent');
//       $('div.rewards').html('<p>Sending transaction...</p>')
//       reload(url);
//       console.dir(txHash);      
//     }).catch(console.error);
//   });
// }

  render() {
    return (
      <div>
      <Grid container spacing={24} alignItems="center" direction="row" justify="center">
      <form style={{width: "11em"}} className="newTaskList">
      <div>
        {this.loadImage()}
      </div>
        <div>
          <TextField  autoComplete="off" id="name" className="name" name="name" placeholder="Name your new list" value={this.state.name} onChange={this.handleChange} margin="normal" />
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
    auth: state.auth
  };
};
 
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     loginError: loginError,
//     receiveLogin: receiveLogin
//   }, dispatch);
// };
 
export default connect(mapStateToProps)(TaskListForm);

// export default TaskListForm;

// const mapStateToProps = (state) => {
//   return {
//     items: state.user
//   };
// };

// const mapDispatchToProps = () => {
//   return {
//     loginError: loginError,
//     receiveLogin: receiveLogin
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);