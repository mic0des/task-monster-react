export default (state = {
	currentScrollHeight: 0
}, action) => {

  switch (action.type) {

    case 'SCROLL_PAGE':
      return Object.assign({}, {currentScrollHeight: action.scrollHeight}) 

    default: 
      return state;
  }
}