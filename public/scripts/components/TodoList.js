var React = require("react");
var axios = require("axios");
var Item = require("./Item");

module.exports = React.createClass({
	getInitialState: function(){
		return {
			items:[]
		}
	},
	getTasks: function(id) {
		var that = this;
		if(id){
			axios.get(window.location.origin + "/todos/get/" + id)
				.then(function(response){
					that.setState({items: response.data.tasks});
				}).catch(function(err){
					console.log(err)
				});
		}
	},
	componentDidMount: function() {
		if(this.props.user){
			this.getTasks(this.props.user._id);
		}
	},
	mapItems: function(){
		return this.state.items.map(function(item, index){
			return <Item key={"item-"+index} task={item}/>
		});
	},
	componentWillReceiveProps: function(nextProps) {
		this.getTasks(nextProps.user._id);
		if(nextProps.newTask){
			this.setState({items: this.state.items.push(nextProps.newTask)});
		}

	},
	render: function(){
		return (
			<ul>
				{this.mapItems()}
			</ul>
		);
	}
});
