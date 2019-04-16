import React from 'react';
import KanbanBoard from './KanbanBoard';

export default class Kanban extends React.Component {
    render() {

        return (
            <div>
                <h1>Kanban Board</h1>
                <KanbanBoard />
            </div>
        );
    }
}