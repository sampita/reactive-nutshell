// author:  Caroline Brownlee
// This Module Handles Setting the State of Events, Rendering List of Event Cards to the DOM, and Delete and Edit Functionality for A Single Event 

import React, { Component } from 'react'
import EventCard from './EventCard'
import './EventsStyles/EventsList.css';
import ApiManager from '../modules/ApiManager';


class EventsList extends Component {
    // defines what this component needs to render
    state = {
        events: [],
    }

    componentDidMount() {
        //getAll from EventsAPIManager, hangs on to that data, and puts it into state
        ApiManager.getAll("events")
            .then((events) => {
                this.setState({
                    events: events
                })
            })
    }

    deleteEvent = id => {
        // handles deleting a single event from events array and renders updated array to the DOM
        ApiManager.delete("events", id)
            .then(() => {
                ApiManager.getAll("events")
                    .then((updatedEventsList) => {
                        this.setState({
                            events: updatedEventsList
                        })
                    })
            })
    }

    render() {
        return (
            <>
                <h1>Events</h1>
                <section>
                    <button type="button"
                        className="newEventButton"
                        // onClick renders eventForm.js 
                        onClick={() => { this.props.history.push("/events/new") }}>
                        Add A New Event
                    </button>
                </section>
                <div className="eventsList">
                    {/* array function that maps over events array and renders a single card for each event */}
                    {this.state.events.map(event =>
                        <EventCard
                            key={event.id}
                            event={event}
                            deleteEvent={this.deleteEvent}
                        />
                    )}
                </div>
            </>
        )
    }
}

export default EventsList;



