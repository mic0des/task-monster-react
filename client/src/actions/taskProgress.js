export const taskPercentCheck = taskListPercent => {
  return {
    type: 'TASK_PROGRESS',
    taskListPercent
  }
}