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
	updateItem: function(e, id, index, item, completed){
		e.preventDefault();
		var that = this;
		var toUpdate = {}
		axios.patch(window.location.origin + "/todos/update/"+ id, {item: item, completed: completed})
			.then(function(response){
				var items = that.state.items.slice(0);
				items.splice(index, 1, response.data)
				that.setState({items: items});
			});
	},
	removeItem: function(id, index){
		var that = this;
		axios.delete(window.location.origin + "/todos/delete/"+ id)
			.then(function(response){
				var items = that.state.items.slice(0);
				items.splice(index,1);
				that.setState({items: items});
			});
	},
	componentDidMount: function() {
		if(this.props.user){
			this.getTasks(this.props.user._id);
		}
	},
	mapItems: function(){
		return this.state.items.map((item, index)=>{
			return <Item key={"item-"+index} index={index} updateItem={this.updateItem} removeItem={this.removeItem} task={item}/>
		});
	},
	componentWillReceiveProps: function(nextProps) {
		if(nextProps.user){
			this.getTasks(nextProps.user._id);
		}
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
