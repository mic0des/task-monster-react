import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const styles = {
  checked: {},
  size: {
    width: 40,
    height: 40,
  },
  sizeIcon: {
    fontSize: 20,
  },
};

class TaskCard extends React.Component {
  render() {
    const { task, removeTask, checkTask } = this.props;

    return (
      <div>
      <FormControlLabel control={<Checkbox value={task.task} onChange={() => checkTask(task.id)} />} label={task.task} />
                <button 
            type="button" 
            onClick={() => removeTask(task.id)} 
            className="btn btn-danger"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          </div>
    )
  }  
}

export default withStyles(styles)(TaskCard);

// const TaskCard = ({ task, removeTask }) => 
//   <div>
//     <div className="card card-inverse card-success card-primary mb-3 text-center">
//       <div className="card-block">
//         <blockquote className="card-blockquote">
//           <p>{task.task}</p>
//         </blockquote>
//       </div>
//       <div className="float-right"> 
//         <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
//           <button 
//             type="button" 
//             onClick={() => removeTask(task.id)} 
//             className="btn btn-danger"
//           >
//             <span aria-hidden="true">&times;</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>;

// export default TaskCard;