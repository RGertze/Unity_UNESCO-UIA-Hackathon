import React from "react";

export default class FetchRandomUser extends React.Component {

    constructor(props){
        super(props);
        this.componentDidMount();
    }
    state = {
        loading: true,
        person: null,
    };


    async componentDidMount() {
        // Simple PUT request with a JSON body using fetch
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: '"range": 400, "zto60": 6, "kithna_door": 1200' })
        };
        fetch('https://c76c-103-177-203-246.in.ngrok.io/hellopost', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));
        console.log(this.data);
    }

    render() {
        if (this.state.loading) {
            
            return <div> Connected loading data...</div>
        }
        if (!this.state.person) {
            return <div> Could not Load Employee...</div>
        }
        return (
            <div>
                {/* <div> {this.state.person.name.title}</div>
                <div> {this.state.person.name.first}</div>
                <div> {this.state.person.name.last}</div>
                <img src={this.state.person.picture.large} /> */}
                  <div> {this.firstvalue}</div>
            </div>
        );


    }
}